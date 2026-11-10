/**
 * PKCE (Proof Key for Code Exchange) Utilities for OAuth 2.0 / OpenID Connect
 * Conforming to RFC 7636 & Amazon Cognito Hosted UI Specification
 */

function base64UrlEncode(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function generateRandomString(length = 64): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const randomValues = new Uint8Array(length);
  window.crypto.getRandomValues(randomValues);
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset[randomValues[i] % charset.length];
  }
  return result;
}

export async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(digest);
}

export async function buildGoogleOAuthUrl(): Promise<string> {
  const domain =
    import.meta.env.VITE_COGNITO_DOMAIN ||
    'cv-portal-dev-auth-145443242997.auth.us-east-1.amazoncognito.com';
  const clientId =
    import.meta.env.VITE_COGNITO_CLIENT_ID || '7tlfcur7qimvia9lmdjfj6t061';
  const redirectUri = `${window.location.origin}/auth/callback`;

  const verifier = generateRandomString(64);
  const challenge = await generateCodeChallenge(verifier);

  sessionStorage.setItem('cognito_pkce_verifier', verifier);
  localStorage.setItem('cognito_pkce_verifier', verifier);

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    identity_provider: 'Google',
    scope: 'email openid profile',
    code_challenge: challenge,
    code_challenge_method: 'S256'
  });

  return `https://${domain}/oauth2/authorize?${params.toString()}`;
}
