import React, { useState, useEffect, useCallback } from 'react';
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

// Enhanced Particles Component
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
              Math.random() > 0.5 ? '#00d4ff' : '#00ff88'
            } 0%, transparent 70%)`
          }}
        />
      ))}
    </div>
  );
};

// Enhanced Code Rain with Netflix styling
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
            color: Math.random() > 0.7 ? '#00d4ff' : 'rgba(0, 212, 255, 0.3)'
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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  // Show Netflix loader first
  if (showNetflixLoader) {
    return <NetflixLoader onComplete={handleNetflixLoaderComplete} />;
  }

  // Show loading state for data
  if (loading && !profile) {
    return (
      <div className="app-netflix">
        <NetflixParticles />
        <NetflixCodeRain />
        <div className="loading-overlay">
          <LoadingSpinner message="Loading portfolio data..." />
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="app-netflix">
        <NetflixParticles />
        <NetflixCodeRain />
        <div className="error-overlay">
          <ErrorFallback error={error} onRetry={fetchData} />
        </div>
      </div>
    );
  }

  return (
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
            <Navbar />
            <Hero name={profile.name} title={profile.title} />
            <About 
              passion={profile.about.passion} 
              seeking={profile.about.seeking}
              location={profile.location}
              skills={profile.skills}
              education={profile.education}
            />
            <Experience data={experience} loading={loading} onRefresh={fetchData} />
            <Projects data={projects} loading={loading} onRefresh={fetchData} />
            <Contact 
              email={profile.email} 
              apiUrl={process.env.NODE_ENV === 'production' 
                ? 'https://contact-form-twb6hlto6a-uc.a.run.app' 
                : `${API_URL}/contact`
              } 
            />
            <Footer linkedin={profile.linkedin} github={`https://github.com/${profile.github_user}`} />
            <ScrollToTop />
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default App;