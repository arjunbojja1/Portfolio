import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { LoadingSpinner, ErrorFallback } from './components/LoadingComponents';
import './App.css';

const Particles: React.FC = () => {
  return (
    <div className="particles-container">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${10 + Math.random() * 20}s`
          }}
        />
      ))}
    </div>
  );
};

const CodeRain: React.FC = () => {
  const codeSnippets = [
    'const portfolio = new Developer();',
    'function createAwesome() { return magic; }',
    'let skills = [...languages, ...frameworks];',
    'while(learning) { knowledge++; }',
    'git commit -m "another cool feature"',
    'npm install awesome-portfolio',
    'async function buildFuture() { await dreams; }',
    'const motivation = coffee * code;',
    'if(opportunity) { skills.apply(); }',
    'React.useEffect(() => { beAmazing(); }, []);'
  ];

  return (
    <div className="code-rain">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="code-line"
          style={{
            left: `${i * 10}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${8 + Math.random() * 4}s`
          }}
        >
          {codeSnippets[Math.floor(Math.random() * codeSnippets.length)]}
        </div>
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
    <button
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      ↑
    </button>
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
  technologies?: string[]; // Add this missing field
  description: string[];
  challenge?: string;
}

// Firebase Functions URLs - using the actual deployed URLs
const getApiUrl = () => {
  // In production, use the actual Firebase Functions URLs
  if (process.env.NODE_ENV === 'production') {
    // Base URL for Firebase Functions
    return 'https://us-central1-arjun-bojja-portfolio.cloudfunctions.net';
  }
  // In development, fall back to local backend if available
  return 'http://localhost:8000/api';
};

const API_URL = getApiUrl();

const App: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [experience, setExperience] = useState<ExperienceData[]>([]);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use the correct Firebase Functions URLs from the deployment output
      let profileUrl, experienceUrl, projectsUrl;
      
      if (process.env.NODE_ENV === 'production') {
        // Use the actual deployed Firebase Function URLs from the deployment output
        profileUrl = 'https://get-profile-twb6hlto6a-uc.a.run.app';
        experienceUrl = 'https://get-experience-twb6hlto6a-uc.a.run.app';
        projectsUrl = 'https://get-projects-twb6hlto6a-uc.a.run.app';
      } else {
        // Development URLs
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

  if (loading && !profile) {
    return (
      <div className="App">
        <Particles />
        <CodeRain />
        <LoadingSpinner message="Loading portfolio..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <Particles />
        <CodeRain />
        <div className="container">
          <ErrorFallback error={error} onRetry={fetchData} />
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Particles />
      <CodeRain />
      {profile && (
        <>
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
        </>
      )}
    </div>
  );
};

export default App;