import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { AIProvider } from './context/AIContext';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

import Home                from './pages/Home';
import About               from './pages/About';
import Login               from './pages/Login';
import Register            from './pages/Register';
import Dashboard           from './pages/Dashboard';
import AIAssistant         from './pages/AIAssistant';
import Navigation          from './pages/Navigation';
import CrowdDashboard      from './pages/CrowdDashboard';
import ParkingDashboard    from './pages/ParkingDashboard';
import TransportDashboard  from './pages/TransportDashboard';
import SustainabilityDashboard from './pages/SustainabilityDashboard';
import VolunteerDashboard  from './pages/VolunteerDashboard';
import EmergencyCenter     from './pages/EmergencyCenter';
import AdminDashboard      from './pages/AdminDashboard';
import Profile             from './pages/Profile';
import SettingsPage        from './pages/Settings';
import Contact             from './pages/Contact';

const NO_SIDEBAR_ROUTES = ['/login', '/register'];

function ProtectedRoute({ children, requiredRole }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole && user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);
  const location = useLocation();
  const isAuthPage = NO_SIDEBAR_ROUTES.includes(location.pathname);

  return (
    <div className="app-layout" style={{ minHeight: '100vh' }}>
      <div className={`main-content ${isAuthPage ? 'no-sidebar' : ''} ${!sidebarOpen && !isAuthPage ? 'sidebar-collapsed-content' : ''}`} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Navbar renders: (1) fixed sidebar <aside>, (2) sticky top bar — both work inside main-content */}
        {!isAuthPage && <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}

        <div style={{ flex: 1 }}>
          <Routes>
            {/* Public */}
            <Route path="/"         element={<Home />} />
            <Route path="/about"    element={<About />} />
            <Route path="/login"    element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact"  element={<Contact />} />

            {/* Protected */}
            <Route path="/dashboard"     element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/ai-assistant"  element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} />
            <Route path="/navigation"    element={<ProtectedRoute><Navigation /></ProtectedRoute>} />
            <Route path="/crowd"         element={<ProtectedRoute><CrowdDashboard /></ProtectedRoute>} />
            <Route path="/parking"       element={<ProtectedRoute><ParkingDashboard /></ProtectedRoute>} />
            <Route path="/transport"     element={<ProtectedRoute><TransportDashboard /></ProtectedRoute>} />
            <Route path="/sustainability"element={<ProtectedRoute><SustainabilityDashboard /></ProtectedRoute>} />
            <Route path="/volunteers"    element={<ProtectedRoute><VolunteerDashboard /></ProtectedRoute>} />
            <Route path="/emergency"     element={<ProtectedRoute><EmergencyCenter /></ProtectedRoute>} />
            <Route path="/admin"         element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/profile"       element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/settings"      element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        {!isAuthPage && <Footer />}
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--bg-glass-border)',
            borderRadius: '12px',
            fontFamily: 'Poppins',
            fontSize: '0.875rem',
          },
          success: { iconTheme: { primary: '#00C853', secondary: 'white' } },
          error: { iconTheme: { primary: '#FF3D57', secondary: 'white' } },
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AIProvider>
            <AppLayout />
          </AIProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
