import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));

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
        '@': `${root}src`,
        '@components': `${root}src/components`,
        '@layouts': `${root}src/layouts`,
        '@styles': `${root}src/styles`,
        '@assets': `${root}public/assets`,
        '@utils': `${root}src/utils`,
        '@data': `${root}src/data`,
        '@content': `${root}src/content`,
      },
    },
  },
});
