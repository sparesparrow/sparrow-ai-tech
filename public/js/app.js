// Main application JavaScript
console.log('Sparrow AI Tech - Application loaded');

// Handle language toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const languageToggle = document.querySelector('.btn--outline');
  if (languageToggle) {
    languageToggle.addEventListener('click', function() {
      const currentLang = document.documentElement.lang;
      const newLang = currentLang === 'en' ? 'cs' : 'en';
      
      // Update the page language
      document.documentElement.lang = newLang;
      
      // Update button text
      this.textContent = newLang === 'en' ? 'Čeština' : 'English';
      
      // Reload page with new language parameter
      const url = new URL(window.location);
      url.searchParams.set('lang', newLang);
      window.location.href = url.toString();
    });
  }
});

// Add any other client-side functionality here
