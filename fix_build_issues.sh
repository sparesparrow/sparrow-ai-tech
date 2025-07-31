#!/bin/bash

# =================================================================
# FIX BUILD ISSUES FOR SPARROW-AI-TECH PROJECT
# =================================================================

# Navigate to project directory
cd /workspaces/sparrow-ai-tech

# 1. FIRST: Remove @tippyjs/react import and replace with simple CSS tooltip
echo "# =================================================================
# FIXING @tippyjs/react IMPORT ISSUE
# ================================================================="

# Check if ImagePreviewLink.jsx exists and fix it
if [ -f "src/components/ImagePreviewLink.jsx" ]; then
    echo "Fixing ImagePreviewLink.jsx to remove @tippyjs/react dependency..."

    # Create a new version without @tippyjs/react
    cat > src/components/ImagePreviewLink.jsx << 'EOF'
import React from 'react';

const ImagePreviewLink = ({ href, title, children, className = "" }) => {
  return (
    <div className={`image-preview-container ${className}`} title={title}>
      <a href={href} target="_blank" rel="noopener noreferrer" className="image-preview-link">
        {children}
      </a>
      <style jsx>{`
        .image-preview-container {
          position: relative;
          display: inline-block;
        }

        .image-preview-link {
          color: var(--color-cyber-blue);
          text-decoration: none;
          border-bottom: 1px dashed var(--color-cyber-blue);
          transition: all 0.3s ease;
        }

        .image-preview-link:hover {
          color: var(--color-cyber-green);
          border-color: var(--color-cyber-green);
          text-shadow: 0 0 5px var(--color-cyber-green);
        }

        .image-preview-container:hover::after {
          content: attr(title);
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: var(--color-cyber-bg);
          color: var(--color-cyber-text);
          padding: 0.5rem;
          border: 1px solid var(--color-cyber-green);
          border-radius: 4px;
          font-size: 0.8rem;
          white-space: nowrap;
          z-index: 1000;
          margin-bottom: 5px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default ImagePreviewLink;
EOF
    echo "✅ Fixed ImagePreviewLink.jsx"
else
    echo "ImagePreviewLink.jsx not found - will create if needed during build"
fi

# 2. FIX PROP-TYPES WARNINGS - Add proper types
echo "
# =================================================================
# FIXING PROP-TYPES WARNINGS
# ================================================================="

# Install prop-types as it's still useful for development
npm install prop-types

# Also add @types/react-helmet to resolve the TypeScript warnings
npm install --save-dev @types/react-helmet @types/prop-types

# 3. ENSURE DEPENDENCIES ARE CORRECTLY INSTALLED
echo "
# =================================================================
# ENSURE CORRECT DEPENDENCIES
# ================================================================="

# Make sure all required packages are installed
npm install

# Remove any @tippyjs/react if it was accidentally installed
npm uninstall @tippyjs/react tippy.js @popperjs/core 2>/dev/null || true

# 4. FIX CSS STYLES NOT BEING APPLIED
echo "
# =================================================================
# FIXING CSS STYLES ISSUE
# ================================================================="

# Ensure the main CSS file is properly linked in the layout
# Check if we have an Astro layout file
if [ -f "src/layouts/Layout.astro" ]; then
    echo "Updating Layout.astro to ensure CSS is properly loaded..."

    # Backup existing layout
    cp src/layouts/Layout.astro src/layouts/Layout.astro.backup

    # Create updated layout with proper CSS imports
    cat > src/layouts/Layout.astro << 'EOF'
---
export interface Props {
  title: string;
  description?: string;
}

const { title, description = "Modern Astro + React web project with AI tools and infographics" } = Astro.props;
---

<!DOCTYPE html>
<html lang="cs">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content={description} />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />
    <title>{title}</title>

    <!-- Preload critical fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <!-- Import main styles -->
    <link rel="stylesheet" href="/styles/main.css">

    <!-- Ensure Tailwind CSS is loaded -->
    <style>
      /* Critical CSS for immediate rendering */
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 0;
        background: #0d1117;
        color: #f0f6fc;
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        line-height: 1.6;
        overflow-x: hidden;
      }
    </style>
  </head>
  <body>
    <slot />

    <!-- Load JavaScript after content -->
    <script src="/js/app.js"></script>
  </body>
</html>
EOF
    echo "✅ Updated Layout.astro"
fi

# 5. ENSURE PUBLIC ASSETS ARE IN PLACE
echo "
# =================================================================
# ENSURING PUBLIC ASSETS ARE PROPERLY SET UP
# ================================================================="

# Create public directory structure
mkdir -p public/js
mkdir -p public/styles
mkdir -p public/images

# Copy the app.js from attachment if it exists in home directory
if [ -f "/home/user/app.js.txt" ]; then
    echo "Copying app.js from attachment..."
    cp "/home/user/app.js.txt" public/js/app.js
    # Fix any HTML entity encodings in the JavaScript
    sed -i 's/&lt;/</g; s/&gt;/>/g; s/&amp;/\&/g' public/js/app.js
    echo "✅ Copied and fixed app.js"
fi

# Copy styles.css from attachment if it exists
if [ -f "/home/user/styles.css.txt" ]; then
    echo "Copying styles.css from attachment..."
    cp "/home/user/styles.css.txt" public/styles/main.css
    echo "✅ Copied main.css"
fi

# 6. CREATE OR UPDATE ASTRO CONFIG
echo "
# =================================================================
# UPDATING ASTRO CONFIGURATION
# ================================================================="

# Ensure astro.config.mjs is properly configured
cat > astro.config.mjs << 'EOF'
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    react(),
    tailwind({
      // Disable base styles since we have our own
      applyBaseStyles: false,
    })
  ],
  output: 'static',
  site: 'https://sparesparrow.github.io',
  base: '/sparrow-ai-tech',
  build: {
    assets: 'assets'
  },
  vite: {
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname
      }
    },
    build: {
      rollupOptions: {
        external: []
      }
    }
  }
});
EOF

echo "✅ Updated astro.config.mjs"

# 7. CLEAN BUILD
echo "
# =================================================================
# CLEAN BUILD AND VERIFY
# ================================================================="

# Clean everything
npm run clean 2>/dev/null || rm -rf dist .astro node_modules/.cache

# Fresh install
npm install

# Try to build
echo "Attempting build..."
npm run build

echo "
# =================================================================
# BUILD COMMANDS COMPLETED
# =================================================================
If build succeeds, the issues should be resolved.
If there are still issues, check the specific error messages.
"
