import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [detectedRole, setDetectedRole] = useState<UserRole>('candidate');

  const handleEmailChange = (val: string) => {
    setEmail(val);
    const lower = val.toLowerCase();
    if (lower.includes('admin')) {
      setDetectedRole('admin');
    } else if (lower.includes('recruiter') || lower.includes('@finstream') || lower.includes('@techcorp')) {
      setDetectedRole('recruiter');
    } else {
      setDetectedRole('candidate');
    }
  };

  const handleQuickFill = (role: UserRole) => {
    if (role === 'admin') {
      setEmail('portal-dev-admin@screening.aws.internal');
      setPassword('Admin@12345');
      setDetectedRole('admin');
    } else if (role === 'recruiter') {
      setEmail('recruiter@finstream.vn');
      setPassword('Recruiter@12345');
      setDetectedRole('recruiter');
    } else {
      setEmail('nguyen.van.an@example.com');
      setPassword('Candidate@12345');
      setDetectedRole('candidate');
    }
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Vui lòng điền đầy đủ email và mật khẩu');
      return;
    }

    try {
      setErrorMsg('');
      const { role } = await login(email, password);
      // Smart Auto-Routing according to specification:
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'recruiter') {
        navigate('/recruiter');
      } else {
        navigate('/candidate');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Đăng nhập không thành công';
      setErrorMsg(msg);
    }
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 120px)',
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: 'var(--color-surface)'
      }}
    >
      {/* LEFT PANEL: Branding & Trust Authority Panel (50%) */}
      <section
        style={{
          flex: '1 1 450px',
          background: 'linear-gradient(145deg, #095744 0%, #002d22 100%)',
          color: '#ffffff',
          padding: '48px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#ffffff',
                color: '#095744',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '18px'
              }}
            >
              CV
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '18px', letterSpacing: '-0.02em' }}>
                CloudTalent.AI
              </div>
              <div style={{ fontSize: '11px', color: '#90d4bb', letterSpacing: '0.05em' }}>
                AWS BEDROCK POWERED
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              fontSize: '11px',
              fontWeight: '600',
              color: '#acf1d7',
              marginBottom: '16px'
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#acf1d7' }} />
            <span>Cognitive AI Pipeline 3.5</span>
          </div>

          <h1
            style={{
              fontSize: '28px',
              fontWeight: '800',
              lineHeight: 1.3,
              marginBottom: '16px',
              letterSpacing: '-0.02em'
            }}
          >
            Tuyển dụng thông minh, khách quan và không định kiến cùng Generative AI
          </h1>
          <p
            style={{
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.85)',
              lineHeight: 1.6,
              marginBottom: '28px'
            }}
          >
            Nền tảng phân tích CV tự động với AWS Bedrock Claude Haiku 4.5 &amp; Textract OCR, tối ưu hóa quy trình tuyển dụng và loại bỏ rào cản định kiến tuyển dụng theo chuẩn bảo mật điện toán đám mây.
          </p>

          {/* 3 Feature Pill Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}
            >
              <div style={{ fontWeight: '600', fontSize: '13px', color: '#acf1d7' }}>
                ✓ AI Rubric 100đ Chuẩn Xác
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.75)', marginTop: '2px' }}>
                Đối chiếu tiêu chí ma trận đánh giá tự động dựa trên Claude Haiku 4.5 và DynamoDB.
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}
            >
              <div style={{ fontWeight: '600', fontSize: '13px', color: '#acf1d7' }}>
                ✓ Khử định kiến PII tự động
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.75)', marginTop: '2px' }}>
                Tuân thủ Nghị định 13/2023/NĐ-CP &amp; GDPR, ẩn danh thông tin cá nhân đa tầng trước phân tích.
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}
            >
              <div style={{ fontWeight: '600', fontSize: '13px', color: '#acf1d7' }}>
                ✓ Bảo mật chuẩn AWS Serverless
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.75)', marginTop: '2px' }}>
                Kiến trúc Pure Serverless Zero-VPC ($0.00/tháng), KMS CMK, S3 Quarantine và GuardDuty.
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Quote */}
        <div
          style={{
            marginTop: '36px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.8)'
          }}
        >
          <p style={{ fontStyle: 'italic', marginBottom: '6px' }}>
            “Hệ thống giúp chúng tôi rút ngắn 75% thời gian lọc hồ sơ và nâng cao độ chính xác khi tìm kiếm nhân tài công nghệ.”
          </p>
          <div style={{ fontWeight: '600', color: '#acf1d7' }}>
            Bà Hoàng Thu Mai • Giám đốc Nhân sự Cấp cao, FinStream Digital Bank
          </div>
        </div>
      </section>

      {/* RIGHT PANEL: Form (50%) */}
      <section
        style={{
          flex: '1 1 450px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px'
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '440px',
            backgroundColor: 'var(--color-surface-container-lowest)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px',
            border: '1px solid var(--color-outline-variant)',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-on-surface)' }}>
              Chào mừng trở lại
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--color-outline)', marginTop: '4px' }}>
              Đăng nhập để tiếp tục vào không gian làm việc của bạn
            </p>
          </div>

          {/* Quick-Fill Demo Bar */}
          <div
            style={{
              backgroundColor: 'var(--color-surface-container-low)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 12px',
              marginBottom: '20px',
              border: '1px solid var(--color-outline-variant)'
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--color-outline)', marginBottom: '6px' }}>
              ⚡ ĐIỀN NHANH DỮ LIỆU THỬ NGHIỆM:
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => handleQuickFill('candidate')}
                style={{
                  border: '1px solid var(--color-outline-variant)',
                  backgroundColor: '#ffffff',
                  fontSize: '11px',
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer'
                }}
              >
                👤 Ứng viên
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('recruiter')}
                style={{
                  border: '1px solid var(--color-outline-variant)',
                  backgroundColor: '#ffffff',
                  fontSize: '11px',
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer'
                }}
              >
                🏢 Tuyển dụng
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('admin')}
                style={{
                  border: '1px solid var(--color-outline-variant)',
                  backgroundColor: '#ffffff',
                  fontSize: '11px',
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer'
                }}
              >
                🛡️ Admin
              </button>
            </div>
          </div>

          {errorMsg && (
            <div
              style={{
                backgroundColor: 'var(--color-error-container)',
                color: 'var(--color-on-error-container)',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
                marginBottom: '16px'
              }}
            >
              ⚠️ {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-on-surface)' }}>
                  Email đăng nhập <span style={{ color: 'var(--color-error)' }}>*</span>
                </label>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: '700',
                    backgroundColor: 'var(--color-primary-fixed)',
                    color: 'var(--color-on-primary-fixed)',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  {detectedRole === 'admin' ? 'Quản trị viên' : detectedRole === 'recruiter' ? 'Nhà tuyển dụng' : 'Ứng viên'}
                </span>
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                placeholder="ten.ban@domain.com hoặc recruiter@company.com"
                style={{
                  width: '100%',
                  height: '44px',
                  padding: '0 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-outline-variant)',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-on-surface)' }}>
                  Mật khẩu <span style={{ color: 'var(--color-error)' }}>*</span>
                </label>
                <a href="#forgot" style={{ fontSize: '12px', color: 'var(--color-primary)' }}>
                  Quên mật khẩu?
                </a>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  style={{
                    width: '100%',
                    height: '44px',
                    padding: '0 40px 0 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-outline-variant)',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: 'var(--color-primary-container)' }}
              />
              <label htmlFor="remember" style={{ fontSize: '12.5px', color: 'var(--color-outline)', cursor: 'pointer' }}>
                Duy trì đăng nhập trong 30 ngày (Cognito Refresh Token)
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                height: '46px',
                backgroundColor: 'var(--color-primary-container)',
                color: '#ffffff',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                fontWeight: '700',
                fontSize: '14px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'background-color 0.15s ease'
              }}
            >
              {isLoading ? 'Đang xác thực & điều hướng...' : 'ĐĂNG NHẬP VÀO HỆ THỐNG →'}
            </button>
          </form>

          {/* Registration Navigation Links */}
          <div
            style={{
              marginTop: '24px',
              paddingTop: '20px',
              borderTop: '1px solid var(--color-surface-container)',
              fontSize: '12.5px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              textAlign: 'center'
            }}
          >
            <div>
              Bạn là người tìm việc?{' '}
              <Link to="/register?role=candidate" style={{ fontWeight: '700', color: 'var(--color-primary)' }}>
                Đăng ký tài khoản Ứng viên
              </Link>
            </div>
            <div>
              Bạn là nhà tuyển dụng?{' '}
              <Link to="/register?role=recruiter" style={{ fontWeight: '700', color: 'var(--color-primary)' }}>
                Đăng ký tài khoản Doanh nghiệp
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

