/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { url } from '../../utils/url.js';

// Chart.js is loaded via CDN in the HTML version, but here we use dynamic import for SSR safety
const useChart = (canvasId, config) => {
  useEffect(() => {
    let chartInstance;
    let Chart;
    let destroyed = false;
    import('chart.js/auto').then((mod) => {
      Chart = mod.default;
      if (!destroyed) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        chartInstance = new Chart(ctx, config);
      }
    });
    return () => {
      destroyed = true;
      if (chartInstance) chartInstance.destroy();
    };
  }, [canvasId, config]);
};

const Infographic1 = () => {
  // Chart configs
  useChart('promptRotChart', {
    type: 'doughnut',
    data: {
      labels: ['Centralization', 'Versioning', 'Collaboration', 'Security'],
      datasets: [
        {
          label: 'Solutions to Prompt Rot',
          data: [40, 25, 20, 15],
          backgroundColor: ['#F7B801', '#778DA9', '#415A77', '#E0E1DD'],
          borderColor: '#1B263B',
          borderWidth: 4,
          hoverOffset: 8,
        },
      ],
    },
    options: {
      plugins: {
        legend: { position: 'bottom', labels: { color: '#E0E1DD' } },
        tooltip: { callbacks: { title: (items) => items[0].label } },
      },
      scales: { x: { display: false }, y: { display: false } },
      maintainAspectRatio: false,
      responsive: true,
    },
  });
  useChart('toolchainChart', {
    type: 'bar',
    data: {
      labels: ['mcp-prompts', 'mcp-router', ['mcp-project', 'orchestrator'], 'mcp-prompts-rs'],
      datasets: [
        {
          label: 'Primary Role',
          data: [85, 90, 75, 95],
          backgroundColor: ['#778DA9', '#415A77', '#778DA9', '#F7B801'],
          borderColor: '#E0E1DD',
          borderWidth: 1,
          barThickness: 25,
        },
      ],
    },
    options: {
      indexAxis: 'y',
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: (items) => items[0].label,
            label: (ctx) => {
              const toolRoles = {
                'mcp-prompts': 'Prompt Management & Versioning',
                'mcp_project,orchestrator': 'Project Scaffolding & Automation',
                'mcp-router': 'Intelligent Workflow Orchestration',
                'mcp-prompts-rs': 'High-Performance Rust Rewrite',
              };
              let rawLabel = ctx.label;
              if (Array.isArray(rawLabel)) rawLabel = rawLabel.join('');
              rawLabel = rawLabel.replace(/,/g, '');
              return toolRoles[rawLabel] || 'Role';
            },
          },
        },
      },
      scales: {
        x: { ticks: { color: '#E0E1DD' }, grid: { color: '#415A77' } },
        y: { ticks: { color: '#E0E1DD', font: { size: 14 } }, grid: { display: false } },
      },
      maintainAspectRatio: false,
      responsive: true,
    },
  });
  useChart('winsChart', {
    type: 'bar',
    data: {
      labels: [
        ['Improved Customer', 'Satisfaction'],
        ['Reduced Code', 'Review Time'],
        ['Reduction in', 'Escalation Rates'],
        ['Improved Code', 'Consistency'],
      ],
      datasets: [
        {
          label: 'Improvement (%)',
          data: [85, 70, 50, 40],
          backgroundColor: ['#F7B801', '#778DA9', '#415A77', '#778DA9'],
          borderColor: '#E0E1DD',
          borderWidth: 0,
          borderRadius: 4,
        },
      ],
    },
    options: {
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { title: (items) => items[0].label } },
      },
      scales: {
        x: { ticks: { color: '#E0E1DD', font: { size: 10 } }, grid: { display: false } },
        y: { beginAtZero: true, max: 100, ticks: { color: '#E0E1DD' }, grid: { color: '#415A77' } },
      },
      maintainAspectRatio: false,
      responsive: true,
    },
  });

  // ...HTML structure as JSX, using Tailwind classes, with header/footer integration...
  // For brevity, only the chart logic and setup is shown here. The next step is to convert the rest of the HTML to JSX and wrap it in your app shell.

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
            href={url('infographics/Infographic1/')}
            className="cursor-default rounded border border-yellow-400 bg-[#0D1B2A] px-4 py-2 font-semibold text-yellow-400 shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
          >
            Infographic 1
          </a>
          <a
            href={url('infographics/Infographic1/')}
            className="rounded px-4 py-2 font-semibold text-sky-300 transition-colors hover:text-yellow-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
          >
            Infographic 2
          </a>
          <a
            href={url('infographics/Infographic1/')}
            className="rounded px-4 py-2 font-semibold text-sky-300 transition-colors hover:text-yellow-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
          >
            Infographic 3
          </a>
        </nav>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center">
        <div className="container mx-auto p-4 md:p-8">
          <h1 className="gradient-text mb-16 text-center text-4xl font-black uppercase tracking-wider drop-shadow-lg md:text-6xl">
            The MCP Ecosystem
          </h1>
          <div className="mx-auto mb-10 max-w-2xl text-center text-lg text-slate-200/90">
            <p className="mb-4">
              This infographic shows how the{' '}
              <span className="font-bold text-yellow-400">MCP Ecosystem</span> enables{' '}
              <span className="font-bold text-sky-300">collaboration</span>,{' '}
              <span className="font-bold text-sky-300">versioning</span>, and{' '}
              <span className="font-bold text-sky-300">security</span> for prompt engineering and
              agent workflows.
            </p>
            <p className="mb-2">Explore more visuals:</p>
            <div className="mt-2 flex flex-wrap justify-center gap-4">
              <a
                href={url('infographics/Infographic1/')}
                className="inline-block rounded-lg bg-sky-700 px-5 py-2 font-semibold text-white shadow transition-all hover:bg-sky-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
              >
                Human-in-the-Loop AI
              </a>
              <a
                href={url('infographics/Infographic1/')}
                className="inline-block rounded-lg bg-sky-700 px-5 py-2 font-semibold text-white shadow transition-all hover:bg-sky-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
              >
                Hexagonal Architecture
              </a>
            </div>
          </div>
          <div className="chart-container mx-auto max-w-xl rounded-xl bg-[#1B263B] p-6 shadow-lg">
            <canvas id="promptRotChart"></canvas>
          </div>
          {/* Repeat for other sections and charts as needed */}
        </div>
      </main>
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
};

export default Infographic1;
