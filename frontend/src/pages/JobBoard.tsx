import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/job-board.css';
import {
  SearchIcon,
  MapPinIcon,
  SparklesIcon,
  ArrowRightIcon,
  TrendingUpIcon,
  SlidersIcon,
  CheckIcon,
  VerifiedIcon,
  BookmarkIcon,
  DollarSignIcon,
  BriefcaseIcon,
  ClockIcon,
  StarIcon,
  BoltIcon,
  AwardIcon,
  GiftIcon,
  ShieldIcon,
  CloudIcon,
  BankIcon,
  BrainIcon,
  ShoppingCartIcon,
  FireIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DocumentScannerIcon,
  UploadIcon,
  XIcon
} from '../components/common/Icons';

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
  level: 'Fresher / Junior' | 'Middle' | 'Senior Specialist' | 'Lead / Principal Architect';
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
}

const JOBS_DATA: DetailedJob[] = [
  {
    id: 'job_001',
    title: 'Senior AWS Cloud Architect (Serverless & FinOps)',
    companyName: 'CloudNexus Solutions',
    companyScale: 'Quy mô: 250+ nhân sự',
    isVerified: true,
    matchScore: 95,
    badgeType: 'match',
    salaryText: '$3,000 - $4,200 / tháng',
    salaryMin: 3000,
    salaryMax: 4200,
    location: 'Quận 1, TP. Hồ Chí Minh (Hỗ trợ 2 ngày Remote/tuần)',
    experience: '5+ năm kinh nghiệm',
    postedTime: 'Đăng 2 giờ trước',
    workType: 'Toàn thời gian',
    level: 'Senior Specialist',
    description:
      'Thiết kế kiến trúc hệ thống High Availability chịu tải 100k+ RPS trên nền tảng AWS Lambda, DynamoDB, API Gateway và tối ưu hóa chi phí đám mây FinOps. Trực tiếp làm việc cùng các Enterprise Lead Architect khu vực APAC.',
    skills: ['AWS Lambda', 'Terraform', 'DynamoDB', 'FinOps', 'Docker', 'Kubernetes EKS'],
    perks: 'Thưởng hiệu suất AWS Cert • Bảo hiểm quốc tế • Thưởng dự án Quý',
    perkType: 'star',
    logoGradient: 'linear-gradient(135deg, #095744 0%, #246955 100%)',
    logoType: 'cloud',
    isTopMatch: true,
    rubricBreakdown: {
      total: 95,
      experience: 34,
      skills: 29,
      education: 15,
      culture: 17,
      summary:
        'Hồ sơ của bạn khớp 95% với yêu cầu vị trí nhờ kinh nghiệm 5+ năm kiến trúc AWS Serverless, chứng chỉ AWS Solutions Architect Professional và kinh nghiệm FinOps đã kiểm chứng.',
      strengths: [
        'Kinh nghiệm thực chiến thiết kế AWS Lambda & DynamoDB chịu tải cao (>100k RPS)',
        'Sử dụng thành thạo Terraform và Amazon CloudWatch Metrics',
        'Có chứng chỉ AWS Solutions Architect Professional hợp lệ'
      ],
      improvements: [
        'Bổ sung thêm các dự án cụ thể về quản lý FinOps đa tài khoản AWS Organizations'
      ]
    }
  },
  {
    id: 'job_002',
    title: 'Lead DevOps Engineer (AWS EKS & GitOps Automation)',
    companyName: 'FinStream Digital Bank',
    companyScale: 'Tài chính & Ngân hàng',
    isVerified: true,
    matchScore: 91,
    badgeType: 'match',
    salaryText: '$2,800 - $3,800 / tháng',
    salaryMin: 2800,
    salaryMax: 3800,
    location: 'Cầu Giấy, Hà Nội • Làm việc từ xa (Remote 100%)',
    experience: '4+ năm DevOps / SRE',
    postedTime: 'Đăng 5 giờ trước',
    workType: 'Làm từ xa / Remote',
    level: 'Lead / Principal Architect',
    description:
      'Quản lý cụm Kubernetes EKS nhiều môi trường (Production/Staging), thiết lập chuẩn hóa GitOps với ArgoCD và hệ thống giám sát Prometheus/Grafana phục vụ hạ tầng lõi Core Banking.',
    skills: ['AWS EKS', 'ArgoCD', 'GitOps', 'Terraform', 'Prometheus', 'CI/CD'],
    perks: 'Cung cấp MacBook Pro M3 Max • 18 ngày phép năm • Xét thưởng 2 lần/năm',
    perkType: 'bolt',
    logoGradient: 'linear-gradient(135deg, #565e74 0%, #131b2e 100%)',
    logoType: 'bank',
    rubricBreakdown: {
      total: 91,
      experience: 32,
      skills: 28,
      education: 14,
      culture: 17,
      summary:
        'Điểm tương thích rất cao trong mảng vận hành AWS EKS và tự động hóa GitOps với ArgoCD theo chuẩn PCI-DSS của ngân hàng.',
      strengths: [
        'Kinh nghiệm sâu về Kubernetes EKS multi-cluster',
        'Làm chủ quy trình CI/CD GitOps bảo mật cao',
        'Kinh nghiệm giám sát hạ tầng với Prometheus & Grafana'
      ],
      improvements: [
        'Cần mở rộng kinh nghiệm về Service Mesh (Istio / AWS App Mesh)'
      ]
    }
  },
  {
    id: 'job_003',
    title: 'Senior Backend Engineer (Python & AWS Bedrock GenAI)',
    companyName: 'DataPulse Intelligence',
    companyScale: 'AI SaaS Startup',
    isVerified: true,
    matchScore: 88,
    badgeType: 'match',
    salaryText: '$2,500 - $3,500 / tháng',
    salaryMin: 2500,
    salaryMax: 3500,
    location: 'Hải Châu, Đà Nẵng / Hybrid 3 ngày',
    experience: '3+ năm Python',
    postedTime: 'Hôm qua',
    workType: 'Hybrid linh hoạt',
    level: 'Senior Specialist',
    description:
      'Xây dựng backend cho giải pháp RAG enterprise, tích hợp API từ AWS Bedrock (Claude Haiku 4.5, Titan Embeddings), OpenSearch Serverless và tối ưu hóa xử lý truy vấn embedding đồng thời.',
    skills: ['Python', 'FastAPI', 'AWS Bedrock', 'LangChain', 'OpenSearch', 'Docker'],
    perks: 'ESOP cổ phần ưu đãi • Tài trợ 100% chi phí thi chứng chỉ AWS Specialty',
    perkType: 'award',
    logoGradient: 'linear-gradient(135deg, #45009b 0%, #6106d2 100%)',
    logoType: 'brain',
    rubricBreakdown: {
      total: 88,
      experience: 30,
      skills: 27,
      education: 15,
      culture: 16,
      summary:
        'Hồ sơ phù hợp tốt với việc phát triển ứng dụng GenAI trên AWS Bedrock và xử lý vector search với OpenSearch Serverless.',
      strengths: [
        'Kỹ năng Python và FastAPI vững vàng',
        'Có kinh nghiệm tích hợp LLM APIs và LangChain orchestration'
      ],
      improvements: [
        'Nâng cao kiến thức về fine-tuning embeddings và RAG evaluation metrics'
      ]
    }
  },
  {
    id: 'job_004',
    title: 'Senior Fullstack Engineer (React 19 & Node.js Microservices)',
    companyName: 'OmniRetail eCommerce Corp',
    companyScale: 'Bán lẻ đa kênh',
    isVerified: false,
    badgeType: 'new',
    salaryText: '$2,200 - $3,200 / tháng',
    salaryMin: 2200,
    salaryMax: 3200,
    location: 'TP. Hồ Chí Minh • Toàn thời gian',
    experience: '4+ năm kinh nghiệm',
    postedTime: 'Đăng 6 giờ trước',
    workType: 'Toàn thời gian',
    level: 'Middle',
    description:
      'Phát triển web app merchant dashboard với React 19, TypeScript, hệ thống Microservices backend triển khai trên AWS ECS Fargate, cơ sở dữ liệu PostgreSQL partitioned.',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS ECS', 'PostgreSQL', 'GraphQL'],
    perks: 'Gói khám sức khỏe VIP Vinmec • Ăn trưa miễn phí tại văn phòng',
    perkType: 'gift',
    logoGradient: 'linear-gradient(135deg, #131b2e 0%, #565e74 100%)',
    logoType: 'cart'
  },
  {
    id: 'job_005',
    title: 'Cloud Security & Compliance Engineer (AWS IAM / DevSecOps)',
    companyName: 'SecOps Guardian Enterprise',
    companyScale: 'An ninh mạng & Compliance',
    isVerified: true,
    badgeType: 'hot',
    salaryText: '$2,600 - $3,600 / tháng',
    salaryMin: 2600,
    salaryMax: 3600,
    location: 'TP. Hồ Chí Minh / Hà Nội (Hybrid)',
    experience: '3-5 năm Cloud Security',
    postedTime: 'Hôm qua',
    workType: 'Hybrid linh hoạt',
    level: 'Middle',
    description:
      'Thiết lập và giám sát chính sách AWS Security Hub, GuardDuty, AWS KMS, IAM Least-privilege cho hạ tầng tài chính tuân thủ Nghị định 13/2023/NĐ-CP và tiêu chuẩn ISO 27001 / PCI-DSS.',
    skills: ['AWS IAM', 'KMS', 'Security Hub', 'CIS Benchmark', 'Python'],
    perks: 'Trợ cấp bảo mật định kỳ • Đào tạo chứng chỉ AWS Security Specialty',
    perkType: 'shield',
    logoGradient: 'linear-gradient(135deg, #ba1a1a 0%, #93000a 100%)',
    logoType: 'shield'
  }
];

