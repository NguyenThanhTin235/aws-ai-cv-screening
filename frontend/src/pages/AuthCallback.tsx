import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/common/Navbar';

export const AuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithFederatedTokens } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const isExchangingRef = useRef(false);

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    if (error) {
      setErrorMsg(
        errorDescription || `Lỗi xác thực từ Google / Cognito: ${error}`
      );
      return;
    }

    if (!code) {
      setErrorMsg(
        'Không tìm thấy mã xác thực (authorization code) trong URL callback.'
      );
      return;
    }

    // Guard against React StrictMode running useEffect twice concurrently
    // Authorization code is strictly single-use; exchanging twice yields 'invalid_grant'
    if (isExchangingRef.current) {
      return;
    }
    isExchangingRef.current = true;

    const verifier =
      sessionStorage.getItem('cognito_pkce_verifier') ||
      localStorage.getItem('cognito_pkce_verifier') ||
      '';

    if (!verifier) {
      setErrorMsg(
        'Không tìm thấy mã bảo mật phiên PKCE (có thể do trang bị tải lại sau khi mã đã được sử dụng). Vui lòng quay lại trang đăng nhập và chọn Đăng nhập bằng Google.'
      );
      return;
    }

    const domain =
      import.meta.env.VITE_COGNITO_DOMAIN ||
      'cv-portal-dev-auth-145443242997.auth.us-east-1.amazoncognito.com';
    const clientId =
      import.meta.env.VITE_COGNITO_CLIENT_ID || '7tlfcur7qimvia9lmdjfj6t061';
    const redirectUri = `${window.location.origin}/auth/callback`;

    const tokenUrl = `https://${domain}/oauth2/token`;
    const bodyParams = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      redirect_uri: redirectUri,
      code,
      code_verifier: verifier
    });

    fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: bodyParams.toString()
    })
      .then(async (res) => {
        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          throw new Error(
            errBody.error_description || errBody.error || `HTTP ${res.status}`
          );
        }
        return res.json();
      })
      .then((tokens) => {
        sessionStorage.removeItem('cognito_pkce_verifier');
        localStorage.removeItem('cognito_pkce_verifier');

        // Decode ID token to extract profile claims
        let email = '';
        let fullName = '';
        let sub = '';

        if (tokens.id_token) {
          try {
            const base64Url = tokens.id_token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
              atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
            );
            const claims = JSON.parse(jsonPayload);
            email = claims.email || '';
            fullName =
              claims.name ||
              claims['custom:full_name'] ||
              (email ? email.split('@')[0] : 'Google User');
            sub = claims.sub || '';
          } catch {
            // fallback
          }
        }

        loginWithFederatedTokens(
          { idToken: tokens.id_token, accessToken: tokens.access_token },
          {
            id: sub ? `usr_${sub}` : undefined,
            email,
            fullName,
            role: 'candidate'
          }
        );

        navigate('/candidate', { replace: true });
      })
      .catch((err) => {
        console.error('Failed to exchange code for tokens:', err);
        setErrorMsg(
          `Không thể hoàn tất đăng nhập Google: ${err.message || 'Lỗi kết nối'}`
        );
      });
  }, [searchParams, navigate, loginWithFederatedTokens]);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-surface, #f8fafc)'
      }}
    >
      <Navbar />
      <div
        style={{
          maxWidth: '480px',
          margin: '80px auto',
          padding: '32px 24px',
          textAlign: 'center',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
        }}
      >
        {errorMsg ? (
          <div>
            <h2
              style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#dc2626',
                marginBottom: '12px'
              }}
            >
              Đăng nhập không thành công
            </h2>
            <p
              style={{
                fontSize: '14px',
                color: '#64748b',
                marginBottom: '24px'
              }}
            >
              {errorMsg}
            </p>
            <Link
              to="/login"
              style={{
                display: 'inline-block',
                backgroundColor: 'var(--color-primary-container, #095744)',
                color: '#ffffff',
                padding: '10px 20px',
                borderRadius: '6px',
                fontWeight: '600',
                textDecoration: 'none'
              }}
            >
              Quay lại trang Đăng nhập
            </Link>
          </div>
        ) : (
          <div>
            <div
              style={{
                width: '40px',
                height: '40px',
                border: '3px solid #e2e8f0',
                borderTopColor: '#095744',
                borderRadius: '50%',
                margin: '0 auto 16px'
              }}
            />
            <h2
              style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '8px'
              }}
            >
              Đang xác thực tài khoản Google...
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b' }}>
              Vui lòng đợi trong giây lát trong khi hệ thống đồng bộ hồ sơ.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
