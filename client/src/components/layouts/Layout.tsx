// src/components/layout/Layout.tsx
import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  HomeIcon,
  WrenchScrewdriverIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  Bars3Icon,
  XMarkIcon,
  FlagIcon,
  PhoneIcon,
  MapPinIcon,
  CheckBadgeIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import logoImage from '../../assets/logo_sky.jpg';
import ChatBot from '../../components/chat/ChatBot';
import CookieConsent from '../../components/common/CookieConsent';

export default function Layout() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeDrawer = () => setMobileDrawerOpen(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Services', href: '/services', icon: WrenchScrewdriverIcon },
    { name: 'Projects', href: '/projects', icon: BuildingOfficeIcon },
    { name: 'Mission & Vision', href: '/mission', icon: FlagIcon },
    { name: 'Licenses', href: '/licenses', icon: DocumentTextIcon },
  ];

  const trustItems = [
    { label: 'PCAB Licensed', icon: CheckBadgeIcon },
    { label: 'SEC Registered', icon: CheckBadgeIcon },
    { label: '10+ Years of Excellence', icon: CheckBadgeIcon },
    { label: '100+ Projects Completed', icon: CheckBadgeIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">

      {/* ── Trust Bar (desktop only) ── */}
      <div className="hidden md:block bg-blue-900 text-gray-200 text-xs py-2 border-b border-gray-700">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Left: trust badges */}
          <div className="flex items-center gap-6">
            {trustItems.map((item) => (
              <span key={item.label} className="flex items-center gap-1.5">
                <CheckBadgeIcon className="h-3.5 w-3.5 text-orange-400 shrink-0" />
                <span className="tracking-wide">{item.label}</span>
              </span>
            ))}
          </div>
          {/* Right: phone */}
          <a
            href="tel:09480498948"
            className="flex items-center gap-1.5 hover:text-orange-400 transition-colors"
          >
            <PhoneIcon className="h-3.5 w-3.5" />
            <span className="font-medium">09480498948</span>
          </a>
        </div>
      </div>

      {/* ── Sticky Header ── */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/98 backdrop-blur-md shadow-md border-b border-gray-200'
            : 'bg-white/98 backdrop-blur-sm border-b border-gray-100'
        }`}
      >
        {/* Desktop Navigation */}
        <div className="hidden md:block container mx-auto px-4">
          <div className="flex items-center justify-between h-[4.5rem]">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <img
                src={logoImage}
                alt="Skyscraper Construction and Engineering Services"
                className="h-14 w-auto object-contain"
              />
            </Link>

            {/* Nav Links */}
            <nav className="flex items-center gap-0.5">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-all duration-150 font-medium text-sm"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Primary CTA */}
            <Link
              to="/get-estimate"
              className="group flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm"
            >
              
              Get Free Estimate <ArrowRightIcon className="h-4 w-4" />
              <ArrowRightIcon className="h-4 w-4 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
            </Link>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden">
          <div className="px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img
                src={logoImage}
                alt="Skyscraper"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <div className="flex items-center gap-2">
             
              <button
                onClick={() => setMobileDrawerOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg"
                aria-label="Open menu"
              >
                <Bars3Icon className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Slide-out Drawer ── */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          mobileDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={closeDrawer}
        />

        {/* Drawer Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-72 max-w-[85%] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${
            mobileDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="p-5 bg-gray-900 text-white shrink-0">
            <div className="flex items-center justify-between mb-3">
              <img
                src={logoImage}
                alt="Skyscraper"
                className="h-8 w-auto object-contain bg-white p-1 rounded"
              />
              <button
                onClick={closeDrawer}
                className="p-1.5 hover:bg-gray-700 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs text-gray-300 font-medium">Construction & Engineering Services</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="flex items-center gap-1 text-xs text-orange-400">
                <CheckBadgeIcon className="h-3.5 w-3.5" /> PCAB Licensed
              </span>
              <span className="flex items-center gap-1 text-xs text-orange-400">
                <CheckBadgeIcon className="h-3.5 w-3.5" /> SEC Registered
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="p-3 flex-1 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={closeDrawer}
                className="flex items-center gap-3 px-4 py-3.5 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors font-medium mb-0.5"
              >
                <item.icon className="h-5 w-5 text-gray-400" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Drawer Footer: Primary CTA */}
          <div className="p-4 border-t border-gray-100 bg-gray-50 shrink-0">
            <Link
              to="/get-estimate"
              onClick={closeDrawer}
              className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-3.5 rounded-lg shadow-md transition-colors text-sm"
            >
              <ArrowRightIcon className="h-5 w-5" />
              Get Free Estimate
            </Link>
            <a
              href="tel:09480498948"
              className="flex items-center justify-center gap-2 w-full mt-2 border border-gray-300 hover:border-orange-400 hover:text-orange-600 text-gray-600 font-medium py-3 rounded-lg transition-colors text-sm"
            >
              <PhoneIcon className="h-4 w-4" />
              09480498948
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ── Footer ── */}
      <footer className="bg-gray-900 text-white">
        {/* Footer CTA Band */}
        <div className="bg-orange-500">
          <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-white font-bold text-xl leading-tight">
                Ready to build something exceptional?
              </p>
              <p className="text-orange-100 text-sm mt-1">
                Get a free, no-obligation estimate for your project today.
              </p>
            </div>
            <Link
              to="/get-estimate"
              className="shrink-0 flex items-center gap-2 bg-white text-orange-600 hover:bg-orange-50 font-bold px-7 py-3.5 rounded-lg shadow-md transition-colors text-sm"
            >
              <ArrowRightIcon className="h-5 w-5" />
              Get Free Estimate
            </Link>
          </div>
        </div>

        {/* Footer Body */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Company */}
            <div>
              <img
                src={logoImage}
                alt="Skyscraper"
                className="h-12 w-auto object-contain bg-white/10 p-2 rounded mb-4"
              />
              <p className="text-gray-400 text-sm leading-relaxed">
                Skyscraper Construction and Engineering Services is a PCAB-licensed, SEC-registered design-and-build firm serving Marinduque and surrounding regions with over a decade of proven excellence.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {['PCAB Licensed', 'SEC Registered', '10+ Years'].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs bg-white/10 text-gray-300 px-3 py-1 rounded-full border border-white/10"
                  >
                    <CheckBadgeIcon className="h-3 w-3 text-orange-400" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2.5 text-sm">
                {[
                  { label: 'Services', href: '/services' },
                  { label: 'Projects', href: '/projects' },
                  { label: 'Mission & Vision', href: '/mission' },
                  { label: 'Licenses', href: '/licenses' },
                  { label: 'Get Free Estimate', href: '/get-estimate' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-orange-500 rounded-full shrink-0" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                Contact Us
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2.5 text-gray-400">
                  <MapPinIcon className="h-4 w-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>Barangay Uno, Buenavista,<br />Marinduque 4904, Philippines</span>
                </li>
                <li>
                  <a
                    href="tel:09480498948"
                    className="flex items-center gap-2.5 text-gray-400 hover:text-orange-400 transition-colors"
                  >
                    <PhoneIcon className="h-4 w-4 text-orange-400 shrink-0" />
                    09480498948
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} Skyscraper Construction and Engineering Services. All rights reserved.</p>
            <p className="text-gray-600">PCAB Licensed · SEC Registered · Marinduque, Philippines</p>
          </div>
        </div>
      </footer>

      <ChatBot />
      <CookieConsent />
    </div>
  );
}