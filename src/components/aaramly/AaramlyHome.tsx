import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import {
  FiSearch, FiHeart, FiUser, FiShoppingBag, FiMenu, FiX,
  FiChevronLeft, FiChevronRight, FiChevronDown, FiPlay,
} from "react-icons/fi";
import { FaStar, FaShippingFast, FaLock, FaGem, FaUndo, FaFacebookF, FaInstagram, FaYoutube, FaPinterestP } from "react-icons/fa";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { IMG } from "@/lib/aaramly-images";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Bralette", href: "#bralette" },
  { label: "Silicone Covers", href: "#silicone" },
  { label: "Seamless Bra", href: "#seamless" },
];

const HERO_SLIDES = [
  {
    img: "/images/home/hero/Gemini_Generated_Image_7wkeg47wkeg47wke.webp",
    eyebrow: "BONDED BRAS",
    title: "DESIGNED TO\nDISAPPEAR",
    subtitle: "Experience zero-feel comfort. A lightweight, wireless fit that goes unnoticed under any outfit.",
    align: "left",
    textColor: "text-[#2d221b]"
  },
  {
    img: "/images/home/hero/Gemini_Generated_Image_nz0j0jnz0j0jnz0j.webp",
    eyebrow: "NEWLY LAUNCHED",
    title: "SUPPORT WITHOUT\nTHE POKE",
    subtitle: "PERFECT COVERAGE BRA  |  SOFT COVERAGE T-SHIRT BRA",
    align: "center",
    textColor: "text-[#3b2a1c]"
  },
  {
    img: "/images/home/hero/Gemini_Generated_Image_sp6vp3sp6vp3sp6v.webp",
    eyebrow: "AARAMLY COMFORT",
    title: "COMFORT IS NON NEGOTIABLE.",
    subtitle: "Invisible support and perfect coverage for backless, strapless, or everyday looks.",
    align: "right",
    textColor: "text-[#302117]"
  }
];

const CATEGORIES = [
  { key: "bras", title: "SPORTS BRA", tag: "SHOP NOW", img: "/images/home/sports_bra.png" },
  { key: "panties", title: "PANTIES", tag: "SHOP NOW", img: "/images/home/panties.png" },
  { key: "sets", title: "ATHLEISURE", tag: "SHOP NOW", img: "/images/home/athleisure.png" },
];



type Product = {
  id: string; name: string; price: number; rating: number;
  img: string; hoverImg: string; colors: string[]; sizes: string[]; category: string;
  tags: string[];
};

