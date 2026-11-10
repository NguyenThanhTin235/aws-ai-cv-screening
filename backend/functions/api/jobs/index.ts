import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import {
  GetCommand,
  PutCommand,
  QueryCommand,
  UpdateCommand,
  ScanCommand
} from '@aws-sdk/lib-dynamodb';
import { docClient, TABLE_NAME } from '../../../shared/dynamo-client.js';
import { successResponse, errorResponse } from '../../../shared/response.js';
import {
  requireAuth,
  assertRole,
  assertCompanyAccess,
  AuthError
} from '../../../shared/tenant-guard.js';

export interface RubricWeights {
  skills: number;
  experience: number;
  education: number;
  culture: number;
}

export interface JobEntity {
  PK: string;
  SK: string;
  GSI1PK: string;
  GSI1SK: string;
  GSI2PK: string;
  GSI2SK: string;
  entityType: 'JOB';
  jobId: string;
  title: string;
  companyId: string;
  companyName: string;
  level: string;
  workplaceType: string;
  employmentType?: string;
  location?: string;
  provinceId?: string;
  salary?: string;
  experience?: string;
  skills: string[];
  description: string;
  requirements?: string[];
  benefits?: string[];
  rubricWeights: RubricWeights;
  status: 'OPEN' | 'CLOSED';
  moderationStatus?: string;
  source?: unknown;
  sourceUrl?: string;
  deadline?: string;
  createdAt: string;
  updatedAt: string;
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const method = event.httpMethod || 'GET';
  const path = event.path || '';
  const pathParams = event.pathParameters || {};

