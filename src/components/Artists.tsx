import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Play } from 'lucide-react';
import brunoImg from '../assets/ai_artist_bruno_1776036091766.jpeg';
import lucyImg from '../assets/ai_artist_lucy_1776036107775.jpeg';

const aiArtists = [
  { id: 'bruno', name: 'Bruno Caviar', image: brunoImg, role: 'Audio Alchemist', spotifyUrl: 'https://open.spotify.com/artist/2Sx7HLcon8MRblEBD0cu0g?si=drQ8ZcWjSwimrW-oLGummg' },
  { id: 'lucy', name: 'Lucy Luxury', image: lucyImg, role: 'Sonic Architect', spotifyUrl: 'https://open.spotify.com/artist/3taQ0HLo0j4rdxeZ6zqeEH?si=BgE1HtvhTrqBijKiHmr4Qg' }
];

const Artists = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.artist-header',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: '.artist-header', start: 'top 85%' } }
      );

      // Cards slide + blur
      gsap.fromTo('.artist-card',
        { x: (i) => i % 2 === 0 ? -50 : 50, opacity: 0, filter: 'blur(20px)' },
        { 
          x: 0, opacity: 1, filter: 'blur(0px)', duration: 1.5, stagger: 0.3, ease: 'power3.out',
          scrollTrigger: { trigger: '.artists-grid', start: 'top 70%' } 
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="artistas" ref={containerRef} className="py-32 bg-transparent relative overflow-hidden scroll-mt-20">
      {/* Subtle violet/gold gradients */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-gold-metallic/5 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="artist-header text-center mb-24">
          <span className="text-gold-soft uppercase tracking-[0.3em] text-sm font-semibold mb-4 block">Digital Gods</span>
          <h2 className="text-5xl md:text-6xl font-playfair text-white-ivory mb-6">Musa Generativa</h2>
          <p className="text-gray-smoke max-w-2xl mx-auto text-lg leading-relaxed">
            Arte y sonido creados 100% con inteligencia artificial. Una nueva era donde el lujo también se escucha.
          </p>
        </div>

        <div className="artists-grid grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {aiArtists.map((artist) => (
            <div key={artist.id} className="artist-card group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer bg-black-deep/50 border border-white/5">
              
              {/* Image with Glitch/Glow hover effect */}
              <div className="absolute inset-0 bg-cover bg-center transition-all duration-1000 group-hover:scale-105 group-hover:blur-[2px] opacity-100" style={{ backgroundImage: `url(${artist.image})` }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black-deep via-black-deep/50 to-transparent"></div>
              
              {/* Glitch overlay line simulation */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-purple-500/50 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>

              {/* Content */}
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <span className="text-purple-400 font-mono text-sm tracking-widest mb-2 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">{artist.role}</span>
                <h3 className="text-4xl font-playfair text-white-ivory mb-6 group-hover:text-glow transition-all duration-500">{artist.name}</h3>
                
                <p className="text-gray-smoke text-sm max-w-xs mb-8 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 border-l border-gold-metallic/50 pl-4 py-1">
                  Sonidos esculpidos algoritmicamente para acompañar tus rituales.
                </p>

                {artist.spotifyUrl ? (
                  <a href={artist.spotifyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-500/50 py-4 rounded-xl text-white-ivory group/btn transition-all duration-300 hover:glow-gold">
                    <Play className="w-5 h-5 fill-white-ivory group-hover/btn:text-purple-400 group-hover/btn:fill-purple-400 transition-colors" />
                    <span className="font-semibold tracking-wide">Escuchar en Spotify</span>
                  </a>
                ) : (
                  <button className="flex items-center justify-center gap-3 w-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-500/50 py-4 rounded-xl text-white-ivory group/btn transition-all duration-300 hover:glow-gold">
                    <Play className="w-5 h-5 fill-white-ivory group-hover/btn:text-purple-400 group-hover/btn:fill-purple-400 transition-colors" />
                    <span className="font-semibold tracking-wide">Próximamente...</span>
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Artists;
