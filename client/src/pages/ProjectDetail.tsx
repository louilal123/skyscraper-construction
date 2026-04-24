// src/pages/ProjectDetail.tsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';

const PROJECTS_SHEET_URL = import.meta.env.VITE_PROJECTS_SHEET_URL;
const CACHE_KEY = 'skyscraper_projects'; // same key as Projects page
const CACHE_TTL = 10 * 60 * 1000;          // 10 minutes

interface SheetProject {
  name: string;
  description: string;
  image_url: string;
  date: string;
}

export default function ProjectDetail() {
  const { projectSlug } = useParams<{ projectSlug: string }>();
  const [project, setProject] = useState<SheetProject | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Slug helper
  const slugify = (name: string) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  // Helper: map raw sheet data to our interface
  const mapProjects = (raw: any[]): SheetProject[] => {
    return raw.map((item: any) => ({
      name: item['Name'] || '',
      description: item['Description'] || '',
      image_url: item['Image URL'] || '',
      date: item['Date'] ? String(item['Date']).trim() : '',
    }));
  };

  // Cache helpers (same as Projects page)
  const loadFromCache = (): SheetProject[] | null => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) {
        return data as SheetProject[];
      }
    } catch (e) {}
    return null;
  };

  const saveToCache = (data: SheetProject[]) => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
    } catch (e) {}
  };

  const findProject = (projectsList: SheetProject[]) => {
    return projectsList.find((p) => slugify(p.name) === projectSlug);
  };

  useEffect(() => {
    // 1. Try cache first
    const cached = loadFromCache();
    if (cached) {
      const found = findProject(cached);
      setProject(found);
      setLoading(false);
      return;
    }

    // 2. No cache → fetch fresh data
    fetch(PROJECTS_SHEET_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load projects');
        return res.json();
      })
      .then((rawData: any[]) => {
        const mapped = mapProjects(rawData);
        saveToCache(mapped);
        const found = findProject(mapped);
        setProject(found);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [projectSlug]);

  if (loading) return <div className="container mx-auto px-4 py-20 text-center text-lg">Loading…</div>;

  if (error)
    return (
      <div className="container mx-auto px-4 py-20 text-center text-red-500">
        Failed to load project. <Link to="/projects" className="underline">Back to Projects</Link>
      </div>
    );

  if (!project)
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Project not found</h2>
        <Link to="/projects" className="text-orange-600 mt-4 inline-block font-medium">
          ← Back to Projects
        </Link>
      </div>
    );

  return (
    <div className="bg-gray-50">
      {/* Hero image */}
      <section className="relative h-64 md:h-96 overflow-hidden">
        {project.image_url && (
          <img
            src={project.image_url}
            alt={project.name}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{project.name}</h1>
            <div className="flex flex-wrap gap-4 text-sm md:text-base">
              <span className="flex items-center gap-1">
                <MapPinIcon className="h-4 w-4" /> Marinduque
              </span>
              {project.date && (
                <span className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" /> Completed {project.date}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <Link to="/projects" className="inline-flex items-center gap-1 text-orange-600 mb-6 hover:underline font-medium">
            <ArrowLeftIcon className="h-4 w-4" /> All Projects
          </Link>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Overview</h2>
            <p className="text-gray-700 leading-relaxed text-base">{project.description}</p>

            {project.date && (
              <div className="mt-6 inline-block bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600">
                <CalendarIcon className="h-4 w-4 inline mr-1" /> Completed {project.date}
              </div>
            )}

            <div className="border-t border-gray-200 pt-6 mt-6">
              <p className="text-gray-600 italic">
                Interested in a similar project?{' '}
                <Link to="/contact" className="text-orange-600 font-medium hover:underline">
                  Contact us
                </Link>{' '}
                for a consultation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}