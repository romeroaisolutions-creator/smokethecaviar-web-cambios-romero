import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  ShieldCheck,
  Gem,
  Sparkles,
  Fingerprint,
  Loader2,
  Shirt,
  ArrowUpRight,
} from 'lucide-react';
import merchImg from '../assets/brand_logo.png';

type Product = {
  id: number;
  name: string;
  displayPrice: string;
  price: number;
  category: string;
  type: 'tee' | 'hoodie' | 'cap' | 'access';
};

const merchProducts: Product[] = [
  { id: 101, name: 'Caviar Tee Black', displayPrice: '$55.000', price: 55000, category: 'Playera Oversize', type: 'tee' },
  { id: 102, name: 'Ritual Hoodie', displayPrice: '$110.000', price: 110000, category: 'Sudadera Premium', type: 'hoodie' },
  { id: 103, name: 'Gold Dad Cap', displayPrice: '$38.000', price: 38000, category: 'Gorra Bordada', type: 'cap' },
  { id: 104, name: 'Smoke Snapback', displayPrice: '$45.000', price: 45000, category: 'Gorra Snapback', type: 'cap' },
  { id: 105, name: 'Caviar Crewneck', displayPrice: '$95.000', price: 95000, category: 'Sudadera Sin Capucha', type: 'hoodie' },
  { id: 106, name: 'Lucy Graphic Tee', displayPrice: '$60.000', price: 60000, category: 'Playera Edición Artista', type: 'tee' },
  { id: 107, name: 'Noir Tote Bag', displayPrice: '$28.000', price: 28000, category: 'Tote Minimalista', type: 'access' },
  { id: 108, name: 'Gold Beanie', displayPrice: '$32.000', price: 32000, category: 'Beanie Invierno', type: 'access' },
];

const filters: { key: 'all' | Product['type']; label: string }[] = [
  { key: 'all', label: 'Todo' },
  { key: 'tee', label: 'Playeras' },
  { key: 'hoodie', label: 'Sudaderas' },
  { key: 'cap', label: 'Gorras' },
  { key: 'access', label: 'Accesorios' },
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
  const [activeFilter, setActiveFilter] = useState<'all' | Product['type']>('all');

  const visibleProducts = useMemo(
    () => (activeFilter === 'all' ? merchProducts : merchProducts.filter((p) => p.type === activeFilter)),
    [activeFilter],
  );

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

  // Re-animar al cambiar filtro
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.product-row',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out' },
      );
    }, containerRef);
    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <section
      id="productos"
      ref={containerRef}
      className="py-20 md:py-28 bg-black-carbon relative border-b border-white/5 scroll-mt-20 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold-metallic/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Header */}
        <div className="mb-10 md:mb-14 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-4">
            <Shirt className="w-4 h-4 text-gold-metallic" />
            <span className="text-gold-soft uppercase tracking-[0.3em] text-sm font-semibold">
              Mercancía
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-5 font-playfair text-glow">
            Vestir el Manifiesto
          </h2>
          <p className="text-gray-smoke text-lg leading-relaxed font-light">
            Prendas de culto. El símbolo dorado tejido en la piel cotidiana.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-12">
          {filters.map((f) => {
            const isActive = activeFilter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-4 md:px-5 py-2 rounded-full border text-xs md:text-sm uppercase tracking-[0.2em] transition-all duration-300 ${
                  isActive
                    ? 'border-gold-metallic bg-gold-metallic/10 text-gold-metallic shadow-[0_0_18px_rgba(212,175,55,0.18)]'
                    : 'border-white/10 text-gray-smoke hover:border-gold-soft/60 hover:text-white-ivory'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 mb-14 max-w-5xl mx-auto">
          {visibleProducts.map((prod) => (
            <div
              key={prod.id}
              className="product-row group flex items-center justify-between gap-6 py-5 border-b border-white/5 hover:border-gold-metallic/30 transition-colors"
            >
              <div className="flex items-center gap-5 min-w-0">
                <div className="hidden sm:flex w-12 h-12 rounded-lg bg-black-deep border border-white/5 items-center justify-center overflow-hidden flex-shrink-0">
                  <img
                    src={merchImg}
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

        {/* Trust line */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-gray-smoke/70">
            <ShieldCheck className="w-3 h-3 text-gold-soft/70" />
            Pagos seguros vía Mercado Pago
          </div>
        </div>

        {/* Value strip */}
        <div className="badges-container grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center border-t border-white/5 pt-14">
          <div className="badge-item flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gold-metallic/5 border border-gold-metallic/20 flex items-center justify-center mb-5 text-gold-metallic">
              <Gem className="w-6 h-6" />
            </div>
            <h4 className="text-base font-medium mb-2 text-white-ivory">Edición limitada</h4>
            <p className="text-gray-smoke text-sm font-light">Cada pieza, una declaración.</p>
          </div>

          <div className="badge-item flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gold-metallic/5 border border-gold-metallic/20 flex items-center justify-center mb-5 text-gold-metallic">
              <Fingerprint className="w-6 h-6" />
            </div>
            <h4 className="text-base font-medium mb-2 text-white-ivory">Diseño autoral</h4>
            <p className="text-gray-smoke text-sm font-light">Firma propia. Símbolo intransferible.</p>
          </div>

          <div className="badge-item flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gold-metallic/5 border border-gold-metallic/20 flex items-center justify-center mb-5 text-gold-metallic">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-base font-medium mb-2 text-white-ivory">Ritual + Estilo</h4>
            <p className="text-gray-smoke text-sm font-light">La marca como segunda piel.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
