import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, Filter } from 'lucide-react';
import { mockData, mockActions } from './mock';

const Projects = () => {
  const { projects } = mockData;
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(projects.map(p => p.category))];
  
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Projects
          </h2>
          <div className="w-20 h-1 bg-teal-600 mx-auto mb-8"></div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`${
                  selectedCategory === category
                    ? 'bg-teal-600 hover:bg-teal-700 text-white'
                    : 'border-teal-200 text-teal-600 hover:bg-teal-50'
                }`}
              >
                <Filter className="mr-2 h-4 w-4" />
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card 
              key={project.id} 
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-3">
                  <Badge 
                    variant="secondary" 
                    className="bg-teal-100 text-teal-700"
                  >
                    {project.category}
                  </Badge>
                  <Badge 
                    variant={project.status === 'Completed' ? 'default' : 'secondary'}
                    className={project.status === 'Completed' ? 'bg-green-100 text-green-700' : ''}
                  >
                    {project.status}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-teal-600 transition-colors">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge 
                      key={index} 
                      variant="outline"
                      className="text-xs"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <Button 
                  onClick={() => mockActions.viewProject(project.id)}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;