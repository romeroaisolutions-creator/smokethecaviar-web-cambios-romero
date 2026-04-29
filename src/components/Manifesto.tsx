import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLang } from '../context/LanguageContext';

const Manifesto = () => {
  const { t } = useLang();
  const m = t.manifesto;
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      textRefs.current.forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, filter: 'blur(10px)', y: 40 },
          {
            opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.5, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 60%', scrub: false },
          },
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-black-deep flex items-center justify-center relative overflow-hidden border-b border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-metallic/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-8 text-center relative z-10 flex flex-col gap-8 md:gap-10 font-cormorant text-3xl md:text-5xl leading-relaxed text-white-ivory">
        <p ref={el => { textRefs.current[0] = el; }} className="font-light">{m.p1}</p>

        <p ref={el => { textRefs.current[1] = el; }} className="font-medium text-gold-soft text-glow">{m.p2}</p>

        <blockquote
          ref={el => { textRefs.current[2] = el; }}
          className="relative mx-auto max-w-3xl px-6 md:px-10 py-8 md:py-10 rounded-2xl border border-gold-metallic/25 bg-gradient-to-br from-black-carbon/40 via-transparent to-black-carbon/40 backdrop-blur-sm"
        >
          <span aria-hidden className="absolute -top-3 left-6 text-gold-metallic/70 text-5xl font-playfair leading-none select-none">"</span>
          <p className="font-cormorant italic text-2xl md:text-4xl leading-snug text-white-ivory">{m.quote}</p>
          <span aria-hidden className="absolute -bottom-7 right-6 text-gold-metallic/70 text-5xl font-playfair leading-none select-none">"</span>
        </blockquote>

        <p ref={el => { textRefs.current[3] = el; }} className="italic text-gold-metallic text-3xl md:text-5xl">{m.p3}</p>

        <div className="pt-6 flex flex-col gap-4">
          <p ref={el => { textRefs.current[4] = el; }} className="font-light text-2xl md:text-3xl text-gray-smoke">{m.p4}</p>
          <p ref={el => { textRefs.current[5] = el; }} className="font-semibold text-5xl md:text-6xl text-white-ivory text-glow tracking-wide">{m.p5}</p>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
