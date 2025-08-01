# GitHub Actions Workflows

This directory contains automated workflows for the sparrow-ai-tech project.

## Critical Fix Applied

**Issue**: Workflows were failing with "Unable to locate executable file: pnpm"

**Solution**: Added `pnpm/action-setup@v4` step **before** `actions/setup-node@v4` in all workflows that use pnpm.

## Workflow Standards

### Consistent Practices
- **Node.js Version**: 22 LTS across all workflows
- **Package Manager**: pnpm with frozen lockfiles
- **pnpm Setup**: Always install pnpm before setting up Node.js with cache
- **Caching**: Enabled for faster builds
- **Timeouts**: Set to prevent hanging jobs
- **Artifacts**: Proper retention and naming

### Quality Gates
- Linting with ESLint
- Unit tests with Jest  
- E2E tests with Playwright/Cypress
- Security audits with pnpm audit
- Build verification

## Key Workflows

- **`frontend-ci.yml`** - Runs quality checks, tests, and builds on code changes
- **`deploy.yml`** - Deploys the site to GitHub Pages on main branch pushes
- **`backend-ci.yml`** - Tests Python backend components and Docker builds
- **`cv-generate.yml`** - Generates PDF from CV repository and deploys
- **`content-sync.yml`** - Syncs documentation from external repositories

## Troubleshooting

- **pnpm not found**: Ensure `pnpm/action-setup@v4` is called before `actions/setup-node@v4`
- **Build failures**: Check the quality gates (lint, test)
- **Deployment issues**: Verify GitHub Pages settings
- **Cache issues**: Clear workflow caches if needed
