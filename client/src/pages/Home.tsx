// src/pages/Home.tsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckBadgeIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  ClockIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  StarIcon,FlagIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import bgimage from '../assets/bg-image.png';
import { services, processSteps, testimonials, faqs } from '../data/homeContent';

const PROJECTS_SHEET_URL = import.meta.env.VITE_PROJECTS_SHEET_URL;
const CACHE_KEY = 'skyscraper_projects';
const CACHE_TTL = 10 * 60 * 1000;

interface SheetProject {
  name: string;
  description: string;
  image_url: string;
  date: string;
  location?: string;
}

// ── Intersection Observer hook ──
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

// ── Fade‑in animation wrapper ──
function FadeInSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isInView } = useInView(0.08);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {children}
    </div>
  );
}

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const { ref, isInView } = useInView(0);   // 0 = trigger as soon as any part is visible
  const started = useRef(false);

  useEffect(() => {
    if (isInView && !started.current && end > 0) {
      started.current = true;
      let startTime: number | null = null;
      const duration = 1500;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function parseStatValue(raw: string): number {
  const numeric = raw.replace(/[^0-9]/g, '');
  return numeric ? parseInt(numeric, 10) : 0;
}

function isStatNumeric(raw: string): boolean {
  return /\d/.test(raw);
}

// ── FAQ Accordion item ──
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [open]);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-orange-50 transition"
        aria-expanded={open}
      >
        <span className="font-semibold text-gray-800 text-sm md:text-base">{q}</span>
        <ChevronDownIcon
          className={`h-5 w-5 text-orange-500 shrink-0 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        style={{ maxHeight: open ? `${contentHeight}px` : '0px' }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div ref={contentRef} className="px-6 pb-5 pt-1 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
          {a}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [projects, setProjects] = useState<SheetProject[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  const mapProjects = useCallback((raw: any[]): SheetProject[] =>
    raw.map((item: any) => ({
      name: item['Name'] || '',
      description: item['Description'] || '',
      image_url: item['Image URL'] || '',
      date: item['Date'] ? String(item['Date']).trim() : '',
      location: item['Location'] || '',
    })), []);

  const loadFromCache = useCallback((): SheetProject[] | null => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) return data as SheetProject[];
    } catch {}
    return null;
  }, []);

  const saveToCache = useCallback((data: SheetProject[]) => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
    } catch {}
  }, []);

  useEffect(() => {
    const cached = loadFromCache();
    if (cached) {
      setProjects(cached.slice(0, 3));
      setProjectsLoading(false);
      return;
    }
    fetch(PROJECTS_SHEET_URL)
      .then((res) => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); })
      .then((rawData: any[]) => {
        const mapped = mapProjects(rawData);
        saveToCache(mapped);
        setProjects(mapped.slice(0, 3));
        setProjectsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch projects:', err);
        setProjectsLoading(false);
      });
  }, [loadFromCache, saveToCache, mapProjects]);

  const slugify = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return (
    <div className="bg-gray-50">
      {/* ── HERO ── */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={bgimage} alt="Construction site" className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl">
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/30 rounded-full px-4 py-1.5">
                <ShieldCheckIcon className="h-4 w-4 text-orange-400" />
                <span className="text-orange-300 text-xs font-semibold tracking-widest uppercase">
                  PCAB Licensed · SEC Registered
                </span>
              </div>
              <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/30 rounded-full px-4 py-1.5">
                <FlagIcon className="h-4 w-4 text-orange-400" />
                <span className="text-orange-300 text-xs font-semibold tracking-widest uppercase">
                  10+ Years of Excellence
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-5">
              Marinduque's Trusted<br />
              <span className="text-orange-400">Construction Partner</span>
            </h1>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-xl">
              We design, build, and deliver residential and commercial projects across Marinduque — on budget, on schedule, with no surprises.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                to="/get-estimate"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-lg shadow-lg transition inline-flex items-center gap-2 text-sm"
              >
                Get Free Estimate <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <a
                href="https://m.me/SkyscraperCES"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold px-7 py-3.5 rounded-lg transition text-sm"
              >
                Message Us on Messenger
              </a>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-gray-300">
              {[
                '✓ Transparent pricing, no hidden costs',
                '✓ Regular updates during construction',
                '✓ 30% down payment to start',
              ].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR (with count‑up animation) ── */}
      <section className="bg-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-orange-400">
            {([
              { value: '50+', label: 'Projects Completed' },
              { value: 'PCAB', label: 'Licensed Contractor' },
              { value: '5+', label: 'Years in Business' },
              { value: '100%', label: 'Client Satisfaction Goal' },
            ]).map(({ value, label }) => (
              <div key={label} className="py-5 px-4 md:px-8 text-center">
                <div className="text-2xl md:text-3xl font-extrabold">
                  {isStatNumeric(value) ? (
                    <CountUp end={parseStatValue(value)} suffix={value.replace(/[0-9]/g, '')} />
                  ) : (
                    value
                  )}
                </div>
                <div className="text-orange-100 text-xs md:text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <FadeInSection className="bg-white py-14 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Why Clients Choose Us</h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              We're not the cheapest — we're the most dependable option in Marinduque.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {([
              {
                icon: ShieldCheckIcon,
                title: 'PCAB Licensed & Insured',
                body: 'Fully accredited contractor. Your investment is protected from start to finish.',
              },
              {
                icon: ClockIcon,
                title: 'On-Time Delivery',
                body: "We set realistic timelines and stick to them. You'll always know where things stand.",
              },
              {
                icon: CurrencyDollarIcon,
                title: 'Transparent Costing',
                body: 'Detailed breakdown before we start — no surprise charges mid-project.',
              },
            ] as const).map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="flex gap-4 p-6 bg-gray-50 rounded-xl border border-gray-100"
              >
                <div className="shrink-0 bg-orange-100 h-11 w-11 rounded-lg flex items-center justify-center">
                  <Icon className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ── SERVICES ── */}
      <FadeInSection className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Our Services</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">End-to-end construction and engineering solutions for residential and commercial clients.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service) => (
              <div key={service.title} className="bg-white rounded-xl border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition duration-300 overflow-hidden group flex flex-col">
                <div className="relative h-40 overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 bg-orange-500 p-1.5 rounded-md">
                    <service.icon className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-800 mb-1 text-sm">{service.title}</h3>
                  <p className="text-gray-500 text-xs mb-2 leading-relaxed flex-1">{service.description}</p>
                  <p className="text-xs text-orange-600 font-medium border-t border-gray-100 pt-2">Includes: {service.includes}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/services" className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:underline text-sm">
              See Full Service List <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* ── PROJECTS ── */}
      <FadeInSection className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Our Work Speaks for Itself</h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              These are real projects we've completed for clients across Marinduque. Every project is different — we adapt to your site, your budget, and your goals.
            </p>
          </div>

          {projectsLoading && (
            <div className="text-center text-gray-500 py-10">Loading projects...</div>
          )}

          {!projectsLoading && projects.length === 0 && (
            <div className="text-center text-gray-500 py-10">No projects available at the moment.</div>
          )}

          {!projectsLoading && projects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((project, idx) => {
                const slug = slugify(project.name);
                return (
                  <div key={idx} className="group relative bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-orange-500/50 transition duration-300">
                    <div className="relative h-56 overflow-hidden">
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={project.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-500 text-sm">No image available</div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-white mb-1 text-lg line-clamp-1">{project.name}</h3>
                      {project.location && (
                        <p className="flex items-center gap-1 text-orange-400 text-xs mb-2">
                          <MapPinIcon className="h-3 w-3" />{project.location}
                        </p>
                      )}
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">{project.description}</p>
                      <div className="flex items-center justify-between border-t border-gray-700 pt-3">
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <CalendarIcon className="h-3.5 w-3.5" />
                          {project.date ? `Completed ${project.date}` : ''}
                        </span>
                        <Link to={`/projects/${slug}`} className="text-sm font-medium text-orange-400 hover:text-orange-300 inline-flex items-center gap-1 transition">
                          View Project <ArrowRightIcon className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="text-center mt-8">
            <Link to="/projects" className="inline-flex items-center gap-2 text-orange-400 font-semibold hover:underline text-sm">
              View All Projects <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* ── HOW WE WORK ── */}
      <FadeInSection className="bg-white py-16 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">How We Work</h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">A straightforward process — no guesswork, no runaround.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {processSteps.map((s, idx) => (
              <div key={s.step} className="relative text-center">
                {idx < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[60%] w-full h-0.5 bg-orange-100 z-0" />
                )}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="bg-orange-500 text-white h-14 w-14 rounded-full flex items-center justify-center mb-4 shadow-md">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <div className="text-xs text-orange-500 font-bold mb-1 tracking-widest">STEP {s.step}</div>
                  <h3 className="font-bold text-gray-800 mb-2 text-sm">{s.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ── TESTIMONIALS ── */}
      <FadeInSection className="bg-orange-50 py-16 border-y border-orange-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">What Clients Say</h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">Feedback from homeowners and business owners we've worked with in Marinduque.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4 text-orange-400 fill-orange-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-5 italic">"{t.text}"</p>
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-bold text-gray-800 text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.location} · {t.project}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ── FAQ ── */}
      <FadeInSection className="bg-white py-16 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">Common questions from homeowners and business owners before starting a project.</p>
          </div>
          <div className="max-w-3xl mx-auto flex flex-col gap-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* ── FINAL CTA ── */}
      <FadeInSection className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-gray-400 mb-2 text-sm">
              Fill out a quick form — name, contact number, location, and project type. We'll respond within 24 hours with an initial estimate.
            </p>
            <p className="text-orange-400 text-xs font-semibold mb-8 tracking-wide">Takes less than 1 minute.</p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <Link
                to="/get-estimate"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-lg shadow-lg transition inline-flex items-center justify-center gap-2"
              >
                Get a Free Estimate <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <a
                href="https://m.me/SkyscraperCES"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg border border-white/20 transition inline-flex items-center justify-center"
              >
                Message Us on Messenger
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs text-gray-500 border-t border-gray-800 pt-8">
              {[
                { icon: ShieldCheckIcon, text: 'No hidden costs' },
                { icon: ClockIcon, text: 'Response within 24 hours' },
                { icon: CheckBadgeIcon, text: 'PCAB Licensed' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center justify-center gap-2">
                  <Icon className="h-4 w-4 text-orange-400" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
}