import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { HealthStatus, UserRole } from '../../types';
import {
  BrainIcon,
  BookmarkIcon,
  BellIcon,
  UploadIcon,
  UserIcon,
  ChevronDownIcon
} from './Icons';

export const Navbar: React.FC = () => {
  const { user, role, isAuthenticated, logout, switchRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [health, setHealth] = useState<HealthStatus>({ status: 'CHECKING' });
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    api.checkHealth().then((res) => {
      if (mounted) setHealth(res);
    });
    return () => {
      mounted = false;
    };
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

  const isCurrentPath = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
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
                fontSize: '18px',
                fontWeight: '700',
                color: 'var(--color-primary)',
                letterSpacing: '-0.02em'
              }}
            >
              CloudTalent<span style={{ color: 'var(--color-primary-container)', fontWeight: '500' }}>.AI</span>
            </span>
          </Link>

          {/* Portal Role Badge */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-surface-container)',
              color: 'var(--color-on-surface-variant)',
              fontSize: '11px',
              fontWeight: '600',
              border: '1px solid var(--color-surface-container-high)'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary-container)'
              }}
            />
            {role === 'recruiter' ? 'Recruiter Portal' : role === 'admin' ? 'Admin Ops' : 'Candidate Portal'}
          </span>
        </div>

        {/* Center Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
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
              fontWeight: isCurrentPath('/') ? '700' : '500',
              color: isCurrentPath('/') ? 'var(--color-primary-container)' : 'var(--color-on-surface-variant)',
              borderBottom: isCurrentPath('/') ? '2px solid var(--color-primary-container)' : '2px solid transparent',
              textDecoration: 'none',
              transition: 'all 0.15s ease'
            }}
          >
            Việc làm
          </Link>

          <Link
            to="/candidate"
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
              fontWeight: isCurrentPath('/candidate') ? '700' : '500',
              color: isCurrentPath('/candidate') ? 'var(--color-primary-container)' : 'var(--color-on-surface-variant)',
              borderBottom: isCurrentPath('/candidate') ? '2px solid var(--color-primary-container)' : '2px solid transparent',
              textDecoration: 'none',
              transition: 'all 0.15s ease'
            }}
          >
            Hồ sơ của tôi
          </Link>

          <Link
            to="/candidate"
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--color-on-surface-variant)',
              textDecoration: 'none',
              transition: 'color 0.15s ease'
            }}
          >
            Báo cáo AI &amp; Match
          </Link>

          <a
            href="#cam-nang-cv-ai"
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--color-on-surface-variant)',
              textDecoration: 'none',
              transition: 'color 0.15s ease'
            }}
          >
            Cẩm nang CV AI
          </a>
        </nav>

        {/* Right Action Icons & User Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          {/* Bookmark Button */}
          <button
            type="button"
            title="Việc làm đã lưu"
            style={{
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
            <BookmarkIcon size={18} />
          </button>

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

          {/* Upload CV CTA Button */}
          <Link
            to="/candidate"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-primary-container)',
              color: 'var(--color-on-primary)',
              fontSize: '13px',
              fontWeight: '600',
              textDecoration: 'none',
              boxShadow: 'var(--shadow-sm)',
              transition: 'background-color 0.2s ease'
            }}
          >
            <UploadIcon size={16} color="#ffffff" />
            <span>Tải CV lên (AI Check)</span>
          </Link>

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
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 8px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'transparent',
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
                  backgroundColor: 'var(--color-primary)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <UserIcon size={16} color="#ffffff" />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1.2 }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-on-surface)' }}>
                  {user ? user.fullName : 'Tuấn Hoàng'}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>
                  {role ? roleLabels[role] : 'Ứng viên'}
                </span>
              </div>

              <ChevronDownIcon size={14} color="var(--color-on-surface-variant)" />
            </button>

            {/* User Dropdown Menu */}
            {isUserMenuOpen && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '44px',
                  width: '260px',
                  backgroundColor: 'var(--color-surface-container-lowest)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--color-surface-container-high)',
                  padding: '12px',
                  zIndex: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                <div style={{ paddingBottom: '8px', borderBottom: '1px solid var(--color-surface-container)' }}>
                  <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-on-surface)', margin: 0 }}>
                    {user ? user.fullName : 'Tuấn Hoàng'}
                  </p>
                  <p style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', margin: 0 }}>
                    {user ? user.email : 'tuan.hoang@awscloud.vn'}
                  </p>
                </div>

                {/* Role Switcher */}
                <div>
                  <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--color-on-surface-variant)', display: 'block', marginBottom: '6px' }}>
                    Chuyển đổi vai trò trải nghiệm:
                  </span>
                  <div style={{ display: 'flex', gap: '4px', backgroundColor: 'var(--color-surface-container)', padding: '2px', borderRadius: 'var(--radius-sm)' }}>
                    {(['candidate', 'recruiter', 'admin'] as const).map((r) => {
                      const active = role === r;
                      return (
                        <button
                          key={r}
                          type="button"
                          onClick={() => {
                            switchRole(r);
                            setIsUserMenuOpen(false);
                            if (r === 'candidate') navigate('/candidate');
                            else if (r === 'recruiter') navigate('/recruiter');
                            else if (r === 'admin') navigate('/admin');
                          }}
                          style={{
                            flex: 1,
                            border: 'none',
                            backgroundColor: active ? 'var(--color-primary-container)' : 'transparent',
                            color: active ? '#ffffff' : 'var(--color-on-surface)',
                            fontSize: '11px',
                            fontWeight: active ? '700' : '500',
                            padding: '4px',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          {r === 'candidate' ? 'Ứng viên' : r === 'recruiter' ? 'HR' : 'Admin'}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* API Health Status */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 8px',
                    borderRadius: '4px',
                    backgroundColor: health.status === 'UP' ? 'rgba(0, 108, 76, 0.08)' : 'rgba(186, 26, 26, 0.08)',
                    fontSize: '11px'
                  }}
                >
                  <span style={{ color: 'var(--color-on-surface)' }}>Trạng thái API Backend:</span>
                  <strong style={{ color: health.status === 'UP' ? 'var(--color-success)' : 'var(--color-error)' }}>
                    {health.status} {health.latencyMs !== undefined ? `(${health.latencyMs}ms)` : ''}
                  </strong>
                </div>

                {/* Logout / Login button */}
                {isAuthenticated ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-surface-container-high)',
                      backgroundColor: 'transparent',
                      color: 'var(--color-error)',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Đăng xuất
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsUserMenuOpen(false)}
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      padding: '8px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--color-primary-container)',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontWeight: '600',
                      textDecoration: 'none'
                    }}
                  >
                    Đăng nhập tài khoản
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
