import { products } from "@/lib/products";
import ProductCard from "@/components/product-card";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function PlusSizePage() {
  const plusSizeProducts = [products[4], products[6], products[7], products[8], products[9]].filter(Boolean);

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
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {plusSizeProducts.map((product) => (
              product && <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
