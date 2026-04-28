import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

interface Props {
  name: string;
  title: string;
}

// Floating Orbs Component
const FloatingOrbs: React.FC = () => {
  return (
    <div className="floating-orbs-container">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={`floating-orb orb-${i + 1}`}
          initial={{
            scale: 0,
            opacity: 0,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
          }}
          animate={{
            scale: [0, 1, 0.8, 1],
            opacity: [0, 0.6, 0.8, 0.6],
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight
            ]
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
        />
      ))}
    </div>
  );
};

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
          <div className="profile-card-spec">Distributed Systems · AI Infrastructure</div>
          <div className="profile-card-tags">
            {['Python', 'Distributed Systems', 'AWS', 'AI Infrastructure', 'FastAPI'].map((tag, i) => (
              <span key={i} className={`profile-card-tag ${i % 2 === 1 ? 'cyan' : ''}`}>{tag}</span>
            ))}
          </div>
          <div className="profile-card-companies">
            <span className="company-badge ms">Microsoft</span>
            <span className="company-badge c1">Capital One</span>
            <span className="company-badge umd">UMD '27</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Hero: React.FC<Props> = ({ name, title }) => {
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

      {/* Matrix Rain */}
      <div className="matrix-rain">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="matrix-column"
            style={{ left: `${(i / 50) * 100}%` }}
            initial={{ y: -100 }}
            animate={{ y: window.innerHeight + 100 }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 5, ease: 'linear' }}
          >
            {Math.random().toString(36).substr(2, 1)}
          </motion.div>
        ))}
      </div>

      {/* Main Hero Content */}
      <motion.div ref={heroRef} className="hero-content-netflix" style={{ y: contentY }}>
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
                <span className="name">
                  {name.split('').map((char, index) => (
                    <motion.span
                      key={index}
                      className="name-char"
                      initial={{ opacity: 0, y: 40 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.06, ease: 'easeOut' }}
                    >
                      {char === ' ' ? ' ' : char}
                    </motion.span>
                  ))}
                </span>
              </h1>
            </motion.div>

            {/* Specialization line */}
            <motion.div
              className="hero-specialization-line"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 1.2 }}
            >
              <div className="spec-rule"></div>
              <span className="spec-label">{title}</span>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              Distributed Systems Engineer focused on AI infrastructure. Incoming at Microsoft engineering real-time systems for Teams AI — previously built serverless observability platforms at Capital One.
            </motion.p>

            {/* Internship highlights */}
            <motion.div
              className="hero-internship-cards"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 1.6 }}
            >
              <div className="intern-card">
                <div className="intern-logo intern-ms">MS</div>
                <div className="intern-body">
                  <div className="intern-role">Microsoft — Software Engineering Intern</div>
                  <div className="intern-detail">Real-time distributed systems for Teams global infrastructure · Teams/AI investments</div>
                  <span className="intern-badge">May 2026 · Mountain View, CA</span>
                </div>
              </div>
              <div className="intern-card">
                <div className="intern-logo intern-c1">C1</div>
                <div className="intern-body">
                  <div className="intern-role">Capital One — Software Engineering Intern</div>
                  <div className="intern-detail">Serverless monitoring platform · ~25% uptime ↑ · ~60% downtime risk ↓ · 99.99% SLO</div>
                  <span className="intern-badge cyan">June–Aug 2025 · McLean, VA</span>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="hero-actions-netflix"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 1.9 }}
            >
              <button onClick={() => handleSmoothScroll('projects')} className="netflix-btn primary">
                <span className="btn-icon">▶</span>
                View My Work
                <div className="btn-glow"></div>
              </button>
              <a
                href="/Arjun_Bojja_Resume.pdf"
                download
                className="netflix-btn secondary"
              >
                <span className="btn-icon">↓</span>
                Download Resume
                <div className="btn-shimmer"></div>
              </a>
            </motion.div>
          </div>

          {/* Right — Profile Card */}
          <div className="hero-profile-section">
            <ProfileCard imageSrc="/headshot.png" name={name} />
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
