"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";

function CartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
  );
}

const products = {
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
    originalPrice: "₹2700",
    image: "https://tinyurl.com/womwn",
    images: [
      "https://tinyurl.com/womwn",
      "https://tinyurl.com/hdfjsh",
      "https://tinyurl.com/youonrun",
      "https://tinyurl.com/tangolonh",
    ],
    desc: "Kurti set with dupatta - Cotton kurta set with dupatta. Women Embroidery Bollywood Style Kurta and Pant set with Dupatta.",
    details: ["Bottom Type: Pants", "Fit/Shape: A-line", "Print/Pattern Type: Floral", "Kurta Fabric: Cotton Blend", "Additional Details: Bottomwear Fabric: Cotton Blend", "Kurta Color: Purple", "Bottomwear Color: Purple", "Set Type: Kurta With Dupatta And Bottomwear", "Dupatta Fabric: Cotton Silk", "Dupatta Color: Purple", "Stitch Type: Stitched", "Length: Calf Length", "Neck: V-neck", "Sleeve Length: Three-Quarter Sleeves", "Sleeve Styling: Regular", "Pattern: Embroidered", "Ornamentation: Embroidered", "Net Quantity (N): Single", "Occasion: Party", "Brand: Fashion Mint", "Country of Origin: India"],
    discount: "56% off",
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "4XL", "5XL"],
  },
  5: {
    id: 5,
    name: "Anarkali Suit Women - Purple",
    price: "₹1200",
    originalPrice: "₹2700",
    image: "https://images.meesho.com/images/products/530603959/irh0a_512.avif?width=512",
    images: [
      "https://images.meesho.com/images/products/530603959/irh0a_512.avif?width=512",
      "https://images.meesho.com/images/products/530603959/bpzhj_512.avif?width=512",
      "https://images.meesho.com/images/products/530603959/c9lrx_512.avif?width=512",
    ],
    desc: "Kurti set with dupatta - Cotton kurta set with dupatta. Women Embroidery Bollywood Style Kurta and Pant set with Dupatta.",
    details: ["Bottom Type: Pants", "Fit/Shape: A-line", "Print/Pattern Type: Floral", "Kurta Fabric: Cotton Blend", "Additional Details: Bottomwear Fabric: Cotton Blend", "Kurta Color: Purple", "Bottomwear Color: Purple", "Set Type: Kurta With Dupatta And Bottomwear", "Dupatta Fabric: Cotton Silk", "Dupatta Color: Purple", "Stitch Type: Stitched", "Length: Calf Length", "Neck: V-neck", "Sleeve Length: Three-Quarter Sleeves", "Sleeve Styling: Regular", "Pattern: Embroidered", "Ornamentation: Embroidered", "Net Quantity (N): Single", "Occasion: Party", "Brand: Fashion Mint", "Country of Origin: India"],
    discount: "56% off",
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "4XL", "5XL"],
  },
  6: {
    id: 6,
    name: "Daily Wear Kurti (Combo Pack 6 Kurta)",
    price: "₹1200",
    originalPrice: "₹2700",
    image: "https://images.meesho.com/images/products/347210675/hlddp_512.avif?width=512",
    images: [
      "https://images.meesho.com/images/products/347210675/hdbmi_512.avif?width=512",
      "https://images.meesho.com/images/products/347210675/wfbiq_512.avif?width=512",
      "https://images.meesho.com/images/products/347210675/hlddp_512.avif?width=512",
      "https://images.meesho.com/images/products/347210675/gyz0z_512.avif?width=512",
    ],
    desc: "Printed Crepe Straight Festival Kurti Wear - Combo Pack of 6 Kurtas",
    details: ["Color: Green", "Fabric: Poly Crepe", "Fit/Shape: A-line", "Length: Calf Length", "Neck: Round", "Print/Pattern Type: Ethnic Motif", "Combo of: Combo of 6", "Ornamentation: Cutouts", "Stitch Type: Stitched", "Sleeve Length: Three-Quarter Sleeves", "Sleeve Styling: Regular", "Pattern: Printed", "Occasion: Daily", "Brand: Glamson", "Country of Origin: India"],
    discount: "56% off",
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
  },
  7: {
    id: 7,
    name: "Traditional Cotton Ajrakh Printed Kurti For Women",
    price: "₹1200",
    originalPrice: "₹2400",
    image: "https://images.meesho.com/images/products/499906523/ldgd8_512.avif?width=512",
    images: [
      "https://images.meesho.com/images/products/499906523/ldgd8_512.avif?width=512",
      "https://images.meesho.com/images/products/499906523/fl2ch_512.avif?width=512",
      "https://images.meesho.com/images/products/499906523/ksvu0_512.avif?width=512",
      "https://images.meesho.com/images/products/499906523/krsu2_512.avif?width=512",
    ],
    desc: "Traditional Cotton Ajrakh Printed Kurti For Women - Black Color",
    details: ["Color: Black", "Fabric: Cotton Cambric", "Fit/Shape: Straight", "Length: Calf Length", "Neck: Round", "Print/Pattern Type: Floral", "Combo of: Single", "Ornamentation: Tassels and Latkans", "Stitch Type: Stitched", "Sleeve Length: Three-Quarter Sleeves", "Sleeve Styling: Regular", "Pattern: Printed", "Occasion: Daily", "Generic Name: Kurtis", "Country of Origin: India"],
    discount: "82% off",
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "4XL", "5XL", "6XL"],
  },
  8: {
    id: 8,
    name: "Women Kurta",
    price: "₹1200",
    originalPrice: "₹2400",
    image: "https://images.meesho.com/images/products/149834633/saqqo_512.avif?width=512",
    images: [
      "https://images.meesho.com/images/products/149834633/saqqo_512.avif?width=512",
      "https://images.meesho.com/images/products/149834633/8qhpq_512.avif?width=64",
      "https://images.meesho.com/images/products/149834633/btwcl_512.avif?width=512",
    ],
    desc: "Women Kurta - Rayon fabric, Anarkali fit, Mint Green color. Perfect for daily wear.",
    details: ["Color: Mint Green", "Fabric: Rayon", "Fit/Shape: Anarkali", "Length: Ankle Length", "Neck: Mandarin", "Print/Pattern Type: Floral", "Combo of: Single", "Ornamentation: Show Button", "Stitch Type: Stitched", "Sleeve Length: Three-Quarter Sleeves", "Sleeve Styling: Regular", "Pattern: Printed", "Occasion: Daily", "Generic Name: Kurtis", "Country of Origin: India"],
    discount: "65% off",
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
  },
  9: {
    id: 9,
    name: "Stylish Women Fancy Dresses l Casual & Party Wear",
    price: "₹297",
    originalPrice: "₹599",
    image: "https://images.meesho.com/images/products/426443566/jvzf7_512.avif?width=512",
    images: [
      "https://images.meesho.com/images/products/426443566/jvzf7_512.avif?width=512",
      "https://images.meesho.com/images/products/426443566/oarod_512.avif?width=512",
      "https://images.meesho.com/images/products/426443566/xlshv_512.avif?width=512",
      "https://images.meesho.com/images/products/426443566/nsahw_512.avif?width=512",
    ],
    desc: "Trendy western wear long frock for girls and women, party wear, stylish wear, birthday wear, festive wear, comfortable wear for women, better quality at low price.",
    details: ["Color: Black", "Fabric: Cotton Blend", "Fit/Shape: Fit and Flare", "Length: Maxi", "Neck: Square Neck", "Print or Pattern Type: Floral", "Surface Styling: Pleated or Gathered", "Occasion: Casual", "Sleeve Length: Short Sleeves", "Sleeve Styling: Regular", "Pattern: Printed", "Net Quantity (N): 1", "Add On: No Add on", "Character: Not Applicable", "TYPE: One Piece", "Generic Name: Dresses", "Country of Origin: India"],
    discount: "50% off",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
};

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
      {/* Navigation */}
      <nav className="border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-black flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="font-bold text-xl tracking-tight">Store</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">Back to Store</Link>
              <Link href="/cart" className="inline-flex items-center justify-center rounded-full bg-black p-2.5 text-white hover:bg-gray-800 transition-colors">
                <CartIcon />
              </Link>
            </div>
          </div>
        </div>
      </nav>

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
                  {showSizeError && <p className="text-sm text-red-500 mt-2">Please select a size before adding to cart.</p>}
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
    </div>
  );
}
