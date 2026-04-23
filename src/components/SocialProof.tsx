import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import logoImage from '../assets/brand_logo.png';
import productImg from '../assets/cbd_product_dark_1776035913207.png';
import poolImg from '../assets/pool_lifestyle.jpg';

const SocialProof = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.editorial-item',
        { y: 60, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%' }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-transparent border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-8">
        
        <div className="flex flex-col items-center justify-center text-center mb-24 editorial-item">
          <img src={logoImage} alt="SMOKETHECAVIAR Logo" className="h-12 md:h-16 mb-8 mix-blend-screen opacity-90" />
          <h2 className="text-3xl md:text-5xl font-cormorant text-white-ivory italic max-w-2xl leading-relaxed">
            "Una marca construida para pocos."
          </h2>
        </div>

        {/* Editorial Layout Grid */}
        <div className="grid grid-cols-1 select-none md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-5 editorial-item">
            <div className="aspect-[4/5] bg-[#111] overflow-hidden rounded-2xl border border-white/5 relative flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.05)]">
               <img src={poolImg} alt="Luxury Lifestyle Pool" className="w-full h-full object-cover object-center z-0 opacity-90 transition-transform duration-1000 hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black-deep/60 to-transparent z-10 w-full h-full pointer-events-none"></div>
            </div>
          </div>
          
          <div className="md:col-span-3 editorial-item md:translate-y-12">
            <div className="aspect-square bg-white-ivory text-black-deep rounded-2xl p-8 flex border border-white/10 flex-col items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.05)] relative z-20">
              <span className="font-playfair text-xl md:text-2xl font-bold uppercase tracking-widest mb-4 text-center">Ritual</span>
              <p className="text-black-carbon/80 font-medium font-inter text-xs md:text-sm leading-relaxed text-center">
                El estatus no se grita. Cada detalle ha sido seleccionado meticulosamente para elevar tu experiencia diaria.
              </p>
            </div>
          </div>
          
          <div className="md:col-span-4 editorial-item">
             <div className="aspect-[3/4] bg-[#0A0A0A] overflow-hidden rounded-2xl border border-white/5 relative flex items-center justify-center">
              <img src={productImg} alt="Merch Mockup 2" className="w-[120%] h-[120%] object-cover mix-blend-lighten opacity-80 transition-transform duration-1000 hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black-deep to-transparent z-10 w-full h-full pointer-events-none"></div>
              <div className="absolute bottom-8 left-8 text-left z-20">
                <p className="text-white-ivory font-playfair font-semibold text-xl">Pure Extract</p>
                <p className="text-gold-soft text-xs tracking-widest uppercase">Colección Privada</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SocialProof;
