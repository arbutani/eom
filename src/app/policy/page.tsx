import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function PolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
               Policy
            </h1>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="border border-gray-200 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. ORDER CONFIRMATION</h2>
              <ul className="space-y-2 text-sm text-gray-600 leading-relaxed">
                <li>Orders will be dispatched within <strong>3–5 hours</strong> after confirmation.</li>
                <li>Changes to the shipping address or size are only possible <strong>before dispatch</strong>.</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">2. SHIPPING POLICY</h2>
              <ul className="space-y-2 text-sm text-gray-600 leading-relaxed">
                <li>Estimated delivery time: <strong>5–9 working days</strong> (may vary depending on the location).</li>
                <li><strong>Cash on Delivery (COD)</strong> availability will be mentioned on the product page.</li>
                <li>In case of delays, customers can track their shipment using the supplier's live tracking link.</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">3. RETURN &amp; EXCHANGE POLICY</h2>
              <ul className="space-y-2 text-sm text-gray-600 leading-relaxed">
                <li>Returns are <strong>not accepted</strong>. Once an order is confirmed, it cannot be canceled or returned.</li>
                <li>If the delivered product is <strong>incorrect or damaged</strong>, an exchange or replacement will be provided.</li>
                <li>Returns will not be accepted due to size, color, or personal preference. Customers are advised to carefully review all product details before placing an order.</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">4. REFUND POLICY</h2>
              <ul className="space-y-2 text-sm text-gray-600 leading-relaxed">
                <li>Refunds will only be issued if the product received is <strong>incorrect, damaged, or defective</strong>.</li>
                <li>Refunds will be processed through the <strong>original payment method</strong>.</li>
                <li>The refund process may take <strong>120–180 business days</strong> after approval.</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">5. QUALITY ASSURANCE</h2>
              <ul className="space-y-2 text-sm text-gray-600 leading-relaxed">
                <li>Every product undergoes a quality inspection before dispatch.</li>
                <li>If a customer receives an incorrect or damaged product, they will be eligible for an exchange or refund.</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">6. PRODUCT DESCRIPTION POLICY</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Product descriptions will include only the details that accurately represent the actual product.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">7. LIMITATION OF LIABILITY</h2>
              <ul className="space-y-2 text-sm text-gray-600 leading-relaxed">
                <li>The seller is responsible only for the product quality and delivery as described in the product listing.</li>
                <li>The seller is not liable for any damage caused by product misuse, improper handling, or customer negligence.</li>
                <li>Any disputes will be resolved in accordance with the supplier's official grievance redressal policy.</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-xl p-6 bg-blue-50">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Note</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Although returns are not accepted, customers are entitled to an exchange or refund if they receive an incorrect or damaged product. This is a basic consumer protection right and cannot be waived or removed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}