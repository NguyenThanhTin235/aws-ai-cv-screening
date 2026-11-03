import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getJobById, ALL_JOBS } from '../data/jobsData';
import { useAuth } from '../context/AuthContext';
import '../styles/job-detail.css';
import {
  MapPinIcon,
  DollarSignIcon,
  BriefcaseIcon,
  ClockIcon,
  HeartIcon,
  SparklesIcon,
  VerifiedIcon,
  CheckIcon,
  XIcon
} from '../components/common/Icons';

export const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, role, user } = useAuth();

  const job = id ? getJobById(id) : undefined;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);

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

  const handleConfirmSubmit = () => {
    setApplySuccess(true);
    setTimeout(() => {
      setIsApplyModalOpen(false);
      setApplySuccess(false);
      navigate('/candidate');
    }, 1500);
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
          <button type="button" className="jd-btn-apply" onClick={handleApplyClick}>
            Ứng tuyển ngay
          </button>
          <button
            type="button"
            className="jd-btn-bookmark"
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <HeartIcon
              size={16}
              color={isBookmarked ? '#059669' : 'currentColor'}
              fill={isBookmarked ? '#059669' : 'none'}
            />
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

          {/* Section 6: AI Rubric Transparency */}
          {job.rubricBreakdown && (
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
                    padding: '14px',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: '20px',
                    fontSize: '13px'
                  }}
                >
                  <div>Ứng viên: <strong>{user?.fullName}</strong></div>
                  <div style={{ marginTop: '4px' }}>Email liên hệ: <strong>{user?.email}</strong></div>
                  <div style={{ marginTop: '4px', color: 'var(--color-outline)' }}>
                    File CV: <strong>{user?.fullName?.replace(/\s+/g, '_')}_CV.pdf</strong> (Quét tự động GuardDuty S3)
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setIsApplyModalOpen(false)}
                    style={{
                      padding: '10px 18px',
                      backgroundColor: 'var(--color-surface-container)',
                      border: '1px solid var(--color-surface-container-high)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmSubmit}
                    style={{
                      padding: '10px 24px',
                      backgroundColor: 'var(--color-primary-container)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    Xác nhận nộp đơn
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
