import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { FaEnvelope, FaGithub, FaCode } from 'react-icons/fa';

const LOGO_TOKEN = 'pk_VZGrte1ZRUCeHhcZhQ4HpQ';

const logoUrl = (domain: string) =>
  `https://img.logo.dev/${domain}?token=${LOGO_TOKEN}&format=png`;

const CUSTOM_LOGOS: Record<string, string> = {
  'umd.edu': 'https://upload.wikimedia.org/wikipedia/en/3/3e/University_of_Maryland_seal.svg',
};

const CompanyLogo: React.FC<{ domain: string; alt: string; size?: number }> = ({ domain, alt, size = 20 }) => (
  <img
    src={CUSTOM_LOGOS[domain] ?? logoUrl(domain)}
    alt={alt}
    width={size}
    height={size}
    style={{ objectFit: 'contain', display: 'block' }}
  />
);

interface Props {
  name: string;
  title: string;
  github: string;
}

const FloatingOrbs: React.FC = () => (
  <div className="floating-orbs-container">
    {[1, 2, 3].map((i) => (
      <div key={i} className={`floating-orb orb-${i}`} />
    ))}
  </div>
);

const ProfileCard: React.FC<{ imageSrc: string; name: string }> = ({ imageSrc, name }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="profile-card-new"
      initial={{ scale: 0.85, opacity: 0, y: 20 }}
      animate={inView ? { scale: 1, opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: 'easeOut', delay: 0.3 }}
    >
      <div className="profile-card-inner">
        <div className="profile-photo-frame">
          <div className="profile-glow-primary"></div>
          <div className="profile-glow-secondary"></div>
          <div className="profile-ring-outer"></div>
          <div className="profile-ring-inner"></div>
          <img
            src={imageSrc}
            alt={`${name} — Professional Portrait`}
            className="profile-photo"
            fetchPriority="high"
          />
          <div className="profile-particles">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="profile-particle"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1, 0], opacity: [0, 1, 0], rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                style={{ left: `${20 + (i % 4) * 20}%`, top: `${20 + Math.floor(i / 4) * 20}%` }}
              />
            ))}
          </div>
        </div>

        <div className="profile-card-body">
          <div className="profile-card-name">{name}</div>
          <div className="profile-card-spec">Backend Infrastructure · AI Infrastructure</div>
          <div className="profile-card-tags">
            {['Python', 'Backend Systems', 'AWS', 'AI Infrastructure', 'FastAPI'].map((tag, i) => (
              <span key={i} className={`profile-card-tag ${i % 2 === 1 ? 'cyan' : ''}`}>{tag}</span>
            ))}
          </div>
          <div className="profile-card-companies">
            <span className="company-badge"><CompanyLogo domain="microsoft.com" alt="Microsoft" size={16} /> Microsoft</span>
            <span className="company-badge"><CompanyLogo domain="capitalone.com" alt="Capital One" size={16} /> Capital One</span>
            <span className="company-badge"><CompanyLogo domain="umd.edu" alt="UMD" size={16} /> UMD '27</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Hero: React.FC<Props> = ({ name, title, github }) => {
  const containerRef = useRef<HTMLElement>(null);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const inView = useInView(heroRef, { once: true, amount: 0.1 });

  const handleSmoothScroll = (targetId: string) => {
    try {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (e) {
      console.warn('Smooth scroll failed:', e);
    }
  };

  return (
    <motion.section ref={containerRef} id="home" className="hero-netflix" style={{ opacity }}>
      {/* Parallax Background */}
      <motion.div className="hero-background" style={{ y: backgroundY }}>
        <div className="gradient-overlay"></div>
        <FloatingOrbs />
      </motion.div>

      {/* Main Hero Content */}
      <motion.div ref={heroRef} className="hero-content-netflix" style={{ y: contentY }}>
        <div className="container-netflix">
        <div className="hero-grid">
          {/* Left — Text */}
          <div className="hero-text-section">
            {/* Badge */}
            <motion.div
              className="hero-badge-chip"
              initial={{ opacity: 0, y: -10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="hero-badge-dot"></span>
              Distributed Systems · AI Infrastructure
            </motion.div>

            {/* Name */}
            <motion.div
              className="hero-name-container"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.6 }}
            >
              <h1 className="hero-name-netflix">
                <span className="greeting">Hi, I'm</span>
                <span className="name">{name}</span>
              </h1>
            </motion.div>

            {/* Specialization line */}
            <motion.div
              className="hero-specialization-line"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 1.0 }}
            >
              <div className="spec-rule"></div>
              <span className="spec-label">{title}</span>
            </motion.div>

            {/* Internship cards */}
            <motion.div
              className="hero-intern-grid"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 1.2 }}
            >
              <div className="hero-intern-card">
                <div className="hero-intern-header">
                  <CompanyLogo domain="microsoft.com" alt="Microsoft" size={20} />
                  <span className="hero-intern-company">Microsoft</span>
                  <span className="hero-intern-badge active">Active</span>
                </div>
                <div className="hero-intern-role">Software Engineering Intern</div>
                <div className="hero-intern-detail">Autonomous AI Diagnostics · Teams Meeting Copilot</div>
                <div className="hero-intern-meta">May – Aug 2026 · Mountain View, CA</div>
              </div>

              <div className="hero-intern-card">
                <div className="hero-intern-header">
                  <CompanyLogo domain="capitalone.com" alt="Capital One" size={20} />
                  <span className="hero-intern-company">Capital One</span>
                  <span className="hero-intern-badge past">2025</span>
                </div>
                <div className="hero-intern-role">Software Engineering Intern</div>
                <div className="hero-intern-detail">Serverless observability platform · 99.99% SLO</div>
                <div className="hero-intern-meta">Jun – Aug 2025 · McLean, VA</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="hero-actions-netflix"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 1.4 }}
            >
              <button
                onClick={() => handleSmoothScroll('projects')}
                className="hero-icon-btn"
                aria-label="View my work"
                title="View My Work"
              >
                {React.createElement(FaCode as any, { size: 20 })}
              </button>
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-icon-btn"
                aria-label="GitHub"
                title="GitHub"
              >
                {React.createElement(FaGithub as any, { size: 20 })}
              </a>
              <a
                href="mailto:arjunbojja1@gmail.com"
                className="hero-icon-btn"
                aria-label="Get in touch"
                title="Get in Touch"
              >
                {React.createElement(FaEnvelope as any, { size: 20 })}
              </a>
            </motion.div>
          </div>

          {/* Right — Profile Card */}
          <div className="hero-profile-section">
            <ProfileCard imageSrc="/headshot.png" name={name} />
          </div>
        </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
