# Imports
import os
from fastapi import FastAPI, HttpException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

# FastAPI app
app = FastAPI()

# CORS Middleware Configuration
origins = [
    "http://localhost:3000",
    "localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Models
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
    description: str

class Project(BaseModel):
    title: str
    github_link: str | None = None
    external_link: str | None = None
    description: str
    challenge: str | None = None
class ProfileData(BaseModel):
    name: str
    title: str
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

# API Data
profile_data = {
    "name": "Arjun Bojja",
    "title": "Aspiring Software Engineer & Product Manager",
    "location": "Herndon, VA",
    "email": "arjunbojja1@gmail.com",
    "linkedin": "https://www.linkedin.com/in/arjun-bojja/",
    "github_user": "arjunbojja1",
    "about": {
        "passion": "I'm passionate about making technology more usable and accessible to everyone. I love building products that solve real-world problems and improve people's lives.",
        "seeking": "I'm currently seeking Software Engineering and Product Management internships where I can apply my skills to build impactful solutions.",
    },
    "skills": {
        "Languages & Frameworks": ["Python", "Java", "Lua", "JavaScript", "TypeScript", "MySQL", "R", "React", "FastAPI", "Node.js", "Express", "RESTful APIs", "Serverless Framework"],
        "Tools & Libraries": ["AWS (Lambda, ECS, Fargate, CLI)", "Docker", "DigitalOcean", "Git/GitHub", "Visual Studio Code", "SQLite3", "PyTest", "Pandas", "NumPy", "Jupyter Notebooks", "TensorFlow", "PyTorch", "Matplotlib", "Uvicorn", "New Relic"]
    },
    "education": {
        "degree": "Bachelor of Science in Information Science",
        "university": "University of Maryland, College Park",
        "gpa": "4.0/4.0",
        "grad_year": 2027,
        "awards": ["Presidential Scholar", "Distinguished Dean's List (Fall 2024, Spring 2025)"],
        "coursework": ["Database Design (MySQL)", "Machine Learning in Communication", "Statistics for Information Science (R)", "Object-Oriented Programming for Information Science", "Organizations, Management, and Teamwork", "Information Organization", "Entrepreneurial Opportunity Analysis"]
    }
}

experience_data = [
    {
        "role": "Software Engineer Intern",
        "company": "Capital One",
        "duration": "June 2025 - August 2025",
        "location": "McLean, VA",
        "description": [
            "Developed a cloud-native synthetic monitoring application using Python, AWS Lambda, and Fargate on ECS, enhancing the health assessment of internal websites and APIs.",
            "Engineered scalable, Dockerized services deployed via AWS Fargate, enabling event-driven health checks triggered manually and on scheduled intervals.",
            "Integrated New Relic for comprehensive performance metric capture and visualization, ensuring reliability and accurate telemetry of monitored systems.",
            "Designed and deployed robust RESTful endpoints with FastAPI, facilitating manual API-based trigger execution and system validation.",
            "Automated infrastructure deployment and monitoring by leveraging AWS CLI and the Serverless Framework, streamlining operational workflows.",
            "Collaborated effectively within the Business Cards and Payments Tech team as part of Capital One's Technology Early Internship Program (TEIP)."
        ]
    }
]