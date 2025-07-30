import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import path from 'path';

// https://astro.build/config
export default defineConfig({
  site: 'https://sparesparrow.github.io',
  base: '/sparrow-ai-tech',
  integrations: [
    react(),
    tailwind()
  ],
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
        '@components': path.resolve('./src/components'),
        '@layouts': path.resolve('./src/layouts'),
        '@pages': path.resolve('./src/pages'),
        '@utils': path.resolve('./src/utils'),
      }
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'framer-motion',
        'react-router-dom',
        'yet-another-react-lightbox',
        'react-helmet',
        '@testing-library/react'
      ],
      esbuildOptions: {
        loader: {
          '.js': 'jsx'
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'router-vendor': ['react-router-dom'],
            'animation-vendor': ['framer-motion'],
            'ui-vendor': ['yet-another-react-lightbox', 'react-helmet']
          }
        }
      }
    }
  }
});
