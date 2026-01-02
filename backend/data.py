profile_data = {
    "name": "Arjun Bojja",
    "title": "Information Science Student & Software Engineering Intern",
    "location": "Herndon, VA", 
    "email": "arjunbojja1@gmail.com",
    "phone": "571-471-0563",
    "linkedin": "https://www.linkedin.com/in/arjun-bojja/",
    "github_user": "arjunbojja1",
    "about": {
        "passion": "Information Science student (4.0 GPA) with internship experience at Capital One building cloud-native, serverless systems using Python, AWS, and Docker. Skilled in backend development, algorithms, microservices architecture, and scalable application design.",
        "seeking": "Seeking software engineering and product management internship opportunities in cloud systems, backend development, and data-driven applications."
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
        "gpa": "4.00",
        "grad_year": 2027,
        "awards": ["Presidential Scholar", "Distinguished Dean's List (Fall 2024, Spring 2025)"],
        "coursework": ["Data Structures and Algorithms", "Database Design (MySQL)", "Object-Oriented Programming", "Machine Learning in Communication", "Statistics for Information Science (R)", "Information Organization", "Organizations, Management, and Teamwork", "Entrepreneurial Opportunity Analysis"]
    }
}

experience_data = [
    {
        "role": "Software Engineering Intern",
        "company": "Capital One",
        "duration": "June 2025 - August 2025",
        "location": "McLean, VA",
        "description": [
            "Engineered and deployed a serverless, cloud-native monitoring system using Python, AWS Lambda, ECS Fargate, and DynamoDB, improving API and service uptime by ~25% and reducing downtime risk by ~60% across mission-critical systems supporting 1,000+ employees.",
            "Architected Dockerized, event-driven microservices for automated health checks and failure recovery, reducing manual monitoring effort by ~45% and enabling near real-time issue detection.",
            "Built and integrated observability pipelines using New Relic, AWS CloudWatch, and custom telemetry agents, reducing mean time to detection (MTTD) by ~40% and accelerating incident response by ~35%.",
            "Collaborated with the Business Cards & Payments Tech team to deliver highly reliable systems meeting 99.99% uptime SLOs and internal compliance standards."
        ]
    },
    {
        "role": "Technical Director and Engineer",
        "company": "Roblox (Gochi)",
        "duration": "June 2024 - June 2025",
        "location": "Remote",
        "description": [
            "Designed and deployed a real-time multiplayer architecture using Node.js, Express, and Lua, integrating event-driven APIs, data persistence layers, and cloud-hosted analytics to support 2,500+ monthly active users with sub-150 ms average latency.",
            "Led a team of engineers to optimize concurrency and network throughput using the Knit framework (Roblox service-oriented architecture), implementing asynchronous task scheduling, caching layers, and fault-tolerant matchmaking systems that improved gameplay stability by ~35% and increased player retention by ~20%."
        ]
    },
    {
        "role": "Co-founder & President",
        "company": "Computer Science Honor Society",
        "duration": "September 2023 - June 2024",
        "location": "Herndon, VA",
        "description": [
            "Founded and scaled a Computer Science Honor Society chapter recognized by the national organization, growing to 70+ active members and mentoring 150+ students in Python, Java, and full-stack web development.",
            "Designed and launched an internal web portal using Flask, HTML/CSS, and SQLite to automate event registration, attendance analytics, and membership tracking, reducing administrative workload by ~70%.",
            "Increased student participation in advanced CS topics by ~40% by organizing an annual hackathon and leading algorithmic problem-solving workshops.",
            "Integrated Git/GitHub-based CI workflows and introduced AI/ML fundamentals into the club's curriculum to modernize project development and collaboration practices."
        ]
    }
]

projects_data = [
    {
        "title": "Niche - AI Event Discovery Platform",
        "github_link": "https://github.com/arjunbojja1/Niche",
        "technologies": ["Flask", "Node.js", "Express", "MongoDB", "React", "React Native", "JWT", "Jest", "PyTest", "PWA", "Geospatial Indexing"],
        "description": [
            "Built a full-stack web and iOS application using Flask, Node.js/Express, and MongoDB (geospatial indexing), including a collaborative-filtering recommendation engine and a custom 'Niche Score' algorithm to deliver personalized event recommendations.",
            "Developed React (web) and React Native (iOS) frontends with PWA support, JWT-based authentication, and performance optimizations such as lazy loading, caching, and database indexing, reducing average load time by ~1.5 seconds.",
            "Implemented automated testing using Jest and PyTest to improve reliability and maintainability across frontend and backend components."
        ],
        "challenge": "The primary technical challenge was developing an AI recommendation engine that accurately matches users with relevant niche events while balancing multiple factors like geographic proximity, interest alignment, and community connections. Implementing the proprietary Niche Score algorithm required careful optimization to process real-time data and provide personalized suggestions at scale."
    },
    {
        "title": "StudyBuddy Scheduler",
        "github_link": "https://github.com/arjunbojja1/studybuddy_scheduler",
        "technologies": ["Python", "ReactPy", "FastAPI", "PyTest", "Matplotlib", "ZenQuotes API", "CSV", "TXT"],
        "description": [
            "Engineered a full-stack scheduling platform using ReactPy and FastAPI, implementing multiple algorithmic scheduling strategies (priority queues, greedy heuristics) to optimize study sessions.",
            "Computed and visualized productivity metrics using Matplotlib, while optimizing backend response times and algorithm runtime to achieve ~35% faster schedule generation.",
            "Integrated the ZenQuotes API for dynamic motivational content, implemented schedule export (CSV/TXT), and ensured reliability through unit testing with PyTest, resulting in ~20% higher daily user engagement."
        ],
        "challenge": "The most interesting technical challenge was implementing multiple scheduling algorithms (priority queues, greedy heuristics) while maintaining an intuitive user interface and ensuring reliable data export functionality with optimized performance."
    },
    {
        "title": "Portfolio Website",
        "github_link": "https://github.com/arjunbojja1/portfolio",
        "external_link": "https://arjunbojja.dev",
        "technologies": ["React", "TypeScript", "Firebase Functions", "Python", "CSS3", "Firebase Hosting"],
        "description": [
            "Built a modern, responsive portfolio website using React and TypeScript with Firebase Functions backend for dynamic content management.",
            "Implemented advanced UI features including skeleton loading states, animated components, and glassmorphism design effects.",
            "Integrated real-time contact form with email notifications and comprehensive error handling for optimal user experience.",
            "Deployed using Firebase hosting with serverless functions for scalable, reliable performance."
        ],
        "challenge": "Created an engaging user experience with smooth animations and interactive elements while maintaining excellent performance and accessibility standards across all devices."
    }
]