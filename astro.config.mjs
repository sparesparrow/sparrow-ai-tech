import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { fileURLToPath } from 'node:url';

function resolve(path) {
  return fileURLToPath(new URL(path, import.meta.url));
}

export default defineConfig({
  integrations: [react(), tailwind({ applyBaseStyles: false })],
  site: 'https://sparesparrow.github.io',
  base: '/sparrow-ai-tech',
  output: 'static',
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto',
  },
  vite: {
    resolve: {
      alias: {
        '@': resolve('./src'),
        '@components': resolve('./src/components'),
        '@core': resolve('./src/components/core'),
        '@ui': resolve('./src/components/ui'),
        '@features': resolve('./src/components/features'),
        '@charts': resolve('./src/components/charts'),
        '@markdown': resolve('./src/components/markdown'),
        '@layouts': resolve('./src/layouts'),
        '@styles': resolve('./src/styles'),
        '@utils': resolve('./src/utils'),
        '@data': resolve('./src/data'),
        '@js': resolve('./src/js'),
        '@content': resolve('./src/content'),
        '@assets': resolve('./public/assets'),
      },
    },
  },
});
