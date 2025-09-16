import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

interface Props {
  name: string;
  title: string;
}

// Netflix-style Typewriter with Glitch Effect
const CinematicTypewriter: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      if (currentIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayText(text.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
          
          // Random glitch effect
          if (Math.random() < 0.1) {
            setShowGlitch(true);
            setTimeout(() => setShowGlitch(false), 100);
          }
        }, 5 + Math.random() * 10); // Super fast: 5-15ms per character (was 15-30ms)
        return () => clearTimeout(timer);
      } else {
        setIsComplete(true);
      }
    }, delay);
    
    return () => clearTimeout(startTimer);
  }, [currentIndex, text, delay]);

  return (
    <div className="cinematic-typewriter">
      <motion.span 
        className={`typewriter-text ${showGlitch ? 'glitch' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay / 1000 }}
      >
        {displayText}
        {!isComplete && (
          <motion.span 
            className="cursor-neon"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            |
          </motion.span>
        )}
      </motion.span>
      <div className="text-glow-effect"></div>
    </div>
  );
};

// Floating Orbs Component
const FloatingOrbs: React.FC = () => {
  return (
    <div className="floating-orbs-container">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={`floating-orb orb-${i + 1}`}
          initial={{ 
            scale: 0,
            opacity: 0,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
          }}
          animate={{ 
            scale: [0, 1, 0.8, 1],
            opacity: [0, 0.6, 0.8, 0.6],
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight
            ]
          }}
          transition={{ 
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
        />
      ))}
    </div>
  );
};

// 3D Holographic Card for Profile Image
const HolographicProfile: React.FC<{ imageSrc: string; name: string }> = ({ imageSrc, name }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div 
      ref={ref}
      className="holographic-profile-container"
      initial={{ scale: 0, rotateY: -180, opacity: 0 }}
      animate={inView ? { 
        scale: 1, 
        rotateY: 0, 
        opacity: 1 
      } : {}}
      transition={{ 
        duration: 1.2, 
        ease: "easeOut",
        delay: 0.3 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Liquid Glass Background */}
      <div className="liquid-glass-frame">
        <div className="glass-reflection"></div>
        <div className="glass-highlight"></div>
      </div>
      
      {/* Profile Image with 3D Effect */}
      <motion.div 
        className="profile-image-3d"
        animate={isHovered ? { 
          rotateY: 15, 
          rotateX: -10,
          scale: 1.05,
          z: 50
        } : { 
          rotateY: 0, 
          rotateX: 0,
          scale: 1,
          z: 0
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <img 
          src={imageSrc} 
          alt={`${name} - Professional Portrait`} 
          className="profile-image"
        />
        
        {/* Removed the blue scan lines that were here */}
      </motion.div>
      
      {/* Floating Particles around Profile */}
      <div className="profile-particles">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="profile-particle"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              rotate: 360
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
            style={{
              left: `${20 + (i % 4) * 20}%`,
              top: `${20 + Math.floor(i / 4) * 20}%`
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

const Hero: React.FC<Props> = ({ name, title }) => {
  const containerRef = useRef<HTMLElement>(null);
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  const inView = useInView(heroRef, { once: true, amount: 0.1 });

  // Simplified smooth scroll function to avoid runtime errors
  const handleSmoothScroll = (targetId: string) => {
    try {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    } catch (error) {
      console.warn('Smooth scroll failed:', error);
    }
  };

  return (
    <motion.section 
      ref={containerRef}
      id="home" 
      className="hero-netflix"
      style={{ opacity }}
    >
      {/* Parallax Background */}
      <motion.div 
        className="hero-background"
        style={{ y: backgroundY }}
      >
        <div className="gradient-overlay"></div>
        <FloatingOrbs />
      </motion.div>

      {/* Main Hero Content */}
      <motion.div 
        ref={heroRef}
        className="hero-content-netflix"
        style={{ y: contentY }}
      >
        <div className="hero-grid">
          {/* Left Side - Profile */}
          <div className="hero-profile-section">
            <HolographicProfile imageSrc="/headshot.png" name={name} />
          </div>

          {/* Right Side - Text Content */}
          <div className="hero-text-section">
            <motion.div
              className="hero-intro"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="intro-label">Information Science Student & Software Engineering Intern</div>
            </motion.div>

            <motion.div
              className="hero-name-container"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <h1 className="hero-name-netflix">
                <span className="greeting">Hello, I'm</span>
                <span className="name">
                  {name.split('').map((char, index) => (
                    <motion.span
                      key={index}
                      className="name-char"
                      initial={{ opacity: 0, y: 50 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ 
                        duration: 0.6, 
                        delay: 0.9 + index * 0.1,
                        ease: "easeOut"
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </span>
              </h1>
            </motion.div>

            <motion.div
              className="hero-title-container"
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <CinematicTypewriter text="Building cloud-native systems with Python, AWS, and modern web technologies. Seeking internship opportunities to drive innovation and create meaningful impact." delay={200} />
            </motion.div>

            {/* Professional Highlights */}
            <motion.div
              className="hero-highlights"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 2 }}
            >
              <div className="highlight-item">
                <span className="highlight-number">4.0</span>
                <span className="highlight-text">GPA</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-number">Capital One</span>
                <span className="highlight-text">Intern</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-number">3</span>
                <span className="highlight-text">Featured Projects</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-number">Full-Stack</span>
                <span className="highlight-text">Developer</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="hero-actions-netflix"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 2.5 }}
            >
              <button 
                onClick={() => handleSmoothScroll('projects')}
                className="netflix-btn primary"
              >
                <span className="btn-icon">▶</span>
                View My Work
                <div className="btn-glow"></div>
              </button>
              
              <button 
                onClick={() => handleSmoothScroll('contact')}
                className="netflix-btn secondary"
              >
                <span className="btn-icon">✉</span>
                Get In Touch
                <div className="btn-shimmer"></div>
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Matrix Rain Effect */}
      <div className="matrix-rain">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="matrix-column"
            style={{ left: `${(i / 50) * 100}%` }}
            initial={{ y: -100 }}
            animate={{ y: window.innerHeight + 100 }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            {Math.random().toString(36).substr(2, 1)}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Hero;