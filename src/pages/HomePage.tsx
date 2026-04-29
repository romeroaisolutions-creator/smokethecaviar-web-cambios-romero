import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Hero from '../components/Hero';
import { useLang } from '../context/LanguageContext';

const routes = ['/historia', '/eneagrama', '/sentir', '/explorar', '/sonido', '/rituales'];

const HomePage = () => {
  const { t } = useLang();

  return (
    <>
      <Hero />

      <section className="py-20 md:py-24 bg-black-deep relative overflow-hidden border-b border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold-metallic/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="text-center mb-12">
            <span className="text-gold-soft uppercase tracking-[0.3em] text-xs font-semibold mb-4 block">
              {t.home.sectionLabel}
            </span>
            <h2 className="text-4xl md:text-5xl font-playfair text-white-ivory">
              {t.home.sectionTitle}
            </h2>
            <div className="w-16 h-[2px] bg-gold-metallic mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {t.home.cards.map((card, i) => (
              <Link
                key={routes[i]}
                to={routes[i]}
                className="group relative p-7 md:p-8 rounded-2xl border border-white/10 bg-black-carbon/40 hover:border-gold-metallic/60 hover:bg-black-carbon/70 transition-all duration-500 overflow-hidden will-change-transform hover:-translate-y-1"
              >
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gold-metallic/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative z-10 flex items-start justify-between mb-4">
                  <h3 className="text-2xl md:text-3xl font-playfair text-white-ivory group-hover:text-gold-metallic transition-colors duration-300">
                    {card.label}
                  </h3>
                  <span className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white-ivory group-hover:border-gold-metallic group-hover:text-gold-metallic group-hover:rotate-45 transition-all duration-500">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>

                <p className="relative z-10 text-sm text-gray-smoke leading-relaxed">
                  {card.desc}
                </p>

                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-gold-soft via-gold-metallic to-gold-soft group-hover:w-full transition-all duration-500" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
