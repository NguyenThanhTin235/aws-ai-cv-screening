const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const rawDataPath = path.join(rootDir, 'data.json');
const rawData = JSON.parse(fs.readFileSync(rawDataPath, 'utf8'));

console.log(`Loading ${rawData.length} jobs from data.json...`);

const LEVEL_MAP = {
  INTERN: 'Intern',
  FRESHER_JUNIOR: 'Fresher / Junior',
  MIDDLE: 'Middle',
  SENIOR: 'Senior Specialist',
  LEAD_ARCHITECT: 'Lead / Principal Architect'
};

const WORK_TYPE_MAP = {
  HYBRID: 'Hybrid linh hoạt',
  REMOTE: 'Làm từ xa / Remote',
  ON_SITE: 'Toàn thời gian',
  PART_TIME: 'Bán thời gian'
};

const PERK_TYPES = ['star', 'bolt', 'award', 'gift', 'shield'];

function getCompanyBranding(companyName, index) {
  const lower = companyName.toLowerCase();
  if (
    lower.includes('bank') ||
    lower.includes('momo') ||
    lower.includes('zalopay') ||
    lower.includes('shopeepay') ||
    lower.includes('fin') ||
    lower.includes('9pay') ||
    lower.includes('trusting')
  ) {
    return {
      logoType: 'bank',
      logoGradient: 'linear-gradient(135deg, #1e3a8a 0%, #0369a1 100%)'
    };
  }
  if (
    lower.includes('shopee') ||
    lower.includes('tiki') ||
    lower.includes('vexere') ||
    lower.includes('de heus') ||
    lower.includes('one mount')
  ) {
    return {
      logoType: 'cart',
      logoGradient: 'linear-gradient(135deg, #c2410c 0%, #ea580c 100%)'
    };
  }
  if (
    lower.includes('vinbigdata') ||
    lower.includes('vinsoc') ||
    lower.includes('ai') ||
    lower.includes('data') ||
    lower.includes('amanotes')
  ) {
    return {
      logoType: 'brain',
      logoGradient: 'linear-gradient(135deg, #6d28d9 0%, #4338ca 100%)'
    };
  }
  if (lower.includes('axon') || lower.includes('security') || lower.includes('soc')) {
    return {
      logoType: 'shield',
      logoGradient: 'linear-gradient(135deg, #374151 0%, #111827 100%)'
    };
  }

  const cloudGradients = [
    'linear-gradient(135deg, #095744 0%, #246955 100%)',
    'linear-gradient(135deg, #0f766e 0%, #115e59 100%)',
    'linear-gradient(135deg, #047857 0%, #065f46 100%)',
    'linear-gradient(135deg, #15803d 0%, #166534 100%)'
  ];
  return {
    logoType: 'cloud',
    logoGradient: cloudGradients[index % cloudGradients.length]
  };
}

const POSTED_TIMES = [
  'Đăng 1 giờ trước',
  'Đăng 2 giờ trước',
  'Đăng 3 giờ trước',
  'Đăng 5 giờ trước',
  'Đăng hôm nay',
  'Đăng hôm qua',
  'Đăng 2 ngày trước'
];

