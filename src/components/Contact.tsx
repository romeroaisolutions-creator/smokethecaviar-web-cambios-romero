import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Mail, Send } from 'lucide-react';

const IconInstagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="1" fill="currentColor" />
  </svg>
);

const IconFacebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.6-1.6H17V4.2c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.4v2.3H7.2V14H10v8h3.5z" />
  </svg>
);

const IconYoutube = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15.1V8.9l5.2 3.1L10 15.1z" />
  </svg>
);

const socials = [
  {
    name: 'Instagram',
    handle: '@creador_records',
    icon: IconInstagram,
    url: 'https://www.instagram.com/creador_records?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    color: 'from-pink-500/20 to-purple-500/20',
  },
  {
    name: 'Facebook',
    handle: 'Próximamente',
    icon: IconFacebook,
    url: '#',
    color: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    name: 'YouTube',
    handle: 'Próximamente',
    icon: IconYoutube,
    url: '#',
    color: 'from-red-500/20 to-rose-500/20',
  },
];

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-header',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: '.contact-header', start: 'top 85%' } }
      );

      gsap.fromTo('.social-card',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.socials-grid', start: 'top 80%' },
        }
      );

      gsap.fromTo('.contact-form',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-form', start: 'top 85%' },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setEmail('');
      setMessage('');
    }, 3000);
  };

  return (
    <section
      id="contacto"
      ref={containerRef}
      className="py-32 bg-black-deep relative overflow-hidden scroll-mt-20"
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gold-metallic/10 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-8 relative z-10">
        <div className="contact-header text-center mb-20">
          <span className="text-gold-soft uppercase tracking-[0.3em] text-sm font-semibold mb-4 block">
            Conéctate
          </span>
          <h2 className="text-5xl md:text-6xl font-playfair mb-6 text-glow">Contacto</h2>
          <p className="text-gray-smoke max-w-2xl mx-auto text-lg leading-relaxed">
            Escríbenos, síguenos, o únete al ritual. Las puertas del círculo están abiertas.
          </p>
        </div>

        {/* Socials */}
        <div className="socials-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {socials.map((s) => {
            const Icon = s.icon;
            const isExternal = s.url !== '#';
            return (
              <a
                key={s.name}
                href={s.url}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className={`social-card group relative p-8 rounded-2xl bg-gradient-to-br ${s.color} border border-white/5 hover:border-gold-metallic/40 transition-all duration-500 hover:-translate-y-1 hover:glow-gold flex flex-col items-center text-center`}
              >
                <div className="w-16 h-16 rounded-full bg-black-deep/60 border border-white/10 flex items-center justify-center mb-5 text-white-ivory group-hover:text-gold-metallic transition-colors">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-playfair mb-1">{s.name}</h3>
                <p className="text-sm text-gray-smoke tracking-wide">{s.handle}</p>
              </a>
            );
          })}
        </div>

        {/* Contact form */}
        <form
          onSubmit={handleSubmit}
          className="contact-form max-w-2xl mx-auto bg-black-carbon border border-white/5 rounded-2xl p-8 md:p-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <Mail className="w-5 h-5 text-gold-metallic" />
            <h3 className="text-xl font-playfair">Escríbenos directamente</h3>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu email"
              className="w-full bg-black-deep border border-white/10 rounded-xl px-4 py-3 text-white-ivory placeholder:text-gray-smoke/60 focus:border-gold-metallic/50 focus:outline-none transition-colors"
            />
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tu mensaje"
              rows={4}
              className="w-full bg-black-deep border border-white/10 rounded-xl px-4 py-3 text-white-ivory placeholder:text-gray-smoke/60 focus:border-gold-metallic/50 focus:outline-none transition-colors resize-none"
            />
            <button
              type="submit"
              disabled={sent}
              className="w-full py-4 bg-gold-metallic text-black-deep font-semibold rounded-xl flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 transition-transform glow-gold disabled:opacity-70"
            >
              {sent ? (
                <>Enviado — Gracias</>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Enviar mensaje
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
