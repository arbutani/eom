import Link from "next/link";

function CartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
  );
}

export default function Navbar({ backLink, hideCartIcon }: { backLink?: boolean; hideCartIcon?: boolean }) {
  return (
    <nav className="border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-bold text-xl tracking-tight hover:text-blue-600 transition-colors">Bloom & Curve</Link>
          </div>
          <div className="flex items-center gap-4">
            {backLink ? (
              <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">Back to Bloom & Curve</Link>
            ) : (
              <>
                <div className="hidden md:flex items-center gap-8">
                  <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">About</Link>
                  <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Contact</Link>
                </div>
                {!hideCartIcon && (
                  <Link href="/cart" className="inline-flex items-center justify-center rounded-full bg-black p-2.5 text-white hover:bg-gray-800 transition-colors">
                    <CartIcon />
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
