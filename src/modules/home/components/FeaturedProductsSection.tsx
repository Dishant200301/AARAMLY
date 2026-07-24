import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { PRODUCTS, CATEGORY_TABS } from "../lib/products";
import ProductCard from "./ProductCard";

import "swiper/css";

interface FeaturedProps {
  activeTab?: string;
  setActiveTab?: (t: string) => void;
}

export default function FeaturedProductsSection({ activeTab, setActiveTab }: FeaturedProps) {
  const [localTab, setLocalTab] = useState("bras");
  const tab = activeTab !== undefined ? activeTab : localTab;
  const setTab = setActiveTab !== undefined ? setActiveTab : setLocalTab;

  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null);

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
  }, [tab]);

  const list = PRODUCTS.filter(p => p.category === tab);

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
                  className={`relative pb-3 text-sm sm:text-base font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                    isActive ? "text-zinc-900 font-bold" : "text-zinc-400 hover:text-zinc-600"
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

      {/* Mobile View Horizontal Swiper Carousel with Pagination */}
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
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === idx ? "w-6 bg-black" : "w-2.5 bg-zinc-300"
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
    </section>
  );
}


