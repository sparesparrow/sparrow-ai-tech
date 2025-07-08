import React, { useEffect, useRef } from 'react';

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
      datasets: [{
        label: 'Solutions to Prompt Rot',
        data: [40, 25, 20, 15],
        backgroundColor: ['#F7B801', '#778DA9', '#415A77', '#E0E1DD'],
        borderColor: '#1B263B',
        borderWidth: 4,
        hoverOffset: 8
      }]
    },
    options: {
      plugins: {
        legend: { position: 'bottom', labels: { color: '#E0E1DD' } },
        tooltip: { callbacks: { title: (items) => items[0].label } }
      },
      scales: { x: { display: false }, y: { display: false } },
      maintainAspectRatio: false,
      responsive: true
    }
  });
  useChart('toolchainChart', {
    type: 'bar',
    data: {
      labels: ['mcp-prompts', 'mcp-router', ['mcp-project', 'orchestrator'], 'mcp-prompts-rs'],
      datasets: [{
        label: 'Primary Role',
        data: [85, 90, 75, 95],
        backgroundColor: ['#778DA9', '#415A77', '#778DA9', '#F7B801'],
        borderColor: '#E0E1DD',
        borderWidth: 1,
        barThickness: 25
      }]
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
                'mcp-prompts-rs': 'High-Performance Rust Rewrite'
              };
              let rawLabel = ctx.label;
              if(Array.isArray(rawLabel)) rawLabel = rawLabel.join('');
              rawLabel = rawLabel.replace(/,/g, '');
              return toolRoles[rawLabel] || 'Role';
            }
          }
        }
      },
      scales: {
        x: { ticks: { color: '#E0E1DD' }, grid: { color: '#415A77' } },
        y: { ticks: { color: '#E0E1DD', font: { size: 14 } }, grid: { display: false } }
      },
      maintainAspectRatio: false,
      responsive: true
    }
  });
  useChart('winsChart', {
    type: 'bar',
    data: {
      labels: [
        ['Improved Customer', 'Satisfaction'],
        ['Reduced Code', 'Review Time'],
        ['Reduction in', 'Escalation Rates'],
        ['Improved Code', 'Consistency']
      ],
      datasets: [{
        label: 'Improvement (%)',
        data: [85, 70, 50, 40],
        backgroundColor: ['#F7B801', '#778DA9', '#415A77', '#778DA9'],
        borderColor: '#E0E1DD',
        borderWidth: 0,
        borderRadius: 4
      }]
    },
    options: {
      plugins: { legend: { display: false }, tooltip: { callbacks: { title: (items) => items[0].label } } },
      scales: {
        x: { ticks: { color: '#E0E1DD', font: {size: 10} }, grid: { display: false } },
        y: { beginAtZero: true, max: 100, ticks: { color: '#E0E1DD' }, grid: { color: '#415A77' } }
      },
      maintainAspectRatio: false,
      responsive: true
    }
  });

  // ...HTML structure as JSX, using Tailwind classes, with header/footer integration...
  // For brevity, only the chart logic and setup is shown here. The next step is to convert the rest of the HTML to JSX and wrap it in your app shell.

  return (
    <div className="min-h-screen bg-[#0D1B2A] text-[#E0E1DD]">
      {/* TODO: Insert header/footer from your main app for seamless integration */}
      <div className="container mx-auto p-4 md:p-8">
        {/* ...rest of the infographic content as JSX... */}
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wider gradient-text text-center mb-16">The MCP Ecosystem</h1>
        {/* ...sections, charts, and content... */}
        {/* Example chart container: */}
        <div className="chart-container"><canvas id="promptRotChart"></canvas></div>
        {/* Repeat for other sections and charts */}
      </div>
    </div>
  );
};

export default Infographic1;
