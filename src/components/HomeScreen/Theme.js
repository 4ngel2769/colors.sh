import React, { createContext, useContext, useEffect, useState } from 'react';

const themes = {
  light: {
    '--color-success-emphasis': '#1f883d',
    '--color-btn-primary-bg': '#1f883d',
    '--color-btn-primary-hover-bg': '#2da44e',
    '--color-fg-default': '#1f2328',
    '--color-fg-muted': '#383c41ff',
    '--color-bg': '#fff',
    '--color-bg-container': '#e3e3e3ff',
    '--color-shadow': 'rgba(183,183,183,0.4)',
  },
  dark: {
    '--color-fg-default': '#e6edf3',
    '--color-fg-muted': '#a4aebbff',
    '--color-accent-fg': '#2f81f7',
    '--color-severe-subtle': 'rgba(219, 109, 40, 0.1)',
    '--color-danger-subtle': 'rgba(248, 81, 73, 0.1)',
    '--color-done-subtle': 'rgba(163, 113, 247, 0.1)',
    '--color-sponsors-subtle': 'rgba(219, 97, 162, 0.1)',
    '--color-bg': '#23272e',
    '--color-bg-secondary': '#1b1f23',
    '--color-bg-tertiary': '#161a1d',
    '--color-bg-container': '#1b1d21ff',
    '--color-bar-blue': '#34435a',
    '--color-bar-blue2': '#2a3441',
    '--color-bar-blue3': '#232b36',
    '--color-bar-black': '#141718ff',
    '--color-highlight': '#bada55',
    '--color-pink': '#ff2a6d',
    '--color-circle-border': '#3a4047',
    '--color-shadow': 'rgba(24, 24, 25, 0.63)',
  },
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const root = document.documentElement;
    const vars = themes[theme];
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
    root.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
