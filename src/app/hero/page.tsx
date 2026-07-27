import Link from "next/link";

function CartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
  );
}

const anarkaliProduct = {
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
  desc: "Kurti set with dupatta - Cotton kurta set with dupatta",
  discount: "56% off",
  sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "4XL", "5XL"],
};

const kurtiProduct = {
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
  discount: "56% off",
  sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
};

const ajrakhKurtiProduct = {
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
  discount: "82% off",
  sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "4XL", "5XL", "6XL"],
};

const womenKurtaProduct = {
  id: 8,
  name: "Women Kurta",
  price: "₹1200",
  originalPrice: "₹2400",
  image: "https://images.meesho.com/images/products/149834633/saqqo_512.avif?width=512",
  images: [
    "https://images.meesho.com/images/products/149834633/saqq__512.avif?width=512",
    "https://images.meesho.com/images/products/149834633/8qhpq_512.avif?width=64",
    "https://images.meesho.com/images/products/149834633/btwcl_512.avif?width=512",
  ],
  desc: "Women Kurta - Rayon fabric, Anarkali fit, Mint Green color",
  discount: "65% off",
  sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
};

const fancyDressProduct = {
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
  desc: "Trendy western wear long frock for girls and women, party wear, stylish wear",
  discount: "50% off",
  sizes: ["S", "M", "L", "XL", "XXL"],
};

export default function HeroPage() {
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
            <div className="hidden md:flex items-center gap-8">
              <Link href="#about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">About</Link>
              <Link href="#contact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Contact</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/cart" className="inline-flex items-center justify-center rounded-full bg-black p-2.5 text-white hover:bg-gray-800 transition-colors">
                <CartIcon />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-blue-50/50 to-transparent" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6">
              Shop smarter, <span className="text-blue-600">live better</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
              Discover a world of premium products with unbeatable quality and prices.
              We bring the best shopping experience right to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our handpicked selection of premium products.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[anarkaliProduct, kurtiProduct, ajrakhKurtiProduct, womenKurtaProduct, fancyDressProduct].map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group block h-full">
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col h-full">
                  <div className="aspect-square bg-gray-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain" style={{clipPath: 'inset(0 0 20px 0)'}} />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{product.desc}</p>
                    </div>
                    <div className="mt-auto">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-lg font-bold text-gray-900">{product.price}</p>
                    <p className="text-sm text-gray-500 line-through">{product.originalPrice}</p>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">{product.discount}</span>
                  </div>
                </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to transform your shopping experience?
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have already made the switch. Start your journey today.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-7 w-7 rounded-lg bg-black flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="font-bold text-lg tracking-tight">Store</span>
              </div>
              <p className="text-sm text-gray-500">Premium shopping experience for everyone.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Shop</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">New Arrivals</Link></li>
                <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Bestsellers</Link></li>
                <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Sale</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Company</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">About Us</Link></li>
                <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Careers</Link></li>
                <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Press</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Support</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Help Center</Link></li>
                <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Contact Us</Link></li>
                <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Privacy</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
