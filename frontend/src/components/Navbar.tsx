import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onRefresh?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onRefresh }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect to navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#home" className="nav-brand hover-glow" onClick={closeMenu}>
        <span className="gradient-text">{'<AB />'}</span>
      </a>
      
      {/* Mobile menu button */}
      <button 
        className="mobile-menu-btn hover-glow"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
      >
        <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      {/* Navigation links */}
      <ul className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
        <li><a href="#about" className="hover-glow" onClick={closeMenu}>About</a></li>
        <li><a href="#experience" className="hover-glow" onClick={closeMenu}>Experience</a></li>
        <li><a href="#projects" className="hover-glow" onClick={closeMenu}>Projects</a></li>
        <li><a href="#contact" className="hover-glow" onClick={closeMenu}>Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;