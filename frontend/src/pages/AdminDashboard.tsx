import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { HealthStatus } from '../types';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [health, setHealth] = useState<HealthStatus>({ status: 'CHECKING' });

  useEffect(() => {
    api.checkHealth().then(setHealth);
  }, []);

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
              backgroundColor: '#fee2e2',
              color: '#991b1b',
              fontSize: '12px',
              fontWeight: '700',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)'
            }}
          >
            SYSTEM ADMINISTRATOR
          </span>
          <span style={{ fontSize: '13px', color: 'var(--color-outline)' }}>
            Hạ tầng AWS Pure Serverless v12.0
          </span>
        </div>

        <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--color-primary)' }}>
          Bảng Điều Khiển Quản Trị Hệ Thống
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
          Đăng nhập với đặc quyền Admin: <strong>{user?.email}</strong> • Giám sát 18 dịch vụ AWS Serverless.
        </p>

        {/* Live Service Health Banner */}
        <div
          style={{
            marginTop: '20px',
            padding: '16px 20px',
            backgroundColor: 'var(--color-surface-container-low)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-outline-variant)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          <div>
            <div style={{ fontSize: '12px', color: 'var(--color-outline)', fontWeight: '600' }}>
              TRẠNG THÁI API GATEWAY &amp; LAMBDA
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: health.status === 'UP' ? '#137333' : '#c5221f'
                }}
              />
              <span style={{ fontSize: '15px', fontWeight: '700', color: health.status === 'UP' ? '#137333' : '#c5221f' }}>
                {health.status === 'UP' ? 'HOẠT ĐỘNG BÌNH THƯỜNG (200 OK)' : 'ĐANG KẾT NỐI...'}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--color-outline)' }}>
                • Độ trễ: {health.latencyMs ?? 0}ms • Region: {health.region || 'us-east-1'}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setHealth({ status: 'CHECKING' });
              api.checkHealth().then(setHealth);
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ffffff',
              border: '1px solid var(--color-outline-variant)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Kiểm tra lại (Refresh)
          </button>
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
          <div style={{ fontSize: '24px', marginBottom: '12px' }}>🚨</div>
          <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>
            Dead-Letter Queue (DLQ) Monitor (Phase 4)
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-outline)', lineHeight: 1.5 }}>
            Theo dõi các tin nhắn lỗi xử lý trong SQS DLQ (`cv-screening-dlq`), phân tích nguyên nhân và thực hiện Redrive an toàn.
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
          <div style={{ fontSize: '24px', marginBottom: '12px' }}>⚖️</div>
          <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>
            Phê duyệt Yêu cầu DSR Anonymization (Phase 4)
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-outline)', lineHeight: 1.5 }}>
            Tiếp nhận và phê duyệt yêu cầu xóa dữ liệu cá nhân theo Nghị định 13/2023/NĐ-CP &amp; GDPR từ người dùng.
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
          <div style={{ fontSize: '24px', marginBottom: '12px' }}>📈</div>
          <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>
            CloudWatch &amp; WAF Metrics Dashboard
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-outline)', lineHeight: 1.5 }}>
            Giám sát thời gian thực số lượng request WAF bị chặn, tỷ lệ lỗi 5XX API Gateway và tổng chi phí AWS Budgets.
          </p>
        </div>
      </div>
    </div>
  );
};

