import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import logoImage from '../assets/brand_logo.png';

const links = [
  { href: '#eneagrama', label: 'Eneagrama' },
  { href: '#conciencia', label: 'Sentir' },
  { href: '#explorar', label: 'Explorar' },
  { href: '#artistas', label: 'Sonido' },
  { href: '#productos', label: 'Rituales' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#contacto', label: 'Contacto' },
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string>('inicio');

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 40);

      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? Math.min(1, scrollTop / docH) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section observer
  useEffect(() => {
    const ids = ['inicio', ...links.map((l) => l.href.slice(1))];
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
              setActiveId(id);
            }
          });
        },
        { threshold: [0.4, 0.6] },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black-deep/80 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2 group">
          <img
            src={logoImage}
            alt="SMOKETHECAVIAR"
            className="h-8 object-contain transition-transform duration-500 group-hover:rotate-[12deg]"
          />
          <span className="hidden sm:inline text-xs tracking-[0.3em] text-gold-soft font-semibold uppercase">
            Smokethecaviar
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const isActive = activeId === l.href.slice(1);
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`relative text-sm tracking-wide transition-colors duration-300 ${
                    isActive
                      ? 'text-gold-metallic'
                      : 'text-gray-smoke hover:text-white-ivory'
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-gold-metallic transition-all duration-500 ease-out ${
                      isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <button
          className="md:hidden text-white-ivory p-2"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Hilo dorado de progreso de scroll */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-gold-soft via-gold-metallic to-gold-soft origin-left"
          style={{
            transform: `scaleX(${progress})`,
            transition: 'transform 80ms linear',
            boxShadow: '0 0 8px rgba(212, 175, 55, 0.5)',
          }}
        />
      </div>

      {open && (
        <div className="md:hidden bg-black-deep/95 backdrop-blur-md border-t border-white/5">
          <ul className="flex flex-col px-6 py-4 gap-4">
            {links.map((l) => {
              const isActive = activeId === l.href.slice(1);
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block text-sm tracking-wide transition-colors ${
                      isActive
                        ? 'text-gold-metallic'
                        : 'text-gray-smoke hover:text-gold-metallic'
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Nav;
