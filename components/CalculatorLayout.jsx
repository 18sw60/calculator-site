import Head from 'next/head';
import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';
import { categories, colorMap, getRelated } from '../data/calculators';

export default function CalculatorLayout({ calculator, children }) {
  const {
    title, description, metaDescription, keywords,
    category, slug, color = 'blue', icon, faqs = []
  } = calculator;

  const cat = categories[category];
  const related = getRelated(slug);
  const colors = colorMap[color] || colorMap.blue;

  // JSON-LD structured data for SEO rich results
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": title,
        "description": metaDescription,
        "url": `https://yourcalculatorsite.com/${category}/${slug}/`,
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      },
      faqs.length > 0 && {
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      }
    ].filter(Boolean)
  };

  return (
    <>
      <Head>
        <title>{title} – Free Online Calculator | CalcHub</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={keywords.join(', ')} />
        <meta property="og:title" content={`${title} | CalcHub`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <link rel="canonical" href={`https://yourcalculatorsite.com/${category}/${slug}/`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <Header />

      <main className="min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-surface-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-surface-400" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
              <span>›</span>
              <Link href={`/${category}/`} className="hover:text-brand-500 transition-colors capitalize">
                {cat?.label}
              </Link>
              <span>›</span>
              <span className="text-surface-600 font-500">{title}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className={`${colors.bg} border-b ${colors.border}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
            <div className="flex items-start gap-4">
              <div className={`text-4xl`}>{icon}</div>
              <div>
                <span className={`category-badge ${colors.badge} mb-2`}>
                  {cat?.icon} {cat?.label}
                </span>
                <h1 className="font-display font-800 text-3xl sm:text-4xl text-surface-900 mt-1">
                  {title}
                </h1>
                <p className="mt-2 text-surface-500 text-lg leading-relaxed max-w-2xl">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Calculator + Sidebar */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main calculator */}
            <div className="lg:col-span-2 space-y-8">
              <div className="card">
                {children}
              </div>

              {/* FAQs */}
              {faqs.length > 0 && (
                <div>
                  <h2 className="font-display font-700 text-xl text-surface-800 mb-4">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {faqs.map((faq, i) => (
                      <details key={i} className="card cursor-pointer group">
                        <summary className="font-display font-600 text-surface-800 list-none flex justify-between items-center">
                          {faq.q}
                          <span className="text-brand-400 ml-4 group-open:rotate-180 transition-transform text-xl">↓</span>
                        </summary>
                        <p className="mt-3 text-surface-500 leading-relaxed text-sm">
                          {faq.a}
                        </p>
                      </details>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Ad placeholder */}
              <div className="rounded-2xl border-2 border-dashed border-surface-200 p-6 text-center">
                <p className="text-xs text-surface-300 font-mono uppercase tracking-widest">Advertisement</p>
                <div className="h-32 flex items-center justify-center">
                  <p className="text-surface-200 text-sm">Ad Space (300×250)</p>
                </div>
              </div>

              {/* Related calculators */}
              {related.length > 0 && (
                <div>
                  <h3 className="font-display font-700 text-base text-surface-700 mb-3">Related Calculators</h3>
                  <div className="space-y-2">
                    {related.map(r => {
                      const rc = colorMap[r.color] || colorMap.blue;
                      return (
                        <Link
                          key={r.slug}
                          href={`/${r.category}/${r.slug}/`}
                          className={`flex items-center gap-3 p-3 rounded-xl border ${rc.border} ${rc.bg} hover:shadow-md transition-all duration-200 group`}
                        >
                          <span className="text-xl">{r.icon}</span>
                          <div>
                            <p className={`text-sm font-display font-600 ${rc.text}`}>{r.shortTitle}</p>
                            <p className="text-xs text-surface-400 line-clamp-1">{r.description.slice(0, 50)}…</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
