import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import {
  FiSearch, FiHeart, FiUser, FiShoppingBag, FiMenu, FiX,
  FiChevronLeft, FiChevronRight, FiChevronDown, FiPlay, FiEye,
  FiTruck, FiUsers, FiRotateCcw, FiShield, FiAward,
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
  { icon: FiTruck, title: "Free Shipping", desc: "Free shipping on orders over INR 1500" },
  { icon: FiUsers, title: "Support", desc: "Working hours: 9 am to 6pm, Mon to Fri." },
  { icon: FiRotateCcw, title: "Return Policy", desc: "For detailed returned policy please read our document" },
  { icon: FiShield, title: "100% Payment Secure", desc: "We ensure secure payment gateway for all our customers" },
  { icon: FiAward, title: "High Quality", desc: "Designed to stand out, built to last—quality that speaks for itself." },
];

const REELS = [
  { title: "All-Day Bralette", views: "12.4K", likes: 240, img: IMG.bralette[0], video: "https://www.youtube.com/watch?v=Jm3Uo6j4bQ4" },
  { title: "Invisible Silicone", views: "8.9K", likes: 180, img: IMG.silicone[0], video: "https://www.youtube.com/watch?v=Gk7M6iE8vR4" },
  { title: "Seamless Comfort", views: "6.1K", likes: 132, img: IMG.seamless[0], video: "https://www.youtube.com/watch?v=kYJv5_rD4Q4" },
  { title: "Sleep Soft", views: "4.5K", likes: 96, img: IMG.seamless[1], video: "https://www.youtube.com/watch?v=aG_jF-L4s_w" },
  { title: "Everyday Ease", views: "3.7K", likes: 74, img: IMG.bralette[2], video: "https://www.youtube.com/watch?v=gT8H-mE24qQ" },
  { title: "Breathe Free", views: "2.8K", likes: 58, img: IMG.seamless[3], video: "https://www.youtube.com/watch?v=N4tL4X5k28Q" },
];

