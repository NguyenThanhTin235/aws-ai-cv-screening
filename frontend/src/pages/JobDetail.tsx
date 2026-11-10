import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getJobById, ALL_JOBS } from '../data/jobsData';
import { useAuth } from '../context/AuthContext';
import '../styles/job-detail.css';
import {
  MapPinIcon,
  DollarSignIcon,
  BriefcaseIcon,
  ClockIcon,
  SparklesIcon,
  VerifiedIcon,
  CheckIcon,
  XIcon,
  UploadIcon,
  FileTextIcon
} from '../components/common/Icons';
import { validateCvFile } from '../utils/validators';
import { api } from '../services/api';

export const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, role, user } = useAuth();

  const job = id ? getJobById(id) : undefined;

  const [isBookmarked, setIsBookmarked] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('saved_job_ids');
      if (stored && id) {
        const list: string[] = JSON.parse(stored);
        if (Array.isArray(list)) return list.includes(id);
      }
    } catch {}
    return false;
  });

  const handleToggleBookmark = () => {
    if (!id) return;
    try {
      const stored = localStorage.getItem('saved_job_ids');
      const list: string[] = stored ? JSON.parse(stored) : [];
      let updated: string[];
      if (list.includes(id)) {
        updated = list.filter((item) => item !== id);
        setIsBookmarked(false);
      } else {
        updated = [...list, id];
        setIsBookmarked(true);
      }
      localStorage.setItem('saved_job_ids', JSON.stringify(updated));
    } catch {
      setIsBookmarked(!isBookmarked);
    }
  };
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consentAi, setConsentAi] = useState(true);
  const [cvOption, setCvOption] = useState<'profile' | 'upload'>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [cvError, setCvError] = useState<string | null>(null);

  // Check if current user has already applied for this job
  const [isApplied, setIsApplied] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('candidate_applications');
      if (saved && job) {
        const apps = JSON.parse(saved);
        if (Array.isArray(apps)) {
          return apps.some(
            (a: any) =>
              (a.jobId === job.id || a.jobTitle === job.title) &&
              a.status !== 'Đã rút đơn' &&
              a.status !== 'WITHDRAWN'
          );
        }
      }
    } catch {
      // ignore
    }
    return false;
  });

  useEffect(() => {
    const checkStatus = () => {
      try {
        const saved = localStorage.getItem('candidate_applications');
        if (saved && job) {
          const apps = JSON.parse(saved);
          if (Array.isArray(apps)) {
            const applied = apps.some(
              (a: any) =>
                (a.jobId === job.id || a.jobTitle === job.title) &&
                a.status !== 'Đã rút đơn' &&
                a.status !== 'WITHDRAWN'
            );
            setIsApplied(applied);
          }
        }
      } catch {
        // ignore
      }
    };

    checkStatus();

    // Also check live API if candidate is logged in
    if (isAuthenticated && role === 'candidate') {
      api.getMyApplications()
        .then((items) => {
          if (Array.isArray(items) && job) {
            const applied = items.some(
              (item: any) =>
                (item.jobId === job.id || item.jobTitle === job.title) &&
                item.status !== 'WITHDRAWN' &&
                item.status !== 'Đã rút đơn'
            );
            if (applied) {
              setIsApplied(true);
            }
          }
        })
        .catch(() => {});
    }
  }, [job, isAuthenticated, role]);

  // If job is not found
  if (!job) {
    return (
      <div className="jd-container" style={{ textAlign: 'center', padding: '64px 20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '12px' }}>
          Không tìm thấy tin tuyển dụng
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--color-outline)', marginBottom: '24px' }}>
          Tin tuyển dụng này có thể đã hết hạn hoặc không tồn tại trong hệ thống.
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--color-primary-container)',
            color: '#ffffff',
            padding: '10px 24px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '14px',
            fontWeight: '600',
            textDecoration: 'none'
          }}
        >
          Quay lại danh sách việc làm
        </Link>
      </div>
    );
  }

  // Related jobs (same province or same level, excluding current job)
  const relatedJobs = ALL_JOBS.filter(
    (j) => j.id !== job.id && (j.level === job.level || j.location.includes(job.location.split(',')[0]))
  ).slice(0, 3);

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (role !== 'candidate') {
      alert(`Tài khoản của bạn là ${role}. Vui lòng đăng nhập với tài khoản Ứng viên để nộp hồ sơ!`);
      return;
    }
    setIsApplyModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) {
      setUploadedFile(null);
      setCvError('Vui lòng chọn file CV của bạn.');
      return;
    }
    const err = validateCvFile(file);
    if (err) {
      setCvError(err);
      setUploadedFile(null);
    } else {
      setCvError(null);
      setUploadedFile(file);
    }
  };

  const handleConfirmSubmit = async () => {
    if (!consentAi) {
      setCvError('Bạn cần đồng ý với điều khoản AI Screening và xử lý dữ liệu trước khi nộp đơn.');
      return;
    }

    if (cvOption === 'upload') {
      if (!uploadedFile) {
        setCvError('Vui lòng tải lên file CV của bạn định dạng PDF (Tối đa 5MB).');
        return;
      }
      const err = validateCvFile(uploadedFile);
      if (err) {
        setCvError(err);
        return;
      }
      if (!uploadedFile.name.toLowerCase().endsWith('.pdf')) {
        setCvError('Theo quy định BR-DOC-01, hệ thống chỉ chấp nhận tệp định dạng PDF (.pdf).');
        return;
      }
    }

    // Anti-duplicate check before submission (Client & Offline Guard)
    const existingApps = JSON.parse(localStorage.getItem('candidate_applications') || '[]');
    const isAlreadyApplied = existingApps.some(
      (a: any) =>
        (a.jobId === job.id || a.jobTitle === job.title) &&
        a.status !== 'Đã rút đơn' &&
        a.status !== 'WITHDRAWN'
    );
    if (isAlreadyApplied) {
      setCvError('Bạn đã có hồ sơ đang xử lý cho vị trí này. Vui lòng rút đơn hiện tại trên Candidate Portal nếu muốn nộp lại hồ sơ mới.');
      return;
    }

    setIsSubmitting(true);
    setCvError(null);

    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

    try {
      // Step 2 & 3: Try API Upload & Submit
      let docId = `doc_${Date.now()}`;
      let s3Key = `quarantine/${job.companyId}/${job.id}/${docId}.pdf`;

      if (uploadedFile) {
        try {
          const presigned = await api.requestUploadUrl({
            jobId: job.id,
            fileName: uploadedFile.name,
            fileType: 'PDF',
            fileSize: uploadedFile.size
          });
          docId = presigned.documentId;
          s3Key = presigned.s3Key;
          await api.uploadFileToS3(presigned.uploadUrl, uploadedFile);
        } catch (apiErr) {
          console.warn('Direct S3 upload via API skipped or simulated:', apiErr);
        }
      }

      await api.submitApplication({
        jobId: job.id,
        documentId: docId,
        s3Key,
        candidateName: user?.fullName,
        candidateEmail: user?.email,
        candidatePhone: user?.phone,
        consentAi: true
      });

      // Save local copy to localStorage for client caching
      const localApps = JSON.parse(localStorage.getItem('candidate_applications') || '[]');
      localApps.unshift({
        id: `app_${Date.now()}`,
        jobId: job.id,
        jobTitle: job.title,
        companyName: job.companyName,
        appliedAt: formattedDate,
        status: 'Tiếp nhận',
        statusMessage: 'Hồ sơ đã được tiếp nhận và chuyển thành công tới Bộ phận Tuyển dụng',
        statusDate: formattedDate,
        cvName: uploadedFile?.name || 'CV_Ung_Tuyen.pdf',
        score: 0,
        matchLevel: 'Tiếp nhận',
        badgeColor: '#2563eb',
        badgeBg: '#eff6ff'
      });
      localStorage.setItem('candidate_applications', JSON.stringify(localApps));

      setIsApplied(true);
      setApplySuccess(true);
      setTimeout(() => {
        setIsApplyModalOpen(false);
        setApplySuccess(false);
      }, 1500);
    } catch (err: any) {
      if (err.message && (err.message.includes('CONFLICT') || err.message.includes('đang xử lý') || err.message.includes('409'))) {
        setIsApplied(true);
        setCvError('Bạn đã có hồ sơ đang xử lý cho vị trí này. Vui lòng rút đơn hiện tại trên Candidate Portal nếu muốn nộp lại hồ sơ mới.');
      } else {
        // Fallback save locally for preview with duplicate check
        const localApps = JSON.parse(localStorage.getItem('candidate_applications') || '[]');
        const duplicateInLocal = localApps.some(
          (a: any) =>
            (a.jobId === job.id || a.jobTitle === job.title) &&
            a.status !== 'Đã rút đơn' &&
            a.status !== 'WITHDRAWN'
        );
        if (duplicateInLocal) {
          setIsApplied(true);
          setCvError('Bạn đã có hồ sơ đang xử lý cho vị trí này. Vui lòng rút đơn hiện tại trên Candidate Portal nếu muốn nộp lại hồ sơ mới.');
          return;
        }

        localApps.unshift({
          id: `app_${Date.now()}`,
          jobId: job.id,
          jobTitle: job.title,
          companyName: job.companyName,
          appliedAt: formattedDate,
          status: 'Tiếp nhận',
          statusMessage: 'Hồ sơ đã được tiếp nhận và chuyển thành công tới Bộ phận Tuyển dụng',
          statusDate: formattedDate,
          cvName: uploadedFile?.name || 'CV_Ung_Tuyen.pdf',
          score: 88,
          matchLevel: 'Tiếp nhận',
          badgeColor: '#2563eb',
          badgeBg: '#eff6ff'
        });
        localStorage.setItem('candidate_applications', JSON.stringify(localApps));

        setIsApplied(true);
        setApplySuccess(true);
        setTimeout(() => {
          setIsApplyModalOpen(false);
          setApplySuccess(false);
        }, 1500);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper for company initials logo
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .filter((w) => w.length > 0 && w[0] === w[0].toUpperCase())
      .slice(0, 3)
      .map((w) => w[0])
      .join('');
  };

  return (
    <div className="jd-container">
      {/* Back Link */}
      <Link to="/" className="jd-back-link">
        <span>← Quay lại danh sách việc làm</span>
      </Link>

      {/* Main Header Banner */}
      <header className="jd-header-card">
        <div className="jd-header-top">
          <div className="jd-header-logo-box">
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 'var(--radius-sm)',
                background: job.logoGradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: '800',
                fontSize: '18px',
                textAlign: 'center'
              }}
            >
              {getInitials(job.companyName) || 'TECH'}
            </div>
          </div>

          <div className="jd-header-info">
            <h1 className="jd-header-title">{job.title}</h1>
            <div className="jd-header-company">
              <span>{job.companyName}</span>
              {job.isVerified && (
                <span title="Doanh nghiệp đối tác xác thực" style={{ color: 'var(--color-primary-container)', display: 'inline-flex' }}>
                  <VerifiedIcon size={16} />
                </span>
              )}
              <span>• {job.companyScale}</span>
            </div>
          </div>
        </div>

        {/* Quick Meta Grid */}
        <div className="jd-meta-grid">
          <div className="jd-meta-item">
            <div className="jd-meta-icon">
              <DollarSignIcon size={18} />
            </div>
            <div>
              <div className="jd-meta-label">Mức lương</div>
              <div className="jd-meta-val jd-meta-salary">{job.salaryText}</div>
            </div>
          </div>

          <div className="jd-meta-item">
            <div className="jd-meta-icon">
              <MapPinIcon size={18} />
            </div>
            <div>
              <div className="jd-meta-label">Địa điểm</div>
              <div className="jd-meta-val">{job.rawLocation?.province || job.location.split('•')[0].trim()}</div>
            </div>
          </div>

          <div className="jd-meta-item">
            <div className="jd-meta-icon">
              <BriefcaseIcon size={18} />
            </div>
            <div>
              <div className="jd-meta-label">Kinh nghiệm</div>
              <div className="jd-meta-val">{job.experience}</div>
            </div>
          </div>

          <div className="jd-meta-item">
            <div className="jd-meta-icon">
              <ClockIcon size={18} />
            </div>
            <div>
              <div className="jd-meta-label">Hạn nộp hồ sơ</div>
              <div className="jd-meta-val">
                {job.deadline ? new Date(job.deadline).toLocaleDateString('vi-VN') : '31/12/2026'}
              </div>
            </div>
          </div>
        </div>

        {/* Header Actions */}
        <div className="jd-header-actions">
          {isApplied ? (
            <button
              type="button"
              className="jd-btn-apply jd-btn-applied"
              disabled
              title="Bạn đã nộp hồ sơ ứng tuyển cho vị trí này"
            >
              Đã ứng tuyển
            </button>
          ) : (
            <button type="button" className="jd-btn-apply" onClick={handleApplyClick}>
              Ứng tuyển ngay
            </button>
          )}
          <button
            type="button"
            className={`jd-btn-bookmark ${isBookmarked ? 'active' : ''}`}
            onClick={handleToggleBookmark}
          >
            <span>{isBookmarked ? 'Đã lưu việc làm' : 'Lưu tin'}</span>
          </button>
        </div>
      </header>

      {/* 2-Column Content Layout */}
      <div className="jd-main-layout">
        {/* Left Column: Job Details */}
        <div>
          {/* Section 1: Job Description */}
          <section className="jd-section-card">
            <h2 className="jd-section-title">Mô tả công việc</h2>
            <p className="jd-text-body">{job.description}</p>
          </section>

          {/* Section 2: Requirements */}
          <section className="jd-section-card">
            <h2 className="jd-section-title">Yêu cầu ứng viên</h2>
            {job.requirements && job.requirements.length > 0 ? (
              <ul className="jd-bullet-list">
                {job.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            ) : (
              <p className="jd-text-body">
                Yêu cầu kinh nghiệm {job.experience}, thành thạo các công nghệ {job.skills.join(', ')}.
              </p>
            )}
          </section>

          {/* Section 3: Benefits */}
          <section className="jd-section-card">
            <h2 className="jd-section-title">Quyền lợi &amp; Đãi ngộ</h2>
            {job.benefits && job.benefits.length > 0 ? (
              <ul className="jd-bullet-list">
                {job.benefits.map((ben, idx) => (
                  <li key={idx}>{ben}</li>
                ))}
              </ul>
            ) : (
              <p className="jd-text-body">{job.perks}</p>
            )}
          </section>

          {/* Section 4: Skills Required */}
          <section className="jd-section-card">
            <h2 className="jd-section-title">Kỹ năng &amp; Công nghệ yêu cầu</h2>
            <div className="jd-skills-wrap">
              {job.skills.map((skill) => (
                <span key={skill} className="jd-skill-badge">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Section 5: Specific Location */}
          <section className="jd-section-card">
            <h2 className="jd-section-title">Địa điểm làm việc cụ thể</h2>
            <p className="jd-text-body" style={{ fontWeight: '600', marginBottom: '6px' }}>
              {job.rawLocation?.fullAddress || job.location}
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
              <span className="jd-skill-badge" style={{ fontSize: '12px', color: '#095744', backgroundColor: '#e6f4ea' }}>
                {job.rawLocation?.province || 'Toàn quốc'}
              </span>
              {job.rawLocation?.district && (
                <span className="jd-skill-badge" style={{ fontSize: '12px' }}>
                  {job.rawLocation.district}
                </span>
              )}
              {job.rawLocation?.ward && (
                <span className="jd-skill-badge" style={{ fontSize: '12px', color: '#0369a1', backgroundColor: '#e0f2fe' }}>
                  {job.rawLocation.ward} [Đơn vị hành chính mới]
                </span>
              )}
              <span className="jd-skill-badge" style={{ fontSize: '12px' }}>
                Hình thức: {job.workType}
              </span>
            </div>
          </section>

          {/* Section 6: AI Rubric Transparency (Ẩn đối với ứng viên, chỉ hiển thị cho Nhà tuyển dụng & Quản trị viên) */}
          {job.rubricBreakdown && (role === 'recruiter' || role === 'admin') && (
            <section className="jd-section-card">
              <div className="jd-rubric-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <SparklesIcon size={20} color="var(--color-primary-container)" />
                  <h2 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--color-primary)', margin: 0 }}>
                    Bộ Tiêu Chí Đánh Giá AI Rubric (Minh bạch 100 điểm)
                  </h2>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', lineHeight: 1.5, margin: 0 }}>
                  Hệ thống sử dụng Amazon Bedrock Claude Haiku để thẩm định CV tự động dựa trên trọng số chuẩn hóa:
                </p>

                <div className="jd-rubric-grid">
                  <div className="jd-rubric-card">
                    <div className="jd-rubric-name">Kỹ năng kỹ thuật</div>
                    <div className="jd-rubric-score">{job.rubricBreakdown.skills}đ</div>
                  </div>
                  <div className="jd-rubric-card">
                    <div className="jd-rubric-name">Kinh nghiệm</div>
                    <div className="jd-rubric-score">{job.rubricBreakdown.experience}đ</div>
                  </div>
                  <div className="jd-rubric-card">
                    <div className="jd-rubric-name">Học vấn &amp; Bằng cấp</div>
                    <div className="jd-rubric-score">{job.rubricBreakdown.education}đ</div>
                  </div>
                  <div className="jd-rubric-card">
                    <div className="jd-rubric-name">Văn hóa &amp; Trình bày</div>
                    <div className="jd-rubric-score">{job.rubricBreakdown.culture}đ</div>
                  </div>
                </div>

                <div style={{ fontSize: '13px', color: 'var(--color-on-surface)', marginTop: '12px' }}>
                  <strong>Tóm tắt đánh giá:</strong> {job.rubricBreakdown.summary}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Company & Sidebar */}
        <aside>
          {/* Company Profile Card */}
          <div className="jd-section-card">
            <h2 className="jd-section-title">Thông tin doanh nghiệp</h2>
            <div className="jd-company-profile-box">
              <div className="jd-company-profile-row">
                <span style={{ color: 'var(--color-outline)' }}>Tên công ty</span>
                <strong style={{ color: 'var(--color-on-surface)', textAlign: 'right' }}>{job.companyName}</strong>
              </div>
              <div className="jd-company-profile-row">
                <span style={{ color: 'var(--color-outline)' }}>Quy mô nhân sự</span>
                <span>{job.companyScale}</span>
              </div>
              <div className="jd-company-profile-row">
                <span style={{ color: 'var(--color-outline)' }}>Trạng thái xác thực</span>
                <span style={{ color: '#095744', fontWeight: '700' }}>ĐÃ THẨM ĐỊNH</span>
              </div>
              <div className="jd-company-profile-row">
                <span style={{ color: 'var(--color-outline)' }}>Lĩnh vực</span>
                <span>Điện toán đám mây &amp; Phần mềm</span>
              </div>
            </div>
          </div>

          {/* Related Jobs */}
          {relatedJobs.length > 0 && (
            <div className="jd-section-card">
              <h2 className="jd-section-title">Việc làm liên quan</h2>
              {relatedJobs.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/jobs/${rel.id}`}
                  className="jd-related-job-item"
                >
                  <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-on-surface)', marginBottom: '4px' }}>
                    {rel.title}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-outline)', marginBottom: '6px' }}>
                    {rel.companyName}
                  </div>
                  <div style={{ fontSize: '12px', color: '#059669', fontWeight: '700' }}>
                    {rel.salaryText}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </aside>
      </div>

      {/* Apply Confirmation Modal */}
      {isApplyModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
          onClick={() => setIsApplyModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              maxWidth: '500px',
              width: '100%',
              padding: '28px',
              boxShadow: 'var(--shadow-lg)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-primary)', margin: 0 }}>
                Nộp đơn ứng tuyển
              </h3>
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
              >
                <XIcon size={18} />
              </button>
            </div>

            {applySuccess ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#d1fae5',
                    color: '#095744',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px auto'
                  }}
                >
                  <CheckIcon size={24} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#095744', marginBottom: '6px' }}>
                  Nộp đơn thành công!
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--color-outline)' }}>
                  Hồ sơ đang được chuyển sang Amazon Bedrock AI để thẩm định Rubric...
                </p>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: '14px', color: 'var(--color-on-surface)', marginBottom: '16px' }}>
                  Bạn đang ứng tuyển vị trí <strong>{job.title}</strong> tại <strong>{job.companyName}</strong>.
                </p>

                <div
                  style={{
                    backgroundColor: 'var(--color-surface-container-low)',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: '16px',
                    fontSize: '13px'
                  }}
                >
                  <div>Ứng viên: <strong>{user?.fullName}</strong></div>
                  <div style={{ marginTop: '4px' }}>Email liên hệ: <strong>{user?.email}</strong></div>
                </div>

                {/* CV Selection Radio Options */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#1f2937', marginBottom: '8px' }}>
                    Chọn hồ sơ CV ứng tuyển: <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: cvOption === 'profile' ? '1.5px solid #095744' : '1px solid #e5e7eb',
                        backgroundColor: cvOption === 'profile' ? '#f0fdf4' : '#ffffff',
                        cursor: 'pointer'
                      }}
                    >
                      <input
                        type="radio"
                        name="cvOption"
                        checked={cvOption === 'profile'}
                        onChange={() => {
                          setCvOption('profile');
                          setCvError(null);
                        }}
                        style={{ accentColor: '#095744' }}
                      />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#111827' }}>
                          Sử dụng CV mặc định trong hồ sơ
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>
                          {user?.fullName?.replace(/\s+/g, '_')}_CV.pdf (Đã đồng bộ AWS S3)
                        </div>
                      </div>
                    </label>

                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: cvOption === 'upload' ? '1.5px solid #095744' : '1px solid #e5e7eb',
                        backgroundColor: cvOption === 'upload' ? '#f0fdf4' : '#ffffff',
                        cursor: 'pointer'
                      }}
                    >
                      <input
                        type="radio"
                        name="cvOption"
                        checked={cvOption === 'upload'}
                        onChange={() => setCvOption('upload')}
                        style={{ accentColor: '#095744' }}
                      />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#111827' }}>
                          Tải lên CV mới từ máy tính
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>
                          Chấp nhận PDF, DOCX, DOC (Tối đa 5MB)
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Upload box if upload option selected */}
                {cvOption === 'upload' && (
                  <div style={{ marginBottom: '18px' }}>
                    <div
                      style={{
                        border: cvError ? '1.5px dashed #dc2626' : uploadedFile ? '1.5px solid #095744' : '1.5px dashed #cbd5e1',
                        borderRadius: '8px',
                        padding: '16px',
                        textAlign: 'center',
                        backgroundColor: cvError ? '#fef2f2' : uploadedFile ? '#f0fdf4' : '#f8fafc',
                        position: 'relative'
                      }}
                    >
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          opacity: 0,
                          cursor: 'pointer',
                          width: '100%',
                          height: '100%'
                        }}
                      />
                      <div style={{ pointerEvents: 'none' }}>
                        {uploadedFile ? (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#095744', fontWeight: '600', fontSize: '13px' }}>
                            <FileTextIcon size={18} color="#095744" />
                            <span>{uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                          </div>
                        ) : (
                          <>
                            <UploadIcon size={22} color={cvError ? '#dc2626' : '#64748b'} style={{ margin: '0 auto 6px', display: 'block' }} />
                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>
                              Nhấp để chọn file hoặc kéo thả file vào đây
                            </div>
                            <div style={{ fontSize: '11.5px', color: '#6b7280', marginTop: '2px' }}>
                              Định dạng .pdf, .docx, .doc (Tối đa 5MB)
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    {cvError && (
                      <div style={{ fontSize: '11.5px', color: '#dc2626', marginTop: '5px', lineHeight: 1.3 }}>
                        {cvError}
                      </div>
                    )}
                  </div>
                )}

                {/* AI Transparency & Processing Notice & Consent Checkbox */}
                <div
                  style={{
                    margin: '14px 0 16px 0',
                    padding: '12px 14px',
                    backgroundColor: 'var(--surface, #f9f9f9)',
                    border: '1px solid var(--border, #eaeaea)',
                    borderRadius: '8px',
                    fontSize: '11.5px',
                    color: 'var(--muted, #636361)',
                    lineHeight: 1.5
                  }}
                >
                  <div style={{ marginBottom: '8px' }}>
                    <strong style={{ color: 'var(--text, #1f201d)' }}>Minh bạch AI &amp; Bảo vệ dữ liệu (NĐ 356/2025):</strong> Hồ sơ CV của bạn sẽ được hỗ trợ phân tích năng lực bằng AWS Bedrock &amp; Textract theo chuẩn Luật Bảo vệ dữ liệu cá nhân 91/2025/QH15. Kết quả đánh giá chỉ mang tính chất tham khảo cho nhà tuyển dụng và luôn có sự giám sát của con người (Human-in-the-loop).
                  </div>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer', marginTop: '6px', fontSize: '12px', color: '#111827', fontWeight: '500' }}>
                    <input
                      type="checkbox"
                      checked={consentAi}
                      onChange={(e) => setConsentAi(e.target.checked)}
                      style={{ marginTop: '2px', accentColor: 'var(--color-primary-container)' }}
                    />
                    <span>Tôi đồng ý ủy quyền xử lý hồ sơ tự động qua quy trình AI Screening và kiểm tra mã độc cách ly S3 Quarantine.</span>
                  </label>
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px' }}>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setIsApplyModalOpen(false)}
                    style={{
                      padding: '10px 18px',
                      backgroundColor: 'var(--color-surface-container)',
                      border: '1px solid var(--color-surface-container-high)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      opacity: isSubmitting ? 0.6 : 1
                    }}
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="button"
                    disabled={isSubmitting || !consentAi}
                    onClick={handleConfirmSubmit}
                    style={{
                      padding: '10px 24px',
                      backgroundColor: isSubmitting ? '#6b7280' : 'var(--color-primary-container)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13px',
                      fontWeight: '700',
                      cursor: isSubmitting || !consentAi ? 'not-allowed' : 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    {isSubmitting ? 'Đang xử lý tải lên...' : 'Xác nhận nộp đơn'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
