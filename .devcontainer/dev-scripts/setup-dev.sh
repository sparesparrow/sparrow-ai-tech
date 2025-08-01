#!/bin/bash
# Development environment setup script

echo "🔧 Setting up sparrow-ai-tech development environment..."

# Install dependencies with cache optimization
echo "📦 Installing dependencies..."
pnpm install --prefer-frozen-lockfile

# Setup git hooks if available
if [ -f ".husky/install" ]; then
  echo "🪝 Setting up git hooks..."
  pnpm husky install
fi

# Run initial health checks
echo "🔍 Running health checks..."
pnpm run lint --no-fix || echo "⚠️  Linting issues found - run 'pnpm run lint:fix'"
pnpm run build || echo "⚠️  Build issues found"

# Display helpful information
echo ""
echo "✅ Development environment ready!"
echo ""
echo "🚀 Quick commands:"
echo "  pnpm dev           - Start development server"
echo "  pnpm build         - Build for production"
echo "  pnpm test          - Run tests"
echo "  pnpm lint:fix      - Fix linting issues"
echo "  pnpm preview       - Preview production build"
echo ""
echo "🌐 Servers will be available at:"
echo "  - Astro: http://localhost:4321"
echo "  - Preview: http://localhost:4173"
echo ""
