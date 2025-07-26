// Mock data for Aryan Dewan's Portfolio
export const mockData = {
  personalInfo: {
    name: "Aryan Dewan",
    title: "AI/ML Enthusiast & ECE Engineer",
    subtitle: "Electronics and Communication Engineering graduate with strong Python skills and hands-on experience in AI/ML projects like brain tumor and skin cancer detection.",
    heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxBSSUyMHRlY2hub2xvZ3l8ZW58MHx8fHwxNzUzNTE1MjUxfDA&ixlib=rb-4.1.0&q=85",
    location: "Dharamshala, Himachal Pradesh, India",
    email: "aryandewan17@gmail.com",
    phone: "+91 8626814311",
    linkedin: "linkedin.com/in/aryandewan-8381b135a"
  },

  about: {
    description: "I'm Aryan Dewan, an Electronics and Communication Engineer passionate about Artificial Intelligence and Machine Learning. With certifications in Python and AI/ML, I've applied my skills to real-world datasets for projects like skin cancer and brain tumor detection. I'm also a creative soul who enjoys photography, editing, and sketching.",
    highlights: [
      {
        icon: "GraduationCap",
        title: "B.Tech in ECE",
        description: "Rajiv Gandhi Govt. Engineering College (2021–2025)"
      },
      {
        icon: "Award",
        title: "Certified in Python and AI/ML",
        description: "Professional certifications in core technologies"
      },
      {
        icon: "Camera",
        title: "Photography & Digital Creativity",
        description: "Passionate about visual arts and creative expression"
      },
      {
        icon: "Globe",
        title: "Multilingual",
        description: "English, Hindi, Nepali"
      }
    ]
  },

  projects: [
    {
      id: 1,
      title: "Skin Cancer Detection using AI/ML",
      description: "Used Kaggle dataset of skin images to classify skin cancer types and absence of cancer. Built with Python and AI/ML libraries.",
      technologies: ["Python", "TensorFlow", "Scikit-learn", "OpenCV"],
      category: "Medical AI",
      status: "Completed"
    },
    {
      id: 2,
      title: "Brain Tumor Detection using AI/ML",
      description: "MRI image analysis using Python. Predicted tumor presence and type with focus on segmentation and classification.",
      technologies: ["Python", "PyTorch", "Medical Imaging", "Deep Learning"],
      category: "Medical AI",
      status: "Completed"
    },
    {
      id: 3,
      title: "Vehicle Detection System",
      description: "Developed a system to detect vehicles using Python. Worked on object detection and bounding box tracking.",
      technologies: ["Python", "YOLO", "OpenCV", "Computer Vision"],
      category: "Computer Vision",
      status: "Completed"
    },
    {
      id: 4,
      title: "Image Processing Techniques",
      description: "Applied segmentation and feature extraction. Calculated precision and recall with automated photo analytics workflow.",
      technologies: ["Python", "OpenCV", "NumPy", "Image Processing"],
      category: "Computer Vision",
      status: "Completed"
    }
  ],

  experience: [
    {
      id: 1,
      position: "Trainee",
      company: "Excellence Technology",
      duration: "Jan 2025 – Apr 2025",
      description: "Built AI/ML models. Developed and tested ML-based medical imaging solutions.",
      type: "Current"
    },
    {
      id: 2,
      position: "Trainee",
      company: "Excellence Technology",
      duration: "Jun 2024 – Jul 2024",
      description: "Practiced Python OOPs concepts. Assisted in AI projects.",
      type: "Past"
    },
    {
      id: 3,
      position: "Head of Photography Club",
      company: "RGGEC",
      duration: "Jan 2023 – Jun 2025",
      description: "Led photography for all college events. Managed and documented major functions creatively.",
      type: "Leadership"
    }
  ],

  skills: [
    { name: "Python", level: 90, category: "Programming" },
    { name: "AI/ML", level: 85, category: "Technology" },
    { name: "Image Processing", level: 80, category: "Technology" },
    { name: "SQL", level: 75, category: "Database" },
    { name: "Adobe Lightroom", level: 85, category: "Creative" },
    { name: "Object Detection & Segmentation", level: 80, category: "Technology" }
  ],

  certifications: [
    {
      title: "Python",
      issuer: "Professional Certification",
      status: "Completed"
    },
    {
      title: "Artificial Intelligence & Machine Learning",
      issuer: "Professional Certification",
      status: "Completed"
    }
  ]
};

// Mock functions for form submissions and interactions
export const mockActions = {
  submitContactForm: (formData) => {
    console.log("Mock contact form submission:", formData);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "Message sent successfully!" });
      }, 1000);
    });
  },

  downloadResume: () => {
    console.log("Mock resume download triggered");
    alert("Resume download would start here");
  },

  viewProject: (projectId) => {
    console.log("Mock project view:", projectId);
    alert(`Would navigate to project ${projectId} details`);
  }
};