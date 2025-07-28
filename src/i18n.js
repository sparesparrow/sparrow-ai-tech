import React, { createContext,useContext,useEffect,useState } from 'react';

const I18nContext = createContext();

const loadTranslations = async (lang) => {
  const res = await fetch(`/locales/${lang}/common.json`);
  if (!res.ok) throw new Error('Failed to load translations');
  return res.json();
};

export function I18nProvider({ children, defaultLang = 'en' }) {
  const [language, setLanguage] = useState(defaultLang);
  const [translations, setTranslations] = useState({});
  useEffect(() => {
    loadTranslations(language)
      .then(setTranslations)
      .catch(() => setTranslations({}));
  }, [language]);
  const t = (key) => {
    return (
      key
        .split('.')
        .reduce((obj, k) => (obj && obj[k] !== undefined ? obj[k] : undefined), translations) || key
    );
  };
  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>{children}</I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
