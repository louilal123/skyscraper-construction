// src/pages/Mission.tsx
import { Link } from 'react-router-dom';
import {
  CheckBadgeIcon,
  HeartIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

export default function Mission() {
  const values = [
    {
      title: 'Integrity',
      description: 'We conduct business with honesty and transparency, building trust with every project.',
      icon: ShieldCheckIcon,
    },
    {
      title: 'Excellence',
      description: 'We strive for superior quality in materials, workmanship, and customer service.',
      icon: CheckBadgeIcon,
    },
    {
      title: 'Innovation',
      description: 'We embrace modern techniques and sustainable practices to deliver better results.',
      icon: LightBulbIcon,
    },
    {
      title: 'Teamwork',
      description: 'We collaborate closely with clients, architects, and engineers to achieve shared goals.',
      icon: UserGroupIcon,
    },
    {
      title: 'Safety',
      description: 'We maintain the highest safety standards on every job site, protecting our workers and clients.',
      icon: WrenchScrewdriverIcon,
    },
    {
      title: 'Community',
      description: 'We are committed to improving the communities where we live and build.',
      icon: HeartIcon,
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-800 to-gray-900 text-white py-16 md:py-20">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Construction background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Mission & Vision</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Guided by strong principles and a clear purpose, we're building more than structures — we're building trust.
          </p>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="container mx-auto px-4 py-12 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Mission Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-500 p-3 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              To deliver high-quality, innovative, and sustainable construction and engineering solutions, building lasting value for our clients and community.
            </p>
            <p className="text-gray-600">
              Every project we undertake is approached with precision, care, and a commitment to exceeding expectations.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-2xl shadow-lg border border-orange-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gray-800 p-3 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Our Vision</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              To be Marinduque's most trusted partner in construction, recognized for our expertise, integrity, and commitment to excellence.
            </p>
            <p className="text-gray-600">
              We envision a future where Skyscraper is synonymous with quality and reliability in every community we serve.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Our Core Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The principles that guide our work and relationships every single day.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
              <div className="bg-orange-100 h-12 w-12 rounded-lg flex items-center justify-center mb-4">
                <value.icon className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
              <p className="text-gray-600 text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 mt-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Let's Build Something Great Together</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Contact us today to discuss your project and experience the Skyscraper difference.
          </p>
          <Link
            to="/contact"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-lg shadow-lg transition inline-flex items-center gap-2"
          >
            Get a Free Quote
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}