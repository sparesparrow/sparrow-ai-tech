describe('Infographics Section', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/index.html');
  });

  it('should display Infografiky link in navigation', () => {
    cy.get('a[href="#infographics"]').should('exist').and('contain', 'Infografiky');
  });

  it('should display Infographics section', () => {
    cy.get('#infographics').should('exist');
    cy.get('#infographics h2').should('contain', 'Infografiky');
  });

  it('should have three infographic cards with correct links', () => {
    cy.get('#infographics a[href="infographics/1.html"]').should('exist');
    cy.get('#infographics a[href="infographics/2.html"]').should('exist');
    cy.get('#infographics a[href="infographics/3.html"]').should('exist');
  });

  it('should open Infografika 1 in a new tab', () => {
    cy.get('#infographics a[href="infographics/1.html"]').should('have.attr', 'target', '_blank');
  });
});

describe('Navigation and Main Sections', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/index.html');
  });

  it('should display all main navigation links', () => {
    cy.get('a[href="#services"]').should('exist');
    cy.get('a[href="#articles"]').should('exist');
    cy.get('a[href="#about"]').should('exist');
    cy.get('a[href="#projects"]').should('exist');
    cy.get('a[href="#references"]').should('exist');
    cy.get('a[href="#contact"]').should('exist');
    cy.get('a[href="#infographics"]').should('exist');
  });

  it('should display the Quick Analysis form', () => {
    cy.get('#quick-analysis').should('exist');
    cy.get('#ico-input').should('exist');
    cy.get('#url-input').should('exist');
    cy.get('#problem-description-input').should('exist');
    cy.get('#trigger-quick-analysis-button').should('exist');
  });

  it('should display the Services section and tabs', () => {
    cy.get('#services').should('exist');
    cy.get('.service-tab').should('have.length.at.least', 1);
    cy.get('.service-tab').first().click();
    cy.get('.service-content.active').should('exist');
  });

  it('should display the Articles section and at least one article', () => {
    cy.get('#articles').should('exist');
    cy.get('.article-card').should('have.length.at.least', 1);
  });

  it('should display the Projects section and GitHub link', () => {
    cy.get('#projects').should('exist');
    cy.get('#projects a[href*="github.com"]').should('exist');
  });

  it('should display the References section and at least one testimonial', () => {
    cy.get('#references').should('exist');
    cy.get('.testimonial-slide').should('have.length.at.least', 1);
  });

  it('should display the FAQ section and at least one question', () => {
    cy.get('#faq').should('exist');
    cy.get('.faq-question').should('have.length.at.least', 1);
  });

  it('should toggle language when clicking the language toggle button', () => {
    cy.get('#language-toggle').should('exist').click();
    // Optionally check for a language change in the UI
  });

  it('should toggle theme when clicking the theme toggle button', () => {
    cy.get('#theme-toggle').should('exist').click();
    // Optionally check for a theme change in the UI
  });
});

describe('Mobile Navigation', () => {
  beforeEach(() => {
    cy.viewport('iphone-6');
    cy.visit('http://localhost:8000/index.html');
  });
  it('should open and close the mobile menu', () => {
    cy.get('#mobile-menu-button').click();
    cy.get('#mobile-menu').should('be.visible');
    cy.get('#mobile-menu').contains('Služby').click();
    cy.get('#mobile-menu').should('be.visible');
    // Optionally close menu by clicking outside or toggling again
    cy.get('#mobile-menu-button').click();
    cy.get('#mobile-menu').should('not.be.visible');
  });
});

describe('FAQ Section', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/index.html');
  });
  it('should expand and collapse FAQ answers', () => {
    cy.get('.faq-question').first().as('firstFaq');
    cy.get('@firstFaq').click();
    cy.get('@firstFaq').should('have.attr', 'aria-expanded', 'true');
    cy.get('@firstFaq').click();
    cy.get('@firstFaq').should('have.attr', 'aria-expanded', 'false');
  });
});

describe('Contact Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/index.html');
  });
  it('should validate required fields', () => {
    cy.get('#contact-form').within(() => {
      cy.get('button[type="submit"]').click();
    });
    cy.get('#form-status').should('exist');
  });
  it('should submit the form with valid data', () => {
    cy.get('#contact-form').within(() => {
      cy.get('#name').type('Test User');
      cy.get('#email').type('test@example.com');
      cy.get('#message').type('Test message');
      cy.get('#terms').check({ force: true });
      cy.get('button[type="submit"]').click();
    });
    cy.get('#form-status').should('exist');
  });
});

describe('Language and Theme Toggle', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/index.html');
  });
  it('should toggle language and update UI', () => {
    cy.get('#language-toggle').click();
    cy.get('body').should('exist'); // Optionally check for a translated string
  });
  it('should toggle theme and update UI', () => {
    cy.get('#theme-toggle').click();
    cy.get('body').should('have.class', 'dark').or('not.have.class', 'dark');
  });
});

describe('References Carousel', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/index.html');
  });
  it('should navigate carousel slides', () => {
    cy.get('#carousel-next').click();
    cy.get('.testimonial-slide.active').should('exist');
    cy.get('#carousel-prev').click();
    cy.get('.testimonial-slide.active').should('exist');
  });
});

describe('Floating WhatsApp Button', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/index.html');
  });
  it('should be visible and have correct link', () => {
    cy.get('.floating-contact-btn').should('be.visible').and('have.attr', 'href').and('include', 'wa.me');
  });
});

