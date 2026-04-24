// src/pages/Home.tsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckBadgeIcon,
  WrenchScrewdriverIcon,
  VideoCameraIcon,
  BoltIcon,
  SunIcon,
  HomeModernIcon,
  PencilSquareIcon,
  CubeTransparentIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  ClockIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import bgimage from '../assets/bg-image.png';

// ── Google Sheets & cache (same config as Projects page) ──
const PROJECTS_SHEET_URL = import.meta.env.VITE_PROJECTS_SHEET_URL;
const CACHE_KEY = 'skyscraper_projects';
const CACHE_TTL = 10 * 60 * 1000;

interface SheetProject {
  name: string;
  description: string;
  image_url: string;
  date: string;
}

// ── Simple scroll‑reveal hook ──
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

// ── Wrapper that applies the reveal animation ──
function FadeInSection({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, isInView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  // ── Services (static for now, but could also come from Sheets later) ──
  const services = [
    {
      title: 'General Construction',
      description: 'Complete design and build services for residential and commercial projects.',
      icon: HomeModernIcon,
      image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      title: 'CCTV Installation',
      description: 'Professional security camera systems for homes and businesses.',
      icon: VideoCameraIcon,
      image: 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      title: 'Electrical Installation',
      description: 'Wiring, panel upgrades, lighting, and complete electrical systems.',
      icon: BoltIcon,
      image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      title: 'Solar Panel Systems',
      description: 'Renewable energy solutions for residential and commercial properties.',
      icon: SunIcon,
      image: 'https://images.pexels.com/photos/356049/pexels-photo-356049.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      title: 'House Additions & Renovations',
      description: 'Additional rooms, extensions, and complete home remodeling.',
      icon: WrenchScrewdriverIcon,
      image: 'https://images.pexels.com/photos/3990359/pexels-photo-3990359.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      title: 'Architectural',
      description: 'Professional design, planning, and Architectural engineering services.',
      icon: PencilSquareIcon,
      image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      title: 'Structural',
      description: 'Professional design, planning, and structural engineering services.',
      icon: PencilSquareIcon,
      image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      title: 'Plumbing Works',
      description: 'Complete plumbing installation, repair, and maintenance.',
      icon: CubeTransparentIcon,
      image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];

  // ── Featured projects from Google Sheets ──
  const [projects, setProjects] = useState<SheetProject[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  // Helper: map raw sheet data
  const mapProjects = useCallback((raw: any[]): SheetProject[] => {
    return raw.map((item: any) => ({
      name: item['Name'] || '',
      description: item['Description'] || '',
      image_url: item['Image URL'] || '',
      date: item['Date'] ? String(item['Date']).trim() : '',
    }));
  }, []);

  // Cache helpers
  const loadFromCache = useCallback((): SheetProject[] | null => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) return data as SheetProject[];
    } catch (e) {}
    return null;
  }, []);

  const saveToCache = useCallback((data: SheetProject[]) => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
    } catch (e) {}
  }, []);

  useEffect(() => {
    const cached = loadFromCache();
    if (cached) {
      // Use first 3 projects for featured section
      setProjects(cached.slice(0, 3));
      setProjectsLoading(false);
      return;
    }

    fetch(PROJECTS_SHEET_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((rawData: any[]) => {
        const mapped = mapProjects(rawData);
        saveToCache(mapped);
        setProjects(mapped.slice(0, 3));
        setProjectsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch projects for homepage:', err);
        setProjectsLoading(false);
      });
  }, [loadFromCache, saveToCache, mapProjects]);

  // Slug helper for project detail links
  const slugify = (name: string) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  return (
    <div className="bg-gray-50">
      {/* Hero Section (no animation – appear immediately) */}
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-600 text-white">
        <div className="absolute inset-0 opacity-40 bg-scroll">
          <img src={bgimage} alt="Construction site" className="w-full h-full object-cover bg-scroll" />
        </div>
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheckIcon className="h-5 w-5 text-orange-400" />
              <span className="text-orange-300 text-sm font-semibold tracking-wide">PCAB LICENSED • SEC REGISTERED</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
              Building Your Vision,{' '}
              <span className="text-orange-400">Engineering Excellence</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
              Skyscraper Construction and Engineering Services — your trusted partner for design, build, and complete construction solutions in Marinduque and beyond.
            </p>
            <div className="flex flex-row flex-wrap gap-3">
              <Link
                to="/contact"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg transition inline-flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                Contact Us <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                to="/projects"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-5 sm:px-8 py-3 sm:py-4 rounded-lg border border-white/30 transition inline-flex items-center justify-center text-sm sm:text-base"
              >
                View Our Projects
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 sm:gap-6 mt-8 sm:mt-10">
              <div className="flex items-center gap-2">
                <div className="bg-orange-500/20 p-2 rounded-full">
                  <CheckBadgeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400" />
                </div>
                <span className="text-xs sm:text-sm">Design & Build Experts</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-orange-500/20 p-2 rounded-full">
                  <CheckBadgeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400" />
                </div>
                <span className="text-xs sm:text-sm">30% Down Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-orange-500/20 p-2 rounded-full">
                  <CheckBadgeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400" />
                </div>
                <span className="text-xs sm:text-sm">Free Consultation</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-6 text-gray-300 text-sm border-t border-white/20 pt-6">
              <MapPinIcon className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400 shrink-0" />
              <span className="text-xs sm:text-sm">Barangay Uno, Buenavista, Marinduque, 4904 Philippines</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision – animated */}
      <FadeInSection className="bg-white py-12 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To deliver high‑quality, innovative, and sustainable construction and engineering solutions, building lasting value for our clients and community.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-2xl shadow-sm border border-orange-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gray-800 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To be Marinduque's most trusted partner in construction, recognized for our expertise, integrity, and commitment to excellence.
              </p>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Why Choose Us – animated */}
      <FadeInSection className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <div className="bg-orange-100 h-14 w-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheckIcon className="h-7 w-7 text-orange-600" />
            </div>
            <h3 className="text-lg font-bold mb-2">Licensed & Insured</h3>
            <p className="text-gray-600 text-sm">PCAB licensed contractor with full insurance coverage for your peace of mind.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <div className="bg-orange-100 h-14 w-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <ClockIcon className="h-7 w-7 text-orange-600" />
            </div>
            <h3 className="text-lg font-bold mb-2">On-Time Delivery</h3>
            <p className="text-gray-600 text-sm">We respect your timeline and complete projects as scheduled.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <div className="bg-orange-100 h-14 w-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <CurrencyDollarIcon className="h-7 w-7 text-orange-600" />
            </div>
            <h3 className="text-lg font-bold mb-2">Flexible Payment</h3>
            <p className="text-gray-600 text-sm">30% down payment to start, with flexible terms for the balance.</p>
          </div>
        </div>
      </FadeInSection>

      {/* Services Section – animated */}
      <FadeInSection className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive construction and engineering solutions tailored to your needs.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition group">
              <div className="relative h-48">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 bg-orange-500 p-2 rounded-lg">
                  <service.icon className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                <Link to="/contact" className="text-orange-600 font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                  Inquire Now <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/services" className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:underline">
            View All Services <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </FadeInSection>

      {/* Featured Projects – animated & dynamic */}
      <FadeInSection className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Featured Projects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See some of our recent work and get inspired for your next project.
            </p>
          </div>

          {projectsLoading && (
            <div className="text-center text-gray-500 py-10">Loading projects...</div>
          )}

          {!projectsLoading && projects.length === 0 && (
            <div className="text-center text-gray-500 py-10">No projects available at the moment.</div>
          )}

          {!projectsLoading && projects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

          <div className="text-center mt-8">
            <Link to="/projects" className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:underline">
              View All Projects <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* Call to Action – animated */}
      <FadeInSection className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Contact us today for a free consultation and quote. Let's build something great together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-lg shadow-lg transition inline-flex items-center justify-center gap-2"
            >
              Contact Us
            </Link>
            <a
              href="tel:+63"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg border border-white/30 transition inline-flex items-center justify-center"
            >
              Call Us Now
            </a>
          </div>
          <p className="text-gray-400 text-sm mt-6">
            Barangay Uno, Buenavista, Marinduque 4904
          </p>
        </div>
      </FadeInSection>
    </div>
  );
}