export const JobBoard: React.FC = () => {
  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  // Search & Filter States
  const [keyword, setKeyword] = useState('AWS Senior');
  const [locationFilter, setLocationFilter] = useState('all');
  const isAiMatchingActive = true;

  // Work Mode filter states
  const [workModes, setWorkModes] = useState<Record<string, boolean>>({
    'Toàn thời gian': true,
    'Bán thời gian': false,
    'Làm từ xa / Remote': true,
    'Hybrid linh hoạt': false
  });

  // Seniority filter states
  const [levels, setLevels] = useState<Record<string, boolean>>({
    'Fresher / Junior': false,
    Middle: true,
    'Senior Specialist': true,
    'Lead / Principal Architect': false
  });

  // Skill Pills
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['AWS', 'Docker']);
  const availableSkills = [
    'AWS',
    'Docker',
    'Kubernetes',
    'Terraform',
    'Node.js',
    'Python',
    'React',
    'Serverless'
  ];

  // Verified Rubric Toggle
  const [rubricOnly, setRubricOnly] = useState(true);

  // Sort State
  const [sortBy, setSortBy] = useState('ai-best');

  // Bookmarked Jobs
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  // Rubric Modal State
  const [activeRubricJob, setActiveRubricJob] = useState<DetailedJob | null>(null);

  // Toggle skill selection
  const handleToggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Toggle bookmark
  const handleToggleBookmark = (id: string) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter((item) => item !== id));
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
    }
  };

  // Reset filters
  const handleResetFilters = () => {
    setKeyword('');
    setLocationFilter('all');
    setWorkModes({
      'Toàn thời gian': false,
      'Bán thời gian': false,
      'Làm từ xa / Remote': false,
      'Hybrid linh hoạt': false
    });
    setLevels({
      'Fresher / Junior': false,
      Middle: false,
      'Senior Specialist': false,
      'Lead / Principal Architect': false
    });
    setSelectedSkills([]);
    setRubricOnly(false);
  };

  // Count active work modes
  const activeWorkModesCount = Object.values(workModes).filter(Boolean).length;

  // Filter & sort logic
  const filteredJobs = JOBS_DATA.filter((job) => {
    // Keyword match
    if (keyword.trim()) {
      const kw = keyword.toLowerCase();
      const inTitle = job.title.toLowerCase().includes(kw);
      const inCompany = job.companyName.toLowerCase().includes(kw);
      const inSkills = job.skills.some((s) => s.toLowerCase().includes(kw));
      if (!inTitle && !inCompany && !inSkills) return false;
    }

    // Location match
    if (locationFilter === 'hcm' && !job.location.includes('Hồ Chí Minh')) return false;
    if (locationFilter === 'hn' && !job.location.includes('Hà Nội')) return false;
    if (locationFilter === 'dn' && !job.location.includes('Đà Nẵng')) return false;
    if (locationFilter === 'remote' && !job.location.toLowerCase().includes('remote')) return false;

    // Work Mode
    const selectedModes = Object.entries(workModes)
      .filter(([_, val]) => val)
      .map(([key]) => key);
    if (selectedModes.length > 0 && !selectedModes.includes(job.workType)) {
      return false;
    }

    // Seniority Level
    const selectedLevels = Object.entries(levels)
      .filter(([_, val]) => val)
      .map(([key]) => key);
    if (selectedLevels.length > 0 && !selectedLevels.includes(job.level)) {
      return false;
    }

    // Skill pills
    if (selectedSkills.length > 0) {
      const hasSkill = selectedSkills.some((s) =>
        job.skills.some((js) => js.toLowerCase().includes(s.toLowerCase()))
      );
      if (!hasSkill) return false;
    }

    // Rubric only
    if (rubricOnly && !job.rubricBreakdown) {
      // Allow jobs that have verified rubric
      return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'ai-best') {
      return (b.matchScore || 0) - (a.matchScore || 0);
    }
    if (sortBy === 'salary') {
      return b.salaryMax - a.salaryMax;
    }
    return 0;
  });

  const handleApply = (_job: DetailedJob) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (role === 'candidate') {
      navigate('/candidate');
    } else {
      alert(`Tài khoản của bạn là ${role}. Vui lòng đăng nhập với tài khoản Ứng viên để nộp đơn!`);
    }
  };

  // Render company logo icon
  const renderLogoIcon = (type: DetailedJob['logoType']) => {
    switch (type) {
      case 'cloud':
        return <CloudIcon size={28} color="#ffffff" />;
      case 'bank':
        return <BankIcon size={28} color="#ffffff" />;
      case 'brain':
        return <BrainIcon size={28} color="#ffffff" />;
      case 'cart':
        return <ShoppingCartIcon size={28} color="#ffffff" />;
      case 'shield':
        return <ShieldIcon size={28} color="#ffffff" />;
      default:
        return <CloudIcon size={28} color="#ffffff" />;
    }
  };

  // Render perk icon
  const renderPerkIcon = (type: DetailedJob['perkType']) => {
    switch (type) {
      case 'star':
        return <StarIcon size={18} color="var(--color-primary-container)" />;
      case 'bolt':
        return <BoltIcon size={18} color="var(--color-primary-container)" />;
      case 'award':
        return <AwardIcon size={18} color="var(--color-primary-container)" />;
      case 'gift':
        return <GiftIcon size={18} color="var(--color-primary-container)" />;
      case 'shield':
        return <ShieldIcon size={18} color="var(--color-primary-container)" />;
      default:
        return <StarIcon size={18} color="var(--color-primary-container)" />;
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--color-surface)', minHeight: '100vh' }}>
      {/* HERO SECTION */}
      <section className="jb-hero">
        <div className="jb-container">
          <div className="jb-hero-headline-box">
            <h1 className="jb-hero-title">
              CloudJob - Nâng tầm sự nghiệp, Kết nối việc làm Cloud
            </h1>
          </div>

          {/* Main Floating Search Bar Card */}
          <div className="jb-search-card">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="jb-search-grid"
            >
              {/* Keyword Input */}
              <div className="jb-input-field">
                <SearchIcon size={20} color="var(--color-primary-container)" />
                <input
                  type="text"
                  placeholder="Vị trí, kỹ năng: AWS, React, Python, Kubernetes..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  aria-label="Từ khóa tìm kiếm"
                />
              </div>

              {/* Location Select */}
              <div className="jb-input-field">
                <MapPinIcon size={20} color="var(--color-primary-container)" />
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  aria-label="Địa điểm làm việc"
                >
                  <option value="all">Tất cả địa điểm</option>
                  <option value="hcm">TP. Hồ Chí Minh</option>
                  <option value="hn">Hà Nội</option>
                  <option value="dn">Đà Nẵng</option>
                  <option value="remote">Làm từ xa (Remote 100%)</option>
                </select>
              </div>

              {/* Submit Search Button */}
              <button type="submit" className="jb-btn-search">
                <span>Tìm kiếm</span>
                <ArrowRightIcon size={18} color="#ffffff" />
              </button>
            </form>
          </div>

          {/* Trending Keywords */}
          <div className="jb-trending-row">
            <span style={{ fontWeight: '600', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <TrendingUpIcon size={16} color="#90d4bb" />
              Từ khóa hot:
            </span>
            {[
              'AWS Cloud Architect',
              'DevOps Senior',
              'Golang Backend',
              'AI Engineer (Bedrock)',
              'Fullstack Node/React'
            ].map((kw) => (
              <button
                key={kw}
                type="button"
                className="jb-trending-pill"
                onClick={() => setKeyword(kw)}
              >
                {kw}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN 2-COLUMN WORKSPACE */}
      <section className="jb-workspace">
        <div className="jb-container">
          <div className="jb-workspace-grid">
            {/* ASIDE FILTER PANEL (Left Column) */}
            <aside className="jb-filter-panel">
              {/* Header */}
              <div className="jb-filter-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <SlidersIcon size={18} color="var(--color-primary-container)" />
                  <h2>Bộ Lọc Nâng Cao</h2>
                </div>
                <button
                  type="button"
                  className="jb-filter-reset-btn"
                  onClick={handleResetFilters}
                >
                  Đặt lại
                </button>
              </div>

              {/* Group 1: Work Mode */}
              <div className="jb-filter-group">
                <div className="jb-filter-group-title">
                  <span>Hình thức làm việc</span>
                  <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', fontWeight: '400' }}>
                    {activeWorkModesCount} đã chọn
                  </span>
                </div>
                {[
                  { key: 'Toàn thời gian', count: 18 },
                  { key: 'Bán thời gian', count: 3 },
                  { key: 'Làm từ xa / Remote', count: 12 },
                  { key: 'Hybrid linh hoạt', count: 9 }
                ].map(({ key, count }) => (
                  <label key={key} className="jb-filter-checkbox-row">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={!!workModes[key]}
                        onChange={(e) =>
                          setWorkModes({ ...workModes, [key]: e.target.checked })
                        }
                        style={{ accentColor: 'var(--color-primary-container)', width: '16px', height: '16px' }}
                      />
                      <span>{key}</span>
                    </div>
                    <span className="jb-filter-count-badge">{count}</span>
                  </label>
                ))}
              </div>

              {/* Group 2: Seniority */}
              <div className="jb-filter-group" style={{ paddingTop: '8px', borderTop: '1px solid var(--color-surface-container)' }}>
                <div className="jb-filter-group-title">
                  <span>Cấp bậc kinh nghiệm</span>
                </div>
                {[
                  { key: 'Fresher / Junior', count: 4 },
                  { key: 'Middle', count: 10 },
                  { key: 'Senior Specialist', count: 14 },
                  { key: 'Lead / Principal Architect', count: 6 }
                ].map(({ key, count }) => (
                  <label key={key} className="jb-filter-checkbox-row">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={!!levels[key]}
                        onChange={(e) =>
                          setLevels({ ...levels, [key]: e.target.checked })
                        }
                        style={{ accentColor: 'var(--color-primary-container)', width: '16px', height: '16px' }}
                      />
                      <span>{key}</span>
                    </div>
                    <span className="jb-filter-count-badge">{count}</span>
                  </label>
                ))}
              </div>

              {/* Group 3: Salary Range */}
              <div className="jb-filter-group" style={{ paddingTop: '8px', borderTop: '1px solid var(--color-surface-container)' }}>
                <div className="jb-filter-group-title">
                  <span>Mức lương mong muốn</span>
                  <span style={{ fontSize: '12px', color: 'var(--color-primary-container)', fontWeight: '700' }}>
                    $1,200 - $4,500
                  </span>
                </div>

                <div className="jb-slider-track">
                  <div className="jb-slider-fill" />
                  <div className="jb-slider-thumb-left" />
                  <div className="jb-slider-thumb-right" />
                </div>

                <div className="jb-salary-range-display">
                  <div className="jb-salary-range-pill">$1,200/tháng</div>
                  <span style={{ color: 'var(--color-on-surface-variant)' }}>đến</span>
                  <div className="jb-salary-range-pill">$4,500/tháng</div>
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', cursor: 'pointer', fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>
                  <input
                    type="checkbox"
                    defaultChecked
                    style={{ accentColor: 'var(--color-primary-container)', width: '15px', height: '15px' }}
                  />
                  <span>Bao gồm lương &quot;Thỏa thuận&quot;</span>
                </label>
              </div>

              {/* Group 4: Technology Pills */}
              <div className="jb-filter-group" style={{ paddingTop: '8px', borderTop: '1px solid var(--color-surface-container)' }}>
                <div className="jb-filter-group-title">
                  <span>Kỹ năng &amp; Công nghệ</span>
                </div>
                <div className="jb-skill-pills">
                  {availableSkills.map((skill) => {
                    const isSelected = selectedSkills.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        className={`jb-skill-pill-btn ${isSelected ? 'active' : ''}`}
                        onClick={() => handleToggleSkill(skill)}
                      >
                        <span>{skill}</span>
                        {isSelected && <CheckIcon size={12} color="#ffffff" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Group 5: Verified Rubric Toggle */}
              <div className="jb-rubric-box">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-on-surface)' }}>
                    Minh bạch Rubric AI
                  </span>
                  <label className="jb-switch" style={{ width: '32px', height: '18px' }} aria-label="Chỉ hiện việc có Rubric AI">
                    <input
                      type="checkbox"
                      checked={rubricOnly}
                      onChange={(e) => setRubricOnly(e.target.checked)}
                    />
                    <span className="jb-slider" />
                  </label>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', margin: 0, lineHeight: 1.45 }}>
                  Chỉ hiển thị các tin có bộ tiêu chí chấm điểm tự động đã qua thẩm định.
                </p>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                <button type="button" className="jb-btn-apply-filters">
                  Áp dụng bộ lọc ({filteredJobs.length})
                </button>
                <button
                  type="button"
                  className="jb-btn-clear-filters"
                  onClick={handleResetFilters}
                >
                  Xóa tất cả bộ lọc
                </button>
              </div>
            </aside>

            {/* MAIN JOBS FEED (Right Column) */}
            <main>
              {/* Results Status Bar */}
              <div className="jb-feed-status-bar">
                <div className="jb-status-title-group">
                  <span className="jb-status-title">
                    Tìm thấy {filteredJobs.length} việc làm phù hợp
                  </span>
                  <span className="jb-status-pill">
                    AWS • Senior • Remote/HCM
                  </span>
                </div>

                <div className="jb-sort-group">
                  <label htmlFor="sort-select">Sắp xếp theo:</label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="jb-sort-select"
                  >
                    <option value="ai-best">Độ khớp AI cao nhất (Khuyên dùng)</option>
                    <option value="newest">Mới nhất hôm nay</option>
                    <option value="salary">Mức lương cao nhất</option>
                  </select>
                </div>
              </div>

              {/* Jobs List */}
              <div className="jb-job-list">
                {filteredJobs.length === 0 ? (
                  <div
                    style={{
                      padding: '48px 24px',
                      textAlign: 'center',
                      backgroundColor: 'var(--color-surface-container-lowest)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--color-surface-container-high)'
                    }}
                  >
                    <p style={{ fontSize: '16px', fontWeight: '600', color: 'var(--color-on-surface)', marginBottom: '8px' }}>
                      Không tìm thấy việc làm phù hợp với bộ lọc hiện tại
                    </p>
                    <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginBottom: '16px' }}>
                      Thử xóa bớt các tiêu chí lọc kỹ năng hoặc địa điểm để xem thêm kết quả.
                    </p>
                    <button
                      type="button"
                      className="jb-btn-apply"
                      onClick={handleResetFilters}
                    >
                      Đặt lại bộ lọc
                    </button>
                  </div>
                ) : (
                  filteredJobs.map((job) => {
                    const isBookmarked = bookmarkedIds.includes(job.id);
                    return (
                      <article key={job.id} className="jb-job-card">
                        {job.isTopMatch && <div className="jb-card-accent-bar" />}

                        {/* Top Row: Company Logo + Name + Title & AI Match Badge */}
                        <div className="jb-card-top-row">
                          <div className="jb-company-info-group">
                            <div
                              className="jb-company-logo"
                              style={{ background: job.logoGradient }}
                            >
                              {renderLogoIcon(job.logoType)}
                            </div>

                            <div>
                              <div className="jb-company-name-row">
                                <span className="jb-company-name">{job.companyName}</span>
                                {job.isVerified && (
                                  <span
                                    title="Doanh nghiệp đối tác được xác thực"
                                    style={{ color: 'var(--color-primary-container)', display: 'inline-flex' }}
                                  >
                                    <VerifiedIcon size={16} />
                                  </span>
                                )}
                                <span>• {job.companyScale}</span>
                              </div>

                              <h3
                                className="jb-job-title"
                                onClick={() => handleApply(job)}
                              >
                                {job.title}
                              </h3>
                            </div>
                          </div>

                          {/* Badge: Match % or New or Hot */}
                          <div>
                            {job.badgeType === 'match' && job.matchScore && (
                              <div
                                className="jb-match-badge"
                                style={{ opacity: isAiMatchingActive ? 1 : 0.25 }}
                              >
                                <SparklesIcon size={15} color="var(--color-primary-container)" />
                                <span>AI Match {job.matchScore}%</span>
                              </div>
                            )}

                            {job.badgeType === 'new' && (
                              <div className="jb-new-badge">
                                <span>Mới đăng tuyển hôm nay</span>
                              </div>
                            )}

                            {job.badgeType === 'hot' && (
                              <div className="jb-hot-badge">
                                <FireIcon size={15} color="var(--color-on-error-container)" />
                                <span>Hot Job Tuyển Gấp</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Quick Info Row */}
                        <div className="jb-quick-info-row">
                          <div className="jb-info-item jb-info-salary">
                            <DollarSignIcon size={16} color="var(--color-primary-container)" />
                            <span>{job.salaryText}</span>
                          </div>

                          <div className="jb-info-item">
                            <MapPinIcon size={16} color="var(--color-on-surface-variant)" />
                            <span>{job.location}</span>
                          </div>

                          <div className="jb-info-item">
                            <BriefcaseIcon size={16} color="var(--color-on-surface-variant)" />
                            <span>{job.experience}</span>
                          </div>

                          <div className="jb-info-item">
                            <ClockIcon size={16} color="var(--color-on-surface-variant)" />
                            <span>{job.postedTime}</span>
                          </div>
                        </div>

                        {/* Job Description */}
                        <p className="jb-job-desc">{job.description}</p>

                        {/* Skill Tags */}
                        <div className="jb-tag-row">
                          {job.skills.map((s) => (
                            <span key={s} className="jb-tag-pill">
                              {s}
                            </span>
                          ))}
                        </div>

                        {/* Bottom Perks & Action Buttons */}
                        <div className="jb-card-bottom-row">
                          <div className="jb-perks-text">
                            {renderPerkIcon(job.perkType)}
                            <span>{job.perks}</span>
                          </div>

                          <div className="jb-actions-group">
                            <button
                              type="button"
                              className="jb-btn-bookmark"
                              title={isBookmarked ? 'Bỏ lưu tin' : 'Lưu tin tuyển dụng'}
                              onClick={() => handleToggleBookmark(job.id)}
                            >
                              <BookmarkIcon
                                size={18}
                                color={isBookmarked ? 'var(--color-primary-container)' : 'currentColor'}
                              />
                            </button>

                            {job.rubricBreakdown ? (
                              <button
                                type="button"
                                className="jb-btn-rubric"
                                onClick={() => setActiveRubricJob(job)}
                              >
                                <span>Xem Rubric AI</span>
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="jb-btn-rubric"
                                onClick={() => handleApply(job)}
                              >
                                <span>Xem chi tiết</span>
                              </button>
                            )}

                            <button
                              type="button"
                              className="jb-btn-apply"
                              onClick={() => handleApply(job)}
                            >
                              Ứng tuyển ngay
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })
                )}
              </div>

              {/* PAGINATION BAR */}
              <div className="jb-pagination-bar">
                <span style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>
                  Hiển thị <strong style={{ color: 'var(--color-on-surface)' }}>1 - {filteredJobs.length}</strong> trong tổng số <strong style={{ color: 'var(--color-on-surface)' }}>24</strong> việc làm
                </span>

                <nav className="jb-pagination-nav" aria-label="Phân trang danh sách việc làm">
                  <button type="button" className="jb-page-btn-wide" disabled>
                    <ChevronLeftIcon size={14} />
                    <span>Trước</span>
                  </button>

                  <button type="button" className="jb-page-btn active">
                    1
                  </button>
                  <button type="button" className="jb-page-btn">
                    2
                  </button>
                  <button type="button" className="jb-page-btn">
                    3
                  </button>
                  <button type="button" className="jb-page-btn">
                    4
                  </button>

                  <button type="button" className="jb-page-btn-wide">
                    <span>Sau</span>
                    <ChevronRightIcon size={14} />
                  </button>
                </nav>
              </div>

              {/* BOTTOM CALL-TO-ACTION PROMO BANNER */}
              <div className="jb-promo-banner">
                <div className="jb-promo-content">
                  <div className="jb-promo-icon-box">
                    <DocumentScannerIcon size={28} color="#ffffff" />
                  </div>
                  <div>
                    <h4 className="jb-promo-title">
                      Chưa chắc chắn về độ phù hợp của CV với thị trường?
                    </h4>
                    <p className="jb-promo-desc">
                      Tải hồ sơ của bạn lên để AWS Bedrock AI phân tích miễn phí, rà soát từ khóa ATS và gợi ý danh sách việc làm có tỉ lệ phỏng vấn cao nhất!
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="jb-btn-promo"
                  onClick={() => {
                    if (isAuthenticated && role === 'candidate') {
                      navigate('/candidate');
                    } else {
                      navigate('/login');
                    }
                  }}
                >
                  <UploadIcon size={18} color="#ffffff" />
                  <span>Kiểm tra CV với AI ngay</span>
                </button>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* AI RUBRIC TRANSPARENCY MODAL */}
      {activeRubricJob && activeRubricJob.rubricBreakdown && (
        <div
          className="jb-modal-backdrop"
          onClick={() => setActiveRubricJob(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="jb-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="jb-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <SparklesIcon size={20} color="var(--color-primary-container)" />
                <h3>Báo Cáo Phân Tích Rubric AI - AWS Bedrock</h3>
              </div>
              <button
                type="button"
                className="jb-modal-close-btn"
                onClick={() => setActiveRubricJob(null)}
                aria-label="Đóng cửa sổ Rubric"
              >
                <XIcon size={20} />
              </button>
            </div>

            <div className="jb-modal-body">
              <div>
                <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginBottom: '4px' }}>
                  Vị trí tuyển dụng:
                </p>
                <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-on-surface)', margin: 0 }}>
                  {activeRubricJob.title}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--color-primary-container)', fontWeight: '600', marginTop: '2px' }}>
                  {activeRubricJob.companyName}
                </p>
              </div>

              {/* Total Score Banner */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(9, 87, 68, 0.08)',
                  border: '1px solid rgba(9, 87, 68, 0.2)'
                }}
              >
                <div>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-primary-container)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Tổng điểm tương thích hồ sơ
                  </span>
                  <p style={{ fontSize: '13px', color: 'var(--color-on-surface)', marginTop: '4px', maxWidth: '420px', lineHeight: 1.45 }}>
                    {activeRubricJob.rubricBreakdown.summary}
                  </p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '32px', fontWeight: '800', color: 'var(--color-primary-container)', lineHeight: 1 }}>
                    {activeRubricJob.rubricBreakdown.total}%
                  </span>
                  <span style={{ display: 'block', fontSize: '11px', color: 'var(--color-on-surface-variant)', marginTop: '2px' }}>
                    Chuẩn Haiku 4.5
                  </span>
                </div>
              </div>

              {/* 4 Rubric Pillars */}
              <div>
                <h5 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-on-surface)', marginBottom: '12px' }}>
                  Chi Tiết Điểm 4 Trụ Cột Đánh Giá
                </h5>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                  <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-surface-container)', textAlign: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', display: 'block' }}>Kinh nghiệm</span>
                    <strong style={{ fontSize: '18px', color: 'var(--color-primary-container)', display: 'block', marginTop: '4px' }}>
                      {activeRubricJob.rubricBreakdown.experience}/35đ
                    </strong>
                  </div>

                  <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-surface-container)', textAlign: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', display: 'block' }}>Kỹ năng kỹ thuật</span>
                    <strong style={{ fontSize: '18px', color: 'var(--color-primary-container)', display: 'block', marginTop: '4px' }}>
                      {activeRubricJob.rubricBreakdown.skills}/30đ
                    </strong>
                  </div>

                  <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-surface-container)', textAlign: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', display: 'block' }}>Học vấn &amp; Cert</span>
                    <strong style={{ fontSize: '18px', color: 'var(--color-primary-container)', display: 'block', marginTop: '4px' }}>
                      {activeRubricJob.rubricBreakdown.education}/15đ
                    </strong>
                  </div>

                  <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-surface-container)', textAlign: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', display: 'block' }}>Độ khớp văn hóa</span>
                    <strong style={{ fontSize: '18px', color: 'var(--color-primary-container)', display: 'block', marginTop: '4px' }}>
                      {activeRubricJob.rubricBreakdown.culture}/20đ
                    </strong>
                  </div>
                </div>
              </div>

              {/* Strengths List */}
              <div>
                <h5 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-on-surface)', marginBottom: '8px' }}>
                  Điểm mạnh nổi bật phát hiện trong CV:
                </h5>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: 'var(--color-on-surface-variant)', lineHeight: 1.6 }}>
                  {activeRubricJob.rubricBreakdown.strengths.map((str, idx) => (
                    <li key={idx}>{str}</li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '10px', borderTop: '1px solid var(--color-surface-container)' }}>
                <button
                  type="button"
                  className="jb-btn-clear-filters"
                  style={{ width: 'auto' }}
                  onClick={() => setActiveRubricJob(null)}
                >
                  Đóng
                </button>
                <button
                  type="button"
                  className="jb-btn-apply"
                  onClick={() => {
                    const job = activeRubricJob;
                    setActiveRubricJob(null);
                    handleApply(job);
                  }}
                >
                  Nộp đơn ứng tuyển vị trí này
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobBoard;
