#!/bin/bash
# Cleanup script for development environment

echo "🧹 Cleaning up development environment..."

# Clean build artifacts
echo "Removing build artifacts..."
rm -rf dist/ .astro/ .turbo/

# Clean dependency caches
echo "Cleaning dependency caches..."
pnpm store prune
npm cache clean --force

# Clean test artifacts
echo "Cleaning test artifacts..."
rm -rf coverage/ test-results/ playwright-report/

# Clean logs
echo "Cleaning logs..."
rm -rf logs/ *.log

echo "✅ Cleanup complete!"
