# Sparrow AI Tech - Model Context Protocol Pioneer

🌐 **Live Site**: https://sparesparrow.github.io/sparrow-ai-tech/

A professional portfolio website showcasing expertise in Model Context Protocol
(MCP), AI integrations, and modern development practices.

## 🚀 Features

- **Responsive Design**: Modern, mobile-first design with Tailwind CSS
- **MCP Expertise**: Detailed showcase of MCP projects and implementations
- **Interactive Elements**: Dynamic components built with React and Astro
- **Multi-language Content**: Support for Czech and English
- **Performance Optimized**: Fast loading with Astro's static site generation

## 🛠️ Tech Stack

- **Framework**: Astro v5
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Language**: JavaScript/JSX
- **Deployment**: GitHub Pages
- **Testing**: Cypress

## 📦 Installation

Clone the repository git clone
https://github.com/sparesparrow/sparrow-ai-tech.git cd sparrow-ai-tech

Install dependencies npm install

Start development server npm run dev

## 🔧 Development Scripts

npm run dev # Start development server npm run build # Build for production npm
run preview # Preview production build npm run lint # Run ESLint with auto-fix
npm run type-check # Run Astro type checking npm run clean # Clean build
artifacts

## 🌍 Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the
`main` branch.

Manual deployment: npm run build git add dist git commit -m "deploy: update
site" git push origin main

## 🔄 Workflow Status

### Latest Workflow Runs

Last updated: $(date)

**Frontend CI**: ✅ Updated to handle missing pnpm-lock.yaml gracefully
**Deploy**: ✅ Updated to handle missing pnpm-lock.yaml gracefully  
**Backend CI**: ✅ Uses Python/pip, no pnpm dependencies **Content Sync**: ✅
Automated documentation sync from external repos **CV Generate**: ✅ Automated
CV PDF generation and deployment

### Recent Fixes

- **Fixed pnpm lockfile error**: Removed `--frozen-lockfile` flag from workflows
  to allow lockfile generation if missing
- **Added pnpm-lock.yaml**: Committed the generated lockfile to ensure
  consistent dependency resolution
- **Standardized pnpm setup**: All workflows now use pnpm version 9 with
  consistent configuration

## 📝 Project Structure

sparrow-ai-tech/ ├── src/ │ ├── components/ # React components │ ├── layouts/ #
Astro layouts │ ├── pages/ # Astro pages │ └── styles/ # Global styles ├──
public/ # Static assets ├── cypress/ # E2E tests └── dist/ # Build output

# =================================================================

# INITIAL PROJECT SETUP

# =================================================================

# Initialize new npm project with basic metadata

npm init -y

# Set package type to module for ES6 imports

npm pkg set type="module"

# Set basic project metadata

npm pkg set name="sparrow-ai-tech" npm pkg set version="0.2.1" npm pkg set
description="Modern Astro + React web project with AI tools, infographics, and
interactive features" npm pkg set private=true npm pkg set
homepage="https://sparesparrow.github.io/sparrow-ai-tech/" npm pkg set
author="sparesparrow <sparesparrow@protonmail.ch>" npm pkg set license="MIT"

# Set repository information

npm pkg set repository.type="git" npm pkg set
repository.url="https://github.com/sparesparrow/sparrow-ai-tech.git"

# Set Node.js engine requirements

npm pkg set engines.node=">=20.0.0" npm pkg set engines.npm=">=10.0.0"

# =================================================================

# CORE FRAMEWORK DEPENDENCIES (Production)

# =================================================================

# Install Astro framework - main static site generator

npm install astro@^5.12.3

# Install React integration for Astro - enables React components in Astro

npm install @astrojs/react@^4.3.0

# Install Tailwind CSS integration for Astro - utility-first CSS framework

npm install @astrojs/tailwind@^5.1.5

# Install React core libraries - fundamental React dependencies

npm install react@^18.3.1 react-dom@^18.3.1

# Install Tailwind CSS - actual CSS framework (needed in production for styling)

npm install tailwindcss@^3.4.14

# =================================================================

# FEATURE-SPECIFIC DEPENDENCIES (Production)

# =================================================================

# Install Chart.js - for data visualization and charts

npm install chart.js@^4.5.0

# Install Framer Motion - for smooth animations and transitions

npm install framer-motion@^12.23.12

# Install Mermaid - for diagrams, flowcharts, and technical documentation

npm install mermaid@^11.4.0

# Install React Helmet - for SEO meta tags and document head management

npm install react-helmet@^6.1.0

# Install React Markdown - for parsing and rendering markdown content

npm install react-markdown@^10.1.0

# Install React Router DOM - for client-side routing and navigation

npm install react-router-dom@^7.7.1

# Install React Lightbox - for image galleries and modal image viewing

npm install yet-another-react-lightbox@^3.25.0

# =================================================================

# DEVELOPMENT DEPENDENCIES

# =================================================================

# Install Astro Check - for type checking and validation (replaces TypeScript checking)

npm install --save-dev @astrojs/check@^0.9.4

# Install Tailwind Typography - for better markdown and prose styling

npm install --save-dev @tailwindcss/typography@^0.5.16

# Install Cypress - E2E testing framework (only testing tool we keep)

npm install --save-dev cypress@^13.17.0

# Install gh-pages - for automated GitHub Pages deployment

npm install --save-dev gh-pages@^6.1.0

# =================================================================

