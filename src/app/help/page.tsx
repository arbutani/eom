import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              Help Center
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to frequently asked questions and get help with your orders.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">How do I place an order?</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">Browse our products, select the items you want, choose your size, and click "Add to Cart". Once you are ready, go to your cart and proceed to checkout.</p>
                </div>
                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">We accept Cash on Delivery (COD) only. All orders are paid upon delivery.</p>
                </div>
                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">How long does shipping take?</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">Delivery takes 3-7 business days.</p>
                </div>
                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Is my personal information safe?</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">Absolutely. We use industry-standard encryption to protect your data. Your payment information is never stored on our servers.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping & Returns</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Shipping Policy</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>Delivery takes 3-7 business days</li>
                    <li>Cash on delivery available</li>
                  </ul>
                </div>
            </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
              <p className="text-sm text-gray-600 mb-4">Our support team is available to assist you.</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 border border-gray-200 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <p className="text-sm font-medium text-gray-900">Phone</p>
                  <p className="text-sm text-gray-600">+91 98765 43210</p>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <p className="text-sm text-gray-600">hello@bloomandcurve.com</p>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <p className="text-sm font-medium text-gray-900">Live Chat</p>
                  <p className="text-sm text-gray-600">Mon-Sat, 9AM-6PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}