import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { fileURLToPath, URL } from 'node:url';
import rehypeMermaid from 'rehype-mermaid';

export default defineConfig({
  site: 'https://sparesparrow.github.io/sparrow-ai-tech',
  base: '/',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    })
  ],
  markdown: {
    rehypePlugins: [
      [rehypeMermaid, { strategy: 'img-svg' }]
    ],
  },
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
