# Imports
import os
from fastapi import FastAPI, HttpException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr