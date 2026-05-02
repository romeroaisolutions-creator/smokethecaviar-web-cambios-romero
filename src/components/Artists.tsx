import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Play } from 'lucide-react';
import brunoImg from '../assets/ai_artist_bruno_1776036091766.jpeg';
import lucyImg from '../assets/ai_artist_lucy_1776036107775.jpeg';
import creadorLogoImg from '../../logo_creador_records/Logo_creador_records.png';
import creadorLetrasImg from '../../logo_creador_records/Letras_logo_creador_records.png';
import { useLang } from '../context/LanguageContext';

const images: Record<string, string> = { bruno: brunoImg, lucy: lucyImg };
const spotifyUrls: Record<string, string | null> = {
  bruno: 'https://open.spotify.com/artist/2Sx7HLcon8MRblEBD0cu0g?si=drQ8ZcWjSwimrW-oLGummg',
  lucy:  'https://open.spotify.com/artist/3taQ0HLo0j4rdxeZ6zqeEH?si=BgE1HtvhTrqBijKiHmr4Qg',
};
const artistNames: Record<string, string> = { bruno: 'Bruno Caviar', lucy: 'Lucy Luxury' };

const Artists = () => {
  const { t } = useLang();
  const ar = t.artists;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.artist-header', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: '.artist-header', start: 'top 85%' },
      });
      gsap.fromTo('.artist-card',
        { x: (i) => i % 2 === 0 ? -50 : 50, opacity: 0, filter: 'blur(20px)' },
        { x: 0, opacity: 1, filter: 'blur(0px)', duration: 1.5, stagger: 0.3, ease: 'power3.out',
          scrollTrigger: { trigger: '.artists-grid', start: 'top 70%' } },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="artistas" ref={containerRef} className="py-20 md:py-28 bg-transparent relative overflow-hidden scroll-mt-20">
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-gold-metallic/5 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="artist-header text-center mb-12 md:mb-16">
          <span className="text-gold-soft uppercase tracking-[0.3em] text-sm font-semibold mb-4 block">{ar.label}</span>
          <h2 className="text-5xl md:text-6xl font-playfair text-white-ivory mb-6">{ar.h2}</h2>
          <p className="text-gray-smoke max-w-2xl mx-auto text-lg leading-relaxed">{ar.p}</p>
        </div>

        <div className="artist-header mt-10 mb-14 md:mb-16 flex flex-col items-center gap-6 border-t border-white/5 pt-10">
          <div className="flex items-center gap-6">
            <img src={creadorLogoImg} alt="Creador Records" className="h-16 md:h-20 object-contain mix-blend-screen opacity-90" />
            <img src={creadorLetrasImg} alt="Creador Records" className="h-10 md:h-14 object-contain mix-blend-screen opacity-90" />
          </div>
        </div>

        <div className="artists-grid grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {ar.list.map((artist) => {
            const spotifyUrl = spotifyUrls[artist.id];
            return (
              <div key={artist.id} className="artist-card group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer bg-black-deep/50 border border-white/5">
                <div className="absolute inset-0 bg-cover bg-center transition-all duration-1000 group-hover:scale-105 group-hover:blur-[2px]" style={{ backgroundImage: `url(${images[artist.id]})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black-deep via-black-deep/50 to-transparent" />
                <div className="absolute top-0 left-0 w-full h-[2px] bg-purple-500/50 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" />

                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <span className="text-purple-400 font-mono text-sm tracking-widest mb-2 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">{artist.role}</span>
                  <h3 className="text-4xl font-playfair text-white-ivory mb-6 group-hover:text-glow transition-all duration-500">{artistNames[artist.id]}</h3>
                  <p className="text-gray-smoke text-sm max-w-xs mb-8 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 border-l border-gold-metallic/50 pl-4 py-1">
                    {artist.desc}
                  </p>

                  {spotifyUrl ? (
                    <a href={spotifyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-500/50 py-4 rounded-xl text-white-ivory group/btn transition-all duration-300 hover:glow-gold">
                      <Play className="w-5 h-5 fill-white-ivory group-hover/btn:text-purple-400 group-hover/btn:fill-purple-400 transition-colors" />
                      <span className="font-semibold tracking-wide">{ar.listen}</span>
                    </a>
                  ) : (
                    <button className="flex items-center justify-center gap-3 w-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-500/50 py-4 rounded-xl text-white-ivory group/btn transition-all duration-300 hover:glow-gold">
                      <Play className="w-5 h-5 fill-white-ivory group-hover/btn:text-purple-400 group-hover/btn:fill-purple-400 transition-colors" />
                      <span className="font-semibold tracking-wide">{ar.comingSoon}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Artists;
