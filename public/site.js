// JavaScript for /sparrow-ai-tech/index.html modularized
// All logic is attached after DOMContentLoaded for safety.
// Place all logic from the previous inline <script> here, including App object and event listeners.
// For brevity, you can copy the entire App object and its initialization from the original HTML.
// Also include the back-to-top button logic and any other scripts that were inline.

// Testimonials carousel logic
let currentTestimonial = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');
function showTestimonial(idx) {
  slides.forEach((slide, i) => {
    slide?.classList.toggle('active', i === idx);
    slide?.setAttribute('tabindex', i === idx ? '0' : '-1');
    slide?.setAttribute('aria-hidden', i !== idx);
  });
}
if (prevBtn && nextBtn && slides.length) {
  prevBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + slides.length) % slides.length;
    showTestimonial(currentTestimonial);
    prevBtn.focus();
  });
  nextBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % slides.length;
    showTestimonial(currentTestimonial);
    nextBtn.focus();
  });
  const carousel = document.querySelector('.testimonials-carousel');
  if (carousel) {
    carousel.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') prevBtn.click();
      if (e.key === 'ArrowRight') nextBtn.click();
    });
  }
  showTestimonial(currentTestimonial);
}

// Multilingual support and dynamic content loading
async function loadTranslations(lang) {
  try {
    const res = await fetch(`languages/${lang}.json`);
    if (!res.ok) throw new Error('Missing translation file');
    return await res.json();
  } catch (e) {
    console.error('Translation load error:', e);
    if (lang !== 'en') return loadTranslations('en');
    return {};
  }
}

function setHtmlLang(lang) {
  document.documentElement.lang = lang;
}

function updateMetaTags(lang, translations) {
  // Example: update title and description
  if (translations.page_title) document.title = translations.page_title;
  if (translations.page_description) {
    let desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', translations.page_description);
  }
  // Add more meta updates as needed
}

async function applyTranslations(lang) {
  const translations = await loadTranslations(lang);
  document.querySelectorAll('[data-translate-key]').forEach(el => {
    const key = el.getAttribute('data-translate-key');
    if (translations[key]) el.innerHTML = translations[key];
  });
  setHtmlLang(lang);
  updateMetaTags(lang, translations);
}

function getCurrentLang() {
  return localStorage.getItem('language') || 'cs';
}

const siteLangSwitcher = document.getElementById('site-lang-switcher');
if (siteLangSwitcher) {
  siteLangSwitcher.addEventListener('change', function(e) {
    const lang = e.target.value;
    localStorage.setItem('language', lang);
    location.reload();
  });
}

window.addEventListener('DOMContentLoaded', async () => {
  const lang = getCurrentLang();
  const siteLangSwitcher = document.getElementById('site-lang-switcher');
  if (siteLangSwitcher) siteLangSwitcher.value = lang;
  await applyTranslations(lang);
  // ... existing code ...
});

// Article modal dynamic loading
async function loadArticle(articleKey) {
  const lang = getCurrentLang();
  let path = `articles/${articleKey}.${lang === 'cs' ? 'cs.md' : 'md'}`;
  let res = await fetch(path);
  if (!res.ok && lang !== 'en') {
    path = `articles/${articleKey}.md`;
    res = await fetch(path);
  }
  if (res.ok) {
    const md = await res.text();
    renderMarkdownInModal(md);
  } else {
    renderMarkdownInModal('This article is not yet available in your language.');
  }
}

function renderMarkdownInModal(md) {
  if (window.marked) {
    const modalBody = document.getElementById('article-modal-body');
    if (modalBody) modalBody.innerHTML = window.marked.parse(md);
  } else {
    const modalBody = document.getElementById('article-modal-body');
    if (modalBody) modalBody.innerText = md;
  }
}

// Attach to all read-more buttons
function setupArticleButtons() {
  document.querySelectorAll('.read-more-button').forEach(btn => {
    btn.addEventListener('click', function() {
      const articleKey = btn.getAttribute('data-article-key');
      loadArticle(articleKey);
      const modal = document.getElementById('article-modal-overlay');
      if (modal) modal.classList.add('active');
    });
  });
}
window.addEventListener('DOMContentLoaded', setupArticleButtons);
