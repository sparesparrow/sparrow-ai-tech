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

const Infographic3 = () => {
  useChart('benefitsChart', {
    type: 'radar',
    data: {
      labels: ['Vyměnitelnost', 'Testovatelnost', 'Odolnost', 'Struktura', 'Rozšiřitelnost'],
      datasets: [{
        label: 'Hodnocení Architektury',
        data: [95, 100, 90, 85, 95],
        backgroundColor: 'rgba(247, 184, 1, 0.2)',
        borderColor: '#F7B801',
        pointBackgroundColor: '#F7B801',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#F7B801'
      }]
    },
    options: {
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { title: (items) => items[0].label } }
      },
      scales: {
        r: {
          angleLines: { color: 'rgba(74, 85, 104, 0.5)' },
          grid: { color: 'rgba(74, 85, 104, 0.5)' },
          pointLabels: { color: '#E0E1DD', font: { size: 14 } },
          ticks: { color: '#E0E1DD', backdropColor: 'rgba(0,0,0,0.5)', stepSize: 25 },
          suggestedMin: 0,
          suggestedMax: 100
        }
      },
      maintainAspectRatio: false,
      responsive: true
    }
  });

  // ...Convert the rest of the HTML to JSX and integrate with your app shell...
  return (
    <div className="min-h-screen bg-[#0D1B2A] text-[#E0E1DD]">
      {/* TODO: Insert header/footer from your main app for seamless integration */}
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wider gradient-text text-center my-16">Hexagonální Architektura</h1>
        {/* ...sections, chart, and content... */}
        <div className="chart-container"><canvas id="benefitsChart"></canvas></div>
      </div>
    </div>
  );
};

export default Infographic3;