  try {
    // 1. GET /api/v1/jobs/{id}
    if (method === 'GET' && pathParams.id) {
      const rawId = pathParams.id;
      const jobId = rawId.startsWith('job_') ? rawId : `job_${rawId}`;

      const res = await docClient.send(
        new GetCommand({
          TableName: TABLE_NAME,
          Key: {
            PK: `JOB#${jobId}`,
            SK: 'METADATA'
          }
        })
      );

      if (!res.Item) {
        return errorResponse('NOT_FOUND', `Không tìm thấy tin tuyển dụng với mã: ${jobId}`, 404);
      }

      const itemData = res.Item as any;
      return successResponse({
        ...itemData,
        id: itemData.jobId || (itemData.PK ? itemData.PK.replace('JOB#', '') : undefined)
      });
    }

    // 2. GET /api/v1/companies/{id}/jobs
    if (method === 'GET' && (path.includes('/companies/') && path.endsWith('/jobs'))) {
      const companyId = pathParams.id || path.split('/companies/')[1]?.split('/')[0];
      if (!companyId) {
        return errorResponse('BAD_REQUEST', 'Thiếu mã công ty trong đường dẫn (companyId)', 400);
      }

      const res = await docClient.send(
        new QueryCommand({
          TableName: TABLE_NAME,
          IndexName: 'GSI1',
          KeyConditionExpression: 'GSI1PK = :cpk AND begins_with(GSI1SK, :csk)',
          ExpressionAttributeValues: {
            ':cpk': `COMPANY#${companyId}`,
            ':csk': 'JOB#'
          },
          ScanIndexForward: false
        })
      );

      return successResponse(res.Items || [], { total: res.Count || 0 });
    }

    // 3. GET /api/v1/jobs (List with filters & pagination)
    if (method === 'GET') {
      const queryParams = event.queryStringParameters || {};
      const keyword = (queryParams.keyword || queryParams.q || '').trim().toLowerCase();
      const level = queryParams.level;
      const workplaceType = queryParams.workplaceType;
      const provinceId = queryParams.provinceId;
      const limit = Math.min(Math.max(parseInt(queryParams.limit || '50', 10), 1), 100);
      const cursor = queryParams.cursor;

      let exclusiveStartKey: Record<string, unknown> | undefined;
      if (cursor) {
        try {
          exclusiveStartKey = JSON.parse(Buffer.from(cursor, 'base64').toString('utf8'));
        } catch {
          return errorResponse('BAD_REQUEST', 'Con trỏ phân trang (cursor) không hợp lệ', 400);
        }
      }

      // Query open jobs via GSI2
      let queryResult;
      try {
        queryResult = await docClient.send(
          new QueryCommand({
            TableName: TABLE_NAME,
            IndexName: 'GSI2',
            KeyConditionExpression: 'GSI2PK = :statusKey',
            ExpressionAttributeValues: {
              ':statusKey': 'JOBS#STATUS#OPEN'
            },
            ScanIndexForward: false,
            Limit: limit * 2, // fetch extra to account for in-memory filters
            ExclusiveStartKey: exclusiveStartKey
          })
        );
      } catch {
        // Fallback to Scan if GSI2 is still indexing or during local simulation
        queryResult = await docClient.send(
          new ScanCommand({
            TableName: TABLE_NAME,
            FilterExpression: 'entityType = :entityType AND #st = :status',
            ExpressionAttributeNames: { '#st': 'status' },
            ExpressionAttributeValues: {
              ':entityType': 'JOB',
              ':status': 'OPEN'
            },
            Limit: 100
          })
        );
      }

      let items = (queryResult.Items || []) as JobEntity[];

      // Filter in-memory for rich text keyword / fields
      if (keyword) {
        items = items.filter((j) => {
          const titleMatch = j.title?.toLowerCase().includes(keyword);
          const descMatch = j.description?.toLowerCase().includes(keyword);
          const companyMatch = j.companyName?.toLowerCase().includes(keyword);
          const skillMatch = Array.isArray(j.skills) && j.skills.some((s) => s.toLowerCase().includes(keyword));
          return titleMatch || descMatch || companyMatch || skillMatch;
        });
      }

      if (level && level !== 'ALL') {
        items = items.filter((j) => j.level === level);
      }

      if (workplaceType && workplaceType !== 'ALL') {
        items = items.filter((j) => j.workplaceType === workplaceType);
      }

      if (provinceId && provinceId !== 'all') {
        items = items.filter((j) => j.provinceId === provinceId || j.location?.toLowerCase().includes(provinceId));
      }

      const pagedItems = items.slice(0, limit).map((j: any) => ({
        ...j,
        id: j.jobId || (j.PK ? j.PK.replace('JOB#', '') : undefined)
      }));
      const nextKey = queryResult.LastEvaluatedKey;
      const nextCursor = nextKey
        ? Buffer.from(JSON.stringify(nextKey)).toString('base64')
        : null;

      return successResponse(pagedItems, {
        pageLimit: limit,
        nextCursor,
        hasMore: !!nextCursor,
        total: items.length
      });
    }

    // 4. POST /api/v1/jobs (Create new Job by Recruiter)
    if (method === 'POST') {
      const user = requireAuth(event);
      assertRole(user, ['recruiter', 'admin']);

      if (!event.body) {
        return errorResponse('BAD_REQUEST', 'Thiếu dữ liệu nội dung tuyển dụng (Request body empty)', 400);
      }

      const body = JSON.parse(event.body);
      const {
        title,
        companyId: rawCompanyId,
        companyName,
        level,
        workplaceType,
        employmentType,
        location,
        provinceId,
        salary,
        experience,
        skills,
        description,
        requirements,
        benefits,
        rubricWeights,
        deadline
      } = body;

      const targetCompanyId = rawCompanyId || user.companyId;
      if (!targetCompanyId) {
        return errorResponse('BAD_REQUEST', 'Thiếu mã công ty tuyển dụng (companyId)', 400);
      }

      assertCompanyAccess(user, targetCompanyId);

      if (!title || !description) {
        return errorResponse('BAD_REQUEST', 'Tiêu đề (title) và mô tả công việc (description) là bắt buộc', 400);
      }

      // Validate Rubric weights (Sum must equal 100)
      const weights: RubricWeights = rubricWeights || {
        skills: 35,
        experience: 35,
        education: 15,
        culture: 15
      };

      const sumWeights =
        (weights.skills || 0) +
        (weights.experience || 0) +
        (weights.education || 0) +
        (weights.culture || 0);

      if (sumWeights !== 100) {
        return errorResponse(
          'BAD_REQUEST',
          `Tổng trọng số Rubric phải đúng 100 điểm (Hiện tại: ${sumWeights}đ)`,
          400,
          [{ field: 'rubricWeights', issue: 'Tổng trọng số kỹ năng, kinh nghiệm, học vấn, văn hóa phải bằng 100' }]
        );
      }

      const now = new Date().toISOString();
      const jobId = `job_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

      const newJob: JobEntity = {
        PK: `JOB#${jobId}`,
        SK: 'METADATA',
        GSI1PK: `COMPANY#${targetCompanyId}`,
        GSI1SK: `JOB#OPEN#${now}`,
        GSI2PK: 'JOBS#STATUS#OPEN',
        GSI2SK: `CREATED#${now}`,
        entityType: 'JOB',
        jobId,
        title,
        companyId: targetCompanyId,
        companyName: companyName || user.fullName || 'Doanh nghiệp tuyển dụng',
        level: level || 'Middle',
        workplaceType: workplaceType || 'Hybrid',
        employmentType: employmentType || 'Toàn thời gian',
        location: location || 'Hà Nội / TP.HCM',
        provinceId: provinceId || 'all',
        salary: salary || 'Thỏa thuận',
        experience: experience || '2-3 năm kinh nghiệm',
        skills: Array.isArray(skills) ? skills : [],
        description,
        requirements: Array.isArray(requirements) ? requirements : [],
        benefits: Array.isArray(benefits) ? benefits : [],
        rubricWeights: weights,
        status: 'OPEN',
        moderationStatus: 'APPROVED',
        deadline: deadline || '2026-12-31T23:59:59.000Z',
        createdAt: now,
        updatedAt: now
      };

      await docClient.send(
        new PutCommand({
          TableName: TABLE_NAME,
          Item: newJob
        })
      );

      return successResponse(newJob, undefined, 201);
    }

