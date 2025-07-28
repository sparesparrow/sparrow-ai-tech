// Application state
let currentSection = 'dashboard';
let generatedFiles = {};

// Initialize application
document.addEventListener('DOMContentLoaded', function () {
  initializeNavigation();
  initializeCharacterCounters();
  initializeProgressBars();
  initializeContrastAnalyzer();
  initializeCTADesigner();
  loadApplicationData();
});

// Navigation functionality
function initializeNavigation() {
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach((item) => {
    item.addEventListener('click', function () {
      const sectionId = this.dataset.section;
      switchToSection(sectionId);
    });
  });
}

function switchToSection(sectionId) {
  // Hide all sections
  document.querySelectorAll('.section').forEach((section) => {
    section.classList.remove('active');
  });

  // Show target section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
  }

  // Update navigation
  document.querySelectorAll('.nav-item').forEach((item) => {
    item.classList.remove('active');
  });

  document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
  currentSection = sectionId;
}

// Character counters
function initializeCharacterCounters() {
  const inputs = [
    { id: 'title-cz', counter: 'title-cz-count', max: 60 },
    { id: 'title-en', counter: 'title-en-count', max: 60 },
    { id: 'desc-cz', counter: 'desc-cz-count', max: 160 },
    { id: 'desc-en', counter: 'desc-en-count', max: 160 },
  ];

  inputs.forEach(({ id, counter, max }) => {
    const input = document.getElementById(id);
    const counterEl = document.getElementById(counter);

    if (input && counterEl) {
      // Initial count
      updateCharacterCount(input, counterEl, max);

      // Update on input
      input.addEventListener('input', () => {
        updateCharacterCount(input, counterEl, max);
      });
    }
  });
}

function updateCharacterCount(input, counterEl, max) {
  const length = input.value.length;
  counterEl.textContent = length;

  const counterContainer = counterEl.parentElement;
  counterContainer.classList.remove('warning', 'error');

  if (length > max * 0.9) {
    counterContainer.classList.add('warning');
  }
  if (length > max) {
    counterContainer.classList.add('error');
  }
}

// Progress bars initialization
function initializeProgressBars() {
  const progressBars = document.querySelectorAll('.progress-current, .progress-target');

  setTimeout(() => {
    progressBars.forEach((bar) => {
      const progress = bar.dataset.progress;
      if (progress) {
        bar.style.width = progress + '%';
      }
    });
  }, 300);
}

// SEO Code Generation
function generateTitleCode() {
  const titleCz = document.getElementById('title-cz').value;
  const titleEn = document.getElementById('title-en').value;

  const code = `<!-- SEO Title Tags -->
<title>{t('meta.title')}</title>

<!-- i18n/cs.json -->
{
  "meta": {
    "title": "${titleCz}"
  }
}

<!-- i18n/en.json -->
{
  "meta": {
    "title": "${titleEn}"
  }
}`;

  document.getElementById('seo-code-output').innerHTML = `<code>${escapeHtml(code)}</code>`;
}

function generateDescCode() {
  const descCz = document.getElementById('desc-cz').value;
  const descEn = document.getElementById('desc-en').value;

  const code = `<!-- Meta Description -->
<meta name="description" content="{t('meta.description')}" />

<!-- i18n/cs.json -->
{
  "meta": {
    "description": "${descCz}"
  }
}

<!-- i18n/en.json -->
{
  "meta": {
    "description": "${descEn}"
  }
}`;

  document.getElementById('seo-code-output').innerHTML = `<code>${escapeHtml(code)}</code>`;
}

function generateOGCode() {
  const ogTitle = document.getElementById('og-title').value;
  const ogDesc = document.getElementById('og-desc').value;

  const code = `<!-- Open Graph Tags -->
<meta property="og:title" content="${ogTitle}" />
<meta property="og:description" content="${ogDesc}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://sparrowai.tech/" />
<meta property="og:image" content="https://sparrowai.tech/og-image.jpg" />

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${ogTitle}" />
<meta name="twitter:description" content="${ogDesc}" />
<meta name="twitter:image" content="https://sparrowai.tech/og-image.jpg" />

<!-- JSON-LD Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Sparrow AI Tech",
  "url": "https://sparrowai.tech/",
  "logo": "https://sparrowai.tech/logo.png"
}
</script>`;

  document.getElementById('seo-code-output').innerHTML = `<code>${escapeHtml(code)}</code>`;
}

// WCAG Functionality
function generateAltText() {
  const imageUrl = document.getElementById('image-url').value;
  const altTextInput = document.getElementById('alt-text');

  if (!imageUrl) {
    alert('Prosím vložte URL obrázku');
    return;
  }

  // Simulate AI alt text generation
  const filename = imageUrl.split('/').pop().split('.')[0];
  const generatedAlt = `AI generovaný popis pro obrázek: ${filename}`;
  altTextInput.value = generatedAlt;
}

