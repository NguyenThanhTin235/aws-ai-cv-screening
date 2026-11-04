import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { ALL_JOBS } from '../data/jobsData';
import { ArrowRightIcon } from '../components/common/Icons';

export const RecruiterDashboard: React.FC = () => {
  const { user } = useAuth();

  // Company options for recruiter view
  const companies = React.useMemo(() => {
    const list = Array.from(new Set(ALL_JOBS.map((j) => j.companyName))).slice(0, 8);
    if (user?.companyName && !list.includes(user.companyName)) {
      list.unshift(user.companyName);
    }
    return list;
  }, [user?.companyName]);

  const [selectedCompany, setSelectedCompany] = useState<string>(() => user?.companyName || companies[0] || 'FinStream Digital Bank');

  // Filter jobs for selected company
  const companyJobs = ALL_JOBS.filter((j) => j.companyName === selectedCompany);

  // Sample AI Candidate Leaderboard
  const candidateLeaderboard = [
    {
      id: 'cdd_01',
      name: 'Nguyễn Văn An',
      role: 'Senior DevOps / Cloud Engineer',
      score: 94,
      matchLevel: 'Khớp rất cao',
      skillsScore: '34/35',
      expScore: '33/35',
      appliedJob: companyJobs[0]?.title || 'Cloud Engineer',
      appliedAt: '02/11/2026',
      status: 'Đề xuất mời phỏng vấn'
    },
    {
      id: 'cdd_02',
      name: 'Trần Thị Mai',
      role: 'DevOps & Kubernetes Specialist',
      score: 89,
      matchLevel: 'Khớp cao',
      skillsScore: '31/35',
      expScore: '30/35',
      appliedJob: companyJobs[0]?.title || 'Cloud Engineer',
      appliedAt: '01/11/2026',
      status: 'Đang xem xét hồ sơ'
    },
    {
      id: 'cdd_03',
      name: 'Phạm Hoàng Long',
      role: 'Cloud Security & Infrastructure',
      score: 82,
      matchLevel: 'Phù hợp',
      skillsScore: '28/35',
      expScore: '28/35',
      appliedJob: companyJobs[0]?.title || 'Cloud Engineer',
      appliedAt: '31/10/2026',
      status: 'Đã gửi bài test kỹ thuật'
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
              backgroundColor: 'var(--color-secondary-container)',
              color: 'var(--color-on-secondary-container)',
              fontSize: '12px',
              fontWeight: '700',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)'
            }}
          >
            RECRUITER WORKSPACE
          </span>
          <span style={{ fontSize: '13px', color: 'var(--color-outline)' }}>
            Doanh nghiệp: <strong>{selectedCompany}</strong>
          </span>
        </div>

        <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--color-primary)' }}>
          Không gian Làm việc HR — {user?.fullName || 'Chuyên viên Tuyển dụng'}
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
          Tài khoản Nhà tuyển dụng: <strong>{user?.email}</strong> • Cô lập dữ liệu đa người thuê (Tenant Isolation).
        </p>

        {/* Company Quick Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '20px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-on-surface)' }}>
            Doanh nghiệp đang quản lý:
          </span>
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-outline)',
              backgroundColor: '#ffffff',
              fontSize: '13px',
              fontWeight: '600',
              color: 'var(--color-primary)'
            }}
          >
            {companies.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--color-primary-container)',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              fontWeight: '600',
              textDecoration: 'none'
            }}
          >
            Khám phá 35 tin tuyển dụng
            <ArrowRightIcon />
          </Link>
        </div>
      </div>

      {/* Two Column Layout: Company Active Jobs & AI Candidate Leaderboard */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {/* Company Active Jobs */}
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
              Tin tuyển dụng đang mở
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--color-outline)' }}>
              {companyJobs.length} vị trí tại {selectedCompany}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {companyJobs.length === 0 ? (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--color-outline)', fontSize: '13px' }}>
                Chưa có tin tuyển dụng nào được gán cho doanh nghiệp này.
              </div>
            ) : (
              companyJobs.map((job) => (
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
                      ĐANG MỞ
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-outline)', marginBottom: '8px' }}>
                    Cấp bậc: <strong>{job.level}</strong> • Hình thức: {job.workType}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>
                    <span style={{ color: '#095744', fontWeight: '600' }}>{job.salaryText}</span>
                    <span>{job.experience}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* AI Candidate Leaderboard */}
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
              Bảng xếp hạng Ứng viên AI
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--color-outline)' }}>
              Mô hình Bedrock Claude Haiku
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {candidateLeaderboard.map((cdd, idx) => (
              <div
                key={cdd.id}
                style={{
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-outline-variant)',
                  backgroundColor: 'var(--color-surface-container-low)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: idx === 0 ? '#fef3c7' : '#f3f4f6',
                        color: idx === 0 ? '#b45309' : '#4b5563',
                        fontSize: '11px',
                        fontWeight: '700'
                      }}
                    >
                      {idx + 1}
                    </span>
                    <strong style={{ fontSize: '14px', color: 'var(--color-on-surface)' }}>{cdd.name}</strong>
                  </div>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: '800',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: idx === 0 ? '#d1fae5' : '#e0f2fe',
                      color: idx === 0 ? '#095744' : '#0369a1'
                    }}
                  >
                    {cdd.score}/100
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-outline)', marginBottom: '6px' }}>
                  {cdd.role} • Nộp ngày: {cdd.appliedAt}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>
                  <span>Kỹ năng: {cdd.skillsScore} • Kinh nghiệm: {cdd.expScore}</span>
                  <span style={{ fontWeight: '600', color: 'var(--color-primary)' }}>{cdd.status}</span>
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
            Quản lý Tin Tuyển dụng
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-outline)', lineHeight: 1.5 }}>
            Tạo mới JD, tùy chỉnh thanh trượt trọng số Rubric 100đ (Skills, Experience, Education, Presentation) và đóng/mở tin.
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
            Bảng Xếp Hạng Ứng Viên và So Sánh Hồ Sơ
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-outline)', lineHeight: 1.5 }}>
            Bảng xếp hạng ứng viên theo điểm AI, giao diện so sánh 3 cột (CV gốc, đánh giá AI, ghi chú thủ công &amp; Audit Trail).
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
            Kho Tài Năng và Gợi Ý Ứng Viên Tiềm Năng
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-outline)', lineHeight: 1.5 }}>
            Tái phát hiện các ứng viên tiềm năng từ các đợt ứng tuyển trước bằng thuật toán đối chiếu năng lực tự động.
          </p>
        </div>
      </div>
    </div>
  );
};
