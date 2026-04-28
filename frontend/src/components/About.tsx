import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  SiPython, SiTypescript, SiJavascript, SiDotnet, SiLua, SiR, SiMysql,
  SiFastapi, SiFlask, SiExpress, SiReact,
  SiAwslambda, SiAmazondynamodb, SiAmazoncloudwatch, SiMicrosoftazure, SiDocker,
  SiGithubactions, SiSocketdotio,
  SiMongodb, SiPostgresql, SiSqlite, SiNewrelic,
  SiPytest, SiJest,
} from 'react-icons/si';
import { FaJava, FaNetworkWired, FaMicrochip, FaLayerGroup, FaClock, FaServer } from 'react-icons/fa';

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

const SKILL_CATEGORY_VARIANTS: Record<string, 'purple' | 'cyan'> = {
  'Languages': 'purple',
  'Frameworks & APIs': 'cyan',
  'Cloud & Infrastructure': 'purple',
  'Distributed Systems': 'cyan',
  'Data & Observability': 'purple',
  'Testing & Other': 'cyan',
};

const SKILL_ICON_MAP: Record<string, React.ReactElement> = {
  'Python': <SiPython />,
  'TypeScript': <SiTypescript />,
  'JavaScript': <SiJavascript />,
  'Java': <FaJava />,
  'C#': <SiDotnet />,
  'Lua': <SiLua />,
  'R': <SiR />,
  'SQL': <SiMysql />,
  'FastAPI': <SiFastapi />,
  'Flask': <SiFlask />,
  'Express.js': <SiExpress />,
  'React': <SiReact />,
  'React Native': <SiReact />,
  '.NET': <SiDotnet />,
  'AWS Lambda': <SiAwslambda />,
  'ECS Fargate': <SiDocker />,
  'DynamoDB': <SiAmazondynamodb />,
  'CloudWatch': <SiAmazoncloudwatch />,
  'Microsoft Azure': <SiMicrosoftazure />,
  'Docker': <SiDocker />,
  'CI/CD (GitHub Actions)': <SiGithubactions />,
  'WebSockets': <SiSocketdotio />,
  'Serverless': <SiAwslambda />,
  'Real-time Systems': <FaClock />,
  'Microservices': <FaLayerGroup />,
  'Event-Driven Architecture': <FaNetworkWired />,
  'Caching Strategies': <FaMicrochip />,
  'Low-Latency Design': <FaClock />,
  'Async/Concurrency': <FaServer />,
  'MongoDB': <SiMongodb />,
  'PostgreSQL': <SiPostgresql />,
  'SQLite': <SiSqlite />,
  'New Relic': <SiNewrelic />,
  'Custom Telemetry': <FaNetworkWired />,
  'Structured Logging': <FaServer />,
  'PyTest': <SiPytest />,
  'Jest': <SiJest />,
};

const About: React.FC<Props> = ({ passion, seeking, location, skills, education }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

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
          {/* Intro card */}
          <motion.div
            className="professional-intro"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="intro-card">
              <h3>Distributed Systems Engineer · AI Infrastructure</h3>
              <p className="passion-statement">{passion}</p>
              <p className="seeking-statement">{seeking}</p>
              <div className="location-badge">
                <span>{location}</span>
              </div>
            </div>
          </motion.div>

          {/* Skills pill grid */}
          {skills && Object.keys(skills).length > 0 && (
            <motion.div
              className="skills-pill-grid-section"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="skills-pill-grid">
                {Object.entries(skills).map(([category, skillList], catIdx) => {
                  const variant = SKILL_CATEGORY_VARIANTS[category] ?? (catIdx % 2 === 0 ? 'purple' : 'cyan');
                  return (
                    <motion.div
                      key={category}
                      className="skill-pill-category"
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.4 + catIdx * 0.08 }}
                    >
                      <div className={`skill-cat-label-new ${variant}`}>{category}</div>
                      <div className="skill-pills-row">
                        {skillList.map((skill, i) => {
                          const icon = SKILL_ICON_MAP[skill];
                          return (
                            <motion.span
                              key={`${category}-${i}`}
                              className={`skill-pill-new ${variant}`}
                              whileHover={{ scale: 1.05, y: -2 }}
                              transition={{ duration: 0.2 }}
                            >
                              {icon && <span className="skill-pill-icon">{icon}</span>}
                              {skill}
                            </motion.span>
                          );
                        })}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Education & specializations grid */}
          <div className="education-skills-grid">
            <motion.div
              className="education-section"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="education-header">
                <h3>Education</h3>
              </div>
              <div className="education-content">
                <div className="degree-info">
                  <h4>{education.degree}</h4>
                  <p className="university">{education.university}</p>
                  <div className="education-metrics">
                    <span className="grad-badge">Class of {education.grad_year}</span>
                  </div>
                </div>
                {education.awards && education.awards.length > 0 && (
                  <div className="education-group">
                    <h4>Academic Recognition</h4>
                    <div className="education-tags">
                      {education.awards.map((award, i) => (
                        <span key={i} className="education-tag award-tag">{award}</span>
                      ))}
                      <span className="education-tag award-tag">{education.gpa} GPA</span>
                    </div>
                  </div>
                )}
                {education.coursework && education.coursework.length > 0 && (
                  <div className="education-group">
                    <h4>Relevant Coursework</h4>
                    <div className="education-tags">
                      {education.coursework.map((course, i) => (
                        <span key={i} className="education-tag course-tag">{course}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              className="skills-section"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="skills-header">
                <h3>Specializations</h3>
              </div>
              <div className="skills-grid-enhanced">
                {[
                  { label: 'Real-time Distributed Systems', desc: 'Low-latency signaling, event-driven architecture, service-oriented design' },
                  { label: 'AI Infrastructure', desc: 'Systems that support AI/ML workloads at scale — Microsoft Teams AI investments' },
                  { label: 'Cloud Observability', desc: 'New Relic, CloudWatch, custom telemetry, MTTD reduction, 99.99% SLO delivery' },
                  { label: 'Backend Engineering', desc: 'FastAPI, Flask, Express, serverless platforms, geospatial engines' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="skill-category-enhanced"
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
                  >
                    <h4>{item.label}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--ink-500)', margin: 0 }}>{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
