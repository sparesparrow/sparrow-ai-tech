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
- **Jest**: Unit/component tests in `src/components/__tests__`
- **Cypress**: E2E tests in `cypress/e2e/`
- **Lighthouse CI**: Automated performance checks in CI (see below)

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
