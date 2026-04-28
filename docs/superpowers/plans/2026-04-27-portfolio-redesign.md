# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Retheme the portfolio from blue/teal glass morphism to Dark Mode Pro (purple/cyan) with Cool White light mode, restructure hero, skills, and projects sections, and sync all content to the current resume.

**Architecture:** All portfolio content is served from `backend/data.py` (mirrored in `functions/main.py`) via a FastAPI backend; the React/TypeScript frontend fetches it and renders through `Hero.tsx`, `About.tsx`, `Experience.tsx`, and `Projects.tsx`. We change CSS token *values* (not names) in `index.css` so that hundreds of existing `var(--sky-500)` and `var(--mint-400)` references in `App.css` pick up purple/cyan automatically. Component-level hardcoded `rgba(0,113,227,…)` values in `App.css` are updated individually.

**Tech Stack:** React 19 + TypeScript, Framer Motion, FastAPI, Firebase Functions (Python), CSS custom properties.

---

## File Map

| File | Change |
|------|--------|
| `backend/data.py` | Content: title, about, Microsoft bullet, CSHP removed, Capital One sync, MealMatch added, Niche/StudyBuddy dates+bullets, skills expanded |
| `functions/main.py` | Mirror exact `profile_data`, `experience_data`, `projects_data` from data.py |
| `frontend/src/index.css` | Swap token values: `--sky-500` → purple, `--sky-400` → purple-light, `--mint-400` → cyan; update page bg gradients and glow colors |
| `frontend/src/App.css` | Update hardcoded `rgba(0,113,227,…)` and `rgba(64,201,162,…)` to purple/cyan; update button gradient; orb glow colors; heading bar gradient |
| `frontend/src/components/Navbar.tsx` | Three-zone layout: brand \| centered nav links \| right-isolated theme toggle |
| `frontend/src/components/Hero.tsx` | Swap column order (text left, card right); add badge chip + specialization line; replace CinematicTypewriter with subtitle + internship cards; redesign HolographicProfile → ProfileCard |
| `frontend/src/components/About.tsx` | Remove ProfessionalTerminal; update intro card heading; replace skills grid with 6-category pill grid |
| `frontend/src/components/Experience.tsx` | Add Microsoft to companyIconMap; `focusText` update |
| `frontend/src/components/Projects.tsx` | Featured card layout (MealMatch pinned top); simplify filter bar |

---

## Task 1: Update Content Data — backend/data.py

**Files:**
- Modify: `backend/data.py`

- [ ] **Step 1: Replace profile_data**

Replace the entire `profile_data` dict in `backend/data.py` with:

```python
profile_data = {
    "name": "Arjun Bojja",
    "title": "Distributed Systems Engineer · AI Infrastructure",
    "location": "Washington, D.C. Metro Area",
    "email": "arjunbojja1@gmail.com",
    "phone": "571-471-0563",
    "linkedin": "https://www.linkedin.com/in/arjun-bojja/",
    "github_user": "arjunbojja1",
    "about": {
        "passion": "Software engineer focused on real-time distributed systems and AI infrastructure. I build low-latency, observable systems that scale — from serverless monitoring platforms to geospatial engines — and care deeply about reliability and measurable impact.",
        "seeking": "Seeking full-time roles in distributed systems, backend infrastructure, or AI systems engineering where I can ship reliable software, own operational excellence, and work at the intersection of systems and AI."
    },
    "skills": {
        "Languages": ["Python", "TypeScript", "JavaScript", "Java", "C#", "Lua", "R", "SQL"],
        "Frameworks & APIs": ["FastAPI", "Flask", "Express.js", "React", "React Native", ".NET"],
        "Cloud & Infrastructure": ["AWS Lambda", "ECS Fargate", "DynamoDB", "CloudWatch", "Microsoft Azure", "Docker", "Serverless", "CI/CD (GitHub Actions)", "WebSockets"],
        "Distributed Systems": ["Real-time Systems", "Microservices", "Event-Driven Architecture", "Caching Strategies", "Low-Latency Design", "Async/Concurrency"],
        "Data & Observability": ["MongoDB", "PostgreSQL", "SQLite", "New Relic", "CloudWatch", "Custom Telemetry", "Structured Logging"],
        "Testing & Other": ["PyTest", "Jest", "JWT Authentication", "AI/ML Fundamentals", "Data Structures & Algorithms"]
    },
    "education": {
        "degree": "Bachelor of Science in Information Science",
        "university": "University of Maryland, College Park",
        "gpa": "3.88",
        "grad_year": 2027,
        "awards": ["Presidential Scholar", "Dean's List (Fall 2024, Spring 2025, Fall 2025)"],
        "coursework": ["Technologies, Infrastructure and Architecture", "Data Structures and Algorithms", "Data Science Techniques", "Database Design (MySQL)", "Object-Oriented Programming", "Machine Learning in Communication", "Statistics for Information Science (R)", "Information Organization", "Organizations, Management, and Teamwork", "Entrepreneurial Opportunity Analysis"]
    }
}
```

- [ ] **Step 2: Replace experience_data**

Replace the entire `experience_data` list with:

```python
experience_data = [
    {
        "role": "Software Engineering Intern",
        "company": "Microsoft",
        "duration": "May 2026 - August 2026",
        "location": "Mountain View, CA",
        "description": [
            "Selected by Principal-level leadership to engineer mission-critical, low-latency signaling microservices for the Teams global infrastructure, contributing to Microsoft's Teams/AI investments in the Meeting space."
        ]
    },
    {
        "role": "Software Engineering Intern",
        "company": "Capital One",
        "duration": "June 2025 - August 2025",
        "location": "McLean, VA",
        "description": [
            "Engineered a serverless monitoring system (AWS Lambda, ECS, DynamoDB), improving uptime by ~25% and reducing downtime risk by ~60% across mission-critical systems supporting 1,000+ employees.",
            "Architected Dockerized, event-driven microservices for automated health checks and failure recovery, reducing manual monitoring effort by ~45% and enabling near real-time issue detection.",
            "Built and integrated observability pipelines using New Relic, AWS CloudWatch, and custom telemetry agents, reducing mean time to detection (MTTD) by ~40% and accelerating incident response by ~35%.",
            "Collaborated with the Business Cards & Payments Tech team to deliver highly reliable systems meeting 99.99% uptime SLOs and internal compliance standards."
        ]
    },
    {
        "role": "Technical Director and Backend Engineer",
        "company": "Roblox (Gochi)",
        "duration": "June 2024 - June 2025",
        "location": "Remote",
        "description": [
            "Led development of a real-time multiplayer Roblox experience using Node.js, Lua, and service-oriented architecture supporting 2,500+ MAUs, improving stability by 35% and retention by 20%."
        ]
    }
]
```