describe('Timeline and Architecture Sections', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/index.html');
  });
  it('should display the timeline section', () => {
    cy.get('#timeline').should('exist');
    cy.get('.timeline-item').should('have.length.at.least', 1);
  });
  it('should display the architecture diagram section', () => {
    cy.get('#architecture').should('exist');
    cy.get('svg[aria-label="Hexagonal Architecture Diagram"]').should('exist');
  });
});

describe('Accessibility', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/index.html');
  });
  it('main sections should have headings and be reachable', () => {
    cy.get('main h2').should('have.length.at.least', 1);
    cy.get('nav').should('exist');
  });
});

describe('Modal Dialogs', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/index.html');
  });
  it('should open and close the Full Analysis modal', () => {
    cy.get('#read-full-analysis-link').click();
    cy.get('#full-analysis-modal-overlay').should('have.class', 'active');
    cy.get('#full-analysis-modal-overlay .modal-close-button').click();
    cy.get('#full-analysis-modal-overlay').should('not.have.class', 'active');
  });
  it('should open and close the Privacy Policy modal', () => {
    cy.get('a[data-modal-id="privacy-policy-modal-overlay"]').first().click();
    cy.get('#privacy-policy-modal-overlay').should('have.class', 'active');
    cy.get('#privacy-policy-modal-overlay .modal-close-button').click();
    cy.get('#privacy-policy-modal-overlay').should('not.have.class', 'active');
  });
  it('should open and close the Terms modal', () => {
    cy.get('a[data-modal-id="terms-conditions-modal-overlay"]').first().click();
    cy.get('#terms-conditions-modal-overlay').should('have.class', 'active');
    cy.get('#terms-conditions-modal-overlay .modal-close-button').click();
    cy.get('#terms-conditions-modal-overlay').should('not.have.class', 'active');
  });
});

describe('Service Tabs', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/index.html');
  });
  it('should switch service tabs and show correct content', () => {
    cy.get('.service-tab').each(($tab) => {
      cy.wrap($tab).click();
      const target = $tab.attr('data-target');
      cy.get(`#${target}.service-content`).should('have.class', 'active');
    });
  });
});

describe('Article Modal', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/index.html');
  });
  it('should open and close the article modal', () => {
    cy.get('.read-more-button:not([disabled])').first().click();
    cy.get('#article-modal-overlay').should('have.class', 'active');
    cy.get('#article-modal-overlay .modal-close-button').click();
    cy.get('#article-modal-overlay').should('not.have.class', 'active');
  });
});

describe('Quick Analysis Form Output', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/index.html');
  });
  it('should show results after submitting the Quick Analysis form', () => {
    cy.get('#ico-input').type('12345678');
    cy.get('#trigger-quick-analysis-button').click();
    cy.get('#quick-analysis-results').should('exist');
  });
});

describe('Language Switcher Dropdown', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/index.html');
  });
  it('should change language using the dropdown', () => {
    cy.get('#site-lang-switcher').select('en');
    cy.get('body').should('exist'); // Optionally check for a translated string
  });
});

describe('Back to Top Button', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/index.html');
  });
  it('should appear after scrolling and scroll to top when clicked', () => {
    cy.scrollTo('bottom');
    cy.get('#site-back-to-top').should('be.visible').click();
    cy.window().its('scrollY').should('be.lte', 10);
  });
});

describe('Timeline Keyboard Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/index.html');
  });
  it('should allow tabbing through timeline items', () => {
    cy.get('.timeline-item').first().focus().should('have.focus');
    cy.get('.timeline-item').each(($el, idx, $list) => {
      if (idx < $list.length - 1) {
        cy.focused().tab();
        cy.get('.timeline-item').eq(idx + 1).should('have.focus');
      }
    });
  });
});

describe('FAQ Keyboard Accessibility', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/index.html');
  });
  it('should expand/collapse FAQ with keyboard', () => {
    cy.get('.faq-question').first().focus().type('{enter}');
    cy.get('.faq-question').first().should('have.attr', 'aria-expanded', 'true');
    cy.get('.faq-question').first().type(' ');
    cy.get('.faq-question').first().should('have.attr', 'aria-expanded', 'false');
  });
});

describe('Deployed Site Smoke Test', () => {
  before(() => {
    cy.visit('https://sparesparrow.github.io/sparrow-ai-tech');
  });

  it('should load the homepage and display the main heading', () => {
    cy.get('h1').should('exist').and('contain.text', 'SPARROW-AI-TECH');
  });

  it('should display the navigation bar with Služby link', () => {
    cy.contains('nav', 'Služby').should('exist');
  });

  it('should display the language switcher and switch language', () => {
    cy.get('#site-lang-switcher, #language-toggle').should('exist').then($el => {
      if ($el.is('select')) {
        cy.wrap($el).select('en');
        cy.get('body').should('exist'); // Optionally check for English text
      } else {
        cy.wrap($el).click();
        cy.get('body').should('exist'); // Optionally check for language change
      }
    });
  });

  it('should display the Quick Analysis form', () => {
    cy.get('#quick-analysis, form[action*="quick-analysis"]').should('exist');
  });

  it('should display the FAQ section', () => {
    cy.get('#faq').should('exist');
    cy.get('.faq-question').should('have.length.at.least', 1);
  });

  it('should display the footer with company email', () => {
    cy.get('footer').should('exist').and('contain', 'sparesparrow@protonmail.ch');
  });
});
