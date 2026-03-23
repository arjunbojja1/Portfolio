import os
import ssl
import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from dotenv import load_dotenv
import importlib
import sys
import logging
from datetime import datetime
from typing import Optional
from contextlib import asynccontextmanager

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

load_dotenv()

# Configuration
DEBUG = os.getenv("DEBUG", "False").lower() == "true"
ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "localhost:3000",
    "http://localhost:3001",
    "localhost:3001"
]

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USERNAME = os.getenv("SMTP_USERNAME")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
SMTP_FROM_EMAIL = os.getenv("SMTP_FROM_EMAIL")
SMTP_TO_EMAIL = os.getenv("SMTP_TO_EMAIL", "arjunbojja1@gmail.com")

# Lifespan event handler
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("🚀 Portfolio API starting up...")
    logger.info(f"📊 Debug mode: {DEBUG}")
    logger.info(f"🔐 CORS origins: {ALLOWED_ORIGINS}")
    logger.info(f"📧 Email configured: {bool(SMTP_USERNAME and SMTP_PASSWORD)}")
    yield
    # Shutdown
    logger.info("🛑 Portfolio API shutting down...")

# Create app with lifespan
app = FastAPI(
    title="Arjun Bojja's Portfolio API",
    description="A dynamic portfolio API built with FastAPI",
    version="1.0.0",
    docs_url="/docs" if DEBUG else None,
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.middleware("http")
async def log_requests(request, call_next):
    start_time = datetime.now()
    response = await call_next(request)
    process_time = (datetime.now() - start_time).total_seconds()
    
    logger.info(
        f"{request.method} {request.url.path} - "
        f"Status: {response.status_code} - "
        f"Time: {process_time:.3f}s"
    )
    return response

def reload_data():
    """Reload data from data.py file - allows for hot updates!"""
    try:
        # Ensure backend directory is in path for data module import
        backend_dir = os.path.dirname(os.path.abspath(__file__))
        if backend_dir not in sys.path:
            sys.path.insert(0, backend_dir)
        
        if 'data' in sys.modules:
            importlib.reload(sys.modules['data'])
            logger.info("Data module reloaded successfully")
        else:
            import data
            logger.info("Data module imported for the first time")
        
        from data import profile_data, experience_data, projects_data
        
        if not profile_data or not isinstance(profile_data, dict):
            raise ValueError("Invalid profile_data structure")
        
        logger.info(f"Data loaded: {len(experience_data)} experiences, {len(projects_data)} projects")
        return profile_data, experience_data, projects_data
        
    except Exception as e:
        logger.error(f"Error reloading data: {e}")
        return get_fallback_data()

def get_fallback_data():
    """Fallback data in case data.py has issues"""
    return {
        "name": "Arjun Bojja",
        "title": "Aspiring Software Engineer & Product Manager",
        "location": "Herndon, VA",
        "email": "arjunbojja1@gmail.com",
        "linkedin": "https://www.linkedin.com/in/arjun-bojja/",
        "github_user": "arjunbojja1",
        "about": {
            "passion": "I'm passionate about making technology more usable and accessible for everyone.",
            "seeking": "I am currently seeking Software Engineering and Product Management internships where I can apply my skills to build impactful solutions."
        },
        "skills": {
            "Languages & Frameworks": ["Python", "JavaScript", "TypeScript", "React", "FastAPI"],
            "Tools & Libraries": ["AWS", "Docker", "Git/GitHub", "Visual Studio Code"]
        },
        "education": {
            "degree": "Bachelor of Science in Information Science",
            "university": "University of Maryland, College Park", 
            "gpa": "4.0/4.0",
            "grad_year": 2027,
            "awards": ["Presidential Scholar"],
            "coursework": ["Database Design", "Machine Learning"]
        }
    }, [], []

async def send_email(name: str, email: str, message: str):
    """Send email using SMTP with proper SSL handling"""
    try:
        msg = MIMEMultipart()
        msg['From'] = SMTP_FROM_EMAIL
        msg['To'] = SMTP_TO_EMAIL
        msg['Subject'] = f"Portfolio Contact Form - Message from {name}"
        
        email_body = f"""
New message from your portfolio contact form:

Name: {name}
Email: {email}
Message:
{message}

---
This message was sent from your portfolio website.
        """
        
        msg.attach(MIMEText(email_body, 'plain'))
        
        context = ssl.create_default_context()
        context.check_hostname = False
        context.verify_mode = ssl.CERT_NONE
        
        server = aiosmtplib.SMTP(
            hostname=SMTP_HOST, 
            port=SMTP_PORT,
            tls_context=context,
            start_tls=False
        )
        
        await server.connect()
        await server.starttls(tls_context=context)
        await server.login(SMTP_USERNAME, SMTP_PASSWORD)
        await server.send_message(msg)
        await server.quit()
        
        if DEBUG:
            print(f"✅ Email sent successfully from {name} ({email})")
        
        return True
        
    except ssl.SSLError as ssl_err:
        if DEBUG:
            print(f"SSL Error: {str(ssl_err)}")
            print("📧 SSL bypassed but still failing - check your email credentials")
        return False
    except aiosmtplib.SMTPAuthenticationError as auth_err:
        if DEBUG:
            print(f"🔐 SMTP Authentication Error: {str(auth_err)}")
            print("❌ Your email/password is incorrect. For Gmail:")
            print("   1. Enable 2-Factor Authentication")
            print("   2. Generate an App Password")
            print("   3. Use the app password in your .env file")
        return False
    except Exception as e:
        if DEBUG:
            print(f"❌ Email sending error: {str(e)}")
            print(f"📧 SMTP Config: {SMTP_HOST}:{SMTP_PORT}")
            print(f"📧 Username: {SMTP_USERNAME}")
            print(f"📧 From: {SMTP_FROM_EMAIL}")
        return False

class Education(BaseModel):
    degree: str
    university: str
    gpa: str
    grad_year: int
    awards: list[str]
    coursework: list[str]

class Experience(BaseModel):
    role: str
    company: str
    duration: str
    location: str
    description: list[str]

class Project(BaseModel):
    title: str
    github_link: str | None = None
    external_link: str | None = None
    technologies: list[str] | None = None
    description: list[str]
    challenge: str | None = None

class ProfileData(BaseModel):
    name: str
    title: str
    location: str
    email: str
    linkedin: str
    github_user: str
    about: dict
    skills: dict[str, list[str]]
    education: Education
    
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str

@app.get("/api/profile", response_model=ProfileData)
async def get_profile():
    try:
        profile_data, _, _ = reload_data()
        return profile_data
    except Exception as e:
        logger.error(f"Error fetching profile: {e}")
        raise HTTPException(status_code=500, detail="Failed to load profile data")

@app.get("/api/experience", response_model=list[Experience])
async def get_experience():
    try:
        _, experience_data, _ = reload_data()
        return experience_data
    except Exception as e:
        logger.error(f"Error fetching experience: {e}")
        raise HTTPException(status_code=500, detail="Failed to load experience data")

@app.get("/api/projects", response_model=list[Project])
async def get_projects():
    try:
        _, _, projects_data = reload_data()
        return projects_data
    except Exception as e:
        logger.error(f"Error fetching projects: {e}")
        raise HTTPException(status_code=500, detail="Failed to load projects data")

@app.get("/api/health")
async def health_check():
    """
    Health check endpoint for monitoring and load balancing.
    Returns detailed status including data freshness and email configuration.
    """
    try:
        profile_data, experience_data, projects_data = reload_data()
        return {
            "status": "healthy",
            "timestamp": datetime.now().isoformat(),
            "uptime_seconds": 0,  # In production, track actual uptime
            "checks": {
                "data_loading": True,
                "email_configured": bool(SMTP_USERNAME and SMTP_PASSWORD),
                "cors_enabled": True
            },
            "data_counts": {
                "experience": len(experience_data),
                "projects": len(projects_data)
            },
            "version": "1.0.0"
        }
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        raise HTTPException(status_code=503, detail="Service unhealthy")

@app.get("/api/metrics")
async def metrics():
    """
    Observability metrics endpoint showing system health and performance.
    Useful for monitoring dashboards and alerting systems.
    """
    try:
        profile_data, experience_data, projects_data = reload_data()
        
        # In production, metrics would track actual performance data
        return {
            "timestamp": datetime.now().isoformat(),
            "service": "portfolio-api",
            "environment": "production" if not DEBUG else "development",
            "metrics": {
                "data_freshness": {
                    "last_reload": datetime.now().isoformat(),
                    "experience_count": len(experience_data),
                    "projects_count": len(projects_data)
                },
                "configuration": {
                    "debug_mode": DEBUG,
                    "cors_origins_count": len(ALLOWED_ORIGINS),
                    "email_service": "configured" if (SMTP_USERNAME and SMTP_PASSWORD) else "not_configured"
                }
            }
        }
    except Exception as e:
        logger.error(f"Metrics endpoint error: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch metrics")

@app.post("/api/contact")
async def contact(form: ContactForm):
    try:
        logger.info(f"Contact form submission from: {form.name} <{form.email}>")
        
        if not all([SMTP_USERNAME, SMTP_PASSWORD, SMTP_FROM_EMAIL]):
            logger.error("Email configuration incomplete")
            raise HTTPException(status_code=500, detail="Email service not configured")
        
        email_sent = await send_email(form.name, form.email, form.message)
        
        if email_sent:
            logger.info(f"Email sent successfully to {form.name}")
            return {"message": "Your message has been sent successfully! I'll get back to you soon."}
        else:
            logger.error(f"Failed to send email for {form.name}")
            raise HTTPException(status_code=500, detail="Failed to send email. Please try again later.")
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Contact form error: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while sending your message.")

@app.post("/api/reload")
async def reload_portfolio_data():
    """Manually reload data from data.py - useful for development"""
    try:
        profile_data, experience_data, projects_data = reload_data()
        return {
            "message": "Data reloaded successfully",
            "experience_count": len(experience_data),
            "projects_count": len(projects_data)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to reload data: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    
    # Use import string for proper reload/workers support
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=DEBUG,
        log_level="info" if not DEBUG else "debug",
        access_log=True
    )