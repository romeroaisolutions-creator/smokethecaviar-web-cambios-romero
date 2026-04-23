import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Wallet, ShieldCheck, Gem, Sparkles, Fingerprint, Loader2, Leaf, Shirt } from 'lucide-react';
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
  { id: 1, name: "The Midnight Oil", displayPrice: "$120.000", price: 120000, category: "Full Spectrum CBD" },
  { id: 2, name: "Golden Ritual Balm", displayPrice: "$85.000", price: 85000, category: "Topical Premium" },
  { id: 3, name: "Caviar Elixir", displayPrice: "$150.000", price: 150000, category: "Isolate Pure" },
  { id: 4, name: "Obsidian Tincture", displayPrice: "$135.000", price: 135000, category: "Broad Spectrum" },
  { id: 5, name: "Lunar Drops", displayPrice: "$95.000", price: 95000, category: "Sleep Formula" },
  { id: 6, name: "Velvet Serum", displayPrice: "$110.000", price: 110000, category: "Skincare Ritual" },
  { id: 7, name: "Sacred Incense", displayPrice: "$60.000", price: 60000, category: "Aromatic Ritual" },
  { id: 8, name: "Noir Tea Blend", displayPrice: "$45.000", price: 45000, category: "Infusión Botánica" },
  { id: 9, name: "Kundalini Vape", displayPrice: "$180.000", price: 180000, category: "Vaporizer Premium" },
  { id: 10, name: "Royal Gummies", displayPrice: "$70.000", price: 70000, category: "Edible Luxury" },
];

