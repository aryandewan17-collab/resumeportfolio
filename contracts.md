# API Contracts - Aryan Dewan Portfolio

## Overview
This document defines the API contracts for integrating the frontend portfolio with the backend services.

## Mock Data Integration Points

### Contact Form Submission
**Current Mock**: `mockActions.submitContactForm()` in `mock.js`
**Backend Endpoint**: `POST /api/contact`
**Request Body**:
```json
{
  "name": "string",
  "email": "string", 
  "subject": "string",
  "message": "string"
}
```
**Response**:
```json
{
  "success": boolean,
  "message": "string"
}
```

### Resume Download
**Current Mock**: `mockActions.downloadResume()` in `mock.js`
**Backend Endpoint**: `GET /api/resume/download`
**Response**: PDF file download

### Project View
**Current Mock**: `mockActions.viewProject(projectId)` in `mock.js`
**Backend Endpoint**: `GET /api/projects/{project_id}`
**Response**:
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "technologies": ["string"],
  "category": "string",
  "status": "string",
  "details": "string",
  "github_url": "string",
  "demo_url": "string"
}
```

## Database Models

### Contact Message
```python
class ContactMessage(BaseModel):
    id: str
    name: str
    email: str
    subject: str
    message: str
    timestamp: datetime
    status: str = "new"  # new, read, replied
```

### Project
```python
class Project(BaseModel):
    id: str
    title: str
    description: str
    technologies: List[str]
    category: str
    status: str
    details: str
    github_url: Optional[str]
    demo_url: Optional[str]
    created_at: datetime
```

## Frontend Integration Changes Required

### Remove Mock Dependencies
1. Remove `mockActions` imports from components
2. Replace `mockActions.submitContactForm()` with actual API call
3. Replace `mockActions.downloadResume()` with actual API call
4. Replace `mockActions.viewProject()` with actual API call

### API Integration
1. Create `services/api.js` for centralized API calls
2. Update Contact.jsx to use real API endpoints
3. Update Hero.jsx for resume download
4. Update Projects.jsx for project details

## Backend Implementation Plan

1. **Contact Message Management**
   - Store contact form submissions in MongoDB
   - Email notifications for new messages
   - Admin endpoint to view messages

2. **Resume Management**
   - Store resume PDF in backend
   - Serve resume file for download

3. **Project Management**
   - Store project data in MongoDB
   - CRUD operations for projects
   - Project details endpoint

## Error Handling
- Proper HTTP status codes
- User-friendly error messages
- Form validation feedback
- Network error handling

## Security Considerations
- Input validation and sanitization
- Rate limiting for contact form
- CORS configuration
- File upload security for resume