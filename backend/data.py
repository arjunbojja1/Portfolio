profile_data = {
    "name": "Arjun Bojja",
    "title": "Backend Infrastructure Engineer · AI Infrastructure",
    "location": "Washington, D.C. Metro Area",
    "email": "arjunbojja1@gmail.com",
    "phone": "571-471-0563",
    "linkedin": "https://www.linkedin.com/in/arjun-bojja/",
    "github_user": "arjunbojja1",
    "about": {
        "passion": "Software Engineering Intern at Microsoft (Teams), building autonomous AI diagnostic infrastructure for Teams Meeting Copilot, including a Text-to-KQL translation layer powered by LLMs and deterministic safety rails for production database protection. Backend and distributed systems engineer focused on LLM-powered pipelines, event-driven architectures, observability, and low-latency systems. Previously at Capital One, built a distributed monitoring system on AWS (Lambda, ECS, DynamoDB) to automate health checks, improve telemetry, and accelerate incident response for production systems.",
        "seeking": "Seeking full-time roles in distributed systems, backend infrastructure, or AI systems engineering where I can ship reliable software, own operational excellence, and work at the intersection of systems and AI."
    },
    "skills": {
        "Languages": ["Python", "TypeScript", "JavaScript", "Java", "C#", "Lua", "R", "SQL", "KQL (Kusto)"],
        "Frameworks & APIs": ["FastAPI", "Flask", "Express.js", "React", "React Native", ".NET"],
        "Cloud & Infrastructure": ["AWS Lambda", "ECS Fargate", "DynamoDB", "CloudWatch", "Microsoft Azure", "Azure Data Explorer (ADX)", "Docker", "Serverless", "CI/CD (GitHub Actions)", "WebSockets"],
        "Distributed Systems": ["Real-time Systems", "Microservices", "Event-Driven Architecture", "Caching Strategies", "Low-Latency Design", "Async/Concurrency"],
        "AI & LLM": ["OpenAI API", "Claude API", "Prompt Engineering", "LLM Evaluation", "LLM Safety Rails"],
        "Data & Observability": ["MongoDB", "PostgreSQL", "SQLite", "New Relic", "Custom Telemetry", "Structured Logging"],
        "Testing & Other": ["PyTest", "Jest", "JWT Authentication", "AI/ML Fundamentals", "Data Structures & Algorithms"]
    },
    "education": {
        "degree": "Bachelor of Science in Information Science",
        "university": "University of Maryland, College Park",
        "gpa": "3.88",
        "grad_year": 2027,
        "awards": ["Presidential Scholar", "Dean's List (All Semesters)"],
        "coursework": ["Technologies, Infrastructure and Architecture", "Data Structures and Algorithms", "Data Science Techniques", "Database Design (MySQL)", "Object-Oriented Programming", "Machine Learning in Communication", "Statistics for Information Science (R)", "Information Organization", "Organizations, Management, and Teamwork", "Entrepreneurial Opportunity Analysis"]
    }
}

experience_data = [
    {
        "role": "Software Engineering Intern",
        "company": "Microsoft",
        "duration": "May 2026 - August 2026",
        "location": "Mountain View, CA",
        "metrics": ["<5 min incident resolution", "Text-to-KQL via LLM", "LLM Safety Rails", "Teams Meeting Copilot"],
        "description": [
            "Architected an end-to-end autonomous diagnostic pipeline to automate multi-service root-cause analysis for Microsoft Teams Meeting Copilot failures, reducing engineering live-site incident investigation times to under 5 minutes.",
            "Engineered a Text-to-KQL (Kusto Query Language) translation layer leveraging Large Language Models to map natural language developer queries directly to high-throughput log-store telemetry streams across core Teams Meetings experiences.",
            "Designed an adaptive React dashboard featuring an embedded AI chat assistant that automatically triages session failures, mapping real-time telemetry and user actions into sequential incident timelines.",
            "Implemented strict schema-mapping boundaries and deterministic safety rails within the LLM prompt layer to eliminate hallucinations and securely protect production database infrastructure."
        ]
    },
    {
        "role": "Software Engineering Intern",
        "company": "Capital One",
        "duration": "June 2025 - August 2025",
        "location": "McLean, VA",
        "metrics": ["~25% uptime improvement", "~60% downtime risk ↓", "99.99% SLO", "~40% MTTD ↓"],
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

projects_data = [
    {
        "title": "MealMatch",
        "github_link": "https://github.com/arjunbojja1/mealmatch",
        "demo_note": "Demo available on request.",
        "technologies": ["FastAPI", "SQLite", "Python", "Geospatial", "Write-Through Cache", "Telemetry"],
        "featured": True,
        "description": [
            "Architected a high-performance backend using FastAPI with a write-through caching strategy, utilizing in-memory dictionaries as a hot-path store to achieve <20ms average latency for active listing retrieval.",
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
        "featured": False,
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
        "featured": False,
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
        "featured": False,
        "description": [
            "Built a modern, responsive portfolio website using React and TypeScript with Firebase Functions backend for dynamic content management.",
            "Implemented advanced UI features including skeleton loading states, animated components, and a dark/light theme system with smooth transitions.",
            "Integrated a real-time contact form with email notifications and resilient error handling.",
            "Deployed using Firebase hosting with serverless functions for scalable, reliable performance."
        ]
    }
]
