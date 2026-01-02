import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SkeletonTimeline, ErrorFallback } from './LoadingComponents';

interface ExperienceData {
  role: string;
  company: string;
  duration: string;
  location: string;
  description: string[];
}

interface Props {
  data: ExperienceData[];
  loading?: boolean;
  onRefresh?: () => void;
}

// Enhanced Timeline Item Component
const TimelineItem: React.FC<{ job: ExperienceData; index: number; isLast: boolean }> = ({ job, index, isLast }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [isHovered, setIsHovered] = useState(false);

  // Extract key achievements and metrics from description
  const getJobMetrics = (description: string[]) => {
    const metrics: { value: string; context: string }[] = [];
    const seen = new Set<string>();

    const getContext = (desc: string) => {
      const normalized = desc.toLowerCase();
      const contextMap = [
        { keywords: ['uptime', 'availability'], context: 'uptime improvement' },
        { keywords: ['downtime risk'], context: 'downtime risk reduction' },
        { keywords: ['downtime', 'outage'], context: 'downtime reduction' },
        { keywords: ['latency', 'response time'], context: 'latency reduction' },
        { keywords: ['throughput'], context: 'throughput increase' },
        { keywords: ['efficiency'], context: 'efficiency gain' },
        { keywords: ['performance', 'speed'], context: 'performance boost' },
        { keywords: ['cost', 'costs', 'spend', 'budget'], context: 'cost reduction' },
        { keywords: ['reliability', 'stability'], context: 'reliability improvement' },
        { keywords: ['monitoring', 'alerting'], context: 'monitoring effort reduction' },
        { keywords: ['adoption', 'engagement', 'coverage'], context: 'adoption growth' }
      ];

      for (const entry of contextMap) {
        if (entry.keywords.some((keyword) => normalized.includes(keyword))) {
          return entry.context;
        }
      }

      return 'measurable improvement';
    };

    const addMetric = (value: string, context: string) => {
      const key = `${value}-${context}`;
      if (!seen.has(key)) {
        metrics.push({ value, context });
        seen.add(key);
      }
    };

    const cleanContext = (raw: string) => {
      const trimmed = raw.replace(/\s+/g, ' ').trim();
      const lower = trimmed.toLowerCase();
      const lastComma = trimmed.lastIndexOf(',');
      const lastSemicolon = trimmed.lastIndexOf(';');
      const lastAnd = lower.lastIndexOf(' and ');
      const lastWith = lower.lastIndexOf(' with ');
      const lastUsing = lower.lastIndexOf(' using ');
      const lastTo = lower.lastIndexOf(' to ');
      const useAndSplit = trimmed.toLowerCase().startsWith('and ');
      const splitIndex = Math.max(lastComma, lastSemicolon, useAndSplit ? lastAnd : -1, lastWith, lastUsing, lastTo);
      let offset = 0;
      if (splitIndex === lastComma || splitIndex === lastSemicolon) {
        offset = 1;
      } else if (splitIndex === lastAnd) {
        offset = 5;
      } else if (splitIndex === lastWith) {
        offset = 6;
      } else if (splitIndex === lastUsing) {
        offset = 7;
      } else if (splitIndex === lastTo) {
        offset = 4;
      }
      let context = splitIndex >= 0 ? trimmed.slice(splitIndex + offset) : trimmed;
      context = context.replace(/^[,\s]*(and|with|using|to)\s+/i, '');
      context = context.replace(/[.,;:\s]+$/g, '');
      return context.trim();
    };

    const metricPattern = /([^.;]*?)\bby\s*~?\s*(\d+%|\d+x|\$\d+(?:\.\d+)?[kKmM]?|\d+\+)/gi;

    description.forEach((desc) => {
      const cleanedDesc = desc.replace(/~/g, '');
      let match: RegExpExecArray | null;
      while ((match = metricPattern.exec(cleanedDesc)) !== null) {
        const rawContext = cleanContext(match[1]);
        const mappedContext = getContext(rawContext || cleanedDesc);
        const context = mappedContext === 'measurable improvement' && rawContext ? rawContext : mappedContext;
        addMetric(match[2], context);
      }
    });

    if (metrics.length === 0) {
      description.forEach((desc) => {
        const percentageMatch = desc.match(/(\d+%)/g);
        const numberMatch = desc.match(/(\d+x|\$\d+(?:\.\d+)?[kKmM]?|\d+\+)/g);

        if (percentageMatch) {
          percentageMatch.forEach((match) => {
            addMetric(match, getContext(desc));
          });
        }

        if (numberMatch) {
          numberMatch.forEach((match) => {
            addMetric(match, getContext(desc));
          });
        }
      });
    }

    return metrics.slice(0, 2);
  };

  const metrics = getJobMetrics(job.description);
  const isCurrentRole = index === 0;
  const companyIconMap: Record<string, string> = {
    'Capital One': '🏦',
    'Roblox (Gochi)': '🕹️',
    'Computer Science Honor Society': '💻'
  };
  const companyIcon = companyIconMap[job.company] || '🏢';
  const timelineIcon = isCurrentRole ? '🚀' : companyIcon;

  const focusText = isCurrentRole
    ? 'Current focus: leadership, problem-solving, and innovation.'
    : 'Focus areas: leadership, problem-solving, and innovation.';

  return (
    <motion.div
      ref={ref}
      className={`timeline-item-enhanced ${isCurrentRole ? 'current-role' : ''}`}
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Timeline Line */}
      <div className="timeline-line-container">
        <motion.div
          className="timeline-line"
          initial={{ height: 0 }}
          animate={inView ? { height: '100%' } : {}}
          transition={{ duration: 1, delay: index * 0.2 + 0.3 }}
        />
        
        {/* Timeline Node */}
        <motion.div
          className="timeline-node"
          initial={{ scale: 0, rotate: -180 }}
          animate={inView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
        >
          <div className="node-icon">{timelineIcon}</div>
          {isCurrentRole && (
            <motion.div
              className="current-indicator"
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.div>
      </div>

      {/* Experience Content */}
      <motion.div
        className="experience-content-card card-netflix"
        animate={isHovered ? { y: -5, scale: 1.02 } : { y: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Status Badge */}
        {isCurrentRole && (
          <motion.div
            className="current-role-badge"
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.7 }}
          >
            <span className="badge-icon">⚡</span>
            Most Recent Role
          </motion.div>
        )}

        {/* Job Header */}
        <div className="job-header">
          <motion.h3
            className="job-title"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
          >
            {job.role}
          </motion.h3>
          
          <motion.h4
            className="company-name"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
          >
            <span className="company-icon" aria-hidden="true">{companyIcon}</span>
            <span>{job.company}</span>
          </motion.h4>

          <motion.div
            className="job-meta"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.6 }}
          >
            <div className="meta-item">
              <span className="meta-icon">📅</span>
              <span className="meta-text">{job.duration}</span>
            </div>
            <div className="meta-item">
              <span className="meta-icon">📍</span>
              <span className="meta-text">{job.location}</span>
            </div>
          </motion.div>
        </div>

        {/* Key Metrics */}
        {metrics.length > 0 && (
          <motion.div
            className="job-metrics"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.7 }}
          >
            <h5>🎯 Key Impact</h5>
            <div className="metrics-grid">
              {metrics.map((metric, i) => (
                <div key={i} className="metric-item">
                  <span className="metric-value">{metric.value}</span>
                  <span className="metric-context">{metric.context}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Job Description */}
        <motion.div
          className="job-description"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.8 }}
        >
          <h5>📋 Key Responsibilities & Achievements</h5>
          <ul className="description-list">
            {job.description.map((point, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.2 + 0.9 + i * 0.1 }}
              >
                {point}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Experience Skills */}
        <motion.div
          className="experience-skills"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.2 + 1 }}
        >
          <div className="skills-learned">
            <span className="skills-icon">🛠️</span>
            <span className="skills-text">{focusText}</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Career Stats Component
