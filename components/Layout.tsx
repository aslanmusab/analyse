import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isSimplePage = ['/start', '/analyseren', '/vragen'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="font-bold text-xl tracking-tight text-slate-900">
            Channel Fit Finder
          </Link>
          {!isSimplePage && (
            <Link to="/start" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">
              Nieuwe analyse
            </Link>
          )}
        </div>
      </header>

      <main className="flex-grow flex flex-col">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-8 text-sm">
             <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
             <Link to="/voorbeeld" className="hover:text-white transition-colors">Voorbeeldrapport</Link>
          </div>
          <p className="text-xs text-slate-600">
            Powered by <span className="font-semibold text-slate-500">framboos.io</span>
          </p>
        </div>
      </footer>
    </div>
  );
};