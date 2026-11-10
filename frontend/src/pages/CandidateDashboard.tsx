import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ALL_JOBS, DetailedJob } from '../data/jobsData';
import { api } from '../services/api';
import { CompanyAvatar } from '../components/common/CompanyAvatar';
import '../styles/candidate-dashboard.css';

type ActiveTab =
  | 'saved-jobs'
  | 'applied-jobs'
  | 'matching-jobs'
  | 'job-preferences'
  | 'my-cv';

const VALID_TABS: ActiveTab[] = [
  'saved-jobs',
  'applied-jobs',
  'matching-jobs',
  'job-preferences',
  'my-cv'
];

const STATUS_FILTERS = [
  'Tất cả',
  'Tiếp nhận',
  'Đã xem',
  'Duyệt hồ sơ',
  'Cân nhắc',
  'Phù hợp',
  'Chưa phù hợp'
] as const;

type StatusFilter = (typeof STATUS_FILTERS)[number];

interface StatusConfig {
  label: string;
  message: string;
  color: string;
  badgeBg: string;
}

const APPLICATION_STATUS_CONFIG: Record<string, StatusConfig> = {
  'Tiếp nhận': {
    label: 'Tiếp nhận',
    message: 'Hồ sơ đã được tiếp nhận và chuyển thành công tới Bộ phận Tuyển dụng',
    color: '#0284c7', // Sky blue
    badgeBg: '#e0f2fe'
  },
  'Đã xem': {
    label: 'Đã xem',
    message: 'NTD đã xem CV. CloudJob đã nhắc NTD phản hồi CV của bạn',
    color: '#2563eb', // Royal blue
    badgeBg: '#dbeafe'
  },
  'Duyệt hồ sơ': {
    label: 'Duyệt hồ sơ',
    message: 'Hồ sơ đã vượt qua vòng sơ loại. Nhà tuyển dụng sẽ sớm liên hệ phỏng vấn',
    color: '#059669', // Emerald green
    badgeBg: '#d1fae5'
  },
  'Cân nhắc': {
    label: 'Cân nhắc',
    message: 'Hồ sơ đang được Nhà tuyển dụng đưa vào danh sách cân nhắc kỹ lưỡng',
    color: '#d97706', // Amber
    badgeBg: '#fef3c7'
  },
  'Phù hợp': {
    label: 'Phù hợp',
    message: 'Hồ sơ được đánh giá rất phù hợp với tiêu chuẩn tuyển dụng của vị trí này',
    color: '#095744', // Brand forest green
    badgeBg: '#d1fae5'
  },
  'Chưa phù hợp': {
    label: 'Chưa phù hợp',
    message: 'Hồ sơ chưa phù hợp với yêu cầu của vị trí này trong đợt tuyển dụng hiện tại',
    color: '#dc2626', // Red
    badgeBg: '#fee2e2'
  },
  'Đã rút đơn': {
    label: 'Đã rút đơn',
    message: 'Bạn đã chủ động rút đơn ứng tuyển cho vị trí này',
    color: '#64748b', // Slate gray
    badgeBg: '#f1f5f9'
  }
};

const normalizeStatus = (raw?: string): string => {
  if (!raw) return 'Tiếp nhận';
  const s = raw.trim().toUpperCase();
  if (s === 'WITHDRAWN' || s === 'ĐÃ RÚT ĐƠN') return 'Đã rút đơn';
  if (s === 'VIEWED' || s.includes('ĐÃ XEM') || s === 'ĐANG XỬ LÝ' || s === 'ĐANG XỬ LÝ AI') return 'Đã xem';
  if (s === 'SHORTLISTED' || s === 'APPROVED' || s === 'ACCEPTED' || s === 'DUYỆT HỒ SƠ') return 'Duyệt hồ sơ';
  if (s === 'CONSIDERING' || s === 'IN_REVIEW' || s === 'REVIEWING' || s === 'CÂN NHẮC') return 'Cân nhắc';
  if (s === 'MATCHED' || s === 'QUALIFIED' || s === 'SCREENED' || s === 'PHÙ HỢP' || s === 'ĐÃ THẨM ĐỊNH AI') return 'Phù hợp';
  if (s === 'REJECTED' || s === 'FAILED' || s.includes('CHƯA PHÙ HỢP') || s.includes('KHÔNG PHÙ HỢP')) return 'Chưa phù hợp';
  if (s === 'SUBMITTED' || s === 'PENDING_SCAN' || s === 'RECEIVED' || s === 'TIẾP NHẬN' || s === 'ĐÃ NỘP' || s === 'ĐÃ NỘP ĐƠN') return 'Tiếp nhận';

  if (APPLICATION_STATUS_CONFIG[raw]) return raw;
  return 'Tiếp nhận';
};

interface CandidateApp {
  id: string;
  jobId?: string;
  jobTitle: string;
  companyName: string;
  appliedAt: string;
  status: string;
  score: number;
  matchLevel: string;
  badgeColor: string;
  badgeBg: string;
  cvName?: string;
  statusMessage?: string;
  statusDate?: string;
  isReminded?: boolean;
}

interface StoredResume {
  id: string;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  isPrimary: boolean;
}

interface JobPreferences {
  targetRole: string;
  expectedSalary: string;
  preferredLocation: string;
  experienceLevel: string;
  skills: string;
}

