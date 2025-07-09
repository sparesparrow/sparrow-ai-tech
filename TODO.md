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
- [Done] Move all test/demo markdown files out of `/articles` to `/cypress/fixtures/articles`
- [Done] Remove all `.md` duplicates from `/public/articles`, keeping only `.html` files for static hosting
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

**Focus:** Build the visual and interactive parts of the application using Astro and React. This track owns the user-facing components and styles.

### Sprint 1: Design System & Static Page Implementation

- [ToDo] 1. Implement the Design System:
  - [ToDo] Create `src/styles/theme.css` and define all color palette and spacing variables.
  - [ToDo] Create `src/styles/typography.css` and define global styles for fonts, headings, and body text.
  - [ToDo] Import these stylesheets into the main layout file.
  - [ToDo] **Done when:** Style variables are defined and can be used in components.
- [ToDo] 2. Create Global UI Components:
  - [ToDo] Create `src/layouts/MainLayout.astro`. This layout should import the CSS files and include slots for `<Header>`, `<body>`, and `<Footer>`.
  - [ToDo] Create `src/components/Header.jsx` with static placeholder navigation links and a placeholder UI for the language switcher.
  - [ToDo] Create `src/components/Footer.jsx` with static links and information.
  - [ToDo] **Done when:** The main layout can be used to wrap a page, displaying a consistent header and footer.
- [ToDo] 3. Build Static Homepage Sections:
  - [ToDo] Create the following React components in `src/components/`:
    - [ToDo] `HeroSection.jsx`
    - [ToDo] `ProjectsSection.jsx` (Use hardcoded array of project data for now).
    - [ToDo] `SkillsSection.jsx`
    - [ToDo] `AboutSection.jsx`
  - [ToDo] Create the main page at `src/pages/index.astro`. Import and assemble the section components within `<MainLayout.astro>`.
  - [ToDo] **Done when:** The homepage renders with all static sections visible.
- [ToDo] 4. Implement Responsiveness:
  - [ToDo] Add CSS media queries to `theme.css` or individual component stylesheets.
  - [ToDo] Ensure all components and layouts from this sprint are fully responsive across mobile, tablet, and desktop breakpoints.
  - [ToDo] **Done when:** The layout reflows correctly on all target screen sizes without horizontal scrollbars.
- [ToDo] 5. Visuals and Assets:
  - [ToDo] Place all selected images in `public/assets/images/` with descriptive, kebab-case names.
  - [ToDo] Use Astro's `<Image />` component for optimization within `.astro` files and standard `<img>` tags in `.jsx` files, referencing the public paths.
  - [ToDo] Add `data-cy` attributes to all key interactive elements (buttons, links) for Track B's testing.
  - [ToDo] **Done when:** Images are displayed correctly, and E2E test selectors are in place.

### Sprint 2: Interactivity & Feature Implementation

- [ToDo] 1. Implement Functional Navigation:
  - [ToDo] Make all navigation links work, enabling smooth scrolling to page sections.
  - [ToDo] Ensure all external links (GitHub, demos) in the `<ProjectsSection>` are correct.
- [ToDo] 2. Develop Key Interactive Features:
  - [ToDo] PDF Generation: Build the frontend for the "Download as PDF" feature.
  - [ToDo] Voice Chatbot: Implement the UI for the ElevenLabs chatbot. **Dependency:** Use the API endpoint contract provided by Track B.
- [ToDo] 3. Activate Localization:
  - [ToDo] **Dependency:** Use the i18n function and JSON key structure provided by Track B.
  - [ToDo] Connect the language switcher UI to the i18n framework to enable language changes.
  - [ToDo] Wrap all static text in UI components with the translation function.

---

## Track B: Backend, Tooling & Automation (Agent 2)

**Focus:** Build the project's foundation, including testing, deployment, and backend integrations. This track ensures the project is robust, maintainable, and deployable.

