import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CATEGORIES = [
  {
    key: "bras",
    title: "SPORTS BRA",
    tag: "SHOP NOW",
    img: "/images/home/sports_bra.png",
    mobileImg: "/images/home/mobile_cat_2.png",
  },
  {
    key: "panties",
    title: "PANTIES",
    tag: "SHOP NOW",
    img: "/images/home/panties.png",
    mobileImg: "/images/home/mobile_cat_3.png",
  },
  {
    key: "sets",
    title: "ATHLEISURE",
    tag: "SHOP NOW",
    img: "/images/home/athleisure.png",
    mobileImg: "/images/home/mobile_cat_1.png",
  },
];

interface FeaturedCategoriesProps {
  onSelectCategory?: (key: string) => void;
}

export default function FeaturedCategoriesSection({ onSelectCategory }: FeaturedCategoriesProps) {
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
    <section ref={ref} className="mx-auto max-w-[1400px] px-5 md:px-8 py-12 md:py-28">
      {/* Mobile View Header */}
      <div className="block md:hidden mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="h-[1px] w-8 bg-zinc-300" />
          <p className="text-[11px] tracking-[0.3em] font-medium uppercase text-[#2e5d4e]">
            SHOP BY CATEGORY
          </p>
          <span className="h-[1px] w-8 bg-zinc-300" />
        </div>
        <h2 className="text-3xl font-serif tracking-tight text-zinc-900 mb-1">
          Featured Categories
        </h2>
        <p className="text-xs text-zinc-500 font-light">
          Comfort that fits your every move.
        </p>
      </div>

      {/* Desktop View Header */}
      <div className="hidden md:flex mb-10 md:mb-14 flex-col items-center text-center">
        <p className="text-xs tracking-[0.4em] font-500 uppercase text-aaramly-ink-2">Shop by Category</p>
        <h2 className="mt-3 text-3xl md:text-5xl font-800 tracking-tight">Featured Categories</h2>
      </div>

      {/* Mobile View Cards (Left Side Content, Left Side Gradient Overlay, No Arrow) */}
      <div className="block md:hidden space-y-4">
        {CATEGORIES.map((c) => (
          <a
            key={c.key}
            href="#featured"
            onClick={(e) => handleClick(e, c.key)}
            className="fcat-card group relative block overflow-hidden bg-[#f5f2ee] aspect-[16/9] rounded-[16px] shadow-xs"
          >
            <img
              src={c.mobileImg || c.img}
              alt={c.title}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            {/* Left Side Gradient Overlay (Exact match to reference image) */}
            <div className="absolute inset-y-0 left-0 w-[65%] bg-gradient-to-r from-black/85 via-black/45 to-transparent" />

            {/* Bottom-Left Content (No arrow icon) */}
            <div className="absolute inset-0 p-6 flex flex-col justify-center items-start text-left pb-6">
              <h3 className="font-serif text-2xl font-normal tracking-widest uppercase text-white leading-tight">
                {c.title}
              </h3>
              <div className="mt-2.5 inline-flex flex-col items-start">
                <span className="text-[11px] font-bold tracking-[0.25em] text-white uppercase">
                  {c.tag}
                </span>
                <span className="h-[1px] w-full bg-white mt-1 transition-transform duration-300 origin-left scale-x-100 group-hover:scale-x-75" />
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Desktop View Cards Grid */}
      <div className="hidden md:grid grid-cols-3 gap-4">
        {CATEGORIES.map((c) => (
          <a
            key={c.key}
            href="#featured"
            onClick={(e) => handleClick(e, c.key)}
            className="fcat-card group relative overflow-hidden bg-[#f5f2ee] aspect-3/4 rounded-[10px] shadow-[0_4px_30px_rgba(0,0,0,0.02)]"
          >
            <img
              src={c.img}
              alt={c.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1200 ease-out "
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/85 via-black/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 flex flex-col items-start">
              <h3 className="font-serif text-2xl md:text-3xl font-normal tracking-widest uppercase text-white leading-tight">
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

