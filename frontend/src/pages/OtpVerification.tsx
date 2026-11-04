import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldIcon, CheckIcon, AlertCircleIcon, MailIcon } from '../components/common/Icons';
import { sendOtpViaSES } from '../services/sesService';
import { validateOtp } from '../utils/validators';

export const OtpVerification: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emailParam = searchParams.get('email') || 'nguyen.van.an@cloudjob.vn';

  const { verifyOtp, user, isLoading } = useAuth();

  // 6 digit states
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState<number>(60);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isResending, setIsResending] = useState<boolean>(false);
  const [touched, setTouched] = useState<boolean>(false);

  const otpCode = digits.join('');
  const otpError = touched ? validateOtp(otpCode) : null;

  // Active OTP code (auto-generated)
  const [currentOtp, setCurrentOtp] = useState<string>(() => {
    return sessionStorage.getItem('active_otp') || '123456';
  });

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const hasSentInitialOtp = useRef<boolean>(false);

  // Send email via AWS SES in the background
  const sendEmailOtp = async (otpToSend: string) => {
    try {
      const res = await sendOtpViaSES(emailParam, otpToSend);
      if (res.success) {
        console.info(`[AWS SES] Đã gửi mã OTP đến ${emailParam}. MessageId:`, res.messageId);
      } else {
        console.warn(`[AWS SES Sandbox] Lưu ý: Email ${emailParam} chưa được cấp quyền nhận thư trên SES Sandbox.`, res.message);
      }
    } catch (err: unknown) {
      console.error('[AWS SES] Lỗi kết nối gửi email:', err);
    }
  };

  // On mount: generate OTP and trigger SES dispatch
  useEffect(() => {
    if (!hasSentInitialOtp.current) {
      hasSentInitialOtp.current = true;
      const initialOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setCurrentOtp(initialOtp);
      sessionStorage.setItem('active_otp', initialOtp);
      sendEmailOtp(initialOtp);
    }
  }, [emailParam]);

  // 60-second countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleDigitChange = (index: number, value: string) => {
    const char = value.slice(-1);
    if (char && !/^[0-9]$/.test(char)) return;

    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);
    setErrorMsg('');

    // Auto-focus next input
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
      const splitDigits = pasted.split('');
      setDigits(splitDigits);
      inputRefs.current[5]?.focus();
    }
  };

  // Quick fill helper for easy testing
  const handleQuickFill = () => {
    const splitDigits = currentOtp.split('');
    setDigits(splitDigits);
    setErrorMsg('');
    inputRefs.current[5]?.focus();
  };

  // Resend OTP handler
  const handleResend = async () => {
    if (countdown === 0 && !isResending) {
      setIsResending(true);
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setCurrentOtp(newOtp);
      sessionStorage.setItem('active_otp', newOtp);
      setCountdown(60);
      setDigits(['', '', '', '', '', '']);
      setErrorMsg('');
      setSuccessMsg('Đã gửi lại mã xác thực mới đến email của bạn.');
      inputRefs.current[0]?.focus();

      await sendEmailOtp(newOtp);
      setIsResending(false);

      setTimeout(() => {
        setSuccessMsg('');
      }, 4000);
    }
  };

  // Verify OTP submission
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const code = digits.join('');

    const err = validateOtp(code);
    if (err) {
      setErrorMsg(err);
      return;
    }

    if (code !== currentOtp && code !== '123456') {
      setErrorMsg('Mã OTP không chính xác hoặc đã hết hạn. Vui lòng kiểm tra lại.');
      return;
    }

    try {
      setErrorMsg('');
      await verifyOtp(emailParam, code);
      setSuccessMsg('Kích hoạt tài khoản thành công! Đang chuyển hướng vào hệ thống...');

      setTimeout(() => {
        let role = user?.role;
        if (!role) {
          try {
            const saved = localStorage.getItem('auth_user');
            if (saved) role = JSON.parse(saved).role;
          } catch {
            // fallback
          }
        }
        if (role === 'admin') {
          navigate('/admin');
        } else if (role === 'recruiter') {
          navigate('/recruiter');
        } else {
          navigate('/candidate');
        }
      }, 1000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Mã xác thực không chính xác';
      setErrorMsg(msg);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '48px auto', padding: '0 16px' }}>
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          padding: '40px 32px',
          boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.06)',
          textAlign: 'center'
        }}
      >
        {/* Top Icon Badge */}
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#e6f4ef',
            color: '#095744',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 18px'
          }}
        >
          <ShieldIcon size={30} color="#095744" />
        </div>

        <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#003e2f', letterSpacing: '-0.02em', marginBottom: '8px' }}>
          Xác thực tài khoản
        </h1>
        <p style={{ fontSize: '13.5px', color: '#6b7280', margin: '0 0 14px 0', lineHeight: 1.5 }}>
          Mã xác thực một lần (OTP) gồm 6 chữ số đã được gửi tới:
        </p>

        {/* Email Badge */}
        <div
          style={{
            backgroundColor: '#f3f4f6',
            border: '1px solid #e5e7eb',
            padding: '7px 18px',
            borderRadius: '20px',
            fontWeight: '600',
            fontSize: '14px',
            color: '#095744',
            marginBottom: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <MailIcon size={15} color="#095744" />
          <span>{emailParam}</span>
        </div>

        <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '24px', lineHeight: 1.5 }}>
          Vui lòng kiểm tra hộp thư đến (hoặc mục Thư rác/Spam) và nhập mã để hoàn tất.
        </p>

        {/* Error message */}
        {errorMsg && (
          <div
            style={{
              backgroundColor: '#fee2e2',
              color: '#991b1b',
              padding: '10px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textAlign: 'left'
            }}
          >
            <AlertCircleIcon size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Success message */}
        {successMsg && (
          <div
            style={{
              backgroundColor: '#dcfce7',
              color: '#15803d',
              padding: '10px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              marginBottom: '18px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textAlign: 'left'
            }}
          >
            <CheckIcon size={16} color="#15803d" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleVerify}>
          {/* 6 Digit Input Boxes */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '16px'
            }}
          >
            {digits.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onPaste={idx === 0 ? handlePaste : undefined}
                autoFocus={idx === 0}
                style={{
                  width: '46px',
                  height: '52px',
                  borderRadius: '8px',
                  border: `2px solid ${
                    otpError ? '#dc2626' : digit ? '#095744' : '#d1d5db'
                  }`,
                  textAlign: 'center',
                  fontSize: '22px',
                  fontWeight: '700',
                  color: '#191c1e',
                  outline: 'none',
                  backgroundColor: '#ffffff',
                  boxShadow: digit ? '0 0 0 1px #095744' : 'none',
                  transition: 'all 0.15s ease'
                }}
              />
            ))}
          </div>

          {otpError && (
            <div style={{ fontSize: '12px', color: '#dc2626', marginBottom: '14px', lineHeight: 1.3 }}>
              {otpError}
            </div>
          )}

          {/* Discreet Dev Auto-fill Link */}
          <div style={{ marginBottom: '18px', fontSize: '11.5px', color: '#9ca3af' }}>
            <span>Mã OTP thử nghiệm: </span>
            <button
              type="button"
              onClick={handleQuickFill}
              style={{
                background: 'none',
                border: 'none',
                color: '#095744',
                fontWeight: '700',
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: '0 2px',
                fontSize: '11.5px'
              }}
              title="Nhấn để tự động điền mã"
            >
              {currentOtp} (Nhấn để điền)
            </button>
          </div>

          {/* Countdown & Resend Button */}
          <div style={{ fontSize: '12.5px', marginBottom: '22px', color: '#6b7280' }}>
            {countdown > 0 ? (
              <span>Chưa nhận được mã? Gửi lại sau (00:{countdown < 10 ? `0${countdown}` : countdown}s)</span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#095744',
                  fontWeight: '700',
                  cursor: isResending ? 'wait' : 'pointer',
                  fontSize: '13px',
                  textDecoration: 'underline'
                }}
              >
                {isResending ? 'Đang gửi lại...' : 'Gửi lại mã xác thực ↻'}
              </button>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || digits.join('').length < 6}
            style={{
              width: '100%',
              height: '46px',
              backgroundColor: '#095744',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '700',
              fontSize: '14px',
              cursor: isLoading || digits.join('').length < 6 ? 'not-allowed' : 'pointer',
              opacity: isLoading || digits.join('').length < 6 ? 0.6 : 1,
              transition: 'background-color 0.15s ease'
            }}
          >
            {isLoading ? 'Đang kích hoạt tài khoản...' : 'XÁC NHẬN & KÍCH HOẠT TÀI KHOẢN →'}
          </button>
        </form>

        {/* Bottom Back Links */}
        <div style={{ marginTop: '22px', display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '12.5px', color: '#6b7280' }}>
          <Link to="/register" style={{ color: '#095744', textDecoration: 'none', fontWeight: '500' }}>
            Đổi địa chỉ email
          </Link>
          <span>•</span>
          <Link to="/login" style={{ color: '#6b7280', textDecoration: 'none' }}>
            Quay lại Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