/* ---------- BRAND LOGO ---------- */
function AaramlyLogo({ className = "", showText = true }: { className?: string; showText?: boolean }) {
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
function Navbar() {
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
              <a key={l.href} href={l.href} className="text-sm font-500 tracking-wide transition-colors text-black hover:text-[#4b4b4b]">{l.label}</a>
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
        <div className="fixed inset-0 z-[60] bg-white">
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
    <section id="home" className="relative h-[100svh] mt-0 pt-[64px] lg:pt-0 lg:h-[calc(100svh-72px)] lg:mt-[72px] w-full overflow-hidden bg-white">
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
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
 
            <div className="relative z-10 flex h-full items-center">
              {/* Padding matches Navbar px-5 md:px-8 exactly to align along the header grid */}
              <div className="mx-auto max-w-[1400px] w-full px-5 md:px-8">
                <div className={`flex w-full ${s.align === "left" ? "justify-start text-left" :
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-4">
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
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hotspot", {
        scale: 0, opacity: 0, duration: 0.8, stagger: 0.15, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ref.current, start: "top 70%" }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  // Close active tooltip when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (active !== null && !(e.target as HTMLElement).closest('.hotspot')) {
        setActive(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [active]);

  return (
    <section id="explainer" ref={ref} className="mx-auto max-w-[1400px] px-5 md:px-8 py-20 md:py-28">
      <div className="mb-10 text-center">
        <p className="text-xs tracking-[0.4em] font-500 uppercase text-[#4b4b4b]">Prime</p>
        <h2 className="mt-3 text-3xl md:text-5xl font-800 tracking-tight"><span className="font-500">PRIME</span> SELECTIONS</h2>
      </div>
      <div className="relative mx-auto max-w-[860px] overflow-hidden rounded-3xl border border-[#eaeaea] bg-[#f5f2ee]">
        <img src={IMG.bralette[1]} alt="AARAMLY bralette" className="w-full h-auto object-cover" loading="lazy" />
        {HOTSPOTS.map((h, i) => (
          <div key={i} className="hotspot group absolute -translate-x-1/2 -translate-y-1/2 z-20" style={{ top: h.top, left: h.left }}>
            <button
              aria-label={h.title}
              onClick={(e) => {
                e.stopPropagation();
                setActive(active === i ? null : i);
              }}
              className="relative grid h-8 w-8 place-items-center rounded-full bg-white/90 shadow-lg ring-2 ring-black/10 transition-transform duration-300 hover:scale-110 active:scale-95"
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-white/60" />
              <span className="relative text-black text-lg leading-none font-medium">{active === i ? "×" : "+"}</span>
            </button>
            <div
              className={`absolute left-1/2 top-10 w-[180px] sm:w-52 -translate-x-1/2 rounded-xl border border-[#eaeaea] bg-white p-3 shadow-xl transition-all duration-300 ${
                active === i
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
              }`}
            >
              <p className="text-xs font-700 tracking-wide uppercase text-zinc-950">{h.title}</p>
              <p className="mt-1 text-xs text-[#4b4b4b] leading-normal">{h.desc}</p>
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
      gsap.from(".prod-card", {
        y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" }
      });
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
                  className={`relative pb-3 text-sm md:text-base font-semibold tracking-wide transition-all duration-300 cursor-pointer ${isActive
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
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4">
        {list.map(p => <div key={p.id} className="prod-card"><ProductCard p={p} /></div>)}
      </div>
    </section>
  );
}

/* ---------- PROMO BANNER ---------- */
function PromoBanner() {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-0 flex items-center justify-center overflow-visible select-none w-full">
      {/* Full-bleed container (no max-width, w-full) */}
      <div className="w-full relative overflow-visible aspect-[2/1] sm:aspect-[2.2/1] md:aspect-[2.5/1]">

        {/* Balcony background scene spanning 100% full width, no rounded corners */}
        <div className="absolute inset-x-0 bottom-0 top-[12%] sm:top-[15%] overflow-hidden bg-[#f2f2f2]">
          <img
            src="/images/home/Gemini_Generated_Image_4k8pfc4k8pfc4k8p.webp"
            alt=""
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>

        {/* Big Signature Series heading positioned at the top on the section background */}
        <div className="absolute -top-[8%] left-0 right-0 z-10 text-center px-4">
          <h3 className="text-[7.5vw] sm:text-[6.5vw] md:text-5xl lg:text-[110px] font-medium tracking-[0.16em] text-zinc-400/80 uppercase leading-none font-sans whitespace-nowrap">
            SIGNATURE SERIES
          </h3>
        </div>

        {/* Model cutout overlapping and extending above the background image */}
        <img
          src="/images/home/signature_model_transparent.png"
          alt="Signature Series Model"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[118%] sm:h-[126%] md:h-[134%] lg:h-[112%] w-auto object-contain z-20 pointer-events-none"
          loading="lazy"
        />
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
        <div className="relative px-2 sm:px-12 md:px-16">
          <Swiper
            modules={[Autoplay, Navigation]}
            grabCursor
            centeredSlides={true}
            loop={true}
            speed={700}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            slidesPerView={1.3}
            spaceBetween={16}
            breakpoints={{
              0: { slidesPerView: 1.3, spaceBetween: 16, centeredSlides: true },
              768: { slidesPerView: 2, spaceBetween: 24, centeredSlides: false },
              1024: { slidesPerView: 3, spaceBetween: 36, centeredSlides: true },
            }}
            navigation={{ prevEl: ".bs-prev", nextEl: ".bs-next" }}
            onSlideChange={(sw) => setActive(sw.realIndex)}
            className="buzz-swiper !py-8"
          >
            {PRODUCTS.map(p => (
              <SwiperSlide key={p.id}>
                {({ isActive }) => (
                  <div className={`relative aspect-[3/4] overflow-hidden rounded-[26px] md:rounded-[32px] bg-[#f0ebe3] transition-all duration-500 origin-center ${isActive ? "scale-100 opacity-100" : "scale-[0.88] opacity-[0.45]"
                    }`}>
                    <img src={p.img} alt={p.name} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Vertically centered square navigation buttons */}
          <button
            aria-label="Previous"
            className="bs-prev absolute left-0 lg:-left-4 top-1/2 -translate-y-1/2 z-30 grid h-10 w-10 place-items-center rounded-lg border border-zinc-200 bg-white text-zinc-600 shadow-sm hover:bg-black hover:text-white transition-all duration-300"
          >
            <FiChevronLeft size={18} />
          </button>
          <button
            aria-label="Next"
            className="bs-next absolute right-0 lg:-right-4 top-1/2 -translate-y-1/2 z-30 grid h-10 w-10 place-items-center rounded-lg border border-zinc-200 bg-white text-zinc-600 shadow-sm hover:bg-black hover:text-white transition-all duration-300"
          >
            <FiChevronRight size={18} />
          </button>
        </div>

        {/* Dynamic product info below Swiper */}
        <div className="mt-8 text-center max-w-xl mx-auto px-4">
          <h3 className="text-lg md:text-xl font-bold text-[#1c1c1c] leading-snug" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {current.name}
          </h3>
          <div className="mt-3.5 flex flex-wrap justify-center gap-2">
            {current.tags.map((tag, idx) => (
              <span key={idx} className="rounded-full bg-[#f0ebe3] text-[#4b4b4b] px-4 py-1 text-[11px] font-medium tracking-wide">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-5">
            <button className="inline-block border border-zinc-800 bg-transparent px-8 py-3 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-zinc-900 hover:bg-black hover:text-white transition-all duration-300">
              EXPLORE NOW
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const POPULAR_CATEGORIES = [
  { key: "shapewear", title: "SHAPEWEAR", img: "/images/home/shapewear.png" },
  { key: "period_panty", title: "PERIOD PANTY", img: "/images/home/period_panty.png" },
  { key: "innerwear_top", title: "INNERWEAR TOP", img: "/images/home/innerwear_top.png" },
];

function Popular() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".pop-card", {
        scale: 0.92, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" }
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} className="mx-auto max-w-[1400px] px-5 md:px-8 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-4">
        {POPULAR_CATEGORIES.map((c) => (
          <div
            key={c.key}
            className="pop-card group relative overflow-hidden rounded-[18px] md:rounded-[20px] aspect-[10/14] bg-[#f5f2ee] shadow-sm select-none cursor-pointer"
          >
            {/* Image zoom on hover */}
            <img
              src={c.img}
              alt={c.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              loading="lazy"
            />
            {/* Soft left-to-right shadow overlay to ensure typography legibility */}
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black/45 via-black/15 to-transparent pointer-events-none z-10" />

            {/* Centered rotated label on the left margin */}
            <div className="absolute left-6 sm:left-8 md:left-10 top-0 bottom-0 flex items-center justify-center w-0 z-20 pointer-events-none">
              <span className="font-serif text-2xl sm:text-3xl md:text-[40px] font-light tracking-[0.25em] uppercase text-white whitespace-nowrap rotate-[-90deg] origin-center drop-shadow-md">
                {c.title}
              </span>
            </div>

            {/* Micro chevron arrow bottom right */}
            <div className="absolute right-6 bottom-6 p-2 rounded-full bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <FiChevronRight className="text-white" size={18} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

interface ReelItem {
  title: string;
  views: string;
  likes: number;
  img: string;
  video: string;
}

function ReelCard({ r }: { r: ReelItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Helper to extract YouTube ID
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=||shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const ytId = getYouTubeId(r.video);

  const handleMouseEnter = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="reel-card group relative w-[45vw] h-[80vw] sm:w-[30vw] sm:h-[53.3vw] md:w-[30vw] md:h-[53.3vw] lg:w-[22vw] lg:h-[40vw] flex-none snap-start overflow-hidden bg-zinc-950 shadow-md select-none cursor-pointer"
    >
      {/* Background Image */}
      <img
        src={r.img}
        alt={r.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />

      {/* Video Overlay (YouTube IFrame or HTML5 Video) */}
      {ytId && isPlaying ? (
        <div className="absolute inset-0 w-full h-full overflow-hidden z-10 pointer-events-none">
          <iframe
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${ytId}&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1&enablejsapi=1`}
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[316%] h-full pointer-events-none border-0"
            allow="autoplay; encrypted-media"
          />
        </div>
      ) : !ytId ? (
        <video
          ref={videoRef}
          src={r.video}
          loop
          muted
          playsInline
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 z-10 ${
            isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />
      ) : null}

      {/* Frosted Glass Overlay (active by default, fades out on hover/play) */}
      <div className={`absolute inset-0 bg-white/5 backdrop-blur-[3px] transition-all duration-500 z-10 pointer-events-none ${
        isPlaying ? "opacity-0 backdrop-blur-none" : "opacity-100"
      }`} />

      {/* Premium Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/75 z-10 pointer-events-none" />

      {/* View count pill with backdrop blur */}
      <div className="absolute right-3.5 top-3.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 px-2.5 py-1 text-[10px] font-medium text-white flex items-center gap-1 shadow-sm z-20">
        <FiEye className="text-white/90" size={11} />
        <span>{r.views}</span>
      </div>

      {/* Centered Logo & Play Button (fades out when video is playing) */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center z-20 transition-all duration-500 ${
        isPlaying ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
      }`}>
        {/* Stylized Logo Icon */}
        <div className="flex flex-col items-center mb-3 transition-transform duration-500 group-hover:scale-105">
          <svg className="w-7 h-7 text-white/90 mb-1 drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M12 12c-2.5-2.5-2.5-5.5 0-7 2.5 1.5 2.5 4.5 0 7z" fill="currentColor" fillOpacity="0.15" />
            <path d="M12 12c2.5-2.5 5.5-2.5 7 0-1.5 2.5-4.5 2.5 0 7z" fill="currentColor" fillOpacity="0.15" />
            <path d="M12 12c2.5 2.5 2.5 5.5 0 7-2.5-1.5-2.5-4.5 0-7z" fill="currentColor" fillOpacity="0.15" />
            <path d="M12 12c-2.5 2.5-5.5 2.5-7 0 1.5-2.5 4.5-2.5 0-7z" fill="currentColor" fillOpacity="0.15" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          </svg>
          <span className="font-serif text-sm tracking-[0.2em] lowercase text-white drop-shadow-md select-none opacity-90 uppercase">
            AARAMLY
          </span>
        </div>
        {/* Circular Glass Play Button */}
        <div className="h-11 w-11 rounded-full bg-white/20 backdrop-blur-md border border-white/35 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-white/35 group-hover:scale-110 shadow-lg cursor-pointer">
          <FiPlay className="text-white fill-white ml-0.5" size={14} />
        </div>
      </div>

      {/* Bottom info section */}
      <div className="absolute inset-x-0 bottom-0 p-4.5 flex items-end justify-between text-white z-20 bg-gradient-to-t from-black/85 via-black/20 to-transparent pt-12">
        <p className="text-xs md:text-sm font-semibold tracking-wide drop-shadow-sm line-clamp-1">{r.title}</p>
        <div className="flex items-center gap-1 text-[11px] opacity-90 flex-shrink-0 bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/5 shadow-sm">
          <FiHeart className="text-white fill-white/25 transition-colors group-hover:fill-red-500 group-hover:text-red-500" size={11} />
          <span className="font-medium">{r.likes}</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- WATCH & SHOP ---------- */
function WatchShop() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".reel-card", {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-[#faf6f1] py-20 md:py-24 overflow-hidden">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-serif tracking-wide text-zinc-900">Watch and Shop</h2>
      </div>
      <div className="no-scrollbar flex gap-4 overflow-x-auto snap-x scroll-smooth px-5 md:px-8 max-w-[1400px] mx-auto">
        {REELS.map((r, i) => (
          <ReelCard key={i} r={r} />
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
      gsap.from(".why-card", {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" }
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} className="bg-[#faf7f2] py-20 md:py-28 border-t border-[#eaeaea]">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-6">
          {WHY.map((w, i) => (
            <div key={i} className="why-card flex flex-col items-center text-center select-none">
              {/* Thin outline circle wrapper matching reference image */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-zinc-900 text-zinc-950 mb-3 bg-transparent">
                <w.icon size={26} strokeWidth={1.2} />
              </div>
              {/* Elegant serif title */}
              <h3 className="text-base md:text-lg font-normal tracking-wide text-zinc-950 font-serif mb-1">{w.title}</h3>
              {/* Small description text */}
              <p className="text-xs md:text-sm font-normal text-zinc-500 max-w-[200px] leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer className="mt-8  bg-white">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:px-8">
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2 sm:row-start-1 lg:row-start-1 xl:row-start-1">
          <div className="mb-4">
            <AaramlyLogo />
          </div>
          <p className="mt-4 max-w-xs text-sm text-[#4b4b4b]">Premium seamless innerwear crafted for skin-friendly, breathable comfort — every single day.</p>
          <div className="mt-6 flex items-center gap-3">
            {[FaInstagram, FaFacebookF, FaPinterestP, FaYoutube].map((I, i) => (
              <a key={i} href="#" aria-label="social" className="grid h-9 w-9 place-items-center rounded-full border border-[#eaeaea] hover:bg-black hover:text-white transition-colors"><I size={13} /></a>
            ))}
          </div>
        </div>
        <div className="col-span-1 sm:col-span-1 lg:col-span-2 xl:col-span-1 sm:row-start-2 lg:row-start-2 xl:row-start-1">
          <p className="text-sm font-700 tracking-wide">Shop</p>
          <ul className="mt-4 space-y-3 text-sm text-[#4b4b4b]">
            <li><a href="#bralette" className="hover:text-black">Seamless Padded Bralette</a></li>
            <li><a href="#silicone" className="hover:text-black">Silicone Nipple Covers</a></li>
            <li><a href="#seamless" className="hover:text-black">Women's Seamless Bra</a></li>
          </ul>
        </div>
        <div className="col-span-1 sm:col-span-1 lg:col-span-2 xl:col-span-1 sm:row-start-2 lg:row-start-2 xl:row-start-1">
          <p className="text-sm font-700 tracking-wide">Support</p>
          <ul className="mt-4 space-y-3 text-sm text-[#4b4b4b]">
            <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-black">Shipping</a></li>
            <li><a href="#" className="hover:text-black">Returns</a></li>
            <li><a href="#" className="hover:text-black">FAQs</a></li>
          </ul>
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-1 sm:row-start-3 lg:row-start-1 xl:row-start-1">
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
    <main className="bg-white text-black overflow-hidden">
      <Navbar />
      <Hero />
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
