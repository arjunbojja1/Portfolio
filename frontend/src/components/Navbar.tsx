import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onRefresh?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onRefresh }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Track scroll position and active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);

      // Determine active section based on scroll position
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      
      // Check if we're near the bottom of the page for contact section
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrolledToBottom = scrollPosition + windowHeight >= documentHeight - 100;
      
      if (scrolledToBottom) {
        setActiveSection('contact');
        return;
      }
      
      // Find the section that's currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= windowHeight / 2 && rect.bottom >= 0) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simple, reliable navigation handler
  const handleNavClick = (section: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    setActiveSection(section);
    setIsMenuOpen(false);
    
    // Navigate to section
    const targetElement = document.getElementById(section);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    } else if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'contact', label: 'Contact', icon: '📧' }
  ];

  return (
    <nav className={`navbar-simple ${scrolled ? 'scrolled' : ''}`}>
      {/* Brand Logo */}
      <a 
        href="#home" 
        className="nav-brand" 
        onClick={(e) => handleNavClick('home', e)}
      >
        <div className="brand-logo">
          <span className="brand-bracket">{'<'}</span>
          <span className="brand-initials">AB</span>
          <span className="brand-bracket">{' />'}</span>
        </div>
      </a>

      {/* Desktop Navigation */}
      <div className="nav-desktop">
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => handleNavClick(item.id, e)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-btn"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
      >
        <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu" onClick={() => setIsMenuOpen(false)}>
          <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <span className="mobile-brand">Portfolio</span>
              <button
                className="close-btn"
                onClick={() => setIsMenuOpen(false)}
              >
                ✕
              </button>
            </div>

            <ul className="mobile-nav-links">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(item.id, e)}
                  >
                    <span className="mobile-nav-icon">{item.icon}</span>
                    <span className="mobile-nav-text">{item.label}</span>
                    <span className="mobile-nav-arrow">→</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mobile-cta">
              <a
                href="#contact"
                className="mobile-cta-btn"
                onClick={(e) => handleNavClick('contact', e)}
              >
                Let's Work Together
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Progress Indicator */}
      <div className={`scroll-progress ${scrolled ? 'visible' : ''}`}></div>
    </nav>
  );
};

export default Navbar;