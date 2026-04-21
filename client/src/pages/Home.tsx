// src/pages/Home.tsx
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
  ClockIcon,MapPinIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

export default function Home() {
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
      title: 'Architectural & Structural',
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

  const projects = [
    {
      title: '4 Bedroom Bungalow',
      description: 'Modern design with complete amenities.',
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      title: 'Minimalist 2 Bedroom',
      description: 'Cozy and efficient living space.',
      image: 'https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      title: '3 Bedroom with Attic',
      description: 'Spacious family home design.',
      image: 'https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      
    <section className="relative bg-gradient-to-br from-gray-900 to-gray-600 text-white">
      {/* Hero Image Overlay */}
   <div className="absolute inset-0 opacity-40">
    <img
      src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1200"
      alt="Construction site"
      className="w-full h-full object-cover"
    />
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
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-lg shadow-lg transition inline-flex items-center justify-center gap-2"
            >
              Contact Us
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
            <Link
              to="/projects"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg border border-white/30 transition inline-flex items-center justify-center"
            >
              View Our Projects
            </Link>
          </div>
          {/* Trust Badges */}
          <div className="flex flex-wrap gap-6 mt-10">
            <div className="flex items-center gap-2">
              <div className="bg-orange-500/20 p-2 rounded-full">
                <CheckBadgeIcon className="h-5 w-5 text-orange-400" />
              </div>
              <span className="text-sm">Design & Build Experts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-orange-500/20 p-2 rounded-full">
                <CheckBadgeIcon className="h-5 w-5 text-orange-400" />
              </div>
              <span className="text-sm">30% Down Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-orange-500/20 p-2 rounded-full">
                <CheckBadgeIcon className="h-5 w-5 text-orange-400" />
              </div>
              <span className="text-sm">Free Consultation</span>
            </div>
          </div>
          {/* Address Line - New Addition */}
          <div className="flex items-center gap-2 mt-6 text-gray-300 text-sm border-t border-white/20 pt-6">
            <MapPinIcon className="h-5 w-5 text-orange-400" />
            <span>Barangay Uno, Buenavista, Marinduque 4904</span>
          </div>
        </div>
      </div>
    </section>

          {/* Mission & Vision Section */}
    <section className="bg-white py-12 border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Mission Card */}
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
              To deliver high-quality, innovative, and sustainable construction and engineering solutions, building lasting value for our clients and community.
            </p>
          </div>

          {/* Vision Card */}
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
    </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-12">
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
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-12">
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
                  to="/contact"
                  className="text-orange-600 font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Inquire Now <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:underline"
          >
            View All Services <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Featured Projects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See some of our recent work and get inspired for your next project.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden group">
                <div className="relative h-56">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800">{project.title}</h3>
                  <p className="text-gray-600 text-sm">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:underline"
            >
              View All Projects <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
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
              Request a Quote
            </Link>
            <a
              href="tel:+63"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg border border-white/30 transition inline-flex items-center justify-center"
            >
              Call Us Now
            </a>
          </div>
          <p className="text-gray-400 text-sm mt-6">
            📍 Barangay Uno, Buenavista, Marinduque 4904
          </p>
        </div>
      </section>
    </div>
  );
}