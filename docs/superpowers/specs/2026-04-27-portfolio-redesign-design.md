# Portfolio Redesign — Design Spec
**Date:** 2026-04-27  
**Status:** Approved

---

## 1. Overview

Full redesign of the portfolio website covering two areas:

1. **Theme overhaul** — swap Apple-inspired blue/teal glass morphism for a Dark Mode Pro aesthetic (deep dark + purple/cyan) with a matching Cool White light mode
2. **Component restructure** — redesign skills display, projects layout, hero section, and navbar
3. **Content sync** — update all data to match the current resume, with emphasis on distributed systems and AI infrastructure

---

## 2. Design System

### Color Tokens (replacing current blue/teal tokens)

| Token | Old Value | New Value |
|-------|-----------|-----------|
| `--purple-500` (replaces `--sky-500`) | `#0071e3` | `#7c3aed` |
| `--cyan-400` (replaces `--mint-400`) | `#40c9a2` | `#22d3ee` |
| Dark bg | `#0b0f16` | `#080a0e` / `#0d1020` |
| Light bg | `#f7f8fb` / `#eef2f7` | `#f8f9ff` / `#eef0f8` |

### Dark Mode
- Background: `linear-gradient(135deg, #080a0e, #0d1020)`
- Surfaces: `rgba(255,255,255,0.03–0.05)` with `rgba(124,58,237,0.12–0.2)` borders
- Glow orbs: purple (`rgba(124,58,237,0.16)`) + cyan (`rgba(6,182,212,0.13)`)
- Text: `#f0f2f8` primary, `rgba(240,242,248,0.52)` secondary

### Light Mode
- Background: `linear-gradient(135deg, #f8f9ff, #eef0f8)` (cool white, slightly blue-tinted)
- Surfaces: `rgba(255,255,255,0.8–0.9)` with `rgba(124,58,237,0.1–0.18)` borders
- Same purple/cyan accent tokens as dark mode

### Gradient (used for text, borders, buttons, heading bars)
```css
linear-gradient(90deg, #7c3aed, #22d3ee)   /* or 135deg for buttons */
linear-gradient(90deg, #a78bfa, #22d3ee)   /* softer, for name text */
```

### Typography — no change
- Body: `Manrope`
- Display: `Space Grotesk`

---

## 3. Component Changes

### 3.1 Navbar — Fix Layout

**Current issue:** Theme toggle is mixed in with nav links.

**New layout:** Three-zone flex row:
- **Left:** `[AB]` brand logo (bracket in purple, initials gradient)
- **Center:** Nav links (About · Experience · Projects · Contact) as pill buttons
- **Right:** Theme toggle button (standalone, `☀ Light mode` / `🌙 Dark mode` label)

### 3.2 Hero Section — Redesign

**Keep:** Two-column grid layout (text left, profile card right).

**Text side changes:**
- Badge chip: "Distributed Systems · AI Infrastructure" (purple, pulsing dot)
- Name: `Hi, I'm` + `Arjun Bojja` on gradient (`#a78bfa → #22d3ee`)
- Specialization line: gradient rule + "Distributed Systems Engineer · AI Infrastructure"
- Subtitle: updated copy emphasizing real-time systems, Microsoft AI infra, Capital One
- **Replace stats bar** with two internship highlight cards:
  - Microsoft card: role, "Real-time distributed systems for Teams global infrastructure · Aligned with Teams/AI investments", date badge
  - Capital One card: role, key metrics (~25% uptime, ~60% downtime risk reduction, 99.99% SLO), date badge
- CTA buttons: "View My Work →" (gradient fill) + "Download Resume" (ghost)

**Profile card changes:**
- Rounded card with `rgba(255,255,255,0.04)` bg and `rgba(124,58,237,0.2)` border
- Profile frame: purple glow + cyan secondary glow, two decorative rings
- Card body: name, role, specialization line in purple, tech tags (purple + cyan variants), company chips (MS blue, C1 red, UMD)

### 3.3 Skills Section — Redesign

**Remove:** Terminal widget entirely.

**New:** 6-category pill grid (3 columns):

| Category | Skills |
|----------|--------|
| Languages | Python, TypeScript, JavaScript, Java, C#, Lua, R, SQL |
| Frameworks & APIs | FastAPI, Flask, Express, React, React Native, .NET |
| Cloud & Infra | AWS Lambda, ECS Fargate, DynamoDB, Azure, Docker, CI/CD, WebSockets |
| Distributed Systems | Real-time Systems, Microservices, Event-Driven, Caching, Low-Latency |
| Data & Observability | MongoDB, PostgreSQL, SQLite, New Relic, CloudWatch, Telemetry |
| Testing & Other | PyTest, Jest, JWT Auth, AI/ML, DSA |

Pills use purple variant (primary) and cyan variant (secondary) alternating by category.

Section heading uses gradient underline bar (`52px wide, 3px tall`).

### 3.4 Projects Section — Redesign

**Layout:** Featured card (top) + 3-column secondary grid (below).

