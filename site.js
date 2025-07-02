// JavaScript for /sparrow-ai-tech/index.html modularized
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
    slide.classList.toggle('active', i === idx);
    slide.setAttribute('tabindex', i === idx ? '0' : '-1');
    slide.setAttribute('aria-hidden', i !== idx);
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
  // Keyboard navigation
  document.querySelector('.testimonials-carousel').addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
  });
  showTestimonial(currentTestimonial);
}
