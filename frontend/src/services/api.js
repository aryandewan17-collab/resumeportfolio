import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// API service class
class ApiService {
  // Submit contact form
  async submitContactForm(formData) {
    try {
      const response = await axios.post(`${API}/contact`, formData);
      return response.data;
    } catch (error) {
      console.error('Contact form submission error:', error);
      throw new Error(error.response?.data?.detail || 'Failed to send message');
    }
  }

  // Download resume
  async downloadResume() {
    try {
      // For now, just show a message. In production, this would download the actual file
      const response = await axios.get(`${API}/resume/download`);
      alert(response.data.message);
      return response.data;
    } catch (error) {
      console.error('Resume download error:', error);
      throw new Error('Failed to download resume');
    }
  }

  // Get project details
  async getProjectDetails(projectId) {
    try {
      const response = await axios.get(`${API}/projects/${projectId}`);
      return response.data;
    } catch (error) {
      console.error('Project details error:', error);
      throw new Error('Failed to fetch project details');
    }
  }

  // Get all projects
  async getAllProjects() {
    try {
      const response = await axios.get(`${API}/projects`);
      return response.data;
    } catch (error) {
      console.error('Projects fetch error:', error);
      throw new Error('Failed to fetch projects');
    }
  }

  // Get contact messages (admin)
  async getContactMessages() {
    try {
      const response = await axios.get(`${API}/contact/messages`);
      return response.data;
    } catch (error) {
      console.error('Contact messages fetch error:', error);
      throw new Error('Failed to fetch contact messages');
    }
  }
}

export default new ApiService();