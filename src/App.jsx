import React, { useState, useEffect } from 'react';
import cs from '@/languages/cs.json';
import en from '@/languages/en.json';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MarkdownTest from './pages/MarkdownTest';
import Infographic1 from './pages/infographics/Infographic1';
import Infographic2 from './pages/infographics/Infographic2';
import Infographic3 from './pages/infographics/Infographic3';
import SPAInfographic from './pages/infographics/SPA';

const translationsMap = { cs, en };

const App = () => {
    const [lang, setLang] = useState("cs");
    const translations = translationsMap[lang];

    const siteData = {
        en: {
            nav: {
                home: 'Home',
                portfolio: 'Portfolio',
                articles: 'Articles',
                infographics: 'Infographics',
                contact: 'Contact',
            },
            hero: {
                title: "Sparrow AI Tech",
                subtitle: "Your Partner in IT, Cybersecurity, and AI Development",
                description: "I offer custom IT services, cybersecurity solutions, and AI development. From hardware and software integration with microcontrollers (Arduino, PlatformIO) to creating custom AI solutions, I am here to bring your ideas to life."
            },
            portfolio: {
                title: "My Projects & Services",
                projects: [
                    { 
                        title: "AI & Automation Solutions", 
                        description: "Development of custom AI models, automation scripts, and intelligent agents to streamline processes and enhance productivity. Specializing in prompt engineering and Large Language Model (LLM) integration.",
                        tags: ["Python", "AI", "LLM", "Automation", "API"],
                        liveUrl: null,
                        sourceUrl: "https://github.com/sparesparrow/sparrow-ai-tech" 
                    },
                    { 
                        title: "IT & Cybersecurity Consulting", 
                        description: "Providing robust IT infrastructure support and cybersecurity strategies. Services include network security, system administration, and implementation of security best practices to protect your digital assets.",
                        tags: ["Cybersecurity", "Networking", "Linux", "System Admin"],
                        liveUrl: null,
                        sourceUrl: null
                    },
                    { 
                        title: "Hardware & IoT Integration", 
                        description: "Custom hardware and software solutions using microcontrollers like Arduino and ESP32 with PlatformIO. Creating complete IoT systems from sensor integration to data processing and control.",
                        tags: ["IoT", "Arduino", "PlatformIO", "C++", "Hardware"],
                        liveUrl: "https://sparesparrow.github.io/cv/",
                        sourceUrl: "https://github.com/sparesparrow" 
                    },
                    { 
                        title: "Web Development", 
                        description: "Building modern, responsive, and performant websites and web applications using technologies like React and Node.js. Focused on creating great user experiences and clean, maintainable code.",
                        tags: ["React", "JavaScript", "HTML5", "CSS3", "Node.js"],
                        liveUrl: "https://sparesparrow.github.io/sparrow-ai-tech/",
                        sourceUrl: "https://github.com/sparesparrow/sparrow-ai-tech" 
                    }
                ]
            },
            articles: {
                title: "Articles & Insights",
                list: [
                    { title: "Introduction to Hexagonal Architecture", url: "https://sparesparrow.github.io/sparrow-ai-tech/articles/hexagonal-architecture-in-mcp.html" },
                    { title: "The Importance of Human Action in AI", url: "https://sparesparrow.github.io/sparrow-ai-tech/articles/human-action.html" },
                    { title: "Getting Started with MCP Prompts", url: "https://sparesparrow.github.io/sparrow-ai-tech/articles/mcp-prompts.html" },
                ]
            },
            infographics: {
                title: "Infographics",
                items: [
                    {
                        url: "/infographics/1.html",
                        title: "MCP Ecosystem",
                        description: "How the sparesparrow open-source toolchain revolutionizes AI agent development."
                    },
                    {
                        url: "/infographics/2.html",
                        title: "Human-in-the-Loop AI",
                        description: "The indispensable partnership between human intuition and artificial intelligence."
                    },
                    {
                        url: "/infographics/3.html",
                        title: "Hexagonal Architecture",
                        description: "How the Ports & Adapters pattern protects your application core."
                    }
                ]
            },
            contact: {
                title: "Get in Touch",
                description: "Have a project in mind or want to learn more? Let's connect.",
                button: "Contact Me"
            },
            footer: {
                copyright: `© ${new Date().getFullYear()} Sparrow AI Tech. All rights reserved.`
            }
        },
        cs: {
            nav: {
                home: 'Domů',
                portfolio: 'Projekty',
                articles: 'Články',
                infographics: 'Infografiky',
                contact: 'Kontakt',
            },
            hero: {
                title: "Sparrow AI Tech",
                subtitle: "Váš partner pro IT, kyberbezpečnost a vývoj AI",
                description: "Nabízím na míru šité IT služby, řešení v oblasti kybernetické bezpečnosti a vývoj umělé inteligence. Od integrace hardwaru a softwaru s mikrokontroléry (Arduino, PlatformIO) až po tvorbu vlastních AI řešení, jsem tu, abych realizoval vaše nápady."
            },
            portfolio: {
                title: "Moje Projekty a Služby",
                projects: [
                    { 
                        title: "AI a Automatizační Řešení", 
                        description: "Vývoj vlastních AI modelů, automatizačních skriptů a inteligentních agentů pro zefektivnění procesů a zvýšení produktivity. Specializace na prompt engineering a integraci velkých jazykových modelů (LLM).",
                        tags: ["Python", "AI", "LLM", "Automatizace", "API"],
                        liveUrl: null,
                        sourceUrl: "https://github.com/sparesparrow/sparrow-ai-tech" 
                    },
                    { 
                        title: "IT a Kyberbezpečnostní Poradenství", 
                        description: "Poskytování robustní podpory IT infrastruktury a strategií kybernetické bezpečnosti. Služby zahrnují zabezpečení sítí, správu systémů a implementaci osvědčených bezpečnostních postupů pro ochranu vašich digitálních aktiv.",
                        tags: ["Kyberbezpečnost", "Sítě", "Linux", "Správa systémů"],
                        liveUrl: null,
                        sourceUrl: null
                    },
                    { 
                        title: "Hardware a IoT Integrace", 
                        description: "Zakázková hardwarová a softwarová řešení s využitím mikrokontrolérů jako Arduino a ESP32 s PlatformIO. Tvorba kompletních IoT systémů od integrace senzorů po zpracování dat a řízení.",
                        tags: ["IoT", "Arduino", "PlatformIO", "C++", "Hardware"],
                        liveUrl: "https://sparesparrow.github.io/cv/",
                        sourceUrl: "https://github.com/sparesparrow" 
                    },
                    { 
                        title: "Vývoj Webových Aplikací", 
                        description: "Tvorba moderních, responzivních a výkonných webových stránek a aplikací s využitím technologií jako React a Node.js. Zaměření na skvělou uživatelskou zkušenost a čistý, udržitelný kód.",
                        tags: ["React", "JavaScript", "HTML5", "CSS3", "Node.js"],
                        liveUrl: "https://sparesparrow.github.io/sparrow-ai-tech/",
                        sourceUrl: "https://github.com/sparesparrow/sparrow-ai-tech" 
                    }
                ]
            },
            articles: {
                title: "Články a Názory",
                list: [
                    { title: "Úvod do hexagonální architektury", url: "https://sparesparrow.github.io/sparrow-ai-tech/articles/hexagonal-architecture-in-mcp.cs.html" },
                    { title: "Důležitost lidského jednání v AI", url: "https://sparesparrow.github.io/sparrow-ai-tech/articles/human-action.cs.html" },
                    { title: "Začínáme s MCP Prompts", url: "https://sparesparrow.github.io/sparrow-ai-tech/articles/mcp-prompts.cs.html" },
                ]
            },
            infographics: {
                title: "Infografiky",
                items: [
                    {
                        url: "/infographics/1.html",
                        title: "Ekosystém MCP",
                        description: "Jak open-source nástroje sparesparrow mění vývoj AI agentů."
                    },
                    {
                        url: "/infographics/2.html",
                        title: "Člověk ve smyčce AI",
                        description: "Nezastupitelné partnerství lidské intuice a umělé inteligence."
                    },
                    {
                        url: "/infographics/3.html",
                        title: "Hexagonální architektura",
                        description: "Jak vzor Ports & Adapters chrání jádro vaší aplikace."
                    }
                ]
            },
            contact: {
                title: "Spojte se se mnou",
                description: "Máte na mysli projekt nebo se chcete dozvědět více? Pojďme se spojit.",
                button: "Kontaktujte mě"
            },
            footer: {
                copyright: `© ${new Date().getFullYear()} Sparrow AI Tech. Všechna práva vyhrazena.`
            }
        }
    };

    const [language, setLanguage] = useState('en');
    const [content, setContent] = useState(siteData.en);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setContent(siteData[language]);
        document.documentElement.lang = language;
    }, [language]);

    const toggleLanguage = () => setLanguage(prev => prev === 'en' ? 'cs' : 'en');
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
          { title: 'Hexagonal Architecture in MCP (EN)', url: '/articles/hexagonal-architecture-in-mcp.md', lang: 'en' },
          { title: 'Hexagonální architektura v MCP (CS)', url: '/articles/hexagonal-architecture-in-mcp.cs.md', lang: 'cs' },
          { title: 'Merged: Hexagonal Architecture', url: '/articles/merged/hexagonal-architecture-in-mcp.md', lang: 'en/cs' },
        ]
      },
      {
        category: 'Human & AI',
        articles: [
          { title: 'The Importance of Human Action in AI (EN)', url: '/articles/human-action.md', lang: 'en' },
          { title: 'Důležitost lidského jednání v AI (CS)', url: '/articles/human-action.cs.md', lang: 'cs' },
        ]
      },
      {
        category: 'MCP Prompts',
        articles: [
          { title: 'Getting Started with MCP Prompts (EN)', url: '/articles/mcp-prompts.md', lang: 'en' },
          { title: 'Začínáme s MCP Prompts (CS)', url: '/articles/mcp-prompts.cs.md', lang: 'cs' },
          { title: 'Merged: MCP Prompts', url: '/articles/merged/mcp-prompts-and-rs.md', lang: 'en/cs' },
        ]
      },
      {
        category: 'Ecosystem & Contributions',
        articles: [
          { title: 'MCP Ecosystem Overview', url: '/articles/merged/mcp-ecosystem-overview.md', lang: 'en' },
          { title: 'MCP in Practice & Contributions', url: '/articles/merged/mcp-in-practice-and-contributions.md', lang: 'en' },
          { title: 'MCP Contributions (EN)', url: '/articles/mcp-contributions.en.md', lang: 'en' },
          { title: 'MCP Contributions (CS)', url: '/articles/mcp-contributions.cs.md', lang: 'cs' },
        ]
      },
      {
        category: 'Workshops & Publications',
        articles: [
          { title: 'Andrew Ng Workshops (CS)', url: '/articles/andrew-ng-workshops.cs.md', lang: 'cs' },
          { title: 'Andrej Karpathy Workshops (CS)', url: '/articles/andrej-karpathy-workshops.cs.md', lang: 'cs' },
          { title: 'Dario Amodei Publications (CS)', url: '/articles/dario-amodei-publikace.cs.md', lang: 'cs' },
          { title: 'ForwardFutureAI - Matthew Berman (CS)', url: '/articles/forwardfutureai-matthew-berman.cs.md', lang: 'cs' },
        ]
      },
      {
        category: 'Rules & Liberty',
        articles: [
          { title: 'Cursor Rules (EN)', url: '/articles/cursor-rules.md', lang: 'en' },
          { title: 'Cursor Rules (CS)', url: '/articles/cursor-rules.cs.md', lang: 'cs' },
          { title: 'Liberty (EN)', url: '/articles/liberty.md', lang: 'en' },
        ]
      },
    ];

    const infographicsReact = [
      { title: 'MCP Ecosystem (React)', route: '/infographics/1', description: 'How the sparesparrow open-source toolchain revolutionizes AI agent development.' },
      { title: 'Human-in-the-Loop AI (React)', route: '/infographics/2', description: 'The indispensable partnership between human intuition and artificial intelligence.' },
      { title: 'Hexagonal Architecture (React)', route: '/infographics/3', description: 'How the Ports & Adapters pattern protects your application core.' },
      { title: 'Strategic Blueprint SPA (React)', route: '/infographics/spa', description: 'Interactive, visually rich SPA: strategy, tech, ecosystem, and CI/CD pipeline.' },
    ];
    const infographicsHtml = [
      { title: 'MCP Ecosystem (HTML)', url: '/infographics/1.html' },
      { title: 'Human-in-the-Loop AI (HTML)', url: '/infographics/2.html' },
      { title: 'Hexagonal Architecture (HTML)', url: '/infographics/3.html' },
      { title: 'SPA Infographic (HTML)', url: '/infographics/SPA.html' },
      { title: 'ElevenLabs Widget Demo', url: '/infographics/elevenlabs-widget.html' },
    ];
    const visuals = [
      { name: 'MCP Ecosystem Diagram', src: '/assets/images/mcp-ecosystem-diagram.png', context: 'Ecosystem, Architecture' },
      { name: 'UI Screenshot', src: '/assets/images/screenshot-ui.png', context: 'Homepage, UI' },
      { name: 'Feature Screenshot', src: '/assets/images/screenshot-feature.png', context: 'Feature Demo' },
    ];

    return (
        <Router>
          <Routes>
            <Route path="/markdown-test" element={<MarkdownTest />} />
            <Route path="/infographics/1" element={<Infographic1 />} />
            <Route path="/infographics/2" element={<Infographic2 />} />
            <Route path="/infographics/3" element={<Infographic3 />} />
            <Route path="/infographics/spa" element={<SPAInfographic />} />
            <Route path="/" element={
              <div className="bg-slate-50 text-slate-800 font-sans antialiased">
                <header className="bg-white/80 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 border-b border-slate-200">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                    <div className="flex items-center">
                      <span className="font-bold text-xl text-sky-600">Sparrow AI & Tech</span>
                      <span className="hidden sm:inline-block ml-3 text-slate-500">Strategic Blueprint</span>
                    </div>
                    <nav className="hidden md:flex items-center space-x-8">
                      <a href="#home" className="nav-link text-slate-600 hover:text-sky-600">{content.nav.home}</a>
                      <a href="#portfolio" className="nav-link text-slate-600 hover:text-sky-600">{content.nav.portfolio}</a>
                      <a href="#articles" className="nav-link text-slate-600 hover:text-sky-600">{content.nav.articles}</a>
                      <a href="#infographics" className="nav-link text-slate-600 hover:text-sky-600">{content.nav.infographics}</a>
                      <a href="#contact" className="nav-link text-slate-600 hover:text-sky-600">{content.nav.contact}</a>
                      <button onClick={toggleLanguage} className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 text-sm">
                        {language === 'en' ? 'Česky' : 'English'}
                      </button>
                    </nav>
                    <div className="md:hidden">
                      <button onClick={toggleMenu} className="text-slate-600 focus:outline-none">{isMenuOpen ? <CloseIcon /> : <MenuIcon />}</button>
                    </div>
                  </div>
                  {isMenuOpen && (
                    <div className="md:hidden bg-white/90 border-b border-slate-200">
                      <nav className="flex flex-col items-center p-4 space-y-4">
                        <a href="#home" onClick={toggleMenu} className="nav-link text-slate-600 hover:text-sky-600">{content.nav.home}</a>
                        <a href="#portfolio" onClick={toggleMenu} className="nav-link text-slate-600 hover:text-sky-600">{content.nav.portfolio}</a>
                        <a href="#articles" onClick={toggleMenu} className="nav-link text-slate-600 hover:text-sky-600">{content.nav.articles}</a>
                        <a href="#infographics" onClick={toggleMenu} className="nav-link text-slate-600 hover:text-sky-600">{content.nav.infographics}</a>
                        <a href="#contact" onClick={toggleMenu} className="nav-link text-slate-600 hover:text-sky-600">{content.nav.contact}</a>
                        <button onClick={() => { toggleLanguage(); toggleMenu(); }} className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 text-sm">
                          {language === 'en' ? 'Česky' : 'English'}
                        </button>
                      </nav>
                    </div>
                  )}
                </header>
                <main className="pt-20 md:pt-24">
                  <section id="home" className="py-16 md:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">{content.hero.title}</h1>
                      <p className="mt-6 text-lg text-slate-600">{content.hero.subtitle}</p>
                      <p className="max-w-3xl mx-auto text-slate-500 mb-8">{content.hero.description}</p>
                      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                        <a href="#portfolio" className="bg-sky-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-sky-700 transition-all">View the Strategy</a>
                        <a href="#tech" className="bg-white text-slate-700 font-semibold px-6 py-3 rounded-lg border border-slate-300 hover:bg-slate-100 transition-all">Explore the Tech</a>
                        <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition-all flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                          Download CV (PDF)
                        </a>
                      </div>
                    </div>
                  </section>
                  <section id="portfolio" className="py-16 md:py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">{content.portfolio.title}</h2>
                      </div>
                      <div className="mt-12 grid md:grid-cols-2 gap-8 md:gap-12">
                        {content.portfolio.projects.map((project, index) => (
                          <div key={index} className="bg-slate-50 p-8 rounded-lg border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
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
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                  <section id="articles" className="py-16 md:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                      <h2 className="text-3xl font-bold tracking-tight text-slate-900 text-center mb-12">Articles & Documentation</h2>
                      {categorizedArticles.map((cat, idx) => (
                        <div key={cat.category} className="mb-8">
                          <h3 className="text-2xl font-semibold text-sky-700 mb-4">{cat.category}</h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            {cat.articles.map((article, i) => (
                              <a key={i} href={article.url} target="_blank" rel="noopener noreferrer" className="block bg-slate-100 hover:bg-slate-200 p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                                <span className="text-sky-600 font-bold">[{article.lang.toUpperCase()}]</span> <span className="text-lg font-semibold">{article.title}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                  <section id="infographics" className="py-16 md:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <h2 className="text-3xl font-bold tracking-tight text-slate-900 text-center mb-12">Infographics</h2>
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
                          <a key={idx} href={info.url} target="_blank" rel="noopener noreferrer" className="block bg-slate-100 hover:bg-slate-200 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg text-center">
                            <h4 className="text-lg font-semibold text-sky-600 mb-2">{info.title}</h4>
                          </a>
                        ))}
                      </div>
                    </div>
                  </section>
                  <section id="visual-library" className="py-16 md:py-24 bg-white">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                      <h2 className="text-3xl font-bold tracking-tight text-slate-900 text-center mb-12">Visual Library</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {visuals.map((vis, idx) => (
                          <div key={idx} className="bg-slate-100 rounded-lg shadow-md p-6 flex flex-col items-center">
                            <img src={vis.src} alt={vis.name} className="w-full h-48 object-contain mb-4" />
                            <h4 className="text-lg font-semibold text-sky-700 mb-2">{vis.name}</h4>
                            <p className="text-slate-600 text-sm">{vis.context}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                  <section id="contact" className="py-16 md:py-24 bg-white">
                    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                      <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">{content.contact.title}</h2>
                      <p className="text-slate-600 mb-8">{content.contact.description}</p>
                      <a href="mailto:sparrow.ai.tech@gmail.com" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 duration-300 inline-block">
                        {content.contact.button}
                      </a>
                    </div>
                  </section>
                </main>
                <footer className="bg-slate-800 text-slate-400">
                  <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
                    <p>Interactive Strategic Blueprint for Sparrow AI & Tech</p>
                    <p className="mt-2 text-sm">{content.footer.copyright}</p>
                  </div>
                </footer>
              </div>
            } />
          </Routes>
        </Router>
    );
};

export default App; 