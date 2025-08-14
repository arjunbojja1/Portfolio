import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingComponents.css';

export const NetflixLoader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const loadingTexts = [
    "Initializing experience...",
    "Loading portfolio data...",
    "Preparing animations...",
    "Almost ready..."
  ];

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsComplete(true);
          setTimeout(onComplete, 1000);
          return 100;
        }
        return prev + Math.random() * 3 + 1;
      });
    }, 50);

    // Text rotation
    const textInterval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % loadingTexts.length);
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onComplete, loadingTexts.length]);

  return (
    <AnimatePresence>
      <motion.div 
        className="netflix-loader"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Liquid Glass Background */}
        <div className="liquid-glass-bg">
          <div className="glass-orb glass-orb-1"></div>
          <div className="glass-orb glass-orb-2"></div>
          <div className="glass-orb glass-orb-3"></div>
          <div className="glass-orb glass-orb-4"></div>
        </div>

        {/* Main Loading Content */}
        <div className="loading-content">
          {/* Animated Logo/Brand */}
          <motion.div 
            className="brand-container"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="holographic-brand">
              <span className="brand-text">ARJUN BOJJA</span>
              <div className="brand-subtitle">Portfolio Experience</div>
            </div>
          </motion.div>

          {/* Netflix-style Loading Bar */}
          <motion.div 
            className="loading-bar-container"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="loading-bar-bg">
              <motion.div 
                className="loading-bar-fill"
                style={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.1 }}
              />
              <div className="loading-bar-glow"></div>
            </div>
            <div className="loading-percentage">{Math.round(loadingProgress)}%</div>
          </motion.div>

          {/* Dynamic Loading Text */}
          <motion.div 
            className="loading-text-container"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentText}
                className="loading-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {loadingTexts[currentText]}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Floating Particles */}
          <div className="floating-particles">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="particle"
                initial={{ 
                  opacity: 0,
                  scale: 0,
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight 
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [Math.random() * window.innerHeight, -100]
                }}
                transition={{ 
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2 
                }}
              />
            ))}
          </div>
        </div>

        {/* Loading Complete Animation */}
        {isComplete && (
          <motion.div
            className="completion-effect"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 3, opacity: [0, 1, 0] }}
            transition={{ duration: 1 }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export const LoadingSpinner: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <div className="modern-loading-container">
      <div className="spinner-container">
        <div className="liquid-spinner">
          <div className="spinner-core"></div>
          <div className="spinner-ring ring-1"></div>
          <div className="spinner-ring ring-2"></div>
          <div className="spinner-ring ring-3"></div>
        </div>
      </div>
      {message && <div className="loading-message-modern">{message}</div>}
    </div>
  );
};

export const ErrorFallback: React.FC<{ error: string; onRetry: () => void }> = ({ error, onRetry }) => {
  return (
    <motion.div 
      className="error-container-modern"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="error-content">
        <div className="error-icon">⚠️</div>
        <h3>Oops! Something went wrong</h3>
        <p>{error}</p>
        <motion.button 
          className="retry-btn"
          onClick={onRetry}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try Again
        </motion.button>
      </div>
    </motion.div>
  );
};

export const SkeletonTimeline: React.FC = () => {
  return (
    <div className="skeleton-timeline-netflix">
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          className="skeleton-timeline-item-netflix"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: [0.6, 1, 0.6], x: 0 }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            delay: index * 0.2 
          }}
        >
          <div className="skeleton-dot-netflix"></div>
          <div className="skeleton-content-netflix">
            <div className="skeleton-header-netflix"></div>
            <div className="skeleton-subheader-netflix"></div>
            <div className="skeleton-lines-netflix">
              <div className="skeleton-line-netflix"></div>
              <div className="skeleton-line-netflix short"></div>
              <div className="skeleton-line-netflix"></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export const SkeletonCard: React.FC = () => {
  return (
    <motion.div 
      className="skeleton-card-netflix"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: [0.6, 1, 0.6],
        scale: 1
      }}
      transition={{ 
        duration: 1.5, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="skeleton-card-header">
        <div className="skeleton-title-netflix"></div>
        <div className="skeleton-tech-stack">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="skeleton-tech-tag"></div>
          ))}
        </div>
      </div>
      <div className="skeleton-card-content">
        <div className="skeleton-line-netflix"></div>
        <div className="skeleton-line-netflix short"></div>
        <div className="skeleton-line-netflix"></div>
        <div className="skeleton-line-netflix short"></div>
      </div>
      <div className="skeleton-card-footer">
        <div className="skeleton-button"></div>
        <div className="skeleton-button secondary"></div>
      </div>
    </motion.div>
  );
};