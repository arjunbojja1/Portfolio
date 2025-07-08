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
}