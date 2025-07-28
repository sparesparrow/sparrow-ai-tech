import { useI18n } from '../i18n';

const _Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="footer" data-cy="footer">
      <p data-cy="footer-copyright">{t('footer.copyright')}</p>
      {/* These are in-page navigation links (hash links), so they do not need the /sparrow-ai-tech/ prefix. If you add links to other pages, use absolute paths starting with /sparrow-ai-tech/. */}
      <ul>
        <li>
          <a href="#privacy" data-cy="footer-privacy">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="#terms" data-cy="footer-terms">
            Terms of Service
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