- [ ] **Step 3: Replace projects_data**

Replace the entire `projects_data` list with:

```python
projects_data = [
    {
        "title": "MealMatch",
        "github_link": "https://github.com/arjunbojja1/mealmatch",
        "demo_note": "Demo available on request.",
        "technologies": ["FastAPI", "SQLite", "Python", "Geospatial", "Write-Through Cache", "Telemetry"],
        "featured": True,
        "description": [
            "Architectured a high-performance backend using FastAPI with a write-through caching strategy, utilizing in-memory dictionaries as a hot-path store to achieve <20ms average latency for active listing retrieval.",
            "Engineered a geospatial \"Smart Match\" engine that ranks listings by proximity and urgency, integrating Google Geocoding and Haversine algorithms to optimize food distribution efficiency by ~30%.",
            "Developed a robust telemetry and observability framework, implementing automated error-logging pipelines for remote map diagnostics and a role-gated audit system to ensure data integrity across 1,000+ concurrent listing pins.",
            "Validated system throughput under simulated load, achieving ~250 claims per second while maintaining sub-second consistency between the in-memory state and the persistent SQLite layer."
        ],
        "metrics": ["<20ms latency", "~250 claims/sec", "~30% efficiency ↑", "1,000+ concurrent pins"]
    },
    {
        "title": "Niche",
        "github_link": "https://github.com/arjunbojja1/Niche",
        "demo_note": "Demo available on request.",
        "technologies": ["Flask", "Node.js", "Express", "MongoDB", "React", "React Native", "JWT", "Jest", "PyTest"],
        "description": [
            "Built a full-stack application featuring a machine learning-based recommendation system (collaborative filtering), improving recommendation relevance and increasing user engagement by ~25%.",
            "Developed React and React Native frontends with caching, lazy loading, and database indexing, reducing average load time by ~1.5 seconds (~30-40%).",
            "Designed backend services using Flask, Node.js, and MongoDB (geospatial indexing) to support low-latency, scalable recommendation queries."
        ],
        "duration": "September 2025 - Present"
    },
    {
        "title": "StudyBuddy Scheduler",
        "github_link": "https://github.com/arjunbojja1/studybuddy_scheduler",
        "demo_note": "Demo coming soon.",
        "technologies": ["Python", "ReactPy", "FastAPI", "PyTest", "Matplotlib", "ZenQuotes API"],
        "description": [
            "Engineered a full-stack scheduling platform using FastAPI and ReactPy, implementing priority queues and greedy algorithms to generate schedules ~35% faster.",
            "Optimized backend performance and data structures, reducing API response time by ~30% and improving system efficiency.",
            "Built data visualizations and integrated external APIs, contributing to ~20% increase in daily user engagement."
        ],
        "duration": "January 2025 - June 2025"
    },
    {
        "title": "Portfolio Website",
        "github_link": "https://github.com/arjunbojja1/portfolio",
        "demo": {
            "label": "Live Demo",
            "url": "https://arjun-bojja-portfolio.web.app"
        },
        "external_link": "https://arjun-bojja-portfolio.web.app",
        "technologies": ["React", "TypeScript", "Firebase Functions", "Python", "CSS3", "Firebase Hosting"],
        "description": [
            "Built a modern, responsive portfolio website using React and TypeScript with Firebase Functions backend for dynamic content management.",
            "Implemented advanced UI features including skeleton loading states, animated components, and a dark/light theme system with smooth transitions.",
            "Integrated a real-time contact form with email notifications and resilient error handling.",
            "Deployed using Firebase hosting with serverless functions for scalable, reliable performance."
        ]
    }
]
```

- [ ] **Step 4: Verify Python syntax**

```bash
cd /Users/arjunbojja/Documents/Portfolio
python3 -c "import backend.data; print('OK:', len(backend.data.experience_data), 'jobs,', len(backend.data.projects_data), 'projects')"
```

Expected output: `OK: 3 jobs, 4 projects`

- [ ] **Step 5: Commit**

```bash
git add backend/data.py
git commit -m "content: sync all portfolio data to current resume

Add MealMatch project, Microsoft description, remove CSHP,
update Niche/StudyBuddy dates, expand skills with C#/.NET/Azure/etc.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 2: Mirror Data to Firebase Functions

**Files:**
- Modify: `functions/main.py`

- [ ] **Step 1: Read functions/main.py to find profile_data, experience_data, projects_data**

Open `functions/main.py` and locate the three data dictionaries. They will be identical in structure to `backend/data.py`.

- [ ] **Step 2: Replace all three data dicts**

Copy the exact same `profile_data`, `experience_data`, and `projects_data` from Task 1 Steps 1–3 into `functions/main.py`, replacing the existing ones. The surrounding function code (Flask/Firebase endpoints) stays untouched.

- [ ] **Step 3: Verify Python syntax**

```bash
python3 -c "
import sys; sys.path.insert(0, 'functions')
import importlib.util
spec = importlib.util.spec_from_file_location('main', 'functions/main.py')
m = importlib.util.module_from_spec(spec)
print('functions/main.py syntax OK')
"
```

Expected: `functions/main.py syntax OK`

- [ ] **Step 4: Commit**

```bash
git add functions/main.py
git commit -m "content: mirror data updates to Firebase Functions

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 3: Color Token Swap — index.css

**Files:**
- Modify: `frontend/src/index.css`

