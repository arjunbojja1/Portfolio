# Firebase Functions implementation of your portfolio API
import os
import json
import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from firebase_functions import https_fn, options
from firebase_admin import initialize_app

# Initialize Firebase Admin
initialize_app()

# Set global options for cost control and public access
options.set_global_options(max_instances=10)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Email configuration - using Firebase Functions config
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_USER = "arjunbojja1@gmail.com"  # Your email

def get_email_password():
    """Get email password from Firebase Functions config"""
    try:
        # Try to get from Firebase Functions config first
        from firebase_functions import params
        # Check if we can access the config
        import os
        config_password = os.environ.get("FIREBASE_CONFIG")
        if config_password:
            import json
            config = json.loads(config_password)
            if "email" in config and "password" in config["email"]:
                return config["email"]["password"]
        
        # Fallback to environment variable for local development
        return os.environ.get("EMAIL_PASSWORD", "qqbi luep kfoj jyyq")
    except Exception as e:
        logger.warning(f"Could not access Firebase config: {e}")
        # Direct fallback - use the password from Firebase config
        return "qqbi luep kfoj jyyq"

def send_email(name, email, message):
    """Send email notification for contact form submissions"""
    try:
        email_password = get_email_password()
        if not email_password:
            logger.warning("No email password configured")
            return False
            
        # Create message
        msg = MIMEMultipart()
        msg['From'] = EMAIL_USER
        msg['To'] = EMAIL_USER
        msg['Subject'] = f"Portfolio Contact Form - {name}"
        
        # Email body
        body = f"""
New contact form submission from your portfolio:

Name: {name}
Email: {email}
Message:
{message}

---
Sent from your portfolio website contact form
Reply to: {email}
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Connect to server and send email
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(EMAIL_USER, email_password)
        text = msg.as_string()
        server.sendmail(EMAIL_USER, EMAIL_USER, text)
        server.quit()
        
        logger.info(f"Email sent successfully for contact from {name}")
        return True
        
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return False

# Profile data (moved from data.py)
profile_data = {
    "name": "Arjun Bojja",
    "title": "Information Science Student & Software Engineering Intern",
    "location": "Herndon, VA", 
    "email": "arjunbojja1@gmail.com",
    "linkedin": "https://www.linkedin.com/in/arjun-bojja/",
    "github_user": "arjunbojja1",
    "about": {
        "passion": "Information Science student (4.0 GPA) with internship experience at Capital One building cloud-native systems using Python, AWS, and Docker. Skilled in backend development, algorithms, and scalable application design.",
        "seeking": "Seeking software engineering and product management internship opportunities in cloud systems, backend development, and data-driven applications."
    },
    "skills": {
        "Languages & Frameworks": ["Python", "Java", "JavaScript", "TypeScript", "MySQL", "React", "FastAPI", "Node.js", "Express", "REST APIs", "Serverless Framework", "R", "Lua"],
        "Tools & Libraries": ["AWS (Lambda, ECS, Fargate, CLI)", "Docker", "DigitalOcean", "Git/GitHub", "Visual Studio Code", "SQLite3", "PyTest", "Pandas", "NumPy", "Jupyter Notebooks", "TensorFlow", "PyTorch", "Matplotlib", "Uvicorn", "New Relic"]
    },
    "education": {
        "degree": "Bachelor of Science in Information Science",
        "university": "University of Maryland, College Park",
        "gpa": "4.0/4.0",
        "grad_year": 2027,
        "awards": ["Presidential Scholar", "Distinguished Dean's List (Fall 2024, Spring 2025)"],
        "coursework": ["Data Structures and Algorithms", "Database Design (MySQL)", "Machine Learning in Communication", "Statistics for Information Science (R)", "Object-Oriented Programming for Information Science", "Organizations, Management, and Teamwork", "Information Organization", "Entrepreneurial Opportunity Analysis"]
    }
}

experience_data = [
    {
        "role": "Software Engineering Intern",
        "company": "Capital One",
        "duration": "Jun 2025 - Aug 2025",
        "location": "McLean, VA",
        "description": [
            "Built and deployed a cloud-native monitoring tool (Python, AWS Lambda, ECS Fargate) that improved API/site uptime and reduced downtime risk, ensuring 24/7 uptime for internal business apps used by 500+ employees.",
            "Designed Dockerized, event-driven services for automated health checks, cutting manual monitoring time by ~40%.",
            "Integrated New Relic dashboards for telemetry and performance metrics, accelerating incident response time.",
            "Collaborated with a 6-person Business Cards & Payments Tech team to deliver production-ready systems."
        ]
    },
]

projects_data = [
    {
        "title": "Niche - AI Event Discovery Platform",
        "github_link": "https://github.com/arjunbojja1/Niche",
        "technologies": ["React", "Node.js", "Python", "MongoDB", "Flask", "Machine Learning", "JWT", "Material-UI", "Express", "BCrypt", "Mongoose", "TensorFlow"],
        "description": [
            "Built a full-stack AI-powered platform connecting people with niche community events through intelligent recommendations and matching algorithms.",
            "Developed proprietary 'Niche Score' algorithm evaluating events based on group size, category rarity, and community impact using Python and machine learning techniques.",
            "Implemented collaborative filtering and content-based recommendation systems analyzing user preferences, location proximity, and social network connections.",
            "Designed scalable MongoDB schema with GeoJSON support for location-based event discovery and optimized compound indexes for performance.",
            "Created responsive React frontend with Material-UI components, featuring real-time updates, interactive maps, and comprehensive analytics dashboards.",
            "Built secure authentication system with JWT tokens and BCrypt password hashing, ensuring data protection and user privacy."
        ],
        "challenge": "The primary technical challenge was developing an AI recommendation engine that accurately matches users with relevant niche events while balancing multiple factors like geographic proximity, interest alignment, and community connections. Implementing the proprietary Niche Score algorithm required careful optimization to process real-time data and provide personalized suggestions at scale."
    },
    {
        "title": "StudyBuddy Scheduler",
        "github_link": "https://github.com/arjunbojja1/studybuddy_scheduler",
        "technologies": ["Python", "ReactPy", "FastAPI", "PyTest", "Matplotlib", "ZenQuotes API", "CSV", "TXT"],
        "description": [
            "Developed a full-stack scheduling app (ReactPy, FastAPI) with multiple scheduling algorithms to optimize study time.",
            "Enhanced user engagement by integrating ZenQuotes API for daily motivational content.",
            "Added schedule export (CSV/TXT) and unit testing with PyTest for reliability.",
            "Visualized productivity insights using Matplotlib to help users track time allocation."
        ],
        "challenge": "The most interesting technical challenge was implementing multiple scheduling algorithms while maintaining an intuitive user interface and ensuring reliable data export functionality."
    },
    {
        "title": "Gochi (Roblox)",
        "external_link": "https://www.roblox.com/communities/5874921/goch",
        "technologies": ["Lua", "Node.js", "Express", "JavaScript", "Roblox Studio", "Analytics APIs", "Knit Framework"],
        "description": [
            "Launched a Roblox game that attracted 1,000+ active users in its first month.",
            "Directed a 5-person team to build a Node.js/Express backend integrated with Lua game logic and analytics APIs.",
            "Reduced in-game latency by 20% using the Knit framework, improving gameplay experience.",
            "Implemented queue/order management systems that boosted efficiency by 25%."
        ],
        "challenge": "As Technical Director & Programmer, the key challenge was coordinating backend systems with real-time game mechanics while managing a development team and ensuring optimal performance for 1,000+ concurrent users."
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

# Simplified CORS response function - no duplicate headers
def create_response(data, status_code=200):
    """Create a simple JSON response without setting CORS headers (handled by decorator)"""
    return https_fn.Response(
        json.dumps(data),
        status=status_code,
        headers={'Content-Type': 'application/json'}
    )

# Updated function decorators with proper CORS configuration
@https_fn.on_request(
    cors=options.CorsOptions(
        cors_origins=["*"],
        cors_methods=["GET", "POST", "OPTIONS"]
    ),
    memory=options.MemoryOption.MB_256,
    timeout_sec=60
)
def get_profile(req: https_fn.Request) -> https_fn.Response:
    """Get profile data"""
    try:
        logger.info("Profile data requested")
        return create_response(profile_data)
    except Exception as e:
        logger.error(f"Error fetching profile: {e}")
        return create_response({"error": "Failed to load profile data"}, 500)

@https_fn.on_request(
    cors=options.CorsOptions(
        cors_origins=["*"],
        cors_methods=["GET", "POST", "OPTIONS"]
    ),
    memory=options.MemoryOption.MB_256,
    timeout_sec=60
)
def get_experience(req: https_fn.Request) -> https_fn.Response:
    """Get experience data"""
    try:
        logger.info("Experience data requested")
        return create_response(experience_data)
    except Exception as e:
        logger.error(f"Error fetching experience: {e}")
        return create_response({"error": "Failed to load experience data"}, 500)

@https_fn.on_request(
    cors=options.CorsOptions(
        cors_origins=["*"],
        cors_methods=["GET", "POST", "OPTIONS"]
    ),
    memory=options.MemoryOption.MB_256,
    timeout_sec=60
)
def get_projects(req: https_fn.Request) -> https_fn.Response:
    """Get projects data"""
    try:
        logger.info("Projects data requested")
        return create_response(projects_data)
    except Exception as e:
        logger.error(f"Error fetching projects: {e}")
        return create_response({"error": "Failed to load projects data"}, 500)

@https_fn.on_request(
    cors=options.CorsOptions(
        cors_origins=["*"],
        cors_methods=["GET", "POST", "OPTIONS"]
    ),
    memory=options.MemoryOption.MB_256,
    timeout_sec=60
)
def health_check(req: https_fn.Request) -> https_fn.Response:
    """Health check endpoint"""
    try:
        health_data = {
            "status": "healthy",
            "timestamp": datetime.now().isoformat(),
            "data_counts": {
                "experience": len(experience_data),
                "projects": len(projects_data)
            },
            "email_configured": False
        }
        logger.info("Health check requested")
        return create_response(health_data)
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return create_response({"error": "Service unhealthy"}, 500)

@https_fn.on_request(
    cors=options.CorsOptions(
        cors_origins=["*"],
        cors_methods=["GET", "POST", "OPTIONS"]
    ),
    memory=options.MemoryOption.MB_256,
    timeout_sec=60
)
def contact_form(req: https_fn.Request) -> https_fn.Response:
    """Handle contact form submissions"""
    try:
        if req.method != 'POST':
            return create_response({"error": "Method not allowed"}, 405)
        
        # Parse request data
        request_json = req.get_json()
        if not request_json:
            return create_response({"error": "Invalid JSON data"}, 400)
        
        name = request_json.get('name', '').strip()
        email = request_json.get('email', '').strip()
        message = request_json.get('message', '').strip()
        
        if not all([name, email, message]):
            return create_response({"error": "Missing required fields"}, 400)
        
        # Basic email validation
        if '@' not in email or '.' not in email:
            return create_response({"error": "Invalid email format"}, 400)
        
        logger.info(f"Contact form submission from: {name} <{email}>")
        
        # Attempt to send email
        email_sent = send_email(name, email, message)
        
        if email_sent:
            return create_response({
                "message": "Thank you for your message! I'll get back to you within 24 hours."
            })
        else:
            # Log the message even if email fails
            logger.warning(f"Email failed but logging message from {name}: {message}")
            return create_response({
                "message": "Your message has been received! I'll get back to you soon."
            })
        
    except Exception as e:
        logger.error(f"Contact form error: {str(e)}")
        return create_response({"error": "An error occurred while sending your message. Please try again."}, 500)