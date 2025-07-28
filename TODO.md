# TODOs - A Parallel Roadmap for a pair of AI Agents

**Task Status Legend:**

- [Done] = Not started
- [Done] = Work in progress
- [Done] = Feature/code implemented, not yet tested
- [Tested] = Fully tested and verified
- [Done] = Blocked, needs assistance
- [Done] = Complete

This roadmap is optimized for two developers or AI agents working in parallel. It uses a high-granularity, command-driven approach to minimize ambiguity and maximize autonomy.

## Content & Structure Cleanup

- [Done] Move all test/demo markdown files out of `./articles` to `./cypress/fixtures/articles`
- [Done] Remove all `.md` duplicates from `./public/articles`, keeping only `.html` files for static hosting
- [Done] Standardize article language management: use `article.md` (EN), `article.cs.md` (CZ), and extend with `article.[lang].md` for future languages
- [Done] Commit and push all changes to remote repository

---

## Kick-off & Initial Synchronization

**Goal:** Align on foundational structures to prevent merge conflicts.

- [Done] Agreement on File Structure:
  - [Done] Components: All React components will reside in `src/components/`.
  - [Done] Layouts: All Astro layouts will reside in `src/layouts/`.
  - [Done] Styles: Global styles and CSS variables will be in `src/styles/`.
  - [Done] Assets: All static images and fonts will be in `public/assets/`.
- [Done] Agreement on Naming Conventions:
  - [Done] Components will be PascalCase (e.g., `HeroSection.jsx`).
  - [Done] CSS classes will be kebab-case (e.g., `.hero-section`).

---

## Track A: Frontend & User Experience (Agent 1)

### Interactivity & Feature Implementation

### Sprint 1: Design System & Static Page Implementation

- [Done] 1. Implement the Design System:
  - [Done] Create `src/styles/theme.css` and define all color palette and spacing variables.
  - [Done] Create `src/styles/typography.css` and define global styles for fonts, headings, and body text.
  - [Done] Import these stylesheets into the main layout file.
  - [Done] **Done when:** Style variables are defined and can be used in components.
- [Done] 2. Create Global UI Components:
  - [Done] Create `src/layouts/MainLayout.astro`. This layout should import the CSS files and include slots for `<Header>`, `<body>`, and `<Footer>`.
  - [Done] Create `src/components/Header.jsx` with static placeholder navigation links and a placeholder UI for the language switcher.
  - [Done] Create `src/components/Footer.jsx` with static links and information.
  - [Done] **Done when:** The main layout can be used to wrap a page, displaying a consistent header and footer.
- [Done] 3. Build Static Homepage Sections:
  - [Done] Create the following React components in `src/components/`:
    - [Done] `HeroSection.jsx`
    - [Done] `ProjectsSection.jsx` (or equivalent, e.g., ServicesSection/ArticlesSection)
    - [Done] `SkillsSection.jsx` (or equivalent, e.g., PopularReposSection)
    - [Done] `AboutSection.jsx`
  - [Done] Create the main page at `src/pages/index.astro`. Import and assemble the section components within `<MainLayout.astro>` (or via HomePage.jsx).
  - [Done] **Done when:** The homepage renders with all static sections visible.
- [Done] 4. Implement Responsiveness:
  - [Done] Add CSS media queries to `theme.css` or individual component stylesheets (via Tailwind responsive classes in global.css and components).
  - [Done] Ensure all components and layouts from this sprint are fully responsive across mobile, tablet, and desktop breakpoints.
  - [Done] **Done when:** The layout reflows correctly on all target screen sizes without horizontal scrollbars.
- [Done] 5. Visuals and Assets:
  - [Done] Place all selected images in `public/assets/images/` with descriptive, kebab-case names.
  - [Done] Use Astro's `<Image />` component for optimization within `.astro` files and standard `<img>` tags in `.jsx` files, referencing the public paths.
  - [Done] Add `data-cy` attributes to all key interactive elements (buttons, links) for Track B's testing.
  - [Done] **Done when:** Images are displayed correctly, and E2E test selectors are in place.

### Sprint 2: Interactivity & Feature Implementation

- [Done] 1. Implement Functional Navigation:
  - [Done] Make all navigation links work, enabling smooth scrolling to page sections.
  - [Done] Ensure all external links (GitHub, demos) in the homepage and infographics sections are correct and open in a new tab.
  - [Done] PDF Generation: Build the frontend for the "Download as PDF" feature (button POSTs to /api/pdf and downloads PDF).
  - [Done] Voice Chatbot: Implement the UI for the ElevenLabs chatbot (UI connects to /api/chatbot endpoint).
