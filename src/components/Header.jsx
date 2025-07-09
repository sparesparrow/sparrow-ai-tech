import React from 'react';

const Header = () => (
  <nav className="header-nav" data-cy="header-nav">
    <ul>
      <li><a href="#hero" data-cy="nav-hero">Hero</a></li>
      <li><a href="#services" data-cy="nav-services">Services</a></li>
      <li><a href="#articles" data-cy="nav-articles">Articles</a></li>
      <li><a href="#about" data-cy="nav-about">About</a></li>
      <li><a href="#contact" data-cy="nav-contact">Contact</a></li>
      <li><a href="/mermaid-editor" style={{ marginLeft: 16 }}>Mermaid Editor</a></li>
    </ul>
    <div className="lang-switcher" data-cy="lang-switcher">
      <button>EN</button>
      <button>CS</button>
    </div>
  </nav>
);

export default Header;
