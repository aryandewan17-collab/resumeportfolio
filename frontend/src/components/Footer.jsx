import React from 'react';
import { Heart, Linkedin, Mail, Phone } from 'lucide-react';
import { mockData } from './mock';

const Footer = () => {
  const { personalInfo } = mockData;

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">{personalInfo.name}</h3>
            <p className="text-gray-400">
              {personalInfo.title}
            </p>
            <p className="text-gray-400 text-sm">
              Building intelligent solutions for tomorrow's challenges.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              {['About', 'Projects', 'Experience', 'Skills', 'Contact'].map((link) => (
                <button
                  key={link}
                  onClick={() => {
                    const element = document.getElementById(link.toLowerCase());
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="block text-gray-400 hover:text-teal-400 transition-colors"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="space-y-3">
              <a 
                href={`mailto:${personalInfo.email}`}
                className="flex items-center space-x-3 text-gray-400 hover:text-teal-400 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span className="text-sm">{personalInfo.email}</span>
              </a>
              <a 
                href={`tel:${personalInfo.phone}`}
                className="flex items-center space-x-3 text-gray-400 hover:text-teal-400 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span className="text-sm">{personalInfo.phone}</span>
              </a>
              <a 
                href={`https://${personalInfo.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-400 hover:text-teal-400 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                <span className="text-sm">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm flex items-center justify-center">
            Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> by {personalInfo.name} © 2025
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;