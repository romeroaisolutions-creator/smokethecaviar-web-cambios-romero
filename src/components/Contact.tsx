import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Mail, Send, MessageCircleHeart } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

interface Experience {
  id: string;
  message: string;
  date: string;
}

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

const socialIcons = [IconInstagram, IconFacebook, IconYoutube];
const socialUrls = ['https://www.instagram.com/creador_records?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', '#', '#'];
const socialColors = ['from-pink-500/20 to-purple-500/20', 'from-blue-500/20 to-indigo-500/20', 'from-red-500/20 to-rose-500/20'];

const STORAGE_KEY = 'stc_experiences';

function loadExperiences(): Experience[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

const Contact = () => {
  const { t } = useLang();
  const co = t.contact;
  const containerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [experiences, setExperiences] = useState<Experience[]>(loadExperiences);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-header', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: '.contact-header', start: 'top 85%' },
      });
      gsap.fromTo('.social-card', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.socials-grid', start: 'top 80%' },
      });
      gsap.fromTo('.contact-form', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-form', start: 'top 85%' },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExp: Experience = {
      id: Date.now().toString(),
      message,
      date: new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }),
    };
    const updated = [newExp, ...experiences];
    setExperiences(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSent(true);
    setTimeout(() => { setSent(false); setEmail(''); setMessage(''); }, 3000);
  };

  return (
    <section id="contacto" ref={containerRef} className="py-20 md:py-28 bg-black-deep relative overflow-hidden scroll-mt-20">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gold-metallic/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-8 relative z-10">
        <div className="contact-header text-center mb-12 md:mb-14">
          <span className="text-gold-soft uppercase tracking-[0.3em] text-sm font-semibold mb-4 block">{co.label}</span>
          <h2 className="text-5xl md:text-6xl font-playfair mb-6 text-glow">{co.h2}</h2>
          <p className="text-gray-smoke max-w-2xl mx-auto text-lg leading-relaxed">{co.p}</p>
        </div>

        <div className="socials-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-14">
          {co.socials.map((s, i) => {
            const Icon = socialIcons[i];
            const url = socialUrls[i];
            const isExternal = url !== '#';
            return (
              <a key={s.name} href={url} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener noreferrer' : undefined}
                className={`social-card group relative p-8 rounded-2xl bg-gradient-to-br ${socialColors[i]} border border-white/5 hover:border-gold-metallic/40 transition-all duration-500 hover:-translate-y-1 hover:glow-gold flex flex-col items-center text-center`}>
                <div className="w-16 h-16 rounded-full bg-black-deep/60 border border-white/10 flex items-center justify-center mb-5 text-white-ivory group-hover:text-gold-metallic transition-colors">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-playfair mb-1">{s.name}</h3>
                <p className="text-sm text-gray-smoke tracking-wide">{s.handle}</p>
              </a>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="contact-form max-w-2xl mx-auto bg-black-carbon border border-white/5 rounded-2xl p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="w-5 h-5 text-gold-metallic" />
            <h3 className="text-xl font-playfair">{co.formTitle}</h3>
          </div>
          <div className="space-y-4">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder={co.emailPlaceholder}
              className="w-full bg-black-deep border border-white/10 rounded-xl px-4 py-3 text-white-ivory placeholder:text-gray-smoke/60 focus:border-gold-metallic/50 focus:outline-none transition-colors" />
            <textarea required value={message} onChange={(e) => setMessage(e.target.value)}
              placeholder={co.messagePlaceholder} rows={4}
              className="w-full bg-black-deep border border-white/10 rounded-xl px-4 py-3 text-white-ivory placeholder:text-gray-smoke/60 focus:border-gold-metallic/50 focus:outline-none transition-colors resize-none" />
            <button type="submit" disabled={sent}
              className="group relative w-full py-4 bg-gold-metallic text-black-deep font-semibold rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all duration-300 glow-gold disabled:opacity-70 overflow-hidden hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] text-sm md:text-base px-4">
              {sent ? co.sent : (
                <>
                  <Send className="w-4 h-4 shrink-0 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  {co.submit}
                </>
              )}
              <span aria-hidden className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 opacity-0 group-hover:opacity-100 group-hover:translate-x-[400%] transition-all duration-[1100ms] ease-out" />
            </button>
          </div>
        </form>

        {experiences.length > 0 && (
          <div className="mt-16 md:mt-20">
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="h-px flex-1 bg-white/5" />
              <div className="flex items-center gap-2 text-gold-soft">
                <MessageCircleHeart className="w-4 h-4" />
                <span className="text-xs uppercase tracking-[0.3em] font-semibold">
                  {t.contact.label === 'Experiencia' ? 'Experiencias compartidas' : 'Shared Experiences'}
                </span>
              </div>
              <div className="h-px flex-1 bg-white/5" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {experiences.map((exp) => (
                <div key={exp.id} className="group relative p-6 rounded-2xl bg-black-carbon border border-white/5 hover:border-gold-metallic/30 transition-all duration-500">
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-gold-metallic/10 border border-gold-metallic/20 flex items-center justify-center">
                    <MessageCircleHeart className="w-3 h-3 text-gold-soft" />
                  </div>
                  <p className="text-white-ivory text-sm leading-relaxed font-cormorant italic text-lg mb-4 pr-8">
                    "{exp.message}"
                  </p>
                  <p className="text-gray-smoke/50 text-[10px] uppercase tracking-widest">{exp.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;
