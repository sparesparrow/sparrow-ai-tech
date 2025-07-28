import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { fileURLToPath } from 'url';
import rehypeMermaid from 'rehype-mermaid';

export default defineConfig({
  site: 'https://sparesparrow.github.io/sparrow-ai-tech',
  base: '/',
  integrations: [react()],
  markdown: {
    rehypePlugins: [
      [rehypeMermaid, { strategy: 'img-svg' }]
    ],
  },
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new import.meta.url + '/../src'),
      },
    },
  },
});
