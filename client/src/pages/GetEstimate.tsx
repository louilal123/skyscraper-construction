// src/pages/GetEstimate.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function GetEstimate() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation you would send the data to your backend or a Google Sheet
    // For now we simply show a thank‑you message with a Messenger fallback
    setSubmitted(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">Request a Free Estimate</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Tell us about your project and we’ll provide a transparent estimate within 24 hours.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-1 text-orange-600 mb-6 hover:underline">
            <ArrowLeftIcon className="h-4 w-4" /> Back to Home
          </Link>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input type="text" required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input type="tel" required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Location</label>
                  <input type="text" placeholder="e.g., Buenavista, Marinduque" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent">
                    <option value="">Select...</option>
                    <option>New Home Construction</option>
                    <option>Home Renovation</option>
                    <option>House Addition</option>
                    <option>Commercial Building</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brief Description / Budget (optional)</label>
                  <textarea rows={3} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent"></textarea>
                </div>
                <button type="submit" className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl shadow-sm transition">
                  Send Request
                </button>
                <p className="text-xs text-gray-500 text-center">
                  Or <a href="https://m.me/SkyscraperCES" target="_blank" rel="noopener noreferrer" className="text-orange-600 underline">message us on Messenger</a> for a quick chat.
                </p>
              </form>
            ) : (
              <div className="text-center py-10">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Request Sent!</h2>
                <p className="text-gray-600 mb-6">
                  We’ve received your details. Expect a call or message within 24 hours with your free estimate.
                </p>
                <a
                  href="https://m.me/SkyscraperCES"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg inline-flex items-center gap-2"
                >
                  Chat on Messenger
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}