import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SkeletonCard, ErrorFallback } from './LoadingComponents';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

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
            <span className="featured-badge-dot" />
            Featured · In Progress
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
                {React.createElement(FaGithub as any, { size: 14 })}
                Source Code
                <div className="btn-shimmer"></div>
              </a>
            )}
            <span className="featured-active-badge">
              <span className="featured-active-dot" />
              Active
            </span>
          </div>
        </div>

        <div className="featured-project-right">
          <h4 style={{ marginBottom: '0.8rem', fontSize: '0.9rem', color: 'var(--ink-600)' }}>
            Highlights
          </h4>
          <ul className="featured-desc-list">
            {project.description.slice(1).map((point, i) => (
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

const ACCENT_COLORS = ['var(--sky-500)', 'var(--mint-400)', 'var(--sky-500)'];

const ProjectCard: React.FC<{ project: ProjectData; index: number }> = ({ project, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];
  const demoUrl = project.demo?.url || project.external_link;

  return (
    <motion.div
      ref={ref}
      className="proj-card-b"
      style={{ '--proj-accent': accent } as React.CSSProperties}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ x: 3 }}
    >
      <div className="proj-card-b-top">
        <h3 className="proj-card-b-title">{project.title}</h3>
      </div>
      <p className="proj-card-b-desc">{project.description[0]}</p>
      {project.technologies && (
        <div className="proj-card-b-tech">
          {project.technologies.slice(0, 5).map((tech, i) => (
            <span key={i} className="proj-card-b-pill">{tech}</span>
          ))}
        </div>
      )}
      <div className="proj-card-b-footer">
        <span className="proj-card-b-date">{project.duration || ''}</span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {project.github_link && (
            <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="proj-icon-link" aria-label="GitHub" title="GitHub">
              {React.createElement(FaGithub as any, { size: 15 })}
            </a>
          )}
          {demoUrl && (
            <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="proj-icon-link" aria-label="Live demo" title="Live Demo">
              {React.createElement(FaExternalLinkAlt as any, { size: 13 })}
            </a>
          )}
        </div>
      </div>
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
