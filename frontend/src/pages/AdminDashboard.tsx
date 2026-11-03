import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { HealthStatus } from '../types';
import { ALL_JOBS } from '../data/jobsData';
import { Link } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [health, setHealth] = useState<HealthStatus>({ status: 'CHECKING' });

  useEffect(() => {
    api.checkHealth().then(setHealth);
  }, []);

  const totalJobsCount = ALL_JOBS.length;
  const uniqueCompaniesCount = new Set(ALL_JOBS.map((j) => j.companyName)).size;
  const recentJobs = ALL_JOBS.slice(0, 5);

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

      {/* Stats Counter Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div
          style={{
            backgroundColor: 'var(--color-surface-container-lowest)',
            padding: '20px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-outline-variant)'
          }}
        >
          <div style={{ fontSize: '12px', color: 'var(--color-outline)', fontWeight: '600', textTransform: 'uppercase' }}>
            Tổng Tin Tuyển Dụng
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--color-primary)', marginTop: '6px' }}>
            {totalJobsCount}
          </div>
          <div style={{ fontSize: '12px', color: '#095744', marginTop: '4px', fontWeight: '600' }}>
            100% Trạng thái OPEN
          </div>
        </div>

        <div
          style={{
            backgroundColor: 'var(--color-surface-container-lowest)',
            padding: '20px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-outline-variant)'
          }}
        >
          <div style={{ fontSize: '12px', color: 'var(--color-outline)', fontWeight: '600', textTransform: 'uppercase' }}>
            Doanh Nghiệp Đã Xác Thực
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--color-primary)', marginTop: '6px' }}>
            {uniqueCompaniesCount}
          </div>
          <div style={{ fontSize: '12px', color: '#095744', marginTop: '4px', fontWeight: '600' }}>
            Đã thẩm định thông tin
          </div>
        </div>

        <div
          style={{
            backgroundColor: 'var(--color-surface-container-lowest)',
            padding: '20px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-outline-variant)'
          }}
        >
          <div style={{ fontSize: '12px', color: 'var(--color-outline)', fontWeight: '600', textTransform: 'uppercase' }}>
            Hồ Sơ AI Đã Chấm Điểm
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--color-primary)', marginTop: '6px' }}>
            128
          </div>
          <div style={{ fontSize: '12px', color: '#1e40af', marginTop: '4px', fontWeight: '600' }}>
            42% Tỷ lệ Strong Match
          </div>
        </div>

        <div
          style={{
            backgroundColor: 'var(--color-surface-container-lowest)',
            padding: '20px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-outline-variant)'
          }}
        >
          <div style={{ fontSize: '12px', color: 'var(--color-outline)', fontWeight: '600', textTransform: 'uppercase' }}>
            Kiểm Duyệt Nội Dung
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#095744', marginTop: '6px' }}>
            {totalJobsCount}/{totalJobsCount}
          </div>
          <div style={{ fontSize: '12px', color: '#095744', marginTop: '4px', fontWeight: '600' }}>
            0 tin vi phạm / đã khóa
          </div>
        </div>
      </div>

      {/* Recent Jobs Moderation Table */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-container-lowest)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-outline-variant)',
          padding: '24px',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '24px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-primary)' }}>
            Danh mục tin tuyển dụng vừa được kiểm duyệt
          </h2>
          <Link to="/" style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-primary)', textDecoration: 'none' }}>
            Xem toàn bộ trên sàn việc làm
          </Link>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-outline-variant)', color: 'var(--color-outline)' }}>
                <th style={{ padding: '10px 12px' }}>Tiêu đề tuyển dụng</th>
                <th style={{ padding: '10px 12px' }}>Doanh nghiệp</th>
                <th style={{ padding: '10px 12px' }}>Cấp bậc</th>
                <th style={{ padding: '10px 12px' }}>Mức lương</th>
                <th style={{ padding: '10px 12px' }}>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {recentJobs.map((j) => (
                <tr key={j.id} style={{ borderBottom: '1px solid var(--color-outline-variant)' }}>
                  <td style={{ padding: '12px', fontWeight: '600', color: 'var(--color-on-surface)' }}>{j.title}</td>
                  <td style={{ padding: '12px', color: 'var(--color-on-surface-variant)' }}>{j.companyName}</td>
                  <td style={{ padding: '12px' }}>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '11px',
                        fontWeight: '700',
                        backgroundColor: '#f3f4f6',
                        color: '#374151'
                      }}
                    >
                      {j.level}
                    </span>
                  </td>
                  <td style={{ padding: '12px', color: '#095744', fontWeight: '600' }}>{j.salaryText}</td>
                  <td style={{ padding: '12px' }}>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '11px',
                        fontWeight: '700',
                        backgroundColor: '#d1fae5',
                        color: '#095744'
                      }}
                    >
                      APPROVED
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
            Giám Sát Hàng Đợi Sự Cố (DLQ)
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
          <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>
            Phê Duyệt Yêu Cầu Quyền Riêng Tư (DSR)
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
          <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>
            Chỉ Số Vận Hành CloudWatch và Bảo Mật WAF
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-outline)', lineHeight: 1.5 }}>
            Giám sát thời gian thực số lượng request WAF bị chặn, tỷ lệ lỗi 5XX API Gateway và tổng chi phí AWS Budgets.
          </p>
        </div>
      </div>
    </div>
  );
};
