import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams, Navigate } from 'react-router-dom';
import '../styles/auth-forms.css';
import { useAuth } from '../context/AuthContext';
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from '../components/common/Icons';
import {
  validateFullName,
  validatePhone,
  validateEmail,
  validatePassword,
  validateConfirmPassword
} from '../utils/validators';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { register, isLoading } = useAuth();

  // If role is recruiter, redirect to recruiter registration
  if (searchParams.get('role') === 'recruiter') {
    return <Navigate to="/register-recruiter" replace />;
  }

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [consentTerms, setConsentTerms] = useState(false);
  const [consentTalentPool, setConsentTalentPool] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // Touched state for realtime / inline validation
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const nameError = touched.fullName ? validateFullName(fullName) : null;
  const phoneError = touched.phone ? validatePhone(phone) : null;
  const emailError = touched.email ? validateEmail(email) : null;
  const passwordError = touched.password ? validatePassword(password) : null;
  const confirmPasswordError = touched.confirmPassword
    ? validateConfirmPassword(password, confirmPassword)
    : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Mark all as touched on submit
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      password: true,
      confirmPassword: true
    });

    const errName = validateFullName(fullName);
    const errPhone = validatePhone(phone);
    const errEmail = validateEmail(email);
    const errPassword = validatePassword(password);
    const errConfirm = validateConfirmPassword(password, confirmPassword);

    if (errName || errPhone || errEmail || errPassword || errConfirm) {
      setErrorMsg(errName || errPhone || errEmail || errPassword || errConfirm || 'Vui lòng kiểm tra lại thông tin.');
      return;
    }

    if (!consentTerms) {
      setErrorMsg('Vui lòng đồng ý với Điều khoản dịch vụ và Chính sách bảo vệ dữ liệu.');
      return;
    }

    try {
      const { email: regEmail } = await register({
        role: 'candidate',
        email: email.trim(),
        password,
        fullName: fullName.trim(),
        phone: phone.trim()
      });
      navigate(`/verify-otp?email=${encodeURIComponent(regEmail)}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Đăng ký không thành công';
      setErrorMsg(msg);
    }
  };

  return (
    <div className="auth-form-wrapper">
      <div className="auth-card">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--color-primary, #0a483c)', letterSpacing: '-0.01em' }}>
            Đăng ký tài khoản Ứng viên
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--muted, #636361)', marginTop: '4px' }}>
            Khởi tạo hồ sơ ứng tuyển và chẩn đoán năng lực Cloud
          </p>
        </div>

        {errorMsg && (
          <div
            style={{
              backgroundColor: '#fee2e2',
              color: '#991b1b',
              padding: '10px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <AlertCircleIcon size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Full Name & Phone */}
          <div className="auth-grid-2col">
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                Họ và tên <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onBlur={() => handleBlur('fullName')}
                placeholder="Nguyễn Văn An"
                style={{
                  width: '100%',
                  height: '42px',
                  padding: '0 12px',
                  borderRadius: '6px',
                  border: nameError ? '1.5px solid #dc2626' : '1px solid #d1d5db',
                  fontSize: '13.5px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              {nameError && (
                <div style={{ fontSize: '11.5px', color: '#dc2626', marginTop: '4px', lineHeight: 1.3 }}>
                  {nameError}
                </div>
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                Số điện thoại <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={() => handleBlur('phone')}
                placeholder="0912 345 678"
                style={{
                  width: '100%',
                  height: '42px',
                  padding: '0 12px',
                  borderRadius: '6px',
                  border: phoneError ? '1.5px solid #dc2626' : '1px solid #d1d5db',
                  fontSize: '13.5px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              {phoneError && (
                <div style={{ fontSize: '11.5px', color: '#dc2626', marginTop: '4px', lineHeight: 1.3 }}>
                  {phoneError}
                </div>
              )}
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
              Địa chỉ Email <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur('email')}
              placeholder="nguyenvanan@gmail.com"
              style={{
                width: '100%',
                height: '42px',
                padding: '0 12px',
                borderRadius: '6px',
                border: emailError ? '1.5px solid #dc2626' : '1px solid #d1d5db',
                fontSize: '13.5px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            {emailError && (
              <div style={{ fontSize: '11.5px', color: '#dc2626', marginTop: '4px', lineHeight: 1.3 }}>
                {emailError}
              </div>
            )}
          </div>

          {/* Password with Eye Toggle */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
              Mật khẩu <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur('password')}
                placeholder="Tối thiểu 8 ký tự (hoa, thường, số)"
                style={{
                  width: '100%',
                  height: '42px',
                  padding: '0 40px 0 12px',
                  borderRadius: '6px',
                  border: passwordError ? '1.5px solid #dc2626' : '1px solid #d1d5db',
                  fontSize: '13.5px',
                  outline: 'none',
                  boxSizing: 'border-box'
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
                  color: '#6b7280',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px'
                }}
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>
            {passwordError && (
              <div style={{ fontSize: '11.5px', color: '#dc2626', marginTop: '4px', lineHeight: 1.3 }}>
                {passwordError}
              </div>
            )}
          </div>

          {/* Confirm Password with Eye Toggle */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
              Xác nhận lại mật khẩu <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => handleBlur('confirmPassword')}
                placeholder="Nhập lại mật khẩu"
                style={{
                  width: '100%',
                  height: '42px',
                  padding: '0 40px 0 12px',
                  borderRadius: '6px',
                  border: confirmPasswordError ? '1.5px solid #dc2626' : '1px solid #d1d5db',
                  fontSize: '13.5px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#6b7280',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px'
                }}
                aria-label={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showConfirmPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>
            {confirmPasswordError && (
              <div style={{ fontSize: '11.5px', color: '#dc2626', marginTop: '4px', lineHeight: 1.3 }}>
                {confirmPasswordError}
              </div>
            )}
          </div>

          {/* Privacy & Consent */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', cursor: 'pointer', color: '#4b5563', lineHeight: 1.5 }}>
              <input
                type="checkbox"
                required
                checked={consentTerms}
                onChange={(e) => setConsentTerms(e.target.checked)}
                style={{ accentColor: 'var(--accent, #1b6e66)', marginTop: '2px' }}
              />
              <span>
                Tôi đã đọc và đồng ý với <strong>Điều khoản dịch vụ</strong> và{' '}
                <strong>Chính sách bảo vệ dữ liệu cá nhân</strong> (Tuân thủ Luật Bảo vệ dữ liệu cá nhân 91/2025/QH15 &amp; Nghị định 356/2025/NĐ-CP). <span style={{ color: '#dc2626' }}>*</span>
              </span>
            </label>

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', cursor: 'pointer', color: '#6b7280', lineHeight: 1.5 }}>
              <input
                type="checkbox"
                checked={consentTalentPool}
                onChange={(e) => setConsentTalentPool(e.target.checked)}
                style={{ accentColor: 'var(--accent, #1b6e66)', marginTop: '2px' }}
              />
              <span>
                Cho phép lưu hồ sơ vào <strong>Kho tài năng (Talent Pool)</strong> để nhà tuyển dụng có thể chủ động kết nối cơ hội việc làm.
              </span>
            </label>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              height: '46px',
              backgroundColor: '#095744',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '700',
              fontSize: '14px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
              transition: 'background-color 0.15s ease'
            }}
          >
            {isLoading ? 'Đang khởi tạo tài khoản...' : 'TẠO TÀI KHOẢN ỨNG VIÊN →'}
          </button>
        </form>

        <div style={{ marginTop: '22px', textAlign: 'center', fontSize: '12.5px', color: '#6b7280' }}>
          Đã có tài khoản?{' '}
          <Link to="/login" style={{ fontWeight: '700', color: '#095744', textDecoration: 'none' }}>
            Đăng nhập ngay
          </Link>
        </div>

        <div style={{ marginTop: '8px', textAlign: 'center', fontSize: '12px', color: '#9ca3af' }}>
          Bạn là doanh nghiệp?{' '}
          <Link to="/register-recruiter" style={{ fontWeight: '600', color: '#095744', textDecoration: 'none' }}>
            Đăng ký tài khoản Tuyển dụng tại đây
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
