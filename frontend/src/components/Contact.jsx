import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useToast } from '../hooks/use-toast';
import { Mail, Phone, MapPin, Linkedin, Send, Zap } from 'lucide-react';
import { mockData } from './mock';
import ApiService from '../services/api';

const Contact = () => {
  const { personalInfo } = mockData;
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await ApiService.submitContactForm(formData);
      if (result.success) {
        toast({
          title: "Message Sent! ⚡",
          description: result.message,
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-black relative overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-400/5 rounded-full blur-3xl float-animation"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-500/5 rounded-full blur-3xl float-animation" style={{animationDelay: '1s'}}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Zap className="h-8 w-8 text-yellow-400" />
            <h2 className="text-3xl md:text-5xl font-light text-white">
              Get In <span className="gradient-text font-bold">Touch</span>
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6 golden-glow"></div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Interested in collaborating or have questions about my work? Let's build something incredible together!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6 golden-text-glow">Let's Connect</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                I'm always open to discussing new opportunities, interesting projects, or just having a conversation about AI and technology. Drop me a message and let's create something amazing!
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 group">
                <div className="bg-yellow-400/10 p-4 rounded-xl border border-yellow-400/20 group-hover:bg-yellow-400/20 transition-all duration-300 golden-glow">
                  <Mail className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Email</h4>
                  <p className="text-gray-400">{personalInfo.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 group">
                <div className="bg-yellow-400/10 p-4 rounded-xl border border-yellow-400/20 group-hover:bg-yellow-400/20 transition-all duration-300 golden-glow">
                  <Phone className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Phone</h4>
                  <p className="text-gray-400">{personalInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 group">
                <div className="bg-yellow-400/10 p-4 rounded-xl border border-yellow-400/20 group-hover:bg-yellow-400/20 transition-all duration-300 golden-glow">
                  <MapPin className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Location</h4>
                  <p className="text-gray-400">{personalInfo.location}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 group">
                <div className="bg-yellow-400/10 p-4 rounded-xl border border-yellow-400/20 group-hover:bg-yellow-400/20 transition-all duration-300 golden-glow">
                  <Linkedin className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">LinkedIn</h4>
                  <a 
                    href={`https://${personalInfo.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    {personalInfo.linkedin}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="shadow-2xl bg-gray-900/50 border-yellow-400/20 backdrop-blur-sm golden-glow">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center space-x-2">
                <Send className="h-6 w-6 text-yellow-400" />
                <span>Send a Message</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800/50 border-yellow-400/30 text-white placeholder-gray-500 focus:border-yellow-400 focus:ring-yellow-400/20"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800/50 border-yellow-400/30 text-white placeholder-gray-500 focus:border-yellow-400 focus:ring-yellow-400/20"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-gray-300">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-800/50 border-yellow-400/30 text-white placeholder-gray-500 focus:border-yellow-400 focus:ring-yellow-400/20"
                    placeholder="What would you like to discuss?"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-300">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    required
                    className="bg-gray-800/50 border-yellow-400/30 text-white placeholder-gray-500 focus:border-yellow-400 focus:ring-yellow-400/20 resize-none"
                    placeholder="Tell me about your project or idea..."
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold py-3 golden-glow hover:pulse-gold transition-all duration-300 transform hover:scale-105"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;