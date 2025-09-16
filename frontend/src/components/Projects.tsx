import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SkeletonCard, ErrorFallback } from './LoadingComponents';

interface ProjectData {
  title: string;
  github_link?: string;
  external_link?: string;
  description: string[];
  challenge?: string;
  technologies?: string[];
}

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
            {project.external_link && (
              <a
                href={project.external_link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-netflix btn-netflix-primary"
                aria-label={`Visit ${project.title} live demo`}
              >
                <span className="btn-icon">🚀</span>
                Live Demo
                <div className="btn-glow"></div>
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
  const [filter, setFilter] = useState<string>('all');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  
  // Extract unique technologies for filtering
  const allTechs = Array.from(new Set(data.flatMap(project => project.technologies || [])));
  
  const filteredProjects = filter === 'all' 
    ? data 
    : data.filter(project => project.technologies?.includes(filter));

  // Calculate portfolio stats
  const portfolioStats = {
    totalProjects: data.length,
    technologies: allTechs.length,
    featured: data.filter(p => p.challenge).length
  };

  if (loading && data.length === 0) {
    return (
      <section id="projects" className="section-netflix">
        <div className="container-netflix">
          <h2 className="heading-netflix">Featured Projects</h2>
          <div className="project-grid-enhanced">
            {[...Array(3)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!loading && data.length === 0) {
    return (
      <section id="projects" className="section-netflix">
        <div className="container-netflix">
          <h2 className="heading-netflix">Featured Projects</h2>
          <ErrorFallback 
            error="No projects found. Please check back later." 
            onRetry={onRefresh || (() => {})} 
          />
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
          <h2 className="heading-netflix">Featured Projects</h2>
          
          {/* Portfolio Stats */}
          <motion.div 
            className="portfolio-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="stat-item-small">
              <span className="stat-number-small">{portfolioStats.totalProjects}</span>
              <span className="stat-label-small">Projects</span>
            </div>
            <div className="stat-item-small">
              <span className="stat-number-small">{portfolioStats.technologies}</span>
              <span className="stat-label-small">Technologies</span>
            </div>
            <div className="stat-item-small">
              <span className="stat-number-small">{portfolioStats.featured}</span>
              <span className="stat-label-small">Case Studies</span>
            </div>
          </motion.div>

          {/* Enhanced Technology Filter */}
          {allTechs.length > 0 && (
            <motion.div 
              className="project-filters-enhanced"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button 
                className={`filter-btn-enhanced ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                <span className="filter-icon">🎯</span>
                All Projects
                <span className="filter-count">({data.length})</span>
              </button>
              {allTechs.map(tech => (
                <button 
                  key={tech}
                  className={`filter-btn-enhanced ${filter === tech ? 'active' : ''}`}
                  onClick={() => setFilter(tech)}
                >
                  <span className="filter-icon">⚡</span>
                  {tech}
                  <span className="filter-count">({data.filter(p => p.technologies?.includes(tech)).length})</span>
                </button>
              ))}
            </motion.div>
          )}
          
          {/* Enhanced Project Grid */}
          <motion.div 
            className="project-grid-enhanced"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </motion.div>
          
          {/* No Results Message */}
          {filteredProjects.length === 0 && filter !== 'all' && (
            <motion.div 
              className="no-results-enhanced"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="no-results-icon">🔍</div>
              <h3>No projects found</h3>
              <p>No projects match the "{filter}" filter.</p>
              <button 
                onClick={() => setFilter('all')} 
                className="btn-netflix btn-netflix-primary"
              >
                <span className="btn-icon">👁️</span>
                Show All Projects
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;