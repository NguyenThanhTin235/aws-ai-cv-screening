import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './styles/tokens.css';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ProtectedRoute } from './components/common/ProtectedRoute';

import { JobBoard } from './pages/JobBoard';
import { JobDetail } from './pages/JobDetail';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { OtpVerification } from './pages/OtpVerification';
import { ForgotPassword } from './pages/ForgotPassword';
import { RecruiterRegister } from './pages/RecruiterRegister';
import { RecruiterLanding } from './pages/RecruiterLanding';
import { CandidateDashboard } from './pages/CandidateDashboard';
import { RecruiterDashboard } from './pages/RecruiterDashboard';
import { AdminDashboard } from './pages/AdminDashboard';

const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === '/login' ||
    location.pathname === '/forgot-password' ||
    location.pathname === '/quen-mat-khau' ||
    location.pathname === '/register-recruiter' ||
    location.pathname === '/dang-ky-tuyen-dung' ||
    location.pathname === '/dang-ky-nha-tuyen-dung';

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1 }}>{children}</div>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <LayoutWrapper>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<JobBoard />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/job/:id" element={<JobDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-recruiter" element={<RecruiterRegister />} />
            <Route path="/dang-ky-tuyen-dung" element={<RecruiterRegister />} />
            <Route path="/dang-ky-nha-tuyen-dung" element={<RecruiterRegister />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/quen-mat-khau" element={<ForgotPassword />} />
            <Route path="/tuyen-dung" element={<RecruiterLanding />} />
            <Route path="/recruiter-landing" element={<RecruiterLanding />} />
            <Route path="/verify-otp" element={<OtpVerification />} />

            {/* Role-Protected Routes */}
            <Route
              path="/candidate/*"
              element={
                <ProtectedRoute allowedRoles={['candidate']}>
                  <CandidateDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recruiter/*"
              element={
                <ProtectedRoute allowedRoles={['recruiter']}>
                  <RecruiterDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </LayoutWrapper>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
