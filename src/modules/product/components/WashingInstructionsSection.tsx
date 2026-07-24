import React from "react";
import { motion } from "framer-motion";
import { WashingInstruction } from "../types/product";

// Custom SVG Line Icons for laundry care
const LaundryIcons: Record<string, React.FC<{ className?: string }>> = {
  "hand-wash": ({ className = "w-7 h-7" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v6a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-6z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 14c1.5 1 3 1 4.5 0s3-1 4.5 0" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 4a2 2 0 0 0-2 2v2M12 4a2 2 0 0 0-2 2v2" />
    </svg>
  ),
  "no-bleach": ({ className = "w-7 h-7" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 17H3L12 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l16 16" />
    </svg>
  ),
  "no-wring": ({ className = "w-7 h-7" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12c.5-3 2.5-5 6-5s5.5 2 6 5M6 12c.5 3 2.5 5 6 5s5.5-2 6-5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l16 16" />
    </svg>
  ),
  "dry-shade": ({ className = "w-7 h-7" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l10-5M3 14l15-7.5M3 20L21 9.5" />
    </svg>
  ),
  "no-iron": ({ className = "w-7 h-7" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16h16l-2-6H9L4 16zM4 16v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l16 16" />
    </svg>
  ),
  "no-dryclean": ({ className = "w-7 h-7" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l16 16" />
    </svg>
  ),
  "wash-similar": ({ className = "w-7 h-7" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 13c1.5 1 3 1 4.5 0s3-1 4.5 0" />
      <text x="12" y="6" textAnchor="middle" fontSize="6" fontWeight="bold" fill="currentColor">30°</text>
    </svg>
  ),
};

interface WashingInstructionsSectionProps {
  instructions: WashingInstruction[];
}

export const WashingInstructionsSection: React.FC<WashingInstructionsSectionProps> = ({
  instructions,
}) => {
  return (
    <section className="w-full py-8 px-4 md:px-8 max-w-[1400px] mx-auto space-y-6 font-sans">
      {/* Section Title matching Home Page */}
      <div className="space-y-2">
        <h2 className="text-2xl md:text-4xl font-800 text-zinc-900 tracking-tight">
          Washing Instructions
        </h2>
        <div className="w-16 h-1 bg-[#bf5c30] rounded-full" />
      </div>

      {/* Mobile & Tablet View (< 1024px): Smooth Right-to-Left Infinite Auto-Scroll Marquee */}
      <div className="block lg:hidden w-full overflow-hidden relative">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 18,
            repeat: Infinity,
          }}
          className="flex items-center gap-3.5 w-max py-1"
        >
          {[...instructions, ...instructions].map((item, idx) => {
            const IconComponent = LaundryIcons[item.iconName] || LaundryIcons["hand-wash"];
            return (
              <div
                key={`${item.id}-${idx}`}
                className="w-[45vw] sm:w-[30vw] max-w-[180px] shrink-0 flex flex-col items-center justify-center space-y-2 p-3.5 rounded-2xl bg-white border border-zinc-200/60 shadow-2xs text-center"
              >
                <div className="text-zinc-900 p-2.5 rounded-full bg-[#f5f2ee]">
                  <IconComponent className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-zinc-800 tracking-wider leading-tight">
                  {item.label}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Laptop & Desktop Grid View (>= 1024px) */}
      <div className="hidden lg:block rounded-[20px] border border-zinc-200/80 bg-[#f5f2ee]/50 p-6 md:p-8 shadow-xs">
        <div className="grid grid-cols-7 gap-6 text-center">
          {instructions.map((item, idx) => {
            const IconComponent = LaundryIcons[item.iconName] || LaundryIcons["hand-wash"];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center justify-center space-y-2.5 p-3 rounded-2xl bg-white border border-zinc-200/50 hover:border-zinc-900 shadow-2xs transition-all cursor-pointer"
              >
                <div className="text-zinc-900 p-2.5 rounded-full bg-[#f5f2ee]">
                  <IconComponent className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold text-zinc-800 tracking-wider leading-tight">
                  {item.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
