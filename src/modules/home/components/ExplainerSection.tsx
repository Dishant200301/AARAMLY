import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { IMG } from "../lib/aaramly-images";

const HOTSPOTS = [
  { top: "22%", left: "42%", title: "Ultra Soft", desc: "Skin-friendly microfibre feel." },
  { top: "45%", left: "58%", title: "Wireless Comfort", desc: "No wires, all-day ease." },
  { top: "62%", left: "38%", title: "Breathable Fabric", desc: "Airy weave keeps you cool." },
  { top: "78%", left: "55%", title: "Stretch Fit", desc: "Moves with your body." },
];

export default function ExplainerSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hotspot", {
        scale: 0, opacity: 0, duration: 0.8, stagger: 0.15, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ref.current, start: "top 70%" }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  // Close active tooltip when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (active !== null && !(e.target as HTMLElement).closest('.hotspot')) {
        setActive(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [active]);

  return (
    <section id="explainer" ref={ref} className="mx-auto max-w-[1400px] px-5 md:px-8 py-20 md:py-28">
      <div className="mb-10 text-center">
        <p className="text-xs tracking-[0.4em] font-500 uppercase text-aaramly-ink-2">Prime</p>
        <h2 className="mt-3 text-3xl md:text-5xl font-800 tracking-tight"><span className="font-500">PRIME</span> SELECTIONS</h2>
      </div>
      <div className="relative mx-auto max-w-[860px] h-[480px] sm:h-[580px] md:h-[640px] overflow-hidden rounded-3xl border border-aaramly-line bg-[#f5f2ee]">
        <img src={IMG.bralette[0]} alt="AARAMLY bralette" className="w-full h-full object-cover object-top" loading="lazy" />
        {HOTSPOTS.map((h, i) => (
          <div key={i} className={`hotspot group absolute -translate-x-1/2 -translate-y-1/2 z-20 hover:z-40 ${active === i ? "z-50" : ""}`} style={{ top: h.top, left: h.left }}>
            <button
              aria-label={h.title}
              onClick={(e) => {
                e.stopPropagation();
                setActive(active === i ? null : i);
              }}
              className="relative grid h-8 w-8 place-items-center rounded-full bg-white/90 shadow-lg ring-2 ring-black/10 transition-transform duration-300 hover:scale-110 active:scale-95"
            >
              <span className={`absolute inset-0 animate-ping rounded-full bg-white/60 ${active === i ? "hidden" : ""}`} />
              <span className="relative text-black text-lg leading-none font-medium">{active === i ? "×" : "+"}</span>
            </button>
            <div
              className={`absolute left-1/2 top-10 w-[180px] sm:w-56 -translate-x-1/2 rounded-xl border border-aaramly-line bg-white p-3 shadow-xl transition-all duration-300 ${
                active === i
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto"
              }`}
            >
              <p className="text-xs font-700 tracking-wide uppercase text-zinc-950 whitespace-nowrap">{h.title}</p>
              <p className="mt-1 text-xs text-aaramly-ink-2 leading-normal">{h.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
