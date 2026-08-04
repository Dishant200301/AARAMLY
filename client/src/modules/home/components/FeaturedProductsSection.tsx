import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { PRODUCTS, CATEGORY_TABS } from "../lib/products";
import ProductCard from "./ProductCard";
import { subscribeToProductStore, getLiveProductsList } from "@/modules/core/lib/apiStore";

import "swiper/css";

interface FeaturedProps {
  activeTab?: string;
  setActiveTab?: (t: string) => void;
}

export default function FeaturedProductsSection({ activeTab, setActiveTab }: FeaturedProps) {
  const [localTab, setLocalTab] = useState("bras");
  const tab = activeTab !== undefined ? activeTab : localTab;
  const setTab = setActiveTab !== undefined ? setActiveTab : setLocalTab;

  const [liveList, setLiveList] = useState(getLiveProductsList);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null);

  useEffect(() => {
    const update = () => setLiveList([...getLiveProductsList()]);
    const unsub = subscribeToProductStore(update);
    return () => unsub();
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".prod-card", {
        y: 30, opacity: 0, stagger: 0.08, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" }
      });
    }, ref);
    return () => ctx.revert();
  }, [tab, liveList]);

  // Dynamic products added from Admin Panel
  const list = liveList
    .filter((lp) => {
      if (!tab || tab === "bras") return true;
      const cat = (lp.category || "").toLowerCase();
      if (tab === "panties") return cat.includes("panty") || cat.includes("panties");
      if (tab === "sets") return cat.includes("set");
      if (tab === "seamless") return cat.includes("seamless");
      if (tab === "nightwear") return cat.includes("night") || cat.includes("sleep");
      return true;
    })
    .map((lp) => ({
      id: lp.id,
      code: lp.defaultSku || lp.sku || "STYLE-#100",
      name: lp.name,
      tagline: lp.subtitle || lp.shortDescription || "Seamless Contour Shaper",
      price: lp.price,
      originalPrice: lp.originalPrice || Math.round(lp.price * 1.6),
      discountPercentage: lp.discountPercentage || 38,
      image: lp.image || (Array.isArray(lp.images) ? lp.images[0] : ""),
      hoverImage: lp.hoverImage || (Array.isArray(lp.images) && lp.images[1] ? lp.images[1] : lp.image),
      rating: lp.rating || 4.8,
      category: lp.category || "bras",
    }));

  return (
    <section id="featured" ref={ref} className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-8 py-10 md:py-24">
      {/* Top Categories Heading & Category Filter Tabs */}
      <div className="mb-8 md:mb-14 flex flex-col items-center text-center">
        <h2 className="text-2xl md:text-5xl font-800 tracking-tight text-zinc-900 uppercase">
          Top Categories
        </h2>

        {/* Scrollable Category Filter Tabs */}
        <div className="w-full max-w-2xl mt-5 md:mt-8 px-0 overflow-x-auto no-scrollbar">
          <div className="flex justify-center items-center gap-6 sm:gap-8 md:gap-10 min-w-max mx-auto px-4">
            {CATEGORY_TABS.map((t) => {
              const isActive = tab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => {
                    setTab(t.key);
                    setActiveIndex(0);
                    swiperRef?.slideTo(0);
                  }}
                  className={`relative pb-3 text-sm sm:text-base font-semibold tracking-wide transition-all duration-300 cursor-pointer ${isActive ? "text-zinc-900 font-bold" : "text-zinc-400 hover:text-zinc-600"
                    }`}
                >
                  {t.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#80a17d]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {list.length === 0 ? (
        <div className="py-12 text-center text-zinc-500 font-sans text-sm bg-zinc-50 rounded-2xl border border-zinc-200/80 max-w-xl mx-auto">
          No products added yet. Add products from the Admin Panel to display them here.
        </div>
      ) : (
        <>
          {/* Mobile View Horizontal Swiper Carousel */}
          <div className="block md:hidden">
            <Swiper
              key={tab}
              onSwiper={setSwiperRef}
              spaceBetween={14}
              slidesPerView={1.15}
              breakpoints={{
                480: { slidesPerView: 1.3, spaceBetween: 16 },
                640: { slidesPerView: 1.8, spaceBetween: 18 },
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              className="w-full !py-2"
            >
              {list.map((p) => (
                <SwiperSlide key={p.id}>
                  <div className="prod-card">
                    <ProductCard p={p} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Pagination Dots */}
            <div className="flex justify-center items-center gap-2 mt-6">
              {list.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => swiperRef?.slideTo(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === idx ? "w-6 bg-black" : "w-2.5 bg-zinc-300"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Desktop View Product Cards Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            {list.map((p) => (
              <div key={p.id} className="prod-card">
                <ProductCard p={p} />
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
