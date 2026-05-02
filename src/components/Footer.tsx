import { Link } from 'react-router-dom';
import logoImage from '../assets/brand_logo.png';
import { useLang } from '../context/LanguageContext';
import type { LangKey } from '../i18n/translations';

const FlagMX = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="8" height="16" x="0" fill="#006847" />
    <rect width="8" height="16" x="8" fill="#FFFFFF" />
    <rect width="8" height="16" x="16" fill="#CE1126" />
    <circle cx="12" cy="8" r="2.4" fill="none" stroke="#8A5A2B" strokeWidth="0.6" />
    <circle cx="12" cy="8" r="1" fill="#8A5A2B" />
  </svg>
);

const FlagUS = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg" {...props}>
    {Array.from({ length: 13 }).map((_, i) => (
      <rect key={i} x="0" y={i * (16 / 13)} width="24" height={16 / 13} fill={i % 2 === 0 ? '#B22234' : '#FFFFFF'} />
    ))}
    <rect x="0" y="0" width="10" height={16 / 13 * 7} fill="#3C3B6E" />
    {Array.from({ length: 4 }).map((_, row) =>
      Array.from({ length: 6 }).map((_, col) => (
        <circle key={`${row}-${col}`} cx={1 + col * 1.6} cy={1 + row * 1.6} r={0.35} fill="#FFFFFF" />
      )),
    )}
  </svg>
);

const Footer = () => {
  const { lang, setLang, t } = useLang();
  const f = t.footer;

  return (
    <footer className="bg-black-deep py-12 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-8 flex flex-col items-center justify-center">

        <img src={logoImage} alt="SMOKETHECAVIAR" className="h-10 mb-6 mix-blend-screen opacity-50 hover:opacity-100 transition-opacity duration-300" />

        <p className="font-cormorant italic text-lg md:text-xl text-gold-metallic/80 text-center max-w-xl mb-10 leading-snug px-4">
          {f.manifesto}
        </p>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-10 text-xs md:text-sm text-gray-smoke tracking-widest uppercase font-semibold">
          <Link to="/"          className="hover:text-gold-metallic transition-colors">{f.navLinks.inicio}</Link>
          <Link to="/rituales"  className="hover:text-gold-metallic transition-colors">{f.navLinks.productos}</Link>
          <Link to="/sonido"    className="hover:text-gold-metallic transition-colors">{f.navLinks.artistas}</Link>
          <Link to="/sentir"    className="hover:text-gold-metallic transition-colors">{f.navLinks.conciencia}</Link>
          <Link to="/nosotros"  className="hover:text-gold-metallic transition-colors">{f.navLinks.nosotros}</Link>
          <Link to="/experiencia"  className="hover:text-gold-metallic transition-colors">{f.navLinks.contacto}</Link>
        </div>

        {/* Language switcher */}
        <div className="mb-10 flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold-soft/70 font-semibold">
            {f.language}
          </span>
          <div role="radiogroup" aria-label={f.language} className="inline-flex items-center gap-1 p-1 rounded-full border border-white/10 bg-black-carbon/60">
            {(['es', 'en'] as LangKey[]).map((l) => (
              <button
                key={l}
                type="button"
                role="radio"
                aria-checked={lang === l}
                onClick={() => setLang(l)}
                className={`group inline-flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
                  lang === l
                    ? 'bg-gold-metallic/15 text-gold-metallic shadow-[0_0_14px_rgba(212,175,55,0.25)]'
                    : 'text-gray-smoke hover:text-white-ivory'
                }`}
              >
                {l === 'es'
                  ? <FlagMX className="w-5 h-3.5 rounded-[2px] ring-1 ring-black/30" aria-hidden />
                  : <FlagUS className="w-5 h-3.5 rounded-[2px] ring-1 ring-black/30" aria-hidden />
                }
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full h-[1px] bg-white/5 mb-8" />

        <div className="flex flex-col md:flex-row w-full justify-between items-center text-xs text-gray-smoke/50 gap-4">
          <p>&copy; {new Date().getFullYear()} SMOKETHECAVIAR. {f.rights}</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white-ivory transition-colors">{f.terms}</a>
            <a href="#" className="hover:text-white-ivory transition-colors">{f.privacy}</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
