import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

import heroImage from '../assets/sentir.jpg';
import logoImage from '../assets/brand_logo.png';

const Hero = () => {
  const { t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const magneticRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-text',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.3, ease: 'power3.out', delay: 0.4 },
      );
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 2, ease: 'power2.out' },
      );
      gsap.to(glowRef.current, {
        opacity: 0.7, scale: 1.2, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
      gsap.fromTo(
        '.hero-sweep',
        { backgroundPosition: '-200% center' },
        { backgroundPosition: '200% center', duration: 4.5, ease: 'sine.inOut', repeat: -1, delay: 1.2 },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dx = (e.clientX - w / 2) / w;
      const dy = (e.clientY - h / 2) / h;
      if (textRef.current) gsap.to(textRef.current, { x: dx * 12, y: dy * 8, duration: 0.9, ease: 'power3.out' });
      if (imageRef.current) gsap.to(imageRef.current, { x: dx * -20, y: dy * -14, duration: 1.1, ease: 'power3.out' });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const el = magneticRef.current as HTMLElement | null;
    if (!el) return;
    const onEnter = () => gsap.to(el, { scale: 1.05, duration: 0.4, ease: 'power3.out' });
    const onLeave = () => gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: x * 0.25, y: y * 0.35, duration: 0.4, ease: 'power3.out' });
    };
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('mousemove', onMove);
    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative h-screen w-full flex flex-col lg:flex-row overflow-hidden border-b border-white/5 scroll-mt-20"
    >
      {/* Left Content */}
      <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-8 lg:px-24 z-20 bg-gradient-to-r from-black-deep via-black-deep to-transparent">
        <div ref={textRef} className="max-w-xl will-change-transform">
          <div className="flex items-center gap-4 mb-16 hero-text">
            <img src={logoImage} alt="SMOKETHECAVIAR Logo" className="h-16 object-contain" />
          </div>

          <h1 className="text-5xl lg:text-7xl mb-6 leading-tight hero-text text-glow">
            {t.hero.headline1} <br />
            <span
              className="hero-sweep bg-clip-text text-transparent inline-block"
              style={{
                backgroundImage: 'linear-gradient(90deg, #C9A55C 0%, #D4AF37 25%, #FBE38E 50%, #D4AF37 75%, #C9A55C 100%)',
                backgroundSize: '200% auto',
              }}
            >
              {t.hero.headline2}
            </span>
          </h1>

          <p className="hero-text font-cormorant italic text-xl lg:text-2xl text-gold-metallic/90 mb-4 max-w-md leading-snug">
            {t.hero.manifesto}
          </p>

          <p className="text-lg lg:text-xl text-gray-smoke mb-10 hero-text font-light tracking-wide max-w-md">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 hero-text mt-6">
            <Link
              ref={magneticRef as React.Ref<HTMLAnchorElement>}
              to="/eneagrama"
              className="group relative px-7 py-4 bg-gold-metallic text-black-deep font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:glow-gold inline-flex items-center justify-center gap-2 will-change-transform shadow-[0_0_0_rgba(212,175,55,0)] hover:shadow-[0_0_30px_rgba(212,175,55,0.45)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-500" />
                {t.hero.cta1}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gold-soft scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0" />
              <span aria-hidden className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 opacity-0 group-hover:opacity-100 group-hover:translate-x-[300%] transition-all duration-[900ms] ease-out z-10" />
            </Link>

            <Link
              to="/rituales"
              className="group relative px-7 py-4 bg-transparent text-white-ivory border border-gold-metallic/40 rounded-xl hover:border-gold-metallic hover:bg-gold-metallic/10 hover:text-gold-metallic transition-all duration-300 font-medium inline-flex items-center justify-center gap-2 overflow-hidden"
            >
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
              {t.hero.cta2}
              <ArrowRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>

          <div className="hero-text mt-8 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-gray-smoke/70">
            <span className="text-gold-soft/70">{t.hero.jumpTo}</span>
            {t.hero.chips.map((c) => (
              <Link
                key={c.to}
                to={c.to}
                className="px-3 py-1.5 rounded-full border border-white/10 hover:border-gold-soft hover:text-gold-soft hover:scale-105 hover:bg-gold-metallic/5 transition-all duration-300"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="absolute lg:relative w-full lg:w-1/2 h-full z-10 inset-0 lg:inset-auto opacity-40 lg:opacity-100">
        <div className="relative w-full h-full overflow-hidden">
          <div
            ref={imageRef}
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat will-change-transform"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black-deep via-transparent to-transparent lg:hidden" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black-deep hidden lg:block" />
          <div
            ref={glowRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 lg:w-48 lg:h-48 bg-gold-metallic rounded-full blur-[100px] opacity-30 mix-blend-screen pointer-events-none"
          />
        </div>
      </div>

    </section>
  );
};

export default Hero;
