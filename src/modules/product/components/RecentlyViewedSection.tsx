import React from "react";
import ProductCard from "@/modules/home/components/ProductCard";
import { PRODUCTS } from "@/modules/home/lib/products";

export const RecentlyViewedSection: React.FC = () => {
  // Use products from home dataset for recently viewed items
  const recentProducts = PRODUCTS.slice(2, 6);

  return (
    <section className="w-full py-12 px-4 md:px-8 max-w-[1400px] mx-auto space-y-6 font-sans border-t border-zinc-200">
      {/* Section Heading */}
      <div className="space-y-2">
        <h2 className="text-2xl md:text-4xl font-800 text-zinc-900 tracking-tight">
          Recently Viewed
        </h2>
        <div className="w-16 h-1 bg-[#bf5c30] rounded-full" />
      </div>

      {/* Grid of recently viewed items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 overflow-hidden">
        {recentProducts.map((p) => (
          <div key={p.id} className="w-full">
            <ProductCard p={p} />
          </div>
        ))}
      </div>
    </section>
  );
};
