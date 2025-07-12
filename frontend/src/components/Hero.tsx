import React from 'react';

interface Props {
  name: string;
  title: string;
}

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
          <h2 className="typing-effect">{title}</h2>
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