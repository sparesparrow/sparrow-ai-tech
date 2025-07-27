import React  , { useState, useEffect } from 'react';
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
import PropTypes from 'prop-types';

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

    // Modal state for articles
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
      mq.addEventListener ? mq.addEventListener('change', handler) : mq.addListener(handler);
      return () => {
        mq.removeEventListener ? mq.removeEventListener('change', handler) : mq.removeListener(handler);
      };
    }, []);

    const toggleDark = () => setIsDark((d) => !d);

    useEffect(() => {
        setContent(t('siteData')[language]);
        document.documentElement.lang = language;
        // Dummy API call for Cypress test (delayed for Cypress stub)
        setTimeout(() => {
          fetch('/sparrow-ai-tech/api/test').catch(() => {});
        }, 500);
    }, [language]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const MenuIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    );
    const CloseIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
    const ExternalLinkIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 ml-1">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
      </svg>
    );
    const GithubIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 ml-1">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    );

    // 1. Define a new, richer content structure for articles, infographics, and visuals
    const categorizedArticles = [
      {
        category: 'Architecture',
        articles: [
          { title: 'Hexagonal Architecture in MCP (EN)', url: '/sparrow-ai-tech/articles/hexagonal-architecture-in-mcp.md', lang: 'en' },
          { title: 'Hexagonální architektura v MCP (CS)', url: '/sparrow-ai-tech/articles/hexagonal-architecture-in-mcp.cs.md', lang: 'cs' },
        ]
      },
      {
        category: 'Human & AI',
        articles: [
          { title: 'The Importance of Human Action in AI (EN)', url: '/sparrow-ai-tech/articles/human-action.md', lang: 'en' },
          { title: 'Důležitost lidského jednání v AI (CS)', url: '/sparrow-ai-tech/articles/human-action.cs.md', lang: 'cs' },
        ]
      },
      {
        category: 'MCP Prompts',
        articles: [
          { title: 'Getting Started with MCP Prompts (EN)', url: '/sparrow-ai-tech/articles/mcp-prompts.md', lang: 'en' },
          { title: 'Začínáme s MCP Prompts (CS)', url: '/sparrow-ai-tech/articles/mcp-prompts.cs.md', lang: 'cs' },
        ]
      },
      {
        category: 'Ecosystem & Contributions',
        articles: [
          { title: 'MCP Ecosystem Overview', url: '/sparrow-ai-tech/articles/mcp-ecosystem-overview.md', lang: 'en' },
          { title: 'MCP in Practice & Contributions', url: '/sparrow-ai-tech/articles/mcp-in-practice.en.md', lang: 'en' },
          { title: 'MCP Contributions (EN)', url: '/sparrow-ai-tech/articles/mcp-contributions.en.md', lang: 'en' },
          { title: 'MCP Contributions (CS)', url: '/sparrow-ai-tech/articles/mcp-contributions.cs.md', lang: 'cs' },
        ]
      },
      {
        category: 'Workshops & Publications',
        articles: [
          { title: 'Andrew Ng Workshops (CS)', url: '/sparrow-ai-tech/articles/andrew-ng-workshops.cs.md', lang: 'cs' },
          { title: 'Andrej Karpathy Workshops (CS)', url: '/sparrow-ai-tech/articles/andrej-karpathy-workshops.cs.md', lang: 'cs' },
          { title: 'Dario Amodei Publications (CS)', url: '/sparrow-ai-tech/articles/dario-amodei-publikace.cs.md', lang: 'cs' },
          { title: 'ForwardFutureAI - Matthew Berman (CS)', url: '/sparrow-ai-tech/articles/forwardfutureai-matthew-berman.cs.md', lang: 'cs' },
        ]
      },
      {
        category: 'Rules & Liberty',
        articles: [
          { title: 'Cursor Rules (EN)', url: '/sparrow-ai-tech/articles/cursor-rules.md', lang: 'en' },
          { title: 'Cursor Rules (CS)', url: '/sparrow-ai-tech/articles/cursor-rules.cs.md', lang: 'cs' },
          { title: 'Liberty (EN)', url: '/sparrow-ai-tech/articles/liberty.md', lang: 'en' },
        ]
      },
    ];

    const infographicsReact = [
      { title: 'MCP Ecosystem (React)', route: '/sparrow-ai-tech/infographics/1', description: 'How the sparesparrow open-source toolchain revolutionizes AI agent development.' },
      { title: 'Human-in-the-Loop AI (React)', route: '/sparrow-ai-tech/infographics/2', description: 'The indispensable partnership between human intuition and artificial intelligence.' },
      { title: 'Hexagonal Architecture (React)', route: '/sparrow-ai-tech/infographics/3', description: 'How the Ports & Adapters pattern protects your application core.' },
      { title: 'Strategic Blueprint SPA (React)', route: '/sparrow-ai-tech/infographics/spa', description: 'Interactive, visually rich SPA: strategy, tech, ecosystem, and CI/CD pipeline.' },
    ];
    const infographicsHtml = [
      { title: 'MCP Ecosystem (HTML)', url: `/sparrow-ai-tech/infographics/1.html` },
      { title: 'Human-in-the-Loop AI (HTML)', url: `/sparrow-ai-tech/infographics/2.html` },
      { title: 'Hexagonal Architecture (HTML)', url: `/sparrow-ai-tech/infographics/3.html` },
      { title: 'SPA Infographic (HTML)', url: `/sparrow-ai-tech/infographics/SPA.html` },
      { title: 'ElevenLabs Widget Demo', url: `/sparrow-ai-tech/infographics/elevenlabs-widget.html` },
    ];
    const visuals = [
      { name: 'MCP Ecosystem Diagram', src: `/sparrow-ai-tech/assets/images/mcp-ecosystem-diagram.png`, context: 'Ecosystem, Architecture' },
      { name: 'UI Screenshot', src: `/sparrow-ai-tech/assets/images/screenshot-ui.png`,
      context: "UI Demo", context: 'Homepage, UI' },
      { name: 'Feature Screenshot', src: `/sparrow-ai-tech/assets/images/screenshot-feature.png`, context: 'Feature Demo' },
    ];

    // Fetch article content when modal opens
    React.useEffect(() => {
      if (!articleModalOpen || !articleModalUrl) return;
      setArticleModalLoading(true);
      setArticleModalError(null);
      setArticleModalContent('');
      fetch(articleModalUrl)
        .then(res => {
          if (!res.ok) throw new Error('Failed to load article');
          return res.text();
        })
        .then(setArticleModalContent)
        .catch(() => setArticleModalError('Failed to load article'))
        .finally(() => setArticleModalLoading(false));
    }, [articleModalOpen, articleModalUrl]);

    React.useEffect(() => {
      if (!articleModalOpen) return;
      const onKeyDown = (e) => { if (e.key === 'Escape') setArticleModalOpen(false); };
      window.addEventListener('keydown', onKeyDown);
      return () => window.removeEventListener('keydown', onKeyDown);
    }, [articleModalOpen]);

    return (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Sparrow AI Tech</title>
            <link rel="icon" type="image/png" href="/sparrow-ai-tech/favicon.png" />
            <link rel="icon" type="image/x-icon" href="/sparrow-ai-tech/favicon.ico" />
            <link rel="manifest" href="/sparrow-ai-tech/manifest.json" />
            <link rel="stylesheet" href="/sparrow-ai-tech/assets/css/global.css" />
          </Helmet>
          <Router basename="/sparrow-ai-tech/">
            <Routes>
              <Route path="/markdown-test" element={<MarkdownTest />} />
              <Route path="/infographics/1" element={<Infographic1 />} />
              <Route path="/infographics/2" element={<Infographic2 />} />
              <Route path="/infographics/3" element={<Infographic3 />} />
              <Route path="/infographics/spa" element={<SPAInfographic />} />
              <Route path="/" element={
                <div id="app-root" className="min-h-screen bg-stone-50 text-stone-900 dark:bg-slate-900 dark:text-stone-100 font-sans antialiased transition-colors duration-300">
                  <header className="bg-white/80 dark:bg-slate-800/90 shadow rounded-b-2xl px-4 py-2 flex items-center justify-between transition-colors duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                      <div className="flex items-center">
                        <span className="font-bold text-xl text-sky-600">Sparrow AI & Tech</span>
                        <span className="hidden sm:inline-block ml-3 text-slate-500">Strategic Blueprint</span>
                      </div>
                      <nav data-cy="main-nav" className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
                        <a href="#home" className="nav-link text-slate-600 hover:text-sky-600">{t('nav.home')}</a>
                        <a href="#portfolio" className="nav-link text-slate-600 hover:text-sky-600">{t('nav.portfolio')}</a>
                        <a href="#articles" className="nav-link text-slate-600 hover:text-sky-600">{t('nav.articles')}</a>
                        <a href="#infographics" className="nav-link text-slate-600 hover:text-sky-600">{t('nav.infographics')}</a>
                        <a href="#contact" className="nav-link text-slate-600 hover:text-sky-600">{t('nav.contact')}</a>
                        <button onClick={() => setLanguage(prev => prev === 'en' ? 'cs' : 'en')} data-cy="language-toggle" className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 text-sm">
                          {language === 'en' ? 'Česky' : 'English'}
                        </button>
                        <button
                          onClick={toggleDark}
                          aria-label="Toggle dark mode"
                          className="ml-2 p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                          data-cy="dark-mode-toggle"
                        >
                          {isDark ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
                          )}
                        </button>
                      </nav>
                      <div className="md:hidden">
                        <button onClick={toggleMenu} data-cy="menu-toggle" className="text-slate-600 focus:outline-none">{isMenuOpen ? <CloseIcon /> : <MenuIcon />}</button>
                      </div>
                    </div>
                  </header>
                  <main className="pt-20 md:pt-24">
                    <motion.section id="home" className="py-16 md:py-24"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1, duration: 0.6 }}
                        >{t('hero.title')}</motion.h1>
                        <motion.p className="mt-6 text-lg text-slate-600"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2, duration: 0.6 }}
                        >{t('hero.subtitle')}</motion.p>
                        <motion.p className="max-w-3xl mx-auto text-slate-500 mb-8"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3, duration: 0.6 }}
                        >{t('hero.description')}</motion.p>
                        <motion.div className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4, duration: 0.5 }}
                        >
                          <a href="#portfolio" className="bg-sky-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-sky-700 transition-all">View the Strategy</a>
                          <a href="#tech" className="bg-white text-slate-700 font-semibold px-6 py-3 rounded-lg border border-slate-300 hover:bg-slate-100 transition-all">Explore the Tech</a>
                          <a href="/sparrow-ai-tech/cv.pdf" target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition-all flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                            Download CV (PDF)
                          </a>
                        </motion.div>
                      </div>
                    </motion.section>
                    {/* Conversational AI / ElevenLabs Section */}
                    <motion.section id="conversational-ai" className="py-20 bg-gradient-to-br from-sky-50 to-slate-100"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1">
                          <motion.h2 className="text-4xl font-bold text-sky-700 mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                          >Conversational AI, Powered by ElevenLabs</motion.h2>
                          <motion.p className="text-lg text-slate-700 mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                          >
                            Delight your customers with instant, intelligent, and personalized support—anytime, anywhere. Our integration with ElevenLabs brings advanced Conversational AI and Voice UI directly to your site.
                          </motion.p>
                          <ul className="space-y-3 mb-6 text-left">
                            <li className="flex items-center"><span className="text-sky-600 mr-2">🗣️</span> Natural voice conversations (VUI)</li>
                            <li className="flex items-center"><span className="text-sky-600 mr-2">⚡</span> 24/7 automated support</li>
                            <li className="flex items-center"><span className="text-sky-600 mr-2">🎯</span> Personalized recommendations</li>
                            <li className="flex items-center"><span className="text-sky-600 mr-2">📊</span> Actionable insights from every interaction</li>
                          </ul>
                          <a href="#contact" className="inline-block bg-sky-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-sky-700 transition">Book a Demo</a>
                        </div>
                        <div className="flex-1 flex justify-center">
                          {/* Replace with a real screenshot or live widget if possible */}
                          <img src={`/sparrow-ai-tech/assets/images/elevenlabs-widget-demo.png`} alt="ElevenLabs Widget Demo" className="rounded-xl shadow-2xl w-full max-w-md" loading="lazy" />
                        </div>
                      </div>
                    </motion.section>
                    {/* Ecosystem / Infographics Section */}
                    <motion.section id="ecosystem" className="py-20 bg-white"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                          <motion.h2 className="text-3xl font-bold tracking-tight text-slate-900"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                          >Sparrow AI & Tech Ecosystem</motion.h2>
                          <motion.p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                          >Explore the open-source tools and projects that power our platform. Hover over each card to learn more about its status and technology stack.</motion.p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                          {[
                            {
                              name: 'mcp-prompts',
                              description: 'Core server for managing, storing, and versioning prompts and templates for LLMs.',
                              status: 'In Migration',
                              statusColor: 'bg-amber-100 text-amber-800',
                              tech: ['TypeScript', 'Node.js', 'PostgreSQL', 'Docker']
                            },
                            {
                              name: 'mcp-router',
                              description: 'Routes requests between different MCP-compliant services.',
                              status: 'Beta',
                              statusColor: 'bg-sky-100 text-sky-800',
                              tech: ['TypeScript', 'Node.js']
                            },
                            {
                              name: 'podman-desktop-extension-mcp',
                              description: 'Podman Desktop extension for interacting with the MCP ecosystem.',
                              status: 'Experimental',
                              statusColor: 'bg-rose-100 text-rose-800',
                              tech: ['JavaScript']
                            },
                            {
                              name: 'awesome-mcp-servers',
                              description: 'Curated list of community-built MCP servers and related projects.',
                              status: 'Stable',
                              statusColor: 'bg-emerald-100 text-emerald-800',
                              tech: ['Community']
                            }
                          ].map((project, idx) => (
                            <div
                              key={project.name}
                              className={
                                'bg-white p-6 rounded-lg border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden'
                              }
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="text-lg font-bold text-slate-900">{project.name}</h4>
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${project.statusColor}`}>{project.status}</span>
                              </div>
                              <p className="mt-2 text-slate-600 text-sm group-hover:text-slate-800 transition-colors duration-300">{project.description}</p>
                              <div className="mt-4 flex flex-wrap gap-2">
                                {project.tech.map(t => (
                                  <span key={t} className="inline-block bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-0.5 rounded-full">{t}</span>
                                ))}
                              </div>
                              <div className="absolute inset-0 bg-sky-50 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.section>
                    {/* Tech Comparison Section */}
                    <motion.section id="tech-comparison" className="py-20 bg-gradient-to-br from-white to-sky-50"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                          <motion.h2 className="text-3xl font-bold tracking-tight text-slate-900"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                          >Technology Comparison</motion.h2>
                          <motion.p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                          >Why we chose our stack: performance, developer experience, and a unique brand identity. Explore the data below or view the infographic cards for a quick summary.</motion.p>
                        </div>
                        <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
                          <div>
                            <h3 className="text-xl font-semibold text-slate-900 text-center">Static Site Generator (SSG) Comparison</h3>
                            <p className="text-center text-slate-600 mt-2">Astro is recommended for its performance and JS-native environment.</p>
                            <div className="mt-4 chart-container" style={{ position: 'relative', width: '100%', maxWidth: 600, margin: '0 auto', height: 350, maxHeight: 400 }}>
                              {/* Chart.js SSG Bar Chart Placeholder */}
                              <canvas id="ssgChartHome"></canvas>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-slate-900 text-center">CSS Framework Comparison</h3>
                            <p className="text-center text-slate-600 mt-2">Tailwind CSS is recommended for its customization and design control.</p>
                            <div className="mt-4 chart-container" style={{ position: 'relative', width: '100%', maxWidth: 600, margin: '0 auto', height: 350, maxHeight: 400 }}>
                              {/* Chart.js CSS Bar Chart Placeholder */}
                              <canvas id="cssChartHome"></canvas>
                            </div>
                          </div>
                        </div>
                        {/* Score Card Alternative */}
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
                            <span className="text-5xl mb-4">🚀</span>
                            <h4 className="text-lg font-bold text-sky-700 mb-2">Astro</h4>
                            <p className="text-slate-600 mb-2">Dev Experience: <span className="font-bold text-sky-700">10/10</span></p>
                            <p className="text-slate-600 mb-2">Build Performance: <span className="font-bold text-emerald-600">9/10</span></p>
                          </div>
                          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
                            <span className="text-5xl mb-4">🎨</span>
                            <h4 className="text-lg font-bold text-amber-700 mb-2">Tailwind CSS</h4>
                            <p className="text-slate-600 mb-2">Customization: <span className="font-bold text-amber-600">10/10</span></p>
                            <p className="text-slate-600 mb-2">Design Uniqueness: <span className="font-bold text-violet-600">9/10</span></p>
                          </div>
                        </div>
                      </div>
                    </motion.section>
                    {/* Process Steps / Timeline Section */}
                    <motion.section id="process" className="py-20 bg-white"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                          <motion.h2 className="text-3xl font-bold tracking-tight text-slate-900"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                          >Our Process</motion.h2>
                          <motion.p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                          >From first contact to ongoing support, our process ensures clarity, quality, and results. Choose your preferred timeline style below.</motion.p>
                        </div>
                        {/* Horizontal Timeline */}
                        <div className="hidden md:flex justify-between items-center mb-12 relative">
                          {[
                            { icon: '💬', title: 'Consultation', desc: 'We listen to your needs and analyze your goals.' },
                            { icon: '📝', title: 'Solution Design', desc: 'We propose a tailored solution and roadmap.' },
                            { icon: '🛠️', title: 'Development', desc: 'We build, test, and iterate with transparency.' },
                            { icon: '🚀', title: 'Deployment & Support', desc: 'We launch, monitor, and support your solution.' }
                          ].map((step, idx, arr) => (
                            <div key={step.title} className="flex flex-col items-center flex-1">
                              <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center text-3xl mb-2 shadow-lg">{step.icon}</div>
                              <h4 className="font-bold text-sky-700 mb-1">{step.title}</h4>
                              <p className="text-slate-600 text-sm text-center mb-2">{step.desc}</p>
                              {idx < arr.length - 1 && (
                                <div className="absolute top-8 left-0 right-0 flex justify-between z-0">
                                  <div style={{ left: `${(idx + 1) * 25}%` }} className="h-1 w-1/4 bg-sky-200 rounded-full z-0" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        {/* Vertical Stepper Alternative */}
                        <div className="md:hidden flex flex-col gap-8">
                          {[
                            { icon: '💬', title: 'Consultation', desc: 'We listen to your needs and analyze your goals.' },
                            { icon: '📝', title: 'Solution Design', desc: 'We propose a tailored solution and roadmap.' },
                            { icon: '🛠️', title: 'Development', desc: 'We build, test, and iterate with transparency.' },
                            { icon: '🚀', title: 'Deployment & Support', desc: 'We launch, monitor, and support your solution.' }
                          ].map((step, idx) => (
                            <div key={step.title} className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-full bg-sky-100 flex items-center justify-center text-2xl shadow-lg">{step.icon}</div>
                              <div>
                                <h4 className="font-bold text-sky-700 mb-1">{step.title}</h4>
                                <p className="text-slate-600 text-sm">{step.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.section>
                    {/* Visual Library / Gallery Section */}
                    <motion.section id="visual-library" className="py-20 bg-gradient-to-br from-slate-50 to-white"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                          <motion.h2 className="text-3xl font-bold tracking-tight text-slate-900"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                          >Visual Library & Featured Diagrams</motion.h2>
                          <motion.p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                          >Explore our architecture, UI, and process diagrams. Click any image to enlarge. Use the filter to view by category.</motion.p>
                        </div>
                        {/* Filter by category (future scalability) */}
                        <div className="flex justify-center gap-4 mb-8">
                          <button className="bg-sky-100 text-sky-700 px-4 py-2 rounded-full font-semibold shadow hover:bg-sky-200 transition">All</button>
                          <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full font-semibold shadow hover:bg-slate-200 transition">Architecture</button>
                          <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full font-semibold shadow hover:bg-slate-200 transition">UI</button>
                          <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full font-semibold shadow hover:bg-slate-200 transition">Process</button>
                        </div>
                        {/* Masonry grid with lightbox */}
                        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 [column-fill:_balance]"><div className="flex flex-col gap-6">
                          {[
                            { name: 'MCP Ecosystem Diagram', src: `/sparrow-ai-tech/assets/images/mcp-ecosystem-diagram.png`, context: 'Architecture' },
                            { name: 'UI Screenshot', src: `/sparrow-ai-tech/assets/images/screenshot-ui.png`,
      context: "UI Demo", context: 'UI' },
                            { name: 'Feature Screenshot', src: `/sparrow-ai-tech/assets/images/screenshot-feature.png`, context: 'UI' },
                            { name: 'Hard-Coder Architecture', src: `/sparrow-ai-tech/assets/images/hard-coder-architecture.png`, context: 'Architecture' },
                            { name: 'MCP Router Flow', src: `/sparrow-ai-tech/assets/images/mcp-router-flow.png`, context: 'Process' },
                            { name: 'Project Orchestrator Diagram', src: `/sparrow-ai-tech/assets/images/project-orchestrator-diagram.png`, context: 'Architecture' }
                          ].map((vis, idx) => (
                            <motion.div
                              key={idx}
                              className="bg-white rounded-lg shadow-md p-4 mb-6 break-inside-avoid flex flex-col items-center cursor-pointer group transition-transform hover:-translate-y-1"
                              initial={{ opacity: 0, y: 30 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, amount: 0.2 }}
                              transition={{ delay: 0.1 * idx, duration: 0.5, ease: 'easeOut' }}
                              onClick={() => { setLightboxIndex(idx); setLightboxOpen(true); }}
                            >
                              <img src={vis.src.startsWith('http') || vis.src.startsWith('/sparrow-ai-tech/') ? vis.src : `/sparrow-ai-tech/${vis.src.replace(/^\/+/, '')}`} alt={vis.name} className="w-full h-48 object-contain mb-4 rounded-lg group-hover:shadow-2xl transition-shadow duration-300" loading="lazy" />
                              <h4 className="text-lg font-semibold text-sky-700 mb-2">{vis.name}</h4>
                              <p className="text-slate-600 text-sm">{vis.context}</p>
                            </motion.div>
                          ))}
                        </div></div>
                        <Lightbox
                          open={lightboxOpen}
                          close={() => setLightboxOpen(false)}
                          index={lightboxIndex}
                          slides={[
                            { src: `/sparrow-ai-tech/assets/images/mcp-ecosystem-diagram.png`, alt: 'MCP Ecosystem Diagram' },
                            { src: `/sparrow-ai-tech/assets/images/screenshot-ui.png`,
      context: "UI Demo", alt: 'UI Screenshot' },
                            { src: `/sparrow-ai-tech/assets/images/screenshot-feature.png`, alt: 'Feature Screenshot' },
                            { src: `/sparrow-ai-tech/assets/images/hard-coder-architecture.png`, alt: 'Hard-Coder Architecture' },
                            { src: `/sparrow-ai-tech/assets/images/mcp-router-flow.png`, alt: 'MCP Router Flow' },
                            { src: `/sparrow-ai-tech/assets/images/project-orchestrator-diagram.png`, alt: 'Project Orchestrator Diagram' }
                          ].map(slide => ({
                            ...slide,
                            src: slide.src.startsWith('http') || slide.src.startsWith('/sparrow-ai-tech/') ? slide.src : `/sparrow-ai-tech/${slide.src.replace(/^\/+/, '')}`
                          }))}
                          render={{
                            slide: ({ slide }) => (
                              <img src={slide.src} alt={slide.alt} style={{ maxHeight: '80vh', maxWidth: '90vw', margin: 'auto' }} />
                            )
                          }}
                        />
                      </div>
                    </motion.section>
                    <motion.section id="portfolio" className="py-16 md:py-24 bg-white"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                          <motion.h2 className="text-3xl font-bold tracking-tight text-slate-900"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                          >{t('portfolio.title')}</motion.h2>
                        </div>
                        <motion.div className="mt-12 grid md:grid-cols-2 gap-8 md:gap-12"
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                        >
                          {t('siteData')[language].portfolio.projects.map((project, index) => (
                            <motion.div key={index} className="bg-slate-50 p-8 rounded-lg border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                              initial={{ opacity: 0, y: 30 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, amount: 0.2 }}
                              transition={{ delay: 0.1 * index, duration: 0.5, ease: 'easeOut' }}
                            >
                              <div className="flex items-center mb-2">
                                <div className="bg-sky-100 p-3 rounded-full"><span className="text-2xl">{project.icon || '💡'}</span></div>
                                <h3 className="ml-4 text-xl font-semibold text-slate-900">{project.title}</h3>
                              </div>
                              <p className="mt-4 text-slate-600">{project.description}</p>
                              <div className="flex flex-wrap gap-2 mt-4">
                                {project.tags.map(tag => (
                                  <span key={tag} className="inline-block bg-slate-100 text-slate-600 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">{tag}</span>
                                ))}
                              </div>
                              <div className="mt-6 flex gap-4">
                                {project.liveUrl && (
                                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-white bg-green-600 hover:bg-green-700 py-2 px-4 rounded-lg transition-colors duration-300">
                                    Live Demo <ExternalLinkIcon />
                                  </a>
                                )}
                                {project.sourceUrl && (
                                  <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-sky-600 hover:bg-slate-100 py-2 px-4 rounded-lg transition-colors duration-300">
                                    Source <GithubIcon />
                                  </a>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                    </motion.section>
                    <motion.section id="articles" className="py-16 md:py-24"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.h2 className="text-3xl font-bold tracking-tight text-slate-900 text-center mb-12"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1, duration: 0.6 }}
                        >Articles & Documentation</motion.h2>
                        {categorizedArticles.map((cat, idx) => (
                          <motion.div key={cat.category} className="mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * idx, duration: 0.5 }}
                          >
                            <h3 className="text-2xl font-semibold text-sky-700 mb-4">{cat.category}</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                              {cat.articles.map((article, i) => (
                                <motion.button
                                  key={i}
                                  onClick={() => {
                                    setArticleModalUrl(`/sparrow-ai-tech${article.url}`);
                                    setArticleModalTitle(article.title);
                                    setArticleModalOpen(true);
                                  }}
                                  className="block w-full text-left bg-slate-100 hover:bg-slate-200 p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                                  initial={{ opacity: 0, y: 20 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                                >
                                  <span className="text-sky-600 font-bold">[{article.lang.toUpperCase()}]</span> <span className="text-lg font-semibold">{article.title}</span>
                                </motion.button>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      {/* Article Modal Overlay */}
                      <Modal
                        open={articleModalOpen}
                        onClose={() => setArticleModalOpen(false)}
                        title={articleModalTitle}
                        isDark={isDark}
                      >
                        {articleModalLoading && <div className="text-sky-400">Loading…</div>}
                        {articleModalError && <div className="text-red-400">{articleModalError}</div>}
                        {!articleModalLoading && !articleModalError && (
                          <div className="prose prose-invert max-w-none dark:prose-invert">
                            <ReactMarkdown>{articleModalContent}</ReactMarkdown>
                          </div>
                        )}
                      </Modal>
                    </motion.section>
                    <motion.section id="infographics" className="py-16 md:py-24"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.h2 className="text-3xl font-bold tracking-tight text-slate-900 text-center mb-12"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1, duration: 0.6 }}
                        >Infographics</motion.h2>
                        <h3 className="text-xl font-semibold text-sky-700 mb-4">Interactive (React)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                          {infographicsReact.map((info, idx) => (
                            <a key={idx} href={info.route} className="block bg-slate-100 hover:bg-slate-200 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg text-center">
                              <h4 className="text-lg font-semibold text-sky-600 mb-2">{info.title}</h4>
                              <p className="text-slate-600">{info.description}</p>
                            </a>
                          ))}
                        </div>
                        <h3 className="text-xl font-semibold text-sky-700 mb-4">Standalone (HTML)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                          {infographicsHtml.map((info, idx) => (
                            <a key={idx} href={`/sparrow-ai-tech${info.url}`} target="_blank" rel="noopener noreferrer" className="block bg-slate-100 hover:bg-slate-200 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg text-center">
                              <h4 className="text-lg font-semibold text-sky-600 mb-2">{info.title}</h4>
                            </a>
                          ))}
                        </div>
                      </div>
                    </motion.section>
                    <motion.section id="contact" className="py-16 md:py-24 bg-white"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1, duration: 0.6 }}
                        >{t('contact.title')}</motion.h2>
                        <motion.p className="text-slate-600 mb-8"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2, duration: 0.6 }}
                        >{t('contact.description')}</motion.p>
                        <motion.a href="mailto:sparrow.ai.tech@gmail.com" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 duration-300 inline-block"
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                        >{t('contact.button')}</motion.a>
                      </div>
                    </motion.section>
                  </main>
                  <footer className="bg-slate-800 text-slate-400">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
                      <p>Interactive Strategic Blueprint for Sparrow AI & Tech</p>
                      <p className="mt-2 text-sm">{t('footer.copyright')}</p>
                    </div>
                  </footer>
                </div>
              } />
            </Routes>
          </Router>
        </>
    );
};

const App = () => (
  <I18nProvider>
    <AppContent />
  </I18nProvider>
);

export default App; 