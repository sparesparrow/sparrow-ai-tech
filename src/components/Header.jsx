import React from 'react';
import { useI18n } from '../i18n';

<<<<<<< HEAD
const Header = () => (
  <nav className="header-nav" data-cy="header-nav">
    <ul>
      <li><a href="#hero" data-cy="nav-hero">Hero</a></li>
      <li><a href="#services" data-cy="nav-services">Services</a></li>
      <li><a href="#articles" data-cy="nav-articles">Articles</a></li>
      <li><a href="#about" data-cy="nav-about">About</a></li>
      <li><a href="#contact" data-cy="nav-contact">Contact</a></li>
      <li><a href="/mermaid-editor" style={{ marginLeft: 16 }}>Mermaid Editor</a></li>
    </ul>
    <div className="lang-switcher" data-cy="lang-switcher">
      <button>EN</button>
      <button>CS</button>
    </div>
  </nav>
);
=======
const Header = () => {
  const { t, language, setLanguage } = useI18n();
  return (
    <nav className="header-nav" data-cy="header-nav">
      <ul>
        <li><a href="#projects" data-cy="nav-projects">{t('header.nav_projects')}</a></li>
        <li><a href="#skills" data-cy="nav-skills">{t('header.nav_skills')}</a></li>
        <li><a href="#about" data-cy="nav-about">{t('header.nav_about')}</a></li>
        <li><a href="#contact" data-cy="nav-contact">{t('header.nav_contact')}</a></li>
      </ul>
      <div className="lang-switcher" data-cy="lang-switcher">
        <button onClick={() => setLanguage('en')} disabled={language === 'en'}>EN</button>
        <button onClick={() => setLanguage('cs')} disabled={language === 'cs'}>CS</button>
      </div>
    </nav>
  );
};
>>>>>>> 33e29b2 (feat: Enhance localization support and improve UI components; implement PDF download functionality and voice chatbot integration)

export default Header;
