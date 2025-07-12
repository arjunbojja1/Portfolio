import React, { useState } from 'react';
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

const Experience: React.FC<Props> = ({ data, loading, onRefresh }) => {
  if (loading && data.length === 0) {
    return (
      <section id="experience" className="container">
        <h2>Experience</h2>
        <SkeletonTimeline />
      </section>
    );
  }

  if (!loading && data.length === 0) {
    return (
      <section id="experience" className="container">
        <h2>Experience</h2>
        <ErrorFallback 
          error="No experience data found. Please check back later." 
          onRetry={onRefresh || (() => {})} 
        />
      </section>
    );
  }

  // Use vertical timeline for all experiences
  return (
    <section id="experience" className="container">
      <h2>Experience</h2>
      
      <div className="experience-timeline">
        {data.map((job, index) => (
          <div key={index} className="timeline-experience-item">
            <div className="timeline-date">
              <div className="timeline-icon">
                {index === 0 ? '🌟' : '💼'}
              </div>
            </div>
            
            <div className="timeline-experience-content">
              <div className="timeline-experience-header">
                <h3>{job.role}</h3>
                <h4>{job.company}</h4>
                <div className="timeline-experience-meta">
                  <span className="duration">{job.duration}</span>
                  <span className="location">📍 {job.location}</span>
                </div>
              </div>
              
              <div className="timeline-experience-description">
                <ul>
                  {job.description.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;