- [Done] 3. Activate Localization:
  - [Done] Use the i18n function and JSON key structure provided by Track B.
  - [Done] Connect the language switcher UI to the i18n framework to enable language changes.
  - [Done] Wrap all static text in UI components with the translation function.
  - [Done] PDF Generation: Build the frontend for the "Download as PDF" feature (button present, triggers print for now).
  - [Done] Voice Chatbot: Implement the UI for the ElevenLabs chatbot (UI present, backend pending Track B handoff).
- [Done] 3. Activate Localization:
  - [Done] **Dependency:** Use the i18n function and JSON key structure provided by Track B.
  - [Done] Connect the language switcher UI to the i18n framework to enable language changes.
  - [Done] Wrap all static text in UI components with the translation function.

---

## Track B: Backend, Tooling & Automation (Agent 2)

**Focus:** Build the project's foundation, including testing, deployment, and backend integrations. This track ensures the project is robust, maintainable, and deployable.

### Project Foundation & CI/CD

- [Done] 1. Project & Content Cleanup:
  - [Done] Perform all file moving and standardization tasks from the "Content & Structure Cleanup" section of the original TODO list.
  - [Done] **Done when:** The project's file structure is clean and follows the agreed-upon conventions.
- [Done] 2. Set Up Tooling & Linters:
  - [Done] Run `npm install --save-dev eslint prettier eslint-plugin-react @typescript-eslint/parser husky lint-staged`.
  - [Done] Configure `.eslintrc.cjs` and `.prettierrc`.
  - [Done] Run `npx husky-init` and configure lint-staged in `package.json` to run Prettier and ESLint on pre-commit.
  - [Done] **Done when:** The pre-commit hook successfully formats and lints staged files.
  - [Done] Add a final deploy job that uses the `actions/deploy-pages` action to deploy the `dist/` folder to GitHub Pages.
  - [Done] **Done when:** The pipeline successfully runs and deploys the github page.

- [Done] 1. Project & Content Cleanup:
  - [Done] Perform all file moving and standardization tasks from the "Content & Structure Cleanup" section of the original TODO list.
  - [Done] **Done when:** The project's file structure is clean and follows the agreed-upon conventions.
- [Done] 2. Set Up Tooling & Linters:
  - [Done] Run `npm install --save-dev eslint prettier eslint-plugin-react @typescript-eslint/parser husky lint-staged`.
  - [Done] Configure `.eslintrc.cjs` and `.prettierrc`.
  - [Done] Run `npx husky-init` and configure lint-staged in `package.json` to run Prettier and ESLint on pre-commit.
  - [Done] **Done when:** The pre-commit hook successfully formats and lints staged files.
- [Done] 3. Configure CI/CD Pipeline (GitHub Actions):
  - [Done] Create `.github/workflows/deploy.yml`.
  - [Done] The workflow should trigger on push to main and on pull_request.
  - [Done] Define jobs for: lint, test, and build.
  - [Done] Add a final deploy job that uses the `actions/deploy-pages` action to deploy the `dist/` folder to GitHub Pages.
  - [Done] **Done when:** The pipeline successfully runs and deploys the initial empty project.
- [Done] 4. Set Up Testing Frameworks:
  - [Done] Install and configure Cypress for E2E testing (`npx cypress init`).
  - [Done] Install and configure Jest and Testing Library for component testing.
  - [Done] Fix any existing failing Cypress tests by updating selectors or test logic.
  - [Done] **Done when:** `npm install` , `npm run lint`, `npm test:e2e`, `npm run build` and `npm test:ci` execute without errors.

- [Done] 5. Set Up Internationalization (i18n) Framework:
  - [Done] Integrate and configure astro-i18n.
  - [Done] Create `public/locales/en/common.json` and `public/locales/cs/common.json`.
  - [Done] Define a clear structure for translation keys (e.g., `{ "header": { "nav_projects": "Projects" } }`).
  - [Done] **Done when:** The i18n utility is configured and ready for the frontend to use. **Handoff:** Use `t('header.nav_projects')` and the provided key structure in frontend components.

---

## Track A: Frontend & User Experience (Agent 1)

### Sprint 2: Interactivity & Feature Implementation

