import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://sparesparrow.github.io/sparrow-ai-tech',
    video: false,
    screenshotOnRunFailure: false,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
  },
});
