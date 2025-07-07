# SPARROW-AI-TECH

[![Build Status](https://img.shields.io/github/workflow/status/SPARROW-AI-TECH-CZ/sparrow-ai-tech/CI)](https://github.com/SPARROW-AI-TECH-CZ/sparrow-ai-tech/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Innovation and Security for Your Digital Era**

*This project is also available in English. See below for a summary.*

SPARROW-AI-TECH je moderní IT a AI agentura zaměřená na implementaci AI agentů, kybernetickou bezpečnost, správu Linuxu, vývoj softwaru a modernizaci IT. Tento web je optimalizován pro SEO, přístupnost (a11y), rychlost a profesionální prezentaci na GitHub Pages.

---

## 🚀 Features
- **SEO optimalizace**: Meta tagy, Open Graph, Twitter Card, strukturovaná data (JSON-LD)
- **Přístupnost**: Skip-to-content, role, kontrast, alt texty, klávesová navigace
- **PWA ready**: Manifest, favicon, responzivní design
- **Rychlost**: Lazy loading obrázků, optimalizované styly
- **Print-friendly**: Speciální tisková šablona
- **Vícejazyčnost**: Čeština/Angličtina (CS/EN toggle)

## 🛠️ Development & Deployment

This project uses [React](https://reactjs.org/) and is deployed to GitHub Pages using [gh-pages](https://github.com/tschaub/gh-pages).

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```

### Build & Deploy to GitHub Pages

1. Build the app:
   ```bash
   npm run build
   ```
2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

The site will be available at the URL specified in the `homepage` field of `package.json`.

### Static Assets
- Place all static files (like `index.html`, `favicon.ico`, images, etc.) in the `/public` directory.
- Reference them in HTML using `%PUBLIC_URL%/asset.png` and in JS using `process.env.PUBLIC_URL + '/asset.png'`.

## 🖼️ Custom Images and Icons
- Replace `/public/favicon.png` with your logo (192x192 px PNG)
- Replace `/public/social-preview.png` for better social sharing (1200x630 px)
- Replace `/public/screenshot-ui.png` and `/public/screenshot-feature.png` with real UI/functionality screenshots

## 📄 Other Files
- `public/site.webmanifest` – PWA manifest
- `public/robots.txt` – Allows search engine indexing

## 📬 Contact
- Web: [sparrow-ai-tech.github.io](https://sparrow-ai-tech.github.io/)
- GitHub: [SPARROW-AI-TECH-CZ](https://github.com/SPARROW-AI-TECH-CZ)

## 🤝 Contributing
We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines. By participating, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## 📜 License
MIT License. See [LICENSE](LICENSE) for details.

---
© SPARROW-AI-TECH. Všechna práva vyhrazena.
