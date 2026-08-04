import React, { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ProductCard from "@/modules/home/components/ProductCard";
import { PRODUCTS } from "@/modules/home/lib/products";

export const RelatedProductsSection: React.FC = () => {
  // Use products from the homepage dataset (first 5 bra products like reference image 5)
  const productsList = PRODUCTS.filter(
    (p) => p.category === "bras" || p.category === "seamless"
  ).slice(0, 5);

  const scrollRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -280, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 280, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full py-12 px-4 md:px-8 max-w-[1400px] mx-auto space-y-6 font-sans">
      {/* Section Heading matching Home Page */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl md:text-4xl font-800 text-zinc-900 tracking-tight">
            Loved Together
          </h2>
          <div className="w-16 h-1 bg-[#80a17d] rounded-full" />
        </div>

        {/* Carousel Navigation Buttons (Visible on Mobile & Tablet < 1024px, Hidden on Laptop) */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-zinc-200 bg-white hover:bg-black hover:text-white flex items-center justify-center text-zinc-700 shadow-xs transition-colors cursor-pointer"
            aria-label="Previous products"
          >
            <FiChevronLeft size={18} />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-zinc-200 bg-white hover:bg-black hover:text-white flex items-center justify-center text-zinc-700 shadow-xs transition-colors cursor-pointer"
            aria-label="Next products"
          >
            <FiChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Product Cards Row: Horizontal Scroll Row on Mobile & Tablet (< 1024px), 5-col Grid on Laptop */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-none pb-3 lg:pb-0 lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible"
      >
        {productsList.map((p) => (
          <div
            key={p.id}
            className="w-[72vw] sm:w-[260px] max-w-[280px] shrink-0 lg:w-full lg:max-w-none"
          >
            <ProductCard p={p} />
          </div>
        ))}
      </div>
    </section>
  );
};
