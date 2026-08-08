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

export default function MaternityPage() {
  const maternityProducts = Object.values(items).filter((p) => p.category === "maternity");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              Maternity Collection
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comfortable and stylish maternity wear designed for expecting mothers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
            <Link href="/category/maternity/kurti-topwear" className="group block">
              <div className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 aspect-[4/3]">
                <img
                  src="/8.webp"
                  alt="Kurti &amp; Topwear"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                  <h3 className="font-display text-xl font-semibold text-white">Kurti &amp; Topwear</h3>
                  <p className="text-sm text-gray-200 mt-1">Soft &amp; breathable</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-white mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    Shop now <ArrowRightIcon size={14} />
                  </span>
                </div>
              </div>
            </Link>
            <Link href="/category/maternity/feeding-bras" className="group block">
              <div className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 aspect-[4/3]">
                <img
                  src="/9.webp"
                  alt="Feeding Bras"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                  <h3 className="font-display text-xl font-semibold text-white">Feeding Bras</h3>
                  <p className="text-sm text-gray-200 mt-1">Comfortable &amp; supportive</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-white mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    Shop now <ArrowRightIcon size={14} />
                  </span>
                </div>
              </div>
            </Link>
            <Link href="/category/maternity/briefs-bottomwear" className="group block">
              <div className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 aspect-[4/3]">
                <img
                  src="/10.webp"
                  alt="Briefs &amp; Bottomwear"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                  <h3 className="font-display text-xl font-semibold text-white">Briefs &amp; Bottomwear</h3>
                  <p className="text-sm text-gray-200 mt-1">Stretchable &amp; comfy</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-white mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    Shop now <ArrowRightIcon size={14} />
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-4">
              All Maternity Products
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {maternityProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
