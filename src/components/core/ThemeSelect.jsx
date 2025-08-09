import { useEffect, useState } from 'react';

const THEMES = [
  { id: 'cyberpunk', label: 'Cyberpunk' },
  { id: 'modern', label: 'Modern' },
  { id: 'minimal', label: 'Minimal' },
];

export default function ThemeSelect() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'cyberpunk';
    return localStorage.getItem('uiTheme') || 'cyberpunk';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-ui-theme', theme);
    localStorage.setItem('uiTheme', theme);
  }, [theme]);

  return (
    <select
      aria-label="Interface theme"
      className="btn btn--outline"
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      data-testid="theme-select"
      style={{ padding: '0.35rem 0.5rem' }}
    >
      {THEMES.map((t) => (
        <option key={t.id} value={t.id}>
          {t.label}
        </option>
      ))}
    </select>
  );
}
