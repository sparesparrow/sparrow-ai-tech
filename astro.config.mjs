import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { fileURLToPath } from 'url';
import { join } from 'path';
import i18n from './astro-i18n.config.mjs';

export default defineConfig({

  base: '/sparrow-ai-tech/',
  
  integrations: [
    { name: '@astrojs/react', ...react() },
    { name: 'astro-i18n', ...i18n },
  ],
  i18n: {
    locales: ['en', 'cs'],
    defaultLocale: 'en',
    // Add more i18n options if needed
  },
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});