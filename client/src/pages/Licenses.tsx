// src/pages/Licenses.tsx
import { DocumentTextIcon, CheckBadgeIcon, PhotoIcon } from '@heroicons/react/24/outline';

export default function Licenses() {
  const licenses = [
    {
      title: 'SEC Registration',
      number: 'CS202412345',
      description: 'Securities and Exchange Commission Registration',
      imageUrl: null,
    },
    {
      title: 'PCAB License',
      number: 'PCAB-2024-12345',
      description: 'Philippine Contractors Accreditation Board',
      imageUrl: null,
    },
    {
      title: 'BIR Certificate of Registration',
      number: 'BIR-123-456-789',
      description: 'Bureau of Internal Revenue Registration',
      imageUrl: null,
    },
    {
      title: "Mayor's Permit",
      number: 'MP-2024-001',
      description: 'Municipal Business Permit - Buenavista, Marinduque',
      imageUrl: null,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-800 to-gray-900 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <DocumentTextIcon className="h-12 w-12 mx-auto mb-4 text-orange-400" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Licenses & Certifications</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Skyscraper Construction is fully licensed, registered, and compliant with all regulatory requirements.
          </p>
        </div>
      </section>

      {/* License Cards */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {licenses.map((license, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <CheckBadgeIcon className="h-6 w-6 text-green-700" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{license.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{license.number}</p>
                  <p className="text-gray-600 mt-2">{license.description}</p>
                  {license.imageUrl ? (
                    <img src={license.imageUrl} alt={license.title} className="mt-4 rounded border" />
                  ) : (
                    <div className="mt-4 bg-gray-100 border border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <PhotoIcon className="h-6 w-6 mx-auto text-gray-400" />
                      <p className="text-xs text-gray-500 mt-1">Document image available upon request</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Verification Note */}
      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-3xl mx-auto bg-orange-50 border border-orange-200 rounded-xl p-6 text-center">
          <p className="text-gray-700">
            All licenses and permits are valid and current. For verification or to request copies, please{' '}
            <a href="/contact" className="text-orange-600 font-medium hover:underline">contact us</a>.
          </p>
        </div>
      </section>
    </div>
  );
}