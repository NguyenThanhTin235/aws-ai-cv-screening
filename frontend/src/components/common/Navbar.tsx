import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { HealthStatus, UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const { user, role, isAuthenticated, logout, switchRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [health, setHealth] = useState<HealthStatus>({ status: 'CHECKING' });

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
        backgroundColor: 'var(--color-surface-container-lowest)',
        borderBottom: '1px solid var(--color-outline-variant)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        {/* Brand Group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-primary-container)',
                color: 'var(--color-on-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '18px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              CV
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    fontSize: '17px',
                    fontWeight: '700',
                    color: 'var(--color-primary)',
                    letterSpacing: '-0.02em'
                  }}
                >
                  AI CV Screening
                </span>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: '700',
                    backgroundColor: 'var(--color-primary-fixed)',
                    color: 'var(--color-on-primary-fixed)',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  v12.0
                </span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--color-outline)' }}>
                Pure Serverless • Bedrock Claude Haiku
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '16px' }}>
            <Link
              to="/"
              style={{
                fontSize: '14px',
                fontWeight: location.pathname === '/' ? '600' : '500',
                color: location.pathname === '/' ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: location.pathname === '/' ? 'var(--color-surface-container-low)' : 'transparent',
                textDecoration: 'none'
              }}
            >
              Việc làm IT
            </Link>

            {isAuthenticated && role === 'candidate' && (
              <Link
                to="/candidate"
                style={{
                  fontSize: '14px',
                  fontWeight: location.pathname.startsWith('/candidate') ? '600' : '500',
                  color: location.pathname.startsWith('/candidate') ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: location.pathname.startsWith('/candidate') ? 'var(--color-surface-container-low)' : 'transparent',
                  textDecoration: 'none'
                }}
              >
                Hồ sơ ứng tuyển
              </Link>
            )}

            {isAuthenticated && role === 'recruiter' && (
              <Link
                to="/recruiter"
                style={{
                  fontSize: '14px',
                  fontWeight: location.pathname.startsWith('/recruiter') ? '600' : '500',
                  color: location.pathname.startsWith('/recruiter') ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: location.pathname.startsWith('/recruiter') ? 'var(--color-surface-container-low)' : 'transparent',
                  textDecoration: 'none'
                }}
              >
                Dashboard Tuyển dụng
              </Link>
            )}

            {isAuthenticated && role === 'admin' && (
              <Link
                to="/admin"
                style={{
                  fontSize: '14px',
                  fontWeight: location.pathname.startsWith('/admin') ? '600' : '500',
                  color: location.pathname.startsWith('/admin') ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: location.pathname.startsWith('/admin') ? 'var(--color-surface-container-low)' : 'transparent',
                  textDecoration: 'none'
                }}
              >
                Giám sát Vận hành
              </Link>
            )}
          </nav>
        </div>

        {/* Right Action Group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Health Check Badge */}
          <div
            title={`Backend status: ${health.status} (${health.latencyMs ?? 0}ms)`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              backgroundColor: health.status === 'UP' ? '#e6f4ea' : '#fce8e6',
              color: health.status === 'UP' ? '#137333' : '#c5221f',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              border: `1px solid ${health.status === 'UP' ? '#ceead6' : '#fad2cf'}`
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: health.status === 'UP' ? '#137333' : '#c5221f'
              }}
            />
            <span style={{ fontWeight: '600' }}>API {health.status}</span>
            {health.latencyMs !== undefined && (
              <span style={{ opacity: 0.8 }}>({health.latencyMs}ms)</span>
            )}
          </div>

          {/* Role Switcher Pills (Review & Developer Mode) */}
          <div
            style={{
              display: 'flex',
              backgroundColor: 'var(--color-surface-container)',
              borderRadius: 'var(--radius-full)',
              padding: '2px'
            }}
          >
            {(['candidate', 'recruiter', 'admin'] as const).map((r) => {
              const active = role === r;
              return (
                <button
                  key={r}
                  onClick={() => switchRole(r)}
                  title={`Chuyển sang vai trò ${roleLabels[r]}`}
                  style={{
                    border: 'none',
                    background: active ? 'var(--color-primary-container)' : 'transparent',
                    color: active ? 'var(--color-on-primary)' : 'var(--color-on-surface-variant)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '12px',
                    fontWeight: active ? '600' : '400',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {roleLabels[r]}
                </button>
              );
            })}
          </div>

          {/* User Profile or Login CTA */}
          {isAuthenticated && user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-secondary-container)',
                  color: 'var(--color-on-secondary-container)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: '700'
                }}
              >
                {user.fullName.charAt(0)}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-on-surface)' }}>
                  {user.fullName}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>
                  {user.companyName || user.email}
                </span>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  border: '1px solid var(--color-outline-variant)',
                  backgroundColor: 'transparent',
                  color: 'var(--color-on-surface-variant)',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px',
                  cursor: 'pointer',
                  marginLeft: '4px'
                }}
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link
                to="/login"
                style={{
                  padding: '6px 14px',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'var(--color-primary)',
                  border: '1px solid var(--color-outline-variant)',
                  borderRadius: 'var(--radius-sm)',
                  textDecoration: 'none'
                }}
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                style={{
                  padding: '6px 14px',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'var(--color-on-primary)',
                  backgroundColor: 'var(--color-primary-container)',
                  borderRadius: 'var(--radius-sm)',
                  textDecoration: 'none'
                }}
              >
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
