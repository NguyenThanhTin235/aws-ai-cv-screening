import type { APIGatewayProxyEvent } from 'aws-lambda';

export type UserRole = 'candidate' | 'recruiter' | 'admin';

export interface AuthUser {
  userId: string;
  email: string;
  role: UserRole;
  companyId?: string;
  groups: string[];
  fullName?: string;
}

export class AuthError extends Error {
  public readonly statusCode: number;
  public readonly code: string;

  constructor(message: string, statusCode = 401, code = 'UNAUTHORIZED') {
    super(message);
    this.name = 'AuthError';
    this.statusCode = statusCode;
    this.code = code;
  }
}

/**
 * Extract authenticated user from API Gateway Event (Cognito Authorizer claims or dev headers)
 */
export function extractUserFromEvent(event: APIGatewayProxyEvent): AuthUser | null {
  const authorizer = event.requestContext?.authorizer;
  const claims = authorizer?.claims;

  if (claims) {
    const rawGroups = claims['cognito:groups'] || claims['groups'] || '';
    const groups: string[] = Array.isArray(rawGroups)
      ? rawGroups
      : typeof rawGroups === 'string'
      ? rawGroups.split(',').map((g) => g.trim()).filter(Boolean)
      : [];

    let role: UserRole = 'candidate';
    if (groups.includes('admin') || claims['custom:role'] === 'admin') {
      role = 'admin';
    } else if (groups.includes('recruiter') || claims['custom:role'] === 'recruiter') {
      role = 'recruiter';
    }

    return {
      userId: claims.sub || claims.username || (event.requestContext.identity as { cognitoIdentityId?: string })?.cognitoIdentityId || '',
      email: claims.email || '',
      role,
      companyId: claims['custom:company_id'] || undefined,
      groups,
      fullName: claims.name || claims['custom:full_name'] || undefined
    };
  }

  // Development / Local Testing fallback support via headers
  const mockUserId = event.headers?.['x-mock-user-id'] || event.headers?.['X-Mock-User-Id'];
  if (mockUserId) {
    const mockRole = (event.headers?.['x-mock-role'] || event.headers?.['X-Mock-Role'] || 'candidate') as UserRole;
    const mockCompanyId = event.headers?.['x-mock-company-id'] || event.headers?.['X-Mock-Company-Id'];
    const mockEmail = event.headers?.['x-mock-email'] || event.headers?.['X-Mock-Email'] || `${mockUserId}@portal.local`;

    return {
      userId: mockUserId,
      email: mockEmail,
      role: mockRole,
      companyId: mockCompanyId,
      groups: [mockRole],
      fullName: `Mock User (${mockUserId})`
    };
  }

  return null;
}

/**
 * Require authenticated user or throw AuthError
 */
export function requireAuth(event: APIGatewayProxyEvent): AuthUser {
  const user = extractUserFromEvent(event);
  if (!user || !user.userId) {
    throw new AuthError('Yêu cầu xác thực tài khoản để truy cập tài nguyên này.', 401, 'UNAUTHORIZED');
  }
  return user;
}

/**
 * Enforce RBAC allowed roles
 */
export function assertRole(user: AuthUser, allowedRoles: UserRole[]): void {
  if (!allowedRoles.includes(user.role)) {
    throw new AuthError(
      `Vai trò '${user.role}' không có quyền truy cập endpoint này. Quyền yêu cầu: [${allowedRoles.join(', ')}]`,
      403,
      'FORBIDDEN'
    );
  }
}

/**
 * Enforce Tenant Isolation (Anti-IDOR) between recruiters
 */
export function assertCompanyAccess(user: AuthUser, targetCompanyId: string): void {
  // Admin has global tenant access
  if (user.role === 'admin') {
    return;
  }

  if (user.role !== 'recruiter') {
    throw new AuthError('Chỉ nhà tuyển dụng hoặc quản trị viên mới có quyền thao tác dữ liệu công ty.', 403, 'FORBIDDEN');
  }

  if (!user.companyId || user.companyId !== targetCompanyId) {
    throw new AuthError(
      `Từ chối truy cập: Người dùng không thuộc doanh nghiệp '${targetCompanyId}'. Vi phạm cách ly dữ liệu Multi-Tenant (IDOR Guard).`,
      403,
      'FORBIDDEN'
    );
  }
}
