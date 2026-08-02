"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { products } from "@/lib/products";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  desc: string;
  details: string[];
  quantity: number;
  size?: string;
}

interface StoredCartItem {
  id: number;
  quantity: number;
  size?: string;
}

function getStoredCart(): StoredCartItem[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("cart");
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      const entries = Object.entries(parsed) as [string, number][];
      const migrated: StoredCartItem[] = entries
        .filter(([, qty]) => qty > 0)
        .map(([id, quantity]) => ({ id: Number(id), quantity }));
      localStorage.setItem("cart", JSON.stringify(migrated));
      return migrated;
    }
    return parsed as StoredCartItem[];
  } catch {
    return [];
  }
}

function saveCart(cart: StoredCartItem[]) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function MinusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
  );
}

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  );
}

function TrashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
  );
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const loadCart = () => {
    const stored = getStoredCart();
    const items = stored
      .filter((item) => item.quantity > 0)
      .map((item) => {
        const product = (products as any)[item.id];
        if (!product) return null;
        return { ...product, quantity: item.quantity, size: item.size };
      })
      .filter(Boolean) as CartItem[];
    setCartItems(items);
  };

  useEffect(() => {
    loadCart();

    const productIdParam = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("id") : null;
    const sizeParam = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("size") : null;
    if (productIdParam) {
      const id = Number(productIdParam);
      const stored = getStoredCart();
      const existingIndex = stored.findIndex((item) => item.id === id && item.size === sizeParam);
      if (existingIndex >= 0) {
        stored[existingIndex].quantity += 1;
      } else {
        stored.push({ id, quantity: 1, size: sizeParam || undefined });
      }
      saveCart(stored);
      loadCart();
      if (typeof window !== "undefined") {
        window.history.replaceState({}, "", "/cart");
      }
    }
  }, []);

  const updateQuantity = (productId: number, delta: number, size?: string) => {
    const stored = getStoredCart();
    const index = stored.findIndex((item) => item.id === productId && item.size === size);
    if (index === -1) return;
    const newQty = stored[index].quantity + delta;
    if (newQty <= 0) {
      removeItem(productId, size);
      return;
    }
    stored[index].quantity = newQty;
    saveCart(stored);
    loadCart();
  };

  const removeItem = (productId: number, size?: string) => {
    const stored = getStoredCart();
    const filtered = stored.filter((item) => !(item.id === productId && item.size === size));
    saveCart(filtered);
    loadCart();
  };

  const clearCart = () => {
    saveCart([]);
    loadCart();
  };

  const total = cartItems.reduce((sum, item) => {
    const price = Number(item.price.replace("₹", "").replace("$", ""));
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-white">
      <Navbar backLink hideCartIcon />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-10">Your Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-gray-600 mb-6">Your cart is empty.</p>
              <Link href="/" className="inline-flex items-center justify-center rounded-full bg-black px-8 py-3.5 text-base font-medium text-white hover:bg-gray-800 transition-colors">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size || "no-size"}`} className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 border border-gray-100 rounded-2xl p-4">
                    <div className="w-full sm:w-24 h-48 sm:h-24 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
                      <p className="text-base font-bold text-gray-900 mt-1">{item.price}</p>
                      {item.size && <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>}
                      <div className="mt-3 inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, -1, item.size)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-l-full text-gray-600 hover:bg-gray-50 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <MinusIcon />
                        </button>
                        <span className="w-10 text-center text-sm font-semibold text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1, item.size)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-r-full text-gray-600 hover:bg-gray-50 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <PlusIcon />
                        </button>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:gap-3">
                      <p className="text-base font-bold text-gray-900">₹{Number(item.price.replace("₹", "").replace("$", "")) * item.quantity}</p>
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                      >
                        <TrashIcon />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border border-gray-100 rounded-2xl p-6 h-fit">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-100 pt-4 flex justify-between text-base font-semibold text-gray-900 mb-6">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
                <div className="space-y-3">
                  <button className="w-full inline-flex items-center justify-center rounded-full bg-black px-8 py-3.5 text-base font-medium text-white hover:bg-gray-800 transition-colors">
                    Checkout
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-3.5 text-base font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
