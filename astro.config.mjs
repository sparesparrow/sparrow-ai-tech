import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('.', import.meta.url));
console.log('root: ', root);
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
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
        '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
        '@assets': fileURLToPath(new URL('./public/assets', import.meta.url)),
        '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
        '@data': fileURLToPath(new URL('./src/data', import.meta.url)),
        '@content': fileURLToPath(new URL('./src/content', import.meta.url)),
      },
    },
  },
});
