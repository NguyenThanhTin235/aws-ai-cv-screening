const test = require('node:test');
const assert = require('node:assert');
const { handler } = require('../../../dist/functions/api/applications/index.js');

test('POST /api/v1/applications/upload-url rejects non-PDF file type', async () => {
  const event = {
    httpMethod: 'POST',
    path: '/api/v1/applications/upload-url',
    headers: {
      'x-mock-user-id': 'cdd_123',
      'x-mock-role': 'candidate'
    },
    body: JSON.stringify({
      jobId: 'job_001',
      fileName: 'resume.docx',
      fileType: 'DOCX',
      fileSize: 102400
    })
  };

  const response = await handler(event);
  assert.strictEqual(response.statusCode, 400);
  const body = JSON.parse(response.body);
  assert.strictEqual(body.error.code, 'BAD_REQUEST');
  assert.ok(body.error.message.includes('PDF'));
});

test('POST /api/v1/applications/upload-url rejects files exceeding 5MB', async () => {
  const event = {
    httpMethod: 'POST',
    path: '/api/v1/applications/upload-url',
    headers: {
      'x-mock-user-id': 'cdd_123',
      'x-mock-role': 'candidate'
    },
    body: JSON.stringify({
      jobId: 'job_001',
      fileName: 'huge_resume.pdf',
      fileType: 'PDF',
      fileSize: 6 * 1024 * 1024 // 6MB > 5MB
    })
  };

  const response = await handler(event);
  assert.strictEqual(response.statusCode, 400);
  const body = JSON.parse(response.body);
  assert.strictEqual(body.error.code, 'BAD_REQUEST');
  assert.ok(body.error.message.includes('5MB'));
});

test('POST /api/v1/applications rejects submissions without user AI consent', async () => {
  const event = {
    httpMethod: 'POST',
    path: '/api/v1/applications',
    headers: {
      'x-mock-user-id': 'cdd_123',
      'x-mock-role': 'candidate'
    },
    body: JSON.stringify({
      jobId: 'job_001',
      documentId: 'doc_123',
      s3Key: 'quarantine/comp_01/job_001/doc_123.pdf',
      consentAi: false // Consent missing!
    })
  };

  const response = await handler(event);
  assert.strictEqual(response.statusCode, 400);
  const body = JSON.parse(response.body);
  assert.strictEqual(body.error.code, 'BAD_REQUEST');
  assert.ok(body.error.message.includes('đồng thuận'));
});

test('POST /api/v1/applications/{id}/cv-access-url rejects candidate role (requires recruiter)', async () => {
  const event = {
    httpMethod: 'POST',
    path: '/api/v1/applications/app_001/cv-access-url',
    pathParameters: { id: 'app_001' },
    headers: {
      'x-mock-user-id': 'cdd_123',
      'x-mock-role': 'candidate'
    }
  };

  const response = await handler(event);
  assert.strictEqual(response.statusCode, 403);
  const body = JSON.parse(response.body);
  assert.strictEqual(body.error.code, 'FORBIDDEN');
});
