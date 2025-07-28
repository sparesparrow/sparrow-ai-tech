/** @jsx React.createElement */
import React from 'react';
import { useI18n } from '../i18n';

const Header = () => {
  const { t, language, setLanguage } = useI18n();
  return (
    <nav className="header-nav" data-cy="header-nav">
      <ul>
        <li>
          <a href="#hero" data-cy="nav-hero">
            {t('header.nav_hero')}
          </a>
        </li>
        <li>
          <a href="#services" data-cy="nav-services">
            {t('header.nav_services')}
          </a>
        </li>
        <li>
          <a href="#articles" data-cy="nav-articles">
            {t('header.nav_articles')}
          </a>
        </li>
        <li>
          <a href="#about" data-cy="nav-about">
            {t('header.nav_about')}
          </a>
        </li>
        <li>
          <a href="#contact" data-cy="nav-contact">
            {t('header.nav_contact')}
          </a>
        </li>
        <li>
          <a href={`${import.meta.env.BASE_URL}en/mermaid-editor`} style={{ marginLeft: 16 }}>
            Mermaid Editor
          </a>
        </li>
      </ul>
      <div className="lang-switcher" data-cy="lang-switcher">
        <button onClick={() => setLanguage('en')} disabled={language === 'en'}>
          EN
        </button>
        <button onClick={() => setLanguage('cs')} disabled={language === 'cs'}>
          CS
        </button>
      </div>
    </nav>
  );
};

export default Header;
