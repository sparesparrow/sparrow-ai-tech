# Create fixed GitHub Actions workflow for Jekyll deployment
jekyll_workflow = """name: Build and Deploy Jekyll Site

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.1'
          bundler-cache: true
          cache-version: 0
          
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v4
        
      - name: Build with Jekyll
        run: bundle exec jekyll build --baseurl "${{ steps.pages.outputs.base_path }}"
        env:
          JEKYLL_ENV: production
          
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3

  # Deployment job
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4"""

# Save the improved workflow
with open('jekyll-deploy.yml', 'w') as f:
    f.write(jekyll_workflow)

print("✅ Created improved Jekyll deployment workflow")
print("File: jekyll-deploy.yml")
print()

# Create improved _config.yml for Jekyll
jekyll_config = """# Site settings
title: "Sparrow AI Tech"
description: "Custom AI/ML Solutions, Cybersecurity & IT Services"
baseurl: ""
url: "https://sparesparrow.github.io/sparrow-ai-tech"

# Build settings
markdown: kramdown
highlighter: rouge
theme: jekyll-theme-hacker

# Plugins
plugins:
  - jekyll-seo-tag
  - jekyll-sitemap
  - jekyll-feed

# Exclude files from processing
exclude:
  - Gemfile
  - Gemfile.lock
  - node_modules
  - vendor/bundle/
  - vendor/cache/
  - vendor/gems/
  - vendor/ruby/
  - README.md
  - LICENSE
  - CONTRIBUTING.md
  - .gitignore
  - .github/

# Include files that start with underscore
include:
  - _headers
  - _redirects

# Collections for articles
collections:
  articles:
    output: true
    permalink: /:collection/:name/

# Language settings
languages: ["cs", "en"]
default_lang: "cs"

# Defaults
defaults:
  - scope:
      path: ""
      type: "articles"
    values:
      layout: "article"
  - scope:
      path: "articles"
    values:
      sitemap: true

# SEO and social
author: "Sparrow AI Tech"
twitter:
  username: sparrowaitech
  card: summary_large_image

social:
  name: Sparrow AI Tech
  links:
    - https://github.com/sparesparrow

# Analytics (add your tracking ID)
google_analytics: ""

# Security headers
webrick:
  headers:
    X-Frame-Options: DENY
    X-Content-Type-Options: nosniff"""

with open('config_improved.yml', 'w') as f:
    f.write(jekyll_config)

print("✅ Created improved Jekyll configuration")
print("File: config_improved.yml")
print()

# Create a Gemfile for proper dependency management
gemfile_content = """source "https://rubygems.org"

# Jekyll version compatible with GitHub Pages
gem "jekyll", "~> 4.3.0"

# GitHub Pages compatible gems
gem "github-pages", group: :jekyll_plugins

# Theme
gem "jekyll-theme-hacker", "~> 0.2.0"

# Essential plugins
group :jekyll_plugins do
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
  gem "jekyll-feed"
  gem "jekyll-paginate"
end

# Development dependencies
group :development do
  gem "webrick", "~> 1.7"
end"""

with open('Gemfile_improved', 'w') as f:
    f.write(gemfile_content)

print("✅ Created improved Gemfile")
print("File: Gemfile_improved")
print()

print("=== Next Steps ===")
print("1. Replace .github/workflows/ci.yml with jekyll-deploy.yml")
print("2. Replace _config.yml with config_improved.yml") 
print("3. Replace Gemfile with Gemfile_improved")
print("4. Remove .nojekyll file (conflicts with Jekyll)")
print("5. Run 'bundle install' locally to generate Gemfile.lock")