# PACKAGE.JSON SCRIPTS SETUP

# =================================================================

# Development scripts

npm pkg set scripts.dev="astro dev --host --port 3000" npm pkg set
scripts.start="astro dev --host" npm pkg set scripts.preview="astro preview
--host --port 4321" npm pkg set scripts.astro="astro"

# Build and deployment scripts

npm pkg set scripts.build="astro check && astro build && npm run fix-urls" npm
pkg set scripts.deploy="npm run build && gh-pages -d dist"

# Testing scripts (E2E only)

npm pkg set scripts.test:e2e="cypress run" npm pkg set
scripts.test:e2e:open="cypress open" npm pkg set
scripts.test:e2e:headless="cypress run --headless" npm pkg set
scripts.test:e2e:ci="cypress run --browser chrome --headless"

# Utility scripts

npm pkg set scripts.clean="rm -rf dist .astro node_modules/.cache
cypress/screenshots cypress/videos" npm pkg set scripts.clean:install="npm run
clean && rm -rf node_modules package-lock.json && npm install" npm pkg set
scripts.fix-urls="node scripts/fix-urls.cjs" npm pkg set scripts.verify="node
scripts/verify-deployment.js" npm pkg set scripts.validate="node
scripts/validate-urls.cjs"

# Dependency management scripts

npm pkg set scripts.deps:check="npm outdated" npm pkg set
scripts.deps:audit="npm audit --audit-level moderate"

# =================================================================

# BROWSER SUPPORT CONFIGURATION

# =================================================================

# Set browserslist for target browser support

npm pkg set browserslist='["> 1%", "last 2 versions", "not dead", "not ie 11"]'

# Set keywords for npm registry

npm pkg set keywords='["astro", "react", "tailwindcss", "ai-tools",
"infographics", "mermaid", "chartjs", "github-pages", "static-site"]'

# =================================================================

# VERIFICATION AND CLEANUP

# =================================================================

# Verify installation by checking for vulnerabilities

npm audit --audit-level moderate

# Check for outdated packages

npm outdated

# Run initial build to verify everything works

npm run build

# =================================================================

# DEVCONTAINER CONSIDERATIONS

# =================================================================

# For Dockerfile/devcontainer setup, you would:

# 1. Use Node.js 20+ base image

# 2. Copy package.json and package-lock.json first (for Docker layer caching)

# 3. Run 'npm ci' for production-like install

# 4. Copy source code

# 5. Expose ports 3000 (dev) and 4321 (preview)

# 6. Set NODE_ENV=development for dev containers

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
- **Description:** Proxies user messages to the ElevenLabs API and returns the
  AI-generated reply. The ElevenLabs API key is loaded from the
  `ELEVENLABS_API_KEY` environment variable (never hardcoded).
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
- **Description:** Generates a PDF from the provided HTML using Puppeteer.
- **Security:**
  - Input is validated for presence and type.
  - Puppeteer runs with `--no-sandbox` for compatibility, but for best security,
    run in a containerized environment.
  - [Recommended] Sanitize HTML input and limit payload size to prevent abuse.
  - [Recommended] Add rate limiting.

---

**Security Model & Best Practices:**

- All secrets (API keys) are loaded from environment variables.
- No secrets are logged or exposed in responses.
- Input validation is performed on all endpoints.
- Error messages are generic and do not leak sensitive information.
- [Recommended] Implement rate limiting, CORS, and input size checks for
  production deployments.

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

- DevContainer for VS Code: Preinstalled Node, Astro, React, Cypress, i18n, PDF
  tools.
- Tasks for lint, test, build, E2E, and frontend dev server.
- Parallel workflow for frontend (Track A) and backend/tooling (Track B) agents.
- All scripts and launchers documented in README and TODO.md.

---

## Homepage Design & Visual Storytelling

- **Decorative Text Dividers:**
  - Uses text from `I-will-get-you-deployed.md` as large, subtle background
    dividers between homepage sections.
  - Divider texts are stored in `src/data/decorativeTexts.json` for easy updates
    and i18n.
  - The `DecorativeDivider` React component is used between sections for visual
    rhythm and thematic depth.

- **Visual Storytelling:**
  - Infographics, research highlights, and live editable diagrams are integrated
    directly into the homepage.
  - Animated transitions and subtle effects enhance section changes.
  - A "blueprint" or "system map" visual is used as a persistent background or
    hero element.

- **Developer/AI Agent Experience:**
  - "Dev/Agent Console" section shows build/test/deploy status, recent CI runs,
    and agentic workflow triggers.
  - Live GitHub repo stats and recent deployments are displayed.

- **Testing/Quality UI:**
  - E2E test coverage and accessibility status are shown on the homepage (badges
    or summary panel).
  - A "Test Your Markdown" or "Try Mermaid" live editor block is available for
    users.

## �� Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Contact

- **GitHub**: [@sparesparrow](https://github.com/sparesparrow)
- **Website**: https://sparesparrow.github.io/sparrow-ai-tech/

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

[![Build Status](https://img.shields.io/github/actions/workflow/status/sparesparrow/sparrow-ai-tech/deploy.yml?branch=main)](https://github.com/sparesparrow/sparrow-ai-tech/actions)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue)](https://sparesparrow.github.io/sparrow-ai-tech/)
[![License](https://img.shields.io/github/license/sparesparrow/sparrow-ai-tech)](LICENSE)
