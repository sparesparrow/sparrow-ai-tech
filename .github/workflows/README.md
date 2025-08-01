# GitHub Actions Workflows

This directory contains automated workflows for the sparrow-ai-tech project.

## Workflows Overview

### 🚀 Production Workflows

- **`deploy.yml`** - Deploys the site to GitHub Pages on main branch pushes
- **`frontend-ci.yml`** - Runs quality checks, tests, and builds on code changes
- **`backend-ci.yml`** - Tests Python backend components and Docker builds

### 📄 Content Workflows  

- **`cv-generate.yml`** - Generates PDF from CV repository and deploys
- **`content-sync.yml`** - Syncs documentation from external repositories

## Workflow Standards

### Consistent Practices
- **Node.js Version**: 22 LTS across all workflows
- **Package Manager**: pnpm with frozen lockfiles
- **Caching**: Enabled for faster builds
- **Timeouts**: Set to prevent hanging jobs
- **Artifacts**: Proper retention and naming

### Quality Gates
- Linting with ESLint
- Unit tests with Jest  
- E2E tests with Playwright/Cypress
- Security audits with pnpm audit
- Build verification

### Security
- Minimal permissions per job
- Dependency vulnerability scanning
- Secrets management for deployment

## Maintenance

Workflows are automatically maintained and should remain consistent. When adding new workflows:

1. Follow the established naming conventions
2. Use the standard Node.js/pnpm setup
3. Include appropriate quality gates
4. Set reasonable timeouts
5. Add proper error handling
6. Document any special requirements

## Troubleshooting

- **Build failures**: Check the quality gates (lint, test)
- **Deployment issues**: Verify GitHub Pages settings
- **Timeout errors**: Consider increasing timeout limits
- **Cache issues**: Clear workflow caches if needed
