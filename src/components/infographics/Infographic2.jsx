import React, { useEffect } from 'react';

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

const Infographic2 = () => {
  useChart('reasonsChart', {
    type: 'doughnut',
    data: {
      labels: ['Safety', 'Quality', 'Ambiguity', 'Creativity', 'Learning'],
      datasets: [{
        label: 'Importance',
        data: [35, 25, 15, 15, 10],
        backgroundColor: ['#5BC0BE', '#6FFFE9', '#4a7c8c', '#3A506B', '#8db9b8'],
        borderColor: '#0B132B',
        borderWidth: 5,
        hoverOffset: 10
      }]
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#BCCCDC', font: { size: 12 }, boxWidth: 15, padding: 20 }
        },
        tooltip: { callbacks: { title: (items) => items[0].label } }
      },
      maintainAspectRatio: false,
      responsive: true
    }
  });

  // ...Convert the rest of the HTML to JSX and integrate with your app shell...
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D1B2A] via-[#1B263B] to-[#415A77] text-[#E0E1DD] flex flex-col">
      <header className="w-full bg-[#1B263B]/80 backdrop-blur-lg shadow-lg py-4 px-6 flex items-center justify-between">
        <a href="/sparrow-ai-tech/" className="flex items-center gap-2 text-sky-400 hover:text-yellow-400 font-bold text-xl transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>
          <span>Sparrow AI & Tech</span>
        </a>
        <nav className="flex gap-4">
          <a href="/sparrow-ai-tech/infographics/1.html" className="text-sky-300 hover:text-yellow-400 font-semibold px-4 py-2 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400">Infographic 1</a>
          <a href="/sparrow-ai-tech/infographics/2.html" className="text-yellow-400 font-semibold px-4 py-2 rounded border border-yellow-400 bg-[#0D1B2A] shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 cursor-default">Infographic 2</a>
          <a href="/sparrow-ai-tech/infographics/3.html" className="text-sky-300 hover:text-yellow-400 font-semibold px-4 py-2 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400">Infographic 3</a>
        </nav>
      </header>
      <main className="flex-1 flex flex-col justify-center items-center">
        <div className="container mx-auto p-4 md:p-8">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wider gradient-text text-center my-16 drop-shadow-lg">Human in the Loop</h1>
          <div className="max-w-2xl mx-auto text-center mb-10 text-lg text-slate-200/90">
            <p className="mb-4">This infographic highlights the <span className="text-yellow-400 font-bold">importance of human action</span> in AI, focusing on <span className="text-sky-300 font-bold">safety</span>, <span className="text-sky-300 font-bold">quality</span>, and <span className="text-sky-300 font-bold">creativity</span> in agentic workflows.</p>
            <p className="mb-2">Explore more visuals:</p>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              <a href="/sparrow-ai-tech/infographics/1.html" className="inline-block bg-sky-700 hover:bg-sky-600 text-white font-semibold px-5 py-2 rounded-lg shadow transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400">MCP Ecosystem</a>
              <a href="/sparrow-ai-tech/infographics/3.html" className="inline-block bg-sky-700 hover:bg-sky-600 text-white font-semibold px-5 py-2 rounded-lg shadow transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400">Hexagonal Architecture</a>
            </div>
          </div>
          <div className="chart-container bg-[#1B263B] rounded-xl shadow-lg p-6 max-w-xl mx-auto"><canvas id="reasonsChart"></canvas></div>
        </div>
      </main>
      <footer className="w-full bg-[#1B263B] text-slate-400 py-8 text-center mt-12 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4">
          <p>Part of the <a href="/sparrow-ai-tech/" className="text-sky-400 hover:text-yellow-400 underline">Sparrow AI & Tech</a> infographics series.</p>
          <p className="mt-2 text-sm">&copy; {new Date().getFullYear()} Sparrow AI Tech. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Infographic2;
