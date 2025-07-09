# TODOs - A Parallel Roadmap for a pair of AI Agents

**Task Status Legend:**
- [ToDo] = Not started
- [InProgress] = Work in progress
- [Implemented] = Feature/code implemented, not yet tested
- [Tested] = Fully tested and verified
- [HelpNeeded] = Blocked, needs assistance
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

- [Implemented] 1. Implement the Design System:
  - [Implemented] Create `src/styles/theme.css` and define all color palette and spacing variables.
  - [Implemented] Create `src/styles/typography.css` and define global styles for fonts, headings, and body text.
  - [Implemented] Import these stylesheets into the main layout file.
  - [Implemented] **Done when:** Style variables are defined and can be used in components.
- [Implemented] 2. Create Global UI Components:
  - [Implemented] Create `src/layouts/MainLayout.astro`. This layout should import the CSS files and include slots for `<Header>`, `<body>`, and `<Footer>`.
  - [Implemented] Create `src/components/Header.jsx` with static placeholder navigation links and a placeholder UI for the language switcher.
  - [Implemented] Create `src/components/Footer.jsx` with static links and information.
  - [Implemented] **Done when:** The main layout can be used to wrap a page, displaying a consistent header and footer.
- [Implemented] 3. Build Static Homepage Sections:
  - [Implemented] Create the following React components in `src/components/`:
    - [Implemented] `HeroSection.jsx`
    - [Implemented] `ProjectsSection.jsx` (or equivalent, e.g., ServicesSection/ArticlesSection)
    - [Implemented] `SkillsSection.jsx` (or equivalent, e.g., PopularReposSection)
    - [Implemented] `AboutSection.jsx`
  - [Implemented] Create the main page at `src/pages/index.astro`. Import and assemble the section components within `<MainLayout.astro>` (or via HomePage.jsx).
  - [Implemented] **Done when:** The homepage renders with all static sections visible.
- [Implemented] 4. Implement Responsiveness:
  - [Implemented] Add CSS media queries to `theme.css` or individual component stylesheets (via Tailwind responsive classes in global.css and components).
  - [Implemented] Ensure all components and layouts from this sprint are fully responsive across mobile, tablet, and desktop breakpoints.
  - [Implemented] **Done when:** The layout reflows correctly on all target screen sizes without horizontal scrollbars.
- [Implemented] 5. Visuals and Assets:
  - [Implemented] Place all selected images in `public/assets/images/` with descriptive, kebab-case names.
  - [Implemented] Use Astro's `<Image />` component for optimization within `.astro` files and standard `<img>` tags in `.jsx` files, referencing the public paths.
  - [Implemented] Add `data-cy` attributes to all key interactive elements (buttons, links) for Track B's testing.
  - [Implemented] **Done when:** Images are displayed correctly, and E2E test selectors are in place.

### Sprint 2: Interactivity & Feature Implementation

- [Implemented] 1. Implement Functional Navigation:
  - [Implemented] Make all navigation links work, enabling smooth scrolling to page sections.
  - [Implemented] Ensure all external links (GitHub, demos) in the homepage and infographics sections are correct and open in a new tab.
  - [Implemented] PDF Generation: Build the frontend for the "Download as PDF" feature (button POSTs to /api/pdf and downloads PDF).
  - [Implemented] Voice Chatbot: Implement the UI for the ElevenLabs chatbot (UI connects to /api/chatbot endpoint).
- [Implemented] 3. Activate Localization:
  - [Implemented] Use the i18n function and JSON key structure provided by Track B.
  - [Implemented] Connect the language switcher UI to the i18n framework to enable language changes.
  - [Implemented] Wrap all static text in UI components with the translation function.
  - [Implemented] PDF Generation: Build the frontend for the "Download as PDF" feature (button present, triggers print for now).
  - [Implemented] Voice Chatbot: Implement the UI for the ElevenLabs chatbot (UI present, backend pending Track B handoff).
- [HelpNeeded] 3. Activate Localization:
  - [HelpNeeded] **Dependency:** Use the i18n function and JSON key structure provided by Track B.
  - [HelpNeeded] Connect the language switcher UI to the i18n framework to enable language changes.
  - [HelpNeeded] Wrap all static text in UI components with the translation function.

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
  - [Implemented] Add a final deploy job that uses the `actions/deploy-pages` action to deploy the `dist/` folder to GitHub Pages.
  - [ToDo] **Done when:** The pipeline successfully runs and deploys the github page.

- [Done] 1. Project & Content Cleanup:
  - [Done] Perform all file moving and standardization tasks from the "Content & Structure Cleanup" section of the original TODO list.
  - [Done] **Done when:** The project's file structure is clean and follows the agreed-upon conventions.
- [Done] 2. Set Up Tooling & Linters:
  - [Done] Run `npm install --save-dev eslint prettier eslint-plugin-react @typescript-eslint/parser husky lint-staged`.
  - [Done] Configure `.eslintrc.cjs` and `.prettierrc`.
  - [Done] Run `npx husky-init` and configure lint-staged in `package.json` to run Prettier and ESLint on pre-commit.
  - [Done] **Done when:** The pre-commit hook successfully formats and lints staged files.
