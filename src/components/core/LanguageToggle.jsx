import { useState, useEffect } from 'react';

export default function LanguageToggle() {
  const getInitialLang = () => {
    try {
      const url = new URL(window.location.href);
      const fromUrl = url.searchParams.get('lang');
      if (fromUrl) return fromUrl;
    } catch {}
    const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('lang') : null;
    return stored || 'cs';
  };

  const [lang, setLang] = useState('cs');

  useEffect(() => {
    const initial = getInitialLang();
    setLang(initial);
    document.documentElement.lang = initial;
  }, []);

  const switchLang = () => {
    const next = lang === 'en' ? 'cs' : 'en';
    setLang(next);
    try {
      localStorage.setItem('lang', next);
    } catch {}
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', next);
      document.documentElement.lang = next;
      window.location.href = url.toString();
    } catch {
      location.reload();
    }
  };

  return (
    <button className="btn btn--outline" onClick={switchLang} data-testid="language-toggle" data-cy="language-toggle">
      {lang === 'en' ? 'Čeština' : 'English'}
    </button>
  );
}
