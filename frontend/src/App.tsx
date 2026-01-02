import React, { useState, useEffect, useCallback } from 'react';
import { flushSync } from 'react-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { NetflixLoader, LoadingSpinner, ErrorFallback } from './components/LoadingComponents';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// Enhanced Error Boundary Component with better external script protection
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error; resetError: () => void }> },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    // Don't catch external script errors
    if (this.isExternalScriptError(error)) {
      return null; // Don't update state for external errors
    }
    return { hasError: true, error };
  }

  static isExternalScriptError(error: Error): boolean {
    const errorMessage = error.message?.toLowerCase() || '';
    const errorStack = error.stack?.toLowerCase() || '';
    
    const externalErrorPatterns = [
      'getCurrentActiveEditorState',
      'editorId',
      'chrome-extension',
      'moz-extension',
      'safari-extension',
      'extension://',
      'null is not an object (evaluating',
      'cannot read properties of null',
      'cannot read property',
      'scriptError'
    ];
    
    return externalErrorPatterns.some(pattern => 
      errorMessage.includes(pattern) || errorStack.includes(pattern)
    );
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Only log errors that are actually from our code
    if (!ErrorBoundary.isExternalScriptError(error)) {
      console.error('Portfolio Error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent 
          error={this.state.error!} 
          resetError={() => this.setState({ hasError: false, error: null })} 
        />
      );
    }

    return this.props.children;
  }
}

const DefaultErrorFallback: React.FC<{ error: Error; resetError: () => void }> = ({ error, resetError }) => (
  <div className="error-fallback">
    <h2>Something went wrong</h2>
    <p>Don't worry, this might be caused by browser extensions.</p>
    <button onClick={resetError}>Try Again</button>
  </div>
);

// Enhanced global error handler with more comprehensive filtering
const setupGlobalErrorHandling = () => {
  // Store original console.error to avoid infinite loops
  const originalConsoleError = console.error;
  
  // Handle window errors (including external scripts)
  window.addEventListener('error', (event) => {
    const errorMessage = event.message?.toLowerCase() || '';
    const errorFilename = event.filename?.toLowerCase() || '';
    const errorSource = event.error?.stack?.toLowerCase() || '';
    
    const externalErrorPatterns = [
      'getCurrentActiveEditorState',
      'editorId',
      'chrome-extension',
      'moz-extension', 
      'safari-extension',
      'extension://',
      'contentscript',
      'script error',
      'non-error promise rejection'
    ];
    
    // Check if this is an external script error
    const isExternalError = externalErrorPatterns.some(pattern => 
      errorMessage.includes(pattern) || 
      errorFilename.includes(pattern) || 
      errorSource.includes(pattern)
    );
    
    if (isExternalError) {
      event.preventDefault();
      event.stopPropagation();
      return false; // Prevent default error handling
    }
  }, true); // Use capture phase
  
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const reasonMessage = String(event.reason?.message || event.reason || '').toLowerCase();
    const reasonStack = String(event.reason?.stack || '').toLowerCase();
    
    const externalErrorPatterns = [
      'getCurrentActiveEditorState',
      'editorId',
      'chrome-extension',
      'moz-extension',
      'safari-extension',
      'extension://',
      'contentscript'
    ];
    
    const isExternalError = externalErrorPatterns.some(pattern => 
      reasonMessage.includes(pattern) || reasonStack.includes(pattern)
    );
    
    if (isExternalError) {
      event.preventDefault();
      return false;
    }
  });
  
  // Override console.error to filter out external script errors
  console.error = (...args: any[]) => {
    const errorString = args.join(' ').toLowerCase();
    
    const externalErrorPatterns = [
      'getCurrentActiveEditorState',
      'editorId',
      'chrome-extension',
      'moz-extension',
      'safari-extension',
      'extension://',
      'contentscript'
    ];
    
    const isExternalError = externalErrorPatterns.some(pattern => 
      errorString.includes(pattern)
    );
    
    if (!isExternalError) {
      originalConsoleError.apply(console, args);
    }
  };
  
  // Additional protection against extension injection
  try {
    // Create a protective wrapper around sensitive globals
    const originalDefineProperty = Object.defineProperty;
    const protectedProperties = ['A', 'getInstance', 'getCurrentActiveEditorState'];
    
    protectedProperties.forEach(prop => {
      try {
        if (!(prop in window)) {
          originalDefineProperty(window, prop, {
            get() { return undefined; },
            set() { return false; },
            configurable: false,
            enumerable: false
          });
        }
      } catch (e) {
        // Silently ignore if we can't protect this property
      }
    });
  } catch (e) {
    // Silently ignore if protection setup fails
  }
};

