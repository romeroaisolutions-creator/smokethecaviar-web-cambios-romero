import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  ShieldCheck,
  Gem,
  Sparkles,
  Fingerprint,
  Loader2,
  Leaf,
  Shirt,
  ChevronDown,
  ArrowUpRight,
} from 'lucide-react';
import cbdImg from '../assets/cbd_product_dark_1776035913207.png';
import merchImg from '../assets/brand_logo.png';

type Product = {
  id: number;
  name: string;
  displayPrice: string;
  price: number;
  category: string;
};

const cbdProducts: Product[] = [
  { id: 1, name: 'The Midnight Oil', displayPrice: '$120.000', price: 120000, category: 'Full Spectrum CBD' },
  { id: 2, name: 'Golden Ritual Balm', displayPrice: '$85.000', price: 85000, category: 'Topical Premium' },
  { id: 3, name: 'Caviar Elixir', displayPrice: '$150.000', price: 150000, category: 'Isolate Pure' },
  { id: 4, name: 'Obsidian Tincture', displayPrice: '$135.000', price: 135000, category: 'Broad Spectrum' },
  { id: 5, name: 'Lunar Drops', displayPrice: '$95.000', price: 95000, category: 'Sleep Formula' },
  { id: 6, name: 'Velvet Serum', displayPrice: '$110.000', price: 110000, category: 'Skincare Ritual' },
  { id: 7, name: 'Sacred Incense', displayPrice: '$60.000', price: 60000, category: 'Aromatic Ritual' },
  { id: 8, name: 'Noir Tea Blend', displayPrice: '$45.000', price: 45000, category: 'Infusión Botánica' },
  { id: 9, name: 'Kundalini Vape', displayPrice: '$180.000', price: 180000, category: 'Vaporizer Premium' },
  { id: 10, name: 'Royal Gummies', displayPrice: '$70.000', price: 70000, category: 'Edible Luxury' },
];

const merchProducts: Product[] = [
  { id: 101, name: 'Caviar Tee Black', displayPrice: '$55.000', price: 55000, category: 'Playera Oversize' },
  { id: 102, name: 'Ritual Hoodie', displayPrice: '$110.000', price: 110000, category: 'Sudadera Premium' },
  { id: 103, name: 'Gold Dad Cap', displayPrice: '$38.000', price: 38000, category: 'Gorra Bordada' },
  { id: 104, name: 'Smoke Snapback', displayPrice: '$45.000', price: 45000, category: 'Gorra Snapback' },
  { id: 105, name: 'Caviar Crewneck', displayPrice: '$95.000', price: 95000, category: 'Sudadera Sin Capucha' },
  { id: 106, name: 'Lucy Graphic Tee', displayPrice: '$60.000', price: 60000, category: 'Playera Edición Artista' },
  { id: 107, name: 'Noir Tote Bag', displayPrice: '$28.000', price: 28000, category: 'Tote Minimalista' },
  { id: 108, name: 'Gold Beanie', displayPrice: '$32.000', price: 32000, category: 'Beanie Invierno' },
];

async function redirectToCheckout(title: string, price: number) {
  const res = await fetch('/api/create-preference', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, price, quantity: 1 }),
  });
  if (!res.ok) throw new Error('Error al iniciar el pago');
  const { init_point } = await res.json();
  window.location.href = init_point;
}

