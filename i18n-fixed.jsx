/** @jsx React.createElement */
import React from 'react';

const I18nContext = createContext();

async function loadTranslations(language) {
  try {
    // Dynamic import for translations
    const translations = await import(`../locales/${language}.json`);
    return translations.default || translations;
  } catch (error) {
    console.warn(`Failed to load translations for ${language}, falling back to English`);
    try {
      const fallback = await import('../locales/en.json');
      return fallback.default || fallback;
    } catch (fallbackError) {
      console.error('Failed to load fallback translations:', fallbackError);
      return {};
    }
  }
}

export function I18nProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    loadTranslations(language).then(setTranslations).catch(console.error);
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
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

I18nProvider.displayName = 'I18nProvider';

export default I18nProvider;
