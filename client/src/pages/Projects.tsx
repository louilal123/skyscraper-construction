// src/pages/Projects.tsx
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, ArrowPathIcon, CalendarIcon } from '@heroicons/react/24/outline';

const PROJECTS_SHEET_URL = import.meta.env.VITE_PROJECTS_SHEET_URL;
const CACHE_KEY = 'skyscraper_projects';
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

interface SheetProject {
  name: string;
  description: string;
  image_url: string;
  date: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<SheetProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper: map raw Google sheet data to our interface
  const mapProjects = (raw: any[]): SheetProject[] => {
    return raw.map((item: any) => ({
      name: item['Name'] || '',
      description: item['Description'] || '',
      image_url: item['Image URL'] || '',
      date: item['Date'] ? String(item['Date']).trim() : '',
    }));
  };

  // Cache helpers
  const loadFromCache = (): SheetProject[] | null => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) return data as SheetProject[];
    } catch (e) {}
    return null;
  };

  const saveToCache = (data: SheetProject[]) => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
    } catch (e) {}
  };

  const fetchProjects = useCallback(async (showRefreshing = false) => {
    if (showRefreshing) setRefreshing(true);
    try {
      const res = await fetch(PROJECTS_SHEET_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const rawData = await res.json();
      const mapped = mapProjects(rawData);
      setProjects(mapped);
      saveToCache(mapped);
      setError(null);
    } catch (err: any) {
      console.error('Failed to fetch projects:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const cached = loadFromCache();
    if (cached) {
      setProjects(cached);
      setLoading(false);
      fetchProjects(false); // background refresh
    } else {
      fetchProjects(false);
    }
  }, [fetchProjects]);

  const handleRefresh = () => fetchProjects(true);

  // Generate a URL-friendly slug from project name
  const slugify = (name: string) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-800 to-gray-900 text-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Our Projects</h1>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center justify-center p-2 rounded-full hover:bg-white/10 transition disabled:opacity-50"
              title="Refresh projects"
            >
              <ArrowPathIcon className={`h-5 w-5 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            A showcase of our completed construction and engineering works across Marinduque.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="container mx-auto px-4 py-12">
        {loading && (
          <div className="text-center text-gray-500 py-20 text-lg">Loading projects…</div>
        )}
        {error && !projects.length && (
          <div className="text-center text-red-500 py-20">
            Failed to load projects. <button onClick={handleRefresh} className="underline font-medium">Retry</button>
          </div>
        )}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => {
              const slug = slugify(project.name);
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition duration-300 group flex flex-col"
                >
                  <div className="relative h-52 overflow-hidden">
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{project.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                      <div className="flex items-center text-xs text-gray-500">
                        <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                        {project.date ? `Completed ${project.date}` : 'No date'}
                      </div>
                      <Link
                        to={`/projects/${slug}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-orange-600 hover:text-orange-700 transition"
                      >
                        View Project <ArrowRightIcon className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {!loading && !error && projects.length === 0 && (
          <div className="text-center text-gray-500 py-20">No projects available at the moment.</div>
        )}
      </section>
    </div>
  );
}