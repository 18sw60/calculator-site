import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { calculators, categories, colorMap } from '../data/calculators';

export default function Home() {
  const featured = calculators.filter(c => c.featured);

  return (
    <>
      <Head>
        <title>CalcHub – Free Online Calculators for Math, Finance, Health & More</title>
        <meta name="description" content="CalcHub offers 100+ free online calculators for math, finance, health, time, and more. Fast, accurate, and mobile-friendly." />
        <meta property="og:title" content="CalcHub – Free Online Calculators" />
        <meta property="og:description" content="100+ free online calculators. Math, finance, health, time and more." />
        <link rel="canonical" href="https://yourcalculatorsite.com/" />
      </Head>

      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-surface-900 via-brand-900 to-surface-950 text-white py-20 sm:py-28">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-brand-400/10 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-sm font-display font-500 mb-6">
              ✦ 100% Free · No Sign-up Required
            </span>
            <h1 className="font-display font-800 text-4xl sm:text-6xl leading-tight mb-6">
              The Calculator for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-500">
                Every Calculation
              </span>
            </h1>
            <p className="text-surface-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
              Free online calculators for math, finance, health, and more. Instant results, mobile-friendly, and always accurate.
            </p>

            {/* Search bar placeholder */}
            <div className="max-w-xl mx-auto relative">
              <input
                type="text"
                placeholder="Search calculators… e.g. BMI, Compound Interest"
                className="w-full px-5 py-4 pr-14 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 font-body text-base focus:outline-none focus:bg-white/15 focus:border-brand-400 transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 text-xl">🔍</span>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="font-display font-700 text-2xl sm:text-3xl text-surface-800 mb-8 text-center">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(categories).map(([key, cat]) => {
              const count = calculators.filter(c => c.category === key).length;
              return (
                <Link
                  key={key}
                  href={`/${key}/`}
                  className="group card text-center hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="text-4xl mb-3">{cat.icon}</div>
                  <h3 className="font-display font-700 text-surface-800 group-hover:text-brand-600 transition-colors">
                    {cat.label}
                  </h3>
                  <p className="text-xs text-surface-400 mt-1">{count} calculators</p>
                  <p className="text-xs text-surface-400 mt-1 hidden sm:block">{cat.description}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Featured Calculators */}
        <section className="bg-surface-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="font-display font-700 text-2xl sm:text-3xl text-surface-800 mb-2 text-center">
              Most Popular Calculators
            </h2>
            <p className="text-surface-400 text-center mb-10">Used by millions every month</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map(calc => {
                const colors = colorMap[calc.color] || colorMap.blue;
                return (
                  <Link
                    key={calc.slug}
                    href={`/${calc.category}/${calc.slug}/`}
                    className={`group card border-2 ${colors.border} hover:-translate-y-1 transition-all duration-200`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`text-3xl p-3 rounded-xl ${colors.bg}`}>{calc.icon}</div>
                      <div className="flex-1 min-w-0">
                        <span className={`category-badge ${colors.badge} mb-1.5`}>
                          {categories[calc.category]?.icon} {categories[calc.category]?.label}
                        </span>
                        <h3 className={`font-display font-700 text-surface-800 group-hover:${colors.text} transition-colors`}>
                          {calc.title}
                        </h3>
                        <p className="text-sm text-surface-400 mt-1 line-clamp-2">{calc.description}</p>
                      </div>
                    </div>
                    <div className={`mt-4 text-sm font-display font-600 ${colors.text} flex items-center gap-1`}>
                      Use Calculator <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Us */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="font-display font-700 text-2xl sm:text-3xl text-surface-800 mb-10">
            Why CalcHub?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { icon: '⚡', title: 'Instant Results', desc: 'All calculations happen in your browser — no waiting, no server delay.' },
              { icon: '📱', title: 'Mobile Friendly', desc: 'Perfectly optimized for phones, tablets, and desktops.' },
              { icon: '🔒', title: '100% Free & Private', desc: 'No account required. Your data never leaves your device.' },
            ].map(f => (
              <div key={f.title} className="flex flex-col items-center">
                <div className="text-5xl mb-4">{f.icon}</div>
                <h3 className="font-display font-700 text-surface-800 mb-2">{f.title}</h3>
                <p className="text-surface-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