const Products = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'cbd' | 'merch'>('cbd');
  const [revealed, setRevealed] = useState(false);

  const handleBuy = async (product: Product) => {
    setLoadingId(product.id);
    try {
      await redirectToCheckout(product.name, product.price);
    } catch (err) {
      console.error(err);
      alert('Hubo un error al iniciar el pago. Intenta de nuevo.');
    } finally {
      setLoadingId(null);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.collection-card',
        { y: 40, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.1,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.collection-grid', start: 'top 80%' },
        },
      );

      gsap.fromTo(
        '.badge-item',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power2.out',
          scrollTrigger: { trigger: '.badges-container', start: 'top 80%' },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Animar entrada de productos individuales sólo cuando se revela
  useEffect(() => {
    if (!revealed) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.product-row',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: 'power3.out' },
      );
    }, containerRef);
    return () => ctx.revert();
  }, [revealed, activeTab]);

  // Cerrar al cambiar de tab
  useEffect(() => {
    setRevealed(false);
  }, [activeTab]);

  const activeProducts = activeTab === 'cbd' ? cbdProducts : merchProducts;
  const activeImg = activeTab === 'cbd' ? cbdImg : merchImg;

  const collections = [
    {
      key: 'cbd' as const,
      icon: Leaf,
      title: 'Botánica del Ritual Interior',
      tag: 'Colección CBD',
      blurb:
        'Fórmulas para el cuerpo y la mente. Cada gota, cada bálsamo, una pausa elegida.',
      count: cbdProducts.length,
    },
    {
      key: 'merch' as const,
      icon: Shirt,
      title: 'Vestir el Manifiesto',
      tag: 'Colección Merch',
      blurb:
        'Prendas de culto. El símbolo dorado tejido en la piel cotidiana.',
      count: merchProducts.length,
    },
  ];

  return (
    <section
      id="productos"
      ref={containerRef}
      className="py-32 md:py-40 bg-black-carbon relative border-b border-white/5 scroll-mt-20 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold-metallic/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Header — narrativo, no comercial */}
        <div className="mb-16 md:mb-20 text-center max-w-2xl mx-auto">
          <span className="text-gold-soft uppercase tracking-[0.3em] text-sm font-semibold mb-4 block">
            Las Colecciones
          </span>
          <h2 className="text-4xl md:text-5xl mb-6 font-playfair text-glow">
            Objetos que sostienen el ritual
          </h2>
          <p className="text-gray-smoke text-lg leading-relaxed font-light">
            No son productos. Son extensiones del momento.
            Si la experiencia te encuentra, la colección estará aquí.
          </p>
        </div>

        {/* Two-collection presentation */}
        <div className="collection-grid grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-20">
          {collections.map((c) => {
            const Icon = c.icon;
            const isActive = activeTab === c.key;
            return (
              <button
                key={c.key}
                onClick={() => {
                  if (activeTab !== c.key) {
                    setActiveTab(c.key);
                    setRevealed(false);
                  }
                }}
                className={`collection-card group relative text-left overflow-hidden rounded-2xl p-8 md:p-10 border transition-all duration-700 ${
                  isActive
                    ? 'border-gold-metallic/50 bg-gradient-to-br from-black-deep via-[#161410] to-[#1c170d] shadow-[0_0_40px_rgba(212,175,55,0.12)]'
                    : 'border-white/5 bg-black-deep/60 hover:border-gold-metallic/25'
                }`}
              >
                {/* Decorative corner glow */}
                <div
                  className={`absolute -top-20 -right-20 w-56 h-56 rounded-full blur-[80px] transition-all duration-1000 ${
                    isActive ? 'bg-gold-metallic/25' : 'bg-gold-metallic/5 group-hover:bg-gold-metallic/15'
                  }`}
                />

                <div className="relative z-10 flex items-start justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors duration-500 ${
                          isActive
                            ? 'border-gold-metallic text-gold-metallic bg-gold-metallic/10'
                            : 'border-white/15 text-gray-smoke group-hover:border-gold-soft group-hover:text-gold-soft'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span
                        className={`text-xs uppercase tracking-[0.3em] font-semibold transition-colors ${
                          isActive ? 'text-gold-metallic' : 'text-gold-soft/70'
                        }`}
                      >
                        {c.tag}
                      </span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-playfair mb-4 leading-tight text-white-ivory">
                      {c.title}
                    </h3>
                    <p className="text-gray-smoke text-base md:text-lg leading-relaxed max-w-md mb-6 font-light">
                      {c.blurb}
                    </p>

                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold-soft/80">
                      <span>{c.count} piezas</span>
                      <span className="w-8 h-px bg-gold-soft/30" />
                      <span>Edición continua</span>
                    </div>
                  </div>

                  {/* Active marker */}
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-500 mt-2 ${
                      isActive
                        ? 'bg-gold-metallic shadow-[0_0_12px_rgba(212,175,55,0.8)] scale-110'
                        : 'bg-white/10 group-hover:bg-gold-soft/40'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Reveal trigger — invitación, no botón de compra */}
        <div className="text-center mb-12">
          <button
            onClick={() => setRevealed((v) => !v)}
            className="group inline-flex items-center gap-3 px-6 py-3 text-sm uppercase tracking-[0.25em] text-gold-soft hover:text-gold-metallic transition-colors"
            aria-expanded={revealed}
          >
            <span className="w-10 h-px bg-gold-soft/40 group-hover:bg-gold-metallic transition-colors" />
            {revealed ? 'Cerrar la colección' : 'Recorrer la colección'}
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-500 ${
                revealed ? 'rotate-180' : 'rotate-0'
              }`}
            />
            <span className="w-10 h-px bg-gold-soft/40 group-hover:bg-gold-metallic transition-colors" />
          </button>
        </div>

        {/* Products list — sólo aparece cuando el usuario quiere */}
        <div
          className={`grid transition-all duration-700 ease-out overflow-hidden ${
            revealed ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 mb-16 md:mb-24 max-w-5xl mx-auto">
              {activeProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="product-row group flex items-center justify-between gap-6 py-5 border-b border-white/5 hover:border-gold-metallic/30 transition-colors"
                >
                  <div className="flex items-center gap-5 min-w-0">
                    <div className="hidden sm:flex w-12 h-12 rounded-lg bg-black-deep border border-white/5 items-center justify-center overflow-hidden flex-shrink-0">
                      <img
                        src={activeImg}
                        alt=""
                        className="w-8 h-8 object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-[0.25em] text-gold-soft/80 mb-1 truncate">
                        {prod.category}
                      </div>
                      <div className="font-playfair text-lg md:text-xl text-white-ivory truncate">
                        {prod.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 flex-shrink-0">
                    <span className="text-sm font-light text-gray-smoke font-mono tracking-wider hidden sm:block">
                      {prod.displayPrice}
                    </span>
                    <button
                      onClick={() => handleBuy(prod)}
                      disabled={loadingId === prod.id}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-gray-smoke hover:text-gold-metallic transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loadingId === prod.id ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" /> Procesando
                        </>
                      ) : (
                        <>
                          Adquirir
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Subtle trust line */}
            <div className="flex justify-center mb-20">
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-gray-smoke/70">
                <ShieldCheck className="w-3 h-3 text-gold-soft/70" />
                Pagos seguros vía Mercado Pago
              </div>
            </div>
          </div>
        </div>

        {/* Value strip — esencia, no venta */}
        <div className="badges-container grid grid-cols-1 md:grid-cols-3 gap-12 text-center border-t border-white/5 pt-20">
          <div className="badge-item flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gold-metallic/5 border border-gold-metallic/20 flex items-center justify-center mb-5 text-gold-metallic">
              <Gem className="w-6 h-6" />
            </div>
            <h4 className="text-base font-medium mb-2 text-white-ivory">CBD Premium</h4>
            <p className="text-gray-smoke text-sm font-light">Extracción pura, sin compromisos.</p>
          </div>

          <div className="badge-item flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gold-metallic/5 border border-gold-metallic/20 flex items-center justify-center mb-5 text-gold-metallic">
              <Fingerprint className="w-6 h-6" />
            </div>
            <h4 className="text-base font-medium mb-2 text-white-ivory">Experiencia Privada</h4>
            <p className="text-gray-smoke text-sm font-light">Un círculo cerrado para los sentidos.</p>
          </div>

          <div className="badge-item flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gold-metallic/5 border border-gold-metallic/20 flex items-center justify-center mb-5 text-gold-metallic">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-base font-medium mb-2 text-white-ivory">Arte + Frecuencia</h4>
            <p className="text-gray-smoke text-sm font-light">Cada detalle vibra con intención.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
