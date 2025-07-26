import React from 'react';
import { Button } from './ui/button';
import { Download, Mail, FolderOpen, Cpu, Zap } from 'lucide-react';
import { mockData } from './mock';
import ApiService from '../services/api';

const Hero = () => {
  const { personalInfo } = mockData;

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResumeDownload = async () => {
    try {
      await ApiService.downloadResume();
    } catch (error) {
      alert('Resume download currently unavailable');
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl float-animation"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl float-animation" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-yellow-300/10 rounded-full blur-2xl float-animation" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Main Hero Image with Cyber Effects */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
        <div className="relative w-full h-full">
          <img 
            src={personalInfo.heroImage}
            alt="AI Technology Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/70"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                <Cpu className="h-8 w-8 text-yellow-400" />
                <span className="text-yellow-400 font-semibold text-lg tracking-wider">AI/ML ENGINEER</span>
              </div>
              
              <h1 className="text-4xl md:text-7xl font-light text-white leading-tight">
                Hi, I'm{' '}
                <span className="font-bold gradient-text golden-text-glow">
                  {personalInfo.name}
                </span>
              </h1>
              
              <h2 className="text-xl md:text-3xl font-light text-gray-300 leading-relaxed">
                <span className="text-yellow-400">Electronics & Communication Engineer</span>
                <br />
                <span className="text-sm md:text-base text-gray-400 mt-2 block">
                  passionate about solving real-world problems with intelligent systems
                </span>
              </h2>
              
              <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
                {personalInfo.subtitle}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleResumeDownload}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold px-8 py-4 text-lg golden-glow hover:pulse-gold transition-all duration-300 transform hover:scale-105"
                size="lg"
              >
                <Download className="mr-2 h-5 w-5" />
                View Resume
              </Button>
              
              <Button 
                onClick={() => scrollToSection('contact')}
                variant="outline"
                className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105"
                size="lg"
              >
                <Mail className="mr-2 h-5 w-5" />
                Contact Me
              </Button>
              
              <Button 
                onClick={() => scrollToSection('projects')}
                variant="outline"
                className="border-2 border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-black px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105"
                size="lg"
              >
                <FolderOpen className="mr-2 h-5 w-5" />
                View Projects
              </Button>
            </div>

            {/* Stats/Highlights */}
            <div className="flex space-x-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">4+</div>
                <div className="text-sm text-gray-400">AI Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">2+</div>
                <div className="text-sm text-gray-400">Certifications</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">6+</div>
                <div className="text-sm text-gray-400">Technologies</div>
              </div>
            </div>
          </div>

          {/* Featured Visual Element */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="relative w-96 h-96 mx-auto">
                {/* Cyber Frame */}
                <div className="absolute inset-0 border-2 border-yellow-400/30 rounded-2xl transform rotate-6 golden-glow"></div>
                <div className="absolute inset-0 border border-yellow-500/20 rounded-2xl transform -rotate-3"></div>
                
                {/* Main Image */}
                <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden golden-glow">
                  <img 
                    src={personalInfo.heroImage}
                    alt="AI Technology"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Floating Elements */}
                  <div className="absolute top-4 right-4">
                    <Zap className="h-8 w-8 text-yellow-400 float-animation" />
                  </div>
                </div>
                
                {/* Decorative Cyber Elements */}
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-yellow-400 rounded-full opacity-60 pulse-gold"></div>
                <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-yellow-500 rounded-full opacity-40 pulse-gold" style={{animationDelay: '1s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;