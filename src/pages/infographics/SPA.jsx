import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ecosystemData = [
  {
    name: 'mcp-prompts',
    description: 'The core server for managing, storing, and versioning prompts and templates for LLMs.',
    status: 'In Migration',
    statusColor: 'amber',
    tech: ['TypeScript', 'Node.js', 'PostgreSQL', 'Docker']
  },
  {
    name: 'mcp-router',
    description: 'A tool designed to route requests between different MCP-compliant services.',
    status: 'Beta',
    statusColor: 'sky',
    tech: ['TypeScript', 'Node.js']
  },
  {
    name: 'podman-desktop-extension-mcp',
    description: 'An extension for Podman Desktop to interact with the MCP ecosystem.',
    status: 'Experimental',
    statusColor: 'rose',
    tech: ['JavaScript']
  },
  {
    name: 'awesome-mcp-servers',
    description: 'A curated list of community-built MCP servers and related projects.',
    status: 'Stable',
    statusColor: 'emerald',
    tech: ['Community']
  },
];

const statusColors = {
  'amber': 'bg-amber-100 text-amber-800',
  'sky': 'bg-sky-100 text-sky-800',
  'rose': 'bg-rose-100 text-rose-800',
  'emerald': 'bg-emerald-100 text-emerald-800',
};

const navLinks = [
  { href: '#introduction', label: 'Introduction' },
  { href: '#strategy', label: 'Strategy' },
  { href: '#ecosystem', label: 'Ecosystem' },
  { href: '#tech', label: 'Tech Stack' },
  { href: '#deployment', label: 'Deployment' },
];

