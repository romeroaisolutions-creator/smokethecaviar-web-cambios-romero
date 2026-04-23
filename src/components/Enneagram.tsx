import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/* ── Pillar data mapped to the 9 Enneagram points ── */
const pillars = [
  { label: 'Cuerpo',       description: 'El templo físico. Donde el ritual comienza y la transformación se ancla.' },
  { label: 'Mente',        description: 'Claridad sin ruido. El pensamiento elevado que precede toda creación.' },
  { label: 'Espíritu',     description: 'La chispa invisible que conecta todo. Presencia pura, sin forma.' },
  { label: 'Emoción',      description: 'Sentir sin miedo. La inteligencia del corazón como brújula.' },
  { label: 'Voluntad',     description: 'La fuerza silenciosa que sostiene cada decisión consciente.' },
  { label: 'Conexión',     description: 'El hilo dorado entre almas que vibran en la misma frecuencia.' },
  { label: 'Abundancia',   description: 'Equilibrio entre lo espiritual y lo material. Recibir sin culpa.' },
  { label: 'Conciencia',   description: 'Despertar. Ver más allá de lo visible. Expandir la percepción.' },
  { label: 'Amor',         description: 'La frecuencia más alta. El motor que transforma todo lo que toca.' },
];

/* ── SVG geometry helpers ── */
const CX = 200;
const CY = 200;
const R = 160;

function pointOnCircle(index: number, total: number) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  return { x: CX + R * Math.cos(angle), y: CY + R * Math.sin(angle) };
}

const points = pillars.map((_, i) => pointOnCircle(i, 9));

/* Enneagram internal lines: 1-4-2-8-5-7 cycle + 3-6-9 triangle (0-indexed: 0-3-1-7-4-6 and 2-5-8) */
const cycleLines = [
  [0, 3], [3, 1], [1, 7], [7, 4], [4, 6], [6, 0],
];
const triangleLines = [
  [2, 5], [5, 8], [8, 2],
];

const EnneagramSVG = ({ activeIndex, onSelect }: { activeIndex: number | null; onSelect: (i: number) => void }) => (
  <svg viewBox="0 0 400 400" className="w-full h-full" aria-label="Eneagrama Dorado">
    <defs>
      <radialGradient id="enneagramGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
      </radialGradient>
      <filter id="goldGlow">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="goldGlowStrong">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Background glow */}
    <circle cx={CX} cy={CY} r={R + 40} fill="url(#enneagramGlow)" />

    {/* Outer circle */}
    <circle
      cx={CX} cy={CY} r={R}
      fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.4"
      className="enneagram-circle"
    />

    {/* Inner cycle lines (hexad) */}
    {cycleLines.map(([a, b], i) => (
      <line
        key={`cycle-${i}`}
        x1={points[a].x} y1={points[a].y}
        x2={points[b].x} y2={points[b].y}
        stroke="#D4AF37" strokeWidth="0.8" opacity="0.25"
        className="enneagram-line"
      />
    ))}

    {/* Triangle lines */}
    {triangleLines.map(([a, b], i) => (
      <line
        key={`tri-${i}`}
        x1={points[a].x} y1={points[a].y}
        x2={points[b].x} y2={points[b].y}
        stroke="#D4AF37" strokeWidth="1" opacity="0.35"
        className="enneagram-line"
      />
    ))}

    {/* Point nodes */}
    {points.map((p, i) => {
      const isActive = activeIndex === i;
      return (
        <g
          key={i}
          className="enneagram-node cursor-pointer"
          onClick={() => onSelect(i)}
          role="button"
          tabIndex={0}
          aria-label={pillars[i].label}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(i); }}
        >
          {/* Hit area */}
          <circle cx={p.x} cy={p.y} r={20} fill="transparent" />

          {/* Glow ring on active */}
          {isActive && (
            <circle
              cx={p.x} cy={p.y} r={16}
              fill="none" stroke="#D4AF37" strokeWidth="1"
              opacity="0.5" filter="url(#goldGlowStrong)"
            />
          )}

          {/* Point */}
          <circle
            cx={p.x} cy={p.y}
            r={isActive ? 7 : 5}
            fill={isActive ? '#D4AF37' : '#0A0A0A'}
            stroke="#D4AF37"
            strokeWidth={isActive ? 2 : 1.2}
            filter={isActive ? 'url(#goldGlow)' : undefined}
            className="transition-all duration-300"
          />

          {/* Label */}
          <text
            x={p.x}
            y={p.y + (p.y < CY ? -16 : 24)}
            textAnchor="middle"
            fill={isActive ? '#D4AF37' : '#A1A1A1'}
            fontSize="10"
            fontFamily="Inter, sans-serif"
            fontWeight={isActive ? 600 : 400}
            letterSpacing="0.08em"
            className="uppercase transition-all duration-300 select-none pointer-events-none"
          >
            {pillars[i].label}
          </text>
        </g>
      );
    })}
  </svg>
);

