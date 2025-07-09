import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { fileURLToPath } from 'url';
import { join } from 'path';

export default defineConfig({

  base: '/sparrow-ai-tech',
  
  integrations: [react()],
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