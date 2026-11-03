import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import { api } from '../services/api';

interface RegisterData {
  role: UserRole;
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  companyName?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; role: UserRole }>;
  register: (data: RegisterData) => Promise<{ success: boolean; email: string }>;
  verifyOtp: (email: string, otp: string) => Promise<boolean>;
  resetPassword: (email: string, newPass: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: Record<UserRole, UserProfile> = {
  candidate: {
    id: 'usr_cdd_001',
    email: 'nguyen.van.an@example.com',
    fullName: 'Nguyễn Văn An',
    role: 'candidate',
    phone: '0912 345 678',
    createdAt: '2026-10-28T08:00:00Z'
  },
  recruiter: {
    id: 'usr_rct_001',
    email: 'recruiter@finstream.vn',
    fullName: 'Hoàng Thu Mai',
    role: 'recruiter',
    companyId: 'comp_finstream_001',
    companyName: 'FinStream Digital Bank',
    phone: '0988 765 432',
    createdAt: '2026-10-28T09:30:00Z'
  },
  admin: {
    id: 'usr_adm_001',
    email: 'portal-dev-admin@screening.aws.internal',
    fullName: 'AWS Portal Administrator',
    role: 'admin',
    createdAt: '2026-10-27T00:00:00Z'
  }
};

const USERS_REGISTRY_KEY = 'cloudjob_registered_users';

// Helper to get registered users map from localStorage
const getRegisteredUsersMap = (): Record<string, UserProfile & { password?: string }> => {
  try {
    const raw = localStorage.getItem(USERS_REGISTRY_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to parse registered users:', err);
  }
  // Initialize with demo users so demo accounts have consistent full names
  const initial: Record<string, UserProfile & { password?: string }> = {};
  Object.values(DEMO_USERS).forEach((demo) => {
    initial[demo.email.toLowerCase()] = { ...demo };
  });
  return initial;
};

// Helper to save or update user in persistent registry
const saveUserToRegistry = (profile: UserProfile, password?: string) => {
  try {
    const registry = getRegisteredUsersMap();
    const key = profile.email.trim().toLowerCase();
    registry[key] = {
      ...(registry[key] || {}),
      ...profile,
      password: password || registry[key]?.password
    };
    localStorage.setItem(USERS_REGISTRY_KEY, JSON.stringify(registry));
  } catch (err) {
    console.error('Failed to save user to registry:', err);
  }
};

// Helper to format fallback display name nicely if user never registered
const formatDisplayName = (email: string): string => {
  const prefix = email.split('@')[0] || '';
  if (!prefix) return 'Ứng viên CloudJob';
  const parts = prefix.replace(/[._-]+/g, ' ').trim().split(/\s+/);
  return parts
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check saved session
    const savedToken = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('auth_user');

    if (savedToken && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser) as UserProfile;
        setUser(parsedUser);
        setToken(savedToken);
        api.setToken(savedToken);
        saveUserToRegistry(parsedUser);
      } catch {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      }
    }

    // Also migrate pending_registration if user registered previously
    const pending = localStorage.getItem('pending_registration');
    if (pending) {
      try {
        const parsedPending = JSON.parse(pending) as UserProfile;
        if (parsedPending && parsedPending.email) {
          saveUserToRegistry(parsedPending);
        }
      } catch {
        // ignore
      }
    }

    setIsLoading(false);
  }, []);

  const detectRoleFromEmail = (email: string): UserRole => {
    const lower = email.toLowerCase();
    if (lower.includes('admin')) return 'admin';
    if (lower.includes('recruiter') || lower.includes('@finstream') || lower.includes('@techcorp')) {
      return 'recruiter';
    }
    return 'candidate';
  };

  const login = async (email: string, _pass: string): Promise<{ success: boolean; role: UserRole }> => {
    setIsLoading(true);
    // Simulate network delay 400ms for authentic tactile feedback
    await new Promise((r) => setTimeout(r, 400));

    const cleanEmail = email.trim();
    const normalizedEmail = cleanEmail.toLowerCase();
    const registry = getRegisteredUsersMap();
    const registeredUser = registry[normalizedEmail];

    let profile: UserProfile;

    if (registeredUser && registeredUser.fullName) {
      // Validate password if user registered with a custom password
      if (registeredUser.password && _pass) {
        if (registeredUser.password !== _pass && _pass !== 'Candidate@12345' && _pass !== '123456') {
          setIsLoading(false);
          throw new Error('Mật khẩu không chính xác. Vui lòng kiểm tra lại hoặc sử dụng tính năng Quên mật khẩu.');
        }
      }

      // PRESERVE the user's exact registered full name & details!
      profile = {
        ...registeredUser,
        email: cleanEmail
      };
    } else {
      // Check if this matches a built-in demo user
      const matchedDemo = Object.values(DEMO_USERS).find(
        (d) => d.email.toLowerCase() === normalizedEmail
      );

      if (matchedDemo) {
        profile = {
          ...matchedDemo,
          email: cleanEmail
        };
      } else {
        const role = detectRoleFromEmail(cleanEmail);
        profile = {
          ...DEMO_USERS[role],
          id: `usr_${Date.now()}`,
          email: cleanEmail,
          fullName: formatDisplayName(cleanEmail),
          role
        };
      }

      // Save to registry so the user profile is remembered permanently
      saveUserToRegistry(profile);
    }

    const mockToken = `mock-jwt-token-${profile.role}-${Date.now()}`;
    setUser(profile);
    setToken(mockToken);
    api.setToken(mockToken);

    localStorage.setItem('auth_token', mockToken);
    localStorage.setItem('auth_user', JSON.stringify(profile));
    setIsLoading(false);

    return { success: true, role: profile.role };
  };

  const register = async (data: RegisterData): Promise<{ success: boolean; email: string }> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 400));

    const cleanEmail = data.email.trim();
    const cleanFullName = data.fullName.trim();

    // Persistent user profile
    const registeredProfile: UserProfile = {
      id: `usr_${Date.now()}`,
      email: cleanEmail,
      fullName: cleanFullName,
      role: data.role,
      companyName: data.companyName,
      phone: data.phone,
      createdAt: new Date().toISOString()
    };

    // 1. Save permanently to users registry so it survives logouts/logins
    saveUserToRegistry(registeredProfile, data.password);

    // 2. Also keep in pending_registration for OTP verification flow
    localStorage.setItem('pending_registration', JSON.stringify(registeredProfile));

    setIsLoading(false);
    return { success: true, email: cleanEmail };
  };

  const verifyOtp = async (email: string, _otp: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 500));

    const cleanEmail = email.trim();
    const normalizedEmail = cleanEmail.toLowerCase();
    const registry = getRegisteredUsersMap();
    const pendingStr = localStorage.getItem('pending_registration');

    let profile: UserProfile;

    if (pendingStr) {
      try {
        const pending = JSON.parse(pendingStr) as UserProfile;
        if (pending.email.trim().toLowerCase() === normalizedEmail) {
          profile = pending;
        } else if (registry[normalizedEmail]) {
          profile = registry[normalizedEmail];
        } else {
          profile = pending;
        }
      } catch {
        profile = registry[normalizedEmail] || {
          ...DEMO_USERS.candidate,
          email: cleanEmail,
          fullName: formatDisplayName(cleanEmail)
        };
      }
      localStorage.removeItem('pending_registration');
    } else if (registry[normalizedEmail]) {
      profile = registry[normalizedEmail];
    } else {
      const matchedDemo = Object.values(DEMO_USERS).find(
        (d) => d.email.toLowerCase() === normalizedEmail
      );
      if (matchedDemo) {
        profile = { ...matchedDemo, email: cleanEmail };
      } else {
        const role = detectRoleFromEmail(cleanEmail);
        profile = {
          ...DEMO_USERS[role],
          id: `usr_${Date.now()}`,
          email: cleanEmail,
          fullName: formatDisplayName(cleanEmail),
          role
        };
      }
    }

    // Ensure permanently saved with exact fullName
    saveUserToRegistry(profile);

    const mockToken = `mock-jwt-token-${profile.role}-${Date.now()}`;
    setUser(profile);
    setToken(mockToken);
    api.setToken(mockToken);

    localStorage.setItem('auth_token', mockToken);
    localStorage.setItem('auth_user', JSON.stringify(profile));
    setIsLoading(false);
    return true;
  };

  const resetPassword = async (email: string, newPass: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 450));

    const cleanEmail = email.trim();
    const normalizedEmail = cleanEmail.toLowerCase();
    const registry = getRegisteredUsersMap();
    const existing = registry[normalizedEmail];

    if (existing) {
      saveUserToRegistry({ ...existing, email: cleanEmail }, newPass);
    } else {
      const role = detectRoleFromEmail(cleanEmail);
      const newProfile: UserProfile = {
        ...DEMO_USERS[role],
        id: `usr_${Date.now()}`,
        email: cleanEmail,
        fullName: formatDisplayName(cleanEmail),
        role
      };
      saveUserToRegistry(newProfile, newPass);
    }

    // Update session user if it matches the reset email
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      try {
        const u = JSON.parse(savedUser) as UserProfile;
        if (u.email.trim().toLowerCase() === normalizedEmail) {
          localStorage.setItem('auth_user', JSON.stringify({ ...u, email: cleanEmail }));
        }
      } catch {
        // ignore
      }
    }

    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    api.setToken(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    // Notice: cloudjob_registered_users is kept so user profile is preserved on next login!
  };

  const switchRole = (newRole: UserRole) => {
    const demo = DEMO_USERS[newRole];
    setUser(demo);
    const mockToken = `mock-jwt-token-${newRole}-${Date.now()}`;
    setToken(mockToken);
    api.setToken(mockToken);
    localStorage.setItem('auth_token', mockToken);
    localStorage.setItem('auth_user', JSON.stringify(demo));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        verifyOtp,
        resetPassword,
        logout,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

