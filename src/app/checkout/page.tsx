"use client";

import { useState, useEffect, useRef } from "react";
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

interface FormErrors {
  fullName?: string;
  phoneNumber?: string;
  pinCode?: string;
  state?: string;
  city?: string;
  houseNo?: string;
  roadArea?: string;
  gpsLocation?: string;
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

function LocationIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
  );
}

function LockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M21 12a9 9 0 1 1-9-9" /></svg>
  );
}

function formatINR(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    alternatePhone: "",
    pinCode: "",
    state: "",
    city: "",
    houseNo: "",
    roadArea: "",
    landmark: "",
    addressType: "home",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [gpsLocation, setGpsLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);
  const [showAlternatePhone, setShowAlternatePhone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fieldRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const gpsSectionRef = useRef<HTMLDivElement | null>(null);

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
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            </div>
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

  const itemPriceTotal = (priceStr: string, qty: number) => {
    const price = Number(priceStr.replace("₹", "").replace("$", ""));
    return formatINR(price * qty);
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    const { fullName, phoneNumber, pinCode, state, city, houseNo, roadArea } = formData;

    if (!fullName.trim()) next.fullName = "Please enter your full name.";
    if (!phoneNumber.trim()) {
      next.phoneNumber = "Please enter your phone number.";
    } else if (!/^\+?\d{10,13}$/.test(phoneNumber.replace(/\s/g, ""))) {
      next.phoneNumber = "Enter a valid 10-digit phone number.";
    }
    if (!houseNo.trim()) next.houseNo = "Please enter your house / building details.";
    if (!roadArea.trim()) next.roadArea = "Please enter your road, area or colony.";
    if (!city.trim()) next.city = "Please enter your city.";
    if (!state.trim()) next.state = "Please enter your state.";
    if (!pinCode.trim()) {
      next.pinCode = "Please enter your PIN code.";
    } else if (!/^\d{6}$/.test(pinCode)) {
      next.pinCode = "PIN code must be 6 digits.";
    }
    if (!gpsLocation) next.gpsLocation = "Please capture your GPS location below.";

    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstErrorField = Object.keys(validationErrors)[0];
      if (firstErrorField === "gpsLocation") {
        gpsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        const el = fieldRefs.current[firstErrorField];
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        el?.focus();
      }
      return;
    }

    setIsSubmitting(true);

    const { fullName, phoneNumber, pinCode, state, city, houseNo, roadArea } = formData;
    const addressTypeLabel = formData.addressType === "home" ? "Home" : "Work";
    const address = `${houseNo}, ${roadArea}${formData.landmark ? `, Landmark: ${formData.landmark}` : ""}, ${city}, ${state} - ${pinCode}`;
    const locationStr = `Lat: ${gpsLocation!.lat.toFixed(6)}, Lng: ${gpsLocation!.lng.toFixed(6)}`;

    let message = "📦 *NEW ORDER - Bloom & Curve*\n\n";

    message += "👤 *Customer Details*\n";
    message += `*Name:* ${fullName}\n`;
    message += `*Phone:* ${phoneNumber}\n`;
    if (formData.alternatePhone) message += `*Alternate Phone:* ${formData.alternatePhone}\n`;
    message += `*Address Type:* ${addressTypeLabel}\n`;
    message += `*Address:* ${address}\n`;
    message += `*GPS Location:* ${locationStr}\n\n`;

    message += "🛍️ *Order Details*\n";
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (ID: ${item.id})`;
      if (item.size) message += ` (Size: ${item.size})`;
      message += ` - Qty: ${item.quantity} - ${itemPriceTotal(item.price, item.quantity)}\n`;
    });

    message += `\n💰 *Total Amount:* ${formatINR(total)}\n`;
    message += `\nThank you for your order! 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    saveCart([]);
    setCartItems([]);
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getLocation = () => {
    setLocationError("");
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLocationLoading(false);
        setErrors((prev) => ({ ...prev, gpsLocation: undefined }));
      },
      (err) => {
        setLocationLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setLocationError("Location access was denied. Please allow location access in your browser settings and try again.");
        } else {
          setLocationError("Couldn't fetch your location. Please try again — " + err.message);
        }
      }
    );
  };

  const inputClass = (hasError?: boolean) =>
    `w-full px-4 py-3 rounded-lg border ${
      hasError ? "border-red-400 focus:border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-black focus:ring-black/10"
    } focus:outline-none focus:ring-2 transition-all`;

  return (
    <div className="min-h-screen bg-white">
      <Navbar backLink hideCartIcon />

      <section className="py-10 md:py-16 pb-32 lg:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-2">Checkout</h1>
          <p className="text-sm text-gray-500 mb-8 md:mb-10">Fill in your delivery details and confirm your order over WhatsApp.</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
              <div className="lg:col-span-2 space-y-6">
                <div className="border border-gray-100 rounded-2xl p-5 md:p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs font-semibold text-white flex-shrink-0">1</span>
                    <h2 className="text-lg font-semibold text-gray-900">Contact Details</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input
                        ref={(el) => { fieldRefs.current.fullName = el; }}
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={inputClass(!!errors.fullName)}
                        aria-invalid={!!errors.fullName}
                      />
                      {errors.fullName && <p className="text-xs text-red-500 mt-1.5">{errors.fullName}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <div className="flex items-start gap-2">
                        <div className="flex-1">
                          <input
                            ref={(el) => { fieldRefs.current.phoneNumber = el; }}
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="+91 XXXXXXXX99"
                            className={inputClass(!!errors.phoneNumber)}
                            aria-invalid={!!errors.phoneNumber}
                          />
                          {errors.phoneNumber && <p className="text-xs text-red-500 mt-1.5">{errors.phoneNumber}</p>}
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowAlternatePhone(!showAlternatePhone)}
                          aria-label={showAlternatePhone ? "Remove alternate phone number" : "Add alternate phone number"}
                          className="flex-shrink-0 w-[46px] h-[46px] flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-xl font-bold leading-none">{showAlternatePhone ? "−" : "+"}</span>
                        </button>
                      </div>
                      {showAlternatePhone && (
                        <div className="mt-3">
                          <label htmlFor="alternatePhone" className="block text-sm font-medium text-gray-700 mb-2">Alternate Phone Number <span className="text-gray-400">(optional)</span></label>
                          <input
                            type="tel"
                            id="alternatePhone"
                            name="alternatePhone"
                            value={formData.alternatePhone}
                            onChange={handleChange}
                            placeholder="+91 XXXXXXXX99"
                            className={inputClass()}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border border-gray-100 rounded-2xl p-5 md:p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs font-semibold text-white flex-shrink-0">2</span>
                    <h2 className="text-lg font-semibold text-gray-900">Delivery Address</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label htmlFor="houseNo" className="block text-sm font-medium text-gray-700 mb-2">House No. / Building Name *</label>
                      <input
                        ref={(el) => { fieldRefs.current.houseNo = el; }}
                        type="text"
                        id="houseNo"
                        name="houseNo"
                        value={formData.houseNo}
                        onChange={handleChange}
                        placeholder="123, Sunrise Apartments"
                        className={inputClass(!!errors.houseNo)}
                        aria-invalid={!!errors.houseNo}
                      />
                      {errors.houseNo && <p className="text-xs text-red-500 mt-1.5">{errors.houseNo}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="roadArea" className="block text-sm font-medium text-gray-700 mb-2">Road Name / Area / Colony *</label>
                      <input
                        ref={(el) => { fieldRefs.current.roadArea = el; }}
                        type="text"
                        id="roadArea"
                        name="roadArea"
                        value={formData.roadArea}
                        onChange={handleChange}
                        placeholder="Main Road, Sector 15"
                        className={inputClass(!!errors.roadArea)}
                        aria-invalid={!!errors.roadArea}
                      />
                      {errors.roadArea && <p className="text-xs text-red-500 mt-1.5">{errors.roadArea}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="landmark" className="block text-sm font-medium text-gray-700 mb-2">Nearby Famous Shop / Mall / Landmark <span className="text-gray-400">(optional)</span></label>
                      <input
                        type="text"
                        id="landmark"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleChange}
                        placeholder="Near bus stand"
                        className={inputClass()}
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                      <input
                        ref={(el) => { fieldRefs.current.city = el; }}
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Mumbai"
                        className={inputClass(!!errors.city)}
                        aria-invalid={!!errors.city}
                      />
                      {errors.city && <p className="text-xs text-red-500 mt-1.5">{errors.city}</p>}
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                      <input
                        ref={(el) => { fieldRefs.current.state = el; }}
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Maharashtra"
                        className={inputClass(!!errors.state)}
                        aria-invalid={!!errors.state}
                      />
                      {errors.state && <p className="text-xs text-red-500 mt-1.5">{errors.state}</p>}
                    </div>
                    <div>
                      <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700 mb-2">PIN Code *</label>
                      <input
                        ref={(el) => { fieldRefs.current.pinCode = el; }}
                        type="text"
                        inputMode="numeric"
                        id="pinCode"
                        name="pinCode"
                        value={formData.pinCode}
                        onChange={handleChange}
                        placeholder="400001"
                        maxLength={6}
                        className={inputClass(!!errors.pinCode)}
                        aria-invalid={!!errors.pinCode}
                      />
                      {errors.pinCode && <p className="text-xs text-red-500 mt-1.5">{errors.pinCode}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-3">Type of Address *</label>
                      <div className="flex gap-3">
                        {[
                          { value: "home", label: "🏠 Home" },
                          { value: "work", label: "🏢 Work" },
                        ].map((opt) => (
                          <label
                            key={opt.value}
                            className={`flex-1 cursor-pointer text-center rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                              formData.addressType === opt.value
                                ? "border-black bg-black text-white"
                                : "border-gray-200 text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <input
                              type="radio"
                              name="addressType"
                              value={opt.value}
                              checked={formData.addressType === opt.value}
                              onChange={handleRadioChange}
                              className="sr-only"
                            />
                            {opt.label}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="sm:col-span-2" ref={gpsSectionRef}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">GPS Location *</label>
                      <button
                        type="button"
                        onClick={getLocation}
                        disabled={locationLoading}
                        className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                          gpsLocation
                            ? "border-green-600 bg-green-50 text-green-700"
                            : "border-blue-600 bg-blue-600 text-white hover:bg-blue-700 hover:border-blue-700"
                        } disabled:opacity-60 disabled:cursor-not-allowed`}
                      >
                        {locationLoading ? (
                          <Spinner />
                        ) : gpsLocation ? (
                          <CheckCircleIcon />
                        ) : (
                          <LocationIcon />
                        )}
                        {locationLoading ? "Fetching location..." : gpsLocation ? "Location Captured" : "Get Location"}
                      </button>
                      {gpsLocation && (
                        <p className="text-xs text-gray-500 mt-1.5">
                          Lat: {gpsLocation.lat.toFixed(6)}, Lng: {gpsLocation.lng.toFixed(6)}
                        </p>
                      )}
                      {locationError && (
                        <p className="text-xs text-red-500 mt-1.5">{locationError}</p>
                      )}
                      {errors.gpsLocation && !locationError && (
                        <p className="text-xs text-red-500 mt-1.5">{errors.gpsLocation}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border border-gray-100 rounded-2xl p-5 md:p-6">
                  <h2 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-green-600"><WhatsAppIcon /></span>
                    WhatsApp Order Confirmation
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Your order details will be sent to our WhatsApp number. After tapping &ldquo;Place Order on WhatsApp&rdquo;, you&apos;ll be redirected to WhatsApp with a pre-filled message containing your order. Our team will contact you shortly to confirm.
                  </p>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="border border-gray-100 rounded-2xl p-6 sticky top-6">
                  <OrderSummary cartItems={cartItems} total={total} itemPriceTotal={itemPriceTotal} isSubmitting={isSubmitting} />
                </div>
              </div>

              {/* Mobile order summary (inline, above the sticky CTA bar) */}
              <div className="lg:hidden border border-gray-100 rounded-2xl p-5">
                <OrderSummary cartItems={cartItems} total={total} itemPriceTotal={itemPriceTotal} isSubmitting={isSubmitting} hideSubmit />
              </div>
            </div>

            {/* Sticky mobile CTA bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 border-t border-gray-100 bg-white/95 backdrop-blur px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
                <div>
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="text-lg font-bold text-gray-900">{formatINR(total)}</p>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-3.5 text-base font-medium text-white hover:bg-green-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? <Spinner /> : <WhatsAppIcon />}
                  {isSubmitting ? "Opening..." : "Place Order"}
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

function OrderSummary({
  cartItems,
  total,
  itemPriceTotal,
  isSubmitting,
  hideSubmit,
}: {
  cartItems: CartItem[];
  total: number;
  itemPriceTotal: (price: string, qty: number) => string;
  isSubmitting: boolean;
  hideSubmit?: boolean;
}) {
  return (
    <>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary ({cartItems.length})</h3>
      <div className="space-y-4 mb-4 max-h-[320px] overflow-y-auto pr-1">
        {cartItems.map((item) => (
          <div key={`${item.id}-${item.size || "no-size"}`} className="flex items-center gap-3">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
              <p className="text-xs text-gray-500">Qty: {item.quantity} {item.size && `| Size: ${item.size}`}</p>
              <p className="text-sm font-bold text-gray-900">{itemPriceTotal(item.price, item.quantity)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-100 pt-4 space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span>{formatINR(total)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Shipping</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>
        <div className="flex justify-between text-base font-semibold text-gray-900 pt-2 border-t border-gray-100">
          <span>Total</span>
          <span>{formatINR(total)}</span>
        </div>
      </div>
      {!hideSubmit && (
        <>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-8 py-3.5 text-base font-medium text-white hover:bg-green-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? <Spinner /> : <WhatsAppIcon />}
            {isSubmitting ? "Opening WhatsApp..." : "Place Order on WhatsApp"}
          </button>
          <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mt-3">
            <LockIcon /> Order confirmed securely via WhatsApp
          </p>
        </>
      )}
    </>
  );
}