- [ ] **Step 1: Update light mode color tokens**

In `:root { … }`, replace these lines:

```css
/* OLD */
--sky-500: #0071e3;
--sky-400: #2f8cff;
--mint-400: #40c9a2;
```

with:

```css
/* NEW */
--sky-500: #7c3aed;
--sky-400: #a78bfa;
--mint-400: #22d3ee;
```

- [ ] **Step 2: Update light mode accent and glass tokens**

In `:root { … }`, replace:

```css
--accent-color: var(--sky-500);
--accent-hover: #005bb5;
```

with:

```css
--accent-color: var(--sky-500);
--accent-hover: #6d28d9;
```

- [ ] **Step 3: Update light mode page background gradient**

In `:root { … }`, replace:

```css
--page-bg-light:
    radial-gradient(1200px circle at 10% -10%, rgba(0, 113, 227, 0.12), transparent 60%),
    radial-gradient(900px circle at 100% 20%, rgba(64, 201, 162, 0.15), transparent 60%),
    linear-gradient(180deg, #f7f8fb 0%, #eef2f7 50%, #f5f7fb 100%);
```

with:

```css
--page-bg-light:
    radial-gradient(1200px circle at 10% -10%, rgba(124, 58, 237, 0.08), transparent 60%),
    radial-gradient(900px circle at 100% 20%, rgba(34, 211, 238, 0.1), transparent 60%),
    linear-gradient(180deg, #f8f9ff 0%, #eef0f8 50%, #f5f7fd 100%);
```

- [ ] **Step 4: Update dark mode page background gradient**

In `:root { … }`, replace:

```css
--page-bg-dark:
    radial-gradient(1200px circle at 10% -10%, rgba(10, 132, 255, 0.12), transparent 60%),
    radial-gradient(900px circle at 100% 20%, rgba(56, 208, 161, 0.16), transparent 60%),
    linear-gradient(180deg, #0b0f16 0%, #0f141e 55%, #101826 100%);
```

with:

```css
--page-bg-dark:
    radial-gradient(1200px circle at 10% -10%, rgba(124, 58, 237, 0.14), transparent 60%),
    radial-gradient(900px circle at 100% 20%, rgba(34, 211, 238, 0.1), transparent 60%),
    linear-gradient(180deg, #080a0e 0%, #0d1020 55%, #0a0d18 100%);
```

- [ ] **Step 5: Update glow colors**

In `:root { … }`, replace:

```css
--glow-1: radial-gradient(circle, rgba(0, 113, 227, 0.18), transparent 70%);
--glow-2: radial-gradient(circle, rgba(64, 201, 162, 0.2), transparent 70%);
```

with:

```css
--glow-1: radial-gradient(circle, rgba(124, 58, 237, 0.18), transparent 70%);
--glow-2: radial-gradient(circle, rgba(34, 211, 238, 0.16), transparent 70%);
```

- [ ] **Step 6: Update dark mode color tokens**

In `:root[data-theme="dark"] { … }`, replace:

```css
--sky-500: #0a84ff;
--sky-400: #4c9eff;
--mint-400: #38d0a1;
```

with:

```css
--sky-500: #7c3aed;
--sky-400: #a78bfa;
--mint-400: #22d3ee;
```

- [ ] **Step 7: Commit**

