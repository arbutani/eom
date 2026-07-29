import Link from "next/link";

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  );
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
  );
}

function TwitterIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
  );
}

function YoutubeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29.94 29.94 0 0 0 1 11.75a29.94 29.94 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29.94 29.94 0 0 0 .46-5.25 29.94 29.94 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
  );
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  );
}

function MapPinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  );
}

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-10 mb-10">
          <div className="col-span-2 md:col-span-2 pr-4">
            <Link href="/" className="font-bold text-xl tracking-tight hover:text-blue-600 transition-colors">
              Bloom & Curve
            </Link>
            <p className="text-sm text-gray-500 mt-3 leading-relaxed max-w-xs">
              Premium shopping experience for everyone.
            </p>

            <div className="flex items-center gap-3 mt-5">
              <Link href="#" aria-label="Facebook" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition-colors">
                <FacebookIcon />
              </Link>
              <Link href="#" aria-label="Instagram" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition-colors">
                <InstagramIcon />
              </Link>
              <Link href="#" aria-label="Twitter" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition-colors">
                <TwitterIcon />
              </Link>
              <Link href="#" aria-label="Youtube" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition-colors">
                <YoutubeIcon />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">Company</h4>
            <ul className="space-y-2.5">
              <li><Link href="/about" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">About Us</Link></li>
              
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">Support</h4>
            <ul className="space-y-2.5">
              <li><Link href="/help" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Contact Us</Link></li>
              <li><Link href="/policy" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Policy</Link></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">Get in Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <MapPinIcon />
                <span>Bhavnagar, Gujarat, India</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <MailIcon />
                <a href="mailto:butaniankit1107@gmail.com" className="hover:text-blue-600 transition-colors">butaniankit1107@gmail.com</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <PhoneIcon />
                <a href="tel:+91 9313853668" className="hover:text-blue-600 transition-colors">+91 9313853668</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 order-2 sm:order-1">© {new Date().getFullYear()} Bloom & Curve. All rights reserved.</p>
          <div className="flex items-center gap-5 order-1 sm:order-2">
            <Link href="/terms" className="text-xs text-gray-400 hover:text-gray-600 transition-colors"> Happy Shopping</Link>
            
          </div>
        </div>
      </div>
    </footer>
  );
}
