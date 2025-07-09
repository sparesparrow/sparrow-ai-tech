import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import i18n from 'astro-i18n';
// https://astro.build/config
export default defineConfig({
  integrations: [react(), i18n()]
});
