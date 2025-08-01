# Enhanced DevContainer for sparrow-ai-tech

This enhanced DevContainer provides a complete development environment for the sparrow-ai-tech project with optimizations for MCP development, security, and developer experience.

## Features

### 🏗️ Multi-stage Docker Build
- Optimized image size with multi-stage builds
- Efficient layer caching for faster rebuilds
- Security-hardened with non-root user

### 🔧 Development Tools
- Node.js 22 LTS with pnpm package manager
- Pre-installed global development tools
- Astro, TypeScript, and testing frameworks ready
- Enhanced shell with useful aliases and functions

### 🔒 Security Enhancements
- Non-root user with sudo privileges
- SSH agent forwarding for secure git operations
- Proper file permissions and ownership

### ⚡ Performance Optimizations
- Persistent volumes for node_modules and caches
- Optimized pnpm configuration
- Memory optimization for Node.js builds
- Fast container startup with health checks

### 🎯 VS Code Integration
- Comprehensive extension pack for web development
- Pre-configured settings for optimal experience
- Tasks and launch configurations included
- IntelliSense and debugging ready

## Quick Start

1. Open project in VS Code
2. Click "Reopen in Container" when prompted
3. Wait for container to build and initialize
4. Run `pnpm dev` to start development server

## Available Scripts

### Development Scripts

In .devcontainer/dev-scripts/

./setup-dev.sh # Setup development environment
./cleanup.sh # Clean build artifacts and caches
./update-deps.sh # Update dependencies interactively

### VS Code Tasks
- `Ctrl+Shift+P` → "Tasks: Run Task"
- Available: install, dev, build, test, setup

## Port Forwarding

- **4321**: Astro development server
- **3000**: Alternative development server
- **5173**: Vite development server
- **9229**: Node.js debugging port

## Volume Mounts

- `sparrow-node-modules`: Persistent node_modules cache
- `sparrow-pnpm-cache`: pnpm global cache
- `sparrow-cypress-cache`: Cypress browser cache
- `sparrow-playwright-cache`: Playwright browser cache

## Environment Variables

- `NODE_OPTIONS`: Memory optimization for builds
- `SSH_AUTH_SOCK`: SSH agent forwarding
- `CYPRESS_CACHE_FOLDER`: Cypress cache location
- `PLAYWRIGHT_BROWSERS_PATH`: Playwright cache location

## Troubleshooting

### Container won't start

Rebuild container

```bash
docker system prune -f
```

Then rebuild in VS Code

### Permission issues

Fix workspace permissions

```bash
sudo chown -R vscode:vscode /workspace
```

### SSH issues

Ensure SSH agent is running

```bash
ssh-add -l
```

Add key if needed

```bash
ssh-add ~/.ssh/id_rsa
```

## Customization

Edit `.devcontainer/devcontainer.json` to:
- Add more VS Code extensions
- Modify port forwarding
- Change environment variables
- Add custom mount points

Edit `.devcontainer/Dockerfile` to:
- Install additional system packages
- Add custom tools or utilities
- Modify user configuration
