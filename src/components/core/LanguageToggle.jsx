import { useState, useEffect } from 'react';

export default function LanguageToggle() {
  const [lang, setLang] = useState('en');
  useEffect(() => {
    const stored = localStorage.getItem('lang') || 'en';
    setLang(stored);
    document.documentElement.lang = stored;
  }, []);
  const switchLang = () => {
    const next = lang === 'en' ? 'cs' : 'en';
    setLang(next);
    localStorage.setItem('lang', next);
    location.reload(); // reload to pick proper Astro content
  };
  return (
    <button className="btn btn--outline" onClick={switchLang} data-testid="language-toggle">
      {lang === 'en' ? 'Čeština' : 'English'}
    </button>
  );
}
