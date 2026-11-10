import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { docClient, TABLE_NAME } from '../../../shared/dynamo-client.js';
import { successResponse, errorResponse } from '../../../shared/response.js';
import {
  requireAuth,
  assertRole,
  assertCompanyAccess,
  AuthError
} from '../../../shared/tenant-guard.js';

export interface CompanyEntity {
  PK: string;
  SK: string;
  GSI1PK: string;
  GSI1SK: string;
  GSI2PK: string;
  GSI2SK: string;
  entityType: 'COMPANY';
  companyId: string;
  companyName: string;
  companyScale?: string;
  website?: string;
  logoUrl?: string;
  description?: string;
  address?: string;
  status: 'ACTIVE' | 'PENDING' | 'SUSPENDED';
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const method = event.httpMethod || 'GET';
  const path = event.path || '';
  const pathParams = event.pathParameters || {};

  try {
    // 1. GET /api/v1/companies/my (Current recruiter's company profile)
    if (method === 'GET' && path.endsWith('/companies/my')) {
      const user = requireAuth(event);
      assertRole(user, ['recruiter', 'admin']);

      if (!user.companyId) {
        return errorResponse('NOT_FOUND', 'Tài khoản chưa được gắn với hồ sơ doanh nghiệp nào.', 404);
      }

      const res = await docClient.send(
        new GetCommand({
          TableName: TABLE_NAME,
          Key: {
            PK: `COMPANY#${user.companyId}`,
            SK: 'METADATA'
          }
        })
      );

      if (!res.Item) {
        return errorResponse('NOT_FOUND', `Không tìm thấy hồ sơ doanh nghiệp: ${user.companyId}`, 404);
      }

      return successResponse(res.Item);
    }

    // 2. GET /api/v1/companies/{id}/members (List HR Team members in company)
    if (method === 'GET' && path.includes('/companies/') && path.endsWith('/members')) {
      const user = requireAuth(event);
      const companyId = pathParams.id || path.split('/companies/')[1]?.split('/')[0];
      if (!companyId) {
        return errorResponse('BAD_REQUEST', 'Thiếu mã công ty trong URL', 400);
      }

      assertCompanyAccess(user, companyId);

      const res = await docClient.send(
        new QueryCommand({
          TableName: TABLE_NAME,
          IndexName: 'GSI1',
          KeyConditionExpression: 'GSI1PK = :cpk AND begins_with(GSI1SK, :usk)',
          ExpressionAttributeValues: {
            ':cpk': `COMPANY#${companyId}`,
            ':usk': 'USER#'
          }
        })
      );

      return successResponse(res.Items || []);
    }

    // 3. GET /api/v1/companies/{id} (Public company profile)
    if (method === 'GET' && pathParams.id) {
      const companyId = pathParams.id;

      const res = await docClient.send(
        new GetCommand({
          TableName: TABLE_NAME,
          Key: {
            PK: `COMPANY#${companyId}`,
            SK: 'METADATA'
          }
        })
      );

      if (!res.Item) {
        return errorResponse('NOT_FOUND', `Không tìm thấy doanh nghiệp: ${companyId}`, 404);
      }

      return successResponse(res.Item);
    }

    // 4. POST /api/v1/companies (Create company profile)
    if (method === 'POST') {
      const user = requireAuth(event);
      assertRole(user, ['recruiter', 'admin']);

      if (!event.body) {
        return errorResponse('BAD_REQUEST', 'Thiếu nội dung yêu cầu (body empty)', 400);
      }

      const body = JSON.parse(event.body);
      const {
        companyName,
        companyScale,
        website,
        logoUrl,
        description,
        address
      } = body;

      if (!companyName) {
        return errorResponse('BAD_REQUEST', 'Tên doanh nghiệp (companyName) là bắt buộc', 400);
      }

      const companyId = body.companyId || `comp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const now = new Date().toISOString();

      const newCompany: CompanyEntity = {
        PK: `COMPANY#${companyId}`,
        SK: 'METADATA',
        GSI1PK: 'COMPANIES',
        GSI1SK: `NAME#${companyName}`,
        GSI2PK: 'STATUS#ACTIVE',
        GSI2SK: `CREATED#${now}`,
        entityType: 'COMPANY',
        companyId,
        companyName,
        companyScale: companyScale || '50-100 nhân sự',
        website: website || '',
        logoUrl: logoUrl || '',
        description: description || '',
        address: address || '',
        status: 'ACTIVE',
        isVerified: true,
        createdAt: now,
        updatedAt: now
      };

      await docClient.send(
        new PutCommand({
          TableName: TABLE_NAME,
          Item: newCompany
        })
      );

      return successResponse(newCompany, undefined, 201);
    }

    return errorResponse('BAD_REQUEST', `Không hỗ trợ phương thức ${method} trên ${path}`, 400);
  } catch (err) {
    if (err instanceof AuthError) {
      return errorResponse(err.code, err.message, err.statusCode);
    }
    console.error('[CompaniesHandler Error]:', err);
    return errorResponse(
      'INTERNAL_ERROR',
      err instanceof Error ? err.message : 'Lỗi hệ thống khi xử lý doanh nghiệp',
      500
    );
  }
};
