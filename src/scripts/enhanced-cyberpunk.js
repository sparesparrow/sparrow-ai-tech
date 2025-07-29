// Enhanced Cyberpunk Interactive Features with Real Content
document.addEventListener('DOMContentLoaded', function () {
  initTypewriter();
  initScrollAnimations();
  initNavigation();
  initProjectCards();
  initPhilosophyQuotes();
  initMatrixRain();
  initTerminalAnimation();
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
    entries.forEach((entry) => {
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
  animatedElements.forEach((el) => {
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

// Enhanced navigation
function initNavigation() {
  // Smooth scroll for navigation links
  document.querySelectorAll('.cyber-nav-link').forEach((link) => {
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
        document.querySelectorAll('.cyber-nav-link').forEach((navLink) => {
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

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
}

// Enhanced project cards functionality
function initProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach((card) => {
    // Enhanced mouse events
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-8px) scale(1.02)';

      // Add glow effect to tech tags
      const techTags = this.querySelectorAll('.tech-tag, .feature-tag');
      techTags.forEach((tag) => {
        tag.style.boxShadow = '0 0 15px rgba(57, 255, 20, 0.3)';
      });
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';

      // Remove glow effect
      const techTags = this.querySelectorAll('.tech-tag, .feature-tag');
      techTags.forEach((tag) => {
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
      entries.forEach((entry) => {
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

// Add glitch effect to specific elements
document.addEventListener('DOMContentLoaded', function () {
  const glitchElements = document.querySelectorAll('.cyber-glitch');

  glitchElements.forEach((element) => {
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

  heroElements.forEach((element) => {
    const rate = scrolled * -0.2;
    element.style.transform = `translateY(${rate}px)`;
  });
});
