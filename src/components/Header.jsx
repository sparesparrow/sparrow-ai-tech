import { useI18n } from '../utils/i18n';
import { link } from '../utils/paths';

export default function Header() {
  const { language } = useI18n();

  const nav = [
    { id: 'home', href: link(language, '/') },
    { id: 'infographic1', href: link(language, '/infographics/Infographic1') },
    { id: 'infographic2', href: link(language, '/infographics/Infographic2') },
    { id: 'infographic3', href: link(language, '/infographics/Infographic3') },
    { id: 'spa', href: link(language, '/infographics/SPA') },
    { id: 'mermaid-editor', href: link(language, '/mermaid-editor') },
  ];

  return (
    <header className="site-header">
      <nav className="main-nav">
        {nav.map((item) => (
          <a key={item.id} href={item.href} className="nav-link">
            {item.id.replace(/(^\w|-\w)/g, (m) => m.toUpperCase().replace('-', ' '))}
          </a>
        ))}
      </nav>
    </header>
  );
}
