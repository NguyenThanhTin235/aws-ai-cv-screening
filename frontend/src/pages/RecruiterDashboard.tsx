import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export const RecruiterDashboard: React.FC = () => {
  const { user } = useAuth();

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
            Doanh nghiệp: <strong>{user?.companyName || 'Công ty Tuyển dụng'}</strong>
          </span>
        </div>

        <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--color-primary)' }}>
          Không gian Làm việc HR — {user?.fullName}
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
          Tài khoản Nhà tuyển dụng: <strong>{user?.email}</strong> • Cô lập dữ liệu đa người thuê (Tenant Isolation).
        </p>

        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
          <Link
            to="/"
            style={{
              backgroundColor: 'var(--color-primary-container)',
              color: '#ffffff',
              padding: '10px 20px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              fontWeight: '600',
              textDecoration: 'none'
            }}
          >
            📋 Xem danh sách tin tuyển dụng
          </Link>
        </div>
      </div>

      {/* Feature Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        <div
          style={{
            backgroundColor: 'var(--color-surface-container-lowest)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-outline-variant)',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ fontSize: '24px', marginBottom: '12px' }}>📝</div>
          <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>
            Quản lý Tin Tuyển dụng (Phase 2)
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
          <div style={{ fontSize: '24px', marginBottom: '12px' }}>🥇</div>
          <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>
            Smart Leaderboard &amp; Side-by-side Review (Phase 3)
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
          <div style={{ fontSize: '24px', marginBottom: '12px' }}>🌟</div>
          <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>
            Kho Tài Năng &amp; AI Rediscovery (Phase 3)
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-outline)', lineHeight: 1.5 }}>
            Tái phát hiện các ứng viên tiềm năng từ các đợt ứng tuyển trước bằng thuật toán đối chiếu năng lực tự động.
          </p>
        </div>
      </div>
    </div>
  );
};

