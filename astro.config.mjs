import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { fileURLToPath } from 'url';
import { join } from 'path';
import rehypeMermaid from 'rehype-mermaid';
import i18n from 'astro-i18n-aut/integration';
import i18nConfig from './astro-i18n.config.mjs';

export default defineConfig({
  site: 'https://sparesparrow.github.io/sparrow-ai-tech',
  base: '/sparrow-ai-tech/',
  integrations: [
    react(),
    i18n(i18nConfig),
  ],
  markdown: {
    rehypePlugins: [
      [rehypeMermaid, { strategy: 'inline' }],
    ],
  },
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});