const CareerStats: React.FC<{ data: ExperienceData[] }> = ({ data }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const stats = [
    { 
      number: data.length.toString(), 
      label: 'Professional Roles', 
      icon: '💼' 
    },
    { 
      number: '2+', 
      label: 'Years Experience', 
      icon: '📈' 
    },
    { 
      number: '15+', 
      label: 'Technologies Used', 
      icon: '⚡' 
    },
    { 
      number: '3+', 
      label: 'Projects Built', 
      icon: '🚀' 
    }
  ];

  return (
    <motion.div
      ref={ref}
      className="career-stats"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <h3>Career Snapshot</h3>
      <div className="stats-grid-career">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="career-stat-item"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -3 }}
          >
            <div className="stat-icon-large">{stat.icon}</div>
            <div className="stat-number-large">{stat.number}</div>
            <div className="stat-label-career">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const Experience: React.FC<Props> = ({ data, loading, onRefresh }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  if (loading && data.length === 0) {
    return (
      <section id="experience" className="section-netflix">
        <div className="container-netflix">
          <h2 className="heading-netflix">Professional Experience</h2>
          <SkeletonTimeline />
        </div>
      </section>
    );
  }

  if (!loading && data.length === 0) {
    return (
      <section id="experience" className="section-netflix">
        <div className="container-netflix">
          <h2 className="heading-netflix">Professional Experience</h2>
          <ErrorFallback 
            error="No experience data found. Please check back later." 
            onRetry={onRefresh || (() => {})} 
          />
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="section-netflix">
      <div className="container-netflix">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-netflix">Professional Journey</h2>
          
          {/* Career Stats */}
          <CareerStats data={data} />

          {/* Professional Timeline */}
          <motion.div
            className="experience-timeline-enhanced"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="timeline-header">
              <div className="timeline-title">
                <span className="timeline-icon">🏆</span>
                <h3>Career Timeline</h3>
              </div>
              <div className="timeline-description">
                A timeline of growth, impact, and continuous learning.
              </div>
            </div>

            <div className="timeline-container">
              {data.map((job, index) => (
                <TimelineItem
                  key={index}
                  job={job}
                  index={index}
                  isLast={index === data.length - 1}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
