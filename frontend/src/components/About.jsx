import React from 'react';
import { Card, CardContent } from './ui/card';
import { GraduationCap, Award, Camera, Globe } from 'lucide-react';
import { mockData } from './mock';

const About = () => {
  const { about } = mockData;

  const iconMap = {
    GraduationCap: GraduationCap,
    Award: Award,
    Camera: Camera,
    Globe: Globe
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-teal-600 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Description */}
          <div className="space-y-6">
            <p className="text-lg text-gray-600 leading-relaxed">
              {about.description}
            </p>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {about.highlights.map((highlight, index) => {
              const IconComponent = iconMap[highlight.icon];
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-teal-100 p-3 rounded-lg">
                        <IconComponent className="h-6 w-6 text-teal-600" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-gray-900">
                          {highlight.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;