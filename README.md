# Sparrow AI Tech

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

## Overview

**Sparrow AI Tech** is a modern, visually unified Single Page Application (SPA) for IT, AI, and cybersecurity consulting. It features:
- Advanced Markdown rendering (with Mermaid diagrams, image previews, and tooltips)
- E2E testing with Cypress and CI/CD via GitHub Actions
- Interactive infographics (React and HTML)
- Multilingual support (English & Czech)
- Automated CV PDF generation and download
- ElevenLabs Conversational AI widget integration

> "Inovace, AI agenti, kybernetická bezpečnost, modernizace IT a vývoj softwaru."

---

## Features

- **SPA-inspired UI**: Modern, responsive, and visually rich homepage and navigation
- **Articles & Documentation**: Categorized, multi-language markdown articles with enhanced rendering
- **Infographics**: Interactive React infographics and standalone HTML visualizations
- **Visual Library**: Centralized, categorized images and diagrams
- **E2E Testing**: Comprehensive Cypress test suite with CI integration
- **AI Integrations**: ElevenLabs Conversational AI widget, prompt engineering, and LLM showcase
- **Automated CV**: GitHub Actions workflow to generate and deploy a PDF CV

---

## Installation

### Requirements
- Node.js (v18+ recommended)
- npm

### Steps
```bash
# Clone the repository
git clone https://github.com/sparesparrow/sparrow-ai-tech.git
cd sparrow-ai-tech

# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build
```

---

## Build, Test & Deploy

### Build
- Uses Astro for static site generation and React for interactive components.
- `npm run build` compiles the site to `./dist` for deployment.
- Playwright is installed as part of the build for server-side Mermaid rendering.
- Static assets (images, infographics, articles) are copied from `./public` and `./assets`.

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
    - Deploys `./dist` to GitHub Pages using `actions/deploy-pages`.
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

- Visit [https://sparesparrow.github.io/sparrow-ai-tech/](https://sparesparrow.github.io/sparrow-ai-tech/) for the live site.
- Explore:
  - **Articles**: `./articles/` (Markdown, Mermaid, tooltips)
  - **Infographics**: `./infographics/` (React & HTML)
  - **Visual Library**: `./assets/images/`
  - **CV Download**: `./cv.pdf`

### Example: Rendering Markdown with Mermaid
```jsx
import MarkdownViewer from '@/components/MarkdownViewer';
<MarkdownViewer src={`import.meta.env.BASE_URL}articles/hexagonal-architecture-in-mcp.md`} />
```
- Note: *If you're using any hardcoded absolute paths in your components, you might need to update them to use Astro's import.meta.env.BASE_URL for dynamic base path handling*
---

## E2E Testing

- Run Cypress tests locally:
```bash
npx cypress open
```
- E2E tests run automatically in CI/CD via GitHub Actions.
- Coverage includes: Markdown rendering, Mermaid diagrams, image previews, tooltips, error/loading states, and accessibility.

---

## Infographics & Visuals

- **React Infographics**: `./infographics/1`, `./infographics/2`, `./infographics/3`, `./infographics/spa`
- **HTML Infographics**: `./infographics/1.html`, `./infographics/SPA.html`, etc.
- **Visual Library**: `./assets/images/` (diagrams, screenshots)

---

## AI Integrations

- **ElevenLabs Conversational AI Widget**: Embedded in `index.html` for live chat
- **Prompt Engineering & LLM Demos**: See articles and infographics for examples

---

## Backend API Endpoints

### Voice Chatbot API
- **Endpoint:** `POST /api/chatbot`
- **Request body:** `{ message: string }`
- **Response:** `{ reply: string }` (or `{ error: string }`)
- **Description:** Proxies requests to the ElevenLabs API securely using an environment variable for the API key.
- **Security:** Never expose your ElevenLabs API key to the frontend. Store it in environment variables (e.g., `.env`) and access only on the server side.

### PDF Generation API
- **Endpoint:** `POST /api/pdf`
- **Request body:** `{ html: string }`
- **Response:** PDF file (`application/pdf`), or `{ error: string }` on failure
- **Description:** Generates a PDF from provided HTML using Puppeteer and returns it as a downloadable file.

---

## Internationalization (i18n)

- i18n is powered by `astro-i18n`.
- Translation files are located in `public/locales/en/common.json` and `public/locales/cs/common.json`.
- **Key structure example:**
  ```json
  {
    "header": {
      "nav_projects": "Projects",
      "nav_skills": "Skills",
      "nav_about": "About",
      "nav_contact": "Contact"
    },
    "projects": {
      "title": "My Projects"
    }
  }
  ```
- **Usage in frontend:** Use the translation function as `t('header.nav_projects')`, `t('projects.title')`, etc.

---

## Project Structure

- `src/layouts/` — Astro layouts (e.g., MainLayout.astro)
- `src/components/` — React components (Header, Footer, etc.)
- `src/styles/` — Global, theme, and typography CSS
- `public/locales/` — i18n translation files (en, cs)
- `.devcontainer/` — Devcontainer config for VS Code/remote
- `.cursor/rules/` — IDE launch scripts and Cursor rules

## Track A: Frontend & User Experience
- Use `src/layouts/MainLayout.astro` for page layouts
- Use `src/components/Header.jsx` and `Footer.jsx` for navigation and footer
- Use `src/styles/theme.css` and `typography.css` for design system
- Run the frontend dev server with the VS Code task or `npm run dev`

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
