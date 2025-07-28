import React, { useEffect, useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';

// Mock window.matchMedia for JSDOM
global.window = global.window || {};
global.window.matchMedia =
  global.window.matchMedia ||
  function () {
    return {
      matches: false,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => {},
    };
  };

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    const theme = localStorage.getItem('theme');
    if (theme) return theme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button onClick={() => setIsDark((d) => !d)} data-testid="toggle">
      Toggle
    </button>
  );
};

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('defaults to system preference if no localStorage', () => {
    window.matchMedia = jest.fn().mockReturnValue({ matches: true });
    render(<ThemeToggle />);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggles dark mode and persists', () => {
    render(<ThemeToggle />);
    const btn = document.querySelector('[data-testid="toggle"]');
    fireEvent.click(btn);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
    fireEvent.click(btn);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');
  });
});