const merchProducts: Product[] = [
  { id: 101, name: "Caviar Tee Black", displayPrice: "$55.000", price: 55000, category: "Playera Oversize" },
  { id: 102, name: "Ritual Hoodie", displayPrice: "$110.000", price: 110000, category: "Sudadera Premium" },
  { id: 103, name: "Gold Dad Cap", displayPrice: "$38.000", price: 38000, category: "Gorra Bordada" },
  { id: 104, name: "Smoke Snapback", displayPrice: "$45.000", price: 45000, category: "Gorra Snapback" },
  { id: 105, name: "Caviar Crewneck", displayPrice: "$95.000", price: 95000, category: "Sudadera Sin Capucha" },
  { id: 106, name: "Lucy Graphic Tee", displayPrice: "$60.000", price: 60000, category: "Playera Edición Artista" },
  { id: 107, name: "Noir Tote Bag", displayPrice: "$28.000", price: 28000, category: "Tote Minimalista" },
  { id: 108, name: "Gold Beanie", displayPrice: "$32.000", price: 32000, category: "Beanie Invierno" },
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
  const [payAllLoading, setPayAllLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'cbd' | 'merch'>('cbd');

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
      gsap.fromTo('.badge-item',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power2.out',
          scrollTrigger: { trigger: '.badges-container', start: 'top 80%' }
        }
      );

      gsap.fromTo('.order-cta',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: '.order-cta', start: 'top 90%' }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.product-card',
        { y: 40, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out',
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [activeTab]);

  const activeProducts = activeTab === 'cbd' ? cbdProducts : merchProducts;
  const activeImg = activeTab === 'cbd' ? cbdImg : merchImg;

  return (
    <section id="productos" ref={containerRef} className="py-32 bg-black-carbon relative border-b border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-8 relative z-10">

        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl mb-6">Nuestra Selección</h2>
          <div className="w-16 h-[2px] bg-gold-metallic mx-auto"></div>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-black-deep border border-white/5">
            <button
              onClick={() => setActiveTab('cbd')}
              className={`flex items-center gap-2 px-6 md:px-8 py-3 rounded-full text-sm font-semibold tracking-wide uppercase transition-all ${
                activeTab === 'cbd'
                  ? 'bg-gold-metallic text-black-deep glow-gold'
                  : 'text-gray-smoke hover:text-white-ivory'
              }`}
            >
              <Leaf className="w-4 h-4" />
              CBD
            </button>
            <button
              onClick={() => setActiveTab('merch')}
              className={`flex items-center gap-2 px-6 md:px-8 py-3 rounded-full text-sm font-semibold tracking-wide uppercase transition-all ${
                activeTab === 'merch'
                  ? 'bg-gold-metallic text-black-deep glow-gold'
                  : 'text-gray-smoke hover:text-white-ivory'
              }`}
            >
              <Shirt className="w-4 h-4" />
              Merch
            </button>
          </div>
        </div>

        {/* Category intro */}
        <div className="text-center mb-14">
          {activeTab === 'cbd' ? (
            <p className="text-gray-smoke max-w-2xl mx-auto text-lg font-light">
              Botánica premium para el ritual interior. Cada fórmula es una edición limitada.
            </p>
          ) : (
            <p className="text-gray-smoke max-w-2xl mx-auto text-lg font-light">
              Streetwear de culto. Prendas que llevan el manifiesto impreso en el tejido.
            </p>
          )}
        </div>

        {/* Product Grid */}
        <div key={activeTab} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-32">
          {activeProducts.map((prod) => (
            <div key={prod.id} className="product-card group relative bg-black-deep rounded-2xl p-6 border border-white/5 hover:border-gold-metallic/30 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:glow-gold">
              <div className="relative w-full aspect-square bg-[#0c0c0c] rounded-xl mb-6 overflow-hidden flex items-center justify-center mix-blend-lighten">
                <div className="absolute inset-0 bg-gradient-to-tr from-gold-metallic/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <img
                  src={activeImg}
                  alt={prod.name}
                  className="w-[80%] h-[80%] object-contain object-center group-hover:scale-110 transition-transform duration-700 z-0"
                />
              </div>

              <div className="flex flex-col items-center text-center">
                <span className="text-xs uppercase tracking-widest text-gold-soft mb-2 font-semibold">{prod.category}</span>
                <h3 className="text-2xl font-playfair mb-4">{prod.name}</h3>
                <span className="text-xl text-white-ivory font-light mb-6">{prod.displayPrice}</span>

                <button
                  onClick={() => handleBuy(prod)}
                  disabled={loadingId === prod.id}
                  className="w-full py-3 bg-white/5 text-white-ivory hover:bg-gold-metallic hover:text-black-deep rounded-lg transition-colors font-medium text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loadingId === prod.id ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Procesando...</>
                  ) : 'Comprar'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order System CTA */}
        <div className="order-cta relative p-10 md:p-14 rounded-2xl overflow-hidden bg-gradient-to-br from-black-deep via-[#161410] to-[#1c170d] border border-gold-metallic/20 mb-32 flex flex-col md:flex-row items-center justify-between gap-8 group">
          <div className="absolute right-0 top-0 w-64 h-64 bg-gold-metallic/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-gold-metallic/20 transition-colors duration-1000"></div>

          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-3xl md:text-4xl font-playfair mb-3">Accede a productos exclusivos</h3>
            <p className="text-gray-smoke text-lg">Pocas unidades. Calidad inquebrantable.</p>
          </div>

          <div className="relative z-10">
            <div className="relative group/btn">
              <button
                onClick={async () => {
                  setPayAllLoading(true);
                  try {
                    await redirectToCheckout(cbdProducts[0].name, cbdProducts[0].price);
                  } catch {
                    alert('Hubo un error al iniciar el pago. Intenta de nuevo.');
                  } finally {
                    setPayAllLoading(false);
                  }
                }}
                disabled={payAllLoading}
                className="px-10 py-5 bg-gold-metallic text-black-deep text-lg font-semibold rounded-xl flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 glow-gold disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {payAllLoading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Procesando...</>
                ) : (
                  <><Wallet className="w-5 h-5" /> Comprar ahora</>
                )}
              </button>
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover/btn:opacity-100 transition-opacity bg-black-deep border border-white/10 px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap text-xs shadow-xl">
                <ShieldCheck className="w-3 h-3 text-green-400" />
                Pagos seguros vía Mercado Pago
              </div>
            </div>
          </div>
        </div>

        {/* Luxury Badges / Value Strip */}
        <div className="badges-container grid grid-cols-1 md:grid-cols-3 gap-12 text-center border-t border-white/5 pt-20">
          <div className="badge-item flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gold-metallic/10 border border-gold-metallic/20 flex items-center justify-center mb-6 text-gold-metallic glow-gold">
              <Gem className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-semibold mb-2">CBD Premium Seleccionado</h4>
            <p className="text-gray-smoke text-sm">Extracción pura, sin compromisos.</p>
          </div>

          <div className="badge-item flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gold-metallic/10 border border-gold-metallic/20 flex items-center justify-center mb-6 text-gold-metallic glow-gold">
              <Fingerprint className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Experiencia Exclusiva</h4>
            <p className="text-gray-smoke text-sm">Un club privado para tus sentidos.</p>
          </div>

          <div className="badge-item flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gold-metallic/10 border border-gold-metallic/20 flex items-center justify-center mb-6 text-gold-metallic glow-gold">
              <Sparkles className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Arte + Tecnología</h4>
            <p className="text-gray-smoke text-sm">Innovación en cada detalle visual.</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Products;
