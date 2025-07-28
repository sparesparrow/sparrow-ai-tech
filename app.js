 
// Application state
let _currentSection = 'dashboard';
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
  _currentSection = sectionId;
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

// SEO Code Generation functions - now properly implemented
function _generateTitleCode() {
  const titleCz = document.getElementById('title-cz')?.value || '';
  const titleEn = document.getElementById('title-en')?.value || '';
  
  const code = `<title>${titleCz || titleEn}</title>`;
  document.getElementById('seo-code-output').innerHTML = `<pre>${escapeHtml(code)}</pre>`;
}

function _generateDescCode() {
  const descCz = document.getElementById('desc-cz')?.value || '';
  const descEn = document.getElementById('desc-en')?.value || '';
  
  const code = `<meta name="description" content="${descCz || descEn}">`;
  document.getElementById('seo-code-output').innerHTML = `<pre>${escapeHtml(code)}</pre>`;
}

function _generateOGCode() {
  const ogTitle = document.getElementById('og-title')?.value || '';
  const ogDesc = document.getElementById('og-desc')?.value || '';
  
  const code = `<meta property="og:title" content="${ogTitle}">
<meta property="og:description" content="${ogDesc}">`;
  document.getElementById('seo-code-output').innerHTML = `<pre>${escapeHtml(code)}</pre>`;
}

// WCAG Functionality
function _generateAltText() {
  const imageUrl = document.getElementById('image-url')?.value;
  const altTextInput = document.getElementById('alt-text');
  
  if (!imageUrl) {
    alert('Prosím vložte URL obrázku');
    return;
  }

  // Simulate AI alt text generation
  const filename = imageUrl.split('/').pop().split('.')[0];
  const generatedAlt = `AI generovaný popis pro obrázek: ${filename}`;
  if (altTextInput) {
    altTextInput.value = generatedAlt;
  }
}

// Contrast Analyzer
function initializeContrastAnalyzer() {
  const bgColorInput = document.getElementById('bg-color');
  const textColorInput = document.getElementById('text-color');
  const previewEl = document.getElementById('contrast-preview');
  const ratioEl = document.getElementById('contrast-ratio');

  function updateContrast() {
    const bgColor = bgColorInput?.value || '#ffffff';
    const textColor = textColorInput?.value || '#000000';
    
    if (previewEl) {
      previewEl.style.backgroundColor = bgColor;
      previewEl.style.color = textColor;
    }
    
    const ratio = calculateContrastRatio(hexToRgb(bgColor), hexToRgb(textColor));
    if (ratioEl) {
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
  }

  if (bgColorInput) bgColorInput.addEventListener('change', updateContrast);
  if (textColorInput) textColorInput.addEventListener('change', updateContrast);
  
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
    : [0, 0, 0];
}

// CTA Designer
function initializeCTADesigner() {
  const textInput = document.getElementById('cta-text');
  const styleSelect = document.getElementById('cta-style');
  const previewBtn = document.getElementById('cta-preview-btn');

  function updateCTAPreview() {
    const text = textInput?.value || 'Začněte zdarma';
    const style = styleSelect?.value || 'primary';
    
    if (previewBtn) {
      previewBtn.textContent = text;
      previewBtn.className = `btn btn--${style} btn--lg`;
    }
  }

  if (textInput) textInput.addEventListener('input', updateCTAPreview);
  if (styleSelect) styleSelect.addEventListener('change', updateCTAPreview);
}

function _generateCTACode() {
  const text = document.getElementById('cta-text')?.value || 'Začněte zdarma';
  const style = document.getElementById('cta-style')?.value || 'primary';
  
  const _code = `<button class="btn btn--${style} btn--lg">${text}</button>`;
  console.log('Generated CTA code:', _code);
  alert('CTA kód vygenerován! (Zobrazen v konzoli)');
}

// i18n Configuration
function _generateI18nConfig() {
  const urlStructure = document.getElementById('url-structure')?.value || 'subdirectory';
  
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

// File Code Generation and Preview functions
function _showFileCode(fileType) {
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
  <SEOHead />
  <Header />
  <main>
    <h1>Welcome</h1>
  </main>
</Layout>`;
      break;
    default:
      code = `// File: ${fileType}`;
  }

  if (titleEl) titleEl.textContent = fileName;
  if (codeEl) codeEl.innerHTML = `<pre>${escapeHtml(code)}</pre>`;
  if (copyBtn) {
    copyBtn.style.display = 'block';
    copyBtn.onclick = () => copyToClipboard('file-code-output');
  }
  
  generatedFiles[fileType] = code;
}

function _generateAllFiles() {
  // Generate all file codes
  ['index', 'header', 'seo', 'i18n-config'].forEach((fileType) => {
    _showFileCode(fileType);
  });
  alert('Všechny soubory vygenerovány! Můžete je nyní prohlížet a kopírovat.');
}

function _downloadFiles() {
  // In a real application, this would create and download a ZIP file
  alert(
    'Download funkce by vytvořila ZIP soubor se všemi generovanými soubory. Pro demo účely jsou soubory dostupné k kopírování.'
  );
}

function _copyFileCode() {
  const codeEl = document.getElementById('file-code-output');
  const text = codeEl?.textContent || '';
  
  navigator.clipboard.writeText(text).then(() => {
    const copyBtn = document.getElementById('copy-file-btn');
    if (copyBtn) {
      const originalText = copyBtn.textContent;
      copyBtn.textContent = 'Zkopírováno!';
      copyBtn.classList.add('status--success');
      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.classList.remove('status--success');
      }, 2000);
    }
  });
}

// Utility Functions
function copyToClipboard(elementId) {
  const element = document.getElementById(elementId);
  const text = element?.textContent || '';
  
  navigator.clipboard.writeText(text).then(() => {
    // Find copy button and show success state
    const copyBtn = element?.parentElement?.querySelector('.copy-btn');
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
    console.log(`Processing progress for ${key}: ${value}%`);
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

// Make functions available globally if needed
window.generateTitleCode = _generateTitleCode;
window.generateDescCode = _generateDescCode;
window.generateOGCode = _generateOGCode;
window.generateAltText = _generateAltText;
window.generateCTACode = _generateCTACode;
window.generateI18nConfig = _generateI18nConfig;
window.showFileCode = _showFileCode;
window.generateAllFiles = _generateAllFiles;
window.downloadFiles = _downloadFiles;
window.copyFileCode = _copyFileCode;
