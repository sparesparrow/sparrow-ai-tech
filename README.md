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

```
/astro              # Astro integration (config, pages, tests)
/src                # React app source (components, pages, languages)
/public             # Static assets for deployment (articles, images, css, languages, infographics, .nojekyll, etc.)
/articles           # Markdown articles (source, not directly deployed)
/api                # Backend API (Express, diagrams)
/cypress            # Cypress E2E tests
/dist               # Build output (ignored by git)
/node_modules       # Dependencies (ignored by git)
README.md
TODO.md
.gitignore
package.json
vite.config.js
astro.config.mjs
server.js
```

- All static assets (images, CSS, infographics) are now in `/public/assets/` or `/public/infographics/`.
- Legacy HTML files and unused assets have been removed for clarity and maintainability.

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
