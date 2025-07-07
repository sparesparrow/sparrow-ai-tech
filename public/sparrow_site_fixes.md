# Sparrow AI Tech Site Fixes

## Issues and Solutions

### 1. Configuration Mismatch
Your site has mixed Jekyll and React configurations. You need to choose one approach:

**Option A: Pure Jekyll (Recommended for GitHub Pages)**
- Remove React-related files (`package.json`, `vite.config.js`)
- Use Jekyll's built-in asset handling
- Create proper Jekyll layouts and includes

**Option B: Pure React with Vite**
- Remove Jekyll files (`_config.yml`, `Gemfile`)
- Use GitHub Actions for deployment
- Configure proper asset paths

### 2. Missing Assets Directory Structure

Create the following directory structure:
```
├── assets/
│   ├── images/
│   │   ├── mcp-ecosystem-diagram.png
│   │   ├── screenshot-ui.png
│   │   └── screenshot-feature.png
│   └── css/
│       └── site.css
├── languages/
│   ├── cs.json
│   └── en.json
└── public/
    └── favicon.png
```

### 3. Base URL Configuration Fix

Your `_config.yml` has:
```yaml
baseurl: "sparesparrow/sparrow-ai-tech"  # INCORRECT
url: "https://sparesparrow.github.io"
```

Should be:
```yaml
baseurl: "/sparrow-ai-tech"  # CORRECT
url: "https://sparesparrow.github.io"
```

### 4. Content Security Policy Fix

Add to your HTML head:
```html
<meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;">
```

### 5. Translation Files Setup

Create `languages/cs.json`:
```json
{
  "nav": {
    "home": "Domů",
    "services": "Služby",
    "about": "O nás",
    "contact": "Kontakt"
  },
  "hero": {
    "title": "Inovace a bezpečnost pro vaši digitální éru",
    "subtitle": "Moderní AI/ML řešení, kybernetická bezpečnost a IT služby"
  }
}
```

Create `languages/en.json`:
```json
{
  "nav": {
    "home": "Home",
    "services": "Services",
    "about": "About",
    "contact": "Contact"
  },
  "hero": {
    "title": "Innovation and Security for Your Digital Era",
    "subtitle": "Modern AI/ML Solutions, Cybersecurity & IT Services"
  }
}
```

### 6. Fix Asset Paths in Your HTML

Replace absolute paths with Jekyll-friendly paths:
```html
<!-- Instead of -->
<img src="/assets/images/screenshot-ui.png" alt="UI">

<!-- Use -->
<img src="{{ '/assets/images/screenshot-ui.png' | relative_url }}" alt="UI">
```

### 7. Exclude Assets from Jekyll Processing

Update your `_config.yml`:
```yaml
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
  - package.json
  - vite.config.js
  - cypress.config.js
  
# Don't exclude assets - they need to be processed
```

### 8. Fix Favicon Path

Move favicon from `/public/favicon.png` to `/favicon.png` (root directory) or update the reference:
```html
<link rel="icon" type="image/png" href="{{ '/favicon.png' | relative_url }}">
```

### 9. Recommended Jekyll Layout Structure

Create `_layouts/default.html`:
```html
<!DOCTYPE html>
<html lang="{{ page.lang | default: site.default_lang }}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ page.title | default: site.title }}</title>
  <link rel="stylesheet" href="{{ '/assets/css/site.css' | relative_url }}">
  <link rel="icon" type="image/png" href="{{ '/favicon.png' | relative_url }}">
</head>
<body>
  <a href="#main" class="skip-to-content">Skip to main content</a>
  <main id="main">
    {{ content }}
  </main>
</body>
</html>
```

### 10. Immediate Actions

1. **Choose your tech stack**: Jekyll OR React, not both
2. **Create missing directories**: `assets/images/`, `languages/`
3. **Add placeholder images** to prevent 404s
4. **Fix baseurl** in `_config.yml`
5. **Update asset references** to use Jekyll's `relative_url` filter
6. **Add CSP meta tag** or remove inline scripts

### 11. Testing Locally

For Jekyll:
```bash
bundle exec jekyll serve
```

For React:
```bash
npm run dev
```

Choose one approach and stick with it for consistency and maintainability.