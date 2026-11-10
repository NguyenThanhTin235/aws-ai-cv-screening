export type UserRole = 'candidate' | 'recruiter' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  companyId?: string;
  companyName?: string;
  phone?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  companyName: string;
  companyId: string;
  companyLogo?: string;
  location: string;
  workType: 'Toàn thời gian' | 'Bán thời gian' | 'Làm từ xa (Remote)' | 'Hybrid';
  level: 'Junior' | 'Middle' | 'Senior' | 'Lead / Architect';
  salaryMin: number;
  salaryMax: number;
  salaryCurrency: string;
  skills: string[];
  description: string;
  postedAt: string;
  isVerified: boolean;
  rubricWeights?: {
    skills: number;
    experience: number;
    education: number;
    presentation: number;
  };
}

export interface HealthStatus {
  status: 'UP' | 'DOWN' | 'CHECKING';
  stage?: string;
  region?: string;
  timestamp?: string;
  latencyMs?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    pageLimit?: number;
    nextCursor?: string | null;
    hasMore?: boolean;
    total?: number;
  };
  error?: {
    code: string;
    message: string;
    details?: Array<{ field?: string; issue: string }>;
    traceId?: string;
  };
}

export interface UploadUrlResponse {
  uploadUrl: string;
  s3Key: string;
  documentId: string;
  expiresInSeconds: number;
}

export interface ApplicationItem {
  applicationId: string;
  jobId: string;
  jobTitle: string;
  companyId: string;
  companyName: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  documentId: string;
  s3Key: string;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'INVITED' | 'REJECTED' | 'WITHDRAWN';
  aiStatus: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'NEEDS_MANUAL_REVIEW';
  aiScore: number;
  matchLevel: string;
  submittedAt: string;
  updatedAt: string;
}


