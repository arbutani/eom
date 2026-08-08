import { items } from "@/lib/items";
import ProductCard from "@/components/product-card";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function PlusSizeBottomwearPage() {
  const categoryProducts = Object.values(items).filter((p) => p.category === "bottomwear");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              Plus Size - Bottomwear
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Plus-size bottomwear crafted for comfort and style.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