- [Done] 1. Implement Functional Navigation:
  - [Done] Make all navigation links work, enabling smooth scrolling to page sections.
  - [Done] Ensure all external links (GitHub, demos) in the homepage and infographics sections are correct and open in a new tab.
- [Done] 2. Develop Key Interactive Features:
  - [Done] PDF Generation: Build the frontend for the "Download as PDF" feature (button POSTs to /api/pdf and downloads PDF).
  - [Done] Voice Chatbot: Implement the UI for the ElevenLabs chatbot (UI connects to /api/chatbot endpoint).
- [Done] 3. Activate Localization:
  - [Done] Use the i18n function and JSON key structure provided by Track B.
  - [Done] Connect the language switcher UI to the i18n framework to enable language changes.
  - [Done] Wrap all static text in UI components with the translation function.

- [Done] 1. Implement Functional Navigation:
  - [Done] Make all navigation links work, enabling smooth scrolling to page sections.
  - [Done] Ensure all external links (GitHub, demos) in the homepage and infographics sections are correct and open in a new tab.
- [Done] 2. Develop Key Interactive Features:
  - [Done] PDF Generation: Build the frontend for the "Download as PDF" feature (button POSTs to /api/pdf and downloads PDF).
  - [Done] Voice Chatbot: Implement the UI for the ElevenLabs chatbot (UI connects to /api/chatbot endpoint).
- [Done] 3. Activate Localization:
  - [Done] Use the i18n function and JSON key structure provided by Track B.
  - [Done] Connect the language switcher UI to the i18n framework to enable language changes.
  - [Done] Wrap all static text in UI components with the translation function.

---

## Track B: Backend, Tooling & Automation (Agent 2)

### Backend Integrations & Testing

- [Done] 1. Implement Backend for Features:
  - [Done] Voice Chatbot: Create a serverless function (`./api/chatbot.js`) to securely handle API calls to the ElevenLabs API. **Handoff:** Provide the API contract (endpoint URL, request/response format) to Agent A.
  - [Done] PDF Generation: If server-side rendering is chosen for the PDF, set up the necessary endpoint.
- [Tested] 2. Write Comprehensive Tests:
  - [Tested] Backend API endpoint tests implemented (including SVG sanitization and XSS vectors)
  - [Done] Component Tests: Write unit tests for any complex, non-UI logic.
  - [Done] E2E Tests: **Dependency:** Use the `data-cy` attributes provided by Track A. Write new Cypress tests for the key user flows (language switching, PDF download, opening chatbot). Backend API endpoint tests implemented.
- [Done] 3. Finalize Documentation:
  - [Done] Update `README.md` with the final project structure, design system documentation, and detailed setup/run instructions.
- [Done] 4. Optimize and Secure:
  - [Done] Set up Lighthouse CI in the `deploy.yml` workflow to report on performance and accessibility.
  - [Done] Review for security best practices, especially around API key handling for the chatbot (use environment variables).
  - [Done] **Done when:** `npm install` , `npm run lint`, `npm test:e2e`, `npm run build` and `npm test:ci` execute without errors.

---

### Synchronization Point

**Goal:** Integrate the interactive frontend with backend logic and finalize testing for release.

**Process:**

- A new `release/v1.0` branch is created from main.
- Both agents create pull requests for theirwork into the `release/v1.0` branch.
- **Integration & Testing:** The release branch is tested end-to-end. All E2E tests must pass.
- Once stable, `release/v1.0` is merged into main, triggering the final deployment.
- **Outcome:** A fully functional, interactive, tested, and deployed web application.

- [Done] Implement interactive Mermaid editor at /mermaid-editor with live preview, error handling, copy/clear, keyboard shortcuts, accessibility, and robust E2E Cypress tests using data-cy attributes.
  - [ ] Scaffold Python FastAPI backend (mcp-mermaid-generator)
  - [ ] Implement /generate_diagram and /validate_syntax endpoints
  - [ ] Integrate LLM (OpenAI, Ollama, or MermaidLlama)
  - [ ] Integrate prompt server or local prompt templates
  - [Done] Validate and sanitize Mermaid code
  - [Done] Render SVG via Playwright (Python or mermaid-cli)
  - [Done] Sanitize SVG output
  - [ ] Dockerize the backend
  - [ ] Add CI/CD workflow for build, test, deploy
  - [ ] Document API contract and security measures
