import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import lifestyleImg from '../assets/pool_lifestyle.jpg';
import sentirImg from '../assets/sentir.jpg';

const chapters = [
  {
    year: 'Capítulo I',
    title: 'El silencio antes del humo',
    text: 'SMOKETHECAVIAR nace de una pregunta incómoda: ¿qué queda del lujo cuando se le quita la apariencia? La respuesta que encontramos no se mostraba — se respiraba. Una pausa, un instante, una decisión consciente.',
  },
  {
    year: 'Capítulo II',
    title: 'Sombra con propósito',
    text: 'Aceptamos la oscuridad como material de trabajo. No la negamos: la usamos. Cada pieza, cada sonido y cada ritual fueron diseñados para acompañar a quienes saben que la luz solo cobra sentido cuando reconoce su sombra.',
  },
  {
    year: 'Capítulo III',
    title: 'Luz que nunca se olvida',
    text: 'Lo que dejamos en quien nos elige no es un producto: es una marca interior. Un recuerdo sensorial. Por eso curamos cada textura, cada nota y cada palabra como si fueran una sola cosa — porque lo son.',
  },
];

const HistoriaPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.historia-fade',
        { y: 40, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
        },
      );

      gsap.utils.toArray<HTMLElement>('.historia-chapter').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="pt-24 md:pt-28 pb-20 bg-transparent text-white-ivory relative overflow-hidden">
      <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-gold-metallic/5 rounded-full blur-[160px] pointer-events-none" />

      <section className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <span className="historia-fade text-gold-soft uppercase tracking-[0.3em] text-xs font-semibold mb-5 block">
            La historia
          </span>
          <h1 className="historia-fade text-5xl md:text-7xl font-playfair leading-tight mb-6">
            Antes del humo,
            <br />
            <span className="italic text-gold-metallic">existió la pregunta.</span>
          </h1>
          <p className="historia-fade max-w-2xl mx-auto text-lg text-gray-smoke leading-relaxed">
            Una marca no es un logo. Es una manera de mirar el mundo. Esta es la nuestra.
          </p>
        </div>

        {/* Quote prominent */}
        <blockquote className="historia-fade relative max-w-3xl mx-auto mb-20 md:mb-28 px-8 md:px-12 py-10 md:py-12 rounded-3xl border border-gold-metallic/30 bg-gradient-to-br from-black-carbon/50 via-transparent to-black-carbon/50 backdrop-blur-sm text-center">
          <span aria-hidden className="absolute -top-4 left-8 text-gold-metallic/70 text-6xl font-playfair leading-none select-none">"</span>
          <p className="font-cormorant italic text-2xl md:text-4xl leading-snug text-white-ivory">
            Somos sombra con propósito y luz que nunca se olvida.
          </p>
          <span aria-hidden className="absolute -bottom-8 right-8 text-gold-metallic/70 text-6xl font-playfair leading-none select-none">"</span>
        </blockquote>

        {/* Chapters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-20 md:mb-28">
          <div className="space-y-12 lg:sticky lg:top-24">
            {chapters.map((c) => (
              <article key={c.title} className="historia-chapter">
                <span className="text-xs uppercase tracking-[0.3em] text-gold-soft/80 font-semibold">
                  {c.year}
                </span>
                <h2 className="text-3xl md:text-4xl font-playfair mt-2 mb-4 text-white-ivory">
                  {c.title}
                </h2>
                <p className="text-gray-smoke leading-relaxed text-base md:text-lg">{c.text}</p>
              </article>
            ))}
          </div>

          <div className="historia-chapter grid grid-cols-1 gap-6">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-white/10 group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.4s] group-hover:scale-105"
                style={{ backgroundImage: `url(${sentirImg})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black-deep via-black-deep/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold-soft font-semibold">
                  Origen
                </span>
                <p className="font-cormorant italic text-2xl md:text-3xl text-white-ivory mt-1">
                  Nacer es elegir despertar.
                </p>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-[5/4] border border-white/10 group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.4s] group-hover:scale-105"
                style={{ backgroundImage: `url(${lifestyleImg})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black-deep via-black-deep/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold-soft font-semibold">
                  Presente
                </span>
                <p className="font-cormorant italic text-2xl md:text-3xl text-white-ivory mt-1">
                  Lo exclusivo no se exhibe — se vive.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="historia-chapter text-center">
          <p className="font-cormorant italic text-3xl md:text-5xl text-white-ivory mb-8 leading-snug">
            La historia continúa cuando alguien la habita.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/eneagrama"
              className="group relative px-7 py-4 bg-gold-metallic text-black-deep font-semibold rounded-xl overflow-hidden transition-shadow hover:glow-gold inline-flex items-center justify-center gap-2"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Conocer el Eneagrama
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gold-soft scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0" />
            </Link>
            <Link
              to="/rituales"
              className="group px-7 py-4 bg-transparent text-white-ivory border border-gold-metallic/40 rounded-xl hover:border-gold-metallic hover:bg-gold-metallic/10 hover:text-gold-metallic transition-all duration-300 font-medium inline-flex items-center justify-center gap-2"
            >
              Ver los rituales
              <ArrowRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HistoriaPage;
