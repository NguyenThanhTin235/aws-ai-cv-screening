import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldIcon, CheckIcon, AlertCircleIcon } from '../components/common/Icons';

export const OtpVerification: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emailParam = searchParams.get('email') || 'nguyen.van.an@example.com';

  const { verifyOtp, user, isLoading } = useAuth();

  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState<number>(60);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleDigitChange = (index: number, value: string) => {
    // Only accept numeric digit
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

  const handleResend = () => {
    if (countdown === 0) {
      setCountdown(60);
      setErrorMsg('');
      alert(`Mã xác thực mới đã được gửi tới ${emailParam} (Mã thử nghiệm: 123456)`);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = digits.join('');
    if (otpCode.length < 6) {
      setErrorMsg('Vui lòng nhập đủ 6 chữ số mã xác thực.');
      return;
    }

    try {
      setErrorMsg('');
      await verifyOtp(emailParam, otpCode);
      setSuccessMsg('Kích hoạt tài khoản thành công! Đang chuyển hướng vào hệ thống...');

      setTimeout(() => {
        if (user?.role === 'admin') {
          navigate('/admin');
        } else if (user?.role === 'recruiter') {
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
    <div style={{ maxWidth: '480px', margin: '48px auto', padding: '0 16px' }}>
      <div
        style={{
          backgroundColor: 'var(--color-surface-container-lowest)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-outline-variant)',
          padding: '36px',
          boxShadow: 'var(--shadow-md)',
          textAlign: 'center'
        }}
      >
        {/* Top Icon */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-primary-fixed)',
            color: 'var(--color-primary-container)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '28px'
          }}
        >
          <ShieldIcon size={32} color="var(--color-primary-container)" />
        </div>

        <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--color-on-surface)' }}>
          Xác thực địa chỉ Email
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--color-outline)', marginTop: '6px' }}>
          Mã xác thực gồm 6 chữ số đã được gửi qua email đến:
        </p>

        {/* Email Box */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-container-low)',
            padding: '8px 16px',
            borderRadius: 'var(--radius-md)',
            fontWeight: '600',
            fontSize: '14px',
            color: 'var(--color-primary)',
            margin: '12px auto 24px',
            display: 'inline-block'
          }}
        >
          {emailParam}
        </div>

        {errorMsg && (
          <div
            style={{
              backgroundColor: 'var(--color-error-container)',
              color: 'var(--color-on-error-container)',
              padding: '10px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              marginBottom: '16px',
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
              backgroundColor: '#e6f4ea',
              color: '#137333',
              padding: '10px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              marginBottom: '16px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <CheckIcon size={16} />
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
              marginBottom: '24px'
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
                  width: '48px',
                  height: '54px',
                  borderRadius: 'var(--radius-md)',
                  border: `2px solid ${
                    digit ? 'var(--color-primary-container)' : 'var(--color-outline-variant)'
                  }`,
                  textAlign: 'center',
                  fontSize: '22px',
                  fontWeight: '700',
                  color: 'var(--color-on-surface)',
                  outline: 'none',
                  backgroundColor: '#ffffff'
                }}
              />
            ))}
          </div>

          <p style={{ fontSize: '11px', color: 'var(--color-outline)', marginBottom: '16px' }}>
            Gợi ý thử nghiệm: gõ <strong>123456</strong> hoặc dán (Ctrl+V) mã xác thực gồm 6 chữ số.
          </p>

          {/* Countdown & Resend */}
          <div style={{ fontSize: '13px', marginBottom: '24px', color: 'var(--color-outline)' }}>
            {countdown > 0 ? (
              <span>Chưa nhận được mã? Gửi lại sau (00:{countdown < 10 ? `0${countdown}` : countdown}s)</span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-primary)',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
              >
                Gửi lại mã OTP mới ↻
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || digits.join('').length < 6}
            style={{
              width: '100%',
              height: '46px',
              backgroundColor: 'var(--color-primary-container)',
              color: '#ffffff',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontWeight: '700',
              fontSize: '14px',
              cursor: isLoading || digits.join('').length < 6 ? 'not-allowed' : 'pointer',
              opacity: isLoading || digits.join('').length < 6 ? 0.6 : 1
            }}
          >
            {isLoading ? 'Đang kích hoạt tài khoản...' : 'XÁC NHẬN & KÍCH HOẠT TÀI KHOẢN →'}
          </button>
        </form>

        <div style={{ marginTop: '24px', fontSize: '13px' }}>
          <Link to="/login" style={{ color: 'var(--color-outline)' }}>
            ← Quay lại trang Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

