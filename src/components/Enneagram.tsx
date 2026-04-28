import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

/* ── Pilares del Eneagrama Dorado ── */
const pillars = [
  { label: 'Cuerpo',        description: 'El templo físico. Donde el ritual comienza y la transformación se ancla.' },
  { label: 'Mente',         description: 'Claridad sin ruido. El pensamiento elevado que precede toda creación.' },
  { label: 'Espíritu',      description: 'La chispa invisible que conecta todo. Presencia pura, sin forma.' },
  { label: 'Luz',           description: 'La frecuencia que ilumina lo que merece ser visto. Brilla sin pedir permiso.' },
  { label: 'Sombra',        description: 'Lo que no se ve también es sagrado. La sombra es donde nace la profundidad.' },
  { label: 'Unión',         description: 'El hilo dorado entre almas que vibran en la misma frecuencia.' },
  { label: 'Propósito',     description: 'La razón silenciosa que sostiene cada paso. Brújula del alma.' },
  { label: 'Creación',      description: 'El acto de dar forma a lo invisible. Cada gesto es una obra.' },
  { label: 'Trascendencia', description: 'Cruzar el umbral. Lo que queda cuando todo lo demás se disuelve.' },
];

/* ── Geometría: Amor (índice 8) arriba ── */
const SIZE = 560;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = 220;

function pointOnCircle(index: number, total: number) {
  // Offset para que el último pilar (Amor) quede en la vertical superior
  const angle = -Math.PI / 2 + (2 * Math.PI * (index + 1)) / total;
  return { x: CX + R * Math.cos(angle), y: CY + R * Math.sin(angle), angle };
}

const points = pillars.map((_, i) => pointOnCircle(i, 9));

/* Líneas internas clásicas del eneagrama (numeración 1-9 → índices 0-8):
   Hexada: 1→4→2→8→5→7→1  =  [0,3,1,7,4,6]
   Triángulo: 3-6-9        =  [2,5,8]
*/
const cycleSeq = [0, 3, 1, 7, 4, 6, 0];
const cycleLines = cycleSeq.slice(0, -1).map((a, i) => [a, cycleSeq[i + 1]] as [number, number]);
const triangleLines: [number, number][] = [
  [2, 5], [5, 8], [8, 2],
];

/* Partículas orbitales */
const PARTICLES = Array.from({ length: 6 }, (_, i) => ({
  radius: R + 14 + (i % 2) * 8,
  speed: 12 + i * 2.5,
  offset: (i / 6) * Math.PI * 2,
  size: 1.5 + (i % 3) * 0.5,
}));

interface SVGProps {
  activeIndex: number | null;
  onSelect: (i: number) => void;
}

