import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IMG } from "../lib/aaramly-images";
import ReelCard from "./ReelCard";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const REELS = [
  {
    title: "All-Day Bralette",
    views: "12.4K",
    likes: 240,
    img: IMG.bralette[0],
    video: "https://www.youtube.com/watch?v=mUhOAuy-Oek",
    relatedProduct: { name: "Aaramly Wire-free Bralette", price: "₹1,299", img: IMG.bralette[1], link: "#bralette" }
  },
  {
    title: "Invisible Silicone",
    views: "8.9K",
    likes: 180,
    img: IMG.seamless[1],
    video: "https://www.youtube.com/watch?v=mUhOAuy-Oek",
    relatedProduct: { name: "Premium Silicone Comfort Bra", price: "₹699", img: IMG.silicone[0], link: "#silicone" }
  },
  {
    title: "Seamless Comfort",
    views: "6.1K",
    likes: 132,
    img: IMG.seamless[0],
    video: "https://www.youtube.com/watch?v=mUhOAuy-Oek",
    relatedProduct: { name: "Aaramly Seamless Everyday Bra", price: "₹1,499", img: IMG.seamless[2], link: "#seamless" }
  },
  {
    title: "Sleep Soft",
    views: "4.5K",
    likes: 96,
    img: IMG.seamless[1],
    video: "https://www.youtube.com/watch?v=mUhOAuy-Oek",
    relatedProduct: { name: "Ultra-soft Sleeping Bra", price: "₹1,199", img: IMG.seamless[1], link: "#seamless" }
  },
  {
    title: "Everyday Ease",
    views: "3.7K",
    likes: 74,
    img: IMG.bralette[2],
    video: "https://www.youtube.com/watch?v=mUhOAuy-Oek",
    relatedProduct: { name: "Lightweight Bralette", price: "₹1,099", img: IMG.bralette[0], link: "#bralette" }
  },
  {
    title: "Breathe Free",
    views: "2.8K",
    likes: 58,
    img: IMG.seamless[3],
    video: "https://www.youtube.com/watch?v=mUhOAuy-Oek",
    relatedProduct: { name: "Breathable Mesh Comfort Bra", price: "₹1,399", img: IMG.seamless[3], link: "#seamless" }
  },
];

export default function WatchShopSection() {
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

      {/* MOBILE & TABLET SLIDER VIEW: visible on < lg */}
      <div className="relative block lg:hidden px-4 lg:px-12 max-w-[800px] mx-auto">
        <Swiper
          modules={[Pagination, Navigation]}
          grabCursor
          loop={true}
          speed={600}
          autoplay={false}
          slidesPerView={1}
          spaceBetween={16}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 16 },
            768: { slidesPerView: 2, spaceBetween: 24 }
          }}
          pagination={{ clickable: true, el: ".reels-pagination", bulletClass: "reels-bullet", bulletActiveClass: "reels-bullet-active" }}
          navigation={{ prevEl: ".reels-prev", nextEl: ".reels-next" }}
          className="w-full pb-6"
        >
          {REELS.map((r, i) => (
            <SwiperSlide key={i}>
              <ReelCard r={r} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Left/Right Centered Navigation Arrows */}
        <button className="reels-prev absolute left-6 md:left-2 top-[calc(50%-24px)] -translate-y-1/2 z-30 grid h-10 w-10 place-items-center rounded-full bg-white/90 border border-zinc-200 text-zinc-800 shadow-md hover:bg-black hover:text-white transition-all duration-300">
          <FiChevronLeft size={20} />
        </button>
        <button className="reels-next absolute right-6 md:right-2 top-[calc(50%-24px)] -translate-y-1/2 z-30 grid h-10 w-10 place-items-center rounded-full bg-white/90 border border-zinc-200 text-zinc-800 shadow-md hover:bg-black hover:text-white transition-all duration-300">
          <FiChevronRight size={20} />
        </button>

        {/* Bottom Pagination Dots */}
        <div className="reels-pagination flex justify-center gap-2 mt-4" />
      </div>

      {/* DESKTOP FLEX VIEW: visible on >= lg (completely unchanged) */}
      <div className="hidden lg:flex no-scrollbar gap-4 overflow-x-auto snap-x scroll-smooth px-5 md:px-8 max-w-[1400px] mx-auto">
        {REELS.map((r, i) => (
          <ReelCard key={i} r={r} />
        ))}
      </div>
    </section>
  );
}
