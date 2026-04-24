// src/components/common/CookieConsent.tsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      timerRef.current = setTimeout(() => setVisible(true), 5000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleConsent = useCallback((type: 'all' | 'necessary') => {
    localStorage.setItem('cookie_consent', type);
    // Trigger exit animation
    setExiting(true);
    // Remove from DOM after animation
    setTimeout(() => {
      setVisible(false);
      setExiting(false);
    }, 300); // match duration-300
  }, []);

  // Not rendered at all if consent already given
  if (!visible) return null;

  const isActive = visible && !exiting;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6 pointer-events-none">
      <div
        className={`
          max-w-7xl mx-auto pointer-events-auto
          transform transition-all duration-300 ease-out
          ${isActive ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'}
        `}
      >
        <div className="bg-white/80 backdrop-blur-md border border-gray-200/60 rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Message */}
          <div className="flex-1 text-sm text-gray-700 leading-relaxed">
            <p>
              We use cookies and similar technologies to improve your experience,
              show you relevant content, and analyze our traffic.
              By clicking “Accept All”, you consent to our use of cookies.{' '}
              <a href="/privacy-policy" className="text-orange-600 underline hover:no-underline whitespace-nowrap cursor-pointer">
                Learn more
              </a>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => handleConsent('necessary')}
              className="px-4 py-2 text-sm font-medium text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
            >
              Only necessary
            </button>
            <button
              onClick={() => handleConsent('all')}
              className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white cursor-pointer text-sm font-medium rounded-xl shadow-sm transition-colors"
            >
              Accept all
            </button>
            <button
              onClick={() => handleConsent('necessary')}
              className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}