const PRODUCTS: Product[] = [
  // BRAS
  { id: "p1", name: "Wirefree | Padded | Sports Bra | Elastane Stretch", price: 499, rating: 4.5, img: IMG.bralette[0], hoverImg: IMG.bralette[1], colors: ["#111", "#c8a48c", "#e8d3c2"], sizes: ["28", "30", "32", "34"], category: "bras", tags: ["Sports Bra", "Elastane Stretch"] },
  { id: "p2", name: "Wireless | Seamless | Everyday | Premium Bralette", price: 899, rating: 4.6, img: IMG.bralette[1], hoverImg: IMG.bralette[2], colors: ["#000", "#8b5e3c", "#f2d7c1"], sizes: ["30", "32", "34"], category: "bras", tags: ["Wireless Bralette", "Soft Microfibre"] },
  { id: "p3", name: "Soft-Touch | Breathable | Contour Bra | Wirefree", price: 599, rating: 4.4, img: IMG.bralette[2], hoverImg: IMG.bralette[0], colors: ["#1a1a1a", "#d9b79a"], sizes: ["28", "30", "32"], category: "bras", tags: ["Breathable Contour", "Comfort Fit"] },
  { id: "p4", name: "Invisible | Ultra-Thin | Reusable | Silicone Covers", price: 349, rating: 4.7, img: IMG.silicone[0], hoverImg: IMG.bralette[0], colors: ["#e8c9a8"], sizes: ["Free"], category: "bras", tags: ["Invisible Coverage", "Reusable Silicone"] },

  // PANTIES
  { id: "p5", name: "Seamless | Mid Rise | Ultra Stretch | Brief Panty", price: 299, rating: 4.5, img: IMG.seamless[4], hoverImg: IMG.seamless[5], colors: ["#111", "#eadfd3", "#c8a48c"], sizes: ["S", "M", "L"], category: "panties", tags: ["Seamless Panty", "Everyday Brief"] },
  { id: "p6", name: "Lace Trim | Low Rise | Soft Microfibre | Hipster", price: 349, rating: 4.6, img: IMG.seamless[5], hoverImg: IMG.seamless[6], colors: ["#e8c9a8", "#000"], sizes: ["M", "L", "XL"], category: "panties", tags: ["Lace Trim", "Comfort Fit Hipster"] },
  { id: "p7", name: "Ultra-Grip | High Waisted | Shaping | Seamless Brief", price: 399, rating: 4.5, img: IMG.seamless[6], hoverImg: IMG.seamless[4], colors: ["#c9b8a5", "#111"], sizes: ["S", "M", "L", "XL"], category: "panties", tags: ["High Waisted Brief", "Shaping Effect"] },

  // SETS
  { id: "p8", name: "Coordinated | Seamless Bra & Hipster | Matching Set", price: 999, rating: 4.7, img: IMG.seamless[0], hoverImg: IMG.seamless[1], colors: ["#000", "#d8c1a8"], sizes: ["32", "34", "36"], category: "sets", tags: ["Coordinated Set", "Premium Comfort"] },
  { id: "p9", name: "Activewear | Ribbed Bralette & Shorts | Lounge Set", price: 1199, rating: 4.6, img: IMG.seamless[1], hoverImg: IMG.seamless[2], colors: ["#c8a48c", "#111"], sizes: ["S", "M", "L"], category: "sets", tags: ["Ribbed Knit", "All-Day Loungewear"] },

  // SEAMLESS BRA
  { id: "p10", name: "Seamless | Full Coverage | Everyday Wear | Soft Bra", price: 699, rating: 4.6, img: IMG.seamless[0], hoverImg: IMG.seamless[2], colors: ["#000", "#eadfd3"], sizes: ["32", "34", "36", "38"], category: "seamless", tags: ["Seamless Support", "All-Day Wear"] },
  { id: "p11", name: "Ultra-Soft | Sleep Bra | Zero Pressure | Microfibre", price: 549, rating: 4.5, img: IMG.seamless[1], hoverImg: IMG.seamless[3], colors: ["#c9b8a5", "#111"], sizes: ["S", "M", "L", "XL"], category: "seamless", tags: ["Sleep Soft", "Zero Pressure"] },
  { id: "p12", name: "Seamless | Stretch | Air Flow | Breathable Bra", price: 749, rating: 4.4, img: IMG.seamless[2], hoverImg: IMG.seamless[0], colors: ["#000", "#d8c1a8"], sizes: ["32", "34", "36"], category: "seamless", tags: ["Air Flow Support", "Flexible Stretch"] },

  // NIGHT WEAR
  { id: "p13", name: "Soft Satin | Strappy Neck | Luxury Slip Dress", price: 1299, rating: 4.8, img: IMG.seamless[3], hoverImg: IMG.seamless[1], colors: ["#111", "#c9b8a5"], sizes: ["S", "M", "L"], category: "nightwear", tags: ["Satin Silk", "Luxury Loungewear"] },
  { id: "p14", name: "Ribbed Modal | Loose Fit | Cozy Pajama Set", price: 1499, rating: 4.7, img: IMG.seamless[1], hoverImg: IMG.seamless[0], colors: ["#d8c1a8", "#111"], sizes: ["M", "L", "XL"], category: "nightwear", tags: ["Ribbed Modal", "Cozy Sleep Set"] },
];

const CATEGORY_TABS = [
  { key: "bras", label: "Bras" },
  { key: "panties", label: "Panties" },
  { key: "sets", label: "Sets" },
  { key: "seamless", label: "Seamless Bra" },
  { key: "nightwear", label: "Night Wear" },
];

const HOTSPOTS = [
  { top: "22%", left: "42%", title: "Ultra Soft", desc: "Skin-friendly microfibre feel." },
  { top: "45%", left: "58%", title: "Wireless Comfort", desc: "No wires, all-day ease." },
  { top: "62%", left: "38%", title: "Breathable Fabric", desc: "Airy weave keeps you cool." },
  { top: "78%", left: "55%", title: "Stretch Fit", desc: "Moves with your body." },
];

const WHY = [
  { icon: FaShippingFast, title: "Free Shipping", desc: "On all prepaid orders across India." },
  { icon: FaGem, title: "Premium Quality", desc: "Curated fabrics, tested for comfort." },
  { icon: FaLock, title: "Secure Payment", desc: "100% encrypted checkout." },
  { icon: FaUndo, title: "Easy Returns", desc: "Hassle-free 7-day returns." },
];

const REELS = [
  { title: "All-Day Bralette", views: "12.4K", likes: 240, img: IMG.bralette[0] },
  { title: "Invisible Silicone", views: "8.9K", likes: 180, img: IMG.silicone[0] },
  { title: "Seamless Comfort", views: "6.1K", likes: 132, img: IMG.seamless[0] },
  { title: "Sleep Soft", views: "4.5K", likes: 96, img: IMG.seamless[1] },
  { title: "Everyday Ease", views: "3.7K", likes: 74, img: IMG.bralette[2] },
  { title: "Breathe Free", views: "2.8K", likes: 58, img: IMG.seamless[3] },
];

