// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    initTypewriter();
    initScrollAnimations();
    initSkillBars();
    initNavigation();
    initPhilosophyQuotes();
    initFormHandling();
    initProjectCards();
});

// Typewriter effect for hero section
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
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

// Scroll animations for fade-in effects
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements and observe them
    const animatedElements = document.querySelectorAll('.project-card, .skill-item, .quote-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Animated skill progress bars
function initSkillBars() {
    const skillObserver = new IntersectionObserver(function(entries) {
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
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.skill-item').forEach(item => {
        skillObserver.observe(item);
    });
}

// Fixed navigation functionality
function initNavigation() {
    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active state immediately
                document.querySelectorAll('.nav-link').forEach(navLink => {
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
    const navLinks = document.querySelectorAll('.nav-link');
    
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

// Initialize project cards functionality
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Handle mouse events for visual feedback
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Make cards keyboard accessible
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        const projectName = card.querySelector('.project-name').textContent;
        card.setAttribute('aria-label', `Otevřit projekt ${projectName} na GitHubu`);
        
        // Handle clicks on the entire card
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking directly on the GitHub link
            if (e.target.closest('.project-link')) {
                return;
            }
            
            const projectLink = this.querySelector('.project-link');
            if (projectLink) {
                window.open(projectLink.href, '_blank');
            }
        });
        
        // Handle keyboard navigation
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const projectLink = this.querySelector('.project-link');
                if (projectLink) {
                    window.open(projectLink.href, '_blank');
                }
            }
        });
    });
    
    // Ensure GitHub links work properly
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent card click handler
        });
    });
}

// Philosophy quotes typewriter effect
function initPhilosophyQuotes() {
    const quotes = [
        "Programuji nejčastěji tak, že večer spustím orchestrační skript s nekonečným cyklem instrukcí typu 'Pokračuj dalším bodem ve svém seznamu úkolů'. Ráno cyklus zastavím a objevujem nové změny na svém domácím počítači.",
        "Automatizace pomocí různých nástrojů včetně AI mi umožňuje efektivně řešit komplexní problémy, které bych bez takových nástrojů řešit ani nezačal.",
        "Svoboda je pro mě základním pilířem smyslu života a předpokladem pro efektivní učení se novým dovednostem.",
        "Archetyp programátora, který sedí neustále u počítače, dnes podle mě neplatí."
    ];
    
    const quoteElements = [
        document.getElementById('quote1'),
        document.getElementById('quote2'),
        document.getElementById('quote3'),
        document.getElementById('quote4')
    ];
    
    // Observer for philosophy section
    const philosophyObserver = new IntersectionObserver(function(entries) {
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
    }, { threshold: 0.3 });
    
    const philosophySection = document.getElementById('philosophy');
    if (philosophySection) {
        philosophyObserver.observe(philosophySection);
    }
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

// Form handling
function initFormHandling() {
    const form = document.querySelector('.contact .form');
    if (form) {
        form.addEventListener('submit', function(e) {
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
        wordWrap: 'break-word'
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
        heroTitle.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.3s ease-in-out';
        });
        
        heroTitle.addEventListener('animationend', function() {
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

// Initialize glitch effect
document.addEventListener('DOMContentLoaded', addGlitchEffect);

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        const rate = scrolled * -0.3;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

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
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    
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
    window.addEventListener('resize', function() {
        resizeCanvas();
        columns = Math.floor(canvas.width / fontSize);
        initDrops();
    });
    
    return matrixInterval;
}

// Initialize matrix rain with a delay and only on larger screens
document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth > 768) {
        setTimeout(createMatrixRain, 2000);
    }
});

// Add keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any notifications and return to top
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => notification.remove());
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Ensure contact links work properly
document.addEventListener('DOMContentLoaded', function() {
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Make sure external links open in new tabs
            if (this.href && this.href.startsWith('http')) {
                this.setAttribute('target', '_blank');
                this.setAttribute('rel', 'noopener noreferrer');
            }
        });
    });
});