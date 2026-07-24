import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch, FiHeart, FiUser, FiShoppingBag,
} from "react-icons/fi";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Bralette", href: "#bralette" },
  { label: "Silicone Covers", href: "#silicone" },
  { label: "Seamless Bra", href: "#seamless" },
];

/* ---------- BRAND LOGO ---------- */
export function AaramlyLogo({ className = "", showText = true, active = true }: { className?: string; showText?: boolean; active?: boolean }) {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Script A Logo Mark */}
      <img
        src="/images/home/logo.png"
        alt="Aaramly Logo"
        className={`h-6 md:h-8 w-auto object-contain transition-all duration-300 ${active ? "" : "brightness-0"}`}
        loading="eager"
      />

      {showText && (
        <img
          src="/images/home/aaramly_text_logo.png"
          alt="Aaramly"
          className={`h-6 md:h-8 w-auto object-contain transition-all duration-300 ${active ? "" : "brightness-0"}`}
          loading="eager"
        />
      )}
    </div>
  );
}

/* ---------- CUSTOM ANIMATED MENU BUTTON ---------- */
function MenuButton({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  return (
    <button
      onClick={() => setOpen(!open)}
      className="relative z-55 flex flex-col gap-[6px] items-end cursor-pointer focus:outline-none w-6"
      aria-label={open ? "Close menu" : "Open menu"}
    >
      {/* Top line */}
      <motion.span
        animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="block h-[2px] w-6 bg-black origin-center"
      />
      {/* Bottom line */}
      <motion.span
        animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="block h-[2px] w-6 bg-black origin-center"
      />
    </button>
  );
}

/* ---------- NAVBAR ---------- */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open
        ? "bg-white shadow-sm"
        : "bg-transparent shadow-none"
      }`}>
      <div className="relative z-50 mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-8">

        {/* MOBILE & TABLET NAVBAR: visible on < lg */}
        <div className="flex lg:hidden items-center justify-between w-full">
          {/* Left: Logo & Text Logo */}
          <a href="#home" className="flex items-center h-10 overflow-visible">
            <AaramlyLogo active={scrolled || open} />
          </a>

          {/* Right: Menu button */}
          <MenuButton open={open} setOpen={setOpen} />
        </div>

        {/* DESKTOP NAVBAR: visible on >= lg */}
        <div className="hidden lg:flex items-center justify-between w-full">
          {/* Left: Logo */}
          <a href="#home" className="flex items-center h-10 overflow-visible">
            <AaramlyLogo active={scrolled || open} />
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

      {/* Mobile/Tablet full page overlay container */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 w-full h-screen bg-white z-40 flex flex-col justify-between pt-[76px] lg:hidden"
          >
            <nav className="flex flex-col p-8 gap-8 mt-6">
              {NAV_LINKS.map((l, index) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.06, duration: 0.4, ease: "easeOut" }}
                  className="text-3xl font-600 tracking-wide text-black hover:text-neutral-500 uppercase transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>

            <div className="p-8 border-t border-neutral-100 flex justify-between text-[10px] tracking-wider text-neutral-400 uppercase font-500">
              <span>© {new Date().getFullYear()} Aaramly</span>
              <a href="#privacy" className="hover:underline">Privacy Policy</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
