import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    react(),
    tailwind({
      // Disable base styles since we have our own
      applyBaseStyles: false,
    })
  ],
  output: 'static',
  site: 'https://sparesparrow.github.io',
  base: '/sparrow-ai-tech',
  build: {
    assets: 'assets'
  },
  vite: {
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname
      }
    },
    build: {
      rollupOptions: {
        external: []
      }
    }
  }
});
