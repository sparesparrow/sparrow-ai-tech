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
    <div className="min-h-screen bg-[#0B132B] text-white">
      {/* TODO: Insert header/footer from your main app for seamless integration */}
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wider gradient-text text-center my-16">Human in the Loop</h1>
        {/* ...sections, chart, and content... */}
        <div className="chart-container"><canvas id="reasonsChart"></canvas></div>
      </div>
    </div>
  );
};

export default Infographic2;
