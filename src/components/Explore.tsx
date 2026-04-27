import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

type Path = {
  id: string;
  label: string;
  essence: string;
  prose: string;
  companion: { name: string; category: string };
};

const paths: Path[] = [
  {
    id: 'quietud',
    label: 'Quietud',
    essence: 'Detener. Respirar. Habitar el silencio.',
    prose:
      'El primer lujo es el silencio. Un espacio donde el cuerpo se desarma, la mente se suaviza y la noche vuelve a ser templo. No se busca dormir: se busca volver.',
    companion: { name: 'Caviar Crewneck', category: 'Sudadera Sin Capucha' },
  },
  {
    id: 'energia',
    label: 'Energía',
    essence: 'Despertar lo que duerme.',
    prose:
      'Hay una chispa que el cuerpo recuerda antes de pensar. Moverse, encenderse, soltar. La energía no se toma: se libera. Y cuando fluye, todo lo demás se ordena solo.',
    companion: { name: 'Smoke Snapback', category: 'Gorra Snapback' },
  },
  {
    id: 'aroma',
    label: 'Aroma',
    essence: 'El espacio también vibra.',
    prose:
      'Lo que se huele se siente dos veces. El humo, la madera, la resina: memorias sin palabras. Un aroma bien elegido convierte una habitación en un altar, y un momento en un rito.',
    companion: { name: 'Noir Tote Bag', category: 'Tote Minimalista' },
  },
  {
    id: 'ritual',
    label: 'Ritual',
    essence: 'El gesto que vuelve sagrado lo cotidiano.',
    prose:
      'Aplicar, respirar, esperar. El ritual no está en el objeto — está en la repetición consciente. Cuando lo cotidiano se vuelve ceremonia, la piel, el aire y la intención se alinean.',
    companion: { name: 'Ritual Hoodie', category: 'Sudadera Premium' },
  },
  {
    id: 'presencia',
    label: 'Presencia',
    essence: 'Estar. Completamente.',
    prose:
      'El estado más raro. Ni recordando, ni anticipando: acá. La presencia no se fuerza, se permite. Y cuando ocurre, no necesita nada más — eso es, justamente, el lujo.',
    companion: { name: 'Caviar Tee Black', category: 'Playera Oversize' },
  },
];

const Portal = ({
  label,
  active,
  index,
  onClick,
}: {
  label: string;
  active: boolean;
  index: number;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    aria-label={`Abrir ${label}`}
    aria-pressed={active}
    className="portal-btn group flex flex-col items-center gap-4 focus:outline-none"
    data-portal-index={index}
  >
    <span
      className={`relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full border transition-all duration-500 ${
        active
          ? 'border-gold-metallic bg-gold-metallic/10 scale-110 glow-gold'
          : 'border-white/15 group-hover:border-gold-soft group-hover:scale-105'
      }`}
    >
      <span
        className={`absolute inset-2 rounded-full transition-all duration-500 ${
          active
            ? 'bg-gold-metallic/30 blur-md'
            : 'bg-transparent group-hover:bg-gold-metallic/10 group-hover:blur-sm'
        }`}
      />
      <span
        className={`relative w-2.5 h-2.5 rounded-full transition-all duration-500 ${
          active ? 'bg-gold-metallic scale-150' : 'bg-white/30 group-hover:bg-gold-soft'
        }`}
      />
    </span>
    <span
      className={`text-xs md:text-sm uppercase tracking-[0.25em] transition-colors duration-300 ${
        active ? 'text-gold-metallic font-semibold' : 'text-gray-smoke group-hover:text-white-ivory'
      }`}
    >
      {label}
    </span>
  </button>
);

const Explore = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % paths.length);
    }, 4500);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, []);

  const handleSelect = (i: number) => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
    setActiveIndex(i);
  };

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [activeIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.explore-header',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.explore-header', start: 'top 85%' },
        }
      );

      gsap.fromTo(
        '.portal-btn',
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'back.out(1.6)',
          scrollTrigger: { trigger: '.portals-row', start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const active = paths[activeIndex];

  return (
    <section
      id="explorar"
      ref={sectionRef}
      className="py-20 md:py-28 bg-black-deep relative overflow-hidden border-b border-white/5 scroll-mt-20"
    >
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold-metallic/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
        <div className="explore-header text-center mb-10 md:mb-14">
          <span className="text-gold-soft uppercase tracking-[0.3em] text-sm font-semibold mb-4 block">
            Exploración
          </span>
          <h2 className="text-4xl md:text-6xl font-playfair mb-6 text-glow">
            Elegí tu puerta de entrada
          </h2>
          <p className="text-gray-smoke max-w-2xl mx-auto text-lg leading-relaxed">
            Cinco caminos, un mismo centro. Cada puerta revela una forma distinta
            de habitar el momento. Seguí la que te llame.
          </p>
        </div>

        <div className="portals-row flex flex-wrap justify-center gap-6 md:gap-12 mb-10 md:mb-14">
          {paths.map((p, i) => (
            <Portal
              key={p.id}
              label={p.label}
              active={i === activeIndex}
              index={i}
              onClick={() => handleSelect(i)}
            />
          ))}
        </div>

        <div ref={contentRef} className="max-w-3xl mx-auto text-center">
          <span className="text-gold-metallic uppercase tracking-[0.25em] text-xs font-semibold mb-4 block">
            Puerta {activeIndex + 1} de {paths.length}
          </span>

          <h3 className="text-3xl md:text-5xl font-cormorant italic text-white-ivory mb-6 text-glow">
            {active.essence}
          </h3>

          <p className="text-gray-smoke text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            {active.prose}
          </p>

          <div className="inline-flex flex-col items-center gap-4 pt-6 border-t border-white/10 w-full max-w-md mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] text-gray-smoke">
              Acompañante del camino
            </span>

            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-full border border-gold-metallic/40 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-gold-metallic" />
              </span>
              <div className="text-left">
                <p className="text-white-ivory font-medium">{active.companion.name}</p>
                <p className="text-xs text-gray-smoke uppercase tracking-widest">
                  {active.companion.category}
                </p>
              </div>
            </div>

            <a
              href="#productos"
              className="mt-2 group inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-gold-soft hover:text-gold-metallic transition-colors"
            >
              Conocer la prenda
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Explore;
