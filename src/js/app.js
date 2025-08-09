document.addEventListener('DOMContentLoaded', function () {
  initTypewriter();
  initScrollAnimations();
  initNavigation();
  initSkillBars();
  initProjectCards();
  initPhilosophyQuotes();
  initMatrixRain();
  initTerminalAnimation();
  initFormHandling();
  initGlitchEffect();
});

// Typewriter effect with real Czech text
function initTypewriter() {
  const typewriterElement = document.getElementById('typewriter');
  if (!typewriterElement) return;
  const text = 'Automatizační šílenec, který se nikdy nenudí';
  let index = 0;
  function typeChar() {
    if (index < text.length) {
      typewriterElement.textContent += text.charAt(index);
      index++;
      setTimeout(typeChar, 100);
    }
  }

  // Start typing after a short delay
  setTimeout(typeChar, 1000);
}

// Enhanced scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Special handling for stats animation
        if (entry.target.classList.contains('cyber-stat-item')) {
          animateStatNumbers(entry.target);
        }
      }
    });
  }, observerOptions);

  // Add fade-in class to elements and observe them
  const animatedElements = document.querySelectorAll('.cyber-card, .fade-in, .cyber-stat-item');
  animatedElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
}

// Animate statistics numbers
function animateStatNumbers(statElement) {
  const numberElement = statElement.querySelector('.cyber-stat-number');
  if (!numberElement) return;

  const finalText = numberElement.textContent;
  const finalNumber = parseInt(finalText.replace(/[^\d]/g, ''));

  if (isNaN(finalNumber)) return;

  let currentNumber = 0;
  const increment = Math.ceil(finalNumber / 50);
  const timer = setInterval(() => {
    currentNumber += increment;
    if (currentNumber >= finalNumber) {
      numberElement.textContent = finalText;
      clearInterval(timer);
    } else {
      numberElement.textContent =
        currentNumber + finalText.replace(/[\d]/g, '').substring(finalNumber.toString().length);
    }
  }, 50);
}

// Animated skill progress bars
function initSkillBars() {
  const skillObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skillProgress = entry.target.querySelector('.skill-progress');
          const level = skillProgress.getAttribute('data-level');

          // Animate the progress bar
          setTimeout(() => {
            skillProgress.style.width = level + '%';
          }, 300);

          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.skill-item').forEach(item => {
    skillObserver.observe(item);
  });
}

// Enhanced navigation
function initNavigation() {
  // Smooth scroll for navigation links
  document.querySelectorAll('.cyber-nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const navHeight = document.querySelector('.cyber-nav').offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });

        // Update active state
        document.querySelectorAll('.cyber-nav-link').forEach(navLink => {
          navLink.classList.remove('active');
        });
        this.classList.add('active');
      }
    });
  });

  // Update active nav link on scroll
  window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.cyber-nav-link');
  let currentSection = '';

  const scrollPosition = window.scrollY + 150;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
}

// Enhanced project cards functionality
function initProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    // Enhanced mouse events
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-8px) scale(1.02)';

      // Add glow effect to tech tags
      const techTags = this.querySelectorAll('.tech-tag, .feature-tag');
      techTags.forEach(tag => {
        tag.style.boxShadow = '0 0 15px rgba(57, 255, 20, 0.3)';
      });
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';

      // Remove glow effect
      const techTags = this.querySelectorAll('.tech-tag, .feature-tag');
      techTags.forEach(tag => {
        tag.style.boxShadow = '';
      });
    });

    // Make cards keyboard accessible
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');

    const projectName = card.querySelector('.project-name').textContent;
    card.setAttribute('aria-label', `Otevřit projekt ${projectName} na GitHubu`);

    // Handle clicks on the entire card
    card.addEventListener('click', function (e) {
      if (e.target.closest('.project-link')) {
        return;
      }

      const projectLink = this.querySelector('.project-link');
      if (projectLink) {
        window.open(projectLink.href, '_blank');
      }
    });

    // Handle keyboard navigation
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const projectLink = this.querySelector('.project-link');
        if (projectLink) {
          window.open(projectLink.href, '_blank');
        }
      }
    });
  });
}