export default function SPAInfographic() {
  const ssgChartRef = useRef(null);
  const cssChartRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    // Chart.js SSG
    const ssgChart = new Chart(ssgChartRef.current, {
      type: 'bar',
      data: {
        labels: ['Astro', 'Hugo', 'Next.js', 'Jekyll'],
        datasets: [
          {
            label: 'Dev Experience (JS Dev)',
            data: [10, 6, 9, 3],
            backgroundColor: 'rgba(56, 189, 248, 0.6)',
            borderColor: 'rgba(2, 132, 199, 1)',
            borderWidth: 1
          },
          {
            label: 'Build Performance',
            data: [9, 10, 8, 5],
            backgroundColor: 'rgba(16, 185, 129, 0.6)',
            borderColor: 'rgba(5, 150, 105, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, max: 10, grid: { color: 'rgba(203, 213, 225, 0.5)' } },
          x: { grid: { display: false } }
        },
        plugins: {
          legend: { position: 'bottom' },
          tooltip: {
            backgroundColor: '#1e293b',
            titleFont: { weight: 'bold' },
            bodyFont: { size: 14 },
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) { label += ': '; }
                label += context.parsed.y + '/10';
                return label;
              }
            }
          }
        }
      }
    });
    // Chart.js CSS
    const cssChart = new Chart(cssChartRef.current, {
      type: 'bar',
      data: {
        labels: ['Tailwind CSS', 'Bootstrap'],
        datasets: [
          {
            label: 'Customization',
            data: [10, 6],
            backgroundColor: 'rgba(245, 158, 11, 0.6)',
            borderColor: 'rgba(217, 119, 6, 1)',
            borderWidth: 1
          },
          {
            label: 'Uniqueness of Design',
            data: [9, 4],
            backgroundColor: 'rgba(139, 92, 246, 0.6)',
            borderColor: 'rgba(109, 40, 217, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
          x: { beginAtZero: true, max: 10, grid: { color: 'rgba(203, 213, 225, 0.5)' } },
          y: { grid: { display: false } }
        },
        plugins: {
          legend: { position: 'bottom' },
          tooltip: {
            backgroundColor: '#1e293b',
            titleFont: { weight: 'bold' },
            bodyFont: { size: 14 },
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) { label += ': '; }
                label += context.parsed.x + '/10';
                return label;
              }
            }
          }
        }
      }
    });
    return () => {
      ssgChart.destroy();
      cssChart.destroy();
    };
  }, []);

  // Scrollspy for nav highlighting
  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = headerRef.current.offsetHeight;
      const sections = Array.from(document.querySelectorAll('section'));
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 20;
        if (window.pageYOffset >= sectionTop) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        const el = document.querySelector(`a[href='${link.href}']`);
        if (el) {
          el.classList.remove('active');
          if (link.href === `#${current}`) {
            el.classList.add('active');
          }
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile menu toggle
  const handleMobileMenu = () => {
    if (mobileMenuRef.current) {
      mobileMenuRef.current.classList.toggle('hidden');
    }
  };

  return (
    <div className="bg-slate-50 text-slate-800 antialiased">
      <header ref={headerRef} id="header" className="bg-white/80 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="font-bold text-xl text-sky-600">Sparrow AI & Tech</span>
              <span className="hidden sm:inline-block ml-3 text-slate-500">Strategic Blueprint</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} className="nav-link text-slate-600 hover:text-sky-600">{link.label}</a>
              ))}
            </nav>
            <button id="mobile-menu-button" className="md:hidden p-2 rounded-md text-slate-600 hover:text-sky-600 hover:bg-slate-100" onClick={handleMobileMenu}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
          </div>
        </div>
        <div ref={mobileMenuRef} id="mobile-menu" className="hidden md:hidden">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="nav-link block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-sky-600 hover:bg-slate-100">{link.label}</a>
            ))}
          </nav>
        </div>
      </header>
      <main className="pt-16">
        {/* Introduction */}
        <section id="introduction" className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">A Strategic Blueprint for Growth</h1>
            <p className="mt-6 text-lg text-slate-600">This document presents an interactive visualization of the strategic plan for <span className="font-semibold text-sky-600">Sparrow AI & Tech</span>. It translates the foundational analysis and recommendations into an actionable, explorable format. The core objective is to architect and implement a professional web presence from a "blank slate," leveraging modern best practices to drive project growth, adoption, and community engagement.</p>
            <div className="mt-8 flex justify-center gap-4">
              <a href="#strategy" className="bg-sky-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-sky-700 transition-all">View the Strategy</a>
              <a href="#tech" className="bg-white text-slate-700 font-semibold px-6 py-3 rounded-lg border border-slate-300 hover:bg-slate-100 transition-all">Explore the Tech</a>
            </div>
          </div>
        </section>
        {/* Strategy */}
        <section id="strategy" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">The Strategic Mandate</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">The project's success hinges on a dual-pronged strategy designed to build a defensible brand and provide essential navigation for its community.</p>
            </div>
            <div className="mt-12 grid md:grid-cols-2 gap-8 md:gap-12">
              <div className="bg-slate-50 p-8 rounded-lg border border-slate-200">
                <div className="flex items-center">
                  <div className="bg-sky-100 p-3 rounded-full"><span className="text-2xl">📢</span></div>
                  <h3 className="ml-4 text-xl font-semibold text-slate-900">Evangelize the MCP Standard</h3>
                </div>
                <p className="mt-4 text-slate-600">The primary mission is to establish the <b>Model Context Protocol (MCP)</b> as a credible, well-documented open standard. With other "Sparrow" projects causing brand confusion, MCP is the unique, defensible asset. The website must position MCP as the core identity, with the Sparrow tools serving as its reference implementations.</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-lg border border-slate-200">
                <div className="flex items-center">
                  <div className="bg-sky-100 p-3 rounded-full"><span className="text-2xl">🧭</span></div>
                  <h3 className="ml-4 text-xl font-semibold text-slate-900">Function as a Navigational Hub</h3>
                </div>
                <p className="mt-4 text-slate-600">The ongoing migration to a multi-repository architecture creates complexity. The website must act as a vital piece of infrastructure—a "single source of truth"—that provides a clear map of the ecosystem, clarifying project statuses, locations, and purposes to reduce user friction and foster community confidence.</p>
              </div>
            </div>
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold tracking-tight text-slate-900">MCP: High-Level Architecture</h3>
              <p className="mt-2 max-w-2xl mx-auto text-md text-slate-600">MCP standardizes how applications provide context to language models, acting like a "USB-C port for AI."</p>
              <div className="mt-8 p-6 bg-slate-100 rounded-lg max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 text-sm font-semibold text-slate-700">
                  <div className="diagram-box w-full md:w-1/4 p-4 bg-white rounded-lg shadow-sm text-center">Your Application</div>
                  <div className="diagram-arrow text-sky-500 font-bold text-2xl">&rarr;</div>
                  <div className="diagram-box w-full md:w-1/2 p-4 bg-sky-500 text-white rounded-lg shadow-lg text-center relative group">
                    MCP Server
                    <div className="absolute hidden group-hover:block bottom-full mb-2 w-max p-2 bg-slate-800 text-white text-xs rounded-md">Manages, stores, and versions prompts and templates.</div>
                  </div>
                  <div className="diagram-arrow text-sky-500 font-bold text-2xl">&rarr;</div>
                  <div className="diagram-box w-full md:w-1/4 p-4 bg-white rounded-lg shadow-sm text-center">AI Model (LLM)</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Ecosystem */}
        <section id="ecosystem" className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">The Sparrow AI & Tech Ecosystem</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">An overview of the key projects in the multi-repository architecture. This serves as the official map for navigating the tools.</p>
            </div>
            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ecosystemData.map(project => (
                <div key={project.name} className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-bold text-slate-900">{project.name}</h4>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[project.statusColor]}`}>{project.status}</span>
                  </div>
                  <p className="mt-2 text-slate-600 text-sm">{project.description}</p>
                  <div className="mt-4">
                    {project.tech.map(t => (
                      <span key={t} className="inline-block bg-slate-100 text-slate-600 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Tech Stack */}
        <section id="tech" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Recommended Technology Stack</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">The choice of technology is driven by performance, developer experience, and the strategic need for a unique brand identity.</p>
            </div>
            <div className="mt-12 grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 text-center">Static Site Generator (SSG) Comparison</h3>
                <p className="text-center text-slate-600 mt-2">Astro is recommended for its performance and JS-native environment.</p>
                <div className="mt-4 chart-container" style={{ position: 'relative', width: '100%', maxWidth: 600, margin: '0 auto', height: 350, maxHeight: 400 }}>
                  <canvas ref={ssgChartRef}></canvas>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 text-center">CSS Framework Comparison</h3>
                <p className="text-center text-slate-600 mt-2">Tailwind CSS is recommended for its customization and design control.</p>
                <div className="mt-4 chart-container" style={{ position: 'relative', width: '100%', maxWidth: 600, margin: '0 auto', height: 350, maxHeight: 400 }}>
                  <canvas ref={cssChartRef}></canvas>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Deployment */}
        <section id="deployment" className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Automated Deployment Pipeline</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">A modern, secure CI/CD workflow using GitHub Actions to automate deployment to GitHub Pages, ensuring reliability and eliminating manual errors.</p>
            </div>
            <div className="mt-12 bg-slate-800 text-slate-300 rounded-lg p-6 font-mono text-sm">
              <div className="flex items-center mb-4">
                <span className="text-green-400 mr-2">&#10003;</span>
                <span className="text-slate-400">.github/workflows/deploy.yml</span>
              </div>
              <ol className="space-y-6">
                <li className="group flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-sky-600 text-white rounded-full flex items-center justify-center font-bold ring-4 ring-slate-700">1</div>
                  <div>
                    <h4 className="font-bold text-slate-100">Trigger</h4>
                    <p>Workflow runs on push to <code>main</code> or manual dispatch.</p>
                  </div>
                </li>
                <li className="group flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-sky-600 text-white rounded-full flex items-center justify-center font-bold ring-4 ring-slate-700">2</div>
                  <div>
                    <h4 className="font-bold text-slate-100">Build Job</h4>
                    <p>Checks out code, sets up Node.js v20, installs dependencies with <code>npm ci</code>, and runs <code>npm run build</code>.</p>
                  </div>
                </li>
                <li className="group flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-sky-600 text-white rounded-full flex items-center justify-center font-bold ring-4 ring-slate-700">3</div>
                  <div>
                    <h4 className="font-bold text-slate-100">Upload Artifact</h4>
                    <p>Uses <code>actions/upload-pages-artifact</code> to upload the <code>dist</code> directory.</p>
                  </div>
                </li>
                <li className="group flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-sky-600 text-white rounded-full flex items-center justify-center font-bold ring-4 ring-slate-700">4</div>
                  <div>
                    <h4 className="font-bold text-slate-100">Deploy Job</h4>
                    <p>Depends on successful build, then uses <code>actions/deploy-pages</code> to publish the artifact to GitHub Pages.</p>
                  </div>
                </li>
              </ol>
            </div>
            <div className="mt-8 text-center text-slate-600">
              <p>Final step: Configure the repository's GitHub Pages source setting to <b>"GitHub Actions"</b>.</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-slate-800 text-slate-400">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <p>Interactive Strategic Blueprint for Sparrow AI & Tech</p>
          <p className="mt-2 text-sm">Generated based on the "Strategic Blueprint" report.</p>
        </div>
      </footer>
    </div>
  );
} 