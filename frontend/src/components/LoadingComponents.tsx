import React from 'react';

// Skeleton loader for cards
export const SkeletonCard: React.FC = () => (
  <div className="skeleton-card">
    <div className="skeleton-header"></div>
    <div className="skeleton-content">
      <div className="skeleton-line"></div>
      <div className="skeleton-line short"></div>
      <div className="skeleton-line"></div>
    </div>
  </div>
);

// Skeleton loader for timeline
export const SkeletonTimeline: React.FC = () => (
  <div className="skeleton-timeline">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="skeleton-timeline-item">
        <div className="skeleton-dot"></div>
        <div className="skeleton-timeline-content">
          <div className="skeleton-line"></div>
          <div className="skeleton-line short"></div>
        </div>
      </div>
    ))}
  </div>
);

// Enhanced loading component with animation
export const LoadingSpinner: React.FC<{ message?: string }> = ({ message = "Loading..." }) => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p className="loading-message">{message}</p>
  </div>
);

// Error boundary component
export const ErrorFallback: React.FC<{ error: string; onRetry: () => void }> = ({ error, onRetry }) => (
  <div className="error-container">
    <div className="error-icon">⚠️</div>
    <h3>Oops! Something went wrong</h3>
    <p>{error}</p>
    <button onClick={onRetry} className="btn btn-primary">
      Try Again
    </button>
  </div>
);