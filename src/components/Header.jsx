import React from 'react';

const Header = () => (
  <nav className="header-nav" data-cy="header-nav">
    <ul>
      <li><a href="#projects" data-cy="nav-projects">Projects</a></li>
      <li><a href="#about" data-cy="nav-about">About</a></li>
      <li><a href="#skills" data-cy="nav-skills">Skills</a></li>
      <li><a href="#contact" data-cy="nav-contact">Contact</a></li>
    </ul>
    <div className="lang-switcher" data-cy="lang-switcher">
      <button>EN</button>
      <button>CS</button>
    </div>
  </nav>
);

export default Header; 