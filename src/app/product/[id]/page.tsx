"use client";

import { items, type Item } from "@/lib/items";
import { useState, useEffect } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Lightbox from "@/components/lightbox";

function getStoredCart() {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("cart");
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item: any) => item.quantity > 0);
  } catch {
    return [];
  }
}

function isInCart(id: number) {
  const cart = getStoredCart();
  return cart.some((item: any) => item.id === id);
}

export default function ItemPage() {
  const params = useParams();
  const baseId = Number(params.id);
  const baseItem = items[baseId as keyof typeof items];
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showSizeError, setShowSizeError] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    setInCart(isInCart(baseId));
  }, [baseId, selectedSize]);

  if (!baseItem) {
    notFound();
  }

  const product = baseItem;
  const hasMultipleImages = "images" in product && Array.isArray((product as any).images);
  const sizes = (product as any).sizes;
  const allImages: { src: string; alt: string }[] = hasMultipleImages
    ? (product as any).images.map((src: string) => ({ src, alt: product.name }))
    : [{ src: product.image, alt: product.name }];

  const handleAddToCart = (e: React.MouseEvent) => {
    if (!selectedSize) {
      setShowSizeError(true);
      e.preventDefault();
    }
  };

  const addToCartHref = selectedSize
    ? `/cart?id=${product.id}&size=${encodeURIComponent(selectedSize)}&qty=${quantity}`
    : "#";

  const isAddToCartDisabled = !selectedSize || inCart;

  return (
    <div className="min-h-screen bg-white">
      <Navbar backLink />

      {/* Item Detail */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              {hasMultipleImages ? (
                <div className="grid grid-cols-2 gap-4">
                  {(product as any).images.map((img: string, idx: number) => (
                    <div key={idx} className="aspect-square bg-gray-100 rounded-2xl overflow-hidden cursor-pointer" onClick={() => { setLightboxIndex(idx); setLightboxOpen(true); }}>
                      <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center text-9xl cursor-pointer" onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}>
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

              <p className="text-lg text-gray-600 mb-6 leading-relaxed">{product.desc}</p>

              {sizes && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Select Size</h3>
                  <div className="flex flex-wrap gap-3">
                    {sizes.map((size: string) => {
                      const isSelected = selectedSize === size;
                      const availableSizes = (product as any).availableSizes;
                      const isAvailable = !availableSizes || availableSizes.includes(size);
                      return (
                        <button
                          key={size}
                          onClick={() => { if (isAvailable) { setSelectedSize(size); setShowSizeError(false); } }}
                          disabled={!isAvailable}
                          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                            isSelected
                              ? "border-black bg-black text-white"
                              : isAvailable
                                ? "border-gray-300 bg-white text-gray-700 hover:border-gray-900 hover:text-gray-900"
                                : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
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
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Item Highlights</h3>
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

              <div className="mb-8">
                {inCart && (
                  <p className="text-sm text-brand mb-3">This item is already in your cart. Remove it from cart to add again.</p>
                )}
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
                <div className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
                    disabled={quantity <= 1}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-l-full text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-sm font-semibold text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(q + 1, 1))}
                    disabled={quantity >= 1}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-r-full text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <Link
                href={addToCartHref}
                onClick={handleAddToCart}
                className={`inline-flex items-center justify-center rounded-full bg-black px-8 py-3.5 text-base font-medium text-white hover:bg-gray-800 transition-colors w-fit ${isAddToCartDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
              >
                {inCart ? "This product is already in your cart" : "Add to Cart"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Lightbox images={allImages} initialIndex={lightboxIndex} open={lightboxOpen} onClose={() => setLightboxOpen(false)} />

      <Footer />
    </div>
  );
}
