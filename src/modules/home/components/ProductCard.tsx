import { FiHeart, FiShoppingBag } from "react-icons/fi";

export type Product = {
  id: string; name: string; price: number; rating: number;
  img: string; hoverImg: string; colors: string[]; sizes: string[]; category: string;
  tags: string[];
};

export default function ProductCard({ p }: { p: Product }) {
  const skuMap: Record<string, string> = {
    p1: "#1102", p2: "#1354", p3: "#1498", p4: "#1532",
    p5: "#1722", p6: "#1811", p7: "#1902", p8: "#2105",
    p9: "#2341", p10: "#2509", p11: "#2718", p12: "#2901",
    p13: "#3104", p14: "#3312"
  };
  const sku = skuMap[p.id] || `#${p.id.toUpperCase()}`;

  return (
    <div className="group flex flex-col bg-transparent cursor-pointer">
      {/* Image Wrapper */}
      <div className="relative aspect-3/4 overflow-hidden rounded-[10px] bg-[#f5f2ee]">
        {/* Main Image */}
        <img
          src={p.img}
          alt={p.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />

        {/* Hover Alternative Image */}
        <img
          src={p.hoverImg}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* Wishlist Heart Icon */}
        <button
          aria-label="Wishlist"
          className="absolute right-3.5 top-3.5 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 backdrop-blur-sm text-black hover:bg-black hover:text-white hover:scale-110 shadow-sm transition-all duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <FiHeart size={14} className="stroke-[2.5]" />
        </button>
      </div>

      {/* Info Content */}
      <div className="flex flex-1 flex-col pt-3">
        {/* SKU Number */}
        <p className="text-[11px] font-bold text-zinc-400 tracking-wider uppercase">{sku}</p>

        {/* Product Title / Characteristics */}
        <h3 className="mt-1 text-sm font-semibold text-zinc-800 line-clamp-2 min-h-10 leading-snug">
          {p.name}
        </h3>

        {/* Price & Add To Bag Button */}
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-base font-bold text-zinc-900">
            ₹{p.price.toLocaleString("en-IN")}.00
          </span>
          <button
            className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase bg-[#1c1c1e] hover:bg-black text-white px-4 py-2.5 rounded-full shadow-sm hover:scale-[1.03] transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <FiShoppingBag size={12} className="stroke-[2.5]" /> Add To Bag
          </button>
        </div>
      </div>
    </div>
  );
}
