import React, { useState, useEffect, useCallback } from 'react';
import { flushSync } from 'react-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Footer from './components/Footer';
import { LoadingSpinner, ErrorFallback } from './components/LoadingComponents';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error; resetError: () => void }> },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Portfolio Error:', error, errorInfo);
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

const DefaultErrorFallback: React.FC<{ error: Error; resetError: () => void }> = ({ resetError }) => (
  <div className="error-fallback">
    <h2>Something went wrong</h2>
    <p>Don't worry, this might be caused by browser extensions.</p>
    <button onClick={resetError}>Try Again</button>
  </div>
);

const NetflixParticles: React.FC<{ count?: number }> = ({ count = 30 }) => (
  <div className="netflix-particles-container">
    {[...Array(count)].map((_, i) => (
      <motion.div
        key={i}
        className="netflix-particle"
        initial={{ opacity: 0, scale: 0, x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
          x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth, Math.random() * window.innerWidth],
          y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight + 100, Math.random() * window.innerHeight + 200],
        }}
        transition={{ duration: 8 + Math.random() * 4, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 5 }}
        style={{ background: `radial-gradient(circle, ${Math.random() > 0.5 ? 'rgba(124, 58, 237, 0.3)' : 'rgba(34, 211, 238, 0.25)'} 0%, transparent 70%)` }}
      />
    ))}
  </div>
);

const CODE_SNIPPETS = [
  'const portfolio = () => experience',
  'async function innovate() { return solutions; }',
  'let skills = [...frontend, ...backend, ...ai];',
  'while(creating) { value++; }',
  'git push origin future',
  'npm run build-dreams',
  'const impact = code * creativity;',
  'if(challenge) { overcome(); }',
  'React.useEffect(() => { inspire(); }, [passion]);',
  'const success = persistence + learning;',
];

const NetflixCodeRain: React.FC = () => (
  <div className="netflix-code-rain">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="netflix-code-line"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: window.innerHeight + 100, opacity: [0, 1, 1, 0] }}
        transition={{ duration: 6 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 8, ease: 'linear' }}
        style={{ left: `${(i / 15) * 100}%`, color: Math.random() > 0.7 ? 'rgba(124, 58, 237, 0.3)' : 'rgba(15, 23, 42, 0.25)' }}
      >
        {CODE_SNIPPETS[i % CODE_SNIPPETS.length]}
      </motion.div>
    ))}
  </div>
);

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

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
  metrics?: string[];
}

interface ProjectData {
  title: string;
  github_link?: string;
  external_link?: string;
  demo?: { label: string; url: string };
  demo_media?: { type: 'image' | 'video'; url: string; alt?: string };
  demo_note?: string;
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
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const cacheKey = 'portfolio_data_v2';
      const cachedData = localStorage.getItem(cacheKey);
      const cacheTimestamp = localStorage.getItem(cacheKey + '_time');
      const cacheExpiry = 5 * 60 * 1000;

      if (cachedData && cacheTimestamp && Date.now() - parseInt(cacheTimestamp) < cacheExpiry) {
        const { profile, experience, projects } = JSON.parse(cachedData);
        setProfile(profile);
        setExperience(experience);
        setProjects(projects);
        setLoading(false);
        return;
      }

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

      const data = {
        profile: profileRes.data,
        experience: experienceRes.data,
        projects: projectsRes.data,
      };

      localStorage.setItem(cacheKey, JSON.stringify(data));
      localStorage.setItem(cacheKey + '_time', Date.now().toString());

      setProfile(data.profile);
      setExperience(data.experience);
      setProjects(data.projects);
    } catch (err: any) {
      const errorMessage =
        err.response?.status === 404
          ? 'Backend server is not running. Please start the server and try again.'
          : 'Failed to load portfolio data. Please check your connection and try again.';
      setError(errorMessage);
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const interval = setInterval(fetchData, 30000);
      return () => clearInterval(interval);
    }
  }, [fetchData]);

  const handleToggleTheme = (event?: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    const root = document.documentElement;
    const x = event?.clientX ?? window.innerWidth - 32;
    const y = event?.clientY ?? 32;

    root.style.setProperty('--vt-x', `${x}px`);
    root.style.setProperty('--vt-y', `${y}px`);

    const applyTheme = () => {
      flushSync(() => setTheme(nextTheme));
      localStorage.setItem('theme', nextTheme);
      root.setAttribute('data-theme', nextTheme);
    };

    const doc = document as typeof document & { startViewTransition?: (callback: () => void) => void };
    if (doc.startViewTransition) {
      root.classList.add('theme-transitioning');
      const transition = doc.startViewTransition(applyTheme) as unknown as { finished?: Promise<void> };
      transition.finished?.finally(() => root.classList.remove('theme-transitioning'));
    } else {
      applyTheme();
    }
  };

  if (loading && !profile) {
    return (
      <div className="app-netflix">
        <div className="loading-overlay">
          <LoadingSpinner message="Loading portfolio data..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-netflix">
        <div className="error-overlay">
          <ErrorFallback error={error} onRetry={fetchData} />
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        <motion.div
          className="app-netflix"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <NetflixParticles count={30} />
          <NetflixCodeRain />
          {profile && (
            <>
              <ErrorBoundary>
                <Navbar theme={theme} onToggleTheme={handleToggleTheme} />
              </ErrorBoundary>
              <ErrorBoundary>
                <Hero name={profile.name} title={profile.title} github={`https://github.com/${profile.github_user}`} />
              </ErrorBoundary>
              <ErrorBoundary>
                <About
                  passion={profile.about.passion}
                  seeking={profile.about.seeking}
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
                <Footer linkedin={profile.linkedin} github={`https://github.com/${profile.github_user}`} />
              </ErrorBoundary>
              <ErrorBoundary>
                <ScrollToTop />
              </ErrorBoundary>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </ErrorBoundary>
  );
};

export default App;
