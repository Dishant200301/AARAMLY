import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiStar,
  FiShoppingBag,
  FiChevronDown,
  FiChevronUp,
  FiCheck,
  FiHeart,
  FiShare2,
  FiZap,
  FiPlus,
  FiMinus,
} from "react-icons/fi";
import { ProductColorVariation, ProductDetails } from "../types/product";
import { useCart } from "../context/CartContext";
import { ShareModal } from "./ShareModal";

interface ProductInfoProps {
  product: ProductDetails;
  activeVariation: ProductColorVariation;
  onSelectVariation: (variation: ProductColorVariation) => void;
  onHoverVariation?: (variation: ProductColorVariation | null) => void;
  selectedSize: string;
  onSelectSize: (size: string) => void;
  onOpenSizeChart: () => void;
}

/* Custom Select Dropdown for Cup Size with Compact Height & Hover Scroll Arrows */
interface ShadcnCupSizeSelectProps {
  selectedSize: string;
  availableSizes: string[];
  onSelectSize: (size: string) => void;
}

const ShadcnCupSizeSelect: React.FC<ShadcnCupSizeSelectProps> = ({
  selectedSize,
  availableSizes,
  onSelectSize,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const listRef = React.useRef<HTMLDivElement>(null);

  const handleScrollUp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (listRef.current) {
      listRef.current.scrollBy({ top: -40, behavior: "smooth" });
    }
  };

  const handleScrollDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (listRef.current) {
      listRef.current.scrollBy({ top: 40, behavior: "smooth" });
    }
  };

  return (
    <div className="relative inline-block text-left font-sans">
      {/* Trigger Button (Compact Height) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="flex items-center justify-between gap-2.5 px-3 py-1.5 rounded-md bg-white border border-zinc-200 hover:border-zinc-300 text-xs font-bold text-zinc-900 shadow-2xs hover:bg-zinc-50/80 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-zinc-950/10 min-w-[110px]"
      >
        <span className="tracking-wider">{selectedSize || "Select Size"}</span>
        <FiChevronDown
          size={14}
          className={`text-zinc-500 transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180 text-zinc-900" : ""
          }`}
        />
      </button>

      {/* Dropdown Popover Menu (Compact Height + Top/Bottom Chevron Arrows on Hover) */}
      {isOpen && (
        <div className="group absolute left-0 top-full mt-1.5 z-50 min-w-full w-32 bg-white border border-zinc-200 rounded-md shadow-lg font-sans overflow-hidden">
          {/* Top Chevron Arrow (Visible on Hover) */}
          <button
            type="button"
            onMouseDown={handleScrollUp}
            className="w-full py-1 flex items-center justify-center bg-white/95 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200 border-b border-zinc-100 cursor-pointer text-xs shrink-0"
            title="Scroll Up"
          >
            <FiChevronUp size={14} />
          </button>

          {/* Options Scroll Container (Compact height: max-h-36 / ~144px) */}
          <div
            ref={listRef}
            className="max-h-36 overflow-y-auto p-1 space-y-0.5 scrollbar-thin scrollbar-thumb-zinc-200 scrollbar-track-transparent"
            style={{ scrollbarWidth: "thin" }}
          >
            {availableSizes.map((sz) => {
              const isSelected = sz === selectedSize;
              return (
                <button
                  key={sz}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onSelectSize(sz);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-sm transition-colors text-left tracking-wider cursor-pointer ${
                    isSelected
                      ? "bg-zinc-100 text-zinc-900 font-bold"
                      : "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 font-medium"
                  }`}
                >
                  <span>{sz}</span>
                  {isSelected && <FiCheck size={13} className="text-zinc-900 ml-2" />}
                </button>
              );
            })}
          </div>

          {/* Bottom Chevron Arrow (Visible on Hover) */}
          <button
            type="button"
            onMouseDown={handleScrollDown}
            className="w-full py-1 flex items-center justify-center bg-white/95 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200 border-t border-zinc-100 cursor-pointer text-xs shrink-0"
            title="Scroll Down"
          >
            <FiChevronDown size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  activeVariation,
  onSelectVariation,
  onHoverVariation,
  selectedSize,
  onSelectSize,
  onOpenSizeChart,
}) => {
  const { cartItems, addToCart, updateQuantity, setIsCartOpen } = useCart();
  const [isAddedAnimation, setIsAddedAnimation] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Check if current variant is already in cart
  const cartItemId = `${product.id}-${activeVariation.colorName}-${selectedSize}`;
  const cartItem = cartItems.find((i) => i.id === cartItemId);
  const inCartQuantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      productName: product.name,
      brand: product.brand,
      colorName: activeVariation.colorName,
      colorHex: activeVariation.colorHex,
      size: selectedSize,
      price: activeVariation.price,
      originalPrice: activeVariation.originalPrice,
      image: activeVariation.thumbnail || activeVariation.images[0].url,
      sku: activeVariation.sku,
      quantity: 1,
    });

    setIsAddedAnimation(true);
    setTimeout(() => setIsAddedAnimation(false), 1200);
  };

  const handleBuyNow = () => {
    if (inCartQuantity === 0) {
      handleAddToCart();
    }
    setIsCartOpen(true);
  };

  const savings = activeVariation.originalPrice - activeVariation.price;

  return (
    <div className="w-full flex flex-col gap-6 lg:sticky lg:top-24 h-fit font-sans">
      {/* Brand & Action Buttons */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-montserrat font-600 tracking-[0.25em] text-[#798A7A]">
            Brand: <strong className="text-zinc-900 font-bold">{product.brand}</strong>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                isWishlisted
                  ? "border-[#bf5c30] bg-[#bf5c30]/10 text-[#bf5c30]"
                  : "border-zinc-200 text-zinc-700 hover:border-zinc-900 hover:text-zinc-900 bg-white shadow-2xs"
              }`}
              title="Add to Wishlist"
              aria-label="Wishlist"
            >
              <FiHeart size={16} className={isWishlisted ? "fill-[#bf5c30]" : ""} />
            </button>
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="p-2.5 rounded-full border border-zinc-200 text-zinc-700 hover:border-zinc-900 hover:text-zinc-900 bg-white transition-all shadow-2xs cursor-pointer"
              title="Share Product"
              aria-label="Share"
            >
              <FiShare2 size={16} />
            </button>
          </div>
        </div>

        {/* Title in Montserrat 800 uppercase matching Home Page */}
        <h1 className="text-[22px] sm:text-[26px] lg:text-[30px] xl:text-[34px] font-montserrat font-800 text-zinc-900 leading-[1.2] tracking-tight line-clamp-3">
          {product.name}
        </h1>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2 pt-1 font-montserrat">
          <div className="flex items-center gap-1.5 bg-[#f5f2ee] border border-zinc-200 px-3 py-1 rounded-full">
            <span className="text-xs font-bold text-zinc-900">{product.rating}</span>
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  size={12}
                  className={i < Math.floor(product.rating) ? "fill-amber-500" : "text-zinc-300"}
                />
              ))}
            </div>
          </div>
          <span
            onClick={() => {
              const revEl = document.getElementById("customer-reviews");
              revEl?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-xs text-zinc-500 font-semibold hover:text-zinc-900 cursor-pointer transition-colors"
          >
            ({product.reviewCount} reviews)
          </span>
        </div>
      </div>

      <hr className="border-zinc-100" />

      {/* Pricing with Discount Tag */}
      <div className="space-y-1 font-montserrat">
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="text-2xl md:text-3xl font-extrabold text-[#bf5c30]">
            -{activeVariation.discountPercentage}%
          </span>
          <span className="text-3xl md:text-4xl font-800 text-zinc-900">
            ₹{activeVariation.price.toLocaleString("en-IN")}.00
          </span>
          <span className="text-base text-zinc-400 line-through font-medium">
            ₹{activeVariation.originalPrice.toLocaleString("en-IN")}.00
          </span>
          {savings > 0 && (
            <span className="text-xs font-bold text-[#798A7A] bg-[#798A7A]/10 px-3 py-1 rounded-full border border-[#798A7A]/30">
              Save ₹{savings.toLocaleString("en-IN")}
            </span>
          )}
        </div>
        <p className="text-xs text-zinc-500 font-medium pt-1">
          Inclusive of all taxes • SKU: <span className="font-mono text-zinc-700 font-bold uppercase">{activeVariation.sku}</span>
        </p>
      </div>

      {/* Color Selection Cards */}
      <div className="space-y-3 font-montserrat">
        <div className="flex items-center justify-between">
          <span className="text-xs font-montserrat font-600 tracking-wider text-zinc-900">
            Colour: <span className="font-bold text-black">{activeVariation.colorName}</span>
          </span>
          <span className="text-xs font-bold text-[#798A7A] bg-[#798A7A]/15 px-3 py-0.5 rounded-full">
            In Stock ({activeVariation.stock} left)
          </span>
        </div>

        {/* Color Cards Row: Single horizontal line & compact cards on mobile, 4-col grid on tablet/laptop */}
        <div className="flex items-center gap-2.5 overflow-x-auto scrollbar-none py-1 px-0.5 sm:grid sm:grid-cols-4 sm:gap-3 sm:overflow-visible">
          {product.variations.map((v) => {
            const isActive = v.id === activeVariation.id;
            return (
              <motion.button
                key={v.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectVariation(v)}
                onMouseEnter={() => onHoverVariation?.(v)}
                onMouseLeave={() => onHoverVariation?.(null)}
                className={`flex flex-col p-1.5 sm:p-2 rounded-xl sm:rounded-[16px] border-2 transition-all duration-200 text-left bg-white relative group overflow-hidden shrink-0 w-[74px] sm:w-auto cursor-pointer ${
                  isActive
                    ? "border-zinc-900 shadow-md ring-1 ring-zinc-900"
                    : "border-zinc-200 hover:border-zinc-400 opacity-85 hover:opacity-100"
                }`}
              >
                <div className="w-full h-18 sm:h-auto sm:aspect-[4/5] rounded-lg sm:rounded-xl overflow-hidden bg-[#f5f2ee] mb-1 sm:mb-2">
                  <img
                    src={v.thumbnail || v.images[0].url}
                    alt={v.colorName}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col sm:flex-row items-baseline sm:items-center justify-between text-[11px] sm:text-xs px-0.5 leading-tight">
                  <span className="font-bold text-zinc-900">₹{v.price}</span>
                  <span className="text-[9px] sm:text-[10px] text-zinc-400 line-through">
                    ₹{v.originalPrice}
                  </span>
                </div>
                {isActive && (
                  <div className="absolute top-1 right-1 sm:top-2 sm:right-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-zinc-900 text-white flex items-center justify-center shadow-xs">
                    <FiCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Cup Size Selector (Shadcn UI Style) */}
      <div className="space-y-2 font-montserrat">
        <div className="flex items-center gap-2">
          <span className="text-xs font-montserrat font-600 tracking-wider text-zinc-900">Cup Size:</span>
        </div>

        <div className="flex items-center gap-4">
          <ShadcnCupSizeSelect
            selectedSize={selectedSize}
            availableSizes={product.availableSizes}
            onSelectSize={onSelectSize}
          />

          <button
            onClick={onOpenSizeChart}
            className="text-xs font-bold tracking-wider text-zinc-900 hover:text-[#bf5c30] transition-colors flex items-center gap-1 cursor-pointer"
          >
            Size Chart <FiChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* Top Highlights Section (Placed below Size Chart as requested) */}
      <div className="border-t border-b border-zinc-200/80 py-4 space-y-3 font-montserrat">
        <div className="flex items-center justify-between font-montserrat font-800 text-xs tracking-wider text-zinc-900">
          <span>Top Highlights</span>
        </div>

        {/* Highlight key-values list */}
        <div className="space-y-2.5 text-xs">
          {product.highlights.slice(0, 3).map((h, idx) => (
            <div key={idx} className="flex gap-4">
              <span className="text-zinc-400 font-bold tracking-wider text-[11px] w-36 shrink-0">{h.label}</span>
              <span className="text-zinc-800 font-semibold">{h.value}</span>
            </div>
          ))}
        </div>

        {/* View More button */}
        <button
          onClick={() => {
            const descEl = document.getElementById("product-description");
            if (descEl) {
              descEl.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="text-xs font-bold text-zinc-900 hover:text-[#bf5c30] tracking-wider pt-1 text-left block cursor-pointer transition-colors"
        >
          View More Details →
        </button>
      </div>

      {/* Primary Action Button: Full Width ADD TO BAG / QUANTITY CONTROLLER (Placed below Top Highlights) */}
      <div className="pt-1 font-montserrat">
        {inCartQuantity > 0 ? (
          /* Interactive In-Cart Quantity Counter replacing Add To Bag */
          <div className="w-full py-2 px-4 rounded-full bg-[#1c1c1e] text-white flex items-center justify-between shadow-md border border-zinc-800">
            <button
              onClick={() => updateQuantity(cartItemId, inCartQuantity - 1)}
              className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors cursor-pointer active:scale-95"
              aria-label="Decrease quantity in cart"
            >
              <FiMinus size={16} />
            </button>
            <div className="flex items-center gap-2.5 px-4">
              <FiShoppingBag size={18} className="text-[#798A7A]" />
              <span className="text-sm font-bold tracking-wider">
                {inCartQuantity} in Bag
              </span>
            </div>
            <button
              onClick={() => updateQuantity(cartItemId, inCartQuantity + 1)}
              className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors cursor-pointer active:scale-95"
              aria-label="Increase quantity in cart"
            >
              <FiPlus size={16} />
            </button>
          </div>
        ) : (
          /* Default Full Width ADD TO BAG Button */
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className={`w-full py-4 px-6 rounded-full font-bold text-xs tracking-[0.2em] flex items-center justify-center gap-2.5 transition-all duration-300 shadow-md cursor-pointer ${
              isAddedAnimation
                ? "bg-emerald-700 text-white shadow-emerald-700/30"
                : "bg-[#1c1c1e] hover:bg-black text-white shadow-zinc-900/20"
            }`}
          >
            {isAddedAnimation ? (
              <>
                <FiCheck size={18} className="animate-bounce" />
                <span>Added To Bag!</span>
              </>
            ) : (
              <>
                <FiShoppingBag size={16} className="stroke-[2.5]" />
                <span>ADD TO BAG</span>
              </>
            )}
          </motion.button>
        )}
      </div>

      {/* Social Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        productName={product.name}
      />
    </div>
  );
};

export default ProductInfo;
