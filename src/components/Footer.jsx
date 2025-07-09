import React from 'react';
import { useI18n } from '../i18n';

const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="footer" data-cy="footer">
      <p data-cy="footer-copyright">{t('footer.copyright')}</p>
      <ul>
        <li><a href="#privacy" data-cy="footer-privacy">Privacy Policy</a></li>
        <li><a href="#terms" data-cy="footer-terms">Terms of Service</a></li>
      </ul>
    </footer>
  );
};

export default Footer; 