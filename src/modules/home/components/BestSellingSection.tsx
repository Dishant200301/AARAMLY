import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { PRODUCTS } from "../lib/products";

import "swiper/css";
import "swiper/css/navigation";

export default function BestSellingSection() {
  const [active, setActive] = useState(0);
  const current = PRODUCTS[active % PRODUCTS.length];

  return (
    <section className="bg-[#faf7f2] py-16 md:py-24 overflow-hidden border-y border-aaramly-line">
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
            className="buzz-swiper py-8!"
          >
            {PRODUCTS.map(p => (
              <SwiperSlide key={p.id}>
                {({ isActive }) => (
                  <div className={`relative aspect-3/4 overflow-hidden rounded-[26px] md:rounded-[32px] bg-[#f0ebe3] transition-all duration-500 origin-center ${isActive ? "scale-100 opacity-100" : "scale-[0.88] opacity-[0.45]"
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
              <span key={idx} className="rounded-full bg-[#f0ebe3] text-aaramly-ink-2 px-4 py-1 text-[11px] font-medium tracking-wide">
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
