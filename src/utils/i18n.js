import { useState } from 'react';

// Basic i18n hook implementation (can be expanded later)
export const useI18n = () => {
  const [language, setLanguage] = useState('cs');

  const t = (key) => {
    // Placeholder translation function
    const translations = {
      cs: { 'header.title': 'Nadpis' },
      en: { 'header.title': 'Title' },
    };
    return translations[language]?.[key] || key;
  };

  return { t, language, setLanguage };
};
