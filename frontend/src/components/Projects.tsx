import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SkeletonCard, ErrorFallback } from './LoadingComponents';

interface ProjectData {
  title: string;
  github_link?: string;
  external_link?: string;
  demo?: { label: string; url: string };
  demo_media?: { type: 'image' | 'video'; url: string; alt?: string };
  demo_note?: string;
  description: string[];
  challenge?: string;
  technologies?: string[];
  featured?: boolean;
  metrics?: string[];
  duration?: string;
}

const FeaturedProjectCard: React.FC<{ project: ProjectData }> = ({ project }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="featured-project-card card-netflix"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      <div className="featured-project-inner">
        <div className="featured-project-left">
          <div className="featured-badge-new">
            <span>⭐ Featured · In Progress</span>
          </div>
          <h3 className="featured-project-title">{project.title}</h3>
          {project.duration && (
            <div className="featured-duration">{project.duration}</div>
          )}
          <p className="featured-project-desc">{project.description[0]}</p>

          {project.technologies && (
            <div className="featured-tech-tags">
              {project.technologies.map((tech, i) => (
                <span key={i} className="featured-tech-tag">{tech}</span>
              ))}
            </div>
          )}

          {project.metrics && (
            <div className="featured-metrics-row">
              {project.metrics.map((m, i) => (
                <span key={i} className="featured-metric-pill">{m}</span>
              ))}
            </div>
          )}

          <div className="featured-project-footer">
            {project.github_link && (
              <a
                href={project.github_link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-netflix btn-netflix-secondary"
              >
                <span className="btn-icon">📁</span>
                Source Code
                <div className="btn-shimmer"></div>
              </a>
            )}
            <span className="featured-active-badge">● Active</span>
          </div>
        </div>

        <div className="featured-project-right">
          <h4 style={{ marginBottom: '0.8rem', fontSize: '0.9rem', color: 'var(--ink-600)' }}>
            📋 All Highlights
          </h4>
          <ul className="featured-desc-list">
            {project.description.map((point, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -15 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              >
                {point}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

interface Props {
  data: ProjectData[];
  loading?: boolean;
  onRefresh?: () => void;
}

// Enhanced Project Card Component
const ProjectCard: React.FC<{ project: ProjectData; index: number }> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const demoUrl = project.demo?.url || project.external_link;
  const demoLabel = project.demo?.label || (project.external_link ? 'Live Demo' : 'View Demo');

  // Calculate project impact metrics based on description content
  const getProjectMetrics = (description: string[]) => {
    const metrics: { label: string; icon: string }[] = [];
    const addedLabels = new Set<string>(); // Track added labels to prevent duplicates
    
    // Look for common impact indicators
    description.forEach(desc => {
      const lowerDesc = desc.toLowerCase();
      
      if ((lowerDesc.includes('user') || lowerDesc.includes('experience')) && !addedLabels.has('User Experience')) {
        metrics.push({ label: 'User Experience', icon: '👥' });
        addedLabels.add('User Experience');
      }
      if ((lowerDesc.includes('performance') || lowerDesc.includes('speed') || lowerDesc.includes('fast') || lowerDesc.includes('latency')) && !addedLabels.has('Performance')) {
        metrics.push({ label: 'Performance', icon: '⚡' });
        addedLabels.add('Performance');
      }
      if ((lowerDesc.includes('secure') || lowerDesc.includes('security')) && !addedLabels.has('Security')) {
        metrics.push({ label: 'Security', icon: '🔒' });
        addedLabels.add('Security');
      }
      if ((lowerDesc.includes('responsive') || lowerDesc.includes('mobile')) && !addedLabels.has('Responsive')) {
        metrics.push({ label: 'Responsive', icon: '📱' });
        addedLabels.add('Responsive');
      }
      if ((lowerDesc.includes('scalable') || lowerDesc.includes('scale')) && !addedLabels.has('Scalability')) {
        metrics.push({ label: 'Scalability', icon: '📈' });
        addedLabels.add('Scalability');
      }
    });

    return metrics.slice(0, 3); // Limit to 3 metrics
  };

  const metrics = getProjectMetrics(project.description);

  return (
    <motion.div
      ref={ref}
      className="project-card-enhanced card-netflix"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Header */}
      <div className="project-header-enhanced">
        <motion.h3 
          className="project-title"
          animate={isHovered ? { x: 5 } : { x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {project.title}
        </motion.h3>
        
        {project.technologies && (
          <motion.div 
            className="project-tech-stack-enhanced"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
          >
            {project.technologies.map((tech, i) => (
              <motion.span 
                key={i} 
                className="tech-tag-enhanced"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        )}

        {/* Project Metrics */}
        {metrics.length > 0 && (
          <div className="project-metrics">
            {metrics.map((metric, i) => (
              <div key={i} className="metric-badge">
                <span className="metric-icon">{metric.icon}</span>
                <span className="metric-label">{metric.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="project-content-enhanced">
        <div className="project-overview">
          <h4>📋 Project Overview</h4>
          <ul className="project-description-enhanced">
            {project.description.map((desc, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 + i * 0.1 }}
              >
                {desc}
              </motion.li>
            ))}
          </ul>
        </div>

        {project.challenge && (
          <motion.div 
            className="project-challenge-enhanced"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
          >
            <h4>🎯 Challenge & Solution</h4>
            <p>{project.challenge}</p>
          </motion.div>
        )}

        <div className="project-demo">
          <h4>🎬 Demo</h4>
          {project.demo_media?.type === 'video' && (
            <video
              className="demo-media"
              src={project.demo_media.url}
              controls
              preload="metadata"
            />
          )}
          {project.demo_media?.type === 'image' && (
            <img
              className="demo-media"
              src={project.demo_media.url}
              alt={project.demo_media.alt || `${project.title} demo preview`}
              loading="lazy"
            />
          )}
          {!project.demo_media && (
            <div className="demo-placeholder">
              {project.demo_note || 'Demo coming soon.'}
            </div>
          )}
          {demoUrl && (
            <div className="demo-actions">
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-netflix btn-netflix-secondary demo-link"
                aria-label={`View ${project.title} demo`}
              >
                <span className="btn-icon">🎞️</span>
                {demoLabel}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Project Footer */}
      <motion.div 
        className="project-footer-enhanced"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
      >
        {project.title === "Portfolio Website" ? (
          <div className="current-viewing-enhanced">
            <motion.span 
              className="viewing-text-enhanced"
              animate={{ 
                scale: [1, 1.05, 1],
                textShadow: [
                  '0 0 10px rgba(0, 212, 255, 0.5)',
                  '0 0 20px rgba(0, 212, 255, 0.8)',
                  '0 0 10px rgba(0, 212, 255, 0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🌟 You're viewing this right now!
            </motion.span>
          </div>
        ) : (
          <div className="project-links-enhanced">
            {project.github_link && (
              <a
                href={project.github_link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-netflix btn-netflix-secondary"
                aria-label={`View ${project.title} source code on GitHub`}
              >
                <span className="btn-icon">📁</span>
                Source Code
                <div className="btn-shimmer"></div>
              </a>
            )}
          </div>
        )}
      </motion.div>

      {/* Hover Effect Overlay */}
      <motion.div
        className="project-hover-overlay"
        initial={{ opacity: 0 }}
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const Projects: React.FC<Props> = ({ data, loading, onRefresh }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const featuredProject = data.find(p => p.featured);
  const otherProjects = data.filter(p => !p.featured);

  if (loading && data.length === 0) {
    return (
      <section id="projects" className="section-netflix">
        <div className="container-netflix">
          <h2 className="heading-netflix">Projects</h2>
          <div className="project-grid-enhanced">
            {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>
      </section>
    );
  }

  if (!loading && data.length === 0) {
    return (
      <section id="projects" className="section-netflix">
        <div className="container-netflix">
          <h2 className="heading-netflix">Projects</h2>
          <ErrorFallback error="No projects found." onRetry={onRefresh || (() => {})} />
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section-netflix">
      <div className="container-netflix">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-netflix">Projects</h2>

          {featuredProject && <FeaturedProjectCard project={featuredProject} />}

          {otherProjects.length > 0 && (
            <motion.div
              className="project-grid-enhanced"
              style={{ marginTop: '1.5rem' }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {otherProjects.map((project, index) => (
                <ProjectCard key={index} project={project} index={index} />
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
