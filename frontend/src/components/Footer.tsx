import React from 'react';

interface Props {
  linkedin: string;
  github: string;
}

const Footer: React.FC<Props> = ({ linkedin, github }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section footer-about">
          <h3>About</h3>
          <p>
            Aspiring Software Engineer & Product Manager passionate about making technology 
            more usable and accessible for everyone.
          </p>
          <div className="footer-socials-new">
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
              in
            </a>
            <a href={github} target="_blank" rel="noopener noreferrer" className="social-link">
              gh
            </a>
          </div>
        </div>

        <div className="footer-section footer-contact">
          <h3>Connect</h3>
          <div className="contact-item">
            <span className="contact-icon">📍</span>
            <span>Herndon, VA</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon">🎓</span>
            <span>University of Maryland</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon">💼</span>
            <span>Seeking Internships</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Arjun Bojja. All Rights Reserved.</p>
        <div className="footer-tech-stack">
          <span className="tech-badge">Python</span>
          <span className="tech-badge">Java</span>
          <span className="tech-badge">JavaScript</span>
          <span className="tech-badge">React</span>
          <span className="tech-badge">AWS</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;