/* ---------- NAVBAR ---------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur border-b border-[#eaeaea]" : "bg-transparent"}`}>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-8">
        <button className="md:hidden text-black" onClick={() => setOpen(true)} aria-label="Open menu"><FiMenu size={22} /></button>
        <a href="#home" className={`text-2xl font-800 tracking-[0.2em] font-extrabold ${scrolled ? "text-black" : "text-black"}`}>AARAMLY</a>
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} className={`text-sm font-500 tracking-wide transition-colors ${scrolled ? "text-black hover:text-[#4b4b4b]" : "text-black/90 hover:text-black"}`}>{l.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-4 md:gap-5 text-black">
          <button aria-label="Search"><FiSearch size={18} /></button>
          <button aria-label="Wishlist" className="hidden sm:inline"><FiHeart size={18} /></button>
          <button aria-label="Account" className="hidden sm:inline"><FiUser size={18} /></button>
          <button aria-label="Cart" className="relative"><FiShoppingBag size={18} /><span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-black text-[10px] text-white">0</span></button>
        </div>
      </div>
      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-white">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#eaeaea]">
            <span className="text-xl font-extrabold tracking-[0.2em]">AARAMLY</span>
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

/* ---------- HERO ---------- */
function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((p) => (p + 1) % HERO_SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(timer);
  }, [next, current]);

  // Animation variants for the slides
  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
    }),
    center: {
      opacity: 1,
    },
    exit: (dir: number) => ({
      opacity: 0,
    }),
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
        duration: 0.7,
        ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number] // premium cubic-bezier for smooth entrance
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number] } }
  };

  const s = HERO_SLIDES[current];

  return (
    <section id="home" className="relative h-[100svh] w-full overflow-hidden bg-white">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 1.0, ease: "easeInOut" }, // elegant slow cross-fade
          }}
          className="absolute inset-0 h-full w-full"
        >
          <div className="relative h-full w-full">
            <motion.img
              src={s.img} alt={s.title.replace("\n", " ")}
              initial={{ scale: 1.06 }} animate={{ scale: 1 }} transition={{ duration: 6, ease: "easeOut" }}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            {/* Subtle overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/40" />
            
            <div className="relative z-10 flex h-full items-center">
              {/* Padding matches Navbar px-5 md:px-8 exactly to align along the header grid */}
              <div className="mx-auto max-w-[1400px] w-full px-5 md:px-8">
                <div className={`flex w-full ${
                  s.align === "left" ? "justify-start text-left" :
                  s.align === "right" ? "justify-end text-left" :
                  "justify-center text-center"
                }`}>
                  <motion.div
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    key={`content-${current}`}
                    className="max-w-xl"
                  >
                    <motion.div variants={itemVariants}>
                      <p className="text-xs md:text-sm font-600 tracking-[0.35em] uppercase text-black/70">
                        {s.eyebrow}
                      </p>
                    </motion.div>

                    <motion.h1
                      variants={itemVariants}
                      className={`mt-4 text-3xl md:text-5xl lg:text-6.5xl font-800 leading-[1.08] tracking-tight uppercase whitespace-pre-line ${s.textColor}`}
                    >
                      {s.title}
                    </motion.h1>

                    <motion.p
                      variants={itemVariants}
                      className="mt-4 text-sm md:text-base font-500 text-[#4b4b4b]/90 max-w-[340px]"
                      style={{
                        marginLeft: s.align === "center" ? "auto" : undefined,
                        marginRight: s.align === "center" ? "auto" : undefined,
                      }}
                    >
                      {s.subtitle}
                    </motion.p>

                    <motion.div
                      variants={itemVariants}
                      className="mt-8 flex gap-4"
                      style={{
                        justifyContent: s.align === "center" ? "center" : "flex-start"
                      }}
                    >
                      <a href="#featured" className="inline-flex items-center gap-2 px-8 py-3.5 text-[10px] md:text-xs font-600 tracking-[0.2em] uppercase transition-all duration-300 shadow-sm bg-black text-white hover:bg-zinc-800 border border-black">
                        EXPLORE NOW
                      </a>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Side Chevron Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-20 grid h-12 w-12 place-items-center text-black/35 hover:text-black hover:scale-110 transition-all duration-300 cursor-pointer"
        aria-label="Previous Slide"
      >
        <FiChevronLeft className="w-9 h-9 md:w-12 md:h-12" strokeWidth={1} />
      </button>
      <button
        onClick={next}
        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-20 grid h-12 w-12 place-items-center text-black/35 hover:text-black hover:scale-110 transition-all duration-300 cursor-pointer"
        aria-label="Next Slide"
      >
        <FiChevronRight className="w-9 h-9 md:w-12 md:h-12" strokeWidth={1} />
      </button>

      {/* Center Pagination with Animated Circular Progress */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className="group relative w-6 h-6 flex items-center justify-center cursor-pointer"
            aria-label={`Go to slide ${i + 1}`}
          >
            {/* Circular Progress Path - absolute centered */}
            <svg className="absolute inset-0 m-auto w-[18px] h-[18px] -rotate-90">
              <circle
                cx="9"
                cy="9"
                r="7.5"
                stroke="black"
                strokeWidth="0.8"
                fill="transparent"
                className="opacity-15"
              />
              {i === current && (
                <motion.circle
                  cx="9"
                  cy="9"
                  r="7.5"
                  stroke="black"
                  strokeWidth="0.8"
                  fill="transparent"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 5, ease: "linear" }}
                  key={`progress-${current}`}
                />
              )}
            </svg>
            {/* Inner Dot - absolute centered */}
            <div className={`absolute inset-0 m-auto w-[6px] h-[6px] rounded-full transition-all duration-300 bg-black ${i === current ? "opacity-100 scale-100" : "opacity-35 scale-75 group-hover:opacity-60"}`} />
          </button>
        ))}
      </div>

     
    </section>
  );
}

