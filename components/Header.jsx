import Link from 'next/link';
import { useState } from 'react';
import { categories } from '../data/calculators';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-surface-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="text-white font-display font-800 text-lg">C</span>
            </div>
            <span className="font-display font-700 text-xl text-surface-900">
              Calc<span className="text-brand-500">Hub</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {Object.entries(categories).map(([key, cat]) => (
              <Link
                key={key}
                href={`/${key}/`}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-display font-500 text-surface-600 hover:text-brand-600 hover:bg-brand-50 transition-all duration-150"
              >
                <span>{cat.icon}</span>
                {cat.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-surface-100 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-5 flex flex-col justify-center gap-1.5">
              <span className={`block h-0.5 bg-surface-700 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-surface-700 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-surface-700 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden py-3 border-t border-surface-100">
            {Object.entries(categories).map(([key, cat]) => (
              <Link
                key={key}
                href={`/${key}/`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-display font-500 text-surface-700 hover:text-brand-600 hover:bg-brand-50 transition-all"
              >
                <span className="text-lg">{cat.icon}</span>
                {cat.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
