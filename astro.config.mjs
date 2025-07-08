import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
// https://astro.build/config
export default defineConfig({
  site: 'https://sparesparrow.github.io/sparrow-ai-tech',
  base: '/sparrow-ai-tech/',
  integrations: [react()],
});