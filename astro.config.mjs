import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';

export default defineConfig({
  site: 'https://sparesparrow.github.io',
  base: '/sparrow-ai-tech',
  integrations: [react(), tailwind(),svelte()],
  output: 'static',
  build: {
    assets: '_astro'
  }
});
