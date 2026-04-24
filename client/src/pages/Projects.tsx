// src/pages/Projects.tsx
import { useState, useEffect, useCallback } from 'react';
import { ArrowRightIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const PROJECTS_SHEET_URL = import.meta.env.VITE_PROJECTS_SHEET_URL;
const CACHE_KEY = 'skyscraper_projects';
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes (feel free to adjust)

interface SheetProject {
  name: string;
  description: string;
  image_url: string;
  date: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<SheetProject[]>([]);
  const [loading, setLoading] = useState(true);      // only true if no cache at all
  const [refreshing, setRefreshing] = useState(false); // true when manually refreshing
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

  // Helper: load from cache if fresh
  const loadFromCache = (): SheetProject[] | null => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) {
        return data as SheetProject[];
      }
    } catch (e) {
      // ignore corrupt cache
    }
    return null;
  };

  // Helper: save to cache
  const saveToCache = (data: SheetProject[]) => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
    } catch (e) {
      // ignore storage errors
    }
  };

  // Fetch data from Google Sheets (either new or stale)
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

  // Initial load: try cache first, then fetch if needed
  useEffect(() => {
    const cached = loadFromCache();
    if (cached) {
      setProjects(cached);
      setLoading(false);
      // Optionally refresh in background
      fetchProjects(false);
    } else {
      fetchProjects(false);
    }
  }, [fetchProjects]);

  // Manual refresh button
  const handleRefresh = () => {
    fetchProjects(true);
  };

  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-800 to-gray-900 text-white py-14 md:py-18">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Our Projects</h1>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center justify-center p-2 rounded-full hover:bg-white/10 transition disabled:opacity-50"
              title="Refresh projects"
            >
              <ArrowPathIcon className={`h-5 w-5 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore our portfolio of completed construction and engineering works.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="container mx-auto px-4 py-10">
        {loading && (
          <div className="text-center text-gray-500 py-20">Loading projects…</div>
        )}
        {error && !projects.length && (
          <div className="text-center text-red-500 py-20">
            Failed to load projects: {error}
          </div>
        )}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition group"
              >
                <div className="relative h-56">
                  {project.image_url && (
                    <img
                      src={project.image_url}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  {!project.image_url && (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {project.date ? `Completed: ${project.date}` : ''}
                    </span>
                    <span className="text-orange-600 font-medium text-sm inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                      View Project <ArrowRightIcon className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && !error && projects.length === 0 && (
          <div className="text-center text-gray-500 py-20">No projects found.</div>
        )}
      </section>
    </div>
  );
}