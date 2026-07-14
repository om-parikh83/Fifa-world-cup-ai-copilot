import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

const COLOR_THEMES = {
  blue: { secondary: '#0066FF', accent: '#00D4FF' },
  purple: { secondary: '#7850ff', accent: '#a587ff' },
  green: { secondary: '#00C853', accent: '#69f0ae' },
  gold: { secondary: '#FFB300', accent: '#ffe082' }
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('fifa_theme') || 'dark');
  const [themeColor, setThemeColor] = useState(() => localStorage.getItem('fifa_theme_color') || 'blue');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('fifa_theme', theme);
  }, [theme]);

  useEffect(() => {
    const colors = COLOR_THEMES[themeColor] || COLOR_THEMES.blue;
    document.documentElement.style.setProperty('--color-secondary', colors.secondary);
    document.documentElement.style.setProperty('--color-accent', colors.accent);
    document.documentElement.style.setProperty('--text-accent', theme === 'light' ? colors.secondary : colors.accent);
    localStorage.setItem('fifa_theme_color', themeColor);
  }, [themeColor, theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark', themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
