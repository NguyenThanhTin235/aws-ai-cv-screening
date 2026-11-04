import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { ALL_JOBS } from '../data/jobsData';
import { MapPinIcon, DollarSignIcon, SparklesIcon, ArrowRightIcon } from '../components/common/Icons';

export const CandidateDashboard: React.FC = () => {
  const { user } = useAuth();

  // Top 3 recommended jobs from seeded data
  const recommendedJobs = ALL_JOBS.slice(0, 3);

  // Sample recent applications
  const sampleApplications = [
    {
      id: 'app_01J9XAK4M6P8Q0R2T4V6W8Y0Z1',
      jobTitle: ALL_JOBS[0]?.title || 'Senior DevOps Engineer',
      companyName: ALL_JOBS[0]?.companyName || 'Authentic Education Hub',
      appliedAt: '02/11/2026',
      status: 'Đã thẩm định AI',
      score: 92,
      matchLevel: 'Khớp rất cao',
      badgeColor: '#095744',
      badgeBg: '#d1fae5'
    },
    {
      id: 'app_01J9XAK4M6P8Q0R2T4V6W8Y0Z2',
      jobTitle: ALL_JOBS[1]?.title || 'Thực Tập Sinh DevOps & Cloud Automation',
      companyName: ALL_JOBS[1]?.companyName || 'KMS Technology Vietnam',
      appliedAt: '03/11/2026',
      status: 'Đang xử lý AI',
      score: 88,
      matchLevel: 'Khớp cao',
      badgeColor: '#1e40af',
      badgeBg: '#dbeafe'
    }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '32px auto', padding: '0 24px' }}>
      {/* Welcome Banner */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-container-lowest)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-outline-variant)',
          padding: '32px',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '24px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span
            style={{
              backgroundColor: 'var(--color-primary-fixed)',
              color: 'var(--color-on-primary-fixed)',
              fontSize: '12px',
              fontWeight: '700',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)'
            }}
          >
            CANDIDATE PORTAL
          </span>
          <span style={{ fontSize: '13px', color: 'var(--color-outline)' }}>
            Hồ sơ &amp; Theo dõi trạng thái AI Sàng lọc
          </span>
        </div>

        <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--color-primary)' }}>
          Xin chào, {user?.fullName || 'Ứng viên'}!
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
          Tài khoản Ứng viên: <strong>{user?.email}</strong> • Xác thực Cognito JWT hợp lệ.
        </p>

        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--color-primary-container)',
              color: '#ffffff',
              padding: '10px 20px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              fontWeight: '600',
              textDecoration: 'none'
            }}
          >
            Khám phá 35 việc làm mới
            <ArrowRightIcon />
          </Link>
        </div>
      </div>

      {/* Two Column Section: Recent Applications & Recommended Jobs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {/* Recent Applications Card */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-container-lowest)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-outline-variant)',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-primary)' }}>
              Đơn ứng tuyển gần đây
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--color-outline)' }}>
              {sampleApplications.length} đơn đang hoạt động
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {sampleApplications.map((app) => (
              <div
                key={app.id}
                style={{
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-outline-variant)',
                  backgroundColor: 'var(--color-surface-container-low)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-on-surface)' }}>
                    {app.jobTitle}
                  </div>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: app.badgeBg,
                      color: app.badgeColor
                    }}
                  >
                    {app.status}
                  </span>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginBottom: '8px' }}>
                  {app.companyName} • Ngày nộp: {app.appliedAt}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--color-primary)' }}>
                  <SparklesIcon />
                  <span>Điểm AI Rubric: <strong>{app.score}/100</strong> ({app.matchLevel})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Jobs Card */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-container-lowest)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-outline-variant)',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-primary)' }}>
              Việc làm đề xuất phù hợp
            </h2>
            <Link to="/" style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-primary)', textDecoration: 'none' }}>
              Xem tất cả 35 việc làm
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recommendedJobs.map((job) => (
              <div
                key={job.id}
                style={{
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-outline-variant)',
                  backgroundColor: 'var(--color-surface-container-low)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-on-surface)' }}>
                    {job.title}
                  </div>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: '#d1fae5',
                      color: '#095744'
                    }}
                  >
                    {job.matchScore}% Phù hợp
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-outline)', marginBottom: '8px' }}>
                  {job.companyName} • {job.level}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#095744', fontWeight: '600' }}>
                    <DollarSignIcon />
                    {job.salaryText}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <MapPinIcon />
                    {job.location.split('•')[0].trim()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        <div
          style={{
            backgroundColor: 'var(--color-surface-container-lowest)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-outline-variant)',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>
            Kho lưu trữ CV và Nộp hồ sơ
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-outline)', lineHeight: 1.5 }}>
            Tải lên tệp CV PDF (&lt;= 5MB) qua S3 Presigned URL, tự động quét mã độc bằng Amazon GuardDuty Malware Protection for S3.
          </p>
        </div>

        <div
          style={{
            backgroundColor: 'var(--color-surface-container-lowest)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-outline-variant)',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>
            Báo cáo AI Skill Gap
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-outline)', lineHeight: 1.5 }}>
            Nhận điểm Rubric 100đ chi tiết và phân tích khoảng trống kỹ năng từ Amazon Bedrock Claude Haiku qua WebSocket Push thời gian thực.
          </p>
        </div>

        <div
          style={{
            backgroundColor: 'var(--color-surface-container-lowest)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-outline-variant)',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>
            Quyền riêng tư DSR
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-outline)', lineHeight: 1.5 }}>
            Tuân thủ Nghị định 13/2023/NĐ-CP: Tự do tải về bản trích xuất JSON hoặc yêu cầu xóa ẩn danh (Anonymization) toàn bộ dữ liệu.
          </p>
        </div>
      </div>
    </div>
  );
};
