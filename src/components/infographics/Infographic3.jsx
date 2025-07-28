import React, { useState, useEffect, useRef, createContext, useContext } from 'react';

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

const Infographic3 = () => {
  useChart('benefitsChart', {
    type: 'radar',
    data: {
      labels: ['Vyměnitelnost', 'Testovatelnost', 'Odolnost', 'Struktura', 'Rozšiřitelnost'],
      datasets: [
        {
          label: 'Hodnocení Architektury',
          data: [95, 100, 90, 85, 95],
          backgroundColor: 'rgba(247, 184, 1, 0.2)',
          borderColor: '#F7B801',
          pointBackgroundColor: '#F7B801',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#F7B801',
        },
      ],
    },
    options: {
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { title: (items) => items[0].label } },
      },
      scales: {
        r: {
          angleLines: { color: 'rgba(74, 85, 104, 0.5)' },
          grid: { color: 'rgba(74, 85, 104, 0.5)' },
          pointLabels: { color: '#E0E1DD', font: { size: 14 } },
          ticks: { color: '#E0E1DD', backdropColor: 'rgba(0,0,0,0.5)', stepSize: 25 },
          suggestedMin: 0,
          suggestedMax: 100,
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    },
  });

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
            className="cursor-default rounded border border-yellow-400 bg-[#0D1B2A] px-4 py-2 font-semibold text-yellow-400 shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
          >
            Infographic 3
          </a>
        </nav>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center">
        <div className="container mx-auto p-4 md:p-8">
          <h1 className="gradient-text my-16 text-center text-4xl font-black uppercase tracking-wider drop-shadow-lg md:text-6xl">
            Hexagonální Architektura
          </h1>
          <div className="mx-auto mb-10 max-w-2xl text-center text-lg text-slate-200/90">
            <p className="mb-4">
              Tato infografika ukazuje, jak{' '}
              <span className="font-bold text-yellow-400">hexagonální architektura</span> (Ports &
              Adapters) zvyšuje <span className="font-bold text-sky-300">odolnost</span>,{' '}
              <span className="font-bold text-sky-300">testovatelnost</span> a{' '}
              <span className="font-bold text-sky-300">rozšiřitelnost</span> aplikací.
            </p>
            <p className="mb-2">Prozkoumejte další vizuály:</p>
            <div className="mt-2 flex flex-wrap justify-center gap-4">
              <a
                href="/sparrow-ai-tech/infographics/1.html"
                className="inline-block rounded-lg bg-sky-700 px-5 py-2 font-semibold text-white shadow transition-all hover:bg-sky-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
              >
                MCP Ecosystem
              </a>
              <a
                href="/sparrow-ai-tech/infographics/2.html"
                className="inline-block rounded-lg bg-sky-700 px-5 py-2 font-semibold text-white shadow transition-all hover:bg-sky-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
              >
                Human-in-the-Loop AI
              </a>
            </div>
          </div>
          <div className="chart-container mx-auto max-w-xl rounded-xl bg-[#1B263B] p-6 shadow-lg">
            <canvas id="benefitsChart"></canvas>
          </div>
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

export default Infographic3;
