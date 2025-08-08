// Enhanced cyberpunk UI effects
(function () {
  try {
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      // Simple glow pulse on nav logo
      const logo = document.querySelector('.nav-logo');
      if (logo) {
        logo.style.transition = 'text-shadow 0.6s ease-in-out';
        setInterval(() => {
          logo.style.textShadow = '0 0 6px #39ff14, 0 0 12px #39ff14';
          setTimeout(() => (logo.style.textShadow = 'none'), 300);
        }, 3500);
      }

      // Animate counters if present
      const counters = document.querySelectorAll('.stat-number[data-target]');
      const animateCounter = el => {
        const target = Number(el.getAttribute('data-target') || '0');
        let current = 0;
        const step = Math.max(1, Math.floor(target / 60));
        const interval = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          el.textContent = String(current);
        }, 16);
      };
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach(c => observer.observe(c));
    }

    // Typewriter effect if present
    const typewriter = document.getElementById('typewriter');
    if (typewriter) {
      const phrases = ['MCP Pioneer', 'AI Integration Specialist', 'Automation Architect'];
      let idx = 0;
      let pos = 0;
      let forward = true;
      const tick = () => {
        const text = phrases[idx];
        if (forward) {
          pos++;
          if (pos > text.length) {
            forward = false;
            setTimeout(tick, 900);
            return;
          }
        } else {
          pos--;
          if (pos === 0) {
            forward = true;
            idx = (idx + 1) % phrases.length;
          }
        }
        typewriter.textContent = text.slice(0, pos);
        setTimeout(tick, forward ? 85 : 45);
      };
      tick();
    }
  } catch (err) {
    // no-op fail safe
    console.error('[enhanced-cyberpunk] init failed', err);
  }
})();