const transformedJobs = rawData.map((job, idx) => {
  const branding = getCompanyBranding(job.company.companyName, idx);
  const perkType = PERK_TYPES[idx % PERK_TYPES.length];
  const postedTime = POSTED_TIMES[idx % POSTED_TIMES.length];

  // Match score & badge
  let matchScore = 80 + ((idx * 7 + 13) % 19); // 80 - 98
  if (idx < 5) matchScore = 95 - idx; // Top jobs 95, 94, 93, 92, 91
  const isTopMatch = idx < 3;
  let badgeType = 'hot';
  if (isTopMatch) badgeType = 'match';
  else if (idx % 3 === 0) badgeType = 'new';

  // Format Location string
  const locParts = [];
  if (job.location.district) locParts.push(job.location.district);
  if (job.location.province) locParts.push(job.location.province);
  let locStr = locParts.join(', ');
  if (job.location.ward) {
    locStr += ` • ${job.location.ward}`;
  }

  // Perks string
  const perks = Array.isArray(job.benefits) && job.benefits.length > 0
    ? job.benefits.slice(0, 3).join(' • ')
    : 'Chế độ đãi ngộ cạnh tranh • Đào tạo chuyên môn • Bảo hiểm cao cấp';

  // Rubric weights & breakdown
  const weights = job.rubricWeights || { skills: 35, experience: 35, education: 15, culture: 15 };
  const expScore = Math.round((weights.experience / 100) * matchScore);
  const skillsScore = Math.round((weights.skills / 100) * matchScore);
  const eduScore = Math.round((weights.education / 100) * matchScore);
  const cultScore = matchScore - (expScore + skillsScore + eduScore);

  const topSkills = job.skills.slice(0, 3).join(', ');
  const rubricSummary = `Hồ sơ đạt độ tương thích ${matchScore}% với yêu cầu tuyển dụng nhờ nền tảng vững vàng về ${topSkills} và kinh nghiệm phù hợp với cấp bậc ${LEVEL_MAP[job.level] || job.level}.`;

  const strengths = [
    `Kinh nghiệm thực hành tốt với các công nghệ lõi: ${job.skills.slice(0, 4).join(', ')}`,
    `Đáp ứng yêu cầu kinh nghiệm: ${job.experience.experienceText || 'Phù hợp yêu cầu'}`,
    `Tương thích cao với mô hình làm việc ${WORK_TYPE_MAP[job.workplaceType] || 'Linh hoạt'}`
  ];

  const improvements = [
    `Bổ sung thêm các chứng chỉ chuyên sâu về ${job.skills[0] || 'Cloud'} để gia tăng điểm thẩm định`,
    `Trình bày chi tiết hơn các dự án thực tế về quy mô người dùng và tối ưu chi phí`
  ];

  return {
    id: job.jobId,
    title: job.title,
    companyName: job.company.companyName,
    companyScale: job.company.companyScale || 'Quy mô: 100+ nhân sự',
    isVerified: true,
    matchScore,
    badgeType,
    salaryText: job.salary.salaryText || `${job.salary.min} - ${job.salary.max} triệu / tháng`,
    salaryMin: Number(job.salary.min),
    salaryMax: Number(job.salary.max),
    location: locStr,
    experience: job.experience.experienceText || `${job.experience.yearsMin || 0}+ năm kinh nghiệm`,
    postedTime,
    workType: WORK_TYPE_MAP[job.workplaceType] || 'Toàn thời gian',
    level: LEVEL_MAP[job.level] || 'Middle',
    description: job.description,
    skills: job.skills,
    perks,
    perkType,
    logoGradient: branding.logoGradient,
    logoType: branding.logoType,
    isTopMatch,
    rubricBreakdown: {
      total: matchScore,
      experience: expScore,
      skills: skillsScore,
      education: eduScore,
      culture: cultScore,
      summary: rubricSummary,
      strengths,
      improvements
    },
    // Raw metadata for detail popups and backend
    companyId: job.company.companyId,
    rawLocation: job.location,
    requirements: job.requirements || [],
    benefits: job.benefits || [],
    source: job.source || null,
    deadline: job.deadline || null
  };
});

// Generate TypeScript file
const tsContent = `// Auto-generated from data.json (35 enterprise tech jobs)
// Generated at: ${new Date().toISOString()}

export interface DetailedJob {
  id: string;
  title: string;
  companyName: string;
  companyScale: string;
  isVerified: boolean;
  matchScore?: number;
  badgeType?: 'match' | 'new' | 'hot';
  salaryText: string;
  salaryMin: number;
  salaryMax: number;
  location: string;
  experience: string;
  postedTime: string;
  workType: 'Toàn thời gian' | 'Bán thời gian' | 'Làm từ xa / Remote' | 'Hybrid linh hoạt';
  level: 'Intern' | 'Fresher / Junior' | 'Middle' | 'Senior Specialist' | 'Lead / Principal Architect';
  description: string;
  skills: string[];
  perks: string;
  perkType: 'star' | 'bolt' | 'award' | 'gift' | 'shield';
  logoGradient: string;
  logoType: 'cloud' | 'bank' | 'brain' | 'cart' | 'shield';
  isTopMatch?: boolean;
  rubricBreakdown?: {
    total: number;
    experience: number;
    skills: number;
    education: number;
    culture: number;
    summary: string;
    strengths: string[];
    improvements: string[];
  };
  companyId?: string;
  rawLocation?: {
    fullAddress?: string;
    province?: string;
    district?: string;
    ward?: string;
    isPostJuly2025?: boolean;
  };
  requirements?: string[];
  benefits?: string[];
  source?: {
    platform?: string;
    originalUrl?: string;
    crawledAt?: string;
  } | null;
  deadline?: string | null;
}

export const ALL_JOBS: DetailedJob[] = ${JSON.stringify(transformedJobs, null, 2)};

export const getJobById = (id: string): DetailedJob | undefined => {
  return ALL_JOBS.find(j => j.id === id);
};

export const getJobsByCompany = (companyNameOrId: string): DetailedJob[] => {
  const query = companyNameOrId.toLowerCase();
  return ALL_JOBS.filter(
    j => (j.companyId && j.companyId.toLowerCase() === query) ||
         j.companyName.toLowerCase().includes(query)
  );
};

export const getJobsByLevel = (level: string): DetailedJob[] => {
  return ALL_JOBS.filter(j => j.level === level);
};

export const getJobsByProvince = (province: string): DetailedJob[] => {
  const p = province.toLowerCase();
  return ALL_JOBS.filter(j => j.location.toLowerCase().includes(p));
};
`;

const outputPath = path.join(rootDir, 'frontend', 'src', 'data', 'jobsData.ts');
fs.writeFileSync(outputPath, tsContent, 'utf8');
console.log(`Successfully generated ${transformedJobs.length} jobs to ${outputPath}`);