```bash
git add frontend/src/index.css
git commit -m "style: swap color tokens to purple/cyan theme

Replace --sky-500 blue with #7c3aed purple, --mint-400 teal with
#22d3ee cyan across light and dark modes. Update page bg gradients.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 4: Update App.css Hardcoded Colors

**Files:**
- Modify: `frontend/src/App.css`

- [ ] **Step 1: Replace hardcoded blue rgba values throughout App.css**

Run this to count occurrences first:

```bash
grep -c "0, 113, 227" frontend/src/App.css
```

Then do a global find-and-replace: every instance of `rgba(0, 113, 227,` → `rgba(124, 58, 237,` and `rgba(64, 201, 162,` → `rgba(34, 211, 238,`.

Open `frontend/src/App.css` and use your editor's find-and-replace:
- Find: `rgba(0, 113, 227,` → Replace all with: `rgba(124, 58, 237,`
- Find: `rgba(64, 201, 162,` → Replace all with: `rgba(34, 211, 238,`
- Find: `rgba(10, 132, 255,` → Replace all with: `rgba(124, 58, 237,`
- Find: `rgba(56, 208, 161,` → Replace all with: `rgba(34, 211, 238,`

- [ ] **Step 2: Update the primary button gradient**

Find in App.css:

```css
.netflix-btn.primary,
.btn-netflix-primary {
  color: #fff;
  background: linear-gradient(180deg, #0a84ff, #0071e3);
  box-shadow: 0 12px 30px rgba(0, 113, 227, 0.25);
}
```

Replace with:

```css
.netflix-btn.primary,
.btn-netflix-primary {
  color: #fff;
  background: linear-gradient(135deg, #7c3aed, #06b6d4);
  box-shadow: 0 12px 30px rgba(124, 58, 237, 0.3);
}
```

- [ ] **Step 3: Update the mobile CTA button**

Find:

```css
.mobile-cta-btn {
  display: block;
  text-align: center;
  padding: 0.9rem 1rem;
  border-radius: 999px;
  background: linear-gradient(180deg, #0a84ff, #0071e3);
  color: #fff;
  font-weight: 600;
}
```

Replace with:

```css
.mobile-cta-btn {
  display: block;
  text-align: center;
  padding: 0.9rem 1rem;
  border-radius: 999px;
  background: linear-gradient(135deg, #7c3aed, #06b6d4);
  color: #fff;
  font-weight: 600;
}
```

- [ ] **Step 4: Update gradient-overlay in hero background**

Find:

```css
.gradient-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 20%, rgba(0, 113, 227, 0.18), transparent 50%),
    radial-gradient(circle at 80% 0%, rgba(64, 201, 162, 0.2), transparent 50%);
}
```

Replace with:

```css
.gradient-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 20%, rgba(124, 58, 237, 0.18), transparent 50%),
    radial-gradient(circle at 80% 0%, rgba(34, 211, 238, 0.15), transparent 50%);
}
```

- [ ] **Step 5: Update floating orb gradients**

Find:

```css
.floating-orb {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 113, 227, 0.25), transparent 70%);
  filter: blur(2px);
}

.orb-1 { width: 180px; height: 180px; top: 10%; left: 8%; }
.orb-2 { width: 120px; height: 120px; top: 35%; right: 12%; background: radial-gradient(circle, rgba(64, 201, 162, 0.25), transparent 70%); }
.orb-3 { width: 220px; height: 220px; bottom: 15%; left: 20%; }
.orb-4 { width: 140px; height: 140px; bottom: 10%; right: 20%; background: radial-gradient(circle, rgba(0, 113, 227, 0.18), transparent 70%); }
.orb-5 { width: 90px; height: 90px; top: 20%; right: 40%; }
.orb-6 { width: 160px; height: 160px; bottom: 30%; left: 55%; background: radial-gradient(circle, rgba(64, 201, 162, 0.2), transparent 70%); }
```

Replace with:

```css
.floating-orb {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.22), transparent 70%);
  filter: blur(2px);
}

.orb-1 { width: 180px; height: 180px; top: 10%; left: 8%; }
.orb-2 { width: 120px; height: 120px; top: 35%; right: 12%; background: radial-gradient(circle, rgba(34, 211, 238, 0.2), transparent 70%); }
.orb-3 { width: 220px; height: 220px; bottom: 15%; left: 20%; }
.orb-4 { width: 140px; height: 140px; bottom: 10%; right: 20%; background: radial-gradient(circle, rgba(124, 58, 237, 0.15), transparent 70%); }
.orb-5 { width: 90px; height: 90px; top: 20%; right: 40%; }
.orb-6 { width: 160px; height: 160px; bottom: 30%; left: 55%; background: radial-gradient(circle, rgba(34, 211, 238, 0.18), transparent 70%); }
```

- [ ] **Step 6: Update profile particle color**

Find:

```css
.profile-particle {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(0, 113, 227, 0.4);
  box-shadow: 0 0 6px rgba(0, 113, 227, 0.3);
}
```

Replace with:

```css
.profile-particle {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(124, 58, 237, 0.4);
  box-shadow: 0 0 6px rgba(124, 58, 237, 0.3);
}
```

- [ ] **Step 7: Update intro-label in About**

Find:

```css
.intro-label {
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  background: rgba(0, 113, 227, 0.1);
  color: var(--sky-500);
```

Replace with:

```css
.intro-label {
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  background: rgba(124, 58, 237, 0.1);
  color: var(--sky-500);
```

- [ ] **Step 8: Verify build compiles**

```bash
cd /Users/arjunbojja/Documents/Portfolio/frontend
npm run build 2>&1 | tail -20
```

Expected: build succeeds (may have warnings, no errors).

- [ ] **Step 9: Commit**

```bash
git add frontend/src/App.css
git commit -m "style: update hardcoded color values to purple/cyan

Replace all rgba(0,113,227) blue → rgba(124,58,237) purple and
rgba(64,201,162) teal → rgba(34,211,238) cyan in App.css.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 5: Fix Navbar Layout — Navbar.tsx + App.css

**Files:**
- Modify: `frontend/src/components/Navbar.tsx`
- Modify: `frontend/src/App.css`

- [ ] **Step 1: Restructure Navbar JSX to three-zone layout**

In `Navbar.tsx`, replace the desktop navigation section (lines 82–121):

```tsx
return (
    <nav className={`navbar-simple ${scrolled ? 'scrolled' : ''}`}>
      {/* Brand Logo */}
      <a
        href="#home"
        className="nav-brand"
        onClick={(e) => handleNavClick('home', e)}
      >
        <div className="brand-logo">
          <span className="brand-bracket">{'<'}</span>
          <span className="brand-initials">AB</span>
          <span className="brand-bracket">{' />'}</span>
        </div>
      </a>

      {/* Desktop Navigation — center */}
      <ul className="nav-links nav-links-center">
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => handleNavClick(item.id, e)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>

      {/* Right zone: theme toggle + mobile menu button */}
      <div className="nav-right">
        <button
          className="theme-toggle"
          onClick={(event) => onToggleTheme(event)}
          aria-label={`Switch to ${nextTheme} mode`}
          aria-pressed={theme === 'dark'}
        >
          <span className="theme-toggle-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
          <span className="theme-toggle-text">{theme === 'light' ? 'Dark' : 'Light'}</span>
        </button>

        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu" onClick={() => setIsMenuOpen(false)}>
          <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <span className="mobile-brand">Portfolio</span>
              <button
                className="theme-toggle mobile"
                onClick={(event) => onToggleTheme(event)}
                aria-label={`Switch to ${nextTheme} mode`}
                aria-pressed={theme === 'dark'}
              >
                <span className="theme-toggle-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
              </button>
              <button className="close-btn" onClick={() => setIsMenuOpen(false)}>✕</button>
            </div>

            <ul className="mobile-nav-links">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(item.id, e)}
                  >
                    <span className="mobile-nav-icon">{item.icon}</span>
                    <span className="mobile-nav-text">{item.label}</span>
                    <span className="mobile-nav-arrow">→</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mobile-cta">
              <a
                href="#contact"
                className="mobile-cta-btn"
                onClick={(e) => handleNavClick('contact', e)}
              >
                Let's Work Together
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Progress Indicator */}
      <div className={`scroll-progress ${scrolled ? 'visible' : ''}`}></div>
    </nav>
  );
```

- [ ] **Step 2: Update navbar CSS for three-zone layout**

In `App.css`, replace the `.navbar-simple` rule and add `.nav-links-center` and `.nav-right`:

```css
.navbar-simple {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2.5rem;
  background: var(--surface-nav);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-soft);
  transition: all 0.3s ease;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1rem;
}

.navbar-simple.scrolled {
  background: var(--surface-nav-scrolled);
  padding: 0.8rem 2.5rem;
}

.nav-links-center {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.25rem;
  justify-content: center;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-content: flex-end;
}
```

Also remove the old `.nav-desktop` and `.nav-links` rules (or keep `.nav-links` only for mobile if reused there — search the file for `.nav-desktop` and delete that block).

- [ ] **Step 3: Verify visually**

Start the dev server and check the navbar:

```bash
cd /Users/arjunbojja/Documents/Portfolio
docker-compose up -d  # or: cd frontend && npm start
```

Open http://localhost:3000. Confirm:
- Brand `< AB />` on the far left
- Nav links (About, Experience, Projects, Contact) centered
- Theme toggle button isolated on the far right
- Mobile: hamburger visible when viewport < 1024px

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/Navbar.tsx frontend/src/App.css
git commit -m "fix: navbar three-zone layout — isolate theme toggle to right

Brand left | nav links centered | theme toggle right using CSS grid.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 6: Redesign Hero Section — Hero.tsx + App.css

**Files:**
- Modify: `frontend/src/components/Hero.tsx`
- Modify: `frontend/src/App.css`

- [ ] **Step 1: Replace HolographicProfile with ProfileCard**

In `Hero.tsx`, remove the entire `HolographicProfile` component (lines 103–183) and replace with:

```tsx
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
          {/* Floating particles */}
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
            {['Python', 'Distributed Systems', 'AWS', 'Real-time', 'TypeScript'].map((tag, i) => (
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
```

- [ ] **Step 2: Replace the Hero main render**

Replace the entire `Hero` function body (lines 186–364) with:

```tsx
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
                      {char === ' ' ? ' ' : char}
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
              Building real-time, low-latency systems at scale. Incoming at Microsoft on Teams AI infrastructure — previously engineered serverless observability platforms at Capital One.
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
              <button onClick={() => handleSmoothScroll('contact')} className="netflix-btn secondary">
                <span className="btn-icon">✉</span>
                Get In Touch
                <div className="btn-shimmer"></div>
              </button>
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
```

- [ ] **Step 3: Add hero CSS to App.css**

Add these new rules at the end of `App.css` (before the `@media` blocks or after — just before responsive):

```css
/* ── Hero — new styles ── */
.hero-grid {
  grid-template-columns: 1fr 340px;
}

.hero-badge-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.38rem 1rem;
  border-radius: 999px;
  background: rgba(124, 58, 237, 0.15);
  border: 1px solid rgba(124, 58, 237, 0.35);
  color: var(--sky-400);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  width: fit-content;
  margin-bottom: 0.5rem;
}

.hero-badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--sky-400);
  box-shadow: 0 0 8px var(--sky-400);
  flex-shrink: 0;
}

.hero-specialization-line {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--ink-600);
}

.spec-rule {
  width: 28px;
  height: 2px;
  border-radius: 2px;
  background: linear-gradient(90deg, var(--sky-500), var(--mint-400));
  flex-shrink: 0;
}

.spec-label {
  color: var(--ink-600);
}

.hero-subtitle {
  color: var(--ink-500);
  font-size: 0.97rem;
  max-width: 500px;
  line-height: 1.7;
  margin: 0;
}

.hero-internship-cards {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: 0.4rem;
}

.intern-card {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.8rem 1rem;
  border-radius: 12px;
  background: var(--surface-2);
  border: 1px solid var(--border-subtle);
  transition: border-color 0.2s ease;
}

.intern-card:hover {
  border-color: rgba(124, 58, 237, 0.25);
}

.intern-logo {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.02em;
}

.intern-ms {
  background: rgba(0, 120, 212, 0.15);
  border: 1px solid rgba(0, 120, 212, 0.28);
  color: #60a5fa;
}

.intern-c1 {
  background: rgba(204, 0, 0, 0.12);
  border: 1px solid rgba(204, 0, 0, 0.22);
  color: #f87171;
}

.intern-body {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.intern-role {
  font-size: 0.83rem;
  font-weight: 700;
  color: var(--ink-800);
}

.intern-detail {
  font-size: 0.75rem;
  color: var(--ink-500);
  line-height: 1.5;
}

.intern-badge {
  display: inline-block;
  margin-top: 0.3rem;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  font-size: 0.67rem;
  font-weight: 700;
  background: rgba(124, 58, 237, 0.12);
  border: 1px solid rgba(124, 58, 237, 0.28);
  color: var(--sky-400);
}

.intern-badge.cyan {
  background: rgba(34, 211, 238, 0.1);
  border-color: rgba(34, 211, 238, 0.25);
  color: var(--mint-400);
}

/* Profile Card */
.profile-card-new {
  width: min(300px, 80vw);
}

.profile-card-inner {
  border-radius: 24px;
  background: var(--surface-1);
  border: 1px solid rgba(124, 58, 237, 0.2);
  backdrop-filter: blur(16px);
  overflow: hidden;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.25), 0 0 40px rgba(124, 58, 237, 0.07);
  transition: background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
}

.profile-photo-frame {
  height: 260px;
  background: rgba(124, 58, 237, 0.07);
  border-bottom: 1px solid rgba(124, 58, 237, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.profile-glow-primary {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 75%, rgba(124, 58, 237, 0.25), transparent 60%);
}

.profile-glow-secondary {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 60% 20%, rgba(34, 211, 238, 0.1), transparent 50%);
}

.profile-ring-outer {
  position: absolute;
  inset: 18px;
  border-radius: 50%;
  border: 1px solid rgba(124, 58, 237, 0.15);
}

.profile-ring-inner {
  position: absolute;
  inset: 5px;
  border-radius: 50%;
  border: 1px dashed rgba(34, 211, 238, 0.08);
}

.profile-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  z-index: 1;
}

.profile-card-body {
  padding: 1.1rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.profile-card-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--ink-900);
}

.profile-card-spec {
  font-size: 0.74rem;
  color: var(--sky-500);
  font-weight: 600;
}

.profile-card-tags {
  display: flex;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.profile-card-tag {
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 600;
  background: rgba(124, 58, 237, 0.12);
  border: 1px solid rgba(124, 58, 237, 0.25);
  color: var(--sky-400);
}

.profile-card-tag.cyan {
  background: rgba(34, 211, 238, 0.1);
  border-color: rgba(34, 211, 238, 0.22);
  color: var(--mint-400);
}

.profile-card-companies {
  display: flex;
  gap: 0.4rem;
  align-items: center;
  flex-wrap: wrap;
  padding-top: 0.6rem;
  border-top: 1px solid var(--border-subtle);
}

.company-badge {
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.company-badge.ms {
  background: rgba(0, 120, 212, 0.12);
  border: 1px solid rgba(0, 120, 212, 0.22);
  color: #60a5fa;
}

.company-badge.c1 {
  background: rgba(204, 0, 0, 0.1);
  border: 1px solid rgba(204, 0, 0, 0.18);
  color: #f87171;
}

.company-badge.umd {
  background: rgba(224, 0, 0, 0.08);
  border: 1px solid rgba(224, 0, 0, 0.14);
  color: #fca5a5;
}
```

- [ ] **Step 4: Update responsive breakpoint for new hero grid**

Find in App.css (inside `@media (max-width: 1024px)`):

```css
.hero-grid {
  grid-template-columns: 1fr;
}
```

Update to also reverse order so text appears above photo on mobile:

```css
.hero-grid {
  grid-template-columns: 1fr;
}

.hero-profile-section {
  order: -1;
}
```

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/Hero.tsx frontend/src/App.css
git commit -m "feat: redesign hero with badge chip, specialization line, internship cards

Replace HolographicProfile with ProfileCard (purple glow treatment).
Text moves left, card moves right. Add Distributed Systems badge,
MS/Capital One internship highlight cards.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 7: Redesign Skills Section — About.tsx + App.css

**Files:**
- Modify: `frontend/src/components/About.tsx`
- Modify: `frontend/src/App.css`

- [ ] **Step 1: Remove ProfessionalTerminal and rewrite About.tsx**

Replace the entire contents of `About.tsx` with:

```tsx
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Education {
  degree: string;
  university: string;
  gpa: string;
  grad_year: number;
  awards: string[];
  coursework: string[];
}

interface Props {
  passion: string;
  seeking: string;
  location: string;
  skills: { [key: string]: string[] };
  education: Education;
}

const SKILL_CATEGORY_VARIANTS: Record<string, 'purple' | 'cyan'> = {
  'Languages': 'purple',
  'Frameworks & APIs': 'cyan',
  'Cloud & Infrastructure': 'purple',
  'Distributed Systems': 'cyan',
  'Data & Observability': 'purple',
  'Testing & Other': 'cyan',
};

const About: React.FC<Props> = ({ passion, seeking, location, skills, education }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="about" className="section-netflix">
      <div className="container-netflix">
        <motion.h2
          className="heading-netflix"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          About Me
        </motion.h2>

        <div ref={ref} className="about-content-enhanced">
          {/* Intro card */}
          <motion.div
            className="professional-intro"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="intro-card">
              <h3>Distributed Systems Engineer · AI Infrastructure</h3>
              <p className="passion-statement">{passion}</p>
              <p className="seeking-statement">{seeking}</p>
              <div className="location-badge">
                <span className="location-icon">📍</span>
                <span>{location}</span>
              </div>
            </div>
          </motion.div>

          {/* Skills pill grid */}
          {skills && Object.keys(skills).length > 0 && (
            <motion.div
              className="skills-pill-grid-section"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="skills-pill-grid">
                {Object.entries(skills).map(([category, skillList], catIdx) => {
                  const variant = SKILL_CATEGORY_VARIANTS[category] ?? (catIdx % 2 === 0 ? 'purple' : 'cyan');
                  return (
                    <motion.div
                      key={category}
                      className="skill-pill-category"
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.4 + catIdx * 0.08 }}
                    >
                      <div className={`skill-cat-label-new ${variant}`}>{category}</div>
                      <div className="skill-pills-row">
                        {skillList.map((skill, i) => (
                          <motion.span
                            key={`${category}-${i}`}
                            className={`skill-pill-new ${variant}`}
                            whileHover={{ scale: 1.05, y: -2 }}
                            transition={{ duration: 0.2 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Education & original skills grid */}
          <div className="education-skills-grid">
            <motion.div
              className="education-section"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="education-header">
                <h3>Education</h3>
                <div className="education-icon">🎓</div>
              </div>
              <div className="education-content">
                <div className="degree-info">
                  <h4>{education.degree}</h4>
                  <p className="university">{education.university}</p>
                  <div className="education-metrics">
                    <span className="grad-badge">Class of {education.grad_year}</span>
                  </div>
                </div>
                {education.awards && education.awards.length > 0 && (
                  <div className="education-group">
                    <h4>🏆 Academic Recognition</h4>
                    <div className="education-tags">
                      {education.awards.map((award, i) => (
                        <span key={i} className="education-tag award-tag">{award}</span>
                      ))}
                      <span className="education-tag award-tag">{education.gpa} GPA</span>
                    </div>
                  </div>
                )}
                {education.coursework && education.coursework.length > 0 && (
                  <div className="education-group">
                    <h4>📚 Relevant Coursework</h4>
                    <div className="education-tags">
                      {education.coursework.map((course, i) => (
                        <span key={i} className="education-tag course-tag">{course}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Placeholder for second column — keep grid balanced */}
            <motion.div
              className="skills-section"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="skills-header">
                <h3>Specializations</h3>
                <div className="skills-icon">⚡</div>
              </div>
              <div className="skills-grid-enhanced">
                {[
                  { label: 'Real-time Distributed Systems', desc: 'Low-latency signaling, event-driven architecture, service-oriented design' },
                  { label: 'AI Infrastructure', desc: 'Systems that support AI/ML workloads at scale — Microsoft Teams AI investments' },
                  { label: 'Cloud Observability', desc: 'New Relic, CloudWatch, custom telemetry, MTTD reduction, 99.99% SLO delivery' },
                  { label: 'Backend Engineering', desc: 'FastAPI, Flask, Express, serverless platforms, geospatial engines' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="skill-category-enhanced"
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
                  >
                    <h4>{item.label}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--ink-500)', margin: 0 }}>{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
```

- [ ] **Step 2: Add skills pill grid CSS to App.css**

Add before the `/* Responsive */` section in `App.css`:

```css
/* ── Skills pill grid ── */
.skills-pill-grid-section {
  width: 100%;
}

.skills-pill-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.skill-pill-category {
  padding: 1.2rem;
  border-radius: 16px;
  background: var(--surface-1);
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-card);
  transition: background 0.4s ease, border-color 0.4s ease;
}

.skill-cat-label-new {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.skill-cat-label-new.purple { color: var(--sky-500); }
.skill-cat-label-new.cyan { color: var(--mint-400); }

.skill-pills-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.skill-pill-new {
  padding: 0.22rem 0.65rem;
  border-radius: 999px;
  font-size: 0.73rem;
  font-weight: 600;
  cursor: default;
}

.skill-pill-new.purple {
  background: rgba(124, 58, 237, 0.1);
  border: 1px solid rgba(124, 58, 237, 0.22);
  color: var(--sky-400);
}

.skill-pill-new.cyan {
  background: rgba(34, 211, 238, 0.08);
  border: 1px solid rgba(34, 211, 238, 0.2);
  color: var(--mint-400);
}

@media (max-width: 1024px) {
  .skills-pill-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .skills-pill-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/About.tsx frontend/src/App.css
git commit -m "feat: replace terminal widget with 6-category skills pill grid

Remove ProfessionalTerminal, add pill grid with purple/cyan variants
per category. Add specializations column replacing the old skills list.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 8: Experience Cleanup — Experience.tsx

**Files:**
- Modify: `frontend/src/components/Experience.tsx`

- [ ] **Step 1: Add Microsoft to companyIconMap**

In `Experience.tsx`, find the `companyIconMap` (around line 129):

```tsx
const companyIconMap: Record<string, string> = {
  'Capital One': '🏦',
  'Roblox (Gochi)': '🕹️',
  'Computer Science Honor Society': '💻'
};
```

Replace with:

```tsx
const companyIconMap: Record<string, string> = {
  'Microsoft': '🖥️',
  'Capital One': '🏦',
  'Roblox (Gochi)': '🕹️',
};
```

- [ ] **Step 2: Update focusText for Microsoft**

Find (around line 137):

```tsx
const focusText = isCurrentRole
  ? 'Current focus: leadership, problem-solving, and innovation.'
  : 'Focus areas: leadership, problem-solving, and innovation.';
```

Replace with:

```tsx
const focusText = isCurrentRole
  ? 'Current focus: real-time distributed systems, AI infrastructure, and low-latency design.'
  : 'Focus areas: reliability engineering, observability, and scalable backend systems.';
```

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/Experience.tsx
git commit -m "fix: add Microsoft to companyIconMap, update focusText copy

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 9: Projects Featured Layout — Projects.tsx + App.css

**Files:**
- Modify: `frontend/src/components/Projects.tsx`
- Modify: `frontend/src/App.css`

- [ ] **Step 1: Update ProjectData interface to support featured/metrics**

In `Projects.tsx`, update the interface at the top:

```tsx
interface ProjectData {
  title: string;
  github_link?: string;
  external_link?: string;
  demo?: { label: string; url: string };
  demo_media?: { type: 'image' | 'video'; url: string; alt?: string };
  demo_note?: string;
  description: string[];
  challenge?: string;
  technologies?: string[];
  featured?: boolean;
  metrics?: string[];
  duration?: string;
}
```

- [ ] **Step 2: Add FeaturedProjectCard component**

Add this component before `ProjectCard` in `Projects.tsx`:

```tsx
const FeaturedProjectCard: React.FC<{ project: ProjectData }> = ({ project }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="featured-project-card card-netflix"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      <div className="featured-project-inner">
        <div className="featured-project-left">
          <div className="featured-badge-new">
            <span>⭐ Featured · In Progress</span>
          </div>
          <h3 className="featured-project-title">{project.title}</h3>
          {project.duration && (
            <div className="featured-duration">{project.duration}</div>
          )}
          <p className="featured-project-desc">{project.description[0]}</p>

          {project.technologies && (
            <div className="featured-tech-tags">
              {project.technologies.map((tech, i) => (
                <span key={i} className="featured-tech-tag">{tech}</span>
              ))}
            </div>
          )}

          {project.metrics && (
            <div className="featured-metrics-row">
              {project.metrics.map((m, i) => (
                <span key={i} className="featured-metric-pill">{m}</span>
              ))}
            </div>
          )}

          <div className="featured-project-footer">
            {project.github_link && (
              <a
                href={project.github_link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-netflix btn-netflix-secondary"
              >
                <span className="btn-icon">📁</span>
                Source Code
                <div className="btn-shimmer"></div>
              </a>
            )}
            <span className="featured-active-badge">● Active</span>
          </div>
        </div>

        <div className="featured-project-right">
          <h4 style={{ marginBottom: '0.8rem', fontSize: '0.9rem', color: 'var(--ink-600)' }}>
            📋 All Highlights
          </h4>
          <ul className="featured-desc-list">
            {project.description.map((point, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -15 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              >
                {point}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};
```

- [ ] **Step 3: Replace the Projects render function**

Replace the `Projects` function body (the `return` block starting at line 292) with:

```tsx
  const featuredProject = data.find(p => p.featured);
  const otherProjects = data.filter(p => !p.featured);

  if (loading && data.length === 0) {
    return (
      <section id="projects" className="section-netflix">
        <div className="container-netflix">
          <h2 className="heading-netflix">Featured Projects</h2>
          <div className="project-grid-enhanced">
            {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>
      </section>
    );
  }

  if (!loading && data.length === 0) {
    return (
      <section id="projects" className="section-netflix">
        <div className="container-netflix">
          <h2 className="heading-netflix">Featured Projects</h2>
          <ErrorFallback error="No projects found." onRetry={onRefresh || (() => {})} />
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section-netflix">
      <div className="container-netflix">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-netflix">Projects</h2>

          {/* Featured project */}
          {featuredProject && <FeaturedProjectCard project={featuredProject} />}

          {/* Secondary grid */}
          {otherProjects.length > 0 && (
            <motion.div
              className="project-grid-enhanced"
              style={{ marginTop: '1.5rem' }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {otherProjects.map((project, index) => (
                <ProjectCard key={index} project={project} index={index} />
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
```

Also remove the unused `filter`, `allTechs`, `portfolioStats`, and `filteredProjects` variables since the filter bar is gone. Remove the `useState` for filter. The `const [filter, setFilter] = useState<string>('all');` line and all references to it can be deleted.

- [ ] **Step 4: Add featured project CSS to App.css**

Add before the `/* Responsive */` section:

```css
/* ── Featured Project Card ── */
.featured-project-card {
  margin-bottom: 1.5rem;
  padding: 2rem;
}

.featured-project-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  align-items: start;
}

.featured-badge-new {
  display: inline-flex;
  align-items: center;
  padding: 0.22rem 0.7rem;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(34, 211, 238, 0.15));
  border: 1px solid rgba(124, 58, 237, 0.3);
  color: var(--sky-400);
  margin-bottom: 0.8rem;
  width: fit-content;
}

.featured-project-title {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0 0 0.3rem;
  color: var(--ink-900);
}

.featured-duration {
  font-size: 0.8rem;
  color: var(--ink-400);
  margin-bottom: 0.8rem;
}

.featured-project-desc {
  color: var(--ink-500);
  font-size: 0.92rem;
  line-height: 1.65;
  margin-bottom: 1rem;
}

.featured-tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.featured-tech-tag {
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  background: var(--surface-3);
  border: 1px solid var(--border-subtle);
  color: var(--ink-600);
}

.featured-metrics-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.2rem;
}

.featured-metric-pill {
  padding: 0.22rem 0.65rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  background: rgba(34, 211, 238, 0.1);
  border: 1px solid rgba(34, 211, 238, 0.25);
  color: var(--mint-400);
}

.featured-project-footer {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.featured-active-badge {
  font-size: 0.75rem;
  font-weight: 700;
  color: #86efac;
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(34, 197, 94, 0.25);
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
}

.featured-desc-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.featured-desc-list li {
  position: relative;
  padding-left: 1.2rem;
  color: var(--ink-500);
  font-size: 0.88rem;
  line-height: 1.6;
}

.featured-desc-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55rem;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(124, 58, 237, 0.6);
}

@media (max-width: 768px) {
  .featured-project-inner {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/Projects.tsx frontend/src/App.css
git commit -m "feat: featured project layout — MealMatch pinned, secondary grid below

Add FeaturedProjectCard for featured:true projects. Remove filter bar.
Add metrics pills, active badge, two-column layout for featured card.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 10: Update NetflixParticles Color in App.tsx

**Files:**
- Modify: `frontend/src/App.tsx`

- [ ] **Step 1: Update particle color**

In `App.tsx`, find the `NetflixParticles` component (around line 250):

```tsx
style={{
  background: `radial-gradient(circle, ${
    Math.random() > 0.5 ? 'rgba(0, 113, 227, 0.35)' : 'rgba(64, 201, 162, 0.35)'
  } 0%, transparent 70%)`
}}
```

Replace with:

```tsx
style={{
  background: `radial-gradient(circle, ${
    Math.random() > 0.5 ? 'rgba(124, 58, 237, 0.3)' : 'rgba(34, 211, 238, 0.25)'
  } 0%, transparent 70%)`
}}
```

Also find `NetflixCodeRain` (around line 295):

```tsx
color: Math.random() > 0.7 ? 'rgba(0, 113, 227, 0.35)' : 'rgba(15, 23, 42, 0.25)'
```

Replace with:

```tsx
color: Math.random() > 0.7 ? 'rgba(124, 58, 237, 0.3)' : 'rgba(15, 23, 42, 0.2)'
```

- [ ] **Step 2: Commit**

```bash
git add frontend/src/App.tsx
git commit -m "style: update particle and code rain colors to purple/cyan

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 11: End-to-End Verification

- [ ] **Step 1: Clear localStorage cache and start dev server**

```bash
cd /Users/arjunbojja/Documents/Portfolio
docker-compose up
```

Or if running separately:

```bash
cd backend && uvicorn main:app --reload &
cd frontend && npm start
```

- [ ] **Step 2: Clear portfolio cache in browser**

Open DevTools → Application → Local Storage → delete `portfolio_data` and `portfolio_data_time`.

Reload the page.

- [ ] **Step 3: Verify checklist**

Check each item in the browser:

- [ ] Page loads without console errors
- [ ] Dark mode default: deep dark background with purple glow orbs
- [ ] Light mode toggle: cool white background, purple/cyan accents unchanged
- [ ] Navbar: brand left, links centered, toggle isolated right — no layout overlap
- [ ] Hero badge chip shows "Distributed Systems · AI Infrastructure"
- [ ] Hero name gradient is purple → cyan (not blue)
- [ ] Internship cards show Microsoft (Teams AI, May 2026) and Capital One (metrics)
- [ ] Profile card shows purple glow, Distributed Systems spec, company badges
- [ ] About skills section shows 6-category pill grid (no terminal widget)
- [ ] Experience shows 3 entries: Microsoft, Capital One, Roblox — no CSHP
- [ ] Microsoft description mentions "Teams global infrastructure" and "Teams/AI investments"
- [ ] Projects: MealMatch featured card with metrics (<20ms, ~250 claims/sec) at top
- [ ] Projects: Niche, StudyBuddy, Portfolio in secondary grid below
- [ ] All buttons use purple → cyan gradient (not blue)
- [ ] Floating orbs are purple/cyan (not blue/teal)

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: portfolio redesign complete

Dark Mode Pro + Cool White theme, purple/cyan accent system, hero
internship cards, skills pill grid, featured MealMatch project.
All content synced to current resume.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```
