const test = require('node:test');
const assert = require('node:assert');
const { successResponse, errorResponse } = require('../dist/shared/response.js');
const {
  extractUserFromEvent,
  requireAuth,
  assertRole,
  assertCompanyAccess,
  AuthError
} = require('../dist/shared/tenant-guard.js');

test('Shared response: successResponse generates standardized envelope', () => {
  const result = successResponse({ id: '123' }, { pageLimit: 20, hasMore: false }, 200);
  assert.strictEqual(result.statusCode, 200);
  assert.strictEqual(result.headers['Access-Control-Allow-Origin'], '*');

  const body = JSON.parse(result.body);
  assert.strictEqual(body.success, true);
  assert.deepStrictEqual(body.data, { id: '123' });
  assert.strictEqual(body.meta.pageLimit, 20);
});

test('Shared response: errorResponse generates standardized envelope with details', () => {
  const result = errorResponse('BAD_REQUEST', 'Validation failed', 400, [{ field: 'fileSize', issue: 'Max 5MB' }]);
  assert.strictEqual(result.statusCode, 400);

  const body = JSON.parse(result.body);
  assert.strictEqual(body.success, false);
  assert.strictEqual(body.error.code, 'BAD_REQUEST');
  assert.strictEqual(body.error.details[0].field, 'fileSize');
  assert.ok(body.error.traceId);
});

test('TenantGuard: extracts user from Cognito authorizer claims', () => {
  const event = {
    requestContext: {
      authorizer: {
        claims: {
          sub: 'usr_cdd_001',
          email: 'candidate@test.com',
          'cognito:groups': 'candidate',
          name: 'Nguyen Van An'
        }
      }
    }
  };

  const user = extractUserFromEvent(event);
  assert.ok(user);
  assert.strictEqual(user.userId, 'usr_cdd_001');
  assert.strictEqual(user.role, 'candidate');
  assert.strictEqual(user.email, 'candidate@test.com');
});

test('TenantGuard: extracts recruiter with companyId and enforces company isolation (Anti-IDOR)', () => {
  const event = {
    requestContext: {
      authorizer: {
        claims: {
          sub: 'usr_rct_001',
          email: 'hr@finstream.vn',
          'cognito:groups': 'recruiter',
          'custom:company_id': 'comp_finstream_001'
        }
      }
    }
  };

  const user = requireAuth(event);
  assert.strictEqual(user.role, 'recruiter');
  assert.strictEqual(user.companyId, 'comp_finstream_001');

  // Same company -> OK
  assert.doesNotThrow(() => {
    assertCompanyAccess(user, 'comp_finstream_001');
  });

  // Different company -> throws FORBIDDEN
  assert.throws(
    () => {
      assertCompanyAccess(user, 'comp_other_company');
    },
    (err) => err instanceof AuthError && err.statusCode === 403
  );
});

test('TenantGuard: extracts dev mock headers when authorizer claims are absent', () => {
  const event = {
    headers: {
      'x-mock-user-id': 'dev_user_99',
      'x-mock-role': 'recruiter',
      'x-mock-company-id': 'comp_test_123'
    }
  };

  const user = requireAuth(event);
  assert.strictEqual(user.userId, 'dev_user_99');
  assert.strictEqual(user.role, 'recruiter');
  assert.strictEqual(user.companyId, 'comp_test_123');
});
