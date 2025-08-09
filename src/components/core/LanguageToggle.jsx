import { useState, useEffect } from 'react';

export default function LanguageToggle() {
  const [lang, setLang] = useState('cs');
  useEffect(() => {
    try {
      const currentUrl = new URL(window.location.href);
      const urlLang = currentUrl.searchParams.get('lang');
      const stored = localStorage.getItem('lang');
      const next = urlLang || stored || 'cs';
      setLang(next);
      document.documentElement.lang = next;
    } catch {
      setLang('cs');
      document.documentElement.lang = 'cs';
    }
  }, []);
  const switchLang = () => {
    const next = lang === 'en' ? 'cs' : 'en';
    setLang(next);
    localStorage.setItem('lang', next);
    // Update URL param so Astro can render correct language on load
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