// Create a safe zone for React components
const SafeReactZone: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Additional runtime protection for this component tree
    const handleComponentError = (event: ErrorEvent) => {
      const errorMessage = event.message?.toLowerCase() || '';
      if (errorMessage.includes('getCurrentActiveEditorState') || 
          errorMessage.includes('editorId')) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return false;
      }
    };
    
    window.addEventListener('error', handleComponentError, true);
    return () => window.removeEventListener('error', handleComponentError, true);
  }, []);
  
  return <>{children}</>;
};

const NetflixParticles: React.FC = () => {
  return (
    <div className="netflix-particles-container">
      {[...Array(80)].map((_, i) => (
        <motion.div
          key={i}
          className="netflix-particle"
          initial={{ 
            opacity: 0,
            scale: 0,
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)
          }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: [
              Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200)
            ],
            y: [
              Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800) + 100,
              Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800) + 200
            ]
          }}
          transition={{ 
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
          style={{
            background: `radial-gradient(circle, ${
              Math.random() > 0.5 ? 'rgba(0, 113, 227, 0.35)' : 'rgba(64, 201, 162, 0.35)'
            } 0%, transparent 70%)`
          }}
        />
      ))}
    </div>
  );
};

const NetflixCodeRain: React.FC = () => {
  const codeSnippets = [
    'const portfolio = () => experience',
    'async function innovate() { return solutions; }',
    'let skills = [...frontend, ...backend, ...ai];',
    'while(creating) { value++; }',
    'git push origin future',
    'npm run build-dreams',
    'const impact = code * creativity;',
    'if(challenge) { overcome(); }',
    'React.useEffect(() => { inspire(); }, [passion]);',
    'const success = persistence + learning;'
  ];

  return (
    <div className="netflix-code-rain">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="netflix-code-line"
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 100,
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 6 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "linear"
          }}
          style={{
            left: `${(i / 15) * 100}%`,
            color: Math.random() > 0.7 ? 'rgba(0, 113, 227, 0.35)' : 'rgba(15, 23, 42, 0.25)'
          }}
        >
          {codeSnippets[Math.floor(Math.random() * codeSnippets.length)]}
        </motion.div>
      ))}
    </div>
  );
};

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.button
      className={`scroll-to-top-netflix ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="scroll-icon">↑</span>
      <div className="scroll-glow"></div>
    </motion.button>
  );
};

interface ProfileData {
  name: string;
  title: string;
  location: string;
  email: string;
  linkedin: string;
  github_user: string;
  about: { passion: string; seeking: string };
  skills: { [key: string]: string[] };
  education: {
    degree: string;
    university: string;
    gpa: string;
    grad_year: number;
    awards: string[];
    coursework: string[];
  };
}

interface ExperienceData {
  role: string;
  company: string;
  duration: string;
  location: string;
  description: string[];
}

interface ProjectData {
  title: string;
  github_link?: string;
  external_link?: string;
  technologies?: string[];
  description: string[];
  challenge?: string;
}

const getApiUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://us-central1-arjun-bojja-portfolio.cloudfunctions.net';
  }
  return 'http://localhost:8000/api';
};

const API_URL = getApiUrl();

const App: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [experience, setExperience] = useState<ExperienceData[]>([]);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNetflixLoader, setShowNetflixLoader] = useState(true);
  const [appReady, setAppReady] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      let profileUrl, experienceUrl, projectsUrl;
      
      if (process.env.NODE_ENV === 'production') {
        profileUrl = 'https://get-profile-twb6hlto6a-uc.a.run.app';
        experienceUrl = 'https://get-experience-twb6hlto6a-uc.a.run.app';
        projectsUrl = 'https://get-projects-twb6hlto6a-uc.a.run.app';
      } else {
        profileUrl = `${API_URL}/profile`;
        experienceUrl = `${API_URL}/experience`;
        projectsUrl = `${API_URL}/projects`;
      }
      
      const [profileRes, experienceRes, projectsRes] = await Promise.all([
        axios.get(profileUrl),
        axios.get(experienceUrl),
        axios.get(projectsUrl),
      ]);
      
      setProfile(profileRes.data);
      setExperience(experienceRes.data);
      setProjects(projectsRes.data);
      console.log('Portfolio data refreshed at:', new Date().toLocaleTimeString());
    } catch (err: any) {
      const errorMessage = err.response?.status === 404 
        ? 'Backend server is not running. Please start the server and try again.'
        : 'Failed to load portfolio data. Please check your connection and try again.';
      setError(errorMessage);
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Setup protection before any other effects
  useEffect(() => {
    setupGlobalErrorHandling();
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme === 'light' || storedTheme === 'dark'
      ? storedTheme
      : (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const interval = setInterval(() => {
        fetchData();
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [fetchData]);

  const handleNetflixLoaderComplete = () => {
    setShowNetflixLoader(false);
    setTimeout(() => setAppReady(true), 300);
  };

  const handleToggleTheme = (event?: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    const root = document.documentElement;
    const x = event?.clientX ?? window.innerWidth - 32;
    const y = event?.clientY ?? 32;

    root.style.setProperty('--vt-x', `${x}px`);
    root.style.setProperty('--vt-y', `${y}px`);

    const applyTheme = () => {
      flushSync(() => {
        setTheme(nextTheme);
      });
      localStorage.setItem('theme', nextTheme);
      root.setAttribute('data-theme', nextTheme);
    };

    const doc = document as typeof document & { startViewTransition?: (callback: () => void) => void };
    if (doc.startViewTransition) {
      root.classList.add('theme-transitioning');
      const transition = doc.startViewTransition(() => {
        applyTheme();
      }) as unknown as { finished?: Promise<void> };
      transition.finished?.finally(() => {
        root.classList.remove('theme-transitioning');
      });
    } else {
      applyTheme();
    }
  };

  // Show Netflix loader first
  if (showNetflixLoader) {
    return (
      <SafeReactZone>
        <NetflixLoader onComplete={handleNetflixLoaderComplete} />
      </SafeReactZone>
    );
  }

  // Show loading state for data
  if (loading && !profile) {
    return (
      <SafeReactZone>
        <div className="app-netflix">
          <NetflixParticles />
          <NetflixCodeRain />
          <div className="loading-overlay">
            <LoadingSpinner message="Loading portfolio data..." />
          </div>
        </div>
      </SafeReactZone>
    );
  }

  // Show error state
  if (error) {
    return (
      <SafeReactZone>
        <div className="app-netflix">
          <NetflixParticles />
          <NetflixCodeRain />
          <div className="error-overlay">
            <ErrorFallback error={error} onRetry={fetchData} />
          </div>
        </div>
      </SafeReactZone>
    );
  }

  return (
    <ErrorBoundary>
      <SafeReactZone>
        <AnimatePresence mode="wait">
          <motion.div 
            className="app-netflix"
            initial={{ opacity: 0 }}
            animate={appReady ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Background Effects */}
            <NetflixParticles />
            <NetflixCodeRain />
            
            {/* Main Content */}
            {profile && appReady && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <ErrorBoundary>
                  <Navbar theme={theme} onToggleTheme={handleToggleTheme} />
                </ErrorBoundary>
                <ErrorBoundary>
                  <Hero name={profile.name} title={profile.title} />
                </ErrorBoundary>
                <ErrorBoundary>
                  <About 
                    passion={profile.about.passion} 
                    seeking={profile.about.seeking}
                    location={profile.location}
                    skills={profile.skills}
                    education={profile.education}
                  />
                </ErrorBoundary>
                <ErrorBoundary>
                  <Experience data={experience} loading={loading} onRefresh={fetchData} />
                </ErrorBoundary>
                <ErrorBoundary>
                  <Projects data={projects} loading={loading} onRefresh={fetchData} />
                </ErrorBoundary>
                <ErrorBoundary>
                  <Contact 
                    email={profile.email} 
                    apiUrl={process.env.NODE_ENV === 'production' 
                      ? 'https://contact-form-twb6hlto6a-uc.a.run.app' 
                      : `${API_URL}/contact`
                    } 
                  />
                </ErrorBoundary>
                <ErrorBoundary>
                  <Footer linkedin={profile.linkedin} github={`https://github.com/${profile.github_user}`} />
                </ErrorBoundary>
                <ErrorBoundary>
                  <ScrollToTop />
                </ErrorBoundary>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </SafeReactZone>
    </ErrorBoundary>
  );
};

export default App;
