import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  outDir: '../dist', // Output to project root dist for GitHub Pages
  base: '/sparrow-ai-tech/', // Set base for GitHub Pages
});
