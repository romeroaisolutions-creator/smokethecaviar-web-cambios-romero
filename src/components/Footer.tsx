import logoImage from '../assets/brand_logo.png';

const Footer = () => {
  return (
    <footer className="bg-black-deep py-12 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-8 flex flex-col items-center justify-center">

        <img src={logoImage} alt="SMOKETHECAVIAR" className="h-10 mb-8 mix-blend-screen opacity-50 hover:opacity-100 transition-opacity duration-300" />

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12 text-xs md:text-sm text-gray-smoke tracking-widest uppercase font-semibold">
          <a href="#inicio" className="hover:text-gold-metallic transition-colors">Inicio</a>
          <a href="#productos" className="hover:text-gold-metallic transition-colors">Productos</a>
          <a href="#artistas" className="hover:text-gold-metallic transition-colors">Artistas</a>
          <a href="#conciencia" className="hover:text-gold-metallic transition-colors">Conciencia</a>
          <a href="#nosotros" className="hover:text-gold-metallic transition-colors">Nosotros</a>
          <a href="#contacto" className="hover:text-gold-metallic transition-colors">Contacto</a>
        </div>

        <div className="w-full h-[1px] bg-white/5 mb-8"></div>

        <div className="flex flex-col md:flex-row w-full justify-between items-center text-xs text-gray-smoke/50 gap-4">
          <p>&copy; {new Date().getFullYear()} SMOKETHECAVIAR. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white-ivory transition-colors">Términos</a>
            <a href="#" className="hover:text-white-ivory transition-colors">Privacidad</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