const EnneagramSVG = ({ activeIndex, onSelect }: SVGProps) => {
  const isLineActive = (a: number, b: number) =>
    activeIndex !== null && (a === activeIndex || b === activeIndex);

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="w-full h-full overflow-visible"
      aria-label="Eneagrama Dorado"
    >
      <defs>
        <radialGradient id="enneagramGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#D4AF37" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="goldLine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C9A55C" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#C9A55C" />
        </linearGradient>

        <filter id="goldGlow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
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

      {/* Halo de fondo */}
      <circle cx={CX} cy={CY} r={R + 80} fill="url(#enneagramGlow)" />

      {/* Anillo decorativo exterior rotando (tick marks) */}
      <g className="enn-ring-outer" style={{ transformOrigin: `${CX}px ${CY}px` }}>
        {Array.from({ length: 72 }).map((_, i) => {
          const a = (i / 72) * Math.PI * 2;
          const isMajor = i % 8 === 0;
          const r1 = R + 24;
          const r2 = R + (isMajor ? 36 : 30);
          return (
            <line
              key={`tick-${i}`}
              x1={CX + r1 * Math.cos(a)}
              y1={CY + r1 * Math.sin(a)}
              x2={CX + r2 * Math.cos(a)}
              y2={CY + r2 * Math.sin(a)}
              stroke="#D4AF37"
              strokeWidth={isMajor ? 1.2 : 0.6}
              opacity={isMajor ? 0.5 : 0.22}
            />
          );
        })}
      </g>

      {/* Anillo interior contra-rotando */}
      <g className="enn-ring-inner" style={{ transformOrigin: `${CX}px ${CY}px` }}>
        <circle
          cx={CX} cy={CY} r={R - 26}
          fill="none" stroke="#D4AF37" strokeWidth="0.5"
          strokeDasharray="2 6" opacity="0.35"
        />
      </g>

      {/* Círculo principal */}
      <circle
        cx={CX} cy={CY} r={R}
        fill="none" stroke="url(#goldLine)" strokeWidth="1.4"
        opacity="0.7" filter="url(#goldGlow)"
        className="enneagram-circle"
        style={{ strokeDasharray: 4000, strokeDashoffset: 4000 }}
      />

      {/* Hexada cycle */}
      {cycleLines.map(([a, b], i) => {
        const active = isLineActive(a, b);
        return (
          <line
            key={`cycle-${i}`}
            x1={points[a].x} y1={points[a].y}
            x2={points[b].x} y2={points[b].y}
            stroke="#D4AF37"
            strokeWidth={active ? 1.6 : 0.8}
            opacity={active ? 0.85 : 0.3}
            filter={active ? 'url(#goldGlow)' : undefined}
            className="enneagram-line transition-all duration-500"
            style={{ strokeDasharray: 800, strokeDashoffset: 800 }}
          />
        );
      })}

      {/* Triángulo */}
      {triangleLines.map(([a, b], i) => {
        const active = isLineActive(a, b);
        return (
          <line
            key={`tri-${i}`}
            x1={points[a].x} y1={points[a].y}
            x2={points[b].x} y2={points[b].y}
            stroke="#D4AF37"
            strokeWidth={active ? 1.8 : 1.1}
            opacity={active ? 0.9 : 0.4}
            filter={active ? 'url(#goldGlow)' : undefined}
            className="enneagram-line transition-all duration-500"
            style={{ strokeDasharray: 800, strokeDashoffset: 800 }}
          />
        );
      })}

      {/* Centro pulsante */}
      <circle cx={CX} cy={CY} r={56} fill="url(#centerGlow)" className="enn-center-glow" />
      <circle
        cx={CX} cy={CY} r={3.5}
        fill="#D4AF37" filter="url(#goldGlowStrong)"
        className="enn-center-dot"
      />

      {/* Partículas orbitales */}
      <g className="enn-particles">
        {PARTICLES.map((p, i) => (
          <circle
            key={`p-${i}`}
            cx={CX + p.radius * Math.cos(p.offset)}
            cy={CY + p.radius * Math.sin(p.offset)}
            r={p.size}
            fill="#D4AF37"
            opacity="0.7"
            data-radius={p.radius}
            data-speed={p.speed}
            data-offset={p.offset}
            filter="url(#goldGlow)"
          />
        ))}
      </g>

      {/* Nodos de los pilares */}
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
            <circle cx={p.x} cy={p.y} r={26} fill="transparent" />

            {/* Ripples concéntricos en el activo */}
            {isActive && (
              <>
                <circle
                  cx={p.x} cy={p.y} r={14}
                  fill="none" stroke="#D4AF37" strokeWidth="1"
                  opacity="0.5"
                  className="enn-ripple-1"
                />
                <circle
                  cx={p.x} cy={p.y} r={14}
                  fill="none" stroke="#D4AF37" strokeWidth="1"
                  opacity="0.4"
                  className="enn-ripple-2"
                />
                <circle
                  cx={p.x} cy={p.y} r={20}
                  fill="none" stroke="#D4AF37" strokeWidth="1"
                  opacity="0.55" filter="url(#goldGlowStrong)"
                />
              </>
            )}

            {/* Punto */}
            <circle
              cx={p.x} cy={p.y}
              r={isActive ? 9 : 6}
              fill={isActive ? '#D4AF37' : '#0A0A0A'}
              stroke="#D4AF37"
              strokeWidth={isActive ? 2.2 : 1.4}
              filter={isActive ? 'url(#goldGlow)' : undefined}
              className="transition-all duration-300"
            />

            {/* Numeración clásica del eneagrama (1-9) */}
            <text
              x={p.x}
              y={p.y - (R * 0 + (p.y < CY ? 30 : -38))}
              textAnchor="middle"
              fill={isActive ? '#D4AF37' : '#C9A55C'}
              fontSize="10"
              fontFamily="Inter, sans-serif"
              fontWeight={600}
              opacity={isActive ? 0.95 : 0.5}
              className="select-none pointer-events-none transition-all duration-300"
            >
              {String(i + 1).padStart(2, '0')}
            </text>

            {/* Label */}
            <text
              x={p.x}
              y={p.y + (p.y < CY ? -16 : 24)}
              textAnchor="middle"
              fill={isActive ? '#D4AF37' : '#A1A1A1'}
              fontSize="12"
              fontFamily="Inter, sans-serif"
              fontWeight={isActive ? 600 : 400}
              letterSpacing="0.18em"
              className="uppercase transition-all duration-300 select-none pointer-events-none"
            >
              {pillars[i].label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/* ── Sección principal ── */
const Enneagram = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const centerLabelRef = useRef<HTMLDivElement>(null);

  /* Auto-cycle */
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev === null ? 8 : (prev + 1) % 9));
    }, 3500);
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
  }, []);

  const handleSelect = (i: number) => {
    if (autoplayRef.current) { clearInterval(autoplayRef.current); autoplayRef.current = null; }
    setActiveIndex(i);
  };

  /* Animar texto al cambiar de pilar */
  useEffect(() => {
    if (activeIndex === null) return;
    const tl = gsap.timeline();
    if (descRef.current) {
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 14, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.55, ease: 'power3.out' },
      );
    }
    if (centerLabelRef.current) {
      tl.fromTo(
        centerLabelRef.current,
        { opacity: 0, scale: 0.7, letterSpacing: '0.6em' },
        { opacity: 1, scale: 1, letterSpacing: '0.25em', duration: 0.7, ease: 'power3.out' },
        '<',
      );
    }
  }, [activeIndex]);

  /* Animaciones de entrada y loops */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo('.enn-header',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: '.enn-header', start: 'top 85%' } },
      );

      // Dibujado del círculo
      gsap.to('.enneagram-circle', {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: '.enn-svg-wrap', start: 'top 80%' },
      });

      // Dibujado de líneas internas
      gsap.to('.enneagram-line', {
        strokeDashoffset: 0,
        duration: 1.4,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.enn-svg-wrap', start: 'top 78%' },
      });

      // Aparición de nodos
      gsap.fromTo('.enneagram-node',
        { scale: 0, transformOrigin: `${CX}px ${CY}px` },
        {
          scale: 1, duration: 0.7, stagger: 0.08, ease: 'back.out(2.4)',
          scrollTrigger: { trigger: '.enn-svg-wrap', start: 'top 75%' },
        },
      );

      // Rotaciones continuas
      gsap.to('.enn-ring-outer', {
        rotation: 360,
        transformOrigin: `${CX}px ${CY}px`,
        duration: 80,
        ease: 'none',
        repeat: -1,
      });
      gsap.to('.enn-ring-inner', {
        rotation: -360,
        transformOrigin: `${CX}px ${CY}px`,
        duration: 60,
        ease: 'none',
        repeat: -1,
      });

      // Pulso del centro
      gsap.to('.enn-center-glow', {
        scale: 1.18,
        transformOrigin: `${CX}px ${CY}px`,
        duration: 2.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
      gsap.to('.enn-center-dot', {
        opacity: 0.4,
        duration: 1.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // (Ripples del nodo activo se animan vía CSS keyframes en index.css)

      // Partículas orbitales (cada una con su propia velocidad)
      gsap.utils.toArray<SVGCircleElement>('.enn-particles circle').forEach((el) => {
        const radius = parseFloat(el.dataset.radius || '0');
        const speed = parseFloat(el.dataset.speed || '20');
        const offset = parseFloat(el.dataset.offset || '0');
        const obj = { t: 0 };
        gsap.to(obj, {
          t: Math.PI * 2,
          duration: speed,
          ease: 'none',
          repeat: -1,
          onUpdate: () => {
            const a = obj.t + offset;
            el.setAttribute('cx', String(CX + radius * Math.cos(a)));
            el.setAttribute('cy', String(CY + radius * Math.sin(a)));
          },
        });
      });

      // Prose
      gsap.fromTo('.enn-prose',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.enn-prose', start: 'top 85%' },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="eneagrama"
      ref={sectionRef}
      className="py-20 md:py-28 bg-black-deep relative overflow-hidden border-b border-white/5 scroll-mt-20"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gold-metallic/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Header */}
        <div className="enn-header text-center mb-8 md:mb-12">
          <span className="text-gold-soft uppercase tracking-[0.3em] text-sm font-semibold mb-4 block">
            Geometría Sagrada
          </span>
          <h2 className="text-4xl md:text-6xl font-playfair mb-6 text-glow">
            El Eneagrama Dorado
          </h2>
          <p className="text-gray-smoke max-w-2xl mx-auto text-lg leading-relaxed">
            No es un logo. Es un portal de memoria, vibración y evolución.
            <br className="hidden md:block" />
            <span className="text-gold-soft/90">
              Toca un pilar para revelar su frecuencia.
            </span>
          </p>
        </div>

        {/* Eneagrama centrado y grande, con label flotante en el centro */}
        <div className="enn-svg-wrap relative mx-auto mb-8 md:mb-12 w-full max-w-[560px] aspect-square">
          <EnneagramSVG activeIndex={activeIndex} onSelect={handleSelect} />

          {/* Label flotante en el centro del eneagrama */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            {activeIndex !== null && (
              <div ref={centerLabelRef} className="text-center">
                <div className="text-gold-soft uppercase text-[10px] tracking-[0.4em] mb-2 font-semibold">
                  {String(activeIndex + 1).padStart(2, '0')} / 09
                </div>
                <div className="font-playfair text-2xl md:text-3xl text-white-ivory text-glow">
                  {pillars[activeIndex].label}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Descripción debajo del eneagrama */}
        <div className="max-w-2xl mx-auto text-center mb-8 md:mb-10 min-h-[120px]">
          {activeIndex !== null ? (
            <div ref={descRef}>
              <span className="text-gold-metallic uppercase tracking-[0.25em] text-xs font-semibold mb-4 block">
                Pilar {activeIndex + 1} de 9
              </span>
              <p className="text-gray-smoke text-lg md:text-xl leading-relaxed font-cormorant italic">
                {pillars[activeIndex].description}
              </p>
            </div>
          ) : (
            <div className="text-gray-smoke text-lg italic">
              Toca un punto del eneagrama para revelar su significado.
            </div>
          )}

          {/* Indicadores */}
          <div className="flex gap-2 justify-center mt-8">
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

        {/* Prose — más corto, con atajos de acción */}
        <div className="enn-prose max-w-3xl mx-auto text-center space-y-6">
          <div className="w-12 h-[1px] bg-gold-metallic/40 mx-auto" />

          <p className="text-xl md:text-2xl font-cormorant leading-relaxed text-white-ivory">
            Nueve puntos. Un solo movimiento.
            <br />
            <span className="text-gold-metallic italic">
              El que conecta lo que eres con lo que puedes llegar a ser.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              to="/sentir"
              className="group px-5 py-2.5 rounded-full border border-gold-metallic/40 text-gold-soft text-xs uppercase tracking-[0.25em] hover:bg-gold-metallic/10 hover:text-gold-metallic hover:scale-105 hover:border-gold-metallic transition-all duration-300"
            >
              Sentir el ritual
            </Link>
            <Link
              to="/explorar"
              className="group px-5 py-2.5 rounded-full border border-gold-metallic/40 text-gold-soft text-xs uppercase tracking-[0.25em] hover:bg-gold-metallic/10 hover:text-gold-metallic hover:scale-105 hover:border-gold-metallic transition-all duration-300"
            >
              Elegir tu puerta
            </Link>
            <Link
              to="/rituales"
              className="group relative px-5 py-2.5 rounded-full bg-gold-metallic text-black-deep text-xs uppercase tracking-[0.25em] font-semibold hover:glow-gold hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">Comprar mercancía</span>
              <span aria-hidden className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 opacity-0 group-hover:opacity-100 group-hover:translate-x-[400%] transition-all duration-[900ms] ease-out" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Enneagram;
