import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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
      const sectionElements = sections.map(id => document.getElementById(id));
      
      // Check if we're near the bottom of the page for contact section
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrolledToBottom = scrollPosition + windowHeight >= documentHeight - 100;
      
      if (scrolledToBottom) {
        setActiveSection('contact');
        return;
      }
      
      // Find the section that's currently in view
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element) {
          const rect = element.getBoundingClientRect();
          // More sensitive detection - section is active if it's visible in viewport
          if (rect.top <= windowHeight / 2 && rect.bottom >= 0) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
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

  // Safe navigation function to prevent JavaScript errors
  const handleNavClick = (section: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setActiveSection(section);
    closeMenu();
    
    // Smooth scroll to section
    try {
      const targetElement = document.getElementById(section);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      } else if (section === 'home') {
        // If home section doesn't exist, scroll to top
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    } catch (error) {
      console.warn('Navigation scroll failed:', error);
      // Fallback to regular navigation
      window.location.hash = section;
    }
  };

  const navItems = [
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'contact', label: 'Contact', icon: '📧' }
  ];

  return (
    <motion.nav 
      className={`navbar-netflix ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Liquid Glass Background */}
      <div className="navbar-glass-bg">
        <div className="glass-reflection"></div>
        <div className="noise-texture"></div>
      </div>

      {/* Brand Logo */}
      <motion.a 
        href="#home" 
        className="nav-brand-netflix" 
        onClick={(e) => handleNavClick('home', e)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="brand-logo">
          <motion.span 
            className="brand-bracket"
            animate={{ 
              textShadow: [
                "0 0 10px #00d4ff",
                "0 0 20px #00d4ff, 0 0 30px #00d4ff",
                "0 0 10px #00d4ff"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {'<'}
          </motion.span>
          <span className="brand-initials">AB</span>
          <motion.span 
            className="brand-bracket"
            animate={{ 
              textShadow: [
                "0 0 10px #00d4ff",
                "0 0 20px #00d4ff, 0 0 30px #00d4ff",
                "0 0 10px #00d4ff"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            {' />'}
          </motion.span>
        </div>
        <div className="brand-glow"></div>
      </motion.a>

      {/* Desktop Navigation */}
      <div className="nav-desktop">
        <ul className="nav-links-netflix">
          {navItems.map((item, index) => (
            <motion.li 
              key={item.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.a
                href={`#${item.id}`}
                className={`nav-link-netflix ${activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => handleNavClick(item.id, e)}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.label}</span>
                {activeSection === item.id && (
                  <motion.div
                    className="nav-indicator"
                    layoutId="activeIndicator"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.a>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu Button */}
      <motion.button 
        className="mobile-menu-btn-netflix"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="hamburger-netflix">
          <motion.span
            animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeMenu}
          >
            <motion.div
              className="mobile-menu-content"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Menu Header */}
              <div className="mobile-menu-header">
                <div className="mobile-brand">
                  <span className="brand-text">Portfolio</span>
                </div>
                <motion.button
                  className="close-btn"
                  onClick={closeMenu}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              </div>

              {/* Mobile Menu Items */}
              <ul className="mobile-nav-links">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <motion.a
                      href={`#${item.id}`}
                      className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                      onClick={(e) => handleNavClick(item.id, e)}
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="mobile-nav-icon">{item.icon}</span>
                      <span className="mobile-nav-text">{item.label}</span>
                      <span className="mobile-nav-arrow">→</span>
                    </motion.a>
                  </motion.li>
                ))}
              </ul>

              {/* Mobile CTA */}
              <motion.div
                className="mobile-cta"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <motion.a
                  href="#contact"
                  className="mobile-cta-btn"
                  onClick={(e) => handleNavClick('contact', e)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Let's Work Together
                </motion.a>
              </motion.div>

              {/* Decorative Elements */}
              <div className="mobile-menu-decoration">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="decoration-particle"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      rotate: 360
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Indicator */}
      <motion.div
        className="scroll-progress"
        style={{
          scaleX: scrolled ? 1 : 0,
          transformOrigin: "0%"
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.nav>
  );
};

export default Navbar;