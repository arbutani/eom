import Link from "next/link";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

function ArrowRightIcon({ size = 18 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  );
}

function TruckIcon({ size = 16 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>
  );
}

function ShieldCheckIcon({ size = 16 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
  );
}

function SparklesIcon({ size = 16 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>
  );
}

function ShirtIcon({ size = 16 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 .55.45 1 1 1h10c.55 0 1-.45 1-1V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>
  );
}

function HeartIcon({ size = 16 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
  );
}

export default function HeroPage() {
  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');

        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        .animate-fade-up { animation: fadeInUp 0.8s ease-out both; }
        .animate-fade-up-1 { animation: fadeInUp 0.8s ease-out 0.1s both; }
        .animate-fade-up-2 { animation: fadeInUp 0.8s ease-out 0.25s both; }
        .animate-fade-up-3 { animation: fadeInUp 0.8s ease-out 0.4s both; }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-float-slow { animation: float 7s ease-in-out infinite 1s; }
      `}</style>

      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden font-body">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#CC6E8A]/10 via-white to-amber-50" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#CC6E8A]/10 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-20 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left: text */}
            <div className="text-center lg:text-left">
              <div className="animate-fade-up inline-flex items-center gap-2 bg-white border border-[#CC6E8A]/20 rounded-full px-4 py-1.5 mb-6 shadow-sm">
                <SparklesIcon size={14} />
                <span className="text-xs font-medium text-gray-700 font-body">New arrivals every week</span>
              </div>

              <h1 className="animate-fade-up-1 font-display text-5xl md:text-6xl lg:text-6xl font-semibold tracking-tight text-gray-900 mb-6 leading-[1.1]">
                Shop smarter, <span className="text-[#CC6E8A] italic">live better</span>
              </h1>
              <p className="animate-fade-up-2 text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Discover a world of premium products with unbeatable quality and prices.
                We bring the best shopping experience right to your doorstep.
              </p>

              <div className="animate-fade-up-3 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="#categories"
                  className="inline-flex items-center justify-center gap-2 bg-[#CC6E8A] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-[#CC6E8A]/90 hover:-translate-y-0.5 transition-all shadow-sm hover:shadow-lg"
                >
                  Shop Now
                  <ArrowRightIcon />
                </a>
                <a
                  href="#categories"
                  className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-3.5 rounded-full font-semibold border border-gray-200 hover:bg-gray-50 hover:-translate-y-0.5 transition-all"
                >
                  Explore Categories
                </a>
              </div>

              <div className="animate-fade-up-3 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-3 mt-12 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <TruckIcon />
                  <span>Free & fast delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheckIcon />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <SparklesIcon />
                  <span>Handpicked quality</span>
                </div>
              </div>
            </div>

            {/* Right: image */}
            <div className="relative animate-fade-up-2">
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5] max-w-md mx-auto">
                <img
                  src="/1.png"
                  alt="Ethnic wear collection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* floating cards */}
              <div className="animate-float absolute -top-6 -left-4 sm:-left-8 bg-white rounded-2xl shadow-lg px-5 py-3 hidden sm:flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#CC6E8A]/10 flex items-center justify-center text-[#CC6E8A]">
                  <ShirtIcon size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 font-body">Plus Size</p>
                  <p className="text-xs text-gray-500 font-body">Sizes that fit every body</p>
                </div>
              </div>

              <div className="animate-float-slow absolute -bottom-6 -right-4 sm:-right-8 bg-white rounded-2xl shadow-lg px-5 py-3 hidden sm:flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                  <HeartIcon size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 font-body">Maternity</p>
                  <p className="text-xs text-gray-500 font-body">Comfort made stylish</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-24 font-body">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our collections curated just for you.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Link href="/category/plus-size" className="group block">
              <div className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 aspect-[4/3]">
                <img
                  src="/2.png"
                  alt="Plus Size collection"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                  <h3 className="font-display text-2xl font-semibold text-white">Plus Size</h3>
                  <p className="text-sm text-gray-200 mt-1">Trendy fashion for every occasion</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-white mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    Shop now <ArrowRightIcon size={14} />
                  </span>
                </div>
              </div>
            </Link>
            <Link href="/category/maternity" className="group block">
              <div className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 aspect-[4/3]">
                <img
                  src="/3.png"
                  alt="Maternity collection"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                  <h3 className="font-display text-2xl font-semibold text-white">Maternity</h3>
                  <p className="text-sm text-gray-200 mt-1">Comfortable and stylish wear</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-white mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    Shop now <ArrowRightIcon size={14} />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 overflow-hidden font-body">
  <div className="absolute inset-0">
    <img
      src="/4.png"
      alt="Fashion background"
      className="w-full h-full object-cover object-center"
      style={{ objectPosition: "40% 38%" }}
    />
    <div className="absolute inset-0 bg-gray-900/80" />
  </div>
  <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-6">
      Ready to transform your shopping experience?
    </h2>
    <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
      Join thousands of satisfied customers who have already made the switch. Start your journey today.
    </p>
          <a
            href="#categories"
            className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-3.5 rounded-full font-semibold hover:bg-gray-100 hover:-translate-y-0.5 transition-all shadow-sm"
          >
            Start Shopping
            <ArrowRightIcon />
          </a>
  </div>
</section>

      <Footer />
    </div>
  );
}