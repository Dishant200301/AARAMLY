import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShoppingBag,
  FiX,
  FiPlus,
  FiMinus,
  FiTrash2,
  FiArrowRight,
  FiShield,
} from "react-icons/fi";
import { useCart } from "../context/CartContext";

export const FloatingStickyCart: React.FC = () => {
  const { isCartOpen, setIsCartOpen, totalItemsCount, totalPrice } = useCart();

  return (
    <>
      {/* Right Side Floating Cart Pill matching reference image widget */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 font-sans"
      >
        <motion.button
          whileHover={{ scale: 1.04, x: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCartOpen(true)}
          className="bg-[#27272a] text-white rounded-l-md p-2 flex flex-col items-center gap-1.5 shadow-xl border-l border-y border-zinc-700 hover:bg-black transition-all cursor-pointer group w-16"
          aria-label="Open Cart"
        >
          <div className="flex items-center gap-1 text-[11px] font-bold tracking-tight text-center">
            <FiShoppingBag size={14} className="group-hover:scale-110 transition-transform" />
            <span>{totalItemsCount} {totalItemsCount === 1 ? "Item" : "Items"}</span>
          </div>
          <div className="w-full bg-white text-zinc-900 text-xs font-bold py-1 px-1 rounded-sm text-center shadow-2xs">
            ₹{totalPrice.toLocaleString("en-IN")}.00
          </div>
        </motion.button>
      </motion.div>

      {/* Cart Drawer Slide-Over */}
      <AnimatePresence>
        {isCartOpen && <CartDrawer onClose={() => setIsCartOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

export const CartDrawer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none font-sans">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col"
        >
          {/* Drawer Header */}
          <div className="p-5 border-b border-zinc-100 flex items-center justify-between bg-[#f5f2ee]/80">
            <div className="flex items-center gap-2">
              <FiShoppingBag className="text-black" size={20} />
              <h2 className="text-base font-montserrat font-800 text-zinc-900 tracking-wide">Your Shopping Bag</h2>
              <span className="text-xs font-bold text-zinc-600 bg-zinc-200 px-2.5 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-zinc-400 hover:text-black hover:bg-zinc-200/60 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-zinc-100">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-20 h-20 rounded-full bg-[#f5f2ee] flex items-center justify-center text-zinc-400">
                  <FiShoppingBag size={36} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900 uppercase tracking-wide">Your bag is empty</h3>
                  <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                    Explore our premium collections and add your favorite everyday bras to the bag.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-[#1c1c1e] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-20 h-24 object-cover object-top rounded-xl border border-zinc-200 bg-[#f5f2ee] shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold text-zinc-900 line-clamp-2 leading-snug">
                          {item.productName}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-zinc-400 hover:text-[#bf5c30] transition-colors p-1 cursor-pointer"
                          title="Remove"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-zinc-500 mt-1">
                        <span>Color: <strong className="text-zinc-800">{item.colorName}</strong></span>
                        <span>•</span>
                        <span>Size: <strong className="text-zinc-800">{item.size}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-zinc-300 rounded-full bg-[#f5f2ee] overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-zinc-200 text-zinc-800 transition-colors cursor-pointer"
                        >
                          <FiMinus size={12} />
                        </button>
                        <span className="px-3 text-xs font-bold text-zinc-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-zinc-200 text-zinc-800 transition-colors cursor-pointer"
                        >
                          <FiPlus size={12} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="text-sm font-extrabold text-zinc-900">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}.00
                        </div>
                        <div className="text-[10px] text-zinc-400 line-through">
                          ₹{(item.originalPrice * item.quantity).toLocaleString("en-IN")}.00
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer / Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-zinc-100 bg-[#f5f2ee]/60 space-y-4">
              <div className="space-y-2 text-xs text-zinc-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-zinc-900">₹{totalPrice.toLocaleString("en-IN")}.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-bold text-[#798A7A]">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-zinc-900 pt-2 border-t border-zinc-200">
                  <span>Total</span>
                  <span className="text-base text-[#bf5c30]">₹{totalPrice.toLocaleString("en-IN")}.00</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => alert("Proceeding to secure checkout...")}
                  className="w-full py-3.5 bg-[#1c1c1e] text-white font-bold text-xs uppercase tracking-[0.18em] rounded-full hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <FiArrowRight size={16} />
                </button>
                <button
                  onClick={clearCart}
                  className="w-full text-center text-xs text-zinc-400 hover:text-[#bf5c30] font-medium transition-colors py-1 cursor-pointer"
                >
                  Clear Shopping Bag
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500">
                <FiShield size={14} className="text-[#798A7A]" />
                <span>100% Encrypted & Secure Checkout</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
