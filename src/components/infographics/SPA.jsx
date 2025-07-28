// NOTE: Main homepage logic migrated to HomePage.jsx. This file is now for infographics/SPA only.
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ecosystemData = [
  {
    name: 'mcp-prompts',
    description:
      'The core server for managing, storing, and versioning prompts and templates for LLMs.',
    status: 'In Migration',
    statusColor: 'amber',
    tech: ['TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
  },
  {
    name: 'mcp-router',
    description: 'A tool designed to route requests between different MCP-compliant services.',
    status: 'Beta',
    statusColor: 'sky',
    tech: ['TypeScript', 'Node.js'],
  },
  {
    name: 'podman-desktop-extension-mcp',
    description: 'An extension for Podman Desktop to interact with the MCP ecosystem.',
    status: 'Experimental',
    statusColor: 'rose',
    tech: ['JavaScript'],
  },
  {
    name: 'awesome-mcp-servers',
    description: 'A curated list of community-built MCP servers and related projects.',
    status: 'Stable',
    statusColor: 'emerald',
    tech: ['Community'],
  },
];

const statusColors = {
  amber: 'bg-amber-100 text-amber-800',
  sky: 'bg-sky-100 text-sky-800',
  rose: 'bg-rose-100 text-rose-800',
  emerald: 'bg-emerald-100 text-emerald-800',
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
            borderWidth: 1,
          },
          {
            label: 'Build Performance',
            data: [9, 10, 8, 5],
            backgroundColor: 'rgba(16, 185, 129, 0.6)',
            borderColor: 'rgba(5, 150, 105, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, max: 10, grid: { color: 'rgba(203, 213, 225, 0.5)' } },
          x: { grid: { display: false } },
        },
        plugins: {
          legend: { position: 'bottom' },
          tooltip: {
            backgroundColor: '#1e293b',
            titleFont: { weight: 'bold' },
            bodyFont: { size: 14 },
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                label += context.parsed.y + '/10';
                return label;
              },
            },
          },
        },
      },
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
            borderWidth: 1,
          },
          {
            label: 'Uniqueness of Design',
            data: [9, 4],
            backgroundColor: 'rgba(139, 92, 246, 0.6)',
            borderColor: 'rgba(109, 40, 217, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
          x: { beginAtZero: true, max: 10, grid: { color: 'rgba(203, 213, 225, 0.5)' } },
          y: { grid: { display: false } },
        },
        plugins: {
          legend: { position: 'bottom' },
          tooltip: {
            backgroundColor: '#1e293b',
            titleFont: { weight: 'bold' },
            bodyFont: { size: 14 },
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                label += context.parsed.x + '/10';
                return label;
              },
            },
          },
        },
      },
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
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - headerHeight - 20;
        if (window.pageYOffset >= sectionTop) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach((link) => {
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
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#0D1B2A] via-[#1B263B] to-[#415A77] text-[#E0E1DD]">
      <header className="flex w-full items-center justify-between bg-[#1B263B]/80 px-6 py-4 shadow-lg backdrop-blur-lg">
        <a
          href="/sparrow-ai-tech/"
          className="flex items-center gap-2 text-xl font-bold text-sky-400 transition-colors hover:text-yellow-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"
            />
          </svg>
          <span>Sparrow AI & Tech</span>
        </a>
        <nav className="flex gap-4">
          <a
            href="/sparrow-ai-tech/infographics/1.html"
            className="rounded px-4 py-2 font-semibold text-sky-300 transition-colors hover:text-yellow-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
          >
            Infographic 1
          </a>
          <a
            href="/sparrow-ai-tech/infographics/2.html"
            className="rounded px-4 py-2 font-semibold text-sky-300 transition-colors hover:text-yellow-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
          >
            Infographic 2
          </a>
          <a
            href="/sparrow-ai-tech/infographics/3.html"
            className="rounded px-4 py-2 font-semibold text-sky-300 transition-colors hover:text-yellow-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
          >
            Infographic 3
          </a>
          <a
            href="/sparrow-ai-tech/infographics/spa"
            className="cursor-default rounded border border-yellow-400 bg-[#0D1B2A] px-4 py-2 font-semibold text-yellow-400 shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
          >
            SPA
          </a>
        </nav>
      </header>
      <main className="flex-1">{/* ...existing SPA content... */}</main>
      <footer className="mt-12 w-full border-t border-slate-700 bg-[#1B263B] py-8 text-center text-slate-400">
        <div className="mx-auto max-w-7xl px-4">
          <p>
            Part of the{' '}
            <a href="/sparrow-ai-tech/" className="text-sky-400 underline hover:text-yellow-400">
              Sparrow AI & Tech
            </a>{' '}
            infographics series.
          </p>
          <p className="mt-2 text-sm">
            &copy; {new Date().getFullYear()} Sparrow AI Tech. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