/* ---------- TRUST TICKER & RATINGS ---------- */
function TrustTicker() {
  const items = [
    {
      icon: (
        <svg className="w-5 h-5 text-white flex-shrink-0 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: "COMMUNITY",
      desc: "More than just activewear"
    },
    {
      icon: (
        <svg className="w-5 h-5 text-white flex-shrink-0 transition-transform duration-300 group-hover:rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 5v4l3 1v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10l3-1V5l-3-3h-3a2 2 0 0 1-4 0H6z" />
        </svg>
      ),
      title: "QUALITY PRODUCTS",
      desc: "Items that last years, not seasons"
    },
    {
      icon: (
        <svg className="w-5 h-5 text-white flex-shrink-0 transition-transform duration-300 group-hover:translate-y-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
          <path d="M3 9l2-4h14l2 4" />
          <path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6" />
        </svg>
      ),
      title: "MORE WAYS TO SHOP",
      desc: "Shop In-Store & Online"
    },
    {
      icon: (
        <svg className="w-5 h-5 text-white flex-shrink-0 transition-transform duration-300 group-hover:scale-105" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 10h20" />
          <path d="M3.5 10l1.5 9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2l1.5-9" />
          <path d="M7.5 10L12 4l4.5 6" />
        </svg>
      ),
      title: "INCLUSIVE SIZING",
      desc: "Shop from sizes 2XS - 3XL"
    }
  ];

  // Repeat items for infinite loop marquee
  const marqueeItems = [...items, ...items, ...items, ...items];

  return (
    <section className="bg-black text-white py-6 md:py-8 overflow-hidden select-none border-y border-zinc-900">
      {/* Marquee Row */}
      <div className="relative flex w-full border-b border-zinc-900/60 pb-6 overflow-hidden">
        <div className="flex w-max gap-12 md:gap-16 px-4 animate-trust-marquee shrink-0">
          {marqueeItems.map((item, idx) => (
            <div key={idx} className="group flex items-center gap-4 cursor-default shrink-0">
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 transition-colors duration-300 group-hover:bg-zinc-800 group-hover:border-zinc-700">
                {item.icon}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] md:text-xs font-bold tracking-[0.2em] text-white/95 transition-colors duration-300 group-hover:text-white">
                  {item.title}
                </span>
                <span className="text-[10px] md:text-[11px] text-zinc-400 font-medium tracking-wide mt-0.5">
                  {item.desc}
                </span>
              </div>
              <span className="text-zinc-800 font-light text-base ml-8 md:ml-12 shrink-0">|</span>
            </div>
          ))}
        </div>
      </div>

      {/* Ratings/Review Row */}
      <div className="pt-5 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 text-center text-xs md:text-sm font-semibold tracking-wider px-4">
        <span className="text-white font-extrabold text-sm md:text-base tracking-[0.1em]">4.95</span>
        <div className="flex items-center gap-0.5 text-[#e5a93b]">
          <FaStar className="w-3.5 h-3.5 fill-current" />
          <FaStar className="w-3.5 h-3.5 fill-current" />
          <FaStar className="w-3.5 h-3.5 fill-current" />
          <FaStar className="w-3.5 h-3.5 fill-current" />
          <FaStar className="w-3.5 h-3.5 fill-current" />
        </div>
        <span className="text-[#5da3cd] font-semibold text-xs md:text-sm tracking-normal normal-case hover:underline cursor-pointer">
          (1,033)
        </span>
        <span className="text-zinc-800 font-light px-0.5">|</span>
        <span className="text-[#e5a93b] font-bold text-[10px] md:text-xs tracking-[0.15em] uppercase hover:opacity-90 transition-opacity">
          4.9 OUT OF 5 STARS BASED ON 1,033 REVIEWS
        </span>
      </div>
    </section>
  );
}

