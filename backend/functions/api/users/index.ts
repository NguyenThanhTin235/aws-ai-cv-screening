import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { GetCommand, PutCommand, QueryCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { docClient, TABLE_NAME } from '../../../shared/dynamo-client.js';
import { successResponse, errorResponse } from '../../../shared/response.js';
import {
  requireAuth,
  assertRole,
  AuthError
} from '../../../shared/tenant-guard.js';

export interface UserProfileEntity {
  PK: string;
  SK: string;
  GSI1PK?: string;
  GSI1SK?: string;
  entityType: 'USER_PROFILE';
  userId: string;
  email: string;
  fullName: string;
  phone?: string;
  role: string;
  companyId?: string;
  title?: string;
  bio?: string;
  skills?: string[];
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const method = event.httpMethod || 'GET';
  const path = event.path || '';
  const pathParams = event.pathParameters || {};

  try {
    const user = requireAuth(event);

    // 1. GET /api/v1/users/me or /api/v1/candidate/profile
    if (method === 'GET' && (path.endsWith('/users/me') || path.endsWith('/candidate/profile'))) {
      const defaultProfile = {
        userId: user.userId,
        email: user.email,
        fullName: user.fullName || (user.email.split('@')[0] || 'Người dùng'),
        role: user.role,
        companyId: user.companyId,
        phone: '',
        skills: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      try {
        const res = await docClient.send(
          new GetCommand({
            TableName: TABLE_NAME,
            Key: {
              PK: `USER#${user.userId}`,
              SK: 'PROFILE'
            }
          })
        );

        if (res.Item) {
          return successResponse(res.Item);
        }
      } catch (ddbErr: unknown) {
        const errName = (ddbErr as { name?: string })?.name;
        if (errName === 'CredentialsProviderError' || errName === 'ResourceNotFoundException') {
          return successResponse(defaultProfile);
        }
        throw ddbErr;
      }

      return successResponse(defaultProfile);
    }

    // 2. PUT /api/v1/users/me or /api/v1/candidate/profile
    if (method === 'PUT' && (path.endsWith('/users/me') || path.endsWith('/candidate/profile'))) {
      if (!event.body) {
        return errorResponse('BAD_REQUEST', 'Thiếu dữ liệu cập nhật hồ sơ (body empty)', 400);
      }

      const body = JSON.parse(event.body);
      const now = new Date().toISOString();

      const updatedProfile: UserProfileEntity = {
        PK: `USER#${user.userId}`,
        SK: 'PROFILE',
        GSI1PK: `ROLE#${user.role.toUpperCase()}`,
        GSI1SK: `CREATED#${now}`,
        entityType: 'USER_PROFILE',
        userId: user.userId,
        email: user.email,
        fullName: body.fullName || user.fullName || user.email.split('@')[0],
        phone: body.phone || '',
        role: user.role,
        companyId: body.companyId || user.companyId,
        title: body.title || '',
        bio: body.bio || '',
        skills: Array.isArray(body.skills) ? body.skills : [],
        avatarUrl: body.avatarUrl || '',
        createdAt: body.createdAt || now,
        updatedAt: now
      };

      await docClient.send(
        new PutCommand({
          TableName: TABLE_NAME,
          Item: updatedProfile
        })
      );

      return successResponse(updatedProfile);
    }

    // 3. GET /api/v1/users/me/cvs (Candidate's CV Vault)
    if (method === 'GET' && path.endsWith('/users/me/cvs')) {
      assertRole(user, ['candidate', 'admin']);

      const res = await docClient.send(
        new QueryCommand({
          TableName: TABLE_NAME,
          KeyConditionExpression: 'PK = :upk AND begins_with(SK, :cvPrefix)',
          ExpressionAttributeValues: {
            ':upk': `USER#${user.userId}`,
            ':cvPrefix': 'CV#'
          }
        })
      );

      return successResponse(res.Items || []);
    }

    // 4. POST /api/v1/users/me/cvs (Save CV to Vault)
    if (method === 'POST' && path.endsWith('/users/me/cvs')) {
      assertRole(user, ['candidate', 'admin']);

      if (!event.body) {
        return errorResponse('BAD_REQUEST', 'Thiếu thông tin CV (body empty)', 400);
      }

      const body = JSON.parse(event.body);
      const cvId = `cv_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const now = new Date().toISOString();

      const cvItem = {
        PK: `USER#${user.userId}`,
        SK: `CV#${cvId}`,
        entityType: 'CANDIDATE_CV',
        cvId,
        userId: user.userId,
        fileName: body.fileName || 'resume.pdf',
        fileSize: body.fileSize || 0,
        s3Key: body.s3Key || '',
        isDefault: !!body.isDefault,
        uploadedAt: now
      };

      await docClient.send(
        new PutCommand({
          TableName: TABLE_NAME,
          Item: cvItem
        })
      );

      return successResponse(cvItem, undefined, 201);
    }

    // 5. DELETE /api/v1/users/me/cvs/{cvId}
    if (method === 'DELETE' && path.includes('/users/me/cvs/') && pathParams.cvId) {
      assertRole(user, ['candidate', 'admin']);
      const cvId = pathParams.cvId;

      await docClient.send(
        new DeleteCommand({
          TableName: TABLE_NAME,
          Key: {
            PK: `USER#${user.userId}`,
            SK: `CV#${cvId}`
          }
        })
      );

      return successResponse({ deleted: true, cvId });
    }

    return errorResponse('BAD_REQUEST', `Không hỗ trợ phương thức ${method} trên ${path}`, 400);
  } catch (err) {
    if (err instanceof AuthError) {
      return errorResponse(err.code, err.message, err.statusCode);
    }
    console.error('[UsersHandler Error]:', err);
    return errorResponse(
      'INTERNAL_ERROR',
      err instanceof Error ? err.message : 'Lỗi hệ thống khi xử lý hồ sơ người dùng',
      500
    );
  }
};
