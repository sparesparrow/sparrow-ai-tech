import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [react(), tailwind()],
  site: 'https://sparesparrow.github.io',
  base: '/sparrow-ai-tech',
  build: {
    assets: 'assets'
  },
  output: 'static',
  trailingSlash: 'never'
});
