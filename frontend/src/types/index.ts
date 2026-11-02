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
