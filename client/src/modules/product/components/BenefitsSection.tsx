import React from "react";
import { motion } from "framer-motion";
import {
  FiRefreshCw,
  FiDollarSign,
  FiTruck,
  FiAward,
  FiZap,
  FiShield,
} from "react-icons/fi";

const BENEFITS = [
  {
    id: "b1",
    title: "10 Days",
    subtitle: "Easy Exchange",
    icon: FiRefreshCw,
  },
  {
    id: "b2",
    title: "Cash on",
    subtitle: "Delivery",
    icon: FiDollarSign,
  },
  {
    id: "b3",
    title: "Free",
    subtitle: "Shipping",
    icon: FiTruck,
  },
  {
    id: "b4",
    title: "Premium",
    subtitle: "Quality",
    icon: FiAward,
  },
  {
    id: "b5",
    title: "Fast",
    subtitle: "Delivery",
    icon: FiZap,
  },
  {
    id: "b6",
    title: "100%",
    subtitle: "Secure Payment",
    icon: FiShield,
  },
];

export const BenefitsSection: React.FC = () => {
  return (
    <section className="w-full py-4 md:py-4 my-2 md:my-2 font-sans overflow-hidden bg-transparent border-none">
      {/* Mobile & Tablet View (< 1024px): Smooth Right-to-Left Infinite Auto-Scroll Marquee */}
      <div className="block lg:hidden w-full overflow-hidden relative border-none">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 16,
            repeat: Infinity,
          }}
          className="flex items-center gap-4 md:gap-8 w-max"
        >
          {[...BENEFITS, ...BENEFITS].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`${item.id}-${idx}`}
                className="w-[30vw] sm:w-[35vw] max-w-[150px] shrink-0 flex flex-col items-center text-center p-2 bg-transparent border-none shadow-none"
              >
                <div className="w-20 h-20 sm:w-18 sm:h-18 rounded-full flex items-center justify-center text-[#798A7A] mb-2 border-none">
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.5]" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-zinc-900 tracking-wider leading-tight">
                  {item.title}
                </h4>
                <p className="text-[11px] sm:text-xs font-semibold text-zinc-600 leading-tight">
                  {item.subtitle}
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Laptop & Desktop Grid View (>= 1024px): 6 cols Grid without borders */}
      <div className="hidden lg:block max-w-[1300px] mx-auto px-4 md:px-8 border-none">
        <div className="grid grid-cols-6 gap-6 md:gap-8 border-none">
          {BENEFITS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                whileHover={{ y: -4, scale: 1.04 }}
                className="flex flex-col items-center text-center group cursor-pointer bg-transparent border-none shadow-none"
              >
                {/* Circular Icon Container (Clean Transparent, Borderless) */}
                <div className="w-18 h-18 md:w-20 md:h-20 rounded-full flex items-center justify-center text-[#798A7A] transition-transform duration-300 mb-2 border-none">
                  <Icon className="w-8 h-8 md:w-9 md:h-9 stroke-[1.5] group-hover:scale-110 transition-transform duration-300" />
                </div>

                {/* Labels */}
                <h4 className="text-xs md:text-sm font-bold text-zinc-900 tracking-wider leading-tight">
                  {item.title}
                </h4>
                <p className="text-xs md:text-sm font-semibold text-zinc-600 leading-tight">
                  {item.subtitle}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
