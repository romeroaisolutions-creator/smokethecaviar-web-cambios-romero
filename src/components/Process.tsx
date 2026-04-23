import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const steps = [
  { num: '01', title: 'Selección', desc: 'Elegimos solo lo excepcional' },
  { num: '02', title: 'Refinamiento', desc: 'Cada producto es curado' },
  { num: '03', title: 'Experiencia', desc: 'No compras. Elevas tu estado' }
];

const Process = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Line progress
      gsap.fromTo('.progress-line',
        { scaleX: 0 },
        { 
          scaleX: 1, ease: 'none',
          scrollTrigger: {
            trigger: '.process-container',
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: 1
          }
        }
      );

      // Steps reveal
      gsap.fromTo('.process-step',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.3, duration: 1,
          scrollTrigger: { trigger: '.process-container', start: 'top 70%' }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-black-carbon relative border-b border-white/5">
      <div className="max-w-6xl mx-auto px-8 process-container">
        
        <div className="text-center mb-24">
          <span className="text-gold-soft uppercase tracking-[0.2em] text-sm font-semibold mb-4 block">El Camino</span>
          <h2 className="text-4xl md:text-5xl font-playfair text-white-ivory">Nuestro Ritual</h2>
        </div>

        <div className="relative">
          {/* Background Track Line (hidden on rigid mobile to stack) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-white/10 z-0"></div>
          
          {/* Animated Gold Line */}
          <div className="progress-line hidden md:block absolute top-12 left-0 w-full h-[2px] bg-gold-metallic origin-left z-0 shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="process-step flex flex-col items-center md:items-start text-center md:text-left">
                {/* Node */}
                <div className="w-24 h-24 rounded-full bg-black-deep border-2 border-gold-metallic/30 flex items-center justify-center mb-8 relative md:shadow-none shadow-[0_0_15px_rgba(212,175,55,0.15)] group transition-colors duration-500 hover:border-gold-metallic hover:bg-gold-metallic/5">
                  <span className="font-playfair text-3xl text-gold-metallic group-hover:scale-110 transition-transform duration-300">{step.num}</span>
                  {/* Outer pulse ring */}
                  <div className="absolute inset-0 rounded-full border border-gold-metallic/50 scale-150 opacity-0 group-hover:animate-ping outline-none"></div>
                </div>
                
                <h3 className="text-2xl font-playfair text-white-ivory mb-4">{step.title}</h3>
                <p className="text-gray-smoke font-light text-lg">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Process;
