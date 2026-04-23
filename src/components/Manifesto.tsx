import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Manifesto = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      textRefs.current.forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, filter: 'blur(10px)', y: 40 },
          {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'bottom 60%',
              scrub: false,
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-40 bg-black-deep flex items-center justify-center relative overflow-hidden border-b border-white/5">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-metallic/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-8 text-center relative z-10 flex flex-col gap-12 font-cormorant text-3xl md:text-5xl leading-relaxed text-white-ivory">
        <p ref={el => { textRefs.current[0] = el; }} className="font-light">
          Durante años, el lujo fue apariencia.
        </p>
        
        <p ref={el => { textRefs.current[1] = el; }} className="font-medium text-gold-soft text-glow">
          Hoy, el lujo es cómo te sientes.
        </p>
        
        <p ref={el => { textRefs.current[2] = el; }} className="font-light text-2xl md:text-4xl text-gray-smoke mt-10">
          SMOKETHECAVIAR nace para quienes entienden que el bienestar no es básico.
        </p>
        
        <p ref={el => { textRefs.current[3] = el; }} className="italic text-gold-metallic">
          Es exclusivo.
        </p>
        
        <div className="pt-16 flex flex-col gap-6">
          <p ref={el => { textRefs.current[4] = el; }} className="font-light text-2xl md:text-3xl text-gray-smoke">
            No vendemos CBD.
          </p>
          <p ref={el => { textRefs.current[5] = el; }} className="font-semibold text-5xl md:text-6xl text-white-ivory text-glow tracking-wide">
            Creamos rituales.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
