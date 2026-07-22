import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CATEGORIES = [
  { key: "bras", title: "SPORTS BRA", tag: "SHOP NOW", img: "/images/home/sports_bra.png" },
  { key: "panties", title: "PANTIES", tag: "SHOP NOW", img: "/images/home/panties.png" },
  { key: "sets", title: "ATHLEISURE", tag: "SHOP NOW", img: "/images/home/athleisure.png" },
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
    <section ref={ref} className="mx-auto max-w-[1400px] px-5 md:px-8 py-20 md:py-28">
      <div className="mb-10 md:mb-14 flex flex-col items-center text-center">
        <p className="text-xs tracking-[0.4em] font-500 uppercase text-aaramly-ink-2">Shop by Category</p>
        <h2 className="mt-3 text-3xl md:text-5xl font-800 tracking-tight">Featured Categories</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4">
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
