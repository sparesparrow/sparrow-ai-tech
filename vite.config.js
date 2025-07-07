import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/sparrow-ai-tech/', // CRITICAL for GitHub Pages
}); 