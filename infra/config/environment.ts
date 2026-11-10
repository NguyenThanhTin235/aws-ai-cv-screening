import { RemovalPolicy } from 'aws-cdk-lib';
import * as fs from 'fs';
import * as path from 'path';

function loadLocalEnv() {
  const envFiles = [
    path.resolve(__dirname, '../../.env.local'),
    path.resolve(__dirname, '../../.env')
  ];
  for (const file of envFiles) {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      for (const line of content.split('\n')) {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
          const key = match[1];
          let val = (match[2] || '').trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    }
  }
}

loadLocalEnv();

export interface EnvironmentConfig {
  stage: string;
  projectName: string;
  region: string;
  enableWaf: boolean;
  removalPolicy: RemovalPolicy;
  corsAllowedOrigins: string[];
  maxUploadSizeBytes: number;
  presignedUrlTtlSeconds: number;
  notificationSenderEmail?: string;
  googleClientId?: string;
  googleClientSecret?: string;
}

export function getEnvironmentConfig(): EnvironmentConfig {
  const stage = process.env.STAGE || 'dev';
  const isProd = stage === 'prod';

  return {
    stage,
    projectName: 'cv-portal',
    region: process.env.AWS_REGION || 'us-east-1',
    enableWaf: process.env.ENABLE_WAF === 'true' || isProd,
    removalPolicy: isProd ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
    corsAllowedOrigins: [
      '*'
    ],
    maxUploadSizeBytes: 5 * 1024 * 1024, // 5MB
    presignedUrlTtlSeconds: 300, // 5 minutes
    notificationSenderEmail: process.env.SES_SENDER_EMAIL || 'no-reply@screening.example.com',
    googleClientId: process.env.GOOGLE_CLIENT_ID || '1038087279902-husm5cmfn4nbk3prnrg63b0loqlv0vfb.apps.googleusercontent.com',
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET
  };
}

