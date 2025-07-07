import React, { useState, useEffect } from 'react';

const App = () => {
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

    const MenuIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>);
    const CloseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>);
    const ExternalLinkIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 ml-1"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>);
    const GithubIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 ml-1"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>);

    return (
        <div className="bg-gray-900 text-gray-200 font-sans leading-normal tracking-normal">
            <header className="bg-gray-900/80 backdrop-blur-sm fixed top-0 w-full z-10">
                <div className="container mx-auto flex items-center justify-between p-4">
                    <div className="text-2xl font-bold text-white">
                        <a href="#home" className="hover:text-indigo-400 transition-colors duration-300">Sparrow AI</a>
                    </div>
                    <nav className="hidden md:flex items-center space-x-6">
                        <a href="#home" className="hover:text-indigo-400 transition-colors duration-300">{content.nav.home}</a>
                        <a href="#portfolio" className="hover:text-indigo-400 transition-colors duration-300">{content.nav.portfolio}</a>
                        <a href="#articles" className="hover:text-indigo-400 transition-colors duration-300">{content.nav.articles}</a>
                        <a href="#infographics" className="hover:text-indigo-400 transition-colors duration-300">{content.nav.infographics}</a>
                        <a href="#contact" className="hover:text-indigo-400 transition-colors duration-300">{content.nav.contact}</a>
                        <button onClick={toggleLanguage} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 text-sm">
                            {language === 'en' ? 'Česky' : 'English'}
                        </button>
                    </nav>
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-white focus:outline-none">{isMenuOpen ? <CloseIcon /> : <MenuIcon />}</button>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden bg-gray-800">
                        <nav className="flex flex-col items-center p-4 space-y-4">
                            <a href="#home" onClick={toggleMenu} className="hover:text-indigo-400">{content.nav.home}</a>
                            <a href="#portfolio" onClick={toggleMenu} className="hover:text-indigo-400">{content.nav.portfolio}</a>
                            <a href="#articles" onClick={toggleMenu} className="hover:text-indigo-400">{content.nav.articles}</a>
                            <a href="#infographics" onClick={toggleMenu} className="hover:text-indigo-400">{content.nav.infographics}</a>
                            <a href="#contact" onClick={toggleMenu} className="hover:text-indigo-400">{content.nav.contact}</a>
                            <button onClick={() => { toggleLanguage(); toggleMenu(); }} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 text-sm">
                                {language === 'en' ? 'Česky' : 'English'}
                            </button>
                        </nav>
                    </div>
                )}
            </header>

            <main>
                <section id="home" className="pt-24 md:pt-32 pb-16 bg-gray-900">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">{content.hero.title}</h1>
                        <p className="text-lg md:text-xl text-indigo-300 mb-6">{content.hero.subtitle}</p>
                        <p className="max-w-3xl mx-auto text-gray-400 mb-8">{content.hero.description}</p>
                         <a href="https://github.com/sparesparrow/sparrow-ai-tech" target="_blank" rel="noopener noreferrer" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 duration-300 inline-block">
                            View on GitHub
                        </a>
                    </div>
                </section>

                <section id="portfolio" className="py-20 bg-gray-800">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">{content.portfolio.title}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {content.portfolio.projects.map((project, index) => (
                                <div key={index} className="bg-gray-900 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-2 flex flex-col">
                                    <div className="p-6 flex-grow">
                                        <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                                        <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="bg-indigo-500/20 text-indigo-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="p-6 bg-gray-900/50 mt-auto flex justify-end gap-4">
                                        {project.liveUrl && (
                                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-white bg-green-600 hover:bg-green-700 py-2 px-4 rounded-lg transition-colors duration-300">
                                                Live Demo <ExternalLinkIcon />
                                            </a>
                                        )}
                                        {project.sourceUrl && (
                                            <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 py-2 px-4 rounded-lg transition-colors duration-300">
                                                Source <GithubIcon />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="articles" className="py-20 bg-gray-900">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">{content.articles.title}</h2>
                        <div className="max-w-2xl mx-auto">
                           {content.articles.list.map((article, index) => (
                               <a key={index} href={article.url} target="_blank" rel="noopener noreferrer" className="block bg-gray-800 hover:bg-gray-700 p-6 rounded-lg shadow-md mb-4 transition-all duration-300 hover:shadow-lg">
                                   <h3 className="text-xl font-semibold text-indigo-400">{article.title}</h3>
                               </a>
                           ))}
                        </div>
                    </div>
                </section>

                <section id="infographics" className="py-20 bg-gray-900">
                  <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
                      {content.infographics.title}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {content.infographics.items.map((item, idx) => (
                        <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer" className="block bg-gray-800 hover:bg-gray-700 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg text-center">
                          <h3 className="text-xl font-semibold text-indigo-400 mb-2">{item.title}</h3>
                          <p className="text-gray-400">{item.description}</p>
                        </a>
                      ))}
                    </div>
                  </div>
                </section>

                <section id="contact" className="py-20 bg-gray-800">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{content.contact.title}</h2>
                        <p className="max-w-xl mx-auto text-gray-400 mb-8">{content.contact.description}</p>
                        <a href="mailto:sparrow.ai.tech@gmail.com" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 duration-300 inline-block">
                            {content.contact.button}
                        </a>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-900 py-6">
                <div className="container mx-auto px-4 text-center text-gray-500">
                    <p>{content.footer.copyright}</p>
                </div>
            </footer>
        </div>
    );
};

export default App; 