// Contrast Analyzer
function initializeContrastAnalyzer() {
  const bgColorInput = document.getElementById('bg-color');
  const textColorInput = document.getElementById('text-color');
  const previewEl = document.getElementById('contrast-preview');
  const ratioEl = document.getElementById('contrast-ratio');

  function updateContrast() {
    const bgColor = bgColorInput.value;
    const textColor = textColorInput.value;

    previewEl.style.backgroundColor = bgColor;
    previewEl.style.color = textColor;

    const ratio = calculateContrastRatio(hexToRgb(bgColor), hexToRgb(textColor));
    ratioEl.textContent = `${ratio.toFixed(2)}:1`;

    // Update status based on WCAG standards
    if (ratio >= 7) {
      ratioEl.style.color = 'var(--color-success)';
    } else if (ratio >= 4.5) {
      ratioEl.style.color = 'var(--color-warning)';
    } else {
      ratioEl.style.color = 'var(--color-error)';
    }
  }

  bgColorInput.addEventListener('change', updateContrast);
  textColorInput.addEventListener('change', updateContrast);

  // Initial update
  updateContrast();
}

function calculateContrastRatio(rgb1, rgb2) {
  const l1 = getRelativeLuminance(rgb1);
  const l2 = getRelativeLuminance(rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function getRelativeLuminance(rgb) {
  const [r, g, b] = rgb.map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : null;
}

// CTA Designer
function initializeCTADesigner() {
  const textInput = document.getElementById('cta-text');
  const styleSelect = document.getElementById('cta-style');
  const previewBtn = document.getElementById('cta-preview-btn');

  function updateCTAPreview() {
    const text = textInput.value || 'Začněte zdarma';
    const style = styleSelect.value;

    previewBtn.textContent = text;
    previewBtn.className = `btn btn--${style} btn--lg`;
  }

  textInput.addEventListener('input', updateCTAPreview);
  styleSelect.addEventListener('change', updateCTAPreview);
}

function generateCTACode() {
  const text = document.getElementById('cta-text').value;
  const style = document.getElementById('cta-style').value;

  const code = `<!-- CTA Button Component -->
<button class="btn btn--${style} btn--lg cta-button">
  ${text}
</button>

<!-- CSS -->
.cta-button {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%);
  transform: translateY(0);
  transition: all var(--duration-normal) var(--ease-standard);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(var(--color-primary-rgb), 0.3);
}`;

  alert('CTA kód vygenerován! (Zobrazen v konzoli)');
}

// i18n Configuration
function generateI18nConfig() {
  const urlStructure = document.getElementById('url-structure').value;

  const config = `// astro-i18n.config.mjs
export default {
  locales: ["cs", "en"],
  defaultLocale: "cs",
  routes: {
    cs: {
      about: "o-nas",
      contact: "kontakt",
      pricing: "cenik"
    },
    en: {
      about: "about-us", 
      contact: "contact",
      pricing: "pricing"
    }
  },
  urlStructure: "${urlStructure}"
}`;

  generatedFiles['i18n-config'] = config;
  alert('i18n konfigurace vygenerována!');
}

// File Code Generation and Preview
function showFileCode(fileType) {
  const titleEl = document.getElementById('file-preview-title');
  const codeEl = document.getElementById('file-code-output');
  const copyBtn = document.getElementById('copy-file-btn');

  let code = '';
  let fileName = '';

  switch (fileType) {
    case 'index':
      fileName = 'index.astro';
      code = `---
import Layout from '../layouts/Layout.astro';
import SEOHead from '../components/SEOHead.astro';
import Header from '../components/Header.jsx';
---

<Layout>
  <SEOHead 
    title={t('meta.title')}
    description={t('meta.description')}
  />
  
  <Header />
  
  <main>
    <section class="hero">
      <div class="container">
        <h1>{t('hero.title')}</h1>
        <p>{t('hero.description')}</p>
        <button class="btn btn--primary btn--lg">
          {t('hero.cta')}
        </button>
      </div>
    </section>
  </main>
</Layout>`;
      break;

    case 'header':
      fileName = 'Header.jsx';
      code = `import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const switchLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  
  return (
    <header className="header" role="banner">
      <nav className="nav" role="navigation" aria-label="Main navigation">
        <div className="container">
          <a href="/" className="nav-brand" aria-label="Sparrow AI Tech Home">
            <img src="/logo.svg" alt="Sparrow AI Tech" width="120" height="40" />
          </a>
          
          <ul className="nav-menu" role="menubar">
            <li role="none">
              <a href="/about" className="nav-link" role="menuitem">
                {t('nav.about')}
              </a>
            </li>
            <li role="none">
              <a href="/features" className="nav-link" role="menuitem">
                {t('nav.features')}
              </a>
            </li>
            <li role="none">
              <a href="/contact" className="nav-link" role="menuitem">
                {t('nav.contact')}
              </a>
            </li>
          </ul>
          
          <div className="language-switcher">
            <button 
              onClick={() => switchLanguage('cs')}
              className={\`lang-btn \${i18n.language === 'cs' ? 'active' : ''}\`}
              aria-label="Switch to Czech"
            >
              CS
            </button>
            <button 
              onClick={() => switchLanguage('en')}
              className={\`lang-btn \${i18n.language === 'en' ? 'active' : ''}\`}
              aria-label="Switch to English"
            >
              EN
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}`;
      break;

    case 'seo':
      fileName = 'SEOHead.astro';
      code = `---
export interface Props {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

const { title, description, image = '/og-image.jpg', url = Astro.url } = Astro.props;
const canonicalUrl = new URL(Astro.url.pathname, Astro.site);
---

<!-- Primary Meta Tags -->
<title>{title}</title>
<meta name="title" content={title} />
<meta name="description" content={description} />
<link rel="canonical" href={canonicalUrl} />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content={url} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={image} />
<meta property="og:site_name" content="Sparrow AI Tech" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content={url} />
<meta property="twitter:title" content={title} />
<meta property="twitter:description" content={description} />
<meta property="twitter:image" content={image} />

<!-- JSON-LD Structured Data -->
<script type="application/ld+json" is:inline>
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Sparrow AI Tech",
  "url": "https://sparrowai.tech/",
  "logo": "https://sparrowai.tech/logo.png",
  "description": "{description}",
  "founder": {
    "@type": "Person",
    "name": "Sparrow AI Tech Team"
  }
}
</script>`;
      break;

    case 'i18n-config':
      fileName = 'astro-i18n.config.mjs';
      code =
        generatedFiles['i18n-config'] ||
        `// astro-i18n.config.mjs
export default {
  locales: ["cs", "en"],
  defaultLocale: "cs",
  routes: {
    cs: {
      about: "o-nas",
      contact: "kontakt", 
      pricing: "cenik",
      features: "funkce"
    },
    en: {
      about: "about-us",
      contact: "contact",
      pricing: "pricing", 
      features: "features"
    }
  },
  urlStructure: "prefix"
}`;
      break;
  }

  titleEl.textContent = fileName;
  codeEl.innerHTML = `<code>${escapeHtml(code)}</code>`;
  copyBtn.style.display = 'block';
  copyBtn.onclick = () => copyToClipboard('file-code-output');

  generatedFiles[fileType] = code;
}

function generateAllFiles() {
  // Generate all file codes
  ['index', 'header', 'seo', 'i18n-config'].forEach((fileType) => {
    showFileCode(fileType);
  });

  alert('Všechny soubory vygenerovány! Můžete je nyní prohlížet a kopírovat.');
}

function downloadFiles() {
  // In a real application, this would create and download a ZIP file
  alert(
    'Download funkce by vytvořila ZIP soubor se všemi generovanými soubory. Pro demo účely jsou soubory dostupné k kopírování.'
  );
}

function copyFileCode() {
  const codeEl = document.getElementById('file-code-output');
  const text = codeEl.textContent;

  navigator.clipboard.writeText(text).then(() => {
    const copyBtn = document.getElementById('copy-file-btn');
    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'Zkopírováno!';
    copyBtn.classList.add('status--success');

    setTimeout(() => {
      copyBtn.textContent = originalText;
      copyBtn.classList.remove('status--success');
    }, 2000);
  });
}

// Utility Functions
function copyToClipboard(elementId) {
  const element = document.getElementById(elementId);
  const text = element.textContent;

  navigator.clipboard.writeText(text).then(() => {
    // Find copy button and show success state
    const copyBtn = element.parentElement.querySelector('.copy-btn');
    if (copyBtn) {
      const originalText = copyBtn.textContent;
      copyBtn.textContent = 'Zkopírováno!';
      copyBtn.style.backgroundColor = 'var(--color-success)';

      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.backgroundColor = '';
      }, 2000);
    }
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Load application data
function loadApplicationData() {
  // Simulate loading data from the provided JSON

  // Update progress indicators based on actual data
  updateProgressIndicators();

  // Pre-fill some forms with current data
  prefillForms();
}

function updateProgressIndicators() {
  const progressData = {
    seo: 25,
    wcag: 58,
    content: 30,
    i18n: 0,
  };

  Object.entries(progressData).forEach(([key, value]) => {
    const progressBar = document.querySelector(`[data-progress="${value}"]`);
    if (progressBar) {
      setTimeout(() => {
        progressBar.style.width = value + '%';
      }, 500);
    }
  });
}

function prefillForms() {
  // Pre-fill title inputs with recommended titles
  const titleCzInput = document.getElementById('title-cz');
  const titleEnInput = document.getElementById('title-en');

  if (titleCzInput) {
    titleCzInput.value = 'Sparrow AI Tech – AI nástroje pro vývojáře';
    updateCharacterCount(titleCzInput, document.getElementById('title-cz-count'), 60);
  }

  if (titleEnInput) {
    titleEnInput.value = 'Sparrow AI Tech – AI Tools for Developers';
    updateCharacterCount(titleEnInput, document.getElementById('title-en-count'), 60);
  }
}
