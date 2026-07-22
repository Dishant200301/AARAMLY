import { FaFacebookF, FaInstagram, FaYoutube, FaPinterestP } from "react-icons/fa";
import { AaramlyLogo } from "./Navbar";

export default function Footer() {
  return (
    <footer className="mt-8 bg-white">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:px-8">
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2 sm:row-start-1 lg:row-start-1 xl:row-start-1">
          <div className="mb-4">
            <AaramlyLogo />
          </div>
          <p className="mt-4 max-w-xs text-sm text-aaramly-ink-2">Premium seamless innerwear crafted for skin-friendly, breathable comfort — every single day.</p>
          <div className="mt-6 flex items-center gap-3">
            {[FaInstagram, FaFacebookF, FaPinterestP, FaYoutube].map((I, i) => (
              <a key={i} href="#" aria-label="social" className="grid h-9 w-9 place-items-center rounded-full border border-aaramly-line hover:bg-black hover:text-white transition-colors"><I size={13} /></a>
            ))}
          </div>
        </div>
        <div className="col-span-1 sm:col-span-1 lg:col-span-2 xl:col-span-1 sm:row-start-2 lg:row-start-2 xl:row-start-1">
          <p className="text-sm font-700 tracking-wide">Shop</p>
          <ul className="mt-4 space-y-3 text-sm text-aaramly-ink-2">
            <li><a href="#bralette" className="hover:text-black">Seamless Padded Bralette</a></li>
            <li><a href="#silicone" className="hover:text-black">Silicone Nipple Covers</a></li>
            <li><a href="#seamless" className="hover:text-black">Women's Seamless Bra</a></li>
          </ul>
        </div>
        <div className="col-span-1 sm:col-span-1 lg:col-span-2 xl:col-span-1 sm:row-start-2 lg:row-start-2 xl:row-start-1">
          <p className="text-sm font-700 tracking-wide">Support</p>
          <ul className="mt-4 space-y-3 text-sm text-aaramly-ink-2">
            <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-black">Shipping</a></li>
            <li><a href="#" className="hover:text-black">Returns</a></li>
            <li><a href="#" className="hover:text-black">FAQs</a></li>
          </ul>
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-1 sm:row-start-3 lg:row-start-1 xl:row-start-1">
          <p className="text-sm font-700 tracking-wide">Newsletter</p>
          <p className="mt-4 text-sm text-aaramly-ink-2">Soft launches & subscriber-only offers.</p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex border border-aaramly-line">
            <input type="email" required placeholder="Your email" className="flex-1 bg-transparent px-3 py-3 text-sm outline-none" />
            <button className="bg-black px-4 text-white text-[10px] font-600 tracking-[0.25em] uppercase">Join</button>
          </form>
        </div>
      </div>
      <div className="border-t border-aaramly-line py-5 text-center text-xs text-aaramly-ink-2">© {new Date().getFullYear()} AARAMLY. All rights reserved.</div>
    </footer>
  );
}
