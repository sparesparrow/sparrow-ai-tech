# Project TODOs and Roadmap

## Astro Integration & Deployment
- [x] Create Astro project and config for React integration
- [x] Expose <App /> as a component for Astro
- [x] Set up Astro to output to /dist and use correct base for GitHub Pages
- [x] Add a simple Astro page that loads the React app
- [x] Write a basic Playwright test for homepage rendering
- [x] Install dependencies and test Astro build
- [x] Clean up legacy files and static assets
- [x] Move infographics HTML to public/infographics
- [ ] Deploy to GitHub Pages
- [ ] Review deployment and run manual/automated tests

## Image & Asset Management
- [ ] Move all selected images to `public/assets/images/selected/` and ensure they are referenced in code/docs
- [ ] Rename selected images with descriptive, SEO-friendly names (e.g., `mcp-architecture-diagram.png`)
- [ ] Audit codebase and docs for references to unused images; update or remove as needed
- [ ] Add/automate image optimization (compression, webp conversion) in build process
- [ ] Remove or archive all unused images in `unused/` and subfolders

## Documentation & Onboarding
- [ ] Update README to reflect new project structure, image usage, and goals
- [ ] Add developer onboarding guide (setup, build, deploy, contribute)
- [ ] Document image selection and optimization workflow

## Testing & Automation
- [ ] Fix failing Cypress E2E/component tests (404s, asset issues)
- [ ] Add tests for PDF export and accessibility (a11y)
- [ ] Automate build, test, and lint checks in CI (pre-commit, GitHub Actions)
- [ ] Expand E2E Cypress tests for Markdown and Mermaid rendering
- [ ] Add tests for error and loading states using `cy.intercept()`
- [ ] Use data-cy attributes for robust selectors in tests

## Portfolio & CV Replacement Page
- [ ] Design and implement a static portfolio page to serve as a CV replacement
- [ ] Showcase open-source contributions and highlight best projects
- [ ] Develop a clear, professional visual identity (color palette, typography, logo) for "Sparrow AI Tech"
- [ ] Ensure layout uses whitespace and structure for easy scanning of key info (projects, skills)
- [ ] Add a prominent "Generate PDF" button for visitors to download the portfolio as a PDF
- [ ] Style the PDF export for professional appearance and readability
- [ ] Test the page for first-impression impact and polish

## Contact & Skills Demo
- [ ] Add clear "Contact Me" and "Try My AI Assistant" CTAs (buttons/sections)
- [ ] Design CTAs to be visually prominent (color, size, icon)
- [ ] Place CTAs strategically (e.g., hero section, end of services/about)
- [ ] Integrate a voice/chatbot demo as an interactive showcase of agent workflow skills
- [ ] Ensure contact options are easy to use and accessible
- [ ] Add analytics or feedback mechanism for contact/demo usage

## Central Hub & Management Tool
- [ ] Build a unified dashboard for accessing repositories, documentation, and GitHub Actions
- [ ] Create a frontend UI for managing MCP servers
- [ ] Implement a persistent, clear navigation bar (<nav>) for switching between "Repositories", "Documentation", "MCP Dashboard", etc.
- [ ] Ensure the hub/dashboard is fully responsive and works well on mobile devices
- [ ] Organize dashboard content for clarity: use headings, dividers, and whitespace for easy scanning and searching
- [ ] Test usability of the management tool and iterate on UI/UX

# Ideas to explore:
- https://dev.to/devopswithamol/automate-server-deployments-with-github-actions-ssh-p24
- https://ecostack.dev/posts/automated-docker-compose-deployment-github-actions/