import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Moon, Wind, Flame, Eye, Infinity as InfinityIcon, Heart } from 'lucide-react';
import sentirImg from '../assets/sentir.jpg';

const practices = [
  {
    icon: Wind,
    title: 'Pranayama',
    text: 'Respiración consciente. La puerta entre el cuerpo y el espíritu — inhala luz, exhala densidad.',
  },
  {
    icon: Moon,
    title: 'Meditación Nocturna',
    text: 'Silencio activo bajo la luna. El reino donde los pensamientos se disuelven y nace la intuición.',
  },
  {
    icon: Flame,
    title: 'Ritual del Fuego',
    text: 'Enciende una vela. Sostén la mirada. Lo que arde afuera también arde adentro.',
  },
  {
    icon: Eye,
    title: 'Tercer Ojo',
    text: 'Activa el ajna chakra. La visión interior es el lujo más antiguo y el más olvidado.',
  },
  {
    icon: InfinityIcon,
    title: 'Kundalini',
    text: 'Despierta la energía dormida en la base de tu espina. El ascenso es un acto sagrado.',
  },
  {
    icon: Heart,
    title: 'Anahata',
    text: 'El chakra del corazón como residencia del amor universal. Meditar aquí es recordar quién eres.',
  },
];

const mantras = [
  { text: 'Om Namah Shivaya', meaning: 'Me inclino ante mi propia divinidad' },
  { text: 'So Hum', meaning: 'Yo soy eso' },
  { text: 'Sat Nam', meaning: 'La verdad es mi identidad' },
];

const Consciousness = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePractice, setActivePractice] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.conscious-header',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: '.conscious-header', start: 'top 85%' } }
      );

      gsap.fromTo('.practice-pill',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: 'power3.out',
          scrollTrigger: { trigger: '.practices-row', start: 'top 80%' },
        }
      );

      gsap.fromTo('.mantra-line',
        { opacity: 0, filter: 'blur(10px)' },
        {
          opacity: 1, filter: 'blur(0px)', duration: 1.5, stagger: 0.3, ease: 'power2.out',
          scrollTrigger: { trigger: '.mantras-block', start: 'top 80%' },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const ActiveIcon = practices[activePractice].icon;

  return (
    <section
      id="conciencia"
      ref={containerRef}
      className="py-20 md:py-28 bg-black-deep relative overflow-hidden border-b border-white/5 scroll-mt-20"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold-metallic/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="conscious-header text-center mb-14 md:mb-16">
          <span className="text-gold-soft uppercase tracking-[0.3em] text-sm font-semibold mb-4 block">
            Ritual interior
          </span>
          <h2 className="text-5xl md:text-6xl font-playfair mb-6 text-glow">
            Expande tu Conciencia
          </h2>
          <p className="text-gray-smoke max-w-2xl mx-auto text-lg leading-relaxed font-cormorant italic">
            "El universo no está afuera. Tu cuerpo es el templo y la meditación es la llave."
          </p>
        </div>

        {/* Intro block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 mb-16 md:mb-20 items-center">
          <div
            className="aspect-square rounded-2xl bg-cover bg-center border border-white/5 glow-gold"
            style={{ backgroundImage: `url(${sentirImg})` }}
          ></div>
          <div className="space-y-6 font-cormorant">
            <p className="text-3xl md:text-4xl font-light leading-snug text-white-ivory">
              Meditar es <span className="text-gold-metallic italic">recordar</span>.
            </p>
            <p className="text-lg text-gray-smoke leading-relaxed">
              En un mundo de ruido permanente, la verdadera disrupción es el silencio. Cada respiración consciente es una revolución íntima, un regreso al centro que nunca se fue.
            </p>
            <p className="text-lg text-gray-smoke leading-relaxed">
              El yoga no es estiramiento: es unión. La meditación no es ausencia: es presencia absoluta. Nuestros rituales acompañan el descenso hacia ese estado primordial donde cuerpo y espíritu comparten la misma frecuencia.
            </p>
            <div className="pt-4 flex gap-4">
              <span className="px-4 py-2 rounded-full border border-gold-metallic/30 text-gold-soft text-xs tracking-widest uppercase">Yoga</span>
              <span className="px-4 py-2 rounded-full border border-gold-metallic/30 text-gold-soft text-xs tracking-widest uppercase">Meditación</span>
              <span className="px-4 py-2 rounded-full border border-gold-metallic/30 text-gold-soft text-xs tracking-widest uppercase">Ritual</span>
            </div>
          </div>
        </div>

        {/* Practices selector — interactivo, compacto */}
        <div className="mb-16 md:mb-20">
          <div className="practices-row flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
            {practices.map((p, i) => {
              const Icon = p.icon;
              const isActive = activePractice === i;
              return (
                <button
                  key={p.title}
                  onClick={() => setActivePractice(i)}
                  className={`practice-pill group inline-flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs md:text-sm uppercase tracking-[0.2em] transition-all duration-300 ${
                    isActive
                      ? 'border-gold-metallic bg-gold-metallic/10 text-gold-metallic shadow-[0_0_18px_rgba(212,175,55,0.18)]'
                      : 'border-white/10 text-gray-smoke hover:border-gold-soft/60 hover:text-white-ivory'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {p.title}
                </button>
              );
            })}
          </div>

          <div className="max-w-2xl mx-auto text-center min-h-[140px]">
            <div className="w-14 h-14 mx-auto rounded-full bg-gold-metallic/10 border border-gold-metallic/30 flex items-center justify-center text-gold-metallic glow-gold mb-5">
              <ActiveIcon className="w-6 h-6" />
            </div>
            <h3 className="text-3xl md:text-4xl font-playfair text-white-ivory mb-3 text-glow">
              {practices[activePractice].title}
            </h3>
            <p className="text-gray-smoke text-base md:text-lg leading-relaxed font-cormorant italic">
              {practices[activePractice].text}
            </p>
          </div>
        </div>

        {/* Mantras */}
        <div className="mantras-block text-center max-w-3xl mx-auto py-10 md:py-12 border-t border-white/5">
          <span className="text-gold-soft uppercase tracking-[0.3em] text-xs font-semibold mb-6 md:mb-8 block">
            Mantras sagrados
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mantras.map((m) => (
              <div key={m.text} className="mantra-line">
                <p className="text-2xl md:text-3xl font-cormorant italic text-gold-metallic text-glow mb-1">
                  {m.text}
                </p>
                <p className="text-xs text-gray-smoke tracking-wide">{m.meaning}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Consciousness;
