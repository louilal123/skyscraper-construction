import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  HomeIcon,
  WrenchScrewdriverIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  Bars3Icon,
  XMarkIcon,FlagIcon,
} from '@heroicons/react/24/outline';
import logoImage from '../../assets/logo_sky.jpg';

export default function Layout() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const closeDrawer = () => setMobileDrawerOpen(false);

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Services', href: '/services', icon: WrenchScrewdriverIcon },
    { name: 'Projects', href: '/projects', icon: BuildingOfficeIcon },
    { name: 'Mission & Vision', href: '/mission', icon: FlagIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        {/* Desktop Navigation */}
        <div className="hidden md:block container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo / Brand */}
            <Link to="/" className="flex items-center gap-3 shrink-0 group">
              <img 
                src={logoImage} 
                alt="Skyscraper Construction and Engineering Services" 
                className="h-12 w-auto object-contain"
              />
              
            </Link>

            {/* Nav Links */}
            <nav className="flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition font-medium"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <Link
              to="/contact"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-lg shadow-sm transition flex items-center gap-2"
            >
              <PhoneIcon className="h-5 w-5" />
            Contact Us
            </Link>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden">
          <div className="px-4 h-16 flex items-center justify-between">
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-lg"
              aria-label="Open menu"
            >
              <Bars3Icon className="h-6 w-6 text-gray-700" />
            </button>

            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <BuildingOfficeIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-800">SKYSCRAPER</span>
            </Link>

            <Link
              to="/contact"
              className="bg-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-lg"
            >
              Quote
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Slide‑out Drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          mobileDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/50" onClick={closeDrawer} />
        <div
          className={`absolute left-0 top-0 h-full w-72 max-w-[85%] bg-white shadow-xl transform transition-transform duration-300 ${
            mobileDrawerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
            <div className="flex items-center gap-2 mb-2">
              <BuildingOfficeIcon className="h-6 w-6 text-orange-400" />
              <span className="font-bold text-lg">SKYSCRAPER</span>
            </div>
            <p className="text-xs text-gray-300">Construction & Engineering Services</p>
            <p className="text-xs text-gray-400 mt-1">PCAB Licensed</p>
            <button
              onClick={closeDrawer}
              className="absolute top-4 right-4 p-1 hover:bg-gray-700 rounded-full"
              aria-label="Close menu"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          <nav className="p-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={closeDrawer}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition font-medium"
              >
                <item.icon className="h-5 w-5 text-gray-500" />
                <span>{item.name}</span>
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link
                to="/contact"
                onClick={closeDrawer}
                className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow-sm"
              >
                Request a Quote
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-8">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-3">Skyscraper Construction</h3>
              <p className="text-gray-300 text-sm">
                PCAB Licensed. Design & Build specialists serving Marinduque and beyond.
              </p>
              <p className="text-gray-400 text-xs mt-4">SEC Registered</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/services" className="text-gray-300 hover:text-orange-400">Services</Link></li>
                <li><Link to="/projects" className="text-gray-300 hover:text-orange-400">Projects</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-orange-400">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Contact Us</h3>
              <p className="text-gray-300 text-sm"> We are located in Barangay Uno, Buenavista, Marinduque 4904</p>
              <p className="text-gray-300 text-sm mt-2"> Call or message us for inquiries: 09480498948</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Skyscraper Construction and Engineering Services. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}