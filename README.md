# Sparrow AI Tech

## Overview
A modern web project using Astro + React, with full i18n (astro-i18n), Tailwind CSS (dark mode by default with toggle), robust E2E tests (Cypress), unit/component tests (Jest), and backend endpoints for ElevenLabs and PDF generation.

## Folder Structure
- `/src` — Main app source (React, Astro pages, layouts, styles)
- `/public` — Static assets (images, CSS, manifest, favicon, articles, infographics, locales)
- `/articles` — Markdown articles and documentation
- `/infographics` — Standalone HTML infographics
- `/cypress` — Cypress E2E tests, fixtures, support
- `/dist` — Production build output (Astro/Vite)
- `/build` — (Legacy) CRA build output
- `/_site` — (Legacy) Jekyll build output

## Design System
- **Tailwind CSS** for all styling
- **Dark mode** enabled by default, with toggle (respects system preference, persists user choice)
- **Accessible**: semantic HTML, keyboard navigation, aria-labels
- **Testing**: All interactive elements use `data-cy` attributes for robust Cypress selectors

## Setup & Development
```sh
npm install
npm run dev # Start local dev server
npm run build # Build for production
npm run preview # Preview production build
npm test # Run Jest tests
npx cypress open # Run Cypress E2E tests interactively
```

## Testing
- **Jest**: Unit/component tests in `src/components/__tests__` using [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **Cypress**: E2E tests in `cypress/e2e/`
- **Lighthouse CI**: Automated performance checks in CI (see below)

### Running Tests

```sh
npm test # Run all Jest tests
npx cypress open # Run Cypress E2E tests interactively
```

### Writing Component Tests
- Place test files in `src/components/__tests__/` with `.test.jsx` or `.test.js` extension.
- Use [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for rendering and interacting with components.
- Use [jest-dom](https://testing-library.com/docs/ecosystem-jest-dom/) for extended assertions.

## Testing & Quality Assurance
- **Cypress**: E2E tests in `cypress/e2e/` (run with `npm test:e2e` or `npx cypress run`)
- **Jest**: Unit/component tests in `src/components/__tests__/` (run with `npm test`)
- **Lighthouse CI**: Automated performance and accessibility checks in CI

**Note:**
- All E2E and unit tests must pass (`npm test:e2e`, `npm test`) before deployment.
- If any Cypress tests fail, update selectors or test logic as needed (see TODO.md for current status).

## Deployment
- **GitHub Actions**: CI/CD pipeline runs lint, test, build, Lighthouse CI, and deploys to GitHub Pages
- **Astro**: Output in `/dist` (set `site` and `base` in `astro.config.mjs` for subpath deploy)

## Environment Variables & Security
- All API keys (e.g., `ELEVENLABS_API_KEY`) are read from environment variables
- For local dev, create a `.env` file:
  ```env
  ELEVENLABS_API_KEY=your-key-here
  ```
- In CI/CD, set secrets in your GitHub repository settings

## Contributing
- Fork, branch, and submit PRs
- Run all tests before submitting
- Follow code style and accessibility best practices

## Credits & License
- Built with Astro, React, Tailwind CSS, Cypress, Jest
- MIT License

## Internationalization (i18n)
- **astro-i18n** is fully configured for English and Czech.
- Translation files: `public/locales/en/common.json`, `public/locales/cs/common.json`
- Use the translation function in frontend code: `t('header.nav_projects')`
- Key structure example:
  ```json
  {
    "header": {
      "nav_projects": "Projects"
    }
  }
  ```
- See TODO.md for handoff and further details.

## Backend API Endpoints

### /api/pdf
- **POST**: `{ html: string }` or `{ markdown: string }`
- **Response**: `application/pdf` (stream) or `{ error: string }`
- Uses Puppeteer to generate PDF from HTML/Markdown.

### /api/chatbot
- **POST**: `{ text: string, voice_id?: string }`
- **Response**: `audio/mpeg` (stream) or `{ error: string }`
- Proxies to ElevenLabs API, API key is read from environment variables (never exposed to client).

**Security:**
- All API keys and secrets are managed via environment variables. Never commit secrets to the codebase.
