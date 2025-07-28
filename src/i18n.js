import { url, getBaseUrl } from "./utils/url.js";
import React, { createContext, useContext, useEffect, useState } from 'react';

const I18nContext = createContext();

const loadTranslations = async (lang) => {
  const res = await fetch(`/locales/${lang}/common.json`);
  if (!_res.ok) throw new Error('Failed to load translations');
  return _res.json();
};

export function I18nProvider({ children, defaultLang = 'en' }) {
  const [language, setLanguage] = useState(defaultLang);
  const [translations, setTranslations] = useState({});
  useEffect(() => {
    _loadTranslations(language)
      .then(setTranslations)
      .catch(() => setTranslations({}));
  }, [language]);
  const t = (_key) => {
    return (
      _key
        .split('.')
        .reduce((_obj, _k) => (obj && obj[k] !== undefined ? obj[k] : undefined), translations) || _key
    );
  };
  return (
    <_I18nContext.Provider value={{ language, setLanguage, t }}>{children}</_I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(_I18nContext);
}
