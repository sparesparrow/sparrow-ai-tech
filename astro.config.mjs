import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { fileURLToPath } from 'url';
import rehypeMermaid from 'rehype-mermaid';

export default defineConfig({
  site: 'https://sparesparrow.github.io/sparrow-ai-tech/',
  base: '/sparrow-ai-tech/',
  integrations: [react()],
  markdown: {
    rehypePlugins: [
      [rehypeMermaid, { strategy: 'img-svg' }]
    ],
  },
  vite: {
    build: { 
      rollupOptions: {
        onwarn(warning, warn) {
          // Treat warnings as errors in production
          if (process.env.NODE_ENV === 'production') {
            throw new Error(warning.message);
          }
          warn(warning);
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
