import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { fileURLToPath } from 'url';
import { join } from 'path';
import rehypeMermaid from 'rehype-mermaid';
// Removed: import i18nConfig from './astro-i18n.config.mjs';

export default defineConfig({
  base: '/sparrow-ai-tech/',
  integrations: [
    react(),
    // Removed: i18n(i18nConfig),
  ],
  i18n: {
    locales: ['en', 'cs'],
    defaultLocale: 'en',
    // Add more i18n options if needed
  },
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