/* ── Main Section ── */
const Enneagram = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const descRef = useRef<HTMLDivElement>(null);

  /* Auto-cycle through pillars until user interacts */
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % 9));
    }, 3000);
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
  }, []);

  const handleSelect = (i: number) => {
    if (autoplayRef.current) { clearInterval(autoplayRef.current); autoplayRef.current = null; }
    setActiveIndex(i);
  };

  /* Animate description text on change */
  useEffect(() => {
    if (descRef.current && activeIndex !== null) {
      gsap.fromTo(descRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [activeIndex]);

  /* Scroll-triggered entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.enn-header',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: '.enn-header', start: 'top 85%' } }
      );

      gsap.fromTo('.enneagram-circle',
        { attr: { r: 0 }, opacity: 0 },
        {
          attr: { r: R }, opacity: 0.4, duration: 1.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.enn-svg-wrap', start: 'top 80%' },
        }
      );

      gsap.fromTo('.enneagram-line',
        { opacity: 0 },
        {
          opacity: 0.3, duration: 1, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: '.enn-svg-wrap', start: 'top 78%' },
        }
      );

      gsap.fromTo('.enneagram-node',
        { scale: 0, transformOrigin: 'center center' },
        {
          scale: 1, duration: 0.6, stagger: 0.07, ease: 'back.out(2)',
          scrollTrigger: { trigger: '.enn-svg-wrap', start: 'top 75%' },
        }
      );

      gsap.fromTo('.enn-prose',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.enn-prose', start: 'top 85%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="eneagrama"
      ref={sectionRef}
      className="py-32 md:py-40 bg-black-deep relative overflow-hidden border-b border-white/5 scroll-mt-20"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold-metallic/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Header */}
        <div className="enn-header text-center mb-16 md:mb-24">
          <span className="text-gold-soft uppercase tracking-[0.3em] text-sm font-semibold mb-4 block">
            Geometría Sagrada
          </span>
          <h2 className="text-4xl md:text-6xl font-playfair mb-6 text-glow">
            El Eneagrama Dorado
          </h2>
          <p className="text-gray-smoke max-w-2xl mx-auto text-lg leading-relaxed">
            No es un logo. Es un portal de memoria, vibración y evolución.
            El eje conceptual desde donde nace todo lo que somos.
          </p>
        </div>

        {/* Two-column: SVG + Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 md:mb-28">
          {/* Enneagram SVG */}
          <div className="enn-svg-wrap flex items-center justify-center">
            <div className="w-full max-w-[420px] aspect-square">
              <EnneagramSVG activeIndex={activeIndex} onSelect={handleSelect} />
            </div>
          </div>

          {/* Pillar reveal */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left min-h-[220px]">
            {activeIndex !== null ? (
              <div ref={descRef}>
                <span className="text-gold-metallic uppercase tracking-[0.25em] text-xs font-semibold mb-3 block">
                  Pilar {activeIndex + 1} de 9
                </span>
                <h3 className="text-3xl md:text-4xl font-playfair mb-4 text-white-ivory text-glow">
                  {pillars[activeIndex].label}
                </h3>
                <p className="text-gray-smoke text-lg leading-relaxed max-w-md">
                  {pillars[activeIndex].description}
                </p>
              </div>
            ) : (
              <div className="text-gray-smoke text-lg italic">
                Toca un punto del eneagrama para revelar su significado.
              </div>
            )}

            {/* Dot indicators */}
            <div className="flex gap-2 mt-8">
              {pillars.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  aria-label={`Pilar ${i + 1}: ${pillars[i].label}`}
                  className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                    activeIndex === i
                      ? 'bg-gold-metallic border-gold-metallic scale-125 glow-gold'
                      : 'bg-transparent border-white/20 hover:border-gold-soft'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Prose block: deeper meaning */}
        <div className="enn-prose max-w-3xl mx-auto text-center space-y-8">
          <div className="w-12 h-[1px] bg-gold-metallic/40 mx-auto" />

          <p className="text-2xl md:text-3xl font-cormorant leading-relaxed text-white-ivory">
            Nueve puntos. Un solo movimiento.
            <br />
            <span className="text-gold-metallic italic">El que conecta lo que eres con lo que puedes llegar a ser.</span>
          </p>

          <p className="text-gray-smoke text-lg leading-relaxed max-w-2xl mx-auto">
            El Eneagrama Dorado representa la geometría de la evolución humana:
            cuerpo, mente y espíritu en equilibrio perpetuo. El dorado no es decoración —
            es la frecuencia de la abundancia espiritual y material vibrando al unísono.
          </p>

          <p className="text-gray-smoke text-lg leading-relaxed max-w-2xl mx-auto">
            Cada producto, cada artista, cada ritual de SMOKETHECAVIAR nace de este centro.
            Es una expresión de amor elevado, conexión profunda y expansión de conciencia.
          </p>

          <div className="w-12 h-[1px] bg-gold-metallic/40 mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default Enneagram;
