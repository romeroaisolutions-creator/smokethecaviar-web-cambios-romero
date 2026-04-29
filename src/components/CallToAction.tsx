import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

const CallToAction = () => {
  const { t } = useLang();
  const cta = t.cta;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to('.particle', {
        y: 'random(-50, 50)', x: 'random(-50, 50)', opacity: 'random(0.2, 0.8)',
        duration: 'random(3, 8)', repeat: -1, yoyo: true, ease: 'sine.inOut',
        stagger: { amount: 2, from: 'random' },
      });
      gsap.fromTo('.cta-content > *', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.2, stagger: 0.2,
        scrollTrigger: { trigger: '.cta-content', start: 'top 80%' },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i, size: Math.random() * 4 + 1,
    top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
  }));

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-[#020202] relative overflow-hidden flex items-center justify-center min-h-[60vh]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-metallic/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <div key={p.id} className="particle absolute rounded-full bg-gold-metallic shadow-[0_0_10px_rgba(212,175,55,0.8)]"
            style={{ width: `${p.size}px`, height: `${p.size}px`, top: p.top, left: p.left, opacity: 0.1 }}
          />
        ))}
      </div>

      <div className="cta-content text-center relative z-10 max-w-4xl px-8 flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl font-cormorant italic text-gray-smoke mb-4 font-light">
          {cta.line1} <span className="text-white-ivory">{cta.line1b}</span>
        </h2>
        <h2 className="text-4xl md:text-6xl font-cormorant italic text-gold-metallic mb-10 text-glow">
          {cta.line2}
        </h2>

        <Link
          to="/contacto"
          className="group relative px-10 py-6 md:px-16 md:py-8 bg-black-deep border border-gold-metallic text-gold-metallic uppercase tracking-[0.2em] font-semibold text-sm md:text-base rounded-full overflow-hidden transition-all duration-700 hover:border-transparent hover:text-black-deep hover:glow-gold-strong hover:scale-105 active:scale-95 inline-flex items-center gap-3"
        >
          <Sparkles className="w-4 h-4 relative z-10 transition-transform duration-500 group-hover:rotate-180" />
          <span className="relative z-10 transition-colors duration-500">{cta.button}</span>
          <div className="absolute inset-0 bg-gold-metallic rounded-full scale-0 group-hover:scale-150 transition-transform duration-700 ease-in-out z-0 origin-center" />
          <span aria-hidden className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 opacity-0 group-hover:opacity-100 group-hover:translate-x-[400%] transition-all duration-[1100ms] ease-out z-20" />
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
