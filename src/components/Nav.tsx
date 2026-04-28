import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import logoImage from '../assets/brand_logo.png';

const links = [
  { to: '/historia', label: 'Historia' },
  { to: '/eneagrama', label: 'Eneagrama' },
  { to: '/sentir', label: 'Sentir' },
  { to: '/explorar', label: 'Explorar' },
  { to: '/sonido', label: 'Sonido' },
  { to: '/rituales', label: 'Rituales' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src={logoImage}
            alt="SMOKETHECAVIAR"
            className="h-8 object-contain transition-transform duration-500 group-hover:rotate-[12deg]"
          />
          <span className="hidden sm:inline text-xs tracking-[0.3em] text-gold-soft font-semibold uppercase">
            Smokethecaviar
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `relative text-sm tracking-wide transition-colors duration-300 ${
                    isActive ? 'text-gold-metallic' : 'text-gray-smoke hover:text-white-ivory'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-px bg-gold-metallic transition-all duration-500 ease-out ${
                        isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          className="lg:hidden text-white-ivory p-2"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-black-deep/95 backdrop-blur-md border-t border-white/5">
          <ul className="flex flex-col px-6 py-4 gap-4">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block text-sm tracking-wide transition-colors ${
                      isActive ? 'text-gold-metallic' : 'text-gray-smoke hover:text-gold-metallic'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Nav;
