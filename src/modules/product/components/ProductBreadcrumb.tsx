import React from "react";
import { FiChevronRight, FiHome } from "react-icons/fi";

interface BreadcrumbProps {
  category?: string;
  subCategory?: string;
  productName: string;
}

export const ProductBreadcrumb: React.FC<BreadcrumbProps> = ({
  category = "Women",
  subCategory = "Bras",
  productName,
}) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="py-3 px-4 md:px-8 max-w-[1400px] mx-auto text-xs text-zinc-500 font-sans"
    >
      <ol className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 whitespace-nowrap">
        <li className="hover:text-black transition-colors">
          <a href="/">Home</a>
        </li>
        <li className="text-zinc-400">›</li>
        <li className="hover:text-black transition-colors">
          <a href="/#women">{category}</a>
        </li>
        <li className="text-zinc-400">›</li>
        <li className="hover:text-black transition-colors">
          <a href="/#bras">{subCategory}</a>
        </li>
        <li className="text-zinc-400">›</li>
        <li className="hover:text-black transition-colors">
          <a href="/#everyday-bras">Everyday Bras</a>
        </li>
        <li className="text-zinc-400">›</li>
        <li
          className="text-zinc-800 font-medium truncate max-w-[200px] sm:max-w-[320px] md:max-w-[450px]"
          title={productName}
        >
          {productName}
        </li>
      </ol>
    </nav>
  );
};
