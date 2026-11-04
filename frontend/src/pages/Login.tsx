import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/common/Navbar';
import {
  BrainIcon,
  ShieldIcon,
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  AlertCircleIcon,
  CheckIcon
} from '../components/common/Icons';
import { validateEmail } from '../utils/validators';
import '../styles/login.css';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState(() => searchParams.get('email') || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [resetSuccess, setResetSuccess] = useState(() => searchParams.get('reset') === 'success');
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const emailError = touched.email ? validateEmail(email) : null;
  const passwordError = touched.password
    ? !password.trim()
      ? 'Vui lòng nhập mật khẩu của bạn.'
      : null
    : null;

  useEffect(() => {
    const qEmail = searchParams.get('email');
    if (qEmail) setEmail(qEmail);
    if (searchParams.get('reset') === 'success') setResetSuccess(true);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    const errEmail = validateEmail(email);
    const errPassword = !password.trim() ? 'Vui lòng nhập mật khẩu của bạn.' : null;

    if (errEmail || errPassword) {
      setErrorMsg(errEmail || errPassword || 'Vui lòng điền đầy đủ email và mật khẩu hợp lệ.');
      return;
    }

    try {
      setErrorMsg('');
      const { role } = await login(email, password);
      // Auto-routing according to detected role
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
    <div className="login-page-root">
      {/* 1. TOP STANDARDIZED NAVBAR */}
      <Navbar hideAuthButtons />

      {/* 2. MAIN SPLIT SCREEN */}
      <main className="login-main-container">
        {/* LEFT PANEL: Enterprise Green Authority Branding */}
        <section className="login-left-panel">
          <div className="login-left-inner">
            <div>
              {/* Top row in left panel */}
              <div className="login-left-header">
                <div className="login-left-brand-group">
                  <div className="login-left-logo-icon">
                    <BrainIcon size={20} color="#ffffff" />
                  </div>
                  <div>
                    <div className="login-left-brand-text">
                      Cloud<span style={{ color: '#acf1d7', fontWeight: '600' }}>Job</span>
                    </div>
                    <div className="login-left-brand-sub">HỆ THỐNG SÀNG LỌC CV BẰNG AI</div>
                  </div>
                </div>
              </div>

              {/* Headline */}
              <h1 className="login-left-headline">
                Sàng lọc CV &amp; Đánh giá Năng lực Cloud
              </h1>

              {/* Sub-description */}
              <p className="login-left-desc">
                Nền tảng tuyển dụng Cloud-Native trên AWS. Tự động hóa trích xuất dữ liệu CV, chấm điểm theo ma trận Rubric và hỗ trợ thẩm định hồ sơ minh bạch.
              </p>

              {/* Editorial Spec List */}
              <div className="login-spec-list">
                <div className="login-spec-item">
                  <div className="login-spec-title">Ma trận AI Rubric 100 điểm</div>
                  <div className="login-spec-desc">
                    Đối chiếu tiêu chí công việc theo cấu trúc chuẩn hóa, hỗ trợ giám sát bởi con người (Human-in-the-loop).
                  </div>
                </div>

                <div className="login-spec-item">
                  <div className="login-spec-title">Khử định danh PII tự động</div>
                  <div className="login-spec-desc">
                    Tuân thủ Luật Bảo vệ dữ liệu cá nhân 91/2025/QH15 &amp; Nghị định 356/2025/NĐ-CP, che chắn thông tin nhân khẩu học trước phân tích.
                  </div>
                </div>

                <div className="login-spec-item">
                  <div className="login-spec-title">Hạ tầng AWS Serverless</div>
                  <div className="login-spec-desc">
                    Mã hóa KMS Envelope Encryption, định danh bảo mật qua Amazon Cognito RBAC và kiểm soát truy cập nghiêm ngặt.
                  </div>
                </div>
              </div>
            </div>

            {/* System Info Meta Row */}
            <div className="login-system-meta">
              <span>Hệ thống máy chủ AWS AP-Southeast-1</span>
              <span>Mã hóa TLS 1.3 &amp; KMS</span>
              <span>Tuân thủ Luật 91/2025/QH15</span>
            </div>
          </div>
        </section>

        {/* RIGHT PANEL: Authentication Form */}
        <section className="login-right-panel">
          {/* Top Trust Status Row */}
          <div className="login-right-top-bar">
            <div className="login-right-badge">
              <ShieldIcon size={13} color="#095744" />
              <span>Cổng xác thực an toàn AWS Cognito</span>
            </div>
            <div className="login-right-status">
              <span className="login-right-status-dot" />
              <span>Khu vực AP-Southeast-1 trực tuyến</span>
            </div>
          </div>

          {/* Main Card */}
          <div className="login-card-container">
            <h2 className="login-form-title">Chào mừng trở lại</h2>
            <p className="login-form-subtitle">
              Đăng nhập để tiếp tục vào không gian làm việc của bạn
            </p>

            {resetSuccess && (
              <div
                style={{
                  backgroundColor: '#e6f4ef',
                  color: '#095744',
                  border: '1px solid #b7e2d4',
                  padding: '11px 14px',
                  borderRadius: '6px',
                  fontSize: '12.5px',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  lineHeight: 1.4
                }}
              >
                <CheckIcon size={16} color="#095744" />
                <span>Mật khẩu đã được đặt lại thành công! Bạn có thể đăng nhập bằng mật khẩu mới.</span>
              </div>
            )}

            {errorMsg && (
              <div
                style={{
                  backgroundColor: '#fee2e2',
                  color: '#991b1b',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  fontSize: '12.5px',
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

            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="login-input-group">
                <label className="login-input-label">
                  Email đăng nhập <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <div className="login-input-wrapper">
                  <MailIcon size={15} className="login-input-icon" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder="tuan.hoang@cloudjob.vn hoặc email của bạn..."
                    className="login-input-field"
                    style={{
                      border: emailError ? '1.5px solid #dc2626' : undefined
                    }}
                  />
                </div>
                {emailError && (
                  <div style={{ fontSize: '11.5px', color: '#dc2626', marginTop: '4px', lineHeight: 1.3 }}>
                    {emailError}
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className="login-input-group">
                <div className="login-input-label-row">
                  <label className="login-input-label">
                    Mật khẩu <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <Link
                    to="/forgot-password"
                    style={{ fontSize: '12px', color: '#095744', textDecoration: 'none', fontWeight: '600' }}
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
                <div className="login-input-wrapper">
                  <LockIcon size={15} className="login-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => handleBlur('password')}
                    placeholder="••••••••••••"
                    className="login-input-field"
                    style={{
                      paddingRight: '38px',
                      border: passwordError ? '1.5px solid #dc2626' : undefined
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="login-pwd-toggle-btn"
                    aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  >
                    {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                  </button>
                </div>
                {passwordError && (
                  <div style={{ fontSize: '11.5px', color: '#dc2626', marginTop: '4px', lineHeight: 1.3 }}>
                    {passwordError}
                  </div>
                )}
              </div>

              {/* Remember me */}
              <div className="login-remember-row">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: '#095744', cursor: 'pointer' }}
                />
                <label htmlFor="remember" className="login-remember-label">
                  Ghi nhớ đăng nhập
                </label>
              </div>

              {/* Submit CTA */}
              <button type="submit" disabled={isLoading} className="login-submit-btn">
                <span>{isLoading ? 'ĐANG XÁC THỰC...' : 'ĐĂNG NHẬP VÀO HỆ THỐNG'}</span>
                <span>→</span>
              </button>
            </form>

            {/* Divider */}
            <div className="login-divider">
              <span>HOẶC TIẾP TỤC VỚI</span>
            </div>

            {/* Google Workspace Button */}
            <button
              type="button"
              onClick={() => {
                setEmail('nguyen.van.an@cloudjob.vn');
                setPassword('Candidate@12345');
              }}
              className="login-google-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Đăng nhập bằng Google Workspace</span>
            </button>

            {/* Registration Box */}
            <div className="login-register-box">
              Chưa có tài khoản?{' '}
              <Link to="/register?role=candidate">
                Đăng ký tài khoản Ứng viên
              </Link>
            </div>
          </div>

          {/* Bottom Security Note */}
          <div className="login-security-notice">
            <ShieldIcon size={13} color="var(--accent, #1b6e66)" />
            <span>Bảo vệ bởi AWS WAF &amp; Amazon Cognito. Tuân thủ Luật BVDLCN 91/2025/QH15 &amp; Nghị định 356/2025/NĐ-CP.</span>
          </div>
        </section>
      </main>

      {/* 3. BOTTOM THIN BAR */}
      <footer className="login-bottombar">
        <div>
          © 2026 CloudJob. Nền tảng tuyển dụng Cloud-Native trên AWS.
        </div>
        <div className="login-bottombar-links">
          <Link to="/chinh-sach-bao-mat" className="login-bottombar-link">
            Chính sách bảo mật
          </Link>
          <Link to="/dieu-khoan" className="login-bottombar-link">
            Điều khoản sử dụng
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Login;
