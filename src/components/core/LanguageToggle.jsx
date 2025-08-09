import { useState, useEffect } from 'react';

export default function LanguageToggle() {
  const [lang, setLang] = useState('cs');

  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const urlLang = url.searchParams.get('lang');
      const stored = localStorage.getItem('lang');
      const initial = (urlLang || stored || 'cs').toLowerCase();
      setLang(initial);
      document.documentElement.lang = initial;
    } catch {
      const stored = localStorage.getItem('lang') || 'cs';
      setLang(stored);
      document.documentElement.lang = stored;
    }
  }, []);

  const switchLang = () => {
    const next = lang === 'en' ? 'cs' : 'en';
    setLang(next);
    localStorage.setItem('lang', next);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', next);
      document.documentElement.lang = next;
      window.location.href = url.toString();
    } catch {
      location.search = `?lang=${next}`;
    }
  };

  return (
    <button className="btn btn--outline" onClick={switchLang} data-testid="language-toggle" data-cy="language-toggle">
      {lang === 'en' ? 'Čeština' : 'English'}
    </button>
  );
}
