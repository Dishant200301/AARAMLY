import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { PRODUCTS, CATEGORY_TABS } from "../lib/products";
import ProductCard from "./ProductCard";

interface FeaturedProps {
  activeTab?: string;
  setActiveTab?: (t: string) => void;
}

export default function FeaturedProductsSection({ activeTab, setActiveTab }: FeaturedProps) {
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