### Sprint 1: Project Foundation & CI/CD

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
  - [ToDo] Install and configure Cypress for E2E testing (`npx cypress init`).
  - [ToDo] Install and configure Jest and Testing Library for component testing.
  - [ToDo] Fix any existing failing Cypress tests by updating selectors or test logic.
  - [ToDo] **Done when:** `npm test` and `npx cypress run` execute without errors.
- [ToDo] 5. Set Up Internationalization (i18n) Framework:
  - [ToDo] Integrate and configure astro-i18n.
  - [ToDo] Create `public/locales/en/common.json` and `public/locales/cs/common.json`.
  - [ToDo] Define a clear structure for translation keys (e.g., `{ "header": { "nav_projects": "Projects" } }`).
  - [ToDo] **Done when:** The i18n utility is configured and ready for the frontend to use. **Handoff:** Provide the function call (e.g., `t('header.nav_projects')`) and key structure to Agent A.

---

### Synchronization Point 1: End of Sprint 1

**Goal:** Merge the foundational UI with the CI/CD and tooling setup.

**Process:**
- Both agents ensure their branches are up-to-date with main.
- Track B creates a pull request to merge its foundation branch into main. Review and merge.
- Track A rebases its ui-sprint-1 branch on the new main, then creates a pull request.
- **Review:** Both agents review the PR. The CI pipeline must pass.
- **Outcome:** A deployable static site with a working test and build pipeline. The homepage is visible but not yet interactive.

---

## Track A: Frontend & User Experience (Agent 1)

### Sprint 2: Interactivity & Feature Implementation

- [ToDo] 1. Implement Functional Navigation:
  - [ToDo] Make all navigation links work, enabling smooth scrolling to page sections.
  - [ToDo] Ensure all external links (GitHub, demos) in the `<ProjectsSection>` are correct.
- [ToDo] 2. Develop Key Interactive Features:
  - [ToDo] PDF Generation: Build the frontend for the "Download as PDF" feature.
  - [ToDo] Voice Chatbot: Implement the UI for the ElevenLabs chatbot. **Dependency:** Use the API endpoint contract provided by Track B.
- [ToDo] 3. Activate Localization:
  - [ToDo] **Dependency:** Use the i18n function and JSON key structure provided by Track B.
  - [ToDo] Connect the language switcher UI to the i18n framework to enable language changes.
  - [ToDo] Wrap all static text in UI components with the translation function.

---

## Track B: Backend, Tooling & Automation (Agent 2)

### Sprint 2: Backend Integrations & Testing

- [ToDo] 1. Implement Backend for Features:
  - [ToDo] Voice Chatbot: Create a serverless function (`/api/chatbot.js`) to securely handle API calls to the ElevenLabs API. **Handoff:** Provide the API contract (endpoint URL, request/response format) to Agent A.
  - [ToDo] PDF Generation: If server-side rendering is chosen for the PDF, set up the necessary endpoint.
- [ToDo] 2. Write Comprehensive Tests:
  - [ToDo] Component Tests: Write unit tests for any complex, non-UI logic.
  - [HelpNeeded] E2E Tests: **Dependency:** Use the `data-cy` attributes provided by Track A. Write new Cypress tests for the key user flows (language switching, PDF download, opening chatbot). Backend API endpoint tests implemented.
- [ToDo] 3. Finalize Documentation:
  - [ToDo] Update `README.md` with the final project structure, design system documentation, and detailed setup/run instructions.
- [ToDo] 4. Optimize and Secure:
  - [ToDo] Set up Lighthouse CI in the `deploy.yml` workflow to report on performance and accessibility.
  - [ToDo] Review for security best practices, especially around API key handling for the chatbot (use environment variables).

---

### Synchronization Point 2: End of Sprint 2

**Goal:** Integrate the interactive frontend with backend logic and finalize testing for release.

**Process:**
- A new `release/v1.0` branch is created from main.
- Both agents create pull requests for their Sprint 2 work into the `release/v1.0` branch.
- **Integration & Testing:** The release branch is tested end-to-end. All E2E tests must pass.
- Once stable, `release/v1.0` is merged into main, triggering the final deployment.
- **Outcome:** A fully functional, interactive, tested, and deployed web application.
