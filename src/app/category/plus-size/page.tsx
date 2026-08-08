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

export default function PlusSizePage() {
  const plusSizeProducts = Object.values(items)
    .filter((p) => ["dresses-gowns", "bottomwear", "tops-tees"].includes(p.category))
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              Plus Size Collection
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover trendy plus-size fashion crafted for every body.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
            <Link href="/category/plus-size/dresses-gowns" className="group block">
              <div className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 aspect-[4/3]">
                <img
                  src="/5.webp"
                  alt="Plus Size Dresses and Gowns"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                  <h3 className="font-display text-xl font-semibold text-white">Plus Size - Dresses &amp; Gowns</h3>
                  <p className="text-sm text-gray-200 mt-1">Elegant fits for every occasion</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-white mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    Shop now <ArrowRightIcon size={14} />
                  </span>
                </div>
              </div>
            </Link>
            <Link href="/category/plus-size/tops-tees" className="group block">
              <div className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 aspect-[4/3]">
                <img
                  src="/6.webp"
                  alt="Plus Size Tops and Tees"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                  <h3 className="font-display text-xl font-semibold text-white">Plus Size - Tops &amp; Tees</h3>
                  <p className="text-sm text-gray-200 mt-1">Comfortable daily wear</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-white mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    Shop now <ArrowRightIcon size={14} />
                  </span>
                </div>
              </div>
            </Link>
            <Link href="/category/plus-size/bottomwear" className="group block">
              <div className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 aspect-[4/3]">
                <img
                  src="/7.webp"
                  alt="Plus Size Bottomwear"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                  <h3 className="font-display text-xl font-semibold text-white">Plus Size - Bottomwear</h3>
                  <p className="text-sm text-gray-200 mt-1">Perfect fits from waist down</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-white mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    Shop now <ArrowRightIcon size={14} />
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-4">
              All Plus Size Products
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {plusSizeProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
