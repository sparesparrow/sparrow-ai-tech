import React, { useState, useEffect } from 'react';

// Main App Component
const App = () => {
    // Data for the entire application, structured for easy management.
    // This mimics fetching data from a CMS or API in a real-world scenario.
    const siteData = {
        en: {
            nav: {
                home: 'Home',
                services: 'Services',
                articles: 'Articles',
                contact: 'Contact',
            },
            hero: {
                title: "Sparrow AI Tech",
                subtitle: "Your Partner in IT, Cybersecurity, and AI Development",
                description: "I offer custom IT services, cybersecurity solutions, and AI development. From hardware and software integration with microcontrollers (Arduino, PlatformIO) to creating custom AI solutions, I am here to bring your ideas to life."
            },
            services: {
                title: "My Services",
                list: [
                    { name: "IT & Cybersecurity", description: "Comprehensive IT support and robust security solutions to protect your assets." },
                    { name: "AI Development", description: "Custom AI models and solutions tailored to your specific needs." },
                    { name: "Hardware & Software", description: "Integration of microcontrollers and custom software for complete solutions." },
                    { name: "Consulting", description: "Expert advice to guide your technology decisions and strategy." }
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
                services: 'Služby',
                articles: 'Články',
                contact: 'Kontakt',
            },
            hero: {
                title: "Sparrow AI Tech",
                subtitle: "Váš partner pro IT, kyberbezpečnost a vývoj AI",
                description: "Nabízím na míru šité IT služby, řešení v oblasti kybernetické bezpečnosti a vývoj umělé inteligence. Od integrace hardwaru a softwaru s mikrokontroléry (Arduino, PlatformIO) až po tvorbu vlastních AI řešení, jsem tu, abych realizoval vaše nápady."
            },
            services: {
                title: "Moje Služby",
                list: [
                    { name: "IT & Kyberbezpečnost", description: "Komplexní IT podpora a robustní bezpečnostní řešení pro ochranu vašich aktiv." },
                    { name: "Vývoj AI", description: "Vlastní AI modely a řešení přizpůsobená vašim specifickým potřebám." },
                    { name: "Hardware & Software", description: "Integrace mikrokontrolérů a zakázkového softwaru pro kompletní řešení." },
                    { name: "Konzultace", description: "Odborné poradenství pro vaše technologická rozhodnutí a strategii." }
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

    // State to manage the current language of the site
    const [language, setLanguage] = useState('en');
    // State to hold the content for the currently selected language
    const [content, setContent] = useState(siteData.en);
    // State to manage the mobile menu visibility
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Effect to update the content whenever the language changes
    useEffect(() => {
        setContent(siteData[language]);
        // Also update the lang attribute of the html tag for accessibility
        document.documentElement.lang = language;
    }, [language]);

    // Function to toggle the language between 'en' and 'cs'
    const toggleLanguage = () => {
        setLanguage(prevLang => prevLang === 'en' ? 'cs' : 'en');
    };

    // Function to toggle the mobile menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Icon components for better readability and reusability
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
    
    const CodeIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-indigo-400"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
    );

    const ShieldIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-indigo-400"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
    );

    const BrainIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-indigo-400"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v0A2.5 2.5 0 0 1 9.5 7h-3A2.5 2.5 0 0 1 4 4.5v0A2.5 2.5 0 0 1 6.5 2h3m10.5 0A2.5 2.5 0 0 1 22 4.5v0a2.5 2.5 0 0 1-2.5 2.5h-3A2.5 2.5 0 0 1 14 4.5v0A2.5 2.5 0 0 1 16.5 2h3M9 11.5A2.5 2.5 0 0 1 11.5 9h1A2.5 2.5 0 0 1 15 11.5v1a2.5 2.5 0 0 1-2.5 2.5h-1A2.5 2.5 0 0 1 9 12.5v-1M6.5 15A2.5 2.5 0 0 1 9 17.5v0a2.5 2.5 0 0 1-2.5 2.5h-3A2.5 2.5 0 0 1 1 17.5v0A2.5 2.5 0 0 1 3.5 15h3m10.5 0A2.5 2.5 0 0 1 19 17.5v0a2.5 2.5 0 0 1-2.5 2.5h-3a2.5 2.5 0 0 1-2.5-2.5v0A2.5 2.5 0 0 1 13.5 15h3z"></path></svg>
    );

    const HelpCircleIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-indigo-400"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
    );
    
    const serviceIcons = [<ShieldIcon />, <BrainIcon />, <CodeIcon />, <HelpCircleIcon />];

    return (
        <div className="bg-gray-900 text-gray-200 font-sans leading-normal tracking-normal">
            {/* Header Section */}
            <header className="bg-gray-900/80 backdrop-blur-sm fixed top-0 w-full z-10">
                <div className="container mx-auto flex items-center justify-between p-4">
                    <div className="text-2xl font-bold text-white">
                        <a href="#home" className="hover:text-indigo-400 transition-colors duration-300">Sparrow AI</a>
                    </div>
                    <nav className="hidden md:flex items-center space-x-6">
                        <a href="#home" className="hover:text-indigo-400 transition-colors duration-300">{content.nav.home}</a>
                        <a href="#services" className="hover:text-indigo-400 transition-colors duration-300">{content.nav.services}</a>
                        <a href="#articles" className="hover:text-indigo-400 transition-colors duration-300">{content.nav.articles}</a>
                        <a href="#contact" className="hover:text-indigo-400 transition-colors duration-300">{content.nav.contact}</a>
                        <button onClick={toggleLanguage} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 text-sm">
                            {language === 'en' ? 'Česky' : 'English'}
                        </button>
                    </nav>
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-white focus:outline-none">
                            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-gray-800">
                        <nav className="flex flex-col items-center p-4 space-y-4">
                            <a href="#home" onClick={toggleMenu} className="hover:text-indigo-400 transition-colors duration-300">{content.nav.home}</a>
                            <a href="#services" onClick={toggleMenu} className="hover:text-indigo-400 transition-colors duration-300">{content.nav.services}</a>
                            <a href="#articles" onClick={toggleMenu} className="hover:text-indigo-400 transition-colors duration-300">{content.nav.articles}</a>
                            <a href="#contact" onClick={toggleMenu} className="hover:text-indigo-400 transition-colors duration-300">{content.nav.contact}</a>
                            <button onClick={() => { toggleLanguage(); toggleMenu(); }} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 text-sm">
                                {language === 'en' ? 'Česky' : 'English'}
                            </button>
                        </nav>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main>
                {/* Hero Section */}
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

                {/* Services Section */}
                <section id="services" className="py-20 bg-gray-800">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">{content.services.title}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {content.services.list.map((service, index) => (
                                <div key={index} className="bg-gray-900 p-8 rounded-lg shadow-lg hover:shadow-indigo-500/20 transition-shadow duration-300 text-center transform hover:-translate-y-2">
                                    <div className="mb-4 flex justify-center">{serviceIcons[index]}</div>
                                    <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                                    <p className="text-gray-400">{service.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Articles Section */}
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
                
                {/* Contact Section */}
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

            {/* Footer Section */}
            <footer className="bg-gray-900 py-6">
                <div className="container mx-auto px-4 text-center text-gray-500">
                    <p>{content.footer.copyright}</p>
                </div>
            </footer>
        </div>
    );
};

export default App;
