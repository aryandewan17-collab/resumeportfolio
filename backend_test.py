#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Aryan Dewan's Portfolio Website
Tests all backend endpoints for functionality, validation, and error handling.
"""

import requests
import json
import sys
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get backend URL from environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL')
if not BACKEND_URL:
    print("❌ ERROR: REACT_APP_BACKEND_URL not found in environment")
    sys.exit(1)

API_BASE = f"{BACKEND_URL}/api"

class PortfolioAPITester:
    def __init__(self):
        self.passed_tests = 0
        self.failed_tests = 0
        self.test_results = []
        
    def log_test(self, test_name, passed, message="", response_data=None):
        """Log test results"""
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"{status}: {test_name}")
        if message:
            print(f"   {message}")
        if response_data and not passed:
            print(f"   Response: {response_data}")
        print()
        
        self.test_results.append({
            'test': test_name,
            'passed': passed,
            'message': message,
            'response': response_data
        })
        
        if passed:
            self.passed_tests += 1
        else:
            self.failed_tests += 1
    
    def test_root_endpoint(self):
        """Test GET /api/ - Root endpoint"""
        try:
            response = requests.get(f"{API_BASE}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "Portfolio API" in data["message"]:
                    self.log_test("Root Endpoint", True, f"Status: {response.status_code}, Message: {data['message']}")
                else:
                    self.log_test("Root Endpoint", False, f"Unexpected response format", data)
            else:
                self.log_test("Root Endpoint", False, f"Status: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("Root Endpoint", False, f"Request failed: {str(e)}")
    
    def test_contact_form_valid(self):
        """Test POST /api/contact with valid data"""
        valid_data = {
            "name": "John Smith",
            "email": "john.smith@example.com",
            "subject": "Collaboration Opportunity",
            "message": "Hi Aryan, I'm interested in discussing a potential collaboration on an AI/ML project. Your work on skin cancer detection is impressive!"
        }
        
        try:
            response = requests.post(f"{API_BASE}/contact", json=valid_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "message" in data:
                    self.log_test("Contact Form - Valid Data", True, f"Message saved successfully: {data['message']}")
                else:
                    self.log_test("Contact Form - Valid Data", False, "Unexpected response format", data)
            else:
                self.log_test("Contact Form - Valid Data", False, f"Status: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("Contact Form - Valid Data", False, f"Request failed: {str(e)}")
    
    def test_contact_form_invalid_email(self):
        """Test POST /api/contact with invalid email"""
        invalid_data = {
            "name": "Jane Doe",
            "email": "invalid-email",
            "subject": "Test Subject",
            "message": "Test message"
        }
        
        try:
            response = requests.post(f"{API_BASE}/contact", json=invalid_data, timeout=10)
            
            if response.status_code == 422:  # Validation error expected
                self.log_test("Contact Form - Invalid Email", True, "Validation error returned as expected")
            else:
                self.log_test("Contact Form - Invalid Email", False, f"Expected 422, got {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("Contact Form - Invalid Email", False, f"Request failed: {str(e)}")
    
    def test_contact_form_missing_fields(self):
        """Test POST /api/contact with missing required fields"""
        incomplete_data = {
            "name": "Test User",
            "email": "test@example.com"
            # Missing subject and message
        }
        
        try:
            response = requests.post(f"{API_BASE}/contact", json=incomplete_data, timeout=10)
            
            if response.status_code == 422:  # Validation error expected
                self.log_test("Contact Form - Missing Fields", True, "Validation error returned as expected")
            else:
                self.log_test("Contact Form - Missing Fields", False, f"Expected 422, got {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("Contact Form - Missing Fields", False, f"Request failed: {str(e)}")
    
    def test_get_contact_messages(self):
        """Test GET /api/contact/messages - Admin endpoint"""
        try:
            response = requests.get(f"{API_BASE}/contact/messages", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("Get Contact Messages", True, f"Retrieved {len(data)} messages")
                else:
                    self.log_test("Get Contact Messages", False, "Expected list response", data)
            else:
                self.log_test("Get Contact Messages", False, f"Status: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("Get Contact Messages", False, f"Request failed: {str(e)}")
    
    def test_resume_download(self):
        """Test GET /api/resume/download"""
        try:
            response = requests.get(f"{API_BASE}/resume/download", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    self.log_test("Resume Download", True, f"Response: {data.get('message', 'Success')}")
                else:
                    self.log_test("Resume Download", False, "Unexpected response format", data)
            else:
                self.log_test("Resume Download", False, f"Status: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("Resume Download", False, f"Request failed: {str(e)}")
    
    def test_get_all_projects(self):
        """Test GET /api/projects"""
        try:
            response = requests.get(f"{API_BASE}/projects", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list) and len(data) > 0:
                    # Verify project structure
                    project = data[0]
                    required_fields = ['id', 'title', 'description', 'technologies', 'category', 'status', 'details']
                    missing_fields = [field for field in required_fields if field not in project]
                    
                    if not missing_fields:
                        self.log_test("Get All Projects", True, f"Retrieved {len(data)} projects with proper structure")
                    else:
                        self.log_test("Get All Projects", False, f"Missing fields in project: {missing_fields}", project)
                else:
                    self.log_test("Get All Projects", False, "Expected non-empty list", data)
            else:
                self.log_test("Get All Projects", False, f"Status: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("Get All Projects", False, f"Request failed: {str(e)}")
    
    def test_get_project_details(self):
        """Test GET /api/projects/{project_id} for valid project IDs"""
        project_ids = ["1", "2", "3", "4"]
        
        for project_id in project_ids:
            try:
                response = requests.get(f"{API_BASE}/projects/{project_id}", timeout=10)
                
                if response.status_code == 200:
                    data = response.json()
                    required_fields = ['id', 'title', 'description', 'technologies', 'category', 'status', 'details']
                    missing_fields = [field for field in required_fields if field not in data]
                    
                    if not missing_fields and data['id'] == project_id:
                        self.log_test(f"Get Project {project_id}", True, f"Project details retrieved: {data['title']}")
                    else:
                        self.log_test(f"Get Project {project_id}", False, f"Invalid project structure or ID mismatch", data)
                else:
                    self.log_test(f"Get Project {project_id}", False, f"Status: {response.status_code}", response.text)
                    
            except Exception as e:
                self.log_test(f"Get Project {project_id}", False, f"Request failed: {str(e)}")
    
    def test_get_invalid_project(self):
        """Test GET /api/projects/{project_id} with invalid project ID"""
        invalid_id = "999"
        
        try:
            response = requests.get(f"{API_BASE}/projects/{invalid_id}", timeout=10)
            
            if response.status_code == 404:
                self.log_test("Get Invalid Project", True, "404 error returned as expected for invalid project ID")
            else:
                self.log_test("Get Invalid Project", False, f"Expected 404, got {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("Get Invalid Project", False, f"Request failed: {str(e)}")
    
    def test_database_connectivity(self):
        """Test database connectivity by submitting and retrieving a contact message"""
        # First submit a test message
        test_data = {
            "name": "Database Test User",
            "email": "dbtest@example.com",
            "subject": "Database Connectivity Test",
            "message": "This is a test message to verify database connectivity and data persistence."
        }
        
        try:
            # Submit message
            submit_response = requests.post(f"{API_BASE}/contact", json=test_data, timeout=10)
            
            if submit_response.status_code == 200:
                # Try to retrieve messages to verify it was saved
                get_response = requests.get(f"{API_BASE}/contact/messages", timeout=10)
                
                if get_response.status_code == 200:
                    messages = get_response.json()
                    # Look for our test message
                    test_message_found = any(
                        msg.get('email') == test_data['email'] and 
                        msg.get('subject') == test_data['subject']
                        for msg in messages
                    )
                    
                    if test_message_found:
                        self.log_test("Database Connectivity", True, "Message successfully saved and retrieved from database")
                    else:
                        self.log_test("Database Connectivity", False, "Test message not found in database", messages)
                else:
                    self.log_test("Database Connectivity", False, f"Failed to retrieve messages: {get_response.status_code}")
            else:
                self.log_test("Database Connectivity", False, f"Failed to submit test message: {submit_response.status_code}")
                
        except Exception as e:
            self.log_test("Database Connectivity", False, f"Database test failed: {str(e)}")
    
    def run_all_tests(self):
        """Run all backend API tests"""
        print("=" * 80)
        print("🚀 STARTING COMPREHENSIVE BACKEND API TESTING")
        print(f"📍 Testing API at: {API_BASE}")
        print("=" * 80)
        print()
        
        # Run all tests
        self.test_root_endpoint()
        self.test_contact_form_valid()
        self.test_contact_form_invalid_email()
        self.test_contact_form_missing_fields()
        self.test_get_contact_messages()
        self.test_resume_download()
        self.test_get_all_projects()
        self.test_get_project_details()
        self.test_get_invalid_project()
        self.test_database_connectivity()
        
        # Print summary
        print("=" * 80)
        print("📊 TEST SUMMARY")
        print("=" * 80)
        print(f"✅ Passed: {self.passed_tests}")
        print(f"❌ Failed: {self.failed_tests}")
        print(f"📈 Success Rate: {(self.passed_tests / (self.passed_tests + self.failed_tests) * 100):.1f}%")
        print()
        
        if self.failed_tests > 0:
            print("🔍 FAILED TESTS DETAILS:")
            for result in self.test_results:
                if not result['passed']:
                    print(f"   ❌ {result['test']}: {result['message']}")
            print()
        
        return self.failed_tests == 0

if __name__ == "__main__":
    tester = PortfolioAPITester()
    success = tester.run_all_tests()
    
    if success:
        print("🎉 ALL TESTS PASSED! Backend API is working perfectly!")
        sys.exit(0)
    else:
        print("⚠️  Some tests failed. Please check the details above.")
        sys.exit(1)