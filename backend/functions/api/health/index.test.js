const test = require('node:test');
const assert = require('node:assert');
const { handler } = require('./index.js');

test('GET /api/v1/health returns 200 with UP status and CORS headers', async () => {
  const response = await handler({});
  assert.strictEqual(response.statusCode, 200);
  assert.strictEqual(response.headers['Content-Type'], 'application/json');
  assert.strictEqual(response.headers['Access-Control-Allow-Origin'], '*');

  const body = JSON.parse(response.body);
  assert.strictEqual(body.status, 'UP');
  assert.strictEqual(body.service, 'cv-portal-api');
  assert.ok(body.timestamp);
  assert.ok(body.stage);
});
