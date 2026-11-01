import { RemovalPolicy } from 'aws-cdk-lib';

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
      'http://localhost:5173',
      'http://localhost:3000',
      'https://*.amplifyapp.com'
    ],
    maxUploadSizeBytes: 5 * 1024 * 1024, // 5MB
    presignedUrlTtlSeconds: 300, // 5 minutes
    notificationSenderEmail: process.env.SES_SENDER_EMAIL || 'no-reply@screening.example.com'
  };
}
