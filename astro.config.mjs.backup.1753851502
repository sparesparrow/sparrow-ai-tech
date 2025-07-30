import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://sparesparrow.github.io',
  base: '/sparrow-ai-tech',
  integrations: [
    react(),
    svelte(),
    tailwind()
  ],
  vite: {
    build: {
      rollupOptions: {
        // Don't externalize these - they should be bundled
        external: [],
        output: {
          // Ensure stable chunk names for better caching
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'markdown-vendor': ['react-markdown', 'remark-gfm'],
            'chart-vendor': ['chart.js', 'react-chartjs-2']
          }
        }
      }
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-markdown',
        'remark-gfm',
        'chart.js',
        'react-chartjs-2'
      ]
    }
  }
});