export const CandidateDashboard: React.FC = () => {
  const { user } = useAuth();

  // URL Search Params & Tab State
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTabParam = searchParams.get('tab') as ActiveTab | null;
  const resolvedInitialTab: ActiveTab =
    initialTabParam && VALID_TABS.includes(initialTabParam)
      ? initialTabParam
      : 'applied-jobs';

  const [activeTab, setActiveTabState] = useState<ActiveTab>(resolvedInitialTab);
  const [isJobGroupOpen, setIsJobGroupOpen] = useState(
    ['saved-jobs', 'applied-jobs', 'matching-jobs', 'job-preferences'].includes(resolvedInitialTab)
  );
  const [isCvGroupOpen, setIsCvGroupOpen] = useState(resolvedInitialTab === 'my-cv');

  const setActiveTab = (tab: ActiveTab) => {
    setActiveTabState(tab);
    setSearchParams({ tab }, { replace: true });
  };

  // Sync tab whenever URL searchParams change (e.g. from Navbar dropdown)
  useEffect(() => {
    const tabParam = searchParams.get('tab') as ActiveTab | null;
    if (tabParam && VALID_TABS.includes(tabParam) && tabParam !== activeTab) {
      setActiveTabState(tabParam);
      if (['saved-jobs', 'applied-jobs', 'matching-jobs', 'job-preferences'].includes(tabParam)) {
        setIsJobGroupOpen(true);
      } else if (tabParam === 'my-cv') {
        setIsCvGroupOpen(true);
      }
    }
  }, [searchParams, activeTab]);

  // Notifications
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // 1. Applications State & Filter
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<StatusFilter>('Tất cả');
  const [applications, setApplications] = useState<CandidateApp[]>(() => {
    try {
      const saved = localStorage.getItem('candidate_applications');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const seen = new Set<string>();
          const deduped: CandidateApp[] = [];
          for (const app of parsed) {
            const key = app.jobId || app.jobTitle;
            const normStatus = normalizeStatus(app.status);
            const isActive = normStatus !== 'Đã rút đơn';
            if (isActive && seen.has(key)) continue;
            if (isActive) seen.add(key);

            const cfg = APPLICATION_STATUS_CONFIG[normStatus] || APPLICATION_STATUS_CONFIG['Tiếp nhận'];
            deduped.push({
              ...app,
              status: normStatus,
              statusMessage: app.statusMessage || cfg.message,
              badgeColor: cfg.color,
              badgeBg: cfg.badgeBg,
              statusDate: app.statusDate || '29-08-2026',
              cvName: app.cvName || 'Nguyen_Thanh_Tin_Senior_Cloud_DevOps.pdf'
            });
          }
          return deduped;
        }
      }
    } catch {
      // ignore
    }
    return [
      {
        id: 'app_01J9XAK4M6P8Q0R2T4V6W8Y001',
        jobId: ALL_JOBS[0]?.id || 'job_01',
        jobTitle: 'Thực Tập Sinh IT Ứng Dụng & Hệ Thống',
        companyName: 'CÔNG TY TNHH OQR',
        appliedAt: '22-08-2026 19:45',
        status: 'Đã xem',
        score: 85,
        matchLevel: 'Phù hợp',
        badgeColor: APPLICATION_STATUS_CONFIG['Đã xem'].color,
        badgeBg: APPLICATION_STATUS_CONFIG['Đã xem'].badgeBg,
        cvName: 'Nguyen_Thanh_Tin_Senior_Cloud_DevOps.pdf',
        statusMessage: APPLICATION_STATUS_CONFIG['Đã xem'].message,
        statusDate: '29-08-2026'
      },
      {
        id: 'app_01J9XAK4M6P8Q0R2T4V6W8Y002',
        jobId: ALL_JOBS[1]?.id || 'job_02',
        jobTitle: 'Thực Tập Sinh Backend Intern Full Time',
        companyName: 'CÔNG TY TNHH JOYHUB VIỆT NAM',
        appliedAt: '21-08-2026 22:31',
        status: 'Tiếp nhận',
        score: 88,
        matchLevel: 'Tiếp nhận',
        badgeColor: APPLICATION_STATUS_CONFIG['Tiếp nhận'].color,
        badgeBg: APPLICATION_STATUS_CONFIG['Tiếp nhận'].badgeBg,
        cvName: 'Nguyen_Thanh_Tin_Senior_Cloud_DevOps.pdf',
        statusMessage: APPLICATION_STATUS_CONFIG['Tiếp nhận'].message,
        statusDate: '28-08-2026'
      },
      {
        id: 'app_01J9XAK4M6P8Q0R2T4V6W8Y003',
        jobId: ALL_JOBS[2]?.id || 'job_03',
        jobTitle: 'Kỹ sư Giải pháp Đám mây AWS Cloud',
        companyName: 'CÔNG TY CỔ PHẦN VINSOC',
        appliedAt: '20-08-2026 14:15',
        status: 'Duyệt hồ sơ',
        score: 92,
        matchLevel: 'Xuất sắc',
        badgeColor: APPLICATION_STATUS_CONFIG['Duyệt hồ sơ'].color,
        badgeBg: APPLICATION_STATUS_CONFIG['Duyệt hồ sơ'].badgeBg,
        cvName: 'Nguyen_Thanh_Tin_Senior_Cloud_DevOps.pdf',
        statusMessage: APPLICATION_STATUS_CONFIG['Duyệt hồ sơ'].message,
        statusDate: '27-08-2026'
      },
      {
        id: 'app_01J9XAK4M6P8Q0R2T4V6W8Y004',
        jobId: ALL_JOBS[3]?.id || 'job_04',
        jobTitle: 'Senior DevOps / Site Reliability Engineer',
        companyName: 'KMS TECHNOLOGY VIỆT NAM',
        appliedAt: '15-08-2026 11:00',
        status: 'Cân nhắc',
        score: 79,
        matchLevel: 'Khá',
        badgeColor: APPLICATION_STATUS_CONFIG['Cân nhắc'].color,
        badgeBg: APPLICATION_STATUS_CONFIG['Cân nhắc'].badgeBg,
        cvName: 'Nguyen_Thanh_Tin_Senior_Cloud_DevOps.pdf',
        statusMessage: APPLICATION_STATUS_CONFIG['Cân nhắc'].message,
        statusDate: '22-08-2026'
      },
      {
        id: 'app_01J9XAK4M6P8Q0R2T4V6W8Y005',
        jobId: ALL_JOBS[4]?.id || 'job_05',
        jobTitle: 'Chuyên viên Phát triển AI / Fullstack Engineer',
        companyName: 'CÔNG TY TNHH AUTHENTIC EDUCATION',
        appliedAt: '18-08-2026 09:30',
        status: 'Phù hợp',
        score: 95,
        matchLevel: 'Rất cao',
        badgeColor: APPLICATION_STATUS_CONFIG['Phù hợp'].color,
        badgeBg: APPLICATION_STATUS_CONFIG['Phù hợp'].badgeBg,
        cvName: 'Nguyen_Thanh_Tin_Senior_Cloud_DevOps.pdf',
        statusMessage: APPLICATION_STATUS_CONFIG['Phù hợp'].message,
        statusDate: '24-08-2026'
      }
    ];
  });

  const [withdrawingId, setWithdrawingId] = useState<string | null>(null);

  // Pagination / Display limit for Applied Jobs (defaults to 3 items)
  const [appliedJobsLimit, setAppliedJobsLimit] = useState<number>(3);

  const filteredApplications = applications.filter((app) => {
    if (selectedStatusFilter === 'Tất cả') return app.status !== 'Đã rút đơn';
    return app.status === selectedStatusFilter;
  });

  const visibleApplications = filteredApplications.slice(0, appliedJobsLimit);

  // Sync Applications with API
  useEffect(() => {
    let isMounted = true;
    api.getMyApplications()
      .then((items) => {
        if (isMounted && Array.isArray(items) && items.length > 0) {
          const mapped: CandidateApp[] = items.map((item) => {
            const normStatus = normalizeStatus(item.status);
            const cfg = APPLICATION_STATUS_CONFIG[normStatus] || APPLICATION_STATUS_CONFIG['Tiếp nhận'];
            return {
              id: item.applicationId || item.PK?.replace('APP#', '') || item.id,
              jobId: item.jobId,
              jobTitle: item.jobTitle || 'Kỹ sư Phần mềm',
              companyName: item.companyName || 'Doanh nghiệp tuyển dụng',
              appliedAt: item.submittedAt ? item.submittedAt.split('T')[0] : '10/11/2026',
              status: normStatus,
              score: item.aiScore || 0,
              matchLevel: item.matchLevel || normStatus,
              badgeColor: cfg.color,
              badgeBg: cfg.badgeBg,
              statusMessage: item.statusMessage || cfg.message,
              statusDate: item.statusDate || (item.submittedAt ? item.submittedAt.split('T')[0] : '10/11/2026'),
              cvName: item.cvName || 'Nguyen_Thanh_Tin_Senior_Cloud_DevOps.pdf'
            };
          });
          setApplications(mapped);
          localStorage.setItem('candidate_applications', JSON.stringify(mapped));
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Saved Jobs State
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('saved_job_ids');
      if (stored) return JSON.parse(stored);
    } catch {}
    // Default saved jobs (first 2 from ALL_JOBS)
    return [ALL_JOBS[2]?.id, ALL_JOBS[3]?.id].filter(Boolean);
  });

  // Keep saved jobs in sync when switching tabs or when localStorage updates
  useEffect(() => {
    try {
      const stored = localStorage.getItem('saved_job_ids');
      if (stored) {
        setSavedJobIds(JSON.parse(stored));
      }
    } catch {}
  }, [activeTab]);

  const savedJobsList: DetailedJob[] = ALL_JOBS.filter((j) => savedJobIds.includes(j.id));

  // Pagination for Saved Jobs (3 jobs per page)
  const SAVED_JOBS_PER_PAGE = 3;
  const [savedJobsPage, setSavedJobsPage] = useState<number>(1);
  const totalSavedPages = Math.ceil(savedJobsList.length / SAVED_JOBS_PER_PAGE) || 1;
  const currentSavedPage = Math.min(savedJobsPage, totalSavedPages);
  const paginatedSavedJobs = savedJobsList.slice(
    (currentSavedPage - 1) * SAVED_JOBS_PER_PAGE,
    currentSavedPage * SAVED_JOBS_PER_PAGE
  );

  // Similar Jobs Display Limit (defaults to 2 items)
  const [similarJobsLimit, setSimilarJobsLimit] = useState<number>(2);

  // Matching Jobs Display Limit (defaults to 3 items)
  const [matchingJobsLimit, setMatchingJobsLimit] = useState<number>(3);

  const handleSaveJob = (jobId: string) => {
    if (savedJobIds.includes(jobId)) return;
    const updated = [...savedJobIds, jobId];
    setSavedJobIds(updated);
    localStorage.setItem('saved_job_ids', JSON.stringify(updated));
    triggerAlert('Đã lưu công việc vào danh sách');
  };

  const handleRemoveSavedJob = (jobId: string) => {
    const updated = savedJobIds.filter((id) => id !== jobId);
    setSavedJobIds(updated);
    localStorage.setItem('saved_job_ids', JSON.stringify(updated));
    triggerAlert('Đã xóa công việc khỏi danh sách lưu');
  };

  // Compute similar jobs based on saved jobs
  const savedSkills = new Set<string>();
  const savedLevels = new Set<string>();
  savedJobsList.forEach((j) => {
    j.skills.forEach((s) => savedSkills.add(s.toLowerCase()));
    if (j.level) savedLevels.add(j.level);
  });

  const similarJobsList = ALL_JOBS.filter((job) => {
    if (savedJobIds.includes(job.id)) return false;
    if (savedSkills.size === 0) return true;
    const matchesSkill = job.skills.some((s) => savedSkills.has(s.toLowerCase()));
    const matchesLevel = job.level && savedLevels.has(job.level);
    return matchesSkill || matchesLevel;
  })
    .sort((a, b) => {
      const countA = a.skills.filter((s) => savedSkills.has(s.toLowerCase())).length;
      const countB = b.skills.filter((s) => savedSkills.has(s.toLowerCase())).length;
      return countB - countA;
    })
    .slice(0, 8);

  // 3. Job Preferences State
  const [preferences, setPreferences] = useState<JobPreferences>(() => {
    try {
      const stored = localStorage.getItem('candidate_job_preferences');
      if (stored) return JSON.parse(stored);
    } catch {}
    return {
      targetRole: 'DevOps / Cloud Security Engineer',
      expectedSalary: '35 - 50 triệu / tháng',
      preferredLocation: 'Hà Nội',
      experienceLevel: 'Middle / Senior (3 - 5 năm)',
      skills: 'AWS, Terraform, Docker, Kubernetes, CI/CD'
    };
  });

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('candidate_job_preferences', JSON.stringify(preferences));
    triggerAlert('Đã lưu thành công cài đặt gợi ý việc làm');
  };

  // 4. Matching Jobs based on Preferences or Skills
  const matchingJobsList = ALL_JOBS.filter((job) => {
    const skillList = preferences.skills.toLowerCase().split(',').map((s) => s.trim());
    return job.skills.some((skillStr) => skillList.some((ps) => skillStr.toLowerCase().includes(ps)));
  }).slice(0, 6);

  // 5. Resumes State
  const [resumes, setResumes] = useState<StoredResume[]>(() => {
    try {
      const stored = localStorage.getItem('candidate_resumes');
      if (stored) return JSON.parse(stored);
    } catch {}
    return [
      {
        id: 'cv_01',
        fileName: 'Nguyen_Thanh_Tin_Senior_Cloud_DevOps.pdf',
        fileSize: '1.8 MB',
        uploadedAt: '05/11/2026',
        isPrimary: true
      },
      {
        id: 'cv_02',
        fileName: 'Nguyen_Thanh_Tin_Solution_Architect_EN.pdf',
        fileSize: '2.4 MB',
        uploadedAt: '01/11/2026',
        isPrimary: false
      }
    ];
  });

  const handleUploadResume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Dung lượng tệp vượt quá giới hạn cho phép (tối đa 5MB).');
      return;
    }

    const newResume: StoredResume = {
      id: `cv_${Date.now()}`,
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadedAt: new Date().toLocaleDateString('vi-VN'),
      isPrimary: resumes.length === 0
    };

    const updated = [newResume, ...resumes];
    setResumes(updated);
    localStorage.setItem('candidate_resumes', JSON.stringify(updated));
    triggerAlert('Tải lên CV mới thành công. Hồ sơ đã được quét mã độc an toàn.');
  };

  const handleSetPrimaryResume = (id: string) => {
    const updated = resumes.map((r) => ({ ...r, isPrimary: r.id === id }));
    setResumes(updated);
    localStorage.setItem('candidate_resumes', JSON.stringify(updated));
    triggerAlert('Đã cập nhật CV mặc định để nộp hồ sơ');
  };

  const handleDeleteResume = (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tệp CV này khỏi hệ thống?')) return;
    const updated = resumes.filter((r) => r.id !== id);
    if (updated.length > 0 && !updated.some((r) => r.isPrimary)) {
      updated[0].isPrimary = true;
    }
    setResumes(updated);
    localStorage.setItem('candidate_resumes', JSON.stringify(updated));
    triggerAlert('Đã xóa tệp CV khỏi tài khoản');
  };

  // Withdraw Application Handler
  const handleWithdraw = async (appId: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn rút đơn ứng tuyển này? Sau khi rút đơn, bạn có thể nộp lại hồ sơ mới nếu có nhu cầu.')) {
      return;
    }

    setWithdrawingId(appId);
    try {
      await api.withdrawApplication(appId);
    } catch (err) {
      console.warn('API withdraw skipped/simulated:', err);
    }

    const updated = applications.map((a) => {
      if (a.id === appId) {
        const cfg = APPLICATION_STATUS_CONFIG['Đã rút đơn'];
        return {
          ...a,
          status: 'Đã rút đơn',
          statusMessage: cfg.message,
          badgeColor: cfg.color,
          badgeBg: cfg.badgeBg
        };
      }
      return a;
    });

    setApplications(updated);
    localStorage.setItem('candidate_applications', JSON.stringify(updated));
    setWithdrawingId(null);
    triggerAlert('Đã rút đơn ứng tuyển thành công');
  };

  const triggerAlert = (msg: string) => {
    setAlertMessage(msg);
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };

  // Compute stats
  const activeApplicationsCount = applications.filter((a) => a.status !== 'Đã rút đơn').length;

  // Candidate ID derived or fallback
  const candidateId = user?.id ? user.id.replace(/\D/g, '').slice(0, 8) || '67149137' : '67149137';
  const candidateEmail = user?.email || 'thanhtin23122@gmail.com';
  const candidateName = user?.fullName || 'Tin Nguyen';

  return (
    <div className="cd-wrapper">
      <div className="cd-container">
        {/* ==============================================================================
           LEFT SIDEBAR: Profile Card & Accordion Navigation
           ============================================================================== */}
        <aside className="cd-sidebar">
          {/* User Profile Card */}
          <div className="cd-profile-card">
            <div className="cd-avatar-wrapper">
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt={candidateName} className="cd-avatar-img" />
              ) : (
                <span>{candidateName.charAt(0).toUpperCase()}</span>
              )}
            </div>

            <h2 className="cd-profile-name">{candidateName}</h2>

            <div>
              <span className="cd-verified-badge">Tài khoản đã xác thực</span>
            </div>

            <div className="cd-profile-meta">
              <span>ID {candidateId}</span>
              <span className="cd-profile-meta-sep">|</span>
              <span>{candidateEmail}</span>
            </div>
          </div>

          {/* Sidebar Navigation Accordion */}
          <nav className="cd-nav-accordion" aria-label="Menu quản lý ứng viên">
            {/* Group 1: Quản lý tìm việc */}
            <div className="cd-nav-group">
              <button
                type="button"
                className="cd-nav-group-header"
                onClick={() => setIsJobGroupOpen(!isJobGroupOpen)}
              >
                <span className="cd-nav-group-title">Quản lý tìm việc</span>
                <span className={`cd-nav-group-indicator ${isJobGroupOpen ? 'open' : ''}`}>
                  ▼
                </span>
              </button>

              {isJobGroupOpen && (
                <ul className="cd-nav-list">
                  <li>
                    <button
                      type="button"
                      className={`cd-nav-item ${activeTab === 'saved-jobs' ? 'active' : ''}`}
                      onClick={() => setActiveTab('saved-jobs')}
                    >
                      <span>Việc làm đã lưu</span>
                      <span className="cd-nav-count-badge">{savedJobIds.length}</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className={`cd-nav-item ${activeTab === 'applied-jobs' ? 'active' : ''}`}
                      onClick={() => setActiveTab('applied-jobs')}
                    >
                      <span>Việc làm đã ứng tuyển</span>
                      <span className="cd-nav-count-badge">{activeApplicationsCount}</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className={`cd-nav-item ${activeTab === 'matching-jobs' ? 'active' : ''}`}
                      onClick={() => setActiveTab('matching-jobs')}
                    >
                      <span>Việc làm phù hợp với bạn</span>
                      <span className="cd-nav-count-badge">{matchingJobsList.length}</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className={`cd-nav-item ${activeTab === 'job-preferences' ? 'active' : ''}`}
                      onClick={() => setActiveTab('job-preferences')}
                    >
                      <span>Cài đặt gợi ý việc làm</span>
                    </button>
                  </li>
                </ul>
              )}
            </div>

            {/* Group 2: Quản lý CV */}
            <div className="cd-nav-group">
              <button
                type="button"
                className="cd-nav-group-header"
                onClick={() => setIsCvGroupOpen(!isCvGroupOpen)}
              >
                <span className="cd-nav-group-title">Quản lý CV</span>
                <span className={`cd-nav-group-indicator ${isCvGroupOpen ? 'open' : ''}`}>
                  ▼
                </span>
              </button>

              {isCvGroupOpen && (
                <ul className="cd-nav-list">
                  <li>
                    <button
                      type="button"
                      className={`cd-nav-item ${activeTab === 'my-cv' ? 'active' : ''}`}
                      onClick={() => setActiveTab('my-cv')}
                    >
                      <span>CV của tôi</span>
                      <span className="cd-nav-count-badge">{resumes.length}</span>
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </nav>
        </aside>

        {/* ==============================================================================
           RIGHT MAIN CONTENT AREA
           ============================================================================== */}
        <main className="cd-content">
          {/* Alert Notification */}
          {alertMessage && (
            <div className="cd-alert-success" role="alert">
              {alertMessage}
            </div>
          )}

          {/* Top Metric Strip */}
          <section className="cd-metrics-grid">
            <div className="cd-metric-card">
              <div className="cd-metric-label">Đơn ứng tuyển</div>
              <div className="cd-metric-value">{activeApplicationsCount}</div>
              <div className="cd-metric-subtext">Hồ sơ đang hoạt động</div>
            </div>

            <div className="cd-metric-card">
              <div className="cd-metric-label">Việc đã lưu</div>
              <div className="cd-metric-value">{savedJobIds.length}</div>
              <div className="cd-metric-subtext">Vị trí quan tâm</div>
            </div>

            <div className="cd-metric-card">
              <div className="cd-metric-label">CV khả dụng</div>
              <div className="cd-metric-value">{resumes.length}</div>
              <div className="cd-metric-subtext">Đã quét an toàn</div>
            </div>

            <div className="cd-metric-card">
              <div className="cd-metric-label">Cơ hội phù hợp</div>
              <div className="cd-metric-value">{matchingJobsList.length}</div>
              <div className="cd-metric-subtext">Việc làm đề xuất</div>
            </div>
          </section>

          {/* ==============================================================================
             TAB CONTENT SWITCHER
             ============================================================================== */}

          {/* TAB 1: VIỆC LÀM ĐÃ ỨNG TUYỂN */}
          {activeTab === 'applied-jobs' && (
            <section className="cd-panel">
              <div className="cd-panel-header">
                <div className="cd-panel-title-area">
                  <h1 className="cd-panel-title">Việc làm đã ứng tuyển</h1>
                  <p className="cd-panel-desc">
                    Theo dõi trạng thái xét duyệt hồ sơ từ các nhà tuyển dụng hàng đầu
                  </p>
                </div>
                <div className="cd-panel-actions">
                  <Link to="/" className="cd-btn-primary">
                    Tìm kiếm thêm việc làm
                  </Link>
                </div>
              </div>

              {/* Status Filter Pills Row (as in image) */}
              <div className="cd-app-filter-tabs">
                {STATUS_FILTERS.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={`cd-app-filter-pill ${selectedStatusFilter === filter ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedStatusFilter(filter);
                      setAppliedJobsLimit(3);
                    }}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {filteredApplications.length === 0 ? (
                <div className="cd-empty-box">
                  <div className="cd-empty-title">Không tìm thấy đơn ứng tuyển nào</div>
                  <div className="cd-empty-desc">
                    {selectedStatusFilter === 'Tất cả'
                      ? 'Bạn chưa nộp hồ sơ vào vị trí tuyển dụng nào. Hãy khám phá cơ hội mới tại Job Board.'
                      : `Chưa có hồ sơ nào ở trạng thái "${selectedStatusFilter}".`}
                  </div>
                  {selectedStatusFilter === 'Tất cả' && (
                    <Link to="/" className="cd-btn-primary">
                      Xem danh sách việc làm
                    </Link>
                  )}
                </div>
              ) : (
                <>
                  <div className="cd-app-list">
                    {visibleApplications.map((app) => {
                      const statusCfg =
                        APPLICATION_STATUS_CONFIG[app.status] || APPLICATION_STATUS_CONFIG['Tiếp nhận'];
                      const statusText = app.statusMessage || statusCfg.message;
                      const statusSubDate =
                        app.statusDate || app.appliedAt.split(' ')[0] || '29-08-2026';

                      return (
                        <article key={app.id} className="cd-applied-card">
                          {/* Company Logo Box */}
                          <CompanyAvatar name={app.companyName} size={76} />

                          {/* Card Content Body */}
                          <div className="cd-applied-content">
                            <Link
                              to={app.jobId ? `/jobs/${app.jobId}` : '#'}
                              className="cd-applied-title"
                            >
                              {app.jobTitle}
                            </Link>

                            <div className="cd-applied-company">
                              {app.companyName.toUpperCase()}
                            </div>

                            <div className="cd-applied-meta">
                              <span>Ứng tuyển: {app.appliedAt}</span>
                              <span>|</span>
                              <button
                                type="button"
                                className="cd-applied-cv-link"
                                onClick={() =>
                                  triggerAlert(
                                    `Xem tệp: ${app.cvName || 'Nguyen_Thanh_Tin_Senior_Cloud_DevOps.pdf'}`
                                  )
                                }
                              >
                                CV ứng tuyển
                              </button>
                            </div>

                            <div className="cd-applied-divider" />

                            {/* Card Footer: Status & Action Buttons */}
                            <div className="cd-applied-bottom-row">
                              <div className="cd-applied-status-info">
                                <span
                                  className="cd-applied-status-text"
                                  style={{ color: statusCfg.color }}
                                >
                                  {statusText}
                                </span>
                                <span className="cd-applied-status-sub">({statusSubDate})</span>
                              </div>

                              <div className="cd-applied-actions">
                                {app.status !== 'Đã rút đơn' && (
                                  <button
                                    type="button"
                                    className="cd-btn-danger-outline"
                                    disabled={withdrawingId === app.id}
                                    onClick={() => handleWithdraw(app.id)}
                                    title="Rút đơn ứng tuyển"
                                  >
                                    {withdrawingId === app.id ? 'Đang rút...' : 'Rút đơn'}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>

                  {/* Load More Applied Jobs CTA Button */}
                  {filteredApplications.length > 3 && (
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                      {appliedJobsLimit < filteredApplications.length ? (
                        <button
                          type="button"
                          className="cd-btn-secondary"
                          onClick={() => setAppliedJobsLimit(filteredApplications.length)}
                          style={{ minWidth: '180px' }}
                        >
                          Xem thêm đơn ứng tuyển
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="cd-btn-secondary"
                          onClick={() => setAppliedJobsLimit(3)}
                          style={{ minWidth: '180px' }}
                        >
                          Thu gọn
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </section>
          )}

          {/* TAB 2: VIỆC LÀM ĐÃ LƯU */}
          {activeTab === 'saved-jobs' && (
            <section className="cd-panel">
              <div className="cd-panel-header">
                <div className="cd-panel-title-area">
                  <h1 className="cd-panel-title">Việc làm đã lưu</h1>
                  <p className="cd-panel-desc">
                    Danh sách các cơ hội nghề nghiệp bạn đã đánh dấu quan tâm để ứng tuyển sau
                  </p>
                </div>
                <div className="cd-panel-actions">
                  <Link to="/" className="cd-btn-secondary">
                    Khám phá thêm việc làm
                  </Link>
                </div>
              </div>

              {savedJobsList.length === 0 ? (
                <div className="cd-empty-box">
                  <div className="cd-empty-title">Bạn chưa lưu công việc nào</div>
                  <div className="cd-empty-desc">
                    Bấm nút Lưu tin trên các việc làm bạn quan tâm để lưu lại vào danh sách này.
                  </div>
                  <Link to="/" className="cd-btn-primary">
                    Khám phá việc làm ngay
                  </Link>
                </div>
              ) : (
                <>
                  <div className="cd-saved-grid">
                    {paginatedSavedJobs.map((job) => {
                      const isJobApplied = applications.some(
                        (a) => (a.jobId === job.id || a.jobTitle === job.title) && a.status !== 'Đã rút đơn'
                      );
                      const salaryDisplay =
                        job.salaryText || `${job.salaryMin} - ${job.salaryMax} triệu / tháng`;

                      return (
                        <article key={job.id} className="cd-saved-card">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: '260px' }}>
                            <CompanyAvatar name={job.companyName} size={46} />
                            <div className="cd-saved-info">
                              <Link to={`/jobs/${job.id}`} className="cd-saved-title">
                                {job.title}
                              </Link>
                              <div className="cd-saved-meta">
                                <span>{job.companyName}</span>
                                <span>•</span>
                                <span>{typeof job.location === 'string' ? job.location : 'Hà Nội'}</span>
                                <span>•</span>
                                <span className="cd-saved-salary">{salaryDisplay}</span>
                              </div>
                            </div>
                          </div>

                          <div className="cd-saved-actions">
                            {isJobApplied ? (
                              <button
                                type="button"
                                className="cd-btn-secondary"
                                disabled
                                style={{
                                  backgroundColor: '#64748b',
                                  color: '#ffffff',
                                  cursor: 'not-allowed',
                                  border: '1px solid #475569'
                                }}
                                title="Bạn đã nộp hồ sơ cho vị trí này"
                              >
                                Đã ứng tuyển
                              </button>
                            ) : (
                              <Link to={`/jobs/${job.id}`} className="cd-btn-success-sm">
                                Ứng tuyển ngay
                              </Link>
                            )}
                            <button
                              type="button"
                              className="cd-btn-danger-outline"
                              onClick={() => handleRemoveSavedJob(job.id)}
                            >
                              Bỏ lưu
                            </button>
                          </div>
                        </article>
                      );
                    })}
                  </div>

                  {/* Pagination for Saved Jobs */}
                  {totalSavedPages > 1 && (
                    <div className="cd-pagination-bar">
                      <div className="cd-pagination-info">
                        Hiển thị {(currentSavedPage - 1) * SAVED_JOBS_PER_PAGE + 1} -{' '}
                        {Math.min(currentSavedPage * SAVED_JOBS_PER_PAGE, savedJobsList.length)} trên tổng số{' '}
                        {savedJobsList.length} việc làm đã lưu
                      </div>

                      <div className="cd-pagination-controls">
                        <button
                          type="button"
                          className="cd-page-btn"
                          disabled={currentSavedPage === 1}
                          onClick={() => setSavedJobsPage((p) => Math.max(1, p - 1))}
                        >
                          Trang trước
                        </button>

                        {Array.from({ length: totalSavedPages }, (_, i) => i + 1).map((pageNum) => (
                          <button
                            key={pageNum}
                            type="button"
                            className={`cd-page-btn ${pageNum === currentSavedPage ? 'active' : ''}`}
                            onClick={() => setSavedJobsPage(pageNum)}
                          >
                            {pageNum}
                          </button>
                        ))}

                        <button
                          type="button"
                          className="cd-page-btn"
                          disabled={currentSavedPage === totalSavedPages}
                          onClick={() => setSavedJobsPage((p) => Math.min(totalSavedPages, p + 1))}
                        >
                          Trang sau
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Similar Jobs Section */}
              {similarJobsList.length > 0 && (
                <div className="cd-similar-section">
                  <div className="cd-similar-header">
                    <h2 className="cd-similar-title">Việc làm tương tự việc đã lưu</h2>
                    <p className="cd-similar-desc">
                      Gợi ý thêm các cơ hội phù hợp dựa trên các kỹ năng và vị trí bạn đã lưu
                    </p>
                  </div>

                  <div className="cd-saved-grid">
                    {similarJobsList.slice(0, similarJobsLimit).map((job) => {
                      const isJobApplied = applications.some(
                        (a) => (a.jobId === job.id || a.jobTitle === job.title) && a.status !== 'Đã rút đơn'
                      );
                      const salaryDisplay =
                        job.salaryText || `${job.salaryMin} - ${job.salaryMax} triệu / tháng`;

                      return (
                        <article key={job.id} className="cd-saved-card">
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1, minWidth: '260px' }}>
                            <CompanyAvatar name={job.companyName} size={46} />
                            <div className="cd-saved-info">
                              <Link to={`/jobs/${job.id}`} className="cd-saved-title">
                                {job.title}
                              </Link>
                              <div className="cd-saved-meta">
                                <span>{job.companyName}</span>
                                <span>•</span>
                                <span>{typeof job.location === 'string' ? job.location : 'Hà Nội'}</span>
                                <span>•</span>
                                <span className="cd-saved-salary">{salaryDisplay}</span>
                              </div>
                              <div className="cd-skills-tags-row" style={{ marginTop: '8px', marginBottom: 0 }}>
                                {job.skills.slice(0, 4).map((skillName, sIdx) => (
                                  <span key={sIdx} className="cd-skill-tag">
                                    {skillName}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="cd-saved-actions">
                            {isJobApplied ? (
                              <button
                                type="button"
                                className="cd-btn-secondary"
                                disabled
                                style={{
                                  backgroundColor: '#64748b',
                                  color: '#ffffff',
                                  cursor: 'not-allowed',
                                  border: '1px solid #475569'
                                }}
                                title="Bạn đã nộp hồ sơ cho vị trí này"
                              >
                                Đã ứng tuyển
                              </button>
                            ) : (
                              <Link to={`/jobs/${job.id}`} className="cd-btn-success-sm">
                                Ứng tuyển ngay
                              </Link>
                            )}
                            <button
                              type="button"
                              className="cd-btn-secondary"
                              onClick={() => handleSaveJob(job.id)}
                            >
                              Lưu tin
                            </button>
                          </div>
                        </article>
                      );
                    })}
                  </div>

                  {/* Load More Similar Jobs CTA Button */}
                  {similarJobsList.length > 2 && (
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                      {similarJobsLimit < similarJobsList.length ? (
                        <button
                          type="button"
                          className="cd-btn-secondary"
                          onClick={() => setSimilarJobsLimit(similarJobsList.length)}
                          style={{ minWidth: '180px' }}
                        >
                          Xem thêm việc làm tương tự
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="cd-btn-secondary"
                          onClick={() => setSimilarJobsLimit(2)}
                          style={{ minWidth: '180px' }}
                        >
                          Thu gọn
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </section>
          )}

          {/* TAB 3: VIỆC LÀM PHÙ HỢP VỚI BẠN */}
          {activeTab === 'matching-jobs' && (
            <section className="cd-panel">
              <div className="cd-panel-header">
                <div className="cd-panel-title-area">
                  <h1 className="cd-panel-title">Việc làm phù hợp với bạn</h1>
                  <p className="cd-panel-desc">
                    Hệ thống đề xuất tự động dựa trên kỹ năng cốt lõi và tiêu chí cài đặt của bạn
                  </p>
                </div>
                <div className="cd-panel-actions">
                  <button
                    type="button"
                    className="cd-btn-secondary"
                    onClick={() => setActiveTab('job-preferences')}
                  >
                    Chỉnh sửa tiêu chí gợi ý
                  </button>
                </div>
              </div>

              <div className="cd-app-list">
                {matchingJobsList.slice(0, matchingJobsLimit).map((job) => {
                  const isJobApplied = applications.some(
                    (a) => (a.jobId === job.id || a.jobTitle === job.title) && a.status !== 'Đã rút đơn'
                  );

                  return (
                    <article key={job.id} className="cd-match-card">
                      <div className="cd-match-top">
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                          <CompanyAvatar name={job.companyName} size={46} />
                          <div>
                            <Link to={`/jobs/${job.id}`} className="cd-saved-title">
                              {job.title}
                            </Link>
                            <div className="cd-saved-meta" style={{ marginTop: '4px' }}>
                              <span>{job.companyName}</span>
                              <span>•</span>
                              <span>{job.location}</span>
                              <span>•</span>
                              <span className="cd-saved-salary">
                                {job.salaryMin} - {job.salaryMax} triệu / tháng
                              </span>
                            </div>
                          </div>
                        </div>
                        <span className="cd-match-score-pill">Đề xuất phù hợp</span>
                      </div>

                      <div className="cd-skills-tags-row">
                        {job.skills.map((skillName, sIdx) => (
                          <span key={sIdx} className="cd-skill-tag">
                            {skillName}
                          </span>
                        ))}
                      </div>

                      <div className="cd-app-actions-bar">
                        {isJobApplied ? (
                          <button
                            type="button"
                            className="cd-btn-secondary"
                            disabled
                            style={{
                              backgroundColor: '#64748b',
                              color: '#ffffff',
                              cursor: 'not-allowed',
                              border: '1px solid #475569'
                            }}
                            title="Bạn đã nộp hồ sơ cho vị trí này"
                          >
                            Đã ứng tuyển
                          </button>
                        ) : (
                          <Link to={`/jobs/${job.id}`} className="cd-btn-primary">
                            Ứng tuyển ngay
                          </Link>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Load More Matching Jobs CTA Button */}
              {matchingJobsList.length > 3 && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                  {matchingJobsLimit < matchingJobsList.length ? (
                    <button
                      type="button"
                      className="cd-btn-secondary"
                      onClick={() => setMatchingJobsLimit(matchingJobsList.length)}
                      style={{ minWidth: '180px' }}
                    >
                      Xem thêm việc làm phù hợp
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="cd-btn-secondary"
                      onClick={() => setMatchingJobsLimit(3)}
                      style={{ minWidth: '180px' }}
                    >
                      Thu gọn
                    </button>
                  )}
                </div>
              )}
            </section>
          )}

          {/* TAB 4: CÀI ĐẶT GỢI Ý VIỆC LÀM */}
          {activeTab === 'job-preferences' && (
            <section className="cd-panel">
              <div className="cd-panel-header">
                <div className="cd-panel-title-area">
                  <h1 className="cd-panel-title">Cài đặt gợi ý việc làm</h1>
                  <p className="cd-panel-desc">
                    Thiết lập định hướng nghề nghiệp để thuật toán AI ưu tiên các vị trí phù hợp nhất
                  </p>
                </div>
              </div>

              <form onSubmit={handleSavePreferences}>
                <div className="cd-form-grid">
                  <div className="cd-form-group">
                    <label htmlFor="pref-role" className="cd-label">
                      Vị trí công việc mong muốn
                    </label>
                    <input
                      id="pref-role"
                      type="text"
                      className="cd-input"
                      value={preferences.targetRole}
                      onChange={(e) =>
                        setPreferences({ ...preferences, targetRole: e.target.value })
                      }
                      placeholder="Ví dụ: DevOps Engineer, Cloud Architect"
                      required
                    />
                  </div>

                  <div className="cd-form-group">
                    <label htmlFor="pref-salary" className="cd-label">
                      Mức lương mong đợi
                    </label>
                    <input
                      id="pref-salary"
                      type="text"
                      className="cd-input"
                      value={preferences.expectedSalary}
                      onChange={(e) =>
                        setPreferences({ ...preferences, expectedSalary: e.target.value })
                      }
                      placeholder="Ví dụ: 30 - 50 triệu / tháng"
                      required
                    />
                  </div>

                  <div className="cd-form-group">
                    <label htmlFor="pref-location" className="cd-label">
                      Địa điểm làm việc ưu tiên
                    </label>
                    <select
                      id="pref-location"
                      className="cd-select"
                      value={preferences.preferredLocation}
                      onChange={(e) =>
                        setPreferences({ ...preferences, preferredLocation: e.target.value })
                      }
                    >
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
                      <option value="Đà Nẵng">Đà Nẵng</option>
                      <option value="Toàn quốc / Remote">Toàn quốc / Làm việc từ xa</option>
                    </select>
                  </div>

                  <div className="cd-form-group">
                    <label htmlFor="pref-level" className="cd-label">
                      Cấp bậc chuyên môn
                    </label>
                    <select
                      id="pref-level"
                      className="cd-select"
                      value={preferences.experienceLevel}
                      onChange={(e) =>
                        setPreferences({ ...preferences, experienceLevel: e.target.value })
                      }
                    >
                      <option value="Fresher / Junior (Dưới 2 năm)">
                        Fresher / Junior (Dưới 2 năm)
                      </option>
                      <option value="Middle / Senior (3 - 5 năm)">
                        Middle / Senior (3 - 5 năm)
                      </option>
                      <option value="Lead / Principal (5+ năm)">
                        Lead / Principal (5+ năm)
                      </option>
                      <option value="Quản lý / Tech Lead">Quản lý / Tech Lead</option>
                    </select>
                  </div>

                  <div className="cd-form-group full-width">
                    <label htmlFor="pref-skills" className="cd-label">
                      Kỹ năng cốt lõi (phân tách bằng dấu phẩy)
                    </label>
                    <input
                      id="pref-skills"
                      type="text"
                      className="cd-input"
                      value={preferences.skills}
                      onChange={(e) =>
                        setPreferences({ ...preferences, skills: e.target.value })
                      }
                      placeholder="AWS, Docker, Kubernetes, Terraform, CI/CD..."
                      required
                    />
                    <span className="cd-helper-text">
                      Các kỹ năng này sẽ được dùng để đối sánh tự động với ma trận yêu cầu của nhà tuyển dụng.
                    </span>
                  </div>
                </div>

                <div className="cd-panel-actions">
                  <button type="submit" className="cd-btn-primary">
                    Lưu cài đặt gợi ý
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* TAB 5: CV CỦA TÔI */}
          {activeTab === 'my-cv' && (
            <section className="cd-panel">
              <div className="cd-panel-header">
                <div className="cd-panel-title-area">
                  <h1 className="cd-panel-title">Quản lý CV của tôi</h1>
                  <p className="cd-panel-desc">
                    Tải lên và quản lý các phiên bản CV để sẵn sàng ứng tuyển vào các cơ hội phù hợp
                  </p>
                </div>
              </div>

              {/* Upload Dropzone */}
              <div className="cd-upload-box">
                <div className="cd-upload-title">Tải lên tệp CV mới</div>
                <div className="cd-upload-note">
                  Hỗ trợ định dạng PDF, DOCX (tối đa 5MB). Bảo vệ bởi AWS GuardDuty Malware Protection &amp; KMS Envelope Encryption.
                </div>
                <label className="cd-btn-primary" style={{ cursor: 'pointer' }}>
                  <span>Chọn tệp CV từ máy tính</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="cd-file-input"
                    onChange={handleUploadResume}
                  />
                </label>
              </div>

              {/* Resumes List */}
              <div className="cd-app-list">
                {resumes.map((cv) => (
                  <div key={cv.id} className="cd-resume-item">
                    <div>
                      <div className="cd-resume-name">
                        {cv.fileName}{' '}
                        {cv.isPrimary && <span className="cd-primary-badge">CV Mặc định</span>}
                      </div>
                      <div className="cd-resume-meta">
                        <span>Dung lượng: {cv.fileSize}</span>
                        <span>•</span>
                        <span>Ngày tải lên: {cv.uploadedAt}</span>
                        <span>•</span>
                        <span style={{ color: '#095744', fontWeight: 600 }}>Đã kiểm tra an toàn</span>
                      </div>
                    </div>

                    <div className="cd-saved-actions">
                      {!cv.isPrimary && (
                        <button
                          type="button"
                          className="cd-btn-secondary"
                          onClick={() => handleSetPrimaryResume(cv.id)}
                        >
                          Đặt làm mặc định
                        </button>
                      )}
                      <button
                        type="button"
                        className="cd-btn-secondary"
                        onClick={() => alert(`Đang chuẩn bị tải xuống: ${cv.fileName}`)}
                      >
                        Tải xuống
                      </button>
                      <button
                        type="button"
                        className="cd-btn-danger-outline"
                        onClick={() => handleDeleteResume(cv.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};
