import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export const CandidateDashboard: React.FC = () => {
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
          Xin chào, {user?.fullName}!
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
          Tài khoản Ứng viên: <strong>{user?.email}</strong> • Xác thực Cognito JWT hợp lệ.
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
            Khám phá việc làm mới
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