    // 5. PATCH /api/v1/jobs/{id}/status (Toggle Status OPEN / CLOSED)
    if (method === 'PATCH' && path.endsWith('/status') && pathParams.id) {
      const user = requireAuth(event);
      assertRole(user, ['recruiter', 'admin']);

      const rawId = pathParams.id;
      const jobId = rawId.startsWith('job_') ? rawId : `job_${rawId}`;

      const existing = await docClient.send(
        new GetCommand({
          TableName: TABLE_NAME,
          Key: { PK: `JOB#${jobId}`, SK: 'METADATA' }
        })
      );

      if (!existing.Item) {
        return errorResponse('NOT_FOUND', `Không tìm thấy tin tuyển dụng: ${jobId}`, 404);
      }

      assertCompanyAccess(user, existing.Item.companyId);

      const body = event.body ? JSON.parse(event.body) : {};
      const newStatus = body.status === 'CLOSED' ? 'CLOSED' : 'OPEN';
      const now = new Date().toISOString();

      await docClient.send(
        new UpdateCommand({
          TableName: TABLE_NAME,
          Key: { PK: `JOB#${jobId}`, SK: 'METADATA' },
          UpdateExpression: 'SET #st = :newStatus, GSI1SK = :gsi1sk, GSI2PK = :gsi2pk, updatedAt = :now',
          ExpressionAttributeNames: { '#st': 'status' },
          ExpressionAttributeValues: {
            ':newStatus': newStatus,
            ':gsi1sk': `JOB#${newStatus}#${existing.Item.createdAt}`,
            ':gsi2pk': `JOBS#STATUS#${newStatus}`,
            ':now': now
          }
        })
      );

      return successResponse({
        jobId,
        status: newStatus,
        updatedAt: now
      });
    }

    return errorResponse('BAD_REQUEST', `Không hỗ trợ phương thức ${method} trên ${path}`, 400);
  } catch (err) {
    if (err instanceof AuthError) {
      return errorResponse(err.code, err.message, err.statusCode);
    }
    console.error('[JobsHandler Error]:', err);
    return errorResponse(
      'INTERNAL_ERROR',
      err instanceof Error ? err.message : 'Lỗi hệ thống khi xử lý tin tuyển dụng',
      500
    );
  }
};
