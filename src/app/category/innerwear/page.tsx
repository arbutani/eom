import Link from "next/link";
import { items } from "@/lib/items";
import ProductCard from "@/components/product-card";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

function ArrowRightIcon({ size = 18 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  );
}

export default function InnerwearPage() {
  const innerwearProducts = Object.values(items).filter(
    (p) => p.category === "innerwear" || p.category === "bras" || p.category === "briefs"
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              Women&apos;s Innerwear
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comfortable and stylish innerwear for everyday confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-20">
            <Link href="/category/innerwear/bras" className="group block">
              <div className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 aspect-[4/3]">
                <img
                  src="/12.webp"
                  alt="Bras"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                  <h3 className="font-display text-xl font-semibold text-white">Bras</h3>
                  <p className="text-sm text-gray-200 mt-1">Supportive & comfortable</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-white mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    Shop now <ArrowRightIcon size={14} />
                  </span>
                </div>
              </div>
            </Link>
            <Link href="/category/innerwear/briefs" className="group block">
              <div className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 aspect-[4/3]">
                <img
                  src="/13.webp"
                  alt="Briefs"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                  <h3 className="font-display text-xl font-semibold text-white">Briefs</h3>
                  <p className="text-sm text-gray-200 mt-1">Soft & breathable</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-white mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    Shop now <ArrowRightIcon size={14} />
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-4">
              All Innerwear Products
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {innerwearProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
