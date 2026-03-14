profile_data = {
    "name": "Arjun Bojja",
    "title": "Information Science Student & Software Engineering Intern",
    "location": "Washington, D.C. Metro Area", 
    "email": "arjunbojja1@gmail.com",
    "phone": "571-471-0563",
    "linkedin": "https://www.linkedin.com/in/arjun-bojja/",
    "github_user": "arjunbojja1",
    "about": {
        "passion": "Information Science student with internship experience building cloud-native systems in Python and AWS. I enjoy turning messy operational problems into reliable, measurable services and clear developer experiences.",
        "seeking": "Open to software engineering internships where I can ship real features, learn fast, and contribute to products people rely on."
    },
    "skills": {
        "Languages": ["Python", "Java", "JavaScript", "TypeScript", "Lua", "R", "SQL"],
        "Frameworks": ["Flask", "FastAPI", "Express", "React", "React Native"],
        "Cloud & DevOps": ["AWS (Lambda, ECS Fargate, DynamoDB, CloudWatch)", "Docker", "Serverless", "CI/CD (GitHub Actions)"],
        "Databases & Architecture": ["MongoDB", "SQL", "Event-Driven Systems", "Microservices", "Caching"],
        "Testing & Observability": ["PyTest", "Jest", "New Relic"],
        "Other": ["Data Structures & Algorithms", "JWT Authentication", "AI/ML Fundamentals"]
    },
    "education": {
        "degree": "Bachelor of Science in Information Science",
        "university": "University of Maryland, College Park",
        "gpa": "3.88",
        "grad_year": 2027,
        "awards": ["Presidential Scholar", "Distinguished Dean's List (Fall 2024, Spring 2025)"],
        "coursework": ["Data Structures and Algorithms", "Database Design (MySQL)", "Object-Oriented Programming", "Machine Learning in Communication", "Statistics for Information Science (R)", "Information Organization", "Organizations, Management, and Teamwork", "Entrepreneurial Opportunity Analysis"]
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
            "Built a serverless monitoring platform (Python, AWS Lambda, ECS Fargate, DynamoDB) to make system health visible and actionable, improving API and service uptime by ~25% and reducing downtime risk by ~60% across mission-critical systems supporting 1,000+ employees.",
            "Designed event-driven health checks and recovery workflows, cutting manual monitoring effort by ~45% while improving signal quality for on-call response.",
            "Implemented observability dashboards and alerting pipelines (New Relic, CloudWatch, custom telemetry), reducing mean time to detection (MTTD) by ~40% and accelerating incident response by ~35%.",
            "Partnered with the Business Cards & Payments Tech team to align reliability work with compliance standards and 99.99% uptime SLOs."
        ]
    },
    {
        "role": "Technical Director and Engineer",
        "company": "Roblox (Gochi)",
        "duration": "June 2024 - June 2025",
        "location": "Remote",
        "description": [
            "Designed and deployed a real-time multiplayer architecture (Node.js, Express, Lua) with event-driven APIs, persistence, and analytics to support 2,500+ monthly active users at sub-150 ms average latency.",
            "Led a small engineering team to improve concurrency and network throughput with the Knit framework, delivering ~35% higher gameplay stability and ~20% increased player retention.",
            "Shipped live-ops features and performance fixes based on analytics insights, translating player feedback into measurable engagement gains."
        ]
    },
    {
        "role": "Co-founder & President",
        "company": "Computer Science Honor Society",
        "duration": "September 2023 - June 2024",
        "location": "Herndon, VA",
        "description": [
            "Founded and scaled a CS Honor Society chapter recognized by the national organization, growing to 70+ active members and mentoring 150+ students in Python, Java, and full-stack web development.",
            "Built an internal portal (Flask, HTML/CSS, SQLite) for event registration, attendance analytics, and membership tracking, reducing administrative workload by ~70%.",
            "Increased participation in advanced CS topics by ~40% through a student-led hackathon and recurring algorithm workshops.",
            "Introduced Git/GitHub workflows and AI/ML fundamentals to modernize project collaboration and curriculum design."
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
