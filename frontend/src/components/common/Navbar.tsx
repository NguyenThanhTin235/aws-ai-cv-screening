import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import {
  BrainIcon,
  BellIcon,
  UploadIcon,
  UserIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  HelpCircleIcon,
  BriefcaseDotIcon,
  CvBadgeIcon,
  LogOutIcon
} from './Icons';

interface NavbarProps {
  hideAuthButtons?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ hideAuthButtons = false }) => {
  const { user, role, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage =
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/verify-otp' ||
    hideAuthButtons;
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isJobMenuOpen, setIsJobMenuOpen] = useState(true);
  const [isCvMenuOpen, setIsCvMenuOpen] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);

  const numericId = React.useMemo(() => {
    if (!user) return '10729635';
    let hash = 0;
    const str = user.email || user.id || 'candidate';
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs((hash % 90000000) + 10000000).toString();
  }, [user]);

  // Close dropdown on route change
  useEffect(() => {
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const roleLabels: Record<UserRole, string> = {
    candidate: 'Ứng viên',
    recruiter: 'Nhà tuyển dụng',
    admin: 'Quản trị viên'
  };

  return (
    <header
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--color-surface-container-high)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 1px 8px rgba(0, 0, 0, 0.04)'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        {/* Brand Group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'var(--color-primary-container)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <BrainIcon size={20} color="#ffffff" />
            </div>
            <span
              style={{
                fontSize: '19px',
                fontWeight: '700',
                color: 'var(--color-primary)',
                letterSpacing: '-0.02em'
              }}
            >
              Cloud<span style={{ color: 'var(--color-primary-container)', fontWeight: '600' }}>Job</span>
            </span>
          </Link>
        </div>

        {/* Center Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '28px',
            height: '64px'
          }}
        >
          <Link
            to="/"
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
              fontWeight: location.pathname === '/' ? '700' : '500',
              color: location.pathname === '/' ? 'var(--color-primary-container)' : 'var(--color-on-surface-variant)',
              borderBottom: location.pathname === '/' ? '2px solid var(--color-primary-container)' : '2px solid transparent',
              textDecoration: 'none',
              transition: 'all 0.15s ease'
            }}
          >
            Việc làm
          </Link>

          <Link
            to="/tuyen-dung"
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
              fontWeight: location.pathname === '/tuyen-dung' ? '700' : '500',
              color: location.pathname === '/tuyen-dung' ? 'var(--color-primary-container)' : 'var(--color-on-surface-variant)',
              borderBottom: location.pathname === '/tuyen-dung' ? '2px solid var(--color-primary-container)' : '2px solid transparent',
              textDecoration: 'none',
              transition: 'all 0.15s ease'
            }}
          >
            Tuyển dụng
          </Link>

          <a
            href="#cam-nang"
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--color-on-surface-variant)',
              borderBottom: '2px solid transparent',
              textDecoration: 'none',
              transition: 'color 0.15s ease'
            }}
          >
            Cẩm nang
          </a>

          <a
            href="#blog"
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--color-on-surface-variant)',
              borderBottom: '2px solid transparent',
              textDecoration: 'none',
              transition: 'color 0.15s ease'
            }}
          >
            Blog
          </a>

          <a
            href="#lien-he"
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--color-on-surface-variant)',
              borderBottom: '2px solid transparent',
              textDecoration: 'none',
              transition: 'color 0.15s ease'
            }}
          >
            Liên hệ
          </a>
        </nav>

        {/* Right Action Icons & User Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          {isAuthPage ? (
            /* Auth Pages (Login / Register): Hide [Đăng tin ngay], [Đăng ký], [Đăng nhập] - Show clean Support link */
            <a
              href="mailto:support@cloudjob.vn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                fontWeight: '500',
                color: 'var(--color-on-surface-variant)',
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-surface-container-low)',
                border: '1px solid var(--color-outline-variant)',
                transition: 'all 0.15s ease'
              }}
              title="Trung tâm hỗ trợ CloudJob"
            >
              <HelpCircleIcon size={16} color="var(--color-on-surface-variant)" />
              <span>Hỗ trợ</span>
            </a>
          ) : isAuthenticated && user ? (
            /* Logged-in state */
            <>
              {/* Notifications Button */}
              <button
                type="button"
                title="Thông báo hệ thống"
                style={{
                  position: 'relative',
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: 'var(--color-on-surface-variant)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease'
                }}
              >
                <BellIcon size={18} />
                <span
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-error)'
                  }}
                />
              </button>

              {/* Role-specific Action CTA Button */}
              {role === 'recruiter' ? (
                <Link
                  to="/recruiter"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-primary-container)',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  <UploadIcon size={15} color="#ffffff" />
                  <span>Đăng tin tuyển dụng</span>
                </Link>
              ) : role === 'admin' ? (
                <Link
                  to="/admin"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-primary-container)',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  <span>Bảng quản trị</span>
                </Link>
              ) : (
                <Link
                  to="/candidate"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-primary-container)',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  <UploadIcon size={16} color="#ffffff" />
                  <span>Tải CV lên (Kiểm tra AI)</span>
                </Link>
              )}

              {/* Vertical divider */}
              <div
                style={{
                  height: '24px',
                  width: '1px',
                  backgroundColor: 'var(--color-surface-container-high)',
                  margin: '0 4px'
                }}
              />

              {/* User Account / Role Switcher Menu */}
              <div ref={menuRef} style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '4px 8px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isUserMenuOpen ? 'var(--color-surface-container)' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease'
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-primary-container)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '13px',
                      fontWeight: '700'
                    }}
                  >
                    {user.fullName ? user.fullName.charAt(0).toUpperCase() : <UserIcon size={16} color="#ffffff" />}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1.2 }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-on-surface)' }}>
                      {user.fullName}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>
                      {role ? roleLabels[role] : 'Ứng viên'}
                    </span>
                  </div>

                  <ChevronDownIcon size={14} color="var(--color-on-surface-variant)" />
                </button>

                {/* User Dropdown Menu (Chuẩn theo mẫu) */}
                {isUserMenuOpen && (
                  <div className="user-dropdown-menu">
                    {/* 1. Header Profile Card */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 18px' }}>
                      <div
                        style={{
                          width: '52px',
                          height: '52px',
                          borderRadius: '50%',
                          backgroundColor: '#cbd5e1',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          overflow: 'hidden'
                        }}
                      >
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
                          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                        </svg>
                      </div>

                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', lineHeight: 1.25 }}>
                          {user.fullName}
                        </div>
                        <div style={{ fontSize: '13px', fontWeight: '500', color: '#334155', marginTop: '3px' }}>
                          Tài khoản đã xác thực
                        </div>
                        <div
                          style={{
                            fontSize: '11.5px',
                            color: '#64748b',
                            marginTop: '3px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                          title={`ID ${numericId} | ${user.email}`}
                        >
                          ID {numericId} <span style={{ color: '#cbd5e1', margin: '0 4px' }}>|</span> {user.email}
                        </div>
                      </div>
                    </div>

                    <div style={{ height: '1px', backgroundColor: '#f1f5f9' }} />

                    {/* 2. Quản lý tìm việc Section */}
                    <div>
                      <button
                        type="button"
                        onClick={() => setIsJobMenuOpen(!isJobMenuOpen)}
                        className="user-section-header"
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <BriefcaseDotIcon size={20} />
                          <span style={{ fontSize: '14.5px', fontWeight: '700', color: '#1e293b' }}>
                            Quản lý tìm việc
                          </span>
                        </div>
                        {isJobMenuOpen ? (
                          <ChevronUpIcon size={18} color="#475569" />
                        ) : (
                          <ChevronDownIcon size={18} color="#475569" />
                        )}
                      </button>

                      {isJobMenuOpen && (
                        <div style={{ paddingBottom: '6px' }}>
                          <Link to="/candidate" onClick={() => setIsUserMenuOpen(false)} className="user-menu-item">
                            Việc làm đã lưu
                          </Link>
                          <Link to="/candidate" onClick={() => setIsUserMenuOpen(false)} className="user-menu-item">
                            Việc làm đã ứng tuyển
                          </Link>
                          <Link to="/" onClick={() => setIsUserMenuOpen(false)} className="user-menu-item">
                            Việc làm phù hợp với bạn
                          </Link>
                          <Link to="/candidate" onClick={() => setIsUserMenuOpen(false)} className="user-menu-item">
                            Cài đặt gợi ý việc làm
                          </Link>
                        </div>
                      )}
                    </div>

                    <div style={{ height: '1px', backgroundColor: '#f1f5f9' }} />

                    {/* 3. Quản lý CV & Cover letter Section */}
                    <div>
                      <button
                        type="button"
                        onClick={() => setIsCvMenuOpen(!isCvMenuOpen)}
                        className="user-section-header"
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <CvBadgeIcon size={20} />
                          <span style={{ fontSize: '14.5px', fontWeight: '700', color: '#1e293b' }}>
                            Quản lý CV &amp; Cover letter
                          </span>
                        </div>
                        {isCvMenuOpen ? (
                          <ChevronUpIcon size={18} color="#475569" />
                        ) : (
                          <ChevronDownIcon size={18} color="#475569" />
                        )}
                      </button>

                      {isCvMenuOpen && (
                        <div style={{ paddingBottom: '6px' }}>
                          <Link to="/candidate" onClick={() => setIsUserMenuOpen(false)} className="user-menu-item">
                            CV của tôi
                          </Link>
                          <Link to="/candidate" onClick={() => setIsUserMenuOpen(false)} className="user-menu-item">
                            Cover Letter của tôi
                          </Link>
                          <Link to="/candidate" onClick={() => setIsUserMenuOpen(false)} className="user-menu-item">
                            Nhà tuyển dụng muốn kết nối với bạn
                          </Link>
                          <Link to="/candidate" onClick={() => setIsUserMenuOpen(false)} className="user-menu-item">
                            Nhà tuyển dụng xem hồ sơ
                          </Link>
                        </div>
                      )}
                    </div>

                    <div style={{ height: '1px', backgroundColor: '#f1f5f9' }} />

                    {/* 4. Bottom Toolbar: Logout Action */}
                    <div style={{ padding: '12px 16px', backgroundColor: '#fafafa' }}>
                      <button
                        type="button"
                        onClick={handleLogout}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: '6px',
                          border: '1px solid #fee2e2',
                          backgroundColor: '#ffffff',
                          color: '#dc2626',
                          fontSize: '13px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fef2f2')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
                      >
                        <LogOutIcon size={15} color="#dc2626" />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Guest / Unauthenticated State */
            <>
              {/* Button Đăng tin ngay (được đưa lên đầu) */}
              <Link
                to="/tuyen-dung"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 16px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-inverse-surface)',
                  color: 'var(--color-inverse-on-surface)',
                  fontSize: '13px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'opacity 0.15s ease'
                }}
              >
                <UploadIcon size={15} color="var(--color-inverse-on-surface)" />
                <span>Đăng tin ngay</span>
              </Link>

              {/* Button Đăng nhập */}
              <Link
                to="/login"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '7px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-outline-variant)',
                  backgroundColor: '#ffffff',
                  color: 'var(--color-primary-container)',
                  fontSize: '13px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                Đăng nhập
              </Link>

              {/* Button Đăng ký */}
              <Link
                to="/register"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '7px 18px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-primary-container)',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'background-color 0.15s ease'
                }}
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
