/**
 * Database Seeder for AI CV Screening Portal (DynamoDB Single-Table)
 * Conforms to DOC-SW-03-DB (03-database-design.md)
 *
 * Usage:
 *   node scripts/seed-data.cjs           (Generates scripts/seed-payload.json and performs dry-run)
 *   node scripts/seed-data.cjs --write   (Attempts direct write to DynamoDB table cv-portal-dev-main-table)
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// Load .env.local if present
const envLocalPath = path.join(rootDir, '.env.local');
if (fs.existsSync(envLocalPath)) {
  const content = fs.readFileSync(envLocalPath, 'utf8');
  content.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx > 0) {
        const key = trimmed.substring(0, idx).trim();
        const val = trimmed.substring(idx + 1).trim();
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  });
}

const rawDataPath = path.join(rootDir, 'data.json');
const rawJobs = JSON.parse(fs.readFileSync(rawDataPath, 'utf8'));

const TABLE_NAME = process.env.TABLE_NAME || 'cv-portal-dev-main-table';
const REGION = process.env.AWS_REGION || 'us-east-1';

console.log(`[SEEDER] Reading ${rawJobs.length} jobs from ${rawDataPath}...`);

// 1. Extract Unique Companies
const companiesMap = new Map();
rawJobs.forEach((job) => {
  const c = job.company;
  if (!companiesMap.has(c.companyId)) {
    companiesMap.set(c.companyId, {
      companyId: c.companyId,
      companyName: c.companyName,
      companyScale: c.companyScale || '100+ nhân sự',
      website: c.website || '',
      logoUrl: c.logoUrl || '',
      status: 'ACTIVE',
      createdAt: '2026-10-25T08:00:00.000Z',
      updatedAt: '2026-11-01T08:00:00.000Z'
    });
  }
});

console.log(`[SEEDER] Extracted ${companiesMap.size} unique companies.`);

const ddbItems = [];

// 2. Build Company Entities (COMPANY#<id> / METADATA)
for (const comp of companiesMap.values()) {
  ddbItems.push({
    PK: `COMPANY#${comp.companyId}`,
    SK: 'METADATA',
    GSI1PK: 'COMPANIES',
    GSI1SK: `NAME#${comp.companyName}`,
    GSI2PK: `STATUS#${comp.status}`,
    GSI2SK: `CREATED#${comp.createdAt}`,
    entityType: 'COMPANY',
    companyId: comp.companyId,
    companyName: comp.companyName,
    companyScale: comp.companyScale,
    website: comp.website,
    logoUrl: comp.logoUrl,
    status: comp.status,
    isVerified: true,
    createdAt: comp.createdAt,
    updatedAt: comp.updatedAt
  });
}

// 3. Build Job Entities (JOB#<jobId> / METADATA)
rawJobs.forEach((job, idx) => {
  const createdAt = job.source && job.source.crawledAt 
    ? job.source.crawledAt 
    : `2026-11-01T${String(10 + (idx % 12)).padStart(2, '0')}:00:00.000Z`;

  ddbItems.push({
    PK: `JOB#${job.jobId}`,
    SK: 'METADATA',
    GSI1PK: `COMPANY#${job.company.companyId}`,
    GSI1SK: `JOB#${job.status || 'OPEN'}#${createdAt}`,
    GSI2PK: `JOBS#STATUS#${job.status || 'OPEN'}`,
    GSI2SK: `CREATED#${createdAt}`,
    entityType: 'JOB',
    jobId: job.jobId,
    title: job.title,
    companyId: job.company.companyId,
    companyName: job.company.companyName,
    level: job.level,
    workplaceType: job.workplaceType,
    employmentType: job.employmentType,
    location: job.location,
    salary: job.salary,
    experience: job.experience,
    skills: job.skills,
    description: job.description,
    requirements: job.requirements || [],
    benefits: job.benefits || [],
    rubricWeights: job.rubricWeights || { skills: 35, experience: 35, education: 15, culture: 15 },
    status: job.status || 'OPEN',
    moderationStatus: 'APPROVED',
    source: job.source || null,
    sourceUrl: job.sourceUrl || '',
    deadline: job.deadline || '2026-12-31T23:59:59.000Z',
    createdAt,
    updatedAt: createdAt
  });
});

// 4. Build Test Users & Email Lookups
const testUsers = [
  {
    userId: 'usr_rct_kms_01',
    email: 'recruiter.kms@kms-technology.com',
    fullName: 'Lê Minh HR Lead',
    role: 'RECRUITER',
    companyId: 'comp_CA1BA627275B437A',
    companyName: 'KMS Technology Vietnam'
  },
  {
    userId: 'usr_cdd_an_01',
    email: 'nguyen.van.an@cloudjob.vn',
    fullName: 'Nguyễn Văn An',
    role: 'CANDIDATE'
  },
  {
    userId: 'usr_cdd_mai_02',
    email: 'tran.thi.mai@cloudjob.vn',
    fullName: 'Trần Thị Mai',
    role: 'CANDIDATE'
  },
  {
    userId: 'usr_adm_super_01',
    email: 'admin@cloudjob.vn',
    fullName: 'System Super Administrator',
    role: 'ADMIN'
  }
];

testUsers.forEach((u) => {
  const createdAt = '2026-10-20T08:00:00.000Z';
  const item = {
    PK: `USER#${u.userId}`,
    SK: 'PROFILE',
    GSI1PK: `ROLE#${u.role}`,
    GSI1SK: `CREATED#${createdAt}`,
    entityType: 'USER',
    userId: u.userId,
    email: u.email,
    fullName: u.fullName,
    role: u.role,
    status: 'ACTIVE',
    createdAt,
    updatedAt: createdAt
  };
  if (u.companyId) {
    item.companyId = u.companyId;
    item.companyName = u.companyName;
    item.GSI2PK = `COMPANY#${u.companyId}`;
    item.GSI2SK = `MEMBER#${u.userId}`;
  }
  ddbItems.push(item);

  // Email Lookup item
  ddbItems.push({
    PK: `EMAIL#${u.email.toLowerCase()}`,
    SK: `USER#${u.userId}`,
    entityType: 'EMAIL_LOOKUP',
    email: u.email.toLowerCase(),
    userId: u.userId,
    role: u.role,
    createdAt
  });
});

// 5. Build Sample Candidate Applications with AI Screening Evaluations
const firstJob = rawJobs[0]; // e.g. Senior DevOps Engineer
const secondJob = rawJobs.find((j) => j.level === 'INTERN') || rawJobs[1]; // e.g. Intern DevOps

const sampleApps = [
  {
    appId: 'app_01J9XAK4M6P8Q0R2T4V6W8Y0Z1',
    jobId: firstJob.jobId,
    jobTitle: firstJob.title,
    companyId: firstJob.company.companyId,
    candidateId: 'usr_cdd_an_01',
    candidateName: 'Nguyễn Văn An',
    candidateEmail: 'nguyen.van.an@cloudjob.vn',
    score: 92,
    matchLevel: 'STRONG_MATCH',
    submittedAt: '2026-11-02T10:15:30.000Z',
    criteriaScores: {
      technicalSkills: { score: 33, maxScore: 35, analysis: 'Thành thạo AWS, Terraform, Docker, Kubernetes và CI/CD' },
      workExperience: { score: 32, maxScore: 35, analysis: 'Hơn 5 năm kinh nghiệm quản trị hệ thống phân tán' },
      educationCertifications: { score: 14, maxScore: 15, analysis: 'Có chứng chỉ AWS Solutions Architect Associate' },
      culturePresentation: { score: 13, maxScore: 15, analysis: 'CV trình bày rõ ràng, cấu trúc logic, giải pháp chi tiết' }
    },
    keyStrengths: [
      'Kinh nghiệm thực chiến triển khai Kubernetes EKS và GitOps',
      'Làm chủ công nghệ Infrastructure as Code (Terraform) và Docker',
      'Khả năng tự động hóa hệ thống bằng Python và Bash shell'
    ],
    areasForImprovement: [
      'Bổ sung thêm kinh nghiệm quản trị FinOps và tối ưu chi phí hạ tầng'
    ],
    summary: 'Ứng viên có năng lực kỹ thuật nổi bật, đáp ứng 92% tiêu chí của vị trí Senior DevOps.'
  },
  {
    appId: 'app_01J9XAK4M6P8Q0R2T4V6W8Y0Z2',
    jobId: secondJob.jobId,
    jobTitle: secondJob.title,
    companyId: secondJob.company.companyId,
    candidateId: 'usr_cdd_mai_02',
    candidateName: 'Trần Thị Mai',
    candidateEmail: 'tran.thi.mai@cloudjob.vn',
    score: 88,
    matchLevel: 'STRONG_MATCH',
    submittedAt: '2026-11-02T14:30:00.000Z',
    criteriaScores: {
      technicalSkills: { score: 30, maxScore: 35, analysis: 'Nắm vững kiến thức nền tảng Linux, Git, Docker cơ bản' },
      workExperience: { score: 29, maxScore: 35, analysis: 'Đã hoàn thành các đồ án tốt nghiệp về hệ thống CI/CD' },
      educationCertifications: { score: 15, maxScore: 15, analysis: 'Sinh viên năm cuối Đại học Bách Khoa GPA 3.6/4.0' },
      culturePresentation: { score: 14, maxScore: 15, analysis: 'Thái độ cầu thị, ham học hỏi, tiếng Anh đọc hiểu tài liệu tốt' }
    },
    keyStrengths: [
      'Nền tảng khoa học máy tính vững chắc, tư duy thuật toán tốt',
      'Đã tự cấu hình CI/CD trên GitLab cá nhân và containerize ứng dụng Node.js'
    ],
    areasForImprovement: [
      'Cần tích lũy thêm kinh nghiệm thực chiến trên môi trường Production'
    ],
    summary: 'Ứng viên thực tập sinh rất tiềm năng, điểm đánh giá 88/100, đề xuất mời phỏng vấn.'
  }
];

sampleApps.forEach((app) => {
  const padScore = String(app.score).padStart(3, '0');
  ddbItems.push({
    PK: `APP#${app.appId}`,
    SK: 'METADATA',
    GSI1PK: `JOB#${app.jobId}`,
    GSI1SK: `SCORE#${padScore}#${app.appId}`,
    GSI2PK: `USER#${app.candidateId}`,
    GSI2SK: `APP#${app.submittedAt}`,
    entityType: 'APPLICATION',
    applicationId: app.appId,
    jobId: app.jobId,
    jobTitle: app.jobTitle,
    companyId: app.companyId,
    candidateId: app.candidateId,
    candidateName: app.candidateName,
    candidateEmail: app.candidateEmail,
    status: 'SUBMITTED',
    aiStatus: 'COMPLETED',
    aiEvaluation: {
      totalScore: app.score,
      matchLevel: app.matchLevel,
      criteriaScores: app.criteriaScores,
      keyStrengths: app.keyStrengths,
      areasForImprovement: app.areasForImprovement,
      executiveSummary: app.summary,
      evaluatedAt: app.submittedAt,
      modelUsed: 'anthropic.claude-haiku-4-5-20251001-v1:0'
    },
    cv: {
      fileName: `${app.candidateName.replace(/\s+/g, '_')}_CV.pdf`,
      fileSize: 150000,
      fileType: 'PDF'
    },
    submittedAt: app.submittedAt,
    updatedAt: app.submittedAt,
    version: 1
  });
});

console.log(`[SEEDER] Total DynamoDB items generated: ${ddbItems.length}`);
console.log(`  - Company items: ${companiesMap.size}`);
console.log(`  - Job items: ${rawJobs.length}`);
console.log(`  - User & Lookup items: ${testUsers.length * 2}`);
console.log(`  - Sample Application items: ${sampleApps.length}`);

// Write JSON export payload
const payloadPath = path.join(rootDir, 'scripts', 'seed-payload.json');
fs.writeFileSync(payloadPath, JSON.stringify(ddbItems, null, 2), 'utf8');
console.log(`[SEEDER] Successfully exported ${ddbItems.length} items to ${payloadPath}`);

// If --write flag is supplied, attempt write to DynamoDB
async function writeToDynamoDB() {
  const shouldWrite = process.argv.includes('--write');
  if (!shouldWrite) {
    console.log('[SEEDER] Dry-run completed. To write to AWS DynamoDB, run: node scripts/seed-data.cjs --write');
    return;
  }

  console.log(`[SEEDER] Connecting to DynamoDB table: ${TABLE_NAME} (Region: ${REGION})...`);
  try {
    const { DynamoDBClient } = require(path.join(rootDir, 'backend', 'node_modules', '@aws-sdk', 'client-dynamodb'));
    const { DynamoDBDocumentClient, BatchWriteCommand } = require(path.join(rootDir, 'backend', 'node_modules', '@aws-sdk', 'lib-dynamodb'));

    const client = new DynamoDBClient({ region: REGION });
    const docClient = DynamoDBDocumentClient.from(client);

    // DynamoDB BatchWriteItem accepts up to 25 items per call
    const BATCH_SIZE = 25;
    for (let i = 0; i < ddbItems.length; i += BATCH_SIZE) {
      const chunk = ddbItems.slice(i, i + BATCH_SIZE);
      const putRequests = chunk.map((item) => ({
        PutRequest: { Item: item }
      }));

      const params = {
        RequestItems: {
          [TABLE_NAME]: putRequests
        }
      };

      console.log(`[SEEDER] Writing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(ddbItems.length / BATCH_SIZE)} (${chunk.length} items)...`);
      await docClient.send(new BatchWriteCommand(params));
    }
    console.log('[SEEDER] All items written successfully to DynamoDB!');
  } catch (err) {
    console.warn('[SEEDER] Direct DynamoDB write could not complete in this local environment:', err.message);
    console.log('[SEEDER] The full seed payload is safely preserved in scripts/seed-payload.json for cloud/CI deployment.');
  }
}

writeToDynamoDB();

