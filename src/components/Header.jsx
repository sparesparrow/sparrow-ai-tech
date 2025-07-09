import React from 'react';
import { useI18n } from '../i18n';

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

export default Header;