// Philosophy quotes typewriter effect
function initPhilosophyQuotes() {
  const quotes = [
    "Programuji nejčastěji tak, že večer spustím orchestrační skript s nekonečným cyklem instrukcí typu 'Pokračuj dalším bodem ve svém seznamu úkolů'. Ráno cyklus zastavím a objevujem nové změny na svém domácím počítači.",
    'Automatizace pomocí různých nástrojů včetně AI mi umožňuje efektivně řešit komplexní problémy, které bych bez takových nástrojů řešit ani nezačal.',
    'Svoboda je pro mě základním pilířem smyslu života a předpokladem pro efektivní učení se novým dovednostem.',
    'Archetyp programátora, který sedí neustále u počítače, dnes podle mě neplatí. Moderní development je o orchestraci systémů a AI nástrojů.',
  ];

  const quoteElements = [
    document.getElementById('quote1'),
    document.getElementById('quote2'),
    document.getElementById('quote3'),
    document.getElementById('quote4'),
  ];

  // Observer for philosophy section
  const philosophyObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Start typing quotes with delays
          quoteElements.forEach((element, index) => {
            if (element) {
              setTimeout(() => {
                typeQuote(element, quotes[index]);
              }, index * 1000);
            }
          });
          philosophyObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  const philosophySection = document.getElementById('philosophy');
  if (philosophySection) {
    philosophyObserver.observe(philosophySection);
  }

  function typeQuote(element, text) {
    let index = 0;
    element.textContent = '';

    function typeChar() {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(typeChar, 30);
      }
    }
    typeChar();
  }
}

// Terminal animation for hero section
function initTerminalAnimation() {
  const terminalLines = document.querySelectorAll('.terminal-line.output');

  if (terminalLines.length === 0) return;

  // Animate terminal output with delays
  terminalLines.forEach((line, index) => {
    line.style.opacity = '0';
    line.style.transform = 'translateX(-20px)';

    setTimeout(
      () => {
        line.style.transition = 'all 0.5s ease';
        line.style.opacity = '1';
        line.style.transform = 'translateX(0)';
      },
      (index + 1) * 800
    );
  });
}

// Enhanced matrix rain effect
function initMatrixRain() {
  if (window.innerWidth <= 768) return; // Skip on mobile

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '-1';
  canvas.style.opacity = '0.03';

  document.body.appendChild(canvas);

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();

  // MCP-themed matrix characters
  const matrix = 'MCP{}[]()ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()ĄŻČĐĘŁŃÓŚŤÜŽ';
  const matrixArray = matrix.split('');
  const fontSize = 10;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = [];

  function initDrops() {
    drops = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }
  }

  initDrops();

  function draw() {
    ctx.fillStyle = 'rgba(13, 17, 23, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#39ff14';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  const matrixInterval = setInterval(draw, 35);
  clearInterval(matrixInterval); // Cleanup
  clearInterval(matrixInterval); // Cleanup
  clearInterval(matrixInterval); // Cleanup on unload (optional)

  // Handle window resize
  window.addEventListener('resize', function () {
    resizeCanvas();
    columns = Math.floor(canvas.width / fontSize);
    initDrops();
  });
}

// Add matrix rain effect (optional background animation)
function createMatrixRain() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '-1';
  canvas.style.opacity = '0.05';

  document.body.appendChild(canvas);

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();

  const matrix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}';
  const matrixArray = matrix.split('');

  const fontSize = 10;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = [];

  function initDrops() {
    drops = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }
  }

  initDrops();

  function draw() {
    ctx.fillStyle = 'rgba(13, 17, 23, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#39ff14';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  const matrixInterval = setInterval(draw, 35);

  // Handle window resize
  window.addEventListener('resize', function () {
    resizeCanvas();
    columns = Math.floor(canvas.width / fontSize);
    initDrops();
  });

  return matrixInterval;
}

