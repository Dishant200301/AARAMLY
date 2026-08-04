import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";

export const FloatingStickyCart: React.FC = () => {
  const { setIsCartOpen, totalItemsCount, totalPrice } = useCart();

  if (totalItemsCount <= 0) return null;

  return (
    <AnimatePresence>
      {/* MOBILE & TABLET FLOATING BOTTOM CART BAR matching Image 3 */}
      <motion.div
        key="sticky-cart-mobile"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="fixed bottom-4 left-4 right-4 z-40 lg:hidden font-sans select-none"
      >
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="w-full bg-black text-white p-1.5 rounded-xl flex items-center justify-between transition-all cursor-pointer active:scale-98 border border-emerald-400/30"
          aria-label="View Cart"
        >
          {/* Left: Cart Icon Box + Count + Price */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
              <ShoppingBag className="w-5 h-5 stroke-1.5" />
            </div>
            <div className="flex flex-col items-start text-left">
              <span className="text-xs font-semibold text-emerald-100 leading-tight">
                {totalItemsCount} {totalItemsCount === 1 ? "item" : "items"}
              </span>
              <span className="text-base font-semibold text-white tracking-tight">
                ₹{totalPrice.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Right: View Cart Action */}
          <div className="flex items-center gap-1 text-sm font-semibold text-white pr-2">
            <span>View Cart</span>
            <ChevronRight className="w-6 h-6 stroke-[2]" />
          </div>
        </button>
      </motion.div>

      {/* DESKTOP SIDE FLOATING CART TAB */}
      <motion.div
        key="sticky-cart-desktop"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="hidden lg:block fixed right-0 top-1/2 -translate-y-1/2 z-40 font-sans"
      >
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCartOpen(true)}
          className="bg-black text-white rounded-l-xl p-2 flex flex-col items-center gap-2 transition-all cursor-pointer group w-20"
          aria-label="Open Cart"
        >
          <div className="flex flex-col items-center text-[11px] font-black tracking-tight text-center">
            <ShoppingBag className="w-5 h-5 mb-1 transition-transform stroke-1.5" />
            <span>{totalItemsCount} {totalItemsCount === 1 ? "Item" : "Items"}</span>
          </div>
          <div className="w-full bg-white text-black text-xs font-black py-1 px-1 rounded-xl text-center">
            ₹{totalPrice.toLocaleString("en-IN")}
          </div>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingStickyCart;
