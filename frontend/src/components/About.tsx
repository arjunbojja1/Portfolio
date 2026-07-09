import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import * as Si from 'react-icons/si';
import * as Fa from 'react-icons/fa';

const LOGO_TOKEN = 'pk_VZGrte1ZRUCeHhcZhQ4HpQ';
const logoUrl = (domain: string) => `https://img.logo.dev/${domain}?token=${LOGO_TOKEN}&format=png`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SkillIcon = ({ ic }: { ic: any }) => React.createElement(ic, { size: 13, 'aria-hidden': true, focusable: false });

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
  skills: { [key: string]: string[] };
  education: Education;
}

const SKILL_CATEGORY_VARIANTS: Record<string, 'purple' | 'cyan' | 'amber'> = {
  'Languages': 'purple',
  'Frameworks & APIs': 'cyan',
  'Cloud & Infrastructure': 'purple',
  'Distributed Systems': 'cyan',
  'AI & LLM': 'amber',
  'Data & Observability': 'purple',
  'Testing & Other': 'cyan',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SKILL_ICON_MAP: Record<string, any> = {
  'Python': Si.SiPython,
  'TypeScript': Si.SiTypescript,
  'JavaScript': Si.SiJavascript,
  'Java': Fa.FaJava,
  'C#': Si.SiDotnet,
  'Lua': Si.SiLua,
  'R': Si.SiR,
  'SQL': Si.SiMysql,
  'KQL (Kusto)': (Si as any).SiMicrosoftazure,
  'FastAPI': Si.SiFastapi,
  'Flask': Si.SiFlask,
  'Express.js': Si.SiExpress,
  'React': Si.SiReact,
  'React Native': Si.SiReact,
  '.NET': Si.SiDotnet,
  'AWS Lambda': (Si as any).SiAwslambda,
  'ECS Fargate': Si.SiDocker,
  'DynamoDB': (Si as any).SiAmazondynamodb,
  'CloudWatch': (Si as any).SiAmazoncloudwatch,
  'Microsoft Azure': (Si as any).SiMicrosoftazure,
  'Azure Data Explorer (ADX)': (Si as any).SiMicrosoftazure,
  'Docker': Si.SiDocker,
  'CI/CD (GitHub Actions)': Si.SiGithubactions,
  'WebSockets': Si.SiSocketdotio,
  'Serverless': (Si as any).SiAwslambda,
  'Real-time Systems': Fa.FaClock,
  'Microservices': Fa.FaLayerGroup,
  'Event-Driven Architecture': Fa.FaNetworkWired,
  'Caching Strategies': Fa.FaMicrochip,
  'Low-Latency Design': Fa.FaClock,
  'Async/Concurrency': Fa.FaServer,
  'OpenAI API': Fa.FaRobot,
  'Claude API': Fa.FaRobot,
  'Prompt Engineering': Fa.FaBrain,
  'LLM Evaluation': Fa.FaBrain,
  'LLM Safety Rails': Fa.FaShieldAlt,
  'MongoDB': Si.SiMongodb,
  'PostgreSQL': Si.SiPostgresql,
  'SQLite': Si.SiSqlite,
  'New Relic': Si.SiNewrelic,
  'Custom Telemetry': Fa.FaNetworkWired,
  'Structured Logging': Fa.FaServer,
  'PyTest': Si.SiPytest,
  'Jest': Si.SiJest,
};

const About: React.FC<Props> = ({ passion, seeking, skills, education }) => {
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

              <p className="passion-statement">{passion}</p>
              <p className="seeking-statement">{seeking}</p>
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
                  const variant: 'purple' | 'cyan' | 'amber' = SKILL_CATEGORY_VARIANTS[category] ?? (catIdx % 2 === 0 ? 'purple' : 'cyan');
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
                              {icon && <span className="skill-pill-icon"><SkillIcon ic={icon} /></span>}
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
            {/* Education card */}
            <motion.div
              className="education-section"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* School header */}
              <div className="edu-school-header">
                <img src="https://upload.wikimedia.org/wikipedia/en/3/3e/University_of_Maryland_seal.svg" alt="UMD" width={36} height={36} style={{ objectFit: 'contain', flexShrink: 0 }} />
                <div>
                  <div className="edu-school-name">{education.university}</div>
                  <div className="edu-degree">{education.degree}</div>
                </div>
              </div>

              {/* Stat pills */}
              <div className="edu-stats-row">
                <div className="edu-stat-pill purple">
                  <span className="edu-stat-value">{education.gpa}</span>
                  <span className="edu-stat-label">GPA</span>
                </div>
                <div className="edu-stat-pill cyan">
                  <span className="edu-stat-value">{education.grad_year}</span>
                  <span className="edu-stat-label">Grad Year</span>
                </div>
              </div>

              {/* Awards */}
              {education.awards && education.awards.length > 0 && (
                <div className="edu-block">
                  <div className="edu-block-label">Academic Recognition</div>
                  <div className="education-tags">
                    {education.awards.map((award, i) => (
                      <span key={i} className="education-tag award-tag">{award}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Coursework */}
              {education.coursework && education.coursework.length > 0 && (
                <div className="edu-block">
                  <div className="edu-block-label">Relevant Coursework</div>
                  <div className="education-tags">
                    {education.coursework.map((course, i) => (
                      <span key={i} className="education-tag course-tag">{course}</span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Specializations 2×2 grid */}
            <motion.div
              className="skills-section"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="skills-header">
                <h3>Specializations</h3>
              </div>
              <div className="spec-grid-2x2">
                {([
                  { label: 'Real-time Distributed Systems', desc: 'Low-latency signaling, event-driven architecture, service-oriented design', icon: Fa.FaNetworkWired, accent: 'purple' },
                  { label: 'AI Infrastructure', desc: 'Autonomous diagnostic pipelines, Text-to-KQL via LLM, safety rails for production LLM systems, as demonstrated by my experience working with Microsoft Teams Meeting Copilot', icon: Fa.FaMicrochip, accent: 'cyan' },
                  { label: 'Cloud Observability', desc: 'New Relic, CloudWatch, custom telemetry, MTTD reduction, 99.99% SLO', icon: Si.SiNewrelic, accent: 'cyan' },
                  { label: 'Backend Engineering', desc: 'FastAPI, Flask, Express, serverless platforms, geospatial engines', icon: Si.SiFastapi, accent: 'purple' },
                ] as const).map((item, i) => (
                  <motion.div
                    key={i}
                    className={`spec-card spec-card-${item.accent}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                    whileHover={{ y: -3 }}
                  >
                    <div className={`spec-card-icon spec-icon-${item.accent}`}>
                      {React.createElement(item.icon as any, { size: 18 })}
                    </div>
                    <div className="spec-card-label">{item.label}</div>
                    <div className="spec-card-desc">{item.desc}</div>
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
