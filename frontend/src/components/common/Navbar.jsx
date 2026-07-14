import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, Menu, X, Sun, Moon, Bell, User, LogOut,
  Home, Bot, Map, Users, Car, Train, Leaf,
  HandHeart, AlertTriangle, LayoutDashboard, Settings,
  Phone, ChevronRight, Shield, Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const NAV_ITEMS = [
  { path: '/',              label: 'Home',            icon: Home,          roles: ['all'] },
  { path: '/dashboard',    label: 'My Dashboard',    icon: LayoutDashboard, roles: ['all'] },
  { path: '/ai-assistant', label: 'AI Copilot',      icon: Bot,           roles: ['all'] },
  { path: '/navigation',   label: 'Navigation',      icon: Map,           roles: ['all'] },
  { path: '/crowd',        label: 'Crowd Intel',     icon: Users,         roles: ['admin','staff','security','all'] },
  { path: '/parking',      label: 'Smart Parking',   icon: Car,           roles: ['all'] },
  { path: '/transport',    label: 'Transport',       icon: Train,         roles: ['all'] },
  { path: '/sustainability',label: 'Sustainability',  icon: Leaf,          roles: ['admin','staff','all'] },
  { path: '/volunteers',   label: 'Volunteers',      icon: HandHeart,     roles: ['admin','staff','volunteer','all'] },
  { path: '/emergency',    label: 'Emergency',       icon: AlertTriangle, roles: ['all'] },
  { path: '/admin',        label: 'Admin Center',    icon: Shield,        roles: ['admin'] },
];

const BOTTOM_ITEMS = [
  { path: '/profile',  label: 'Profile',  icon: User },
  { path: '/settings', label: 'Settings', icon: Settings },
  { path: '/contact',  label: 'Contact',  icon: Phone },
];

function SidebarItem({ item, isActive, onClick }) {
  return (
    <Link to={item.path} onClick={onClick}
      className={`sidebar-link ${isActive ? 'active' : ''}`}
      style={{ position: 'relative' }}>
      <item.icon size={18} />
      <span>{item.label}</span>
      {isActive && (
        <motion.div
          layoutId="active-pill"
          style={{
            position: 'absolute', right: 12,
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--color-accent)'
          }}
        />
      )}
    </Link>
  );
}

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [notifications, setNotifications] = useState(3);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const visibleItems = NAV_ITEMS.filter(item =>
    item.roles.includes('all') || (user && item.roles.includes(user.role))
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'sidebar-collapsed'}`}
        style={{ background: 'var(--bg-surface)' }}>
        {/* Logo */}
        <div style={{
          padding: '1.25rem 1.25rem 1rem',
          borderBottom: '1px solid var(--bg-glass-border)'
        }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: 40, height: 40,
              background: 'linear-gradient(135deg, #0066FF, #00D4FF)',
              borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Trophy size={20} color="white" />
            </div>
            <div>
              <div style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.2 }}>
                FIFA AI
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-accent)', fontWeight: 600, letterSpacing: '0.05em' }}>
                SMART COPILOT 2026
              </div>
            </div>
          </Link>
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 0' }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <div style={{ padding: '0 1.25rem 0.5rem', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Main Menu
            </div>
            {visibleItems.map(item => (
              <SidebarItem
                key={item.path}
                item={item}
                isActive={location.pathname === item.path}
                onClick={() => setSidebarOpen(false)}
              />
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--bg-glass-border)', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
            <div style={{ padding: '0 1.25rem 0.5rem', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Account
            </div>
            {BOTTOM_ITEMS.map(item => (
              <SidebarItem
                key={item.path}
                item={item}
                isActive={location.pathname === item.path}
                onClick={() => setSidebarOpen(false)}
              />
            ))}
            {user && (
              <button onClick={handleLogout} className="sidebar-link" style={{ color: 'var(--color-danger)', width: 'calc(100% - 1.5rem)' }}>
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            )}
          </div>
        </nav>

        {/* User info at bottom */}
        {user && (
          <div style={{
            padding: '1rem 1.25rem',
            borderTop: '1px solid var(--bg-glass-border)',
            display: 'flex', alignItems: 'center', gap: '0.75rem'
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'linear-gradient(135deg, #0066FF, #00D4FF)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.1rem'
            }}>
              {user.avatar}
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user.name}
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--color-accent)', fontWeight: 600, textTransform: 'capitalize' }}>
                {user.role}
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Sidebar overlay (mobile) */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* TOP NAVBAR */}
      <div className="navbar" style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 1.5rem',
        gap: '1rem',
        position: 'sticky',
        top: 0,
        zIndex: 200,
      }}>
        <button
          onClick={() => setSidebarOpen(o => !o)}
          style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.5rem', borderRadius: 8 }}
          aria-label="Toggle menu">
          <Menu size={20} />
        </button>

        <div style={{ flex: 1 }} />

        {/* AI Status badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.85rem', background: 'rgba(0,200,83,0.1)', border: '1px solid rgba(0,200,83,0.25)', borderRadius: 999 }}>
          <span className="pulse-dot green" />
          <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#00C853' }}>AI LIVE</span>
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.5rem', borderRadius: 8 }}
          aria-label="Toggle theme">
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <button
          style={{ position: 'relative', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.5rem', borderRadius: 8 }}
          aria-label="Notifications">
          <Bell size={18} />
          {notifications > 0 && (
            <span style={{
              position: 'absolute', top: 4, right: 4,
              width: 16, height: 16, borderRadius: '50%',
              background: '#FF3D57', color: 'white',
              fontSize: '0.6rem', fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {notifications}
            </span>
          )}
        </button>

        {/* User */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
            onClick={() => navigate('/profile')}>
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'linear-gradient(135deg, #0066FF, #00D4FF)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1rem'
            }}>
              {user.avatar}
            </div>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
            Login
          </Link>
        )}
      </div>
    </>
  );
}
