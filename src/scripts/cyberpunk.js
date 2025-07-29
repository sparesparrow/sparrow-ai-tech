// Main cyberpunk theme JavaScript for Astro
document.addEventListener('DOMContentLoaded', function () {
  initTypewriter();
  initScrollAnimations();
  initNavigation();
  initMatrixRain();
  initGlitchEffect();
});

function initTypewriter() {
  const typewriterElement = document.getElementById('typewriter');
  if (!typewriterElement) return;
  
  const text = 'AI-driven tools for the future of development';
  let index = 0;
  
  function typeChar() {
    if (index < text.length) {
      typewriterElement.textContent += text.charAt(index);
      index++;
      setTimeout(typeChar, 100);
    }
  }
  
  setTimeout(typeChar, 1000);
}

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };
  
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  const animatedElements = document.querySelectorAll('.cyber-card, .fade-in');
  animatedElements.forEach((el) => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
}

function initNavigation() {
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
        
        document.querySelectorAll('.cyber-nav-link').forEach((navLink) => {
          navLink.classList.remove('active');
        });
        this.classList.add('active');
      }
    });
  });
  
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

function initMatrixRain() {
  if (window.innerWidth <= 768) return;
  
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
  
  const matrix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()';
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
  
  window.addEventListener('resize', function () {
    resizeCanvas();
    columns = Math.floor(canvas.width / fontSize);
    initDrops();
  });
}

function initGlitchEffect() {
  const glitchElements = document.querySelectorAll('.cyber-glitch');
  glitchElements.forEach((element) => {
    element.addEventListener('mouseenter', function () {
      this.style.animation = 'glitch 0.3s ease-in-out';
    });
    element.addEventListener('animationend', function () {
      this.style.animation = '';
    });
  });
}

window.addEventListener('scroll', function () {
  const scrolled = window.pageYOffset;
  const heroElements = document.querySelectorAll('.cyber-hero-parallax');
  
  heroElements.forEach((element) => {
    const rate = scrolled * -0.3;
    element.style.transform = `translateY(${rate}px)`;
  });
});
