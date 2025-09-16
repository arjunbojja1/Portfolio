import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Education {
  degree: string;
  university: string;
  gpa: string;
  grad_year: number;
  awards: string[];
  coursework: string[];
}

interface Props {
  passion: string;
  seeking: string;
  location: string;
  skills: { [key: string]: string[] };
  education: Education;
}

// Enhanced Terminal Component with more professional focus
const ProfessionalTerminal: React.FC<{ skills: string[] }> = ({ skills }) => {
  const [currentSkill, setCurrentSkill] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!skills || skills.length === 0) return;
    
    setIsTyping(true);
    const skill = skills[currentSkill] || '';
    let i = 0;
    
    const typeInterval = setInterval(() => {
      if (i < skill.length) {
        setDisplayText(skill.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        setTimeout(() => {
          setCurrentSkill((prev) => (prev + 1) % skills.length);
          setDisplayText('');
        }, 2000);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [currentSkill, skills]);

  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <motion.div 
      className="professional-terminal"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="terminal-header">
        <div className="terminal-controls">
          <span className="terminal-btn close"></span>
          <span className="terminal-btn minimize"></span>
          <span className="terminal-btn maximize"></span>
        </div>
        <span className="terminal-title">arjun@portfolio:~$</span>
      </div>
      <div className="terminal-body">
        <div className="terminal-line">
          <span className="terminal-prompt">$ </span>
          <span className="terminal-command">echo "Currently mastering: "</span>
        </div>
        <div className="terminal-line active">
          <span className="terminal-output gradient-text">{displayText}</span>
          {isTyping && <span className="terminal-cursor">|</span>}
        </div>
        <div className="terminal-line">
          <span className="terminal-prompt">$ </span>
          <span className="terminal-info">Ready to tackle new challenges...</span>
        </div>
      </div>
    </motion.div>
  );
};

const About: React.FC<Props> = ({ passion, seeking, location, skills, education }) => {
  const allSkills = skills ? Object.values(skills).flat() : [];
  const { ref, inView } = useInView({ 
    threshold: 0.1, 
    triggerOnce: true,
    rootMargin: '50px 0px'
  });
  
  return (
    <section id="about" className="section-netflix">
      <div className="container-netflix">
        <motion.h2 
          className="heading-netflix"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          About Me
        </motion.h2>
        
        <div ref={ref} className="about-content-enhanced">
          {/* Professional Introduction */}
          <motion.div 
            className="professional-intro"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="intro-card">
              <h3>Software Engineer & Product Strategist</h3>
              <p className="passion-statement">{passion}</p>
              <p className="seeking-statement">{seeking}</p>
              <div className="location-badge">
                <span className="location-icon">📍</span>
                <span>{location}</span>
              </div>
            </div>
          </motion.div>

          {/* Skills Terminal */}
          {allSkills.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <ProfessionalTerminal skills={allSkills} />
            </motion.div>
          )}

          {/* Education & Skills Grid */}
          <div className="education-skills-grid">
            {/* Enhanced Education Section */}
            <motion.div 
              className="education-section"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="education-header">
                <h3>Education</h3>
                <div className="education-icon">🎓</div>
              </div>
              
              <div className="education-content">
                <div className="degree-info">
                  <h4>{education.degree}</h4>
                  <p className="university">{education.university}</p>
                  <div className="education-metrics">
                    <span className="gpa-badge">GPA: {education.gpa}</span>
                    <span className="grad-badge">Class of {education.grad_year}</span>
                  </div>
                </div>
                
                {education.awards && education.awards.length > 0 && (
                  <div className="education-group">
                    <h4>🏆 Awards & Honors</h4>
                    <div className="education-tags">
                      {education.awards.map((award, index) => (
                        <span key={index} className="education-tag award-tag">
                          {award}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {education.coursework && education.coursework.length > 0 && (
                  <div className="education-group">
                    <h4>📚 Relevant Coursework</h4>
                    <div className="education-tags">
                      {education.coursework.map((course, index) => (
                        <span key={index} className="education-tag course-tag">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Enhanced Technical Skills */}
            <motion.div 
              className="skills-section"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="skills-header">
                <h3>Technical Expertise</h3>
                <div className="skills-icon">⚡</div>
              </div>
              
              <div className="skills-grid-enhanced">
                {skills && Object.entries(skills).map(([category, skillList], categoryIndex) => (
                  <motion.div 
                    key={category} 
                    className="skill-category-enhanced"
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 + categoryIndex * 0.1 }}
                  >
                    <h4>{category}</h4>
                    <div className="skill-tags-enhanced">
                      {skillList.map((skill, index) => (
                        <motion.span 
                          key={`${category}-${index}`}
                          className="skill-tag-enhanced"
                          whileHover={{ scale: 1.05, y: -2 }}
                          transition={{ duration: 0.2 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Personal Touch - Simplified */}
          <motion.div 
            className="personal-section"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="personal-card">
              <h3>Beyond the Code</h3>
              <p>When I'm not building software, you'll find me exploring new technologies, contributing to open source projects, or enjoying the outdoors. I believe in continuous learning and bringing creativity to every challenge.</p>
              
              <div className="personal-gallery-compact">
                {[
                  { src: "/beach_picture.png", alt: "Beach day", caption: "Recharging by the ocean" },
                  { src: "/dinner_picture.png", alt: "Team dinner", caption: "Building connections" },
                  { src: "/manzar.png", alt: "Adventure", caption: "Exploring new horizons" }
                ].map((image, index) => (
                  <motion.div
                    key={`gallery-${index}`}
                    className="gallery-item-compact"
                    whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img src={image.src} alt={image.alt} className="personal-photo-compact" />
                    <div className="photo-caption">{image.caption}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;