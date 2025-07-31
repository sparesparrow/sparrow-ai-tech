import { defineConfig } from 'vite';

export default defineConfig({
  esbuild: {
    loader: {
      '.js': 'jsx',
    },
  },
});
