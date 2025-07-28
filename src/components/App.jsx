 
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { I18nProvider, useI18n } from '../i18n';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MarkdownTest from './pages/MarkdownTest';
import Infographic1 from './pages/infographics/Infographic1';
import Infographic2 from './pages/infographics/Infographic2';
import Infographic3 from './pages/infographics/Infographic3';
import SPAInfographic from './pages/infographics/SPA';
import { motion } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Helmet } from 'react-helmet';
import ReactMarkdown from 'react-markdown';
import Modal from './ui/Modal.jsx';

const AppContent = () => {
  const { language, setLanguage, t } = useI18n();
  const [content, setContent] = useState(t('siteData.en'));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const theme = localStorage.getItem('theme');
      if (theme) return theme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  const [articleModalOpen, setArticleModalOpen] = React.useState(false);
  const [articleModalUrl, setArticleModalUrl] = React.useState('');
  const [articleModalTitle, setArticleModalTitle] = React.useState('');
  const [articleModalContent, setArticleModalContent] = React.useState('');
  const [articleModalLoading, setArticleModalLoading] = React.useState(false);
  const [articleModalError, setArticleModalError] = React.useState(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      if (!localStorage.getItem('theme')) setIsDark(e.matches);
    };
    mq.addEventListener('change', handler);
    return () => {
      mq.removeEventListener('change', handler);
    };
  }, []);

  const toggleDark = () => setIsDark((d) => !d);

  useEffect(() => {
    setContent(t('siteData')[language]);
    document.documentElement.lang = language;
    setTimeout(() => {
      fetch('/sparrow-ai-tech/api/test').catch(() => { });
    }, 500);
  }, [language, t]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const MenuIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16m-7 6h7"
      />
    </svg>
  );
  const CloseIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
  const ExternalLinkIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="ml-1 h-4 w-4"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
  );
  const GithubIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="ml-1 h-4 w-4"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  );

  const categorizedArticles = [
    {
      category: 'Architecture',
      articles: [
        {
          title: 'Hexagonal Architecture in MCP (EN)',
          url: '/articles/hexagonal-architecture-in-mcp.md',
          lang: 'en',
        },
        {
          title: 'Hexagonální architektura v MCP (CS)',
          url: '/articles/hexagonal-architecture-in-mcp.cs.md',
          lang: 'cs',
        },
      ],
    },
    // ... other categories
  ];

  const infographicsReact = [
    { title: 'MCP Ecosystem (React)', route: '/infographics/1', description: '...' },
    { title: 'Human-in-the-Loop AI (React)', route: '/infographics/2', description: '...' },
    { title: 'Hexagonal Architecture (React)', route: '/infographics/3', description: '...' },
    { title: 'Strategic Blueprint SPA (React)', route: '/infographics/spa', description: '...' },
  ];
  const infographicsHtml = [
    { title: 'MCP Ecosystem (HTML)', url: '/infographics/Infographic1.html' },
    { title: 'SPA Infographic (HTML)', url: '/infographics/SPA.html' },
    { title: 'ElevenLabs Widget Demo', url: '/infographics/elevenlabs-widget.html' },
  ];

  React.useEffect(() => {
    if (!articleModalOpen || !articleModalUrl) return;
    setArticleModalLoading(true);
    setArticleModalError(null);
    setArticleModalContent('');
    fetch(articleModalUrl)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load article');
        return res.text();
      })
      .then(setArticleModalContent)
      .catch(() => setArticleModalError('Failed to load article'))
      .finally(() => setArticleModalLoading(false));
  }, [articleModalOpen, articleModalUrl]);

  React.useEffect(() => {
    if (!articleModalOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setArticleModalOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [articleModalOpen]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sparrow AI Tech</title>
        <link rel="icon" type="image/png" href="/sparrow-ai-tech/favicon.png" />
        <link rel="manifest" href="/sparrow-ai-tech/manifest.json" />
      </Helmet>
      <Router basename="/sparrow-ai-tech/">
        <Routes>
          <Route path="/markdown-test" element={<MarkdownTest />} />
          <Route path="/infographics/1" element={<Infographic1 />} />
          <Route path="/infographics/2" element={<Infographic2 />} />
          <Route path="/infographics/3" element={<Infographic3 />} />
          <Route path="/infographics/spa" element={<SPAInfographic />} />
          <Route
            path="/"
            element={
              <div
                id="app-root"
                className="min-h-screen bg-stone-50 font-sans text-stone-900 antialiased transition-colors duration-300 dark:bg-slate-900 dark:text-stone-100"
              >
                <header className="flex items-center justify-between rounded-b-2xl bg-white/80 px-4 py-2 shadow transition-colors duration-300 dark:bg-slate-800/90">
                  {/* Header content */}
                </header>
                <main className="pt-20 md:pt-24">
                  {/* Main content sections */}
                  <motion.section id="portfolio">
                    {/* Portfolio content */}
                    {t('siteData')[language].portfolio.projects.map((project, idx) => (
                      <motion.div key={idx}>{/* project details */}</motion.div>
                    ))}
                  </motion.section>
                  <motion.section id="visual-library">
                    {/* Visual library content */}
                    <div className="columns-1 gap-6 [column-fill:balance] sm:columns-2 md:columns-3">
                      {/* Visuals mapping */}
                    </div>
                    <Lightbox
                      open={lightboxOpen}
                      close={() => setLightboxOpen(false)}
                      index={lightboxIndex}
                      slides={
                        [
                          /* slides data */
                        ]
                      }
                    />
                  </motion.section>
                  <motion.section id="articles">
                    {categorizedArticles.map((cat, idx) => (
                      <motion.div key={cat.category}>{/* articles content */}</motion.div>
                    ))}
                    <Modal
                      open={articleModalOpen}
                      onClose={() => setArticleModalOpen(false)}
                      title={articleModalTitle}
                      isDark={isDark}
                    >
                      <div className="prose prose-invert dark:prose-invert max-w-none">
                        <ReactMarkdown>{articleModalContent}</ReactMarkdown>
                      </div>
                    </Modal>
                  </motion.section>
                  <motion.section id="infographics">
                    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                      {infographicsReact.map((info, idx) => (
                        <a key={idx} href={info.route}>
                          <h4>{info.title}</h4>
                          <p>{info.description}</p>
                        </a>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                      {infographicsHtml.map((info, idx) => (
                        <a
                          key={idx}
                          href={`/sparrow-ai-tech${info.url}`}
                          target="blank"
                          rel="noopener noreferrer"
                        >
                          <h4>{info.title}</h4>
                        </a>
                      ))}
                    </div>
                  </motion.section>
                </main>
                <footer className="bg-slate-800 text-slate-400">{/* Footer content */}</footer>
              </div>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}
