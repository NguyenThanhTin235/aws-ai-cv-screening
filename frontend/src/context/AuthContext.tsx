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
      } catch {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
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

    const role = detectRoleFromEmail(email);
    const mockProfile: UserProfile = {
      ...DEMO_USERS[role],
      email,
      fullName: email.split('@')[0].replace('.', ' ').toUpperCase()
    };

    const mockToken = `mock-jwt-token-${role}-${Date.now()}`;
    setUser(mockProfile);
    setToken(mockToken);
    api.setToken(mockToken);

    localStorage.setItem('auth_token', mockToken);
    localStorage.setItem('auth_user', JSON.stringify(mockProfile));
    setIsLoading(false);

    return { success: true, role };
  };

  const register = async (data: RegisterData): Promise<{ success: boolean; email: string }> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 500));

    // Stash pending user for OTP verification
    const pendingProfile: UserProfile = {
      id: `usr_${Date.now()}`,
      email: data.email,
      fullName: data.fullName,
      role: data.role,
      companyName: data.companyName,
      phone: data.phone,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem('pending_registration', JSON.stringify(pendingProfile));
    setIsLoading(false);
    return { success: true, email: data.email };
  };

  const verifyOtp = async (email: string, _otp: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    const pendingStr = localStorage.getItem('pending_registration');
    let profile: UserProfile = DEMO_USERS.candidate;

    if (pendingStr) {
      profile = JSON.parse(pendingStr);
      localStorage.removeItem('pending_registration');
    } else {
      profile = {
        ...DEMO_USERS.candidate,
        email
      };
    }

    const mockToken = `mock-jwt-token-${profile.role}-${Date.now()}`;
    setUser(profile);
    setToken(mockToken);
    api.setToken(mockToken);

    localStorage.setItem('auth_token', mockToken);
    localStorage.setItem('auth_user', JSON.stringify(profile));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    api.setToken(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
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
