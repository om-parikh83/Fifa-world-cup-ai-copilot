import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

const API_BASE = import.meta.env.VITE_API_URL || 'https://fifa-world-cup-ai-copilot.onrender.com/api/v1';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('fifa_user');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  const login = useCallback(async (email, password) => {
    try {
      const res = await api.post('/auth/login/', { email, password });
      const { access, refresh, user: userData } = res.data;

      // Store tokens and user profile
      localStorage.setItem('fifa_token', access);
      localStorage.setItem('fifa_refresh_token', refresh);
      localStorage.setItem('fifa_user', JSON.stringify(userData));
      setUser(userData);
      return { success: true, user: userData };
    } catch (err) {
      const msg = err.response?.data?.detail
        || err.response?.data?.error
        || err.response?.data?.non_field_errors?.[0]
        || 'Invalid credentials. Please check your email and password.';
      return { success: false, error: msg };
    }
  }, []);

  const register = useCallback(async (data) => {
    try {
      const res = await api.post('/auth/register/', {
        username: data.email.split('@')[0],
        email: data.email,
        password: data.password,
        first_name: data.name?.split(' ')[0] || '',
        last_name: data.name?.split(' ').slice(1).join(' ') || '',
      });
      const { access, refresh, user: userData } = res.data;
      localStorage.setItem('fifa_token', access);
      localStorage.setItem('fifa_refresh_token', refresh);
      localStorage.setItem('fifa_user', JSON.stringify(userData));
      setUser(userData);
      return { success: true, user: userData };
    } catch (err) {
      const errData = err.response?.data || {};
      const msg = errData.detail
        || errData.error
        || Object.values(errData).flat().join(' ')
        || 'Registration failed. Please try again.';
      return { success: false, error: msg };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('fifa_token');
    localStorage.removeItem('fifa_refresh_token');
    localStorage.removeItem('fifa_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
