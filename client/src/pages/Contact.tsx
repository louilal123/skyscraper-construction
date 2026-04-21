// src/pages/Contact.tsx

import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

export default function Contact() {
  const contactInfo = [
    {
      icon: PhoneIcon,
      label: 'Phone',
      value: '+63 912 345 6789', // Replace with actual number
      link: 'tel:+639123456789',
     
    },
    {
      icon: EnvelopeIcon,
      label: 'Email',
      value: 'info@skyscraperconstruction.ph',
      link: 'mailto:info@skyscraperconstruction.ph',
     
    },
    {
      icon: BuildingOfficeIcon,
      label: 'Facebook',
      value: 'SkyscraperCES',
      link: 'https://www.facebook.com/SkyscraperCES',
     
    },
    {
      icon: MapPinIcon,
      label: 'Office Address',
      value: 'Barangay Uno, Buenavista, Marinduque 4904',
      link: 'https://maps.google.com/?q=Barangay+Uno,+Buenavista,+Marinduque+4904',
      
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Have a project in mind? We're ready to help you build it. Reach out today.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="container mx-auto px-4 py-12 -mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {contactInfo.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              target={item.label === 'Facebook' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition group"
            >
              <div className={`${item.color} h-12 w-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition`}>
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">{item.label}</h3>
              <p className="text-gray-600 text-sm break-words">{item.value}</p>
              <span className="text-orange-600 text-xs font-medium mt-2 inline-block opacity-0 group-hover:opacity-100 transition">
                Click to connect →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Google Map Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <MapPinIcon className="h-6 w-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-gray-800">Our Location</h2>
            </div>
            <p className="text-gray-600 mb-4 flex items-center gap-2">
              <span className="font-semibold">Office Address:</span> Barangay Uno, Buenavista, Marinduque 4904, Philippines
            </p>
            {/* Embedded Google Map */}
            <div className="rounded-lg overflow-hidden border border-gray-200 h-96 w-full">
              <iframe
                title="Skyscraper Construction Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.123456789012!2d121.123456!3d13.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA3JzI0LjQiTiAxMjHCsDA3JzI0LjQiRQ!5e0!3m2!1sen!2sph!4v1610000000000!5m2!1sen!2sph"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              ⚠️ Note: The map above uses placeholder coordinates. For production, replace the iframe src with the exact Google Maps embed link for Barangay Uno, Buenavista, Marinduque.
            </p>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <ClockIcon className="h-6 w-6 text-orange-500" />
            <h3 className="text-xl font-bold text-gray-800">Business Hours</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <div>
              <p className="font-medium">Monday - Friday</p>
              <p>8:00 AM - 5:00 PM</p>
            </div>
            <div>
              <p className="font-medium">Saturday</p>
              <p>8:00 AM - 12:00 PM</p>
            </div>
            <div>
              <p className="font-medium">Sunday</p>
              <p>Closed</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            * We are also available by phone and email outside business hours for urgent inquiries.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 mt-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Message us on Facebook for a quick response or give us a call to schedule a consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://m.me/SkyscraperCES"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-lg shadow-lg transition inline-flex items-center justify-center gap-2"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.145 2 11.033c0 2.585 1.332 4.93 3.518 6.552V22l3.862-2.365c.87.24 1.78.365 2.62.365 5.523 0 10-4.145 10-9.033S17.523 2 12 2z" />
              </svg>
              Message us on Messenger
            </a>
            <a
              href="tel:+639123456789"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-lg shadow-lg transition inline-flex items-center justify-center gap-2"
            >
              <PhoneIcon className="h-5 w-5" />
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}