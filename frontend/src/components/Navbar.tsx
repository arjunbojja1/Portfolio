import React, { useState, useEffect } from 'react';

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

interface NavbarProps {
  onRefresh?: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onRefresh, theme, onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Track scroll position and active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);

      // Determine active section based on scroll position
      const sections = ['home', 'about', 'experience', 'projects'];
      
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
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
  ];

  const nextTheme = theme === 'light' ? 'dark' : 'light';

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

      {/* Desktop Navigation — center */}
      <ul className="nav-links nav-links-center">
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => handleNavClick(item.id, e)}
            >
              <span className="nav-text">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>

      {/* Right zone: theme toggle + mobile menu button */}
      <div className="nav-right">
        <button
          className="theme-toggle"
          onClick={(event) => onToggleTheme(event)}
          aria-label={`Switch to ${nextTheme} mode`}
          aria-pressed={theme === 'dark'}
        >
          <span className="theme-toggle-icon">{theme === 'light' ? <MoonIcon /> : <SunIcon />}</span>
          <span className="theme-toggle-text">{theme === 'light' ? 'Dark' : 'Light'}</span>
        </button>

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
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu" onClick={() => setIsMenuOpen(false)}>
          <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <span className="mobile-brand">Portfolio</span>
              <button
                className="theme-toggle mobile"
                onClick={(event) => onToggleTheme(event)}
                aria-label={`Switch to ${nextTheme} mode`}
                aria-pressed={theme === 'dark'}
              >
                <span className="theme-toggle-icon">{theme === 'light' ? <MoonIcon /> : <SunIcon />}</span>
              </button>
              <button className="close-btn" onClick={() => setIsMenuOpen(false)}>✕</button>
            </div>

            <ul className="mobile-nav-links">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(item.id, e)}
                  >
                    <span className="mobile-nav-text">{item.label}</span>
                    <span className="mobile-nav-arrow">→</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mobile-cta">
              <a
                href="mailto:arjunbojja1@gmail.com"
                className="mobile-cta-btn"
              >
                Get in Touch
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