**Featured card — MealMatch (NEW):**
- Full-width card with purple-tinted background
- "⭐ Featured · In Progress" badge
- Title, description, tech tags, metric pills (< 20ms latency, ~250 claims/sec, ~30% efficiency, 1,000+ pins)
- "● Active" status badge (green) top-right

**Secondary grid (3 cards):**
1. **Niche** — ML recommendation system, React + React Native, Flask + MongoDB
2. **StudyBuddy Scheduler** — priority queues + greedy algorithms, FastAPI + ReactPy
3. **Portfolio** — this site, React + TypeScript + Firebase

Each card: name, short description, tech tag pills (purple).

---

## 4. Content Changes (backend/data.py)

### 4.1 Profile
- `title`: `"Distributed Systems Engineer · AI Infrastructure"`
- `seeking`: update to reference distributed systems and AI infrastructure focus

### 4.2 Experience

**Microsoft** (add description):
```
Selected by Principal-level leadership to engineer mission-critical, low-latency signaling microservices for the Teams global infrastructure, aligned with Microsoft's Teams/AI investments in the Meeting space.
```

**Capital One** (sync to resume — 4 bullets):
1. Engineered a serverless monitoring system (AWS Lambda, ECS, DynamoDB), improving uptime by ~25% and reducing downtime risk by ~60% across mission-critical systems supporting 1,000+ employees.
2. Architected Dockerized, event-driven microservices for automated health checks and failure recovery, reducing manual monitoring effort by ~45% and enabling near real-time issue detection.
3. Built and integrated observability pipelines using New Relic, AWS CloudWatch, and custom telemetry agents, reducing MTTD by ~40% and accelerating incident response by ~35%.
4. Collaborated with the Business Cards & Payments Tech team to deliver highly reliable systems meeting 99.99% uptime SLOs and internal compliance standards.

**Gochi / Roblox** (sync to resume — 1 bullet, remove second bullet):
- Led development of a real-time multiplayer Roblox experience using Node.js, Lua, and service-oriented architecture supporting 2,500+ MAUs, improving stability by 35% and retention by 20%.

**Remove:** Computer Science Honor Society entry (not on resume).

### 4.3 Projects

**Add MealMatch** (April 2026 – Present):
- Architectured a high-performance backend using FastAPI with a write-through caching strategy, utilizing in-memory dictionaries as a hot-path store to achieve <20ms average latency for active listing retrieval.
- Engineered a geospatial "Smart Match" engine that ranks listings by proximity and urgency, integrating Google Geocoding and Haversine algorithms to optimize food distribution efficiency by ~30%.
- Developed a robust telemetry and observability framework, implementing automated error-logging pipelines for remote map diagnostics and a role-gated audit system to ensure data integrity across 1,000+ concurrent listing pins.
- Validated system throughput under simulated load, achieving ~250 claims per second while maintaining sub-second consistency between the in-memory state and the persistent SQLite layer.
- GitHub: https://github.com/arjunbojja1/mealmatch

**Update Niche** (September 2025 – Present):
- Dates: September 2025 – Present
- Bullets sync to resume (3 bullets as listed)

**Update StudyBuddy Scheduler** (January 2025 – June 2025):
- Dates: January 2025 – June 2025
- Sync all 3 bullet points to resume wording

### 4.4 Skills
Add to existing categories or update:
- Languages: add `C#`
- Cloud & Infra: add `Microsoft Azure`, `WebSockets`
- Data: add `PostgreSQL`
- Systems Design: add `Distributed Systems`, `Low-Latency`
- Testing: add `JWT Authentication`, `AI/ML Fundamentals`
- Frameworks: add `.NET`

---

## 5. CSS Token Updates

In `index.css` / `App.css`:
- Replace all `--sky-500` references with `--purple-500: #7c3aed` (dark) / `#7c3aed` (light, same)
- Replace all `--mint-400` references with `--cyan-400: #22d3ee`
- Update `--sky-400` → `--purple-400: #a78bfa`
- Update page background gradients for both light and dark modes
- Update glow orb colors from blue/teal to purple/cyan
- Update gradient text, heading bars, card borders, button gradients throughout

---

## 6. Files to Modify

| File | Change |
|------|--------|
| `backend/data.py` | Content updates (experience, projects, skills, title) |
| `functions/main.py` | Mirror data.py changes |
| `frontend/src/index.css` | Color token swap, new bg gradients |
| `frontend/src/App.css` | Gradient text, heading bars, card borders, glow colors |
| `frontend/src/App.tsx` | Internship highlight cards in hero, navbar layout fix |
| `frontend/src/components/About.tsx` | Remove terminal widget, new skills pill grid |
| `frontend/src/components/Experience.tsx` | Remove CSHP, update bullets |
| `frontend/src/components/Projects.tsx` | Featured card layout, add MealMatch |
| `frontend/src/components/Navbar.tsx` | Three-zone layout, fix theme toggle position |

---

## 7. Out of Scope
- Contact form functionality — no changes
- Backend API endpoints — no new routes needed
- Animation system — keep existing Framer Motion setup
- Mobile responsive breakpoints — preserve existing behavior
