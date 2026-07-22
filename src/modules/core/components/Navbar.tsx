import { useState } from "react";
import {
  FiSearch, FiHeart, FiUser, FiShoppingBag, FiMenu, FiX,
} from "react-icons/fi";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Bralette", href: "#bralette" },
  { label: "Silicone Covers", href: "#silicone" },
  { label: "Seamless Bra", href: "#seamless" },
];

/* ---------- BRAND LOGO ---------- */
export function AaramlyLogo({ className = "", showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Script A Logo Mark */}
      <img
        src="/images/home/logo.png"
        alt="Aaramly Logo"
        className="h-8 w-auto object-contain"
        loading="eager"
      />
      
      {showText && (
        <img
          src="/images/home/aaramly_text_logo.png"
          alt="Aaramly"
          className="h-8 w-auto object-contain"
          loading="eager"
        />
      )}
    </div>
  );
}

/* ---------- NAVBAR ---------- */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm transition-all duration-300">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-8">
        
        {/* MOBILE & TABLET NAVBAR: visible on < lg */}
        <div className="flex lg:hidden items-center justify-between w-full">
          {/* Left: Logo & Text Logo */}
          <a href="#home" className="flex items-center h-10 overflow-visible">
            <AaramlyLogo />
          </a>

          {/* Right: Menu button */}
          <button className="text-black hover:opacity-75 transition-opacity" onClick={() => setOpen(true)} aria-label="Open menu">
            <FiMenu size={22} />
          </button>
        </div>

        {/* DESKTOP NAVBAR: visible on >= lg */}
        <div className="hidden lg:flex items-center justify-between w-full">
          {/* Left: Logo */}
          <a href="#home" className="flex items-center h-10 overflow-visible">
            <AaramlyLogo />
          </a>
          
          {/* Center: Nav links */}
          <nav className="flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="text-sm font-500 tracking-wide transition-colors text-black hover:text-aaramly-ink-2">{l.label}</a>
            ))}
          </nav>

          {/* Right: Icons */}
          <div className="flex items-center gap-5 text-black">
            <button aria-label="Search" className="hover:opacity-70 transition-opacity"><FiSearch size={18} /></button>
            <button aria-label="Wishlist" className="hover:opacity-70 transition-opacity"><FiHeart size={18} /></button>
            <button aria-label="Account" className="hover:opacity-70 transition-opacity"><FiUser size={18} /></button>
            <button aria-label="Cart" className="relative hover:opacity-70 transition-opacity">
              <FiShoppingBag size={18} />
              <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-black text-[10px] text-white">0</span>
            </button>
          </div>
        </div>

      </div>
      
      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-60 bg-white">
          <div className="flex items-center justify-between px-5 py-4">
            <div className="h-10 flex items-center overflow-visible">
              <AaramlyLogo />
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close menu"><FiX size={22} /></button>
          </div>
          <nav className="flex flex-col p-6 gap-5">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-lg font-500">{l.label}</a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
