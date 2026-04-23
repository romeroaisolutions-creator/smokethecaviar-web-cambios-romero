import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Sparkles, Leaf, Crown } from 'lucide-react';
import logoImage from '../assets/brand_logo.png';
import lifestyleImg from '../assets/pool_lifestyle.jpg';

const pillars = [
  {
    icon: Crown,
    title: 'Exclusividad',
    text: 'No fabricamos en masa. Cada pieza es una edición limitada para coleccionistas del bienestar.',
  },
  {
    icon: Leaf,
    title: 'Pureza',
    text: 'CBD premium orgánico, extracción limpia, trazabilidad total. Sin atajos.',
  },
  {
    icon: Sparkles,
    title: 'Ritual',
    text: 'No vendemos productos: diseñamos experiencias que transforman tu relación con el descanso.',
  },
];

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-header',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: '.about-header', start: 'top 85%' } }
      );

      gsap.fromTo('.about-pillar',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.pillars-grid', start: 'top 80%' },
        }
      );

      gsap.fromTo('.about-image',
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out',
          scrollTrigger: { trigger: '.about-image', start: 'top 80%' }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="nosotros"
      ref={containerRef}
      className="py-32 bg-black-carbon relative overflow-hidden border-b border-white/5 scroll-mt-20"
    >
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-gold-metallic/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="about-header text-center mb-20">
          <span className="text-gold-soft uppercase tracking-[0.3em] text-sm font-semibold mb-4 block">
            Nuestra Esencia
          </span>
          <h2 className="text-5xl md:text-6xl font-playfair mb-6">Sobre Nosotros</h2>
          <div className="w-16 h-[2px] bg-gold-metallic mx-auto"></div>
        </div>

        {/* Story block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="about-image relative rounded-2xl overflow-hidden aspect-[4/5] border border-white/5">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${lifestyleImg})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black-deep via-transparent to-transparent"></div>
            <img
              src={logoImage}
              alt="SMOKETHECAVIAR"
              className="absolute bottom-8 left-8 h-14 mix-blend-screen opacity-80"
            />
          </div>

          <div className="space-y-6">
            <p className="text-3xl md:text-4xl font-playfair leading-snug text-white-ivory">
              Nacimos para redefinir el <span className="text-gold-metallic italic">lujo</span>.
            </p>
            <p className="text-gray-smoke text-lg leading-relaxed">
              SMOKETHECAVIAR no es una marca de CBD. Es un manifiesto. Una declaración de que el verdadero estatus no se muestra: se siente.
            </p>
            <p className="text-gray-smoke text-lg leading-relaxed">
              Fusionamos botánica ancestral, diseño contemporáneo e inteligencia artificial para crear rituales de bienestar dirigidos a quienes entienden que la opulencia moderna se mide en calma, presencia y claridad mental.
            </p>
            <p className="text-gray-smoke text-lg leading-relaxed">
              Cada gota, cada textura, cada sonido de nuestros artistas generativos fue pensado para acompañar una vida donde lo exclusivo ya no es lo que tienes, sino lo que eres.
            </p>
          </div>
        </div>

        {/* Pillars */}
        <div className="pillars-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="about-pillar relative p-10 rounded-2xl bg-black-deep border border-white/5 hover:border-gold-metallic/30 transition-all duration-500 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gold-metallic/10 border border-gold-metallic/20 flex items-center justify-center mb-6 text-gold-metallic glow-gold mx-auto">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-playfair mb-3">{p.title}</h3>
                <p className="text-gray-smoke leading-relaxed text-sm">{p.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
