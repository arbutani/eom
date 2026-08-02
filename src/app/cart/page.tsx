"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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

const products: Record<number, Omit<CartItem, "quantity" | "size">> = {
  1: {
    id: 1,
    name: "Premium Wireless Headphones",
    price: "$199",
    image: "🎧",
    desc: "High-quality wireless headphones with active noise cancellation, 30-hour battery life, and premium comfort.",
    details: ["Active Noise Cancellation", "30-hour Battery Life", "Premium Memory Foam Ear Cushions", "Bluetooth 5.0", "Built-in Microphone"],
  },
  2: {
    id: 2,
    name: "Smart Watch Series 5",
    price: "$299",
    image: "⌚",
    desc: "Advanced smartwatch with health tracking, GPS, and a stunning always-on display.",
    details: ["Always-On Retina Display", "Blood Oxygen Sensor", "GPS + Cellular", "Water Resistant 50m", "18-hour Battery Life"],
  },
  3: {
    id: 3,
    name: "Leather Backpack",
    price: "$149",
    image: "🎒",
    desc: "Genuine leather backpack designed for the modern professional.",
    details: ["Genuine Full-Grain Leather", "Padded Laptop Compartment", "Adjustable Shoulder Straps", "Multiple Pockets", "Water-Resistant Lining"],
  },
  4: {
    id: 4,
    name: "Anarkali Suit Women",
    price: "₹1200",
    image: "https://tinyurl.com/womwn",
    desc: "Kurti set with dupatta - Cotton kurta set with dupatta. Women Embroidery Bollywood Style Kurta and Pant set with Dupatta.",
    details: ["Bottom Type: Pants", "Fit/Shape: A-line", "Print/Pattern Type: Floral", "Kurta Fabric: Cotton Blend", "Brand: Fashion Mint"],
  },
  5: {
    id: 5,
    name: "Anarkali Suit Women - Purple",
    price: "₹1200",
    image: "https://images.meesho.com/images/products/530603959/irh0a_512.avif?width=512",
    desc: "Kurti set with dupatta - Cotton kurta set with dupatta. Women Embroidery Bollywood Style Kurta and Pant set with Dupatta.",
    details: ["Bottom Type: Pants", "Fit/Shape: A-line", "Print/Pattern Type: Floral", "Kurta Fabric: Cotton Blend", "Brand: Fashion Mint"],
  },
  6: {
    id: 6,
    name: "Daily Wear Kurti (Combo Pack 6 Kurta)",
    price: "₹1200",
    image: "https://images.meesho.com/images/products/347210675/hlddp_512.avif?width=512",
    desc: "Printed Crepe Straight Festival Kurti Wear - Combo Pack of 6 Kurtas",
    details: ["Color: Green", "Fabric: Poly Crepe", "Fit/Shape: A-line", "Length: Calf Length", "Brand: Glamson"],
  },
  7: {
    id: 7,
    name: "Traditional Cotton Ajrakh Printed Kurti For Women",
    price: "₹1200",
    image: "https://images.meesho.com/images/products/499906523/ldgd8_512.avif?width=512",
    desc: "Traditional Cotton Ajrakh Printed Kurti For Women - Black Color",
    details: ["Color: Black", "Fabric: Cotton Cambric", "Fit/Shape: Straight", "Length: Calf Length", "Brand: Glamson"],
  },
  8: {
    id: 8,
    name: "Women Kurta",
    price: "₹1200",
    image: "https://images.meesho.com/images/products/149834633/saqqo_512.avif?width=512",
    desc: "Women Kurta - Rayon fabric, Anarkali fit, Mint Green color",
    details: ["Color: Mint Green", "Fabric: Rayon", "Fit/Shape: Anarkali", "Length: Ankle Length", "Brand: Glamson"],
  },
  9: {
    id: 9,
    name: "Stylish Women Fancy Dresses l Casual & Party Wear",
    price: "₹297",
    image: "https://images.meesho.com/images/products/426443566/jvzf7_512.avif?width=512",
    desc: "Trendy western wear long frock for girls and women, party wear, stylish wear",
    details: ["Color: Black", "Fabric: Cotton Blend", "Fit/Shape: Fit and Flare", "Length: Maxi", "Neck: Square Neck", "Print/Pattern Type: Floral", "Sleeve Length: Short Sleeves", "Occasion: Casual", "Generic Name: Dresses", "Country of Origin: India"],
  },
};

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
        const product = products[item.id];
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
