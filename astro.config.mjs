import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { fileURLToPath } from 'url';
import rehypeMermaid from 'rehype-mermaid';

export default defineConfig({
  site: 'https://sparesparrow.github.io/sparrow-ai-tech/',
  base: '/sparrow-ai-tech/',
  integrations: [react()],
  markdown: {
    rehypePlugins: [[rehypeMermaid, { strategy: 'img-svg' }]]
  },
  vite: {
    build: { abortOnError: true },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
});
