import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://sparesparrow.github.io',
  base: '/sparrow-ai-tech',
  output: 'static',
  build: {
    assets: '_astro'
  }
});
