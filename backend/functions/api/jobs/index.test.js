const test = require('node:test');
const assert = require('node:assert');
const { handler } = require('../../../dist/functions/api/jobs/index.js');

test('POST /api/v1/jobs rejects unauthenticated requests', async () => {
  const event = {
    httpMethod: 'POST',
    path: '/api/v1/jobs',
    body: JSON.stringify({ title: 'DevOps Engineer' })
  };

  const response = await handler(event);
  assert.strictEqual(response.statusCode, 401);
  const body = JSON.parse(response.body);
  assert.strictEqual(body.success, false);
  assert.strictEqual(body.error.code, 'UNAUTHORIZED');
});

test('POST /api/v1/jobs rejects candidate role (requires recruiter)', async () => {
  const event = {
    httpMethod: 'POST',
    path: '/api/v1/jobs',
    headers: {
      'x-mock-user-id': 'cdd_123',
      'x-mock-role': 'candidate'
    },
    body: JSON.stringify({ title: 'DevOps Engineer' })
  };

  const response = await handler(event);
  assert.strictEqual(response.statusCode, 403);
  const body = JSON.parse(response.body);
  assert.strictEqual(body.error.code, 'FORBIDDEN');
});

test('POST /api/v1/jobs rejects invalid Rubric weights not summing to 100', async () => {
  const event = {
    httpMethod: 'POST',
    path: '/api/v1/jobs',
    headers: {
      'x-mock-user-id': 'rct_123',
      'x-mock-role': 'recruiter',
      'x-mock-company-id': 'comp_test_01'
    },
    body: JSON.stringify({
      title: 'Senior DevOps Engineer',
      companyId: 'comp_test_01',
      description: 'Mô tả công việc...',
      rubricWeights: {
        skills: 40,
        experience: 40,
        education: 15,
        culture: 15 // sum = 110 != 100
      }
    })
  };

  const response = await handler(event);
  assert.strictEqual(response.statusCode, 400);
  const body = JSON.parse(response.body);
  assert.strictEqual(body.error.code, 'BAD_REQUEST');
  assert.ok(body.error.message.includes('100 điểm'));
});

test('POST /api/v1/jobs enforces company isolation (Anti-IDOR)', async () => {
  const event = {
    httpMethod: 'POST',
    path: '/api/v1/jobs',
    headers: {
      'x-mock-user-id': 'rct_123',
      'x-mock-role': 'recruiter',
      'x-mock-company-id': 'comp_my_company'
    },
    body: JSON.stringify({
      title: 'DevOps Lead',
      companyId: 'comp_other_company', // Mismatched company!
      description: 'Mô tả...'
    })
  };

  const response = await handler(event);
  assert.strictEqual(response.statusCode, 403);
  const body = JSON.parse(response.body);
  assert.strictEqual(body.error.code, 'FORBIDDEN');
  assert.ok(body.error.message.includes('IDOR Guard'));
});
