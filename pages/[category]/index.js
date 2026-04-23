import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { calculators, categories, colorMap } from '../../data/calculators';

export async function getStaticPaths() {
  return {
    paths: Object.keys(categories).map(cat => ({ params: { category: cat } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return { props: { category: params.category } };
}

export default function CategoryPage({ category }) {
  const cat = categories[category];
  const calcs = calculators.filter(c => c.category === category);

  return (
    <>
      <Head>
        <title>{cat.label} Calculators – Free Online Tools | CalcHub</title>
        <meta name="description" content={`Free online ${cat.label.toLowerCase()} calculators. ${cat.description}. Fast, accurate, and mobile-friendly.`} />
        <link rel="canonical" href={`https://yourcalculatorsite.com/${category}/`} />
      </Head>

      <Header />

      <main>
        {/* Hero */}
        <div className="bg-gradient-to-br from-surface-900 to-surface-800 text-white py-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-5xl mb-4">{cat.icon}</div>
            <h1 className="font-display font-800 text-3xl sm:text-4xl mb-3">
              {cat.label} Calculators
            </h1>
            <p className="text-surface-300 text-lg max-w-xl">{cat.description}</p>
          </div>
        </div>

        {/* Calculators Grid */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <p className="text-surface-400 text-sm mb-6">{calcs.length} calculators in this category</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {calcs.map(calc => {
              const colors = colorMap[calc.color] || colorMap.blue;
              return (
                <Link
                  key={calc.slug}
                  href={`/${category}/${calc.slug}/`}
                  className={`group card border-2 ${colors.border} hover:-translate-y-1 transition-all duration-200`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`text-3xl p-3 rounded-xl ${colors.bg} shrink-0`}>{calc.icon}</div>
                    <div>
                      <h2 className={`font-display font-700 text-surface-800 group-hover:${colors.text} transition-colors`}>
                        {calc.title}
                      </h2>
                      <p className="text-sm text-surface-400 mt-1 leading-relaxed">{calc.description}</p>
                    </div>
                  </div>
                  <div className={`mt-4 text-sm font-display font-600 ${colors.text} flex items-center gap-1`}>
                    Open Calculator <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
