// src/pages/Projects.tsx
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export const projectsData = [
  {
    id: '4-bedroom-bungalow',
    title: '4 Bedroom Bungalow',
    description: 'Modern design with complete amenities.',
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600',
    location: 'Buenavista, Marinduque',
    year: '2024',
    fullDescription: 'A spacious single-story home featuring four bedrooms, open-plan living area, modern kitchen, and landscaped garden. Built with high-quality materials and energy-efficient design.',
    gallery: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
  },
  {
    id: 'minimalist-2-bedroom',
    title: 'Minimalist 2 Bedroom',
    description: 'Cozy and efficient living space.',
    image: 'https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&w=600',
    location: 'Buenavista, Marinduque',
    year: '2023',
    fullDescription: 'A compact yet stylish home designed for modern living. Features clean lines, natural light, and smart storage solutions.',
    gallery: [
      'https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
  },
  {
    id: '3-bedroom-with-attic',
    title: '3 Bedroom with Attic',
    description: 'Spacious family home design.',
    image: 'https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg?auto=compress&cs=tinysrgb&w=600',
    location: 'Buenavista, Marinduque',
    year: '2024',
    fullDescription: 'A two-story home with three bedrooms, convertible attic space, and a large backyard. Perfect for growing families.',
    gallery: [
      'https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
  },
];

export default function Projects() {
  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-800 to-gray-900 text-white py-14 md:py-18">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Our Projects</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore our portfolio of completed construction and engineering works.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition group">
              <div className="relative h-56">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{project.location} • {project.year}</span>
                  <Link
                    to={`/projects/${project.id}`}
                    className="text-orange-600 font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    View Project <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}