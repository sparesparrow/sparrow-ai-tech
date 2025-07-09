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

## Usage

- Visit [https://sparesparrow.github.io/sparrow-ai-tech/](https://sparesparrow.github.io/sparrow-ai-tech/) for the live site.
- Explore:
  - **Articles**: `/articles/` (Markdown, Mermaid, tooltips)
  - **Infographics**: `/infographics/` (React & HTML)
  - **Visual Library**: `/assets/images/`
  - **CV Download**: `/cv.pdf`

### Example: Rendering Markdown with Mermaid
```jsx
import MarkdownViewer from '@/components/MarkdownViewer';
<MarkdownViewer src="/articles/hexagonal-architecture-in-mcp.md" />
```

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

- **React Infographics**: `/infographics/1`, `/infographics/2`, `/infographics/3`, `/infographics/spa`
- **HTML Infographics**: `/infographics/1.html`, `/infographics/SPA.html`, etc.
- **Visual Library**: `/assets/images/` (diagrams, screenshots)

---

## AI Integrations

- **ElevenLabs Conversational AI Widget**: Embedded in `index.html` for live chat
- **Prompt Engineering & LLM Demos**: See articles and infographics for examples

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
   - **Frontend (Track A):** Work on React/Astro components, layouts, and styles in `src/`.
   - **Backend (Track B):** Work on automation, CI/CD, API endpoints, and tests as described in `TODO.md`.
5. The devcontainer comes pre-configured with recommended extensions for Astro, React, ESLint, Prettier, and Cypress.

### Ports
- The Astro/Vite dev server runs on port 3000 (forwarded by default).

### Parallel Agent Workflow
- Both agents can work simultaneously in the same environment, following the roadmap in `TODO.md` and the rules in `@track-a-frontend.mdc` and `@track-b-backend.mdc`.

---
