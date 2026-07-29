"use client";

import { products } from "@/lib/products";
import { useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function ProductPage() {
  const params = useParams();
  const baseId = Number(params.id);
  const baseProduct = products[baseId as keyof typeof products];
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showSizeError, setShowSizeError] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<number>(baseId);

  if (!baseProduct) {
    notFound();
  }

  const isAnarkali = baseId === 4 || baseId === 5;
  const variants = isAnarkali ? [products[4], products[5]].filter(Boolean) : [];
  const product = isAnarkali ? (selectedVariant === 5 && products[5] ? products[5] : products[4]) : baseProduct;

  const hasMultipleImages = "images" in product && Array.isArray((product as any).images);
  const sizes = (product as any).sizes;

  const handleAddToCart = (e: React.MouseEvent) => {
    if (!selectedSize) {
      setShowSizeError(true);
      e.preventDefault();
    }
  };

  const addToCartHref = selectedSize
    ? `/cart?id=${product.id}&size=${encodeURIComponent(selectedSize)}`
    : "#";

  return (
    <div className="min-h-screen bg-white">
      <Navbar backLink />

      {/* Product Detail */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              {hasMultipleImages ? (
                <div className="grid grid-cols-2 gap-4">
                  {(product as any).images.map((img: string, idx: number) => (
                    <div key={idx} className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                      <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-contain" style={{clipPath: 'inset(0 0 20px 0)'}} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center text-9xl">
                  {product.image}
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4 break-words">{product.name}</h1>

              <div className="flex items-center gap-3 mb-6">
                <p className="text-3xl font-bold text-gray-900">{product.price}</p>
                {(product as any).originalPrice && (
                  <>
                    <p className="text-xl text-gray-500 line-through">{(product as any).originalPrice}</p>
                    <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">{(product as any).discount}</span>
                  </>
                )}
              </div>

              {isAnarkali && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Choose Style</h3>
                  <div className="flex flex-wrap gap-3">
                    {variants.map((variant: any) => {
                      const isSelected = selectedVariant === variant.id;
                      return (
                        <button
                          key={variant.id}
                          onClick={() => { setSelectedVariant(variant.id); setSelectedSize(null); setShowSizeError(false); }}
                          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                            isSelected
                              ? "border-black bg-black text-white"
                              : "border-gray-300 bg-white text-gray-700 hover:border-gray-900 hover:text-gray-900"
                          }`}
                        >
                          {variant.id === 4 ? "Style 1" : "Style 2"}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <p className="text-lg text-gray-600 mb-6 leading-relaxed">{product.desc}</p>

              {sizes && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Select Size</h3>
                  <div className="flex flex-wrap gap-3">
                    {sizes.map((size: string) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          onClick={() => { setSelectedSize(size); setShowSizeError(false); }}
                          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                            isSelected
                              ? "border-black bg-black text-white"
                              : "border-gray-300 bg-white text-gray-700 hover:border-gray-900 hover:text-gray-900"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                  {showSizeError && <p className="text-sm text-brand mt-2">Please select a size before adding to cart.</p>}
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.details.map((detail) => {
                    const [label, value] = detail.split(": ");
                    return (
                      <div key={detail} className="flex justify-between text-sm border-b border-gray-100 pb-2">
                        <span className="text-gray-500">{label}</span>
                        <span className="text-gray-900 font-medium text-right">{value || detail}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Link
                href={addToCartHref}
                onClick={handleAddToCart}
                className="inline-flex items-center justify-center rounded-full bg-black px-8 py-3.5 text-base font-medium text-white hover:bg-gray-800 transition-colors w-fit"
              >
                Add to Cart
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
