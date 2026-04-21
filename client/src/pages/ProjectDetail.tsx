// src/pages/ProjectDetail.tsx
import { useParams, Link } from 'react-router-dom';
import { projectsData } from './Projects';
import { ArrowLeftIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectsData.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Project not found</h2>
        <Link to="/projects" className="text-orange-600 mt-4 inline-block">Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Hero Image */}
      <section className="relative h-64 md:h-96">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{project.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-1"><MapPinIcon className="h-4 w-4" /> {project.location}</span>
              <span className="flex items-center gap-1"><CalendarIcon className="h-4 w-4" /> Completed {project.year}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-10">
        <div className="max-w-5xl mx-auto">
          <Link to="/projects" className="inline-flex items-center gap-1 text-orange-600 mb-6 hover:underline">
            <ArrowLeftIcon className="h-4 w-4" /> Back to all projects
          </Link>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-6">{project.fullDescription}</p>
            
            <h3 className="text-xl font-bold text-gray-800 mb-3">Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.gallery.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${project.title} - image ${idx+1}`}
                  className="rounded-lg border border-gray-200 w-full h-48 object-cover"
                />
              ))}
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <p className="text-gray-600 italic">
                Interested in a similar project? <Link to="/contact" className="text-orange-600 font-medium">Contact us</Link> for a consultation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}