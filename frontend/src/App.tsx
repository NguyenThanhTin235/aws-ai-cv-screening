import React, { useState } from 'react';
import './styles/tokens.css';

export const App: React.FC = () => {
  const [role, setRole] = useState<'candidate' | 'recruiter' | 'admin'>('candidate');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header
        style={{
          backgroundColor: 'var(--color-surface-container-lowest)',
          borderBottom: '1px solid var(--color-outline-variant)',
          padding: '16px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-primary-container)',
              color: 'var(--color-on-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '18px'
            }}
          >
            AI
          </div>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-primary)' }}>
              AI CV Screening Portal
            </h1>
            <p style={{ fontSize: '12px', color: 'var(--color-outline)' }}>
              AWS Pure Serverless Architecture v12.0
            </p>
          </div>
        </div>

        {/* Role Switcher */}
        <div
          style={{
            display: 'flex',
            backgroundColor: 'var(--color-surface-container)',
            borderRadius: 'var(--radius-full)',
            padding: '4px'
          }}
        >
          {(['candidate', 'recruiter', 'admin'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              style={{
                border: 'none',
                background: role === r ? 'var(--color-primary-container)' : 'transparent',
                color: role === r ? 'var(--color-on-primary)' : 'var(--color-on-surface-variant)',
                padding: '6px 16px',
                borderRadius: 'var(--radius-full)',
                fontWeight: role === r ? '600' : '400',
                cursor: 'pointer',
                fontSize: '13px',
                textTransform: 'capitalize',
                transition: 'all 0.2s ease'
              }}
            >
              {r === 'candidate' ? 'Ứng viên' : r === 'recruiter' ? 'Nhà tuyển dụng' : 'Quản trị viên'}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '32px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div
          style={{
            backgroundColor: 'var(--color-surface-container-lowest)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--color-outline-variant)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span
              style={{
                backgroundColor: 'var(--color-primary-fixed)',
                color: 'var(--color-on-primary-fixed)',
                fontSize: '12px',
                fontWeight: '600',
                padding: '4px 8px',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              Phase 1 — Khởi tạo Khung Ứng dụng
            </span>
            <span
              style={{
                backgroundColor: 'var(--color-secondary-container)',
                color: 'var(--color-on-secondary-container)',
                fontSize: '12px',
                fontWeight: '600',
                padding: '4px 8px',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              Vai trò: {role}
            </span>
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px', color: 'var(--color-primary)' }}>
            Chào mừng bạn đến với AI CV Screening Portal
          </h2>
          <p style={{ color: 'var(--color-on-surface-variant)', marginBottom: '24px', lineHeight: '1.6' }}>
            Hệ thống sàng lọc hồ sơ ứng viên thông minh ứng dụng kiến trúc <strong>Pure Serverless (Zero-VPC)</strong>,
            mô hình ngôn ngữ lớn <strong>Amazon Bedrock Claude Haiku 4.5</strong> và <strong>Amazon Textract</strong>.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              marginTop: '24px'
            }}
          >
            <div
              style={{
                border: '1px solid var(--color-outline-variant)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                backgroundColor: 'var(--color-surface-container-low)'
              }}
            >
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                Hạ tầng Nền tảng (CDK v2)
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--color-outline)' }}>
                4 Stacks: Cognito User Pool, S3 Quarantine, DynamoDB Main Table, SQS + DLQ, API Gateway REST.
              </p>
            </div>

            <div
              style={{
                border: '1px solid var(--color-outline-variant)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                backgroundColor: 'var(--color-surface-container-low)'
              }}
            >
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                Bảo vệ Biên & Cách ly
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--color-outline)' }}>
                Amazon S3 Block Public Access 100%, GuardDuty Malware Protection, AWS WAF và IAM Zero-Trust.
              </p>
            </div>

            <div
              style={{
                border: '1px solid var(--color-outline-variant)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                backgroundColor: 'var(--color-surface-container-low)'
              }}
            >
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                Design Tokens Tương thích 100%
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--color-outline)' }}>
                Vanilla CSS Variables từ thiết kế mẫu StitchAI (#095744 Emerald), độ trễ bố cục Zero CLS.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--color-outline-variant)',
          padding: '16px 32px',
          textAlign: 'center',
          fontSize: '13px',
          color: 'var(--color-outline)',
          backgroundColor: 'var(--color-surface-container-lowest)'
        }}
      >
        AI CV Screening Portal &copy; 2026 · AWS Serverless Architecture
      </footer>
    </div>
  );
};
export default App;
