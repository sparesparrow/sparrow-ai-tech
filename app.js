(function(){
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('nav-list');
  if (toggle && navList){
    toggle.addEventListener('click', () => {
      const open = navList.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Make entire card focusable via link already; also support Enter on card for accessibility in older AT
  document.querySelectorAll('.card').forEach(card => {
    const link = card.querySelector('.card-link');
    if (!link) return;
    card.tabIndex = 0;
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        link.click();
      }
    });
  });

  // Lightbox for gallery
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  function openLightbox(src, alt=''){
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
  }
  function closeLightbox(){
    if (!lightbox || !lightboxImg) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden','true');
    lightboxImg.src = '';
    lightboxImg.alt = '';
  }
  document.querySelectorAll('.gallery-item').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const src = btn.getAttribute('data-full');
      const img = btn.querySelector('img');
      openLightbox(src, img ? img.alt : '');
    });
    btn.addEventListener('keydown', (e)=>{
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const src = btn.getAttribute('data-full');
        const img = btn.querySelector('img');
        openLightbox(src, img ? img.alt : '');
      }
    });
  });
  if (lightbox){
    lightbox.addEventListener('click', (e)=>{
      if (e.target === lightbox) closeLightbox();
    });
  }
  if (lightboxClose){
    lightboxClose.addEventListener('click', closeLightbox);
  }
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape') closeLightbox();
  });

  // Subtle hero background parallax (respect reduced motion)
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg && !prefersReduced){
    window.addEventListener('scroll', ()=>{
      const y = window.scrollY * 0.1;
      heroBg.style.transform = `translateY(${y}px)`;
    }, {passive:true});
  }
})();
