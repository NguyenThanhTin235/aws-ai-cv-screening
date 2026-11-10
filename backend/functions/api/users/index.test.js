const test = require('node:test');
const assert = require('node:assert');
const { handler } = require('../../../dist/functions/api/users/index.js');

test('GET /api/v1/users/me rejects unauthenticated requests', async () => {
  const event = {
    httpMethod: 'GET',
    path: '/api/v1/users/me'
  };

  const response = await handler(event);
  assert.strictEqual(response.statusCode, 401);
  const body = JSON.parse(response.body);
  assert.strictEqual(body.success, false);
  assert.strictEqual(body.error.code, 'UNAUTHORIZED');
});

test('GET /api/v1/users/me returns profile for authenticated user', async () => {
  const event = {
    httpMethod: 'GET',
    path: '/api/v1/users/me',
    headers: {
      'x-mock-user-id': 'usr_cdd_099',
      'x-mock-role': 'candidate',
      'x-mock-email': 'an.nguyen@cloudjob.vn'
    }
  };

  const response = await handler(event);
  assert.strictEqual(response.statusCode, 200);
  const body = JSON.parse(response.body);
  assert.strictEqual(body.success, true);
  assert.strictEqual(body.data.userId, 'usr_cdd_099');
  assert.strictEqual(body.data.role, 'candidate');
});

test('GET /api/v1/users/me/cvs rejects recruiter role (candidate only)', async () => {
  const event = {
    httpMethod: 'GET',
    path: '/api/v1/users/me/cvs',
    headers: {
      'x-mock-user-id': 'usr_rct_099',
      'x-mock-role': 'recruiter',
      'x-mock-company-id': 'comp_01'
    }
  };

  const response = await handler(event);
  assert.strictEqual(response.statusCode, 403);
  const body = JSON.parse(response.body);
  assert.strictEqual(body.error.code, 'FORBIDDEN');
});
