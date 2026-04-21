// src/pages/ServiceDetail.tsx
import { useParams, Link } from 'react-router-dom';
import { servicesData } from './Services';
import { ArrowLeftIcon, PhoneIcon } from '@heroicons/react/24/outline';

export default function ServiceDetail() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = servicesData.find(s => s.id === serviceId);

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Service not found</h2>
        <Link to="/services" className="text-orange-600 mt-4 inline-block">Back to Services</Link>
      </div>
    );
  }

  const ServiceIcon = service.icon;

  return (
    <div className="bg-gray-50">
      {/* Hero with Image */}
      <section className="relative h-64 md:h-80">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <ServiceIcon className="h-12 w-12 mx-auto mb-3 text-orange-400" />
            <h1 className="text-3xl md:text-4xl font-bold">{service.title}</h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <Link to="/services" className="inline-flex items-center gap-1 text-orange-600 mb-6 hover:underline">
            <ArrowLeftIcon className="h-4 w-4" /> Back to all services
          </Link>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-6">{service.longDescription}</p>
            
            <h3 className="text-xl font-bold text-gray-800 mb-3">What We Offer</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Professional consultation and site assessment</li>
              <li>Detailed project planning and budgeting</li>
              <li>Quality materials and skilled workmanship</li>
              <li>Permit processing and code compliance</li>
              <li>Timely project completion and cleanup</li>
            </ul>

            <div className="border-t border-gray-200 pt-6 mt-6 flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-sm transition inline-flex items-center justify-center gap-2"
              >
                <PhoneIcon className="h-5 w-5" />
                Request a Quote
              </Link>
              <a
                href="https://m.me/SkyscraperCES"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-sm transition inline-flex items-center justify-center gap-2"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.145 2 11.033c0 2.585 1.332 4.93 3.518 6.552V22l3.862-2.365c.87.24 1.78.365 2.62.365 5.523 0 10-4.145 10-9.033S17.523 2 12 2z" />
                </svg>
                Message on Messenger
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}