/* ---------- CURATED EDIT ---------- */
function CuratedEdit() {
  const cards = [
    {
      price: "399",
      img: IMG.bralette[0],
      borderColor: "border-[#e06b47]",
    },
    {
      price: "599",
      img: IMG.bralette[1],
      borderColor: "border-[#2e5d4e]",
    },
    {
      price: "799",
      img: IMG.seamless[3],
      borderColor: "border-[#e06b47]",
    },
    {
      price: "999",
      img: IMG.seamless[1],
      borderColor: "border-[#2e5d4e]",
    },
  ];

  return (
    <section id="curated-edit" className="bg-white py-12 md:py-16 ">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <h2 className="text-center text-lg md:text-xl font-medium tracking-wide text-zinc-800 mb-8 md:mb-10">
          A bucketful of monsoon steals
        </h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {cards.map((c, i) => (
            <div 
              key={i} 
              className={`flex items-center bg-[#d2e7e4] rounded-[20px] border-[5px] sm:border-[6px] ${c.borderColor} overflow-hidden aspect-[2.2/1] sm:aspect-[2.4/1] md:aspect-[2.6/1] lg:aspect-[2.3/1] shadow-sm select-none`}
            >
              {/* Left Side: Image */}
              <div className="w-[45%] h-full relative overflow-hidden">
                <img 
                  src={c.img} 
                  alt="" 
                  className="absolute inset-0 w-full h-full object-cover object-top" 
                  loading="lazy" 
                />
              </div>
              
              {/* Right Side: Text */}
              <div className="w-[55%] flex flex-col justify-center items-center text-center p-1 sm:p-2">
                <span className="text-[9px] sm:text-[10px] md:text-xs font-extrabold tracking-[0.15em] text-[#1b3d32] uppercase leading-none">
                  UNDER
                </span>
                <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-black tracking-normal text-[#1b3d32] uppercase leading-none mt-1 sm:mt-1.5 whitespace-nowrap">
                  {c.price} STORE
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FEATURED CATEGORIES ---------- */
interface FeaturedCategoriesProps {
  onSelectCategory?: (key: string) => void;
}

function FeaturedCategories({ onSelectCategory }: FeaturedCategoriesProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".fcat-card", {
        y: 60, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.15,
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, key: string) => {
    if (onSelectCategory) {
      e.preventDefault();
      onSelectCategory(key);
      const featuredSection = document.getElementById("featured");
      if (featuredSection) {
        featuredSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section ref={ref} className="mx-auto max-w-[1400px] px-5 md:px-8 py-20 md:py-28">
      <div className="mb-10 md:mb-14 flex flex-col items-center text-center">
        <p className="text-xs tracking-[0.4em] font-500 uppercase text-[#4b4b4b]">Shop by Category</p>
        <h2 className="mt-3 text-3xl md:text-5xl font-800 tracking-tight">Featured Categories</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4">
        {CATEGORIES.map((c) => (
          <a 
            key={c.key} 
            href="#featured" 
            onClick={(e) => handleClick(e, c.key)}
            className="fcat-card group relative overflow-hidden bg-[#f5f2ee] aspect-[3/4] rounded-[10px] shadow-[0_4px_30px_rgba(0,0,0,0.02)]"
          >
            <img 
              src={c.img} 
              alt={c.title} 
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out " 
              loading="lazy" 
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 flex flex-col items-start">
              <h3 className="font-serif text-2xl md:text-3xl font-normal tracking-[0.1em] uppercase text-white leading-tight">
                {c.title}
              </h3>
              <div className="mt-3.5 inline-flex flex-col">
                <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-white/95 uppercase">
                  {c.tag}
                </span>
                <span className="h-0.5 w-full bg-white mt-1.5 transition-transform duration-500 origin-left scale-x-100 group-hover:scale-x-75" />
              </div>
            </div>
          </a>
        ))}
      </div>
      

    </section>
  );
}

/* ---------- PRODUCT EXPLAINER ---------- */
function Explainer() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hotspot", { scale: 0, opacity: 0, duration: 0.8, stagger: 0.15, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ref.current, start: "top 70%" } });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section id="explainer" ref={ref} className="mx-auto max-w-[1400px] px-5 md:px-8 py-20 md:py-28">
      <div className="mb-10 text-center">
        <p className="text-xs tracking-[0.4em] font-500 uppercase text-[#4b4b4b]">Prime</p>
        <h2 className="mt-3 text-3xl md:text-5xl font-800 tracking-tight"><span className="font-500">PRIME</span> SELECTIONS</h2>
      </div>
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#eaeaea] bg-[#f5f2ee]">
        <img src={IMG.bralette[1]} alt="AARAMLY bralette" className="w-full h-auto object-cover" loading="lazy" />
        {HOTSPOTS.map((h, i) => (
          <div key={i} className="hotspot group absolute -translate-x-1/2 -translate-y-1/2" style={{ top: h.top, left: h.left }}>
            <button aria-label={h.title} className="relative grid h-8 w-8 place-items-center rounded-full bg-white/90 shadow-lg ring-2 ring-black/10">
              <span className="absolute inset-0 animate-ping rounded-full bg-white/60" />
              <span className="relative text-black text-lg leading-none">+</span>
            </button>
            <div className="pointer-events-none absolute left-1/2 top-10 w-52 -translate-x-1/2 rounded-xl border border-[#eaeaea] bg-white p-3 opacity-0 shadow-xl transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 -translate-y-2">
              <p className="text-xs font-700 tracking-wide uppercase">{h.title}</p>
              <p className="mt-1 text-xs text-[#4b4b4b]">{h.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- PRODUCT CARD ---------- */
function ProductCard({ p }: { p: Product }) {
  const skuMap: Record<string, string> = {
    p1: "#1102", p2: "#1354", p3: "#1498", p4: "#1532",
    p5: "#1722", p6: "#1811", p7: "#1902", p8: "#2105",
    p9: "#2341", p10: "#2509", p11: "#2718", p12: "#2901",
    p13: "#3104", p14: "#3312"
  };
  const sku = skuMap[p.id] || `#${p.id.toUpperCase()}`;

  return (
    <div className="group flex flex-col bg-transparent cursor-pointer">
      {/* Image Wrapper */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-[10px] bg-[#f5f2ee]">
        {/* Main Image */}
        <img 
          src={p.img} 
          alt={p.name} 
          loading="lazy" 
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0" 
        />
        
        {/* Hover Alternative Image */}
        <img 
          src={p.hoverImg} 
          alt="" 
          aria-hidden 
          loading="lazy" 
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" 
        />

        {/* Wishlist Heart Icon */}
        <button 
          aria-label="Wishlist" 
          className="absolute right-3.5 top-3.5 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 backdrop-blur-sm text-black hover:bg-black hover:text-white hover:scale-110 shadow-sm transition-all duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <FiHeart size={14} className="stroke-[2.5]" />
        </button>

        
      </div>

      {/* Info Content */}
      <div className="flex flex-1 flex-col pt-3">
        {/* SKU Number */}
        <p className="text-[11px] font-bold text-zinc-400 tracking-wider uppercase">{sku}</p>
        
        {/* Product Title / Characteristics */}
        <h3 className="mt-1 text-sm font-semibold text-zinc-800 line-clamp-2 min-h-[2.5rem] leading-snug">
          {p.name}
        </h3>
        
        {/* Price & Add To Bag Button */}
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-base font-bold text-zinc-900">
            ₹{p.price.toLocaleString("en-IN")}.00
          </span>
          <button 
            className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase bg-[#1c1c1e] hover:bg-black text-white px-4 py-2.5 rounded-full shadow-sm hover:scale-[1.03] transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <FiShoppingBag size={12} className="stroke-[2.5]" /> Add To Bag
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- FEATURED PRODUCTS ---------- */
interface FeaturedProps {
  activeTab?: string;
  setActiveTab?: (t: string) => void;
}

function Featured({ activeTab, setActiveTab }: FeaturedProps) {
  const [localTab, setLocalTab] = useState("bras");
  const tab = activeTab !== undefined ? activeTab : localTab;
  const setTab = setActiveTab !== undefined ? setActiveTab : setLocalTab;

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".prod-card", { y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" } });
    }, ref);
    return () => ctx.revert();
  }, [tab]);
  const list = PRODUCTS.filter(p => p.category === tab).slice(0, 4);
  return (
    <section id="featured" ref={ref} className="mx-auto max-w-[1400px] px-5 md:px-8 py-20 md:py-28">
      <div className="mb-12 flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-5xl font-800 tracking-tight text-zinc-900 uppercase">Top Categories</h2>
        
        {/* Scrollable Tabs Wrapper */}
        <div className="w-full max-w-2xl mt-8 px-4 overflow-x-auto no-scrollbar">
          <div className="flex justify-start md:justify-center items-center gap-8 md:gap-10 min-w-max mx-auto px-4">
            {CATEGORY_TABS.map(t => {
              const isActive = tab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`relative pb-3 text-sm md:text-base font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? "text-zinc-900" 
                      : "text-zinc-400 hover:text-zinc-600"
                  }`}
                >
                  {t.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#bf5c30]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-4">
        {list.map(p => <div key={p.id} className="prod-card"><ProductCard p={p} /></div>)}
      </div>
    </section>
  );
}

/* ---------- PROMO BANNER ---------- */
function PromoBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (!ref.current || !imgRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: -15, ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} className="relative my-16 md:my-24 h-[70vh] min-h-[500px] w-full overflow-hidden">
      <img ref={imgRef} src={IMG.seamless[3]} alt="Signature Series" className="absolute inset-0 h-[130%] w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-white/10 to-transparent" />
      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] items-center px-5 md:px-8">
        <div className="max-w-lg">
          <p className="text-xs tracking-[0.4em] font-500 uppercase text-black/70">Signature Series</p>
          <h2 className="mt-4 text-4xl md:text-6xl font-800 leading-[1.05] tracking-tight text-black">Feel Comfortable Everyday</h2>
          <p className="mt-4 text-sm md:text-base font-500 tracking-[0.15em] uppercase text-[#4b4b4b]">Soft • Seamless • Breathable</p>
          <a href="#featured" className="mt-8 inline-block bg-black px-8 py-4 text-white text-xs font-600 tracking-[0.25em] uppercase hover:bg-[#222] transition-colors">Shop Collection</a>
        </div>
      </div>
    </section>
  );
}

/* ---------- BEST SELLING CAROUSEL ---------- */
function BestSelling() {
  const [active, setActive] = useState(0);
  const current = PRODUCTS[active % PRODUCTS.length];
  return (
    <section className="bg-[#faf7f2] py-16 md:py-24 overflow-hidden border-y border-[#eaeaea]">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 md:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-5xl text-black tracking-normal" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            <span className="font-normal">THE LATEST </span>
            <span className="font-bold">BUZZ IN TOWN</span>
          </h2>
        </div>
        <div className="relative px-2 sm:px-10 md:px-14">
          <Swiper
            modules={[Autoplay, Navigation]}
            grabCursor
            centeredSlides={true}
            loop={true}
            speed={700}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            slidesPerView={1}
            spaceBetween={16}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 16, centeredSlides: true },
              640: { slidesPerView: 2, spaceBetween: 20, centeredSlides: false },
              1024: { slidesPerView: 3, spaceBetween: 28, centeredSlides: true },
            }}
            navigation={{ prevEl: ".bs-prev", nextEl: ".bs-next" }}
            onSlideChange={(sw) => setActive(sw.realIndex)}
            className="buzz-swiper !py-4"
          >
            {PRODUCTS.map(p => (
              <SwiperSlide key={p.id}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-[26px] md:rounded-[32px] bg-[#f0ebe3] shadow-md transition-all duration-500">
                  <img src={p.img} alt={p.name} className="h-full w-full object-cover" loading="lazy" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button aria-label="Previous" className="bs-prev absolute left-0 sm:left-2 md:left-3 top-1/2 -translate-y-1/2 z-30 grid h-10 w-10 md:h-12 md:w-12 place-items-center rounded-full border border-black/10 bg-white text-black shadow-md hover:bg-black hover:text-white transition-colors duration-300">
            <FiChevronLeft size={20} />
          </button>
          <button aria-label="Next" className="bs-next absolute right-0 sm:right-2 md:right-3 top-1/2 -translate-y-1/2 z-30 grid h-10 w-10 md:h-12 md:w-12 place-items-center rounded-full border border-black/10 bg-white text-black shadow-md hover:bg-black hover:text-white transition-colors duration-300">
            <FiChevronRight size={20} />
          </button>
        </div>
        <div className="mt-8 text-center max-w-xl mx-auto px-4">
          <h3 className="text-lg md:text-xl font-bold text-[#1c1c1c] leading-snug" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {current.name}
          </h3>
          <div className="mt-3.5 flex flex-wrap justify-center gap-2">
            {current.tags.map((tag, idx) => (
              <span key={idx} className="rounded-full bg-[#e3eae6] text-[#2d4740] px-4 py-1 text-[11px] font-medium tracking-wide">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-5">
            <button className="inline-block border border-[#8a8a8a] bg-transparent px-7 py-2.5 text-[10px] md:text-[11px] font-medium tracking-[0.25em] uppercase text-[#1a1a1a] hover:bg-black hover:text-white transition-colors duration-300">
              EXPLORE NOW
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- POPULAR CATEGORIES (3 tall cards) ---------- */
function Popular() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".pop-card", { scale: 0.92, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" } });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} className="mx-auto max-w-[1400px] px-5 md:px-8 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {CATEGORIES.map((c, i) => (
          <a key={c.key} href={`#${c.key}`} className="pop-card group relative overflow-hidden rounded-3xl aspect-[3/4] bg-[#f5f2ee]">
            <img src={c.img} alt={c.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute left-6 top-1/2 -translate-y-1/2 rotate-[-90deg] origin-left">
              <span className="text-white text-lg md:text-2xl font-700 tracking-[0.35em] uppercase whitespace-nowrap drop-shadow-md">{["Bralette", "Silicone", "Seamless"][i]}</span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 flex items-center justify-end">
              <span className="inline-flex items-center gap-2 text-xs font-600 tracking-[0.25em] uppercase text-white">
                Shop <FiChevronRight />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ---------- WATCH & SHOP ---------- */
function WatchShop() {
  return (
    <section className="bg-[#faf6f1] py-20 md:py-24">
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-5xl font-800 tracking-tight">Watch and Shop</h2>
      </div>
      <div className="no-scrollbar flex gap-3 overflow-x-auto snap-x px-3">
        {REELS.map((r, i) => (
          <div key={i} className="group relative aspect-[9/16] w-[46vw] sm:w-[32vw] md:w-[22vw] lg:w-[18vw] flex-none snap-start overflow-hidden rounded-3xl bg-black">
            <img src={r.img} alt={r.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70" />
            <div className="absolute right-3 top-3 rounded-full bg-white/25 backdrop-blur px-2.5 py-1 text-[10px] font-600 text-white">◉ {r.views}</div>
            <div className="absolute inset-0 grid place-items-center transition-opacity duration-300 group-hover:opacity-0">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-white/30 backdrop-blur ring-1 ring-white/40"><FiPlay className="text-white ml-0.5" /></div>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <p className="text-sm font-700">{r.title}</p>
              <p className="mt-1 text-[10px] font-500 tracking-widest uppercase opacity-80">♥ {r.likes}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- WHY CHOOSE ---------- */
function Why() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".why-card", { y: 40, opacity: 0, stagger: 0.12, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" } });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} className="mx-auto max-w-[1400px] px-5 md:px-8 py-20 md:py-24">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-5xl font-800 tracking-tight">Why Choose AARAMLY</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {WHY.map((w, i) => (
          <div key={i} className="why-card flex flex-col items-center gap-4 rounded-2xl border border-[#eaeaea] p-6 md:p-8 text-center hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.15)] transition-shadow">
            <w.icon size={28} className="text-black" />
            <h3 className="text-sm md:text-base font-700 tracking-wide">{w.title}</h3>
            <p className="text-xs md:text-sm font-400 text-[#4b4b4b]">{w.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer className="mt-8 border-t border-[#eaeaea] bg-white">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-16 md:grid-cols-5 md:px-8">
        <div className="md:col-span-2">
          <p className="text-2xl font-800 tracking-[0.2em]">AARAMLY</p>
          <p className="mt-4 max-w-xs text-sm text-[#4b4b4b]">Premium seamless innerwear crafted for skin-friendly, breathable comfort — every single day.</p>
          <div className="mt-6 flex items-center gap-3">
            {[FaInstagram, FaFacebookF, FaPinterestP, FaYoutube].map((I, i) => (
              <a key={i} href="#" aria-label="social" className="grid h-9 w-9 place-items-center rounded-full border border-[#eaeaea] hover:bg-black hover:text-white transition-colors"><I size={13} /></a>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-700 tracking-wide">Shop</p>
          <ul className="mt-4 space-y-3 text-sm text-[#4b4b4b]">
            <li><a href="#bralette" className="hover:text-black">Seamless Padded Bralette</a></li>
            <li><a href="#silicone" className="hover:text-black">Silicone Nipple Covers</a></li>
            <li><a href="#seamless" className="hover:text-black">Women's Seamless Bra</a></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-700 tracking-wide">Support</p>
          <ul className="mt-4 space-y-3 text-sm text-[#4b4b4b]">
            <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-black">Shipping</a></li>
            <li><a href="#" className="hover:text-black">Returns</a></li>
            <li><a href="#" className="hover:text-black">FAQs</a></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-700 tracking-wide">Newsletter</p>
          <p className="mt-4 text-sm text-[#4b4b4b]">Soft launches & subscriber-only offers.</p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex border border-[#eaeaea]">
            <input type="email" required placeholder="Your email" className="flex-1 bg-transparent px-3 py-3 text-sm outline-none" />
            <button className="bg-black px-4 text-white text-[10px] font-600 tracking-[0.25em] uppercase">Join</button>
          </form>
        </div>
      </div>
      <div className="border-t border-[#eaeaea] py-5 text-center text-xs text-[#4b4b4b]">© {new Date().getFullYear()} AARAMLY. All rights reserved.</div>
    </footer>
  );
}

/* ---------- PAGE ---------- */
export default function AaramlyHome() {
  const [activeTab, setActiveTab] = useState("bras");

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    lenis.on("scroll", ScrollTrigger.update);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);

  return (
    <main className="bg-white text-black">
      <Navbar />
      <Hero />
      <TrustTicker />
      <CuratedEdit />
      <FeaturedCategories onSelectCategory={(cat) => setActiveTab(cat)} />
      <Explainer />
      <Featured activeTab={activeTab} setActiveTab={setActiveTab} />
      <PromoBanner />
      <BestSelling />
      <Popular />
      <WatchShop />
      <Why />
      <Footer />
    </main>
  );
}
