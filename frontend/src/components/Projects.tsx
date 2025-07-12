import React, { useState } from 'react';
import { SkeletonCard, ErrorFallback } from './LoadingComponents';

interface ProjectData {
  title: string;
  github_link?: string;
  external_link?: string;
  description: string[];
  challenge?: string;
  technologies?: string[]; // Add this for tech stack display
}

interface Props {
  data: ProjectData[];
  loading?: boolean;
  onRefresh?: () => void;
}

const Projects: React.FC<Props> = ({ data, loading, onRefresh }) => {
  const [filter, setFilter] = useState<string>('all');
  
  // Extract unique technologies for filtering
  const allTechs = Array.from(new Set(data.flatMap(project => project.technologies || [])));
  
  const filteredProjects = filter === 'all' 
    ? data 
    : data.filter(project => project.technologies?.includes(filter));

  if (loading && data.length === 0) {
    return (
      <section id="projects" className="container">
        <h2>Projects</h2>
        <div className="project-grid">
          {[...Array(3)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (!loading && data.length === 0) {
    return (
      <section id="projects" className="container">
        <h2>Projects</h2>
        <ErrorFallback 
          error="No projects found. Please check back later." 
          onRetry={onRefresh || (() => {})} 
        />
      </section>
    );
  }

  return (
    <section id="projects" className="container">
      <h2>Projects</h2>
      
      {/* Technology Filter */}
      {allTechs.length > 0 && (
        <div className="project-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({data.length})
          </button>
          {allTechs.map(tech => (
            <button 
              key={tech}
              className={`filter-btn ${filter === tech ? 'active' : ''}`}
              onClick={() => setFilter(tech)}
            >
              {tech} ({data.filter(p => p.technologies?.includes(tech)).length})
            </button>
          ))}
        </div>
      )}
      
      <div className="project-grid">
        {filteredProjects.map((project, index) => (
          <div className="project-card hover-glow" key={index}>
            <div className="project-header">
              <h3>{project.title}</h3>
              {project.technologies && (
                <div className="project-tech-stack">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="project-content">
              <ul className="project-description">
                {project.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
              
              {project.challenge && (
                <div className="project-challenge">
                  <h4>🎯 Challenge & Impact</h4>
                  <p>{project.challenge}</p>
                </div>
              )}
            </div>
            
            <div className="project-footer">
              <div className="project-links">
                {project.github_link && (
                  <a 
                    href={project.github_link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-secondary"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <span className="btn-icon">📁</span>
                    GitHub
                  </a>
                )}
                {project.external_link && (
                  <a 
                    href={project.external_link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary"
                    aria-label={`Visit ${project.title} website`}
                  >
                    <span className="btn-icon">🚀</span>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProjects.length === 0 && filter !== 'all' && (
        <div className="no-results">
          <p>No projects found for "{filter}". <button onClick={() => setFilter('all')} className="link-btn">Show all projects</button></p>
        </div>
      )}
    </section>
  );
};

export default Projects;