import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

// Mock users for demo
const MOCK_USERS = {
  'fan@fifa26.com':    { id: 1, name: 'Alex Rodriguez', role: 'fan',       avatar: '⚽', email: 'fan@fifa26.com',    password: 'fan123' },
  'admin@fifa26.com':  { id: 2, name: 'Sarah Johnson',  role: 'admin',     avatar: '👤', email: 'admin@fifa26.com',  password: 'admin123' },
  'staff@fifa26.com':  { id: 3, name: 'Mike Thompson',  role: 'staff',     avatar: '🏟️', email: 'staff@fifa26.com',  password: 'staff123' },
  'security@fifa26.com':{ id:4, name: 'James Wilson',   role: 'security',  avatar: '🛡️', email: 'security@fifa26.com',password: 'sec123' },
  'volunteer@fifa26.com':{id:5, name: 'Emma Davis',     role: 'volunteer', avatar: '🤝', email: 'volunteer@fifa26.com',password:'vol123' },
  'medical@fifa26.com':{ id: 6, name: 'Dr. Patel',      role: 'medical',   avatar: '🏥', email: 'medical@fifa26.com', password: 'med123' },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('fifa_user');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  const login = useCallback(async (email, password) => {
    const found = MOCK_USERS[email.toLowerCase()];
    if (found && found.password === password) {
      const userData = { ...found };
      delete userData.password;
      setUser(userData);
      localStorage.setItem('fifa_user', JSON.stringify(userData));
      return { success: true, user: userData };
    }
    return { success: false, error: 'Invalid credentials. Try fan@fifa26.com / fan123' };
  }, []);

  const register = useCallback(async (data) => {
    const newUser = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      role: 'fan',
      avatar: '⚽',
    };
    setUser(newUser);
    localStorage.setItem('fifa_user', JSON.stringify(newUser));
    return { success: true, user: newUser };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('fifa_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
