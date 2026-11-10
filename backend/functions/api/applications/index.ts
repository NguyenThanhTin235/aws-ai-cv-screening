import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  GetCommand,
  QueryCommand,
  TransactWriteCommand,
  UpdateCommand,
  DeleteCommand
} from '@aws-sdk/lib-dynamodb';
import { docClient, TABLE_NAME } from '../../../shared/dynamo-client.js';
import { successResponse, errorResponse } from '../../../shared/response.js';
import {
  requireAuth,
  assertRole,
  assertCompanyAccess,
  AuthError
} from '../../../shared/tenant-guard.js';

const region = process.env.AWS_REGION || 'us-east-1';
const QUARANTINE_BUCKET = process.env.QUARANTINE_BUCKET || 'cv-portal-dev-quarantine-145443242997';

const s3Client = new S3Client({ region });

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const method = event.httpMethod || 'GET';
  const path = event.path || '';
  const pathParams = event.pathParameters || {};

  try {
    // 1. POST /api/v1/applications/upload-url (Step 2 - Request Presigned PUT URL)
    if (method === 'POST' && path.endsWith('/upload-url')) {
      const user = requireAuth(event);
      assertRole(user, ['candidate', 'admin']);

      if (!event.body) {
        return errorResponse('BAD_REQUEST', 'Thiếu dữ liệu upload (Request body empty)', 400);
      }

      const body = JSON.parse(event.body);
      const { jobId, fileName, fileType, fileSize } = body;

      if (!jobId) {
        return errorResponse('BAD_REQUEST', 'Mã tin tuyển dụng (jobId) là bắt buộc', 400);
      }

      // BR-DOC-01: File type must be PDF and <= 5MB
      if (!fileType || fileType.toUpperCase() !== 'PDF') {
        return errorResponse(
          'BAD_REQUEST',
          'Chỉ hỗ trợ tệp định dạng PDF (application/pdf)',
          400,
          [{ field: 'fileType', issue: 'Định dạng tệp không được hỗ trợ theo BR-DOC-01' }]
        );
      }

      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
      if (!fileSize || fileSize <= 0 || fileSize > MAX_FILE_SIZE) {
        return errorResponse(
          'BAD_REQUEST',
          `Dung lượng tệp CV phải lớn hơn 0 và không vượt quá 5MB (Hiện tại: ${(fileSize / (1024 * 1024)).toFixed(2)}MB)`,
          400,
          [{ field: 'fileSize', issue: 'Dung lượng tệp vượt quá giới hạn 5MB theo BR-DOC-01' }]
        );
      }

      // Fetch job to determine companyId for tenant isolation in S3 prefix
      const jobRes = await docClient.send(
        new GetCommand({
          TableName: TABLE_NAME,
          Key: { PK: `JOB#${jobId}`, SK: 'METADATA' }
        })
      );

      if (!jobRes.Item) {
        return errorResponse('NOT_FOUND', `Không tìm thấy tin tuyển dụng: ${jobId}`, 404);
      }

      const companyId = jobRes.Item.companyId || 'general';
      const documentId = `doc_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      const s3Key = `quarantine/${companyId}/${jobId}/${documentId}.pdf`;

      // Generate Presigned PUT URL with 5-minute (300s) expiration (BR-DOC-03)
      const putCommand = new PutObjectCommand({
        Bucket: QUARANTINE_BUCKET,
        Key: s3Key,
        ContentType: 'application/pdf',
        Metadata: {
          'candidate-id': user.userId,
          'job-id': jobId,
          'company-id': companyId,
          'document-id': documentId,
          'original-filename': encodeURIComponent(fileName || 'resume.pdf')
        }
      });

      const uploadUrl = await getSignedUrl(s3Client, putCommand, { expiresIn: 300 });

      return successResponse({
        uploadUrl,
        s3Key,
        documentId,
        expiresInSeconds: 300
      });
    }

    // 2. POST /api/v1/applications (Step 3 - Submit Application with TransactWriteItems)
    if (method === 'POST' && path.endsWith('/applications')) {
      const user = requireAuth(event);
      assertRole(user, ['candidate', 'admin']);

      if (!event.body) {
        return errorResponse('BAD_REQUEST', 'Thiếu nội dung nộp đơn (Request body empty)', 400);
      }

      const body = JSON.parse(event.body);
      const { jobId, documentId, s3Key, candidateName, candidateEmail, candidatePhone, consentAi } = body;

      if (!jobId || !documentId || !s3Key) {
        return errorResponse('BAD_REQUEST', 'Thiếu thông tin bắt buộc: jobId, documentId, hoặc s3Key', 400);
      }

      if (consentAi !== true) {
        return errorResponse(
          'BAD_REQUEST',
          'Ứng viên bắt buộc phải tích chọn đồng thuận xử lý dữ liệu và AI Screening theo quy định NĐ 356/2025 (BR-CONSENT-01).',
          400
        );
      }

      // Fetch Job Details for Denormalization
      const jobRes = await docClient.send(
        new GetCommand({
          TableName: TABLE_NAME,
          Key: { PK: `JOB#${jobId}`, SK: 'METADATA' }
        })
      );

      if (!jobRes.Item) {
        return errorResponse('NOT_FOUND', `Không tìm thấy tin tuyển dụng: ${jobId}`, 404);
      }

      const job = jobRes.Item;
      const now = new Date().toISOString();
      const applicationId = `app_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

      // Execute TransactWriteItems to guarantee idempotency and anti-duplicate submission
      try {
        await docClient.send(
          new TransactWriteCommand({
            TransactItems: [
              // 1. Application Entity
              {
                Put: {
                  TableName: TABLE_NAME,
                  Item: {
                    PK: `APP#${applicationId}`,
                    SK: 'METADATA',
                    GSI1PK: `JOB#${jobId}`,
                    GSI1SK: `SCORE#000#${applicationId}`,
                    GSI2PK: `USER#${user.userId}`,
                    GSI2SK: `APP#${now}`,
                    entityType: 'APPLICATION',
                    applicationId,
                    jobId,
                    jobTitle: job.title,
                    companyId: job.companyId,
                    companyName: job.companyName,
                    candidateId: user.userId,
                    candidateName: candidateName || user.fullName || 'Ứng viên',
                    candidateEmail: candidateEmail || user.email,
                    candidatePhone: candidatePhone || '',
                    documentId,
                    s3Key,
                    status: 'SUBMITTED',
                    aiStatus: 'PENDING',
                    aiScore: 0,
                    matchLevel: 'PENDING',
                    submittedAt: now,
                    updatedAt: now
                  }
                }
              },
              // 2. Active Application Anti-Duplicate Lock
              {
                Put: {
                  TableName: TABLE_NAME,
                  Item: {
                    PK: `USER#${user.userId}`,
                    SK: `ACTIVE_APP#${jobId}`,
                    entityType: 'ACTIVE_APP_LOCK',
                    applicationId,
                    jobId,
                    createdAt: now
                  },
                  ConditionExpression: 'attribute_not_exists(PK)'
                }
              },
              // 3. User Consent Audit Record
              {
                Put: {
                  TableName: TABLE_NAME,
                  Item: {
                    PK: `USER#${user.userId}`,
                    SK: `CONSENT#${now}#AI_SCREENING`,
                    entityType: 'CONSENT_LOG',
                    consentType: 'AI_SCREENING',
                    jobId,
                    grantedAt: now
                  }
                }
              }
            ]
          })
        );
      } catch (err: unknown) {
        const errorName = (err as { name?: string })?.name;
        if (errorName === 'TransactionCanceledException') {
          return errorResponse(
            'CONFLICT',
            'Bạn đã có một hồ sơ đang xử lý cho vị trí tuyển dụng này. Vui lòng rút đơn hiện tại trước nếu muốn nộp lại hồ sơ mới.',
            409
          );
        }
        throw err;
      }

      return successResponse(
        {
          applicationId,
          jobId,
          jobTitle: job.title,
          companyName: job.companyName,
          status: 'SUBMITTED',
          aiStatus: 'PENDING',
          submittedAt: now
        },
        undefined,
        201
      );
    }

    // 3. POST /api/v1/applications/{id}/withdraw (Candidate withdraws application)
    if (method === 'POST' && path.includes('/applications/') && path.endsWith('/withdraw')) {
      const user = requireAuth(event);
      const rawAppId = pathParams.id || path.split('/applications/')[1]?.split('/')[0];
      const applicationId = rawAppId.startsWith('app_') ? rawAppId : `app_${rawAppId}`;

      const appRes = await docClient.send(
        new GetCommand({
          TableName: TABLE_NAME,
          Key: { PK: `APP#${applicationId}`, SK: 'METADATA' }
        })
      );

      if (!appRes.Item) {
        return errorResponse('NOT_FOUND', `Không tìm thấy đơn ứng tuyển: ${applicationId}`, 404);
      }

      const app = appRes.Item;
      if (app.candidateId !== user.userId && user.role !== 'admin') {
        return errorResponse('FORBIDDEN', 'Bạn không có quyền rút đơn ứng tuyển này.', 403);
      }

      const now = new Date().toISOString();

      // Update status to WITHDRAWN and release active lock
      await docClient.send(
        new UpdateCommand({
          TableName: TABLE_NAME,
          Key: { PK: `APP#${applicationId}`, SK: 'METADATA' },
          UpdateExpression: 'SET #st = :withdrawn, updatedAt = :now',
          ExpressionAttributeNames: { '#st': 'status' },
          ExpressionAttributeValues: {
            ':withdrawn': 'WITHDRAWN',
            ':now': now
          }
        })
      );

      // Release active app lock so candidate can reapply if desired
      await docClient.send(
        new DeleteCommand({
          TableName: TABLE_NAME,
          Key: {
            PK: `USER#${user.userId}`,
            SK: `ACTIVE_APP#${app.jobId}`
          }
        })
      );

      return successResponse({
        applicationId,
        status: 'WITHDRAWN',
        withdrawnAt: now
      });
    }

    // 4. GET /api/v1/applications/my (Candidate's applications history)
    if (method === 'GET' && path.endsWith('/applications/my')) {
      const user = requireAuth(event);
      assertRole(user, ['candidate', 'admin']);

      const res = await docClient.send(
        new QueryCommand({
          TableName: TABLE_NAME,
          IndexName: 'GSI2',
          KeyConditionExpression: 'GSI2PK = :upk AND begins_with(GSI2SK, :appPrefix)',
          ExpressionAttributeValues: {
            ':upk': `USER#${user.userId}`,
            ':appPrefix': 'APP#'
          },
          ScanIndexForward: false
        })
      );

      return successResponse(res.Items || []);
    }

    // 5. GET /api/v1/jobs/{id}/applications (Recruiter views job applications sorted by score)
    if (method === 'GET' && path.includes('/jobs/') && path.endsWith('/applications')) {
      const user = requireAuth(event);
      assertRole(user, ['recruiter', 'admin']);

      const rawJobId = pathParams.id || path.split('/jobs/')[1]?.split('/')[0];
      const jobId = rawJobId.startsWith('job_') ? rawJobId : `job_${rawJobId}`;

      // Check job ownership
      const jobRes = await docClient.send(
        new GetCommand({
          TableName: TABLE_NAME,
          Key: { PK: `JOB#${jobId}`, SK: 'METADATA' }
        })
      );

      if (!jobRes.Item) {
        return errorResponse('NOT_FOUND', `Không tìm thấy tin tuyển dụng: ${jobId}`, 404);
      }

      assertCompanyAccess(user, jobRes.Item.companyId);

      const res = await docClient.send(
        new QueryCommand({
          TableName: TABLE_NAME,
          IndexName: 'GSI1',
          KeyConditionExpression: 'GSI1PK = :jpk AND begins_with(GSI1SK, :scorePrefix)',
          ExpressionAttributeValues: {
            ':jpk': `JOB#${jobId}`,
            ':scorePrefix': 'SCORE#'
          },
          ScanIndexForward: false // highest score first
        })
      );

      return successResponse(res.Items || []);
    }

    return errorResponse('BAD_REQUEST', `Không hỗ trợ phương thức ${method} trên ${path}`, 400);
  } catch (err) {
    if (err instanceof AuthError) {
      return errorResponse(err.code, err.message, err.statusCode);
    }
    console.error('[ApplicationsHandler Error]:', err);
    return errorResponse(
      'INTERNAL_ERROR',
      err instanceof Error ? err.message : 'Lỗi hệ thống khi xử lý hồ sơ ứng tuyển',
      500
    );
  }
};
