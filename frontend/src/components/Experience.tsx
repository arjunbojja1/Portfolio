import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SkeletonTimeline, ErrorFallback } from './LoadingComponents';
import { FaBriefcase, FaChartLine, FaCode, FaRocket, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

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

const LOGO_TOKEN = 'pk_VZGrte1ZRUCeHhcZhQ4HpQ';

const TimelineItem: React.FC<{ job: ExperienceData; index: number; isLast: boolean }> = ({ job, index, isLast }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [isHovered, setIsHovered] = useState(false);

  const isCurrentRole = index === 0;

  const companyLogoMap: Record<string, string> = {
    'Microsoft': `https://img.logo.dev/microsoft.com?token=${LOGO_TOKEN}&format=png`,
    'Capital One': `https://img.logo.dev/capitalone.com?token=${LOGO_TOKEN}&format=png`,
    'Roblox (Gochi)': `https://img.logo.dev/roblox.com?token=${LOGO_TOKEN}&format=png`,
  };
  const companyLogo = companyLogoMap[job.company];

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
        <motion.div
          className="timeline-node"
          initial={{ scale: 0, rotate: -180 }}
          animate={inView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
        >
          <div className="node-icon">
            {companyLogo
              ? <img src={companyLogo} alt={job.company} width={22} height={22} style={{ objectFit: 'contain' }} />
              : React.createElement(FaBriefcase as any, { size: 14, color: 'var(--sky-500)' })}
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
        className="experience-content-card"
        animate={isHovered ? { y: -4 } : { y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* Card top bar */}
        <div className="exp-card-top">
          <div className="exp-card-company-row">
            {companyLogo && (
              <img src={companyLogo} alt={job.company} width={22} height={22} style={{ objectFit: 'contain', flexShrink: 0 }} />
            )}
            <span className="exp-company-label">{job.company}</span>
            <span className="exp-meta-sep">·</span>
            <span className="exp-meta-chip">
              {React.createElement(FaCalendarAlt as any, { size: 11 })}
              {job.duration}
            </span>
            <span className="exp-meta-sep">·</span>
            <span className="exp-meta-chip">
              {React.createElement(FaMapMarkerAlt as any, { size: 11 })}
              {job.location}
            </span>
          </div>
          {isCurrentRole && (
            <span className="current-role-badge">
              <span className="badge-dot" />
              Upcoming
            </span>
          )}
        </div>

        {/* Role title */}
        <motion.h3
          className="job-title"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
        >
          {job.role}
        </motion.h3>

        {/* Divider */}
        <div className="exp-divider" />

        {/* Description */}
        <motion.ul
          className="description-list"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
        >
          {job.description.map((point, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.35, delay: index * 0.2 + 0.7 + i * 0.08 }}
            >
              {point}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.div>
  );
};

const STAT_ICONS = [FaBriefcase, FaChartLine, FaCode, FaRocket];
const STAT_ACCENTS = ['purple', 'cyan', 'purple', 'cyan'];

const CareerStats: React.FC<{ data: ExperienceData[] }> = ({ data }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const stats = [
    { number: data.length.toString(), label: 'Professional Roles' },
    { number: '2+', label: 'Years Experience' },
    { number: '15+', label: 'Technologies Used' },
    { number: '3+', label: 'Projects Built' },
  ];

  return (
    <motion.div
      ref={ref}
      className="career-stats-bar"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      {stats.map((stat, index) => (
        <React.Fragment key={index}>
          <motion.div
            className="career-stat-cell"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className={`stat-cell-icon stat-icon-${STAT_ACCENTS[index]}`}>
              {React.createElement(STAT_ICONS[index] as any, { size: 16 })}
            </div>
            <span className="stat-cell-number">{stat.number}</span>
            <span className="stat-cell-label">{stat.label}</span>
          </motion.div>
          {index < stats.length - 1 && <div className="stat-bar-sep" />}
        </React.Fragment>
      ))}
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

          <CareerStats data={data} />

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
      </div>
    </section>
  );
};

export default Experience;
