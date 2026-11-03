import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRole: UserRole = (searchParams.get('role') as UserRole) || 'candidate';

  const { register, isLoading } = useAuth();

  const [activeTab, setActiveTab] = useState<'candidate' | 'recruiter'>(
    initialRole === 'recruiter' ? 'recruiter' : 'candidate'
  );

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [consentTerms, setConsentTerms] = useState(false);
  const [consentTalentPool, setConsentTalentPool] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Password rules validation (BR-AUTH-01)
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const passwordsMatch = password && password === confirmPassword;

  const strengthCount = [hasMinLength, hasUppercase, hasDigit, hasSpecial].filter(Boolean).length;
  const strengthColor =
    strengthCount <= 1 ? '#ba1a1a' : strengthCount <= 3 ? '#e08200' : '#006c4c';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (strengthCount < 4) {
      setErrorMsg('Mật khẩu chưa thỏa mãn đủ 4 tiêu chí bảo mật.');
      return;
    }
    if (!passwordsMatch) {
      setErrorMsg('Mật khẩu xác nhận không khớp.');
      return;
    }
    if (!consentTerms) {
      setErrorMsg('Vui lòng đồng ý với Điều khoản dịch vụ và Chính sách bảo vệ dữ liệu.');
      return;
    }

    try {
      const { email: regEmail } = await register({
        role: activeTab,
        email,
        password,
        fullName,
        phone,
        companyName: activeTab === 'recruiter' ? companyName : undefined
      });
      navigate(`/verify-otp?email=${encodeURIComponent(regEmail)}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Đăng ký không thành công';
      setErrorMsg(msg);
    }
  };

  return (
    <div style={{ maxWidth: '640px', margin: '32px auto', padding: '0 16px' }}>
      <div
        style={{
          backgroundColor: 'var(--color-surface-container-lowest)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-outline-variant)',
          padding: '36px',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: '700',
              backgroundColor: 'var(--color-primary-fixed)',
              color: 'var(--color-on-primary-fixed)',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              letterSpacing: '0.05em'
            }}
          >
            ĐĂNG KÝ TÀI KHOẢN MỚI
          </span>
          <h1 style={{ fontSize: '24px', fontWeight: '800', marginTop: '10px', color: 'var(--color-on-surface)' }}>
            Gia nhập AI CV Screening Portal
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--color-outline)', marginTop: '4px' }}>
            Nền tảng tuyển dụng thông minh được vận hành bởi Amazon Bedrock Claude Haiku
          </p>
        </div>

        {/* Role Toggle Tabs */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            backgroundColor: 'var(--color-surface-container)',
            borderRadius: 'var(--radius-md)',
            padding: '4px',
            marginBottom: '24px'
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('candidate')}
            style={{
              border: 'none',
              padding: '10px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              backgroundColor: activeTab === 'candidate' ? '#ffffff' : 'transparent',
              color: activeTab === 'candidate' ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
              boxShadow: activeTab === 'candidate' ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            Ứng viên Tìm việc
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('recruiter')}
            style={{
              border: 'none',
              padding: '10px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              backgroundColor: activeTab === 'recruiter' ? '#ffffff' : 'transparent',
              color: activeTab === 'recruiter' ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
              boxShadow: activeTab === 'recruiter' ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            Doanh nghiệp Tuyển dụng
          </button>
        </div>

        {errorMsg && (
          <div
            style={{
              backgroundColor: 'var(--color-error-container)',
              color: 'var(--color-on-error-container)',
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              marginBottom: '20px'
            }}
          >
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {activeTab === 'recruiter' && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                Tên công ty / Doanh nghiệp <span style={{ color: 'var(--color-error)' }}>*</span>
              </label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Ví dụ: FinStream Digital Bank"
                style={{
                  width: '100%',
                  height: '42px',
                  padding: '0 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-outline-variant)',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                Họ và tên <span style={{ color: 'var(--color-error)' }}>*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nguyễn Văn An"
                style={{
                  width: '100%',
                  height: '42px',
                  padding: '0 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-outline-variant)',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                Số điện thoại <span style={{ color: 'var(--color-error)' }}>*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0912 345 678"
                style={{
                  width: '100%',
                  height: '42px',
                  padding: '0 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-outline-variant)',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
              Địa chỉ Email {activeTab === 'recruiter' ? 'công việc' : 'cá nhân'}{' '}
              <span style={{ color: 'var(--color-error)' }}>*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={activeTab === 'recruiter' ? 'recruiter@finstream.vn' : 'nguyenvanan@gmail.com'}
              style={{
                width: '100%',
                height: '42px',
                padding: '0 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-outline-variant)',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          {/* Password & Strength Meter */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
              Mật khẩu <span style={{ color: 'var(--color-error)' }}>*</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tối thiểu 8 ký tự, gồm hoa, số, ký tự đặc biệt"
              style={{
                width: '100%',
                height: '42px',
                padding: '0 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-outline-variant)',
                fontSize: '14px',
                outline: 'none'
              }}
            />

            {/* Strength Bar */}
            <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
              {[1, 2, 3, 4].map((idx) => (
                <div
                  key={idx}
                  style={{
                    flex: 1,
                    height: '4px',
                    borderRadius: '2px',
                    backgroundColor: idx <= strengthCount ? strengthColor : 'var(--color-surface-container-high)',
                    transition: 'background-color 0.2s ease'
                  }}
                />
              ))}
            </div>

            {/* Checklist */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '4px',
                marginTop: '8px',
                fontSize: '11px',
                color: 'var(--color-outline)'
              }}
            >
              <div style={{ color: hasMinLength ? '#006c4c' : 'inherit' }}>
                {hasMinLength ? '✓' : '○'} Tối thiểu 8 ký tự
              </div>
              <div style={{ color: hasUppercase ? '#006c4c' : 'inherit' }}>
                {hasUppercase ? '✓' : '○'} Ít nhất 1 chữ in hoa
              </div>
              <div style={{ color: hasDigit ? '#006c4c' : 'inherit' }}>
                {hasDigit ? '✓' : '○'} Ít nhất 1 chữ số
              </div>
              <div style={{ color: hasSpecial ? '#006c4c' : 'inherit' }}>
                {hasSpecial ? '✓' : '○'} Ít nhất 1 ký tự đặc biệt
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
              Xác nhận lại mật khẩu <span style={{ color: 'var(--color-error)' }}>*</span>
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Nhập lại mật khẩu"
              style={{
                width: '100%',
                height: '42px',
                padding: '0 12px',
                borderRadius: 'var(--radius-sm)',
                border: `1px solid ${
                  confirmPassword && !passwordsMatch ? 'var(--color-error)' : 'var(--color-outline-variant)'
                }`,
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          {/* Privacy & Consent */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                required
                checked={consentTerms}
                onChange={(e) => setConsentTerms(e.target.checked)}
                style={{ accentColor: 'var(--color-primary-container)', marginTop: '2px' }}
              />
              <span style={{ color: 'var(--color-on-surface-variant)' }}>
                Tôi đã đọc và đồng ý với <strong>Điều khoản dịch vụ</strong> và{' '}
                <strong>Chính sách bảo vệ dữ liệu cá nhân</strong> (Tuân thủ Nghị định 13/2023/NĐ-CP). *
              </span>
            </label>

            {activeTab === 'candidate' && (
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={consentTalentPool}
                  onChange={(e) => setConsentTalentPool(e.target.checked)}
                  style={{ accentColor: 'var(--color-primary-container)', marginTop: '2px' }}
                />
                <span style={{ color: 'var(--color-outline)' }}>
                  Cho phép hệ thống lưu hồ sơ vào <strong>Kho tài năng (Talent Pool)</strong> để nhà tuyển dụng có thể chủ động liên hệ.
                </span>
              </label>
            )}
          </div>

          {/* Submit CTA */}
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
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? 'Đang khởi tạo tài khoản...' : `TẠO TÀI KHOẢN ${activeTab === 'recruiter' ? 'DOANH NGHIỆP' : 'ỨNG VIÊN'} →`}
          </button>

          <p style={{ fontSize: '11px', color: 'var(--color-outline)', textAlign: 'center', marginTop: '8px' }}>
            Hệ thống sẽ gửi mã OTP 6 số qua email xác thực ngay sau khi bấm tạo tài khoản.
          </p>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '13px' }}>
          Đã có tài khoản?{' '}
          <Link to="/login" style={{ fontWeight: '700', color: 'var(--color-primary)' }}>
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

