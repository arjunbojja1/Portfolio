profile_data = {
    "name": "Arjun Bojja",
    "title": "Backend & Cloud Infrastructure Engineer",
    "location": "Washington, D.C. Metro Area", 
    "email": "arjunbojja1@gmail.com",
    "phone": "571-471-0563",
    "linkedin": "https://www.linkedin.com/in/arjun-bojja/",
    "github_user": "arjunbojja1",
    "about": {
        "passion": "Backend engineer passionate about designing reliable, observable systems that scale. I love turning operational chaos into measured, automated reliability—building the infrastructure that teams depend on.",
        "seeking": "Seeking opportunities in Backend Engineering, SRE, or Cloud Infrastructure where I can ship reliable systems, own operational excellence, and drive measurable reliability improvements."
    },
    "skills": {
        "Backend & APIs": ["Python", "JavaScript/Node.js", "TypeScript", "FastAPI", "Express.js", "RESTful APIs"],
        "Cloud & Infrastructure": ["AWS (Lambda, ECS Fargate, DynamoDB, CloudWatch)", "Docker", "Docker Compose", "Serverless Architecture", "CI/CD (GitHub Actions)"],
        "Observability & Reliability": ["New Relic", "CloudWatch", "Custom Telemetry", "Structured Logging", "Health Checks", "Incident Response"],
        "Data & Persistence": ["SQL", "MongoDB", "DynamoDB", "Event-Driven Systems", "Caching Patterns"],
        "Systems Design": ["Microservices", "EventEmitters", "Async/Concurrency", "Rate Limiting", "Load Balancing"],
        "Testing & Quality": ["PyTest", "Jest", "Unit Testing", "Integration Testing"],
        "Other Languages": ["Java", "Lua", "R", "SQL"]
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

experience_data = [
    {
        "role": "Software Engineering Intern",
        "company": "Microsoft",
        "duration": "May 2026 - August 2026",
        "location": "Mountain View, CA",
        "description": [
            "Incoming Software Engineering Intern for Summer 2026 in Mountain View, CA."
        ]
        },
    {
        "role": "Software Engineering Intern",
        "company": "Capital One",
        "duration": "June 2025 - August 2025",
        "location": "McLean, VA",
        "description": [
            "Owned full-stack development of a serverless health monitoring platform (Python, AWS Lambda, ECS Fargate, DynamoDB) that reduced system downtime risk by ~60% across mission-critical systems supporting 1,000+ employees.",
            "Designed event-driven health checks with configurable recovery workflows, cutting manual monitoring overhead by ~45% while improving alert precision and on-call response time by ~35%.",
            "Built and integrated observability pipelines using New Relic, AWS CloudWatch, and custom telemetry agents, reducing mean time to detection (MTTD) by ~40% and accelerating incident response by ~35%.",
            "Collaborated with Business Cards & Payments team to align reliability engineering work with 99.99% uptime SLOs and compliance requirements, establishing metrics that drove infrastructure investment decisions."
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
    },
    {
        "role": "Co-founder & Technical Lead",
        "company": "Computer Science Honor Society",
        "duration": "September 2023 - June 2024",
        "location": "Herndon, VA",
        "description": [
            "Founded and scaled CS Honor Society chapter, growing to 70+ active members while maintaining operational infrastructure for member communications and event tracking.",
            "Built internal portal (Flask, SQLite, HTML/CSS) automating member registration, attendance tracking, and analytics—reduced administrative overhead by ~70% and created measurable engagement metrics.",
            "Increased student participation in advanced CS topics by ~40% by organizing an annual hackathon and leading algorithmic problem-solving workshops."
        ]
    }
]

projects_data = [
    {
        "title": "Niche - AI Event Discovery Platform",
        "github_link": "https://github.com/arjunbojja1/Niche",
        "demo_note": "Demo available on request.",
        "technologies": ["Flask", "Node.js", "Express", "MongoDB", "React", "React Native", "JWT", "Jest", "PyTest", "PWA", "Geospatial Indexing"],
        "description": [
            "Built a full-stack web and iOS application using Flask, Node.js/Express, and MongoDB (geospatial indexing) with a collaborative-filtering engine and a custom \"Niche Score\" for personalized event recommendations.",
            "Designed the discovery flow to surface near-me events fast, adding PWA support and JWT auth; performance work (lazy loading, caching, indexing) reduced average load time by ~1.5 seconds.",
            "Implemented automated tests with Jest and PyTest to keep recommendation logic and API responses stable as features shipped.",
            "Highlights: geospatial search, explainable scoring, and a mobile-first UX built for quick browsing."
        ],
        "challenge": "The primary technical challenge was developing an AI recommendation engine that accurately matches users with relevant niche events while balancing multiple factors like geographic proximity, interest alignment, and community connections. Implementing the proprietary Niche Score algorithm required careful optimization to process real-time data and provide personalized suggestions at scale."
    },
    {
        "title": "StudyBuddy Scheduler",
        "github_link": "https://github.com/arjunbojja1/studybuddy_scheduler",
        "demo_note": "Demo coming soon.",
        "technologies": ["Python", "ReactPy", "FastAPI", "PyTest", "Matplotlib", "ZenQuotes API", "CSV", "TXT"],
        "description": [
            "Engineered a full-stack scheduling platform using ReactPy and FastAPI with multiple algorithmic strategies (priority queues, greedy heuristics) to optimize study sessions.",
            "Visualized productivity metrics with Matplotlib and optimized algorithm runtime to achieve ~35% faster schedule generation.",
            "Integrated ZenQuotes API, built CSV/TXT export, and used PyTest for reliability, contributing to ~20% higher daily user engagement.",
            "Highlights: algorithm trade-offs, explainable schedules, and a lightweight UI built for quick rescheduling."
        ],
        "challenge": "The most interesting technical challenge was implementing multiple scheduling algorithms (priority queues, greedy heuristics) while maintaining an intuitive user interface and ensuring reliable data export functionality with optimized performance."
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
            "Implemented advanced UI features including skeleton loading states, animated components, and a theme system with smooth transitions.",
            "Integrated a real-time contact form with email notifications and resilient error handling.",
            "Deployed using Firebase hosting with serverless functions for scalable, reliable performance."
        ],
        "challenge": "Created an engaging user experience with smooth animations and interactive elements while maintaining excellent performance and accessibility standards across all devices."
    }
]
