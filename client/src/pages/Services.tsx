// src/pages/Services.tsx
import { Link } from 'react-router-dom';
import {
  HomeModernIcon,
  VideoCameraIcon,
  BoltIcon,
  SunIcon,
  WrenchScrewdriverIcon,
  PencilSquareIcon,
  CubeTransparentIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

export const servicesData = [
  {
    id: 'general-construction',
    title: 'General Construction',
    description: 'Complete design and build services for residential and commercial projects.',
    icon: HomeModernIcon,
    image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600',
    longDescription: 'From ground-up construction to complex commercial builds, our team handles every phase with precision. We manage permits, materials, and skilled labor to deliver on time and within budget.',
  },
  {
    id: 'cctv-installation',
    title: 'CCTV Installation',
    description: 'Professional security camera systems for homes and businesses.',
    icon: VideoCameraIcon,
    image: 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=600',
    longDescription: 'Protect what matters most with high-definition surveillance systems. We install wired and wireless CCTV solutions with remote viewing capabilities for complete peace of mind.',
  },
  {
    id: 'electrical-installation',
    title: 'Electrical Installation',
    description: 'Wiring, panel upgrades, lighting, and complete electrical systems.',
    icon: BoltIcon,
    image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=600',
    longDescription: 'Licensed electricians provide safe, code-compliant installations for new construction, renovations, and upgrades. From lighting design to panel replacements, we power your project reliably.',
  },
  {
    id: 'solar-panel-systems',
    title: 'Solar Panel Systems',
    description: 'Renewable energy solutions for residential and commercial properties.',
    icon: SunIcon,
    image: 'https://images.pexels.com/photos/356049/pexels-photo-356049.jpeg?auto=compress&cs=tinysrgb&w=600',
    longDescription: 'Reduce energy costs and carbon footprint with custom solar installations. We assess your property, design efficient systems, and handle all permitting and grid connection.',
  },
  {
    id: 'house-additions-renovations',
    title: 'House Additions & Renovations',
    description: 'Additional rooms, extensions, and complete home remodeling.',
    icon: WrenchScrewdriverIcon,
    image: 'https://images.pexels.com/photos/3990359/pexels-photo-3990359.jpeg?auto=compress&cs=tinysrgb&w=600',
    longDescription: 'Transform your existing space or expand your home with seamless additions. We match existing architecture while improving functionality and value.',
  },
  {
    id: 'architectural',
    title: 'Architectural',
    description: 'Professional design, planning, and architectural engineering services.',
    icon: PencilSquareIcon,
    image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600',
    longDescription: 'Our licensed architects create functional, aesthetic designs that meet building codes and reflect your vision. From concept sketches to full blueprints, we bring ideas to life.',
  },
  {
    id: 'structural',
    title: 'Structural',
    description: 'Professional design, planning, and structural engineering services.',
    icon: PencilSquareIcon,
    image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600',
    longDescription: 'Ensure your project stands on a solid foundation with expert structural analysis and design. We calculate loads, specify materials, and ensure safety and durability.',
  },
  {
    id: 'plumbing-works',
    title: 'Plumbing Works',
    description: 'Complete plumbing installation, repair, and maintenance.',
    icon: CubeTransparentIcon,
    image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=600',
    longDescription: 'From rough-in to fixture installation, our licensed plumbers handle water supply, drainage, and gas lines with precision and compliance.',
  },
];

export default function Services() {
  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-800 to-gray-900 text-white py-14 md:py-18">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Our Services</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Comprehensive construction and engineering solutions tailored to your needs.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition group">
              <div className="relative h-48">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 bg-orange-500 p-2 rounded-lg">
                  <service.icon className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                <Link
                  to={`/services/${service.id}`}
                  className="text-orange-600 font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Learn More <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}