// Form handling
function initFormHandling() {
  const form = document.querySelector('.contact .form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form inputs
      const nameInput = form.querySelector('input[type="text"]');
      const emailInput = form.querySelector('input[type="email"]');
      const messageInput = form.querySelector('textarea');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      // Simple validation
      if (!name || !email || !message) {
        showNotification('Prosím vyplňte všechna pole', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showNotification('Prosím zadejte platný email', 'error');
        return;
      }

      // Simulate form submission
      showNotification('Zpráva byla odeslána! Brzy se vám ozvu.', 'success');
      form.reset();
    });
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showNotification(message, type) {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => {
    notification.remove();
  });

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.textContent = message;

  // Style the notification
  Object.assign(notification.style, {
    position: 'fixed',
    top: '100px',
    right: '20px',
    background: type === 'success' ? 'var(--color-cyber-green)' : 'var(--color-cyber-orange)',
    color: 'var(--color-cyber-bg)',
    padding: '1rem 1.5rem',
    borderRadius: '6px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    zIndex: '10000',
    transform: 'translateX(400px)',
    transition: 'transform 0.3s ease',
    maxWidth: '300px',
    wordWrap: 'break-word',
  });

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Animate out and remove
  setTimeout(() => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 4000);
}

// Add glitch effect to hero title
function addGlitchEffect() {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.addEventListener('mouseenter', function () {
      this.style.animation = 'glitch 0.3s ease-in-out';
    });

    heroTitle.addEventListener('animationend', function () {
      this.style.animation = '';
    });
  }
}

// Add CSS for glitch animation and navigation active state
const additionalStyles = `
@keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
}

.nav-link.active {
    color: var(--color-cyber-green) !important;
    background: rgba(57, 255, 20, 0.1) !important;
    text-shadow: 0 0 5px var(--color-cyber-green) !important;
}

.project-card {
    cursor: pointer;
}

.project-card:focus {
    outline: 2px solid var(--color-cyber-green);
    outline-offset: 2px;
}

.project-link:focus {
    outline: 2px solid var(--color-cyber-blue);
    outline-offset: 2px;
}
`;

// Inject additional CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize matrix rain with a delay and only on larger screens
document.addEventListener('DOMContentLoaded', function () {
  if (window.innerWidth > 768) {
    setTimeout(createMatrixRain, 2000);
  }
});

// Initialize glitch effect
document.addEventListener('DOMContentLoaded', addGlitchEffect);

// Add glitch effect to specific elements
document.addEventListener('DOMContentLoaded', function () {
  const glitchElements = document.querySelectorAll('.cyber-glitch');

  glitchElements.forEach(element => {
    element.addEventListener('mouseenter', function () {
      this.style.animation = 'glitch 0.3s ease-in-out';
    });

    element.addEventListener('animationend', function () {
      this.style.animation = '';
    });
  });
});

// Parallax effect for hero section
window.addEventListener('scroll', function () {
  const scrolled = window.pageYOffset;
  const heroElements = document.querySelectorAll('.cyber-hero-parallax');

  heroElements.forEach(element => {
    const rate = scrolled * -0.2;
    element.style.transform = `translateY(${rate}px)`;
  });
});

// Add keyboard navigation for accessibility
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    // Close any notifications and return to top
    const notifications = document.querySelectorAll('.notification');
    notifications.forEach(notification => notification.remove());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// Ensure contact links work properly
document.addEventListener('DOMContentLoaded', function () {
  const contactLinks = document.querySelectorAll('.contact-link');
  contactLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      // Make sure external links open in new tabs
      if (this.href && this.href.startsWith('http')) {
        this.setAttribute('target', '_blank');
        this.setAttribute('rel', 'noopener noreferrer');
      }
    });
  });
});

// Glitch effect for interactive elements
function initGlitchEffect() {
  const glitchElements = document.querySelectorAll('.cyber-glitch');
  glitchElements.forEach(element => {
    element.addEventListener('mouseenter', function () {
      this.style.animation = 'glitch 0.3s ease-in-out';
    });
    element.addEventListener('animationend', function () {
      this.style.animation = '';
    });
  });
}

// Enhanced cyberpunk UI effects
function unnamedFunction() {
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
}

// Language toggle is handled by React component `LanguageToggle.jsx`
