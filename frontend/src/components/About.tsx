import React, { useState, useEffect } from 'react';

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

// Terminal Component for showing skills in a cool way
const Terminal: React.FC<{ skills: string[] }> = ({ skills }) => {
  const [currentSkill, setCurrentSkill] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentSkill < skills.length) {
      const skill = skills[currentSkill];
      let i = 0;
      
      const typeInterval = setInterval(() => {
        if (i < skill.length) {
          setDisplayText(skill.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            setCurrentSkill((prev) => (prev + 1) % skills.length);
            setDisplayText('');
          }, 1000);
        }
      }, 100);

      return () => clearInterval(typeInterval);
    }
  }, [currentSkill, skills]);

  return (
    <div className="terminal-window glass-effect">
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
          <span className="gradient-text">echo "My skills include: {displayText}"</span>
          <span className="terminal-cursor">|</span>
        </div>
      </div>
    </div>
  );
};

const About: React.FC<Props> = ({ passion, seeking, location, skills, education }) => {
  const allSkills = Object.values(skills).flat();
  
  return (
    <section id="about" className="container">
      <h2 className="gradient-text">About Me</h2>
      <div className="about-content">
        <div className="about-intro">
          <p>{passion}</p>
          <p>{seeking}</p>
          <p><strong>Location:</strong> {location}</p>
        </div>

        {/* Personal Gallery */}
        <div className="personal-gallery">
          <div className="gallery-images">
            <div className="gallery-item">
              <img src="/beach_picture.png" alt="Beach day" className="personal-photo hover-glow" />
            </div>
            <div className="gallery-item">
              <img src="/dinner_picture.png" alt="Dinner with friends" className="personal-photo hover-glow" />
            </div>
            <div className="gallery-item">
              <img src="/manzar.png" alt="Manzar" className="personal-photo hover-glow" />
            </div>
          </div>
        </div>

        {/* Cool Terminal Skills Display */}
        <Terminal skills={allSkills} />

        <div className="about-sections">
          <div className="about-education">
            <h3>Education</h3>
            <div className="education-content">
              <div className="education-basic-info">
                <h4>{education.degree}</h4>
                <p className="university">{education.university}</p>
                <div className="education-metrics">
                  <span className="gpa-badge">GPA: {education.gpa}</span>
                  <span className="grad-badge">Class of {education.grad_year}</span>
                </div>
              </div>
              
              {education.awards.length > 0 && (
                <div className="education-group">
                  <h4>Awards & Honors</h4>
                  <div className="education-tags">
                    {education.awards.map((award, index) => (
                      <span key={index} className="education-tag award-tag">
                        {award}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {education.coursework.length > 0 && (
                <div className="education-group">
                  <h4>Relevant Coursework</h4>
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
          </div>

          <div className="about-skills glass-effect hover-glow">
            <h3>Technical Skills</h3>
            <div className="skills-grid">
              {Object.entries(skills).map(([category, skillList]) => (
                <div key={category} className="skill-category">
                  <h4>{category}</h4>
                  <div className="skill-tags">
                    {skillList.map((skill, index) => (
                      <span key={index} className="skill-tag hover-glow">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;