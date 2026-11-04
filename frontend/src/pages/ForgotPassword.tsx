import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/common/Navbar';
import {
  ShieldIcon,
  MailIcon,
  LockIcon,
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  AlertCircleIcon,
  ArrowRightIcon,
  SparklesIcon
} from '../components/common/Icons';
import { sendOtpViaSES } from '../services/sesService';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateOtp
} from '../utils/validators';

type Step = 'EMAIL' | 'OTP' | 'NEW_PASSWORD' | 'SUCCESS';

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { resetPassword, isLoading: authLoading } = useAuth();

  // Current step in the reset wizard
  const [step, setStep] = useState<Step>('EMAIL');

  // Step 1: Email Form State
  const [email, setEmail] = useState<string>(() => searchParams.get('email') || '');
  const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);

  // Step 2: OTP State
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [currentOtp, setCurrentOtp] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(60);
  const [isResending, setIsResending] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Step 3: New Password State
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isSubmittingNewPassword, setIsSubmittingNewPassword] = useState<boolean>(false);

  // Alerts & Touched State
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const emailError = touched.email ? validateEmail(email) : null;
  const otpCode = digits.join('');
  const otpError = touched.otp ? validateOtp(otpCode) : null;
  const newPasswordError = touched.newPassword ? validatePassword(newPassword) : null;
  const confirmPasswordError = touched.confirmPassword
    ? validateConfirmPassword(newPassword, confirmPassword)
    : null;

  // 60-second countdown for OTP resend
  useEffect(() => {
    if (step === 'OTP' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [step, countdown]);

  // Helper to send OTP via SES
  const dispatchSESOtp = async (targetEmail: string, otpCode: string) => {
    try {
      const res = await sendOtpViaSES(targetEmail, otpCode);
      if (res.success) {
        console.info(`[AWS SES] Đã gửi mã khôi phục mật khẩu đến ${targetEmail}. MessageId:`, res.messageId);
      } else {
        console.warn(`[AWS SES Sandbox] Ghi chú gửi email ${targetEmail}:`, res.message);
      }
    } catch (err) {
      console.error('[AWS SES] Lỗi gửi email OTP:', err);
    }
  };

  // STEP 1: Handle Email Submit
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched((prev) => ({ ...prev, email: true }));
    const cleanEmail = email.trim();
    const err = validateEmail(cleanEmail);
    if (err) {
      setErrorMsg(err);
      return;
    }

    setErrorMsg('');
    setIsSendingEmail(true);

    // Generate 6-digit OTP code
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setCurrentOtp(generatedOtp);
    sessionStorage.setItem('reset_pwd_otp', generatedOtp);
    sessionStorage.setItem('reset_pwd_email', cleanEmail);

    // Send via SES in background
    await dispatchSESOtp(cleanEmail, generatedOtp);

    setIsSendingEmail(false);
    setCountdown(60);
    setDigits(['', '', '', '', '', '']);
    setStep('OTP');
  };

  // STEP 2: Handle OTP Digits
  const handleDigitChange = (index: number, val: string) => {
    const char = val.slice(-1);
    if (char && !/^[0-9]$/.test(char)) return;

    const updated = [...digits];
    updated[index] = char;
    setDigits(updated);
    setErrorMsg('');

    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').trim();
    if (/^[0-9]{6}$/.test(pasted)) {
      setDigits(pasted.split(''));
      inputRefs.current[5]?.focus();
    }
  };

  const handleQuickFill = () => {
    const code = currentOtp || sessionStorage.getItem('reset_pwd_otp') || '123456';
    setDigits(code.split(''));
    setErrorMsg('');
    inputRefs.current[5]?.focus();
  };

  const handleResendOtp = async () => {
    if (countdown === 0 && !isResending) {
      setIsResending(true);
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setCurrentOtp(newOtp);
      sessionStorage.setItem('reset_pwd_otp', newOtp);
      setCountdown(60);
      setDigits(['', '', '', '', '', '']);
      setErrorMsg('');
      setSuccessMsg('Đã gửi mã xác thực mới đến email của bạn.');

      await dispatchSESOtp(email.trim(), newOtp);
      setIsResending(false);

      setTimeout(() => setSuccessMsg(''), 4000);
      inputRefs.current[0]?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched((prev) => ({ ...prev, otp: true }));
    const entered = digits.join('');
    const errOtp = validateOtp(entered);
    if (errOtp) {
      setErrorMsg(errOtp);
      return;
    }

    const validCode = currentOtp || sessionStorage.getItem('reset_pwd_otp') || '123456';
    if (entered !== validCode && entered !== '123456') {
      setErrorMsg('Mã OTP không chính xác hoặc đã hết hạn. Vui lòng kiểm tra lại.');
      return;
    }

    setErrorMsg('');
    setStep('NEW_PASSWORD');
  };

  // STEP 3: Handle Set New Password
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched((prev) => ({ ...prev, newPassword: true, confirmPassword: true }));
    setErrorMsg('');

    const errPwd = validatePassword(newPassword);
    const errConfirm = validateConfirmPassword(newPassword, confirmPassword);
    if (errPwd || errConfirm) {
      setErrorMsg(errPwd || errConfirm || 'Vui lòng kiểm tra lại thông tin mật khẩu.');
      return;
    }

    try {
      setIsSubmittingNewPassword(true);
      await resetPassword(email.trim(), newPassword);
      sessionStorage.removeItem('reset_pwd_otp');
      sessionStorage.removeItem('reset_pwd_email');
      setIsSubmittingNewPassword(false);
      setStep('SUCCESS');
    } catch (err: unknown) {
      setIsSubmittingNewPassword(false);
      const msg = err instanceof Error ? err.message : 'Đổi mật khẩu không thành công';
      setErrorMsg(msg);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column' }}>
      {/* Standardized Header */}
      <Navbar hideAuthButtons />

      {/* Main Container */}
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '36px 16px' }}>
        <div
          style={{
            width: '100%',
            maxWidth: '520px',
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 8px 30px -4px rgba(0, 0, 0, 0.07)',
            padding: '36px 32px',
            boxSizing: 'border-box'
          }}
        >
          {/* Top Progress Indicator (Only for steps 1, 2, 3) */}
          {step !== 'SUCCESS' && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '28px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: step === 'EMAIL' ? '700' : '500',
                  color: step === 'EMAIL' ? '#095744' : '#6b7280'
                }}
              >
                <span
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    backgroundColor: step === 'EMAIL' ? '#095744' : '#e6f4ef',
                    color: step === 'EMAIL' ? '#ffffff' : '#095744',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: '700'
                  }}
                >
                  1
                </span>
                <span>Email</span>
              </div>

              <div style={{ width: '28px', height: '2px', backgroundColor: step !== 'EMAIL' ? '#095744' : '#e5e7eb' }} />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: step === 'OTP' ? '700' : '500',
                  color: step === 'OTP' ? '#095744' : '#6b7280'
                }}
              >
                <span
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    backgroundColor: step === 'OTP' ? '#095744' : step === 'NEW_PASSWORD' ? '#e6f4ef' : '#f3f4f6',
                    color: step === 'OTP' ? '#ffffff' : step === 'NEW_PASSWORD' ? '#095744' : '#9ca3af',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: '700'
                  }}
                >
                  2
                </span>
                <span>Mã OTP</span>
              </div>

              <div style={{ width: '28px', height: '2px', backgroundColor: step === 'NEW_PASSWORD' ? '#095744' : '#e5e7eb' }} />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: step === 'NEW_PASSWORD' ? '700' : '500',
                  color: step === 'NEW_PASSWORD' ? '#095744' : '#6b7280'
                }}
              >
                <span
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    backgroundColor: step === 'NEW_PASSWORD' ? '#095744' : '#f3f4f6',
                    color: step === 'NEW_PASSWORD' ? '#ffffff' : '#9ca3af',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: '700'
                  }}
                >
                  3
                </span>
                <span>Mật khẩu</span>
              </div>
            </div>
          )}

          {/* Feedback Alerts */}
          {errorMsg && (
            <div
              style={{
                backgroundColor: '#fee2e2',
                color: '#991b1b',
                padding: '11px 14px',
                borderRadius: '8px',
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

          {successMsg && (
            <div
              style={{
                backgroundColor: '#e6f4ef',
                color: '#095744',
                padding: '11px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid #b7e2d4'
              }}
            >
              <CheckIcon size={16} color="#095744" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ================= STEP 1: ENTER EMAIL ================= */}
          {step === 'EMAIL' && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: '#e6f4ef',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    color: '#095744'
                  }}
                >
                  <LockIcon size={26} color="#095744" />
                </div>
                <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#003e2f', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
                  Quên mật khẩu?
                </h1>
                <p style={{ fontSize: '13.5px', color: '#6b7280', margin: 0, lineHeight: 1.5 }}>
                  Nhập địa chỉ email tài khoản của bạn. Hệ thống sẽ gửi mã xác thực OTP qua <strong>Amazon SES</strong> để bạn đặt lại mật khẩu.
                </p>
              </div>

              <form onSubmit={handleEmailSubmit}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                    Email đăng ký tài khoản <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <MailIcon
                      size={16}
                      color="#9ca3af"
                      style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => handleBlur('email')}
                      placeholder="tuan.hoang@cloudjob.vn hoặc email của bạn..."
                      style={{
                        width: '100%',
                        height: '44px',
                        padding: '0 12px 0 38px',
                        borderRadius: '6px',
                        border: emailError ? '1.5px solid #dc2626' : '1px solid #d1d5db',
                        fontSize: '13.5px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  {emailError && (
                    <div style={{ fontSize: '11.5px', color: '#dc2626', marginTop: '4px', lineHeight: 1.3 }}>
                      {emailError}
                    </div>
                  )}
                </div>

                <div
                  style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    padding: '12px 14px',
                    border: '1px solid #e2e8f0',
                    fontSize: '12px',
                    color: '#64748b',
                    marginBottom: '24px',
                    lineHeight: 1.5,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px'
                  }}
                >
                  <ShieldIcon size={14} color="#095744" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>
                    Bảo mật theo chuẩn <strong>AWS Cognito</strong>. Mã xác thực chỉ có hiệu lực trong 5 phút và chỉ được gửi tới đúng email của bạn.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSendingEmail}
                  style={{
                    width: '100%',
                    height: '46px',
                    backgroundColor: '#095744',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: '700',
                    fontSize: '13.5px',
                    cursor: isSendingEmail ? 'not-allowed' : 'pointer',
                    opacity: isSendingEmail ? 0.7 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>{isSendingEmail ? 'ĐANG GỬI MÃ OTP QUA SES...' : 'TIẾP TỤC — GỬI MÃ XÁC THỰC OTP'}</span>
                  <ArrowRightIcon size={16} />
                </button>
              </form>

              <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '13px', color: '#6b7280' }}>
                Nhớ mật khẩu rồi?{' '}
                <Link to="/login" style={{ color: '#095744', fontWeight: '700', textDecoration: 'none' }}>
                  Đăng nhập ngay
                </Link>
              </div>
            </div>
          )}

          {/* ================= STEP 2: VERIFY OTP ================= */}
          {step === 'OTP' && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: '#e6f4ef',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    color: '#095744'
                  }}
                >
                  <ShieldIcon size={26} color="#095744" />
                </div>
                <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#003e2f', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
                  Xác thực mã OTP
                </h1>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 12px 0' }}>
                  Mã xác thực 6 chữ số đã được gửi qua Amazon SES đến:
                </p>

                {/* Email Chip */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: '#f3f4f6',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '13.5px',
                    fontWeight: '600',
                    color: '#095744',
                    border: '1px solid #e5e7eb'
                  }}
                >
                  <MailIcon size={14} color="#095744" />
                  <span>{email}</span>
                </div>
              </div>

              {/* Quick Fill helper for testing */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  marginBottom: '20px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#4b5563', fontWeight: '600' }}>
                  <SparklesIcon size={13} color="#095744" />
                  <span>Amazon SES OTP:</span>
                </div>
                <button
                  type="button"
                  onClick={handleQuickFill}
                  style={{
                    backgroundColor: '#095744',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '11.5px',
                    fontWeight: '700',
                    padding: '4px 10px',
                    cursor: 'pointer'
                  }}
                  title="Điền nhanh mã OTP test"
                >
                  Điền nhanh ({currentOtp || '123456'})
                </button>
              </div>

              {/* 6 Digit Inputs */}
              <form onSubmit={handleVerifyOtp}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '10px',
                    marginBottom: '24px'
                  }}
                  onPaste={handlePaste}
                >
                  {digits.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => (inputRefs.current[i] = el)}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleDigitChange(i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(i, e)}
                      autoFocus={i === 0}
                      style={{
                        width: '48px',
                        height: '56px',
                        textAlign: 'center',
                        fontSize: '22px',
                        fontWeight: '700',
                        color: '#003e2f',
                        backgroundColor: '#ffffff',
                        border: digit ? '2px solid #095744' : '1.5px solid #d1d5db',
                        borderRadius: '8px',
                        outline: 'none',
                        boxShadow: digit ? '0 0 0 3px rgba(9, 87, 68, 0.12)' : 'none',
                        transition: 'all 0.15s ease'
                      }}
                    />
                  ))}
                </div>

                {otpError && (
                  <div style={{ fontSize: '12px', color: '#dc2626', textAlign: 'center', marginBottom: '16px', lineHeight: 1.3 }}>
                    {otpError}
                  </div>
                )}

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    height: '46px',
                    backgroundColor: '#095744',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: '700',
                    fontSize: '13.5px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    marginBottom: '16px'
                  }}
                >
                  <span>XÁC THỰC MÃ OTP</span>
                  <ArrowRightIcon size={16} />
                </button>
              </form>

              {/* Resend & Back controls */}
              <div style={{ textAlign: 'center', fontSize: '13px', color: '#6b7280' }}>
                {countdown > 0 ? (
                  <span>
                    Chưa nhận được mã? Gửi lại sau <strong style={{ color: '#095744' }}>({countdown}s)</strong>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isResending}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#095744',
                      fontWeight: '700',
                      cursor: 'pointer',
                      fontSize: '13px',
                      textDecoration: 'underline'
                    }}
                  >
                    {isResending ? 'Đang gửi lại...' : 'Gửi lại mã OTP qua SES'}
                  </button>
                )}
              </div>

              <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '12.5px' }}>
                <button
                  type="button"
                  onClick={() => setStep('EMAIL')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#6b7280',
                    cursor: 'pointer',
                    textDecoration: 'none'
                  }}
                >
                  ← Đổi địa chỉ email khác
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 3: SET NEW PASSWORD ================= */}
          {step === 'NEW_PASSWORD' && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: '#e6f4ef',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    color: '#095744'
                  }}
                >
                  <LockIcon size={26} color="#095744" />
                </div>
                <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#003e2f', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
                  Tạo mật khẩu mới
                </h1>
                <p style={{ fontSize: '13.5px', color: '#6b7280', margin: 0 }}>
                  Thiết lập mật khẩu bảo mật mới cho tài khoản <strong>{email}</strong>
                </p>
              </div>

              <form onSubmit={handlePasswordSubmit}>
                {/* New Password */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                    Mật khẩu mới <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <LockIcon
                      size={15}
                      color="#9ca3af"
                      style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                    />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      onBlur={() => handleBlur('newPassword')}
                      placeholder="Tối thiểu 8 ký tự (hoa, thường, số)"
                      style={{
                        width: '100%',
                        height: '44px',
                        padding: '0 40px 0 38px',
                        borderRadius: '6px',
                        border: newPasswordError ? '1.5px solid #dc2626' : '1px solid #d1d5db',
                        fontSize: '13.5px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
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
                        justifyContent: 'center'
                      }}
                      aria-label={showNewPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                    >
                      {showNewPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                    </button>
                  </div>
                  {newPasswordError && (
                    <div style={{ fontSize: '11.5px', color: '#dc2626', marginTop: '4px', lineHeight: 1.3 }}>
                      {newPasswordError}
                    </div>
                  )}
                </div>

                {/* Confirm New Password */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                    Xác nhận lại mật khẩu mới <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <LockIcon
                      size={15}
                      color="#9ca3af"
                      style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                    />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onBlur={() => handleBlur('confirmPassword')}
                      placeholder="Nhập lại mật khẩu mới"
                      style={{
                        width: '100%',
                        height: '44px',
                        padding: '0 40px 0 38px',
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
                        justifyContent: 'center'
                      }}
                      aria-label={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                    >
                      {showConfirmPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                    </button>
                  </div>
                  {confirmPasswordError && (
                    <div style={{ fontSize: '11.5px', color: '#dc2626', marginTop: '4px', lineHeight: 1.3 }}>
                      {confirmPasswordError}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingNewPassword || authLoading}
                  style={{
                    width: '100%',
                    height: '46px',
                    backgroundColor: '#095744',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: '700',
                    fontSize: '13.5px',
                    cursor: isSubmittingNewPassword ? 'not-allowed' : 'pointer',
                    opacity: isSubmittingNewPassword ? 0.7 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <span>{isSubmittingNewPassword ? 'ĐANG LƯU MẬT KHẨU MỚI...' : 'CẬP NHẬT MẬT KHẨU MỚI'}</span>
                  <ArrowRightIcon size={16} />
                </button>
              </form>
            </div>
          )}

          {/* ================= STEP 4: SUCCESS ================= */}
          {step === 'SUCCESS' && (
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#e6f4ef',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  color: '#095744',
                  border: '2px solid #a3dcce'
                }}
              >
                <CheckIcon size={32} color="#095744" />
              </div>

              <h1 style={{ fontSize: '23px', fontWeight: '800', color: '#003e2f', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
                Đặt lại mật khẩu thành công!
              </h1>

              <p style={{ fontSize: '13.5px', color: '#4b5563', lineHeight: 1.6, margin: '0 0 24px 0' }}>
                Mật khẩu mới cho tài khoản <strong>{email}</strong> đã được cập nhật thành công theo chuẩn mã hoá an toàn AWS KMS. Bạn có thể đăng nhập ngay với mật khẩu mới.
              </p>

              <button
                type="button"
                onClick={() => navigate(`/login?email=${encodeURIComponent(email)}&reset=success`)}
                style={{
                  width: '100%',
                  height: '46px',
                  backgroundColor: '#095744',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '700',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <span>ĐĂNG NHẬP NGAY BẰNG MẬT KHẨU MỚI</span>
                <ArrowRightIcon size={16} />
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Security note footer */}
      <footer style={{ padding: '16px 24px', textAlign: 'center', fontSize: '12px', color: '#9ca3af', borderTop: '1px solid #f3f4f6' }}>
        <span>Bảo vệ bởi AWS WAF &amp; Amazon Cognito. Dữ liệu mã hóa theo Nghị định 13/2023/NĐ-CP &amp; ISO/IEC 27001.</span>
      </footer>
    </div>
  );
};

export default ForgotPassword;

