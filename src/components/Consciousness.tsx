import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Moon, Wind, Flame, Eye, Infinity as InfinityIcon, Heart } from 'lucide-react';
import mysticImg from '../assets/hero_mystic_man_1776035894137.png';

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.conscious-header',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: '.conscious-header', start: 'top 85%' } }
      );

      gsap.fromTo('.practice-card',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.practices-grid', start: 'top 75%' },
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

  return (
    <section
      id="conciencia"
      ref={containerRef}
      className="py-32 bg-black-deep relative overflow-hidden border-b border-white/5 scroll-mt-20"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold-metallic/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="conscious-header text-center mb-24">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-center">
          <div
            className="aspect-[4/5] rounded-2xl bg-cover bg-center border border-white/5 glow-gold"
            style={{ backgroundImage: `url(${mysticImg})` }}
          ></div>
          <div className="space-y-6 font-cormorant">
            <p className="text-3xl md:text-4xl font-light leading-snug text-white-ivory">
              Meditar es <span className="text-gold-metallic italic">recordar</span>.
            </p>
            <p className="text-lg text-gray-smoke leading-relaxed">
              En un mundo de ruido permanente, la verdadera disrupción es el silencio. Cada respiración consciente es una revolución íntima, un regreso al centro que nunca se fue.
            </p>
            <p className="text-lg text-gray-smoke leading-relaxed">
              El yoga no es estiramiento: es unión. La meditación no es ausencia: es presencia absoluta. Nuestro CBD acompaña el descenso hacia ese estado primordial donde cuerpo y espíritu comparten la misma frecuencia.
            </p>
            <div className="pt-4 flex gap-4">
              <span className="px-4 py-2 rounded-full border border-gold-metallic/30 text-gold-soft text-xs tracking-widest uppercase">Yoga</span>
              <span className="px-4 py-2 rounded-full border border-gold-metallic/30 text-gold-soft text-xs tracking-widest uppercase">Meditación</span>
              <span className="px-4 py-2 rounded-full border border-gold-metallic/30 text-gold-soft text-xs tracking-widest uppercase">Ritual</span>
            </div>
          </div>
        </div>

        {/* Practices grid */}
        <div className="practices-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {practices.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="practice-card group relative p-8 rounded-2xl bg-black-carbon border border-white/5 hover:border-gold-metallic/30 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-full bg-gold-metallic/10 border border-gold-metallic/20 flex items-center justify-center mb-6 text-gold-metallic group-hover:glow-gold transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-playfair mb-3">{p.title}</h3>
                <p className="text-gray-smoke leading-relaxed text-sm">{p.text}</p>
              </div>
            );
          })}
        </div>

        {/* Mantras */}
        <div className="mantras-block text-center max-w-3xl mx-auto py-16 border-t border-white/5">
          <span className="text-gold-soft uppercase tracking-[0.3em] text-xs font-semibold mb-10 block">
            Mantras sagrados
          </span>
          <div className="space-y-8">
            {mantras.map((m) => (
              <div key={m.text} className="mantra-line">
                <p className="text-3xl md:text-4xl font-cormorant italic text-gold-metallic text-glow mb-1">
                  {m.text}
                </p>
                <p className="text-sm text-gray-smoke tracking-wide">{m.meaning}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Consciousness;