- [ToDo] 3. Configure CI/CD Pipeline (GitHub Actions):
  - [ToDo] Create `.github/workflows/deploy.yml`.
  - [ToDo] The workflow should trigger on push to main and on pull_request.
  - [ToDo] Define jobs for: lint, test, and build.
  - [ToDo] Add a final deploy job that uses the `actions/deploy-pages` action to deploy the `dist/` folder to GitHub Pages.
  - [ToDo] **Done when:** The pipeline successfully runs and deploys the initial empty project.
- [ToDo] 4. Set Up Testing Frameworks:
  - [Done] Install and configure Cypress for E2E testing (`npx cypress init`).
  - [HelpNeeded] Install and configure Jest and Testing Library for component testing.
  - [InProgress] Fix any existing failing Cypress tests by updating selectors or test logic.
  - [ToDo] **Done when:** `npm install` , `npm run lint`, `npm test:e2e`,  `npm run build` and `npm test:ci`  execute without errors.


- [Implemented] 5. Set Up Internationalization (i18n) Framework:
  - [Implemented] Integrate and configure astro-i18n.
  - [Implemented] Create `public/locales/en/common.json` and `public/locales/cs/common.json`.
  - [Implemented] Define a clear structure for translation keys (e.g., `{ "header": { "nav_projects": "Projects" } }`).
  - [Implemented] **Done when:** The i18n utility is configured and ready for the frontend to use. **Handoff:** Use `t('header.nav_projects')` and the provided key structure in frontend components.

---

## Track A: Frontend & User Experience (Agent 1)

### Sprint 2: Interactivity & Feature Implementation

- [Implemented] 1. Implement Functional Navigation:
  - [Implemented] Make all navigation links work, enabling smooth scrolling to page sections.
  - [Implemented] Ensure all external links (GitHub, demos) in the `<ProjectsSection>` are correct.
- [ToDo] 2. Develop Key Interactive Features:
  - [ToDo] PDF Generation: Build the frontend for the "Download as PDF" feature.
  - [ToDo] Voice Chatbot: Implement the UI for the ElevenLabs chatbot. **Dependency:** Use the API endpoint contract provided by Track B.
- [ToDo] 3. Activate Localization:
  - [ToDo] **Dependency:** Use the i18n function and JSON key structure provided by Track B.
  - [ToDo] Connect the language switcher UI to the i18n framework to enable language changes.
  - [ToDo] Wrap all static text in UI components with the translation function.

- [Implemented] 1. Implement Functional Navigation:
  - [Implemented] Make all navigation links work, enabling smooth scrolling to page sections.
  - [Implemented] Ensure all external links (GitHub, demos) in the homepage and infographics sections are correct and open in a new tab.
- [Implemented] 2. Develop Key Interactive Features:
  - [Implemented] PDF Generation: Build the frontend for the "Download as PDF" feature (button POSTs to /api/pdf and downloads PDF).
  - [Implemented] Voice Chatbot: Implement the UI for the ElevenLabs chatbot (UI connects to /api/chatbot endpoint).
- [Implemented] 3. Activate Localization:
  - [Implemented] Use the i18n function and JSON key structure provided by Track B.
  - [Implemented] Connect the language switcher UI to the i18n framework to enable language changes.
  - [Implemented] Wrap all static text in UI components with the translation function.
---

## Track B: Backend, Tooling & Automation (Agent 2)

### Backend Integrations & Testing

- [ToDo] 1. Implement Backend for Features:
  - [ToDo] Voice Chatbot: Create a serverless function (`./api/chatbot.js`) to securely handle API calls to the ElevenLabs API. **Handoff:** Provide the API contract (endpoint URL, request/response format) to Agent A.
  - [ToDo] PDF Generation: If server-side rendering is chosen for the PDF, set up the necessary endpoint.
  
- [Tested] 2. Write Comprehensive Tests:
  - [Tested] Backend API endpoint tests implemented (including SVG sanitization and XSS vectors)
  - [InProgress] Component Tests: Write unit tests for any complex, non-UI logic.
  - [InProgress] E2E Tests: **Dependency:** Use the `data-cy` attributes provided by Track A. Write new Cypress tests for the key user flows (language switching, PDF download, opening chatbot). Backend API endpoint tests implemented.
- [ToDo] 3. Finalize Documentation:
  - [ToDo] Update `README.md` with the final project structure, design system documentation, and detailed setup/run instructions.
- [ToDo] 4. Optimize and Secure:
  - [ToDo] Set up Lighthouse CI in the `deploy.yml` workflow to report on performance and accessibility.
  - [ToDo] Review for security best practices, especially around API key handling for the chatbot (use environment variables).
  - [ToDo] **Done when:** `npm install` , `npm run lint`, `npm test:e2e`,  `npm run build` and `npm test:ci`  execute without errors.

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
  - [Tested] Validate and sanitize Mermaid code
  - [Tested] Render SVG via Playwright (Python or mermaid-cli)
  - [Tested] Sanitize SVG output
  - [ ] Dockerize the backend
  - [ ] Add CI/CD workflow for build, test, deploy
  - [ ] Document API contract and security measures
