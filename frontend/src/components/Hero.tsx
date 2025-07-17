import React, { useState, useEffect } from 'react';

interface Props {
  name: string;
  title: string;
}

// Typewriter Text Effect
const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 100); // Typing speed
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text]);

  useEffect(() => {
    // Blinking cursor effect
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <div className="typewriter-container">
      <span className="typewriter-text">
        {displayText}
        <span className={`cursor ${showCursor ? 'visible' : ''}`}>|</span>
      </span>
    </div>
  );
};

const Hero: React.FC<Props> = ({ name, title }) => {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <div className="hero-image">
          <img 
            src="/headshot.png" 
            alt="Arjun Bojja - Professional Headshot" 
            className="headshot neon-border pulse-dot"
          />
        </div>
        <div className="hero-text">
          <h1 className="gradient-text text-glow">{name}</h1>
          <h2><TypewriterText text={title} /></h2>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary hover-glow">View My Work</a>
            <a href="#contact" className="btn btn-secondary hover-glow">Get In Touch</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;