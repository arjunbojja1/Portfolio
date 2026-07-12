# Arjun Bojja | Engineering Portfolio

A full-stack portfolio for sharing my software engineering experience, projects, and technical interests. I built it as a React and TypeScript application backed by Python APIs, then deployed it with Firebase Hosting and Firebase Functions.

**Live site:** [arjun-bojja-portfolio.web.app](https://arjun-bojja-portfolio.web.app)

![Portfolio home page showing Arjun's engineering experience and technical focus](docs/screenshots/portfolio-home.png)

## What I built

- A responsive React interface with animated sections for experience, projects, education, and skills
- Python APIs that keep portfolio content separate from the presentation layer
- A contact workflow that validates submissions and sends email notifications through SMTP
- Five-minute client-side caching to reduce repeated API requests while keeping content current
- Light and dark themes persisted across visits with browser storage
- Loading states, error boundaries, and retry paths for a more resilient user experience
- Firebase and Docker deployment options for both serverless and container-based hosting

## Engineering highlights

### Full-stack architecture

The frontend requests profile, experience, and project data from a Python API instead of hard-coding the content into components. This keeps the site easy to update and lets the same data model work with the local FastAPI service and deployed Firebase Functions.

### Production-minded frontend

The TypeScript client uses reusable components, local caching, explicit loading and error states, responsive layouts, and motion-based transitions. Project cards support source links, live demos, technology tags, and media.

### Deployment flexibility

Firebase Hosting serves the production frontend while Python Firebase Functions expose the content and contact endpoints. The repository also includes Nginx, Docker, and Docker Compose configuration for a containerized deployment path.

## Architecture

```text
Browser
  |
  v
React + TypeScript frontend
  |
  +--> Profile, experience, and project APIs
  +--> Contact form API
          |
          v
Python FastAPI locally or Firebase Functions in production
```

## Technology stack

| Area | Technologies |
| --- | --- |
| Frontend | React 19, TypeScript, Axios, Framer Motion, CSS |
| Backend | Python, FastAPI, Firebase Functions |
| Hosting | Firebase Hosting, Nginx |
| Infrastructure | Docker, Docker Compose |
| Testing | React Testing Library, Jest |

## API surface

| Endpoint | Purpose |
| --- | --- |
| `GET /api/profile` | Returns profile, skills, education, and social links |
| `GET /api/experience` | Returns professional experience |
| `GET /api/projects` | Returns project details and links |
| `POST /api/contact` | Validates and sends a contact submission |
| `GET /api/health` | Reports API health and configuration status |

The deployed Firebase Functions provide equivalent profile, experience, project, contact, and health handlers.

## Run locally

### Prerequisites

- Node.js 18 or newer
- Python 3.10 or newer

### Start the API

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

### Start the frontend

In a second terminal:

```bash
cd frontend
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Build and test

```bash
npm run build
npm test -- --watchAll=false
```

Firebase deployment commands are available from the repository root:

```bash
npm run firebase:deploy
npm run firebase:deploy:functions
npm run firebase:deploy:hosting
```

## Repository layout

```text
frontend/    React and TypeScript application
backend/     FastAPI service for local development
functions/   Python Firebase Functions
docs/        Project documentation and screenshots
scripts/     Deployment and maintenance scripts
```
