import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

import heroImage from '../assets/main_hero.jpg';
import logoImage from '../assets/brand_logo.png';
import brandTextImg from '../assets/brand_text.png';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in text elements sequentially
      gsap.fromTo('.hero-text', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.3, ease: 'power3.out', delay: 0.5 }
      );

      // Fade in image
      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 2, ease: 'power2.out' }
      );

      // Pulsing glow effect
      gsap.to(glowRef.current, {
        opacity: 0.7,
        scale: 1.2,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="inicio" ref={containerRef} className="relative h-screen w-full flex flex-col lg:flex-row overflow-hidden border-b border-white/5 scroll-mt-20">
      {/* Left Content */}
      <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-8 lg:px-24 z-20 bg-gradient-to-r from-black-deep via-black-deep to-transparent">
        <div ref={textRef} className="max-w-xl">
          <div className="flex items-center gap-4 mb-16 hero-text">
            <img src={logoImage} alt="SMOKETHECAVIAR Logo" className="h-16 object-contain" />
            <img src={brandTextImg} alt="SMOKETHECAVIAR" className="h-8 md:h-10 object-contain" />
          </div>
          
          <h1 className="text-5xl lg:text-7xl mb-8 leading-tight hero-text text-glow">
            El lujo no se consume. <br/>
            <span className="text-gold-metallic">Se experimenta.</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-smoke mb-12 hero-text font-light tracking-wide max-w-md">
            CBD premium para quienes entienden que el bienestar es el nuevo estatus.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 hero-text mt-8">
            <button className="group relative px-8 py-4 bg-gold-metallic text-black-deep font-semibold rounded-xl overflow-hidden transition-all hover:glow-gold">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explorar colección
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gold-soft scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0"></div>
            </button>
            
            <button className="px-8 py-4 bg-transparent text-white-ivory border border-white/20 rounded-xl hover:border-gold-metallic hover:text-gold-metallic transition-colors font-medium">
              Descubrir artistas
            </button>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="absolute lg:relative w-full lg:w-1/2 h-full z-10 inset-0 lg:inset-auto opacity-40 lg:opacity-100">
        <div className="relative w-full h-full overflow-hidden">
          <div ref={imageRef} className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroImage})` }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black-deep via-transparent to-transparent lg:hidden"></div>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black-deep hidden lg:block"></div>
          
          {/* Pulsing Energy Core Glow */}
          <div 
            ref={glowRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 lg:w-48 lg:h-48 bg-gold-metallic rounded-full blur-[100px] opacity-30 mix-blend-screen pointer-events-none"
          ></div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 opacity-50 hero-text">
        <span className="text-xs uppercase tracking-widest text-gold-metallic font-semibold">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold-metallic to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
