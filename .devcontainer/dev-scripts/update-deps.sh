#!/bin/bash
# Dependency update script

echo "📦 Updating dependencies for sparrow-ai-tech..."

# Update pnpm itself
echo "Updating pnpm..."
npm install -g pnpm@latest

# Update project dependencies
echo "Updating project dependencies..."
pnpm update --interactive --latest

# Check for vulnerabilities
echo "Checking for security vulnerabilities..."
pnpm audit

# Rebuild if needed
echo "Rebuilding project..."
pnpm run build

echo "✅ Dependencies updated!"
