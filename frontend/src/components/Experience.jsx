import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Briefcase, Calendar } from 'lucide-react';
import { mockData } from './mock';

const Experience = () => {
  const { experience } = mockData;

  const getTypeColor = (type) => {
    switch (type) {
      case 'Current':
        return 'bg-green-100 text-green-700';
      case 'Leadership':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Experience
          </h2>
          <div className="w-20 h-1 bg-teal-600 mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <Card key={exp.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div className="flex items-center space-x-3 mb-2 md:mb-0">
                      <div className="bg-teal-100 p-2 rounded-lg">
                        <Briefcase className="h-5 w-5 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {exp.position}
                        </h3>
                        <p className="text-lg text-teal-600 font-medium">
                          {exp.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getTypeColor(exp.type)}>
                        {exp.type}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-500 mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{exp.duration}</span>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {exp.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;