"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { items } from "@/lib/items";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

const WHATSAPP_NUMBER = "919313853668";

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

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.16 8.2v3.5c0 5.4-4.6 9.9-10.1 9.9-.7 0-1.5-.1-2.2-.3-.4 0-.8.3-1 .6-.2.3-.6.5-.9.5-.7.1-1.3.1-2-.1-1.4-.4-2.6-1.5-3.6-2.8-.2-.3-.3-.6-.3-.9 0-.5.4-.9.9-1 2.8-.8 4.6-3.2 5.3-6 .1-.6.4-1 .9-1.3.3-.2.6-.3.9-.3.4 0 .8.2 1 .5.5.8.8 1.7.9 2.6.2 1 .1 2-.1 3z"/><path d="M15.7 9.3a4.7 4.7 0 0 1-2.4 2.4 4.7 4.7 0 0 1-5.5-5.5 4.7 4.7 0 0 1 2.4-2.4 4.7 4.7 0 0 1 5.5 5.5Z"/></svg>
  );
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    houseNo: "",
    buildingSociety: "",
    floorNumber: "",
    streetRoad: "",
    areaLocality: "",
    landmark: "",
    city: "",
    district: "",
    state: "",
    pinCode: "",
    country: "India",
  });

  const loadCart = () => {
    const stored = getStoredCart();
    const mappedItems = stored
      .filter((item) => item.quantity > 0)
      .map((item) => {
        const product = (items as any)[item.id];
        if (!product) return null;
        return { ...product, quantity: item.quantity, size: item.size };
      })
      .filter(Boolean) as CartItem[];
    setCartItems(mappedItems);
  };

  useEffect(() => {
    loadCart();
  }, []);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar backLink hideCartIcon />
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center py-20">
            <p className="text-lg text-gray-600 mb-6">Your cart is empty.</p>
            <Link href="/" className="inline-flex items-center justify-center rounded-full bg-black px-8 py-3.5 text-base font-medium text-white hover:bg-gray-800 transition-colors">
              Continue Shopping
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const total = cartItems.reduce((sum, item) => {
    const price = Number(item.price.replace("₹", "").replace("$", ""));
    return sum + price * item.quantity;
  }, 0);

  const formatPrice = (priceStr: string, qty: number) => {
    const price = Number(priceStr.replace("₹", "").replace("$", ""));
    return `₹${price * qty}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const required = formData.fullName || formData.mobileNumber || formData.houseNo || formData.buildingSociety || formData.streetRoad || formData.areaLocality || formData.city || formData.district || formData.state || formData.pinCode;
    if (!required) {
      alert("Please fill in all required fields.");
      return;
    }

    const address = `${formData.houseNo}${formData.buildingSociety ? `, ${formData.buildingSociety}` : ""}${formData.floorNumber ? `, Floor ${formData.floorNumber}` : ""}, ${formData.streetRoad}, ${formData.areaLocality}${formData.landmark ? `, Landmark: ${formData.landmark}` : ""}, ${formData.city}, ${formData.district}, ${formData.state} - ${formData.pinCode}, ${formData.country}`;

    let message = "📦 *NEW ORDER - Bloom & Curve*\n\n";

    message += "👤 *Customer Details*\n";
    message += `*Name:* ${formData.fullName}\n`;
    message += `*Mobile:* ${formData.mobileNumber}\n`;
    message += `*Address:* ${address}\n\n`;

    message += "🛍️ *Order Details*\n";
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (ID: ${item.id})`;
      if (item.size) message += ` (Size: ${item.size})`;
      message += ` - Qty: ${item.quantity} - ${formatPrice(item.price, item.quantity)}\n`;
    });

    message += `\n💰 *Total Amount:* ₹${total}\n`;
    message += `\nThank you for your order! 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    saveCart([]);
    setCartItems([]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar backLink hideCartIcon />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-10">Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-6">
                <div className="border border-gray-100 rounded-2xl p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                      <input
                        type="tel"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        placeholder="+91 XXXXXXXX99"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="houseNo" className="block text-sm font-medium text-gray-700 mb-2">House / Flat / Door Number *</label>
                      <input
                        type="text"
                        id="houseNo"
                        name="houseNo"
                        value={formData.houseNo}
                        onChange={handleChange}
                        placeholder="123"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="buildingSociety" className="block text-sm font-medium text-gray-700 mb-2">Building / Society Name *</label>
                      <input
                        type="text"
                        id="buildingSociety"
                        name="buildingSociety"
                        value={formData.buildingSociety}
                        onChange={handleChange}
                        placeholder="Sunrise Apartments"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="floorNumber" className="block text-sm font-medium text-gray-700 mb-2">Floor Number <span className="text-gray-400">(optional)</span></label>
                      <input
                        type="text"
                        id="floorNumber"
                        name="floorNumber"
                        value={formData.floorNumber}
                        onChange={handleChange}
                        placeholder="2nd Floor"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="streetRoad" className="block text-sm font-medium text-gray-700 mb-2">Street / Road Name *</label>
                      <input
                        type="text"
                        id="streetRoad"
                        name="streetRoad"
                        value={formData.streetRoad}
                        onChange={handleChange}
                        placeholder="Main Road"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="areaLocality" className="block text-sm font-medium text-gray-700 mb-2">Area / Locality *</label>
                      <input
                        type="text"
                        id="areaLocality"
                        name="areaLocality"
                        value={formData.areaLocality}
                        onChange={handleChange}
                        placeholder="Sector 15"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="landmark" className="block text-sm font-medium text-gray-700 mb-2">Landmark <span className="text-gray-400">(optional)</span></label>
                      <input
                        type="text"
                        id="landmark"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleChange}
                        placeholder="Near bus stand"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">Village / Town / City *</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Mumbai"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-2">District *</label>
                      <input
                        type="text"
                        id="district"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        placeholder="Mumbai Suburban"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Maharashtra"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700 mb-2">PIN Code *</label>
                      <input
                        type="text"
                        id="pinCode"
                        name="pinCode"
                        value={formData.pinCode}
                        onChange={handleChange}
                        placeholder="400001"
                        maxLength={6}
                        minLength={6}
                        pattern="\d{6}"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <div className="border border-gray-100 rounded-2xl p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <WhatsAppIcon />
                    WhatsApp Order Confirmation
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Your order details will be sent to our WhatsApp number. After clicking &ldquo;Place Order on WhatsApp&rdquo;, you will be redirected to WhatsApp with a pre-filled message containing all your order details. Our team will contact you shortly to confirm the order.
                  </p>
                </div>
              </div>

              <div className="border border-gray-100 rounded-2xl p-6 h-fit">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-4 mb-4">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.size || "no-size"}`} className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity} {item.size && `| Size: ${item.size}`}</p>
                        <p className="text-sm font-bold text-gray-900">{formatPrice(item.price, item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-base font-semibold text-gray-900 pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-green-600 px-8 py-3.5 text-base font-medium text-white hover:bg-green-700 transition-colors"
                >
                  Place Order on WhatsApp
                  <WhatsAppIcon />
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
