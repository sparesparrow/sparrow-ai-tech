# Sparrow AI Tech

<<<<<<< HEAD
=======
[![Build Status](https://img.shields.io/github/actions/workflow/status/sparesparrow/sparrow-ai-tech/deploy.yml?branch=main)](https://github.com/sparesparrow/sparrow-ai-tech/actions)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue)](https://sparesparrow.github.io/sparrow-ai-tech/)
[![License](https://img.shields.io/github/license/sparesparrow/sparrow-ai-tech)](LICENSE)

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Build, Test & Deploy](#build-test--deploy)
- [Homepage Design & Visual Storytelling](#homepage-design--visual-storytelling)
- [E2E Testing](#e2e-testing)
- [Infographics & Visuals](#infographics--visuals)
- [AI Integrations](#ai-integrations)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

>>>>>>> 7dd0b0f (chore: update configuration files and dependencies; remove unused Babel and Jest configurations, enhance ESLint setup, and add Mermaid Editor link in Header component)
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

<<<<<<< HEAD
### Running Tests
=======
## Build, Test & Deploy

### Build
- Uses Astro for static site generation and React for interactive components.
- `npm run build` compiles the site to `/dist` for deployment.
- Playwright is installed as part of the build for server-side Mermaid rendering.
- Static assets (images, infographics, articles) are copied from `/public` and `/assets`.

### Test
- **Linting:**
  - `npm run lint` runs ESLint and Prettier on all code.
  - Pre-commit hook via Husky ensures code is formatted and linted before commit.
- **Unit/Component Tests:**
  - Jest + Testing Library for React components (`npm test`).
  - Coverage for all custom logic and UI components.
- **E2E Tests:**
  - Cypress for user flows, Markdown/Mermaid rendering, error/loading states, accessibility.
  - Run locally (`npx cypress open`) and in CI/CD.
- **Visual Regression:**
  - Playwright snapshot tests (planned) for key UI states.
- **Accessibility:**
  - Lighthouse CI and axe-core integration in CI/CD.

### Deploy
- **CI/CD Pipeline:**
  - GitHub Actions workflow `.github/workflows/deploy.yml`:
    - Lint → Test → Build → Deploy jobs (sequential, fail-fast).
    - Deploys `/dist` to GitHub Pages using `actions/deploy-pages`.
    - Artifacts (e.g., PDF CV) uploaded as part of the build.
  - Separate workflow for PDF CV generation and deployment.
- **Best Practices:**
  - Use `astro.config.mjs` with correct `site` and `base` for GitHub Pages.
  - All secrets (API keys) in environment variables, never in code.
  - Only static HTML/JS/CSS deployed (no server code).

### Developer Experience
- DevContainer for VS Code: Preinstalled Node, Astro, React, Cypress, i18n, PDF tools.
- Tasks for lint, test, build, E2E, and frontend dev server.
- Parallel workflow for frontend (Track A) and backend/tooling (Track B) agents.
- All scripts and launchers documented in README and TODO.md.

---

## Homepage Design & Visual Storytelling

- **Decorative Text Dividers:**
  - Uses text from `I-will-get-you-deployed.md` as large, subtle background dividers between homepage sections.
  - Divider texts are stored in `src/data/decorativeTexts.json` for easy updates and i18n.
  - The `DecorativeDivider` React component is used between sections for visual rhythm and thematic depth.

- **Visual Storytelling:**
  - Infographics, research highlights, and live editable diagrams are integrated directly into the homepage.
  - Animated transitions and subtle effects enhance section changes.
  - A "blueprint" or "system map" visual is used as a persistent background or hero element.

- **Developer/AI Agent Experience:**
  - "Dev/Agent Console" section shows build/test/deploy status, recent CI runs, and agentic workflow triggers.
  - Live GitHub repo stats and recent deployments are displayed.

- **Testing/Quality UI:**
  - E2E test coverage and accessibility status are shown on the homepage (badges or summary panel).
  - A "Test Your Markdown" or "Try Mermaid" live editor block is available for users.

---

## Usage
>>>>>>> 7dd0b0f (chore: update configuration files and dependencies; remove unused Babel and Jest configurations, enhance ESLint setup, and add Mermaid Editor link in Header component)

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

### 1. Voice Chatbot Endpoint

- **POST** `/api/chatbot`
- **Request Body:**
  ```json
  { "message": "<user message>" }
  ```
- **Response:**
  - Success: `{ "reply": "<AI reply>" }`
  - Error: `{ "error": "<error message>" }`
- **Description:**
  Proxies user messages to the ElevenLabs API and returns the AI-generated reply. The ElevenLabs API key is loaded from the `ELEVENLABS_API_KEY` environment variable (never hardcoded).
- **Security:**
  - API key is never exposed to the client or logged.
  - Input is validated for presence and type.
  - All errors are handled gracefully.
  - [Recommended] Add rate limiting and CORS policy for production.

### 2. PDF Generation Endpoint

- **POST** `/api/pdf`
- **Request Body:**
  ```json
  { "html": "<HTML string>" }
  ```
- **Response:**
  - Success: PDF file (`application/pdf`)
  - Error: `{ "error": "<error message>" }`
- **Description:**
  Generates a PDF from the provided HTML using Puppeteer.
- **Security:**
  - Input is validated for presence and type.
  - Puppeteer runs with `--no-sandbox` for compatibility, but for best security, run in a containerized environment.
  - [Recommended] Sanitize HTML input and limit payload size to prevent abuse.
  - [Recommended] Add rate limiting.

---

**Security Model & Best Practices:**
- All secrets (API keys) are loaded from environment variables.
- No secrets are logged or exposed in responses.
- Input validation is performed on all endpoints.
- Error messages are generic and do not leak sensitive information.
- [Recommended] Implement rate limiting, CORS, and input size checks for production deployments.

**Example Usage:**

```bash
# Chatbot
curl -X POST https://<your-domain>/api/chatbot \
  -H 'Content-Type: application/json' \
  -d '{"message": "Hello!"}'

<<<<<<< HEAD
# PDF Generation
curl -X POST https://sparesparrow.github.io/sparrow-ai-tech/api/pdf \
  -H 'Content-Type: application/json' \
  -d '{"html": "<h1>My PDF</h1>"}' --output myfile.pdf
```
=======
## Track B: Backend, Tooling & Automation
- Use the IDE launch script for backend checks: `@track-b-backend.mdc`
- Run lint, test, and build with the VS Code task or `npm run lint && npm run test && npm run build`
- E2E tests: Run with the VS Code task or `npx cypress run`
- i18n: Add translations in `public/locales/en/common.json` and `public/locales/cs/common.json`

## Devcontainer & Dockerfile
- Preinstalled tools for Node, Astro, React, Cypress, i18n, PDF, and automation
- Recommended VS Code extensions for full-stack workflows
- Tasks for frontend, backend, and E2E testing

## Getting Started
1. Open in VS Code with Devcontainer support
2. Use the provided tasks or launch scripts for your workflow
3. See `TODO.md` for roadmap and parallel development guidance

---

## Setup & Run Instructions

- **Install dependencies:** `npm install`
- **Run dev server:** `npm run dev`
- **Build for production:** `npm run build`
- **Run tests:**
  - **Jest (unit/component):** `npm test`
  - **Cypress (E2E):** `npx cypress run`
- **Lint code:** `npx eslint .`
- **Format code:** `npx prettier --write .`
- **Deploy:** CI/CD pipeline deploys to GitHub Pages on push to `main`.
- **Performance & Accessibility:** Lighthouse CI runs automatically in CI/CD and uploads reports as artifacts for each deploy.

---

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

- Fork the repo
- Create a feature branch
- Commit your changes
- Open a pull request

---

## License

This project is licensed under the Apache-2.0 License. See [LICENSE](LICENSE) for details.

---

## Acknowledgements

- [Ultimate Project README Template](https://github.com/jacobmarks/ultimate-project-readme)
- [Cypress](https://www.cypress.io/)
- [Mermaid](https://mermaid-js.github.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ElevenLabs](https://elevenlabs.io/)
- [GitHub Actions](https://github.com/features/actions)

---

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
- [sparesparrow](https://github.com/sparesparrow)
<!-- ALL-CONTRIBUTORS-LIST:END -->

---

> For more info, see the [live site](https://sparesparrow.github.io/sparrow-ai-tech/) or open an issue!

## Development in DevContainer (VS Code Remote)

This project supports development in a DevContainer, enabling both frontend (Track A) and backend (Track B) agents to work in parallel on tasks from `TODO.md`.

### How to Use

1. Install [VS Code](https://code.visualstudio.com/) and the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).
2. Open this project folder in VS Code.
3. When prompted, "Reopen in Container". VS Code will build the container and install all dependencies.
4. Both frontend and backend code can be developed and tested inside the container:
>>>>>>> 7dd0b0f (chore: update configuration files and dependencies; remove unused Babel and Jest configurations, enhance ESLint setup, and add Mermaid Editor link in Header component)
