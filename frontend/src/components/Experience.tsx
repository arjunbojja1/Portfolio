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
    
    description.forEach(desc => {
      // Look for numbers, percentages, or impact indicators with better context extraction
      const percentageMatch = desc.match(/(\d+%)/g);
      const numberMatch = desc.match(/(\d+x|\$\d+|\d+\+)/g);
      
      if (percentageMatch) {
        percentageMatch.forEach(match => {
          // Extract more context around the percentage
          const beforeMatch = desc.substring(0, desc.indexOf(match)).split(' ').slice(-4).join(' ');
          const afterMatch = desc.substring(desc.indexOf(match) + match.length).split(' ').slice(0, 4).join(' ');
          
          let context = '';
          if (beforeMatch.includes('monitoring')) {
            context = 'reduction in manual monitoring time';
          } else if (beforeMatch.includes('latency')) {
            context = 'latency improvement';
          } else if (beforeMatch.includes('efficiency')) {
            context = 'efficiency boost';
          } else {
            context = (beforeMatch + ' ' + afterMatch).trim() || 'improvement';
          }
          
          metrics.push({
            value: match,
            context: context
          });
        });
      }
      
      if (numberMatch) {
        numberMatch.forEach(match => {
          const context = desc.split(match)[1]?.trim().substring(0, 30) + '...' || desc.substring(0, 30) + '...';
          metrics.push({
            value: match,
            context: context
          });
        });
      }
    });
    
    return metrics.slice(0, 2); // Limit to 2 key metrics
  };

  const metrics = getJobMetrics(job.description);
  const isCurrentRole = index === 0;

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
          <div className="node-icon">
            {isCurrentRole ? '🚀' : index === 1 ? '💡' : '💼'}
          </div>
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
            {job.company}
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
            <span className="skills-text">
              {isCurrentRole ? 'Currently developing' : 'Skills developed'}: Leadership, Problem-solving, Innovation
            </span>
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
      label: 'Professional Role', 
      icon: '💼' 
    },
    { 
      number: '2+', 
      label: 'Years Learning', 
      icon: '📈' 
    },
    { 
      number: '10+', 
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
      <h3>Academic & Professional Journey</h3>
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
                My professional journey showcasing growth, impact, and continuous learning
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

          {/* Call to Action */}
          <motion.div
            className="experience-cta"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="cta-content">
              <h3>Ready for the Next Challenge</h3>
              <p>
                Looking to bring my experience in software engineering and product strategy 
                to drive innovation and create meaningful impact in your organization.
              </p>
              <motion.a
                href="#contact"
                className="btn-netflix btn-netflix-primary"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="btn-icon">💬</span>
                Let's Connect
                <div className="btn-glow"></div>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;