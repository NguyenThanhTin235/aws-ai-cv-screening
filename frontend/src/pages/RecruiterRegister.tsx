import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/common/Navbar';
import {
  BuildingIcon,
  ShieldIcon,
  AlertCircleIcon,
  EyeIcon,
  EyeOffIcon,
  CheckIcon,
  SparklesIcon,
  ArrowRightIcon
} from '../components/common/Icons';
import {
  validateFullName,
  validatePhone,
  validateEmail,
  validateCompanyName,
  validatePassword,
  validateConfirmPassword
} from '../utils/validators';

export const RecruiterRegister: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();

  // Contact person details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [jobTitle, setJobTitle] = useState('Trưởng phòng Tuyển dụng (HR Manager)');

  // Company details
  const [companyName, setCompanyName] = useState('');
  const [companyScale, setCompanyScale] = useState('50-150 nhân sự');
  const [companyLocation, setCompanyLocation] = useState('Hà Nội');
  const [industry, setIndustry] = useState('Công nghệ thông tin / Phần mềm');

  // Password & Security
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [consentTerms, setConsentTerms] = useState(false);

  // Error feedback & Touched state
  const [errorMsg, setErrorMsg] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const nameError = touched.fullName ? validateFullName(fullName) : null;
  const phoneError = touched.phone ? validatePhone(phone) : null;
  const emailError = touched.email ? validateEmail(email) : null;
  const companyError = touched.companyName ? validateCompanyName(companyName) : null;
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
      companyName: true,
      password: true,
      confirmPassword: true
    });

    const errName = validateFullName(fullName);
    const errPhone = validatePhone(phone);
    const errEmail = validateEmail(email);
    const errCompany = validateCompanyName(companyName);
    const errPassword = validatePassword(password);
    const errConfirm = validateConfirmPassword(password, confirmPassword);

    if (errName || errPhone || errEmail || errCompany || errPassword || errConfirm) {
      setErrorMsg(
        errName ||
          errPhone ||
          errEmail ||
          errCompany ||
          errPassword ||
          errConfirm ||
          'Vui lòng kiểm tra lại thông tin biểu mẫu.'
      );
      return;
    }

    if (!consentTerms) {
      setErrorMsg('Vui lòng cam kết là đại diện tuyển dụng hợp pháp và đồng ý với Điều khoản dịch vụ.');
      return;
    }

    try {
      const { email: regEmail } = await register({
        role: 'recruiter',
        email: email.trim(),
        password,
        fullName: fullName.trim(),
        phone: phone.trim(),
        companyName: companyName.trim()
      });

      navigate(`/verify-otp?email=${encodeURIComponent(regEmail)}&role=recruiter`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Đăng ký tài khoản không thành công';
      setErrorMsg(msg);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column' }}>
      {/* Standardized Header */}
      <Navbar hideAuthButtons />

      <main style={{ flex: 1, padding: '36px 16px 56px' }}>
        <div
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            border: '1px solid #e5e7eb',
            padding: '36px 40px',
            boxShadow: '0 8px 30px -4px rgba(0, 0, 0, 0.06)'
          }}
        >
          {/* Top Header Badge & Title */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span
              style={{
                fontSize: '11.5px',
                fontWeight: '700',
                backgroundColor: '#e6f4ef',
                color: '#095744',
                padding: '5px 14px',
                borderRadius: '9999px',
                letterSpacing: '0.04em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <BuildingIcon size={13} color="#095744" />
              <span>DÀNH CHO DOANH NGHIỆP &amp; NHÀ TUYỂN DỤNG</span>
            </span>

            <h1
              style={{
                fontSize: '25px',
                fontWeight: '800',
                marginTop: '12px',
                color: '#003e2f',
                letterSpacing: '-0.02em',
                lineHeight: 1.2
              }}
            >
              Đăng ký tài khoản Nhà tuyển dụng
            </h1>

            <p style={{ fontSize: '13.5px', color: '#6b7280', marginTop: '6px', maxWidth: '560px', margin: '6px auto 0', lineHeight: 1.5 }}>
              Tạo tài khoản Doanh nghiệp để đăng tin tuyển dụng, tiếp cận <strong>10,000+ Kỹ sư Cloud</strong> và kích hoạt sàng lọc CV tự động bằng AWS Bedrock AI.
            </p>
          </div>

          {/* Value Proposition Pills */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '10px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '12px 16px',
              marginBottom: '28px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#095744', fontWeight: '600' }}>
              <CheckIcon size={15} color="#095744" />
              <span>3 tin đăng miễn phí</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#095744', fontWeight: '600' }}>
              <SparklesIcon size={14} color="#095744" />
              <span>50 lượt sàng lọc AI Bedrock</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#095744', fontWeight: '600' }}>
              <ShieldIcon size={14} color="#095744" />
              <span>Tuân thủ Nghị định 13/2023</span>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div
              style={{
                backgroundColor: '#fee2e2',
                color: '#991b1b',
                padding: '11px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                marginBottom: '24px',
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
            {/* SECTION 1: CONTACT PERSON */}
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b', marginBottom: '14px', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                1. Thông tin người đại diện tuyển dụng
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                    Họ và tên người liên hệ <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    onBlur={() => handleBlur('fullName')}
                    placeholder="VD: Hoàng Thu Mai"
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
                    Số điện thoại liên hệ <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    placeholder="VD: 0988 765 432"
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

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                    Email công việc / doanh nghiệp <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder="VD: recruiter@finstream.vn hoặc email của bạn..."
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
                  {emailError ? (
                    <div style={{ fontSize: '11.5px', color: '#dc2626', marginTop: '4px', lineHeight: 1.3 }}>
                      {emailError}
                    </div>
                  ) : (
                    <span style={{ fontSize: '11.5px', color: '#6b7280', marginTop: '4px', display: 'block' }}>
                      Mã xác thực OTP sẽ được gửi tới email này để kích hoạt.
                    </span>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                    Chức danh / Vị trí công tác
                  </label>
                  <select
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    style={{
                      width: '100%',
                      height: '42px',
                      padding: '0 10px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '13px',
                      outline: 'none',
                      backgroundColor: '#ffffff',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="Trưởng phòng Tuyển dụng (HR Manager)">Trưởng phòng Tuyển dụng (HR Manager)</option>
                    <option value="Chuyên viên Tuyển dụng (Talent Acquisition)">Chuyên viên Tuyển dụng (Talent Acquisition)</option>
                    <option value="Giám đốc Nhân sự (HR Director)">Giám đốc Nhân sự (HR Director)</option>
                    <option value="Giám đốc Kỹ thuật / CTO">Giám đốc Kỹ thuật / CTO / Tech Lead</option>
                    <option value="Nhà sáng lập / Giám đốc điều hành (CEO)">Nhà sáng lập / Giám đốc điều hành (CEO)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SECTION 2: COMPANY INFORMATION */}
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b', marginBottom: '14px', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                2. Thông tin Doanh nghiệp / Tổ chức
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                    Tên đầy đủ của Doanh nghiệp <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    onBlur={() => handleBlur('companyName')}
                    placeholder="VD: FinStream Digital Bank, Tập đoàn Vingroup, KMS Technology..."
                    style={{
                      width: '100%',
                      height: '42px',
                      padding: '0 12px',
                      borderRadius: '6px',
                      border: companyError ? '1.5px solid #dc2626' : '1px solid #d1d5db',
                      fontSize: '13.5px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  {companyError && (
                    <div style={{ fontSize: '11.5px', color: '#dc2626', marginTop: '4px', lineHeight: 1.3 }}>
                      {companyError}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                    Quy mô nhân sự
                  </label>
                  <select
                    value={companyScale}
                    onChange={(e) => setCompanyScale(e.target.value)}
                    style={{
                      width: '100%',
                      height: '42px',
                      padding: '0 10px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '13px',
                      outline: 'none',
                      backgroundColor: '#ffffff',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="1-10 nhân sự">1 - 10 nhân sự (Startup)</option>
                    <option value="10-50 nhân sự">10 - 50 nhân sự</option>
                    <option value="50-150 nhân sự">50 - 150 nhân sự</option>
                    <option value="150-500 nhân sự">150 - 500 nhân sự</option>
                    <option value="500-1000 nhân sự">500 - 1000 nhân sự</option>
                    <option value="1000+ nhân sự">1000+ nhân sự (Tập đoàn)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                    Tỉnh / Thành phố trụ sở chính
                  </label>
                  <select
                    value={companyLocation}
                    onChange={(e) => setCompanyLocation(e.target.value)}
                    style={{
                      width: '100%',
                      height: '42px',
                      padding: '0 10px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '13px',
                      outline: 'none',
                      backgroundColor: '#ffffff',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Cần Thơ">Cần Thơ</option>
                    <option value="Hải Phòng">Hải Phòng</option>
                    <option value="Bình Dương">Bình Dương</option>
                    <option value="Toàn quốc / Remote">Toàn quốc / Remote</option>
                  </select>
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                    Lĩnh vực hoạt động chính
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    style={{
                      width: '100%',
                      height: '42px',
                      padding: '0 10px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '13px',
                      outline: 'none',
                      backgroundColor: '#ffffff',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="Công nghệ thông tin / Phần mềm">Công nghệ thông tin / Phần mềm (Software / Cloud / SaaS)</option>
                    <option value="Ngân hàng / Tài chính / Fintech">Ngân hàng / Tài chính / Fintech / Chứng khoán</option>
                    <option value="Thương mại điện tử / Bán lẻ">Thương mại điện tử / Bán lẻ (E-Commerce / Retail)</option>
                    <option value="Viễn thông / Hạ tầng mạng">Viễn thông / Data Center / Hạ tầng mạng</option>
                    <option value="Sản xuất / Logistics">Sản xuất công nghệ cao / Logistics / Supply Chain</option>
                    <option value="Khác">Lĩnh vực khác</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SECTION 3: PASSWORD & SECURITY */}
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b', marginBottom: '14px', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                3. Thiết lập mật khẩu đăng nhập
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#374151' }}>
                    Mật khẩu quản trị <span style={{ color: '#dc2626' }}>*</span>
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
                      {showPassword ? <EyeOffIcon size={17} /> : <EyeIcon size={17} />}
                    </button>
                  </div>
                  {passwordError && (
                    <div style={{ fontSize: '11.5px', color: '#dc2626', marginTop: '4px', lineHeight: 1.3 }}>
                      {passwordError}
                    </div>
                  )}
                </div>

                <div>
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
                      {showConfirmPassword ? <EyeOffIcon size={17} /> : <EyeIcon size={17} />}
                    </button>
                  </div>
                  {confirmPasswordError && (
                    <div style={{ fontSize: '11.5px', color: '#dc2626', marginTop: '4px', lineHeight: 1.3 }}>
                      {confirmPasswordError}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 4: PRIVACY & LEGAL COMPLIANCE */}
            <div style={{ marginBottom: '28px' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  fontSize: '12.5px',
                  cursor: 'pointer',
                  color: '#4b5563',
                  lineHeight: 1.55
                }}
              >
                <input
                  type="checkbox"
                  required
                  checked={consentTerms}
                  onChange={(e) => setConsentTerms(e.target.checked)}
                  style={{ accentColor: '#095744', marginTop: '2px', cursor: 'pointer' }}
                />
                <span>
                  Tôi cam kết là đại diện tuyển dụng hợp pháp của doanh nghiệp, cam kết tuân thủ{' '}
                  <strong>Điều khoản dịch vụ</strong> và <strong>Chính sách bảo vệ dữ liệu cá nhân</strong>{' '}
                  theo chuẩn <strong>Nghị định 13/2023/NĐ-CP</strong> và Luật Lao động Việt Nam. <span style={{ color: '#dc2626' }}>*</span>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                height: '48px',
                backgroundColor: '#095744',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '14.5px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 2px 6px rgba(9, 87, 68, 0.2)',
                transition: 'all 0.15s ease'
              }}
            >
              <span>{isLoading ? 'ĐANG KHỞI TẠO TÀI KHOẢN DOANH NGHIỆP...' : 'ĐĂNG KÝ TÀI KHOẢN TUYỂN DỤNG'}</span>
              <ArrowRightIcon size={17} />
            </button>
          </form>

          {/* Navigation links */}
          <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '13px', color: '#6b7280' }}>
            Doanh nghiệp đã có tài khoản?{' '}
            <Link to="/login" style={{ fontWeight: '700', color: '#095744', textDecoration: 'none' }}>
              Đăng nhập ngay
            </Link>
          </div>

          <div style={{ marginTop: '10px', textAlign: 'center', fontSize: '12.5px', color: '#9ca3af' }}>
            Bạn là ứng viên đang tìm việc làm?{' '}
            <Link to="/register" style={{ fontWeight: '600', color: '#095744', textDecoration: 'none' }}>
              Đăng ký tài khoản Ứng viên tại đây
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ padding: '16px 24px', textAlign: 'center', fontSize: '12px', color: '#9ca3af', borderTop: '1px solid #e5e7eb' }}>
        <span>Hệ thống tuyển dụng Cloud-Native vận hành bởi AWS Bedrock. Bản quyền © 2026 CloudJob.</span>
      </footer>
    </div>
  );
};

export default RecruiterRegister;

