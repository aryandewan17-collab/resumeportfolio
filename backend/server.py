from fastapi import FastAPI, APIRouter, HTTPException, File, UploadFile
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List
import uuid
from datetime import datetime
from models import ContactMessage, ContactMessageCreate, Project, ProjectCreate


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Sample project data (can be moved to database later)
SAMPLE_PROJECTS = [
    {
        "id": "1",
        "title": "Skin Cancer Detection using AI/ML",
        "description": "Used Kaggle dataset of skin images to classify skin cancer types and absence of cancer. Built with Python and AI/ML libraries.",
        "technologies": ["Python", "TensorFlow", "Scikit-learn", "OpenCV"],
        "category": "Medical AI",
        "status": "Completed",
        "details": "This project involves developing a machine learning model for skin cancer detection using deep learning techniques. The model processes dermoscopic images and classifies them into different categories of skin lesions. The system achieved 85% accuracy on the test dataset and includes data preprocessing, feature extraction, and model optimization phases.",
        "github_url": "https://github.com/aryandewan/skin-cancer-detection",
        "demo_url": None,
        "created_at": datetime.utcnow()
    },
    {
        "id": "2", 
        "title": "Brain Tumor Detection using AI/ML",
        "description": "MRI image analysis using Python. Predicted tumor presence and type with focus on segmentation and classification.",
        "technologies": ["Python", "PyTorch", "Medical Imaging", "Deep Learning"],
        "category": "Medical AI",
        "status": "Completed",
        "details": "Advanced deep learning project for automated brain tumor detection from MRI scans. The system uses convolutional neural networks for image segmentation and classification. Implemented U-Net architecture for precise tumor localization and ResNet for classification with 92% accuracy.",
        "github_url": "https://github.com/aryandewan/brain-tumor-detection",
        "demo_url": None,
        "created_at": datetime.utcnow()
    },
    {
        "id": "3",
        "title": "Vehicle Detection System", 
        "description": "Developed a system to detect vehicles using Python. Worked on object detection and bounding box tracking.",
        "technologies": ["Python", "YOLO", "OpenCV", "Computer Vision"],
        "category": "Computer Vision",
        "status": "Completed",
        "details": "Real-time vehicle detection system using YOLO (You Only Look Once) algorithm. The system processes video streams and identifies different types of vehicles with bounding box annotations. Implemented vehicle counting and tracking capabilities for traffic analysis applications.",
        "github_url": "https://github.com/aryandewan/vehicle-detection",
        "demo_url": None,
        "created_at": datetime.utcnow()
    },
    {
        "id": "4",
        "title": "Image Processing Techniques",
        "description": "Applied segmentation and feature extraction. Calculated precision and recall with automated photo analytics workflow.",
        "technologies": ["Python", "OpenCV", "NumPy", "Image Processing"],
        "category": "Computer Vision", 
        "status": "Completed",
        "details": "Comprehensive image processing project implementing various computer vision techniques including edge detection, morphological operations, histogram equalization, and feature extraction. Developed automated workflows for batch image processing with performance metrics evaluation.",
        "github_url": "https://github.com/aryandewan/image-processing",
        "demo_url": None,
        "created_at": datetime.utcnow()
    }
]

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Aryan Dewan Portfolio API"}

# Contact form submission
@api_router.post("/contact", response_model=dict)
async def submit_contact_form(contact_data: ContactMessageCreate):
    try:
        # Create contact message object
        contact_message = ContactMessage(**contact_data.dict())
        
        # Insert into database
        result = await db.contact_messages.insert_one(contact_message.dict())
        
        if result.inserted_id:
            return {
                "success": True,
                "message": "Thank you for your message! I'll get back to you soon."
            }
        else:
            raise HTTPException(status_code=500, detail="Failed to save message")
            
    except Exception as e:
        logging.error(f"Error submitting contact form: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Get all contact messages (admin endpoint)
@api_router.get("/contact/messages", response_model=List[ContactMessage])
async def get_contact_messages():
    try:
        messages = await db.contact_messages.find().sort("timestamp", -1).to_list(100)
        return [ContactMessage(**message) for message in messages]
    except Exception as e:
        logging.error(f"Error fetching contact messages: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch messages")

# Resume download
@api_router.get("/resume/download")
async def download_resume():
    # For now, return a placeholder response
    # In production, you would serve the actual resume file
    return {
        "success": True,
        "message": "Resume download functionality - add your resume file to backend/static/resume.pdf"
    }

# Get project details
@api_router.get("/projects/{project_id}", response_model=Project)
async def get_project_details(project_id: str):
    try:
        # Find project in sample data
        project_data = next((p for p in SAMPLE_PROJECTS if p["id"] == project_id), None)
        
        if not project_data:
            raise HTTPException(status_code=404, detail="Project not found")
            
        return Project(**project_data)
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error fetching project {project_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch project details")

# Get all projects
@api_router.get("/projects", response_model=List[Project])
async def get_all_projects():
    try:
        return [Project(**project) for project in SAMPLE_PROJECTS]
    except Exception as e:
        logging.error(f"Error fetching projects: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch projects")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
