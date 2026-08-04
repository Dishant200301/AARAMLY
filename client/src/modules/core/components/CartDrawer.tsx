import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useCart } from "@/modules/product/context/CartContext";

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  return (
    <div
      className={`fixed inset-0 z-[100] transition-all duration-300 ${
        isCartOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-over Drawer Panel */}
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-[400px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-5">
          <h2 className="font-display text-2xl text-zinc-900 font-normal">Shopping cart</h2>
          <button
            aria-label="Close cart"
            onClick={() => setIsCartOpen(false)}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-900 hover:opacity-75 transition-opacity cursor-pointer"
          >
            <span>CLOSE</span>
            <X className="h-5 w-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Cart Body Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {cartItems.length === 0 ? (
            <div className="flex h-full items-center justify-center py-20">
              <p className="text-base text-zinc-600 font-medium">No products in the cart.</p>
            </div>
          ) : (
            <ul className="divide-y divide-zinc-100">
              {cartItems.map((it) => (
                <li key={it.id} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                  <img
                    src={it.image}
                    alt={it.productName}
                    className="h-24 w-24 flex-none object-cover rounded-none bg-zinc-50 border border-zinc-100"
                  />
                  <div className="flex flex-1 items-start justify-between">
                    <div>
                      <h3 className="font-display text-base text-zinc-900 font-normal leading-snug">
                        {it.productName}
                      </h3>
                      <p className="text-xs text-zinc-500 mt-1 font-medium">
                        {it.colorName && <span>Color: {it.colorName} • </span>}
                        {it.size && <span>Size: {it.size}</span>}
                      </p>
                      <p className="text-sm text-zinc-800 font-bold mt-1.5">
                        {it.quantity} &times; ₹{it.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(it.id)}
                      aria-label="Remove item"
                      className="text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer p-0.5 -mr-1 -mt-0.5"
                    >
                      <X className="h-4 w-4 stroke-[1.5]" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Drawer Footer Actions */}
        {cartItems.length > 0 && (
          <div className="border-t border-zinc-100 px-6 py-6 space-y-4 bg-white">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="font-display text-xl text-zinc-900 font-normal">Subtotal:</span>
              <span className="text-xl text-zinc-900 font-bold">
                ₹{totalPrice.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-1">
              <Link to="/cart" onClick={() => setIsCartOpen(false)} className="block w-full">
                <button
                  type="button"
                  className="w-full py-3.5 bg-white border border-zinc-300 text-zinc-900 font-bold text-xs uppercase tracking-[0.14em] hover:bg-zinc-100 transition-colors cursor-pointer text-center block"
                >
                  VIEW CART
                </button>
              </Link>
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  alert("Proceeding to secure checkout...");
                }}
                className="w-full py-3.5 bg-zinc-900 text-white font-bold text-xs uppercase tracking-[0.14em] hover:bg-black transition-colors cursor-pointer text-center block"
              >
                CHECKOUT
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;
