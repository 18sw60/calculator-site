import Link from 'next/link';
import { categories, calculators } from '../data/calculators';

export default function Footer() {
  return (
    <footer className="bg-surface-900 text-surface-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                <span className="text-white font-display font-800 text-lg">C</span>
              </div>
              <span className="font-display font-700 text-xl text-white">
                Calc<span className="text-brand-400">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-surface-400 leading-relaxed max-w-xs">
              Free online calculators for math, finance, health, and more. Fast, accurate, and mobile-friendly.
            </p>
          </div>

          {/* Category columns */}
          {Object.entries(categories).map(([key, cat]) => (
            <div key={key}>
              <h3 className="font-display font-600 text-white mb-3 flex items-center gap-1.5">
                <span>{cat.icon}</span> {cat.label}
              </h3>
              <ul className="space-y-2">
                {calculators
                  .filter(c => c.category === key)
                  .slice(0, 5)
                  .map(c => (
                    <li key={c.slug}>
                      <Link
                        href={`/${c.category}/${c.slug}/`}
                        className="text-sm text-surface-400 hover:text-brand-400 transition-colors"
                      >
                        {c.shortTitle} Calculator
                      </Link>
                    </li>
                  ))}
                <li>
                  <Link href={`/${key}/`} className="text-sm text-brand-400 hover:text-brand-300 transition-colors font-500">
                    View all →
                  </Link>
                </li>
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-surface-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-surface-500">
            © {new Date().getFullYear()} CalcHub. All calculators are for informational purposes only.
          </p>
          <div className="flex gap-6 text-xs text-surface-500">
            <Link href="/privacy/" className="hover:text-surface-300 transition-colors">Privacy Policy</Link>
            <Link href="/about/" className="hover:text-surface-300 transition-colors">About</Link>
            <Link href="/contact/" className="hover:text-surface-300 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
