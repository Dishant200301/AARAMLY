import React from "react";
import { FiShoppingBag, FiZap, FiPlus, FiMinus } from "react-icons/fi";
import { ProductColorVariation } from "../types/product";
import { useCart } from "../context/CartContext";

interface MobileStickyBottomBarProps {
  productId: string;
  productName: string;
  brand: string;
  activeVariation: ProductColorVariation;
  selectedSize: string;
}

export const MobileStickyBottomBar: React.FC<MobileStickyBottomBarProps> = ({
  productId,
  productName,
  brand,
  activeVariation,
  selectedSize,
}) => {
  const { cartItems, addToCart, updateQuantity, setIsCartOpen } = useCart();

  const cartItemId = `${productId}-${activeVariation.colorName}-${selectedSize}`;
  const cartItem = cartItems.find((i) => i.id === cartItemId);
  const inCartQuantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => {
    addToCart({
      productId,
      productName,
      brand,
      colorName: activeVariation.colorName,
      colorHex: activeVariation.colorHex,
      size: selectedSize,
      price: activeVariation.price,
      originalPrice: activeVariation.originalPrice,
      image: activeVariation.thumbnail || activeVariation.images[0].url,
      sku: activeVariation.sku,
      quantity: 1,
    });
  };

  const handleBuyNow = () => {
    if (inCartQuantity === 0) {
      handleAdd();
    }
    setIsCartOpen(true);
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-zinc-200 p-3 flex items-center justify-between gap-3 md:hidden shadow-2xl font-sans">
      {/* Price info */}
      <div className="flex flex-col shrink-0">
        <span className="text-[10px] font-bold text-[#80a17d] tracking-wider">
          -{activeVariation.discountPercentage}% OFF
        </span>
        <div className="flex items-baseline gap-1">
          <span className="text-base font-extrabold text-zinc-900">
            ₹{activeVariation.price}.00
          </span>
          <span className="text-xs text-zinc-400 line-through">
            ₹{activeVariation.originalPrice}
          </span>
        </div>
      </div>

      {/* CTAs matching Home Page button styles */}
      <div className="flex items-center gap-2 flex-1">
        {activeVariation.stock <= 0 ? (
          <button
            disabled
            className="w-full py-3.5 px-4 bg-zinc-200 text-zinc-500 text-xs font-bold tracking-wider rounded-full flex items-center justify-center gap-2 cursor-not-allowed uppercase shadow-2xs select-none"
          >
            Out of Stock
          </button>
        ) : inCartQuantity > 0 ? (
          <div className="w-full py-1.5 px-3 bg-[#1c1c1e] text-white rounded-full flex items-center justify-between shadow-md border border-zinc-800">
            <button
              onClick={() => updateQuantity(cartItemId, inCartQuantity - 1)}
              className="w-8 h-8 rounded-full bg-zinc-800 text-white flex items-center justify-center cursor-pointer active:scale-95"
            >
              <FiMinus size={13} />
            </button>
            <span className="text-xs font-bold text-white px-2">
              {inCartQuantity} in Bag
            </span>
            <button
              onClick={() => updateQuantity(cartItemId, inCartQuantity + 1)}
              className="w-8 h-8 rounded-full bg-zinc-800 text-white flex items-center justify-center cursor-pointer active:scale-95"
            >
              <FiPlus size={13} />
            </button>
          </div>
        ) : (
          <button
            onClick={handleAdd}
            className="w-full py-3.5 px-4 bg-[#1c1c1e] active:bg-black text-white text-xs font-bold tracking-wider rounded-full flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-md cursor-pointer"
          >
            <FiShoppingBag size={15} className="stroke-[2.5]" />
            <span>ADD TO BAG</span>
          </button>
        )}
      </div>
    </div>
  );
};
