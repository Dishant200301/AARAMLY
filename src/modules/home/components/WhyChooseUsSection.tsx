import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FiTruck, FiUsers, FiRotateCcw, FiShield, FiAward } from "react-icons/fi";

const WHY = [
  { icon: FiTruck, title: "Free Shipping", desc: "Free shipping on orders over INR 1500" },
  { icon: FiUsers, title: "Support", desc: "Working hours: 9 am to 6pm, Mon to Fri." },
  { icon: FiRotateCcw, title: "Return Policy", desc: "For detailed returned policy please read our document" },
  { icon: FiShield, title: "100% Payment Secure", desc: "We ensure secure payment gateway for all our customers" },
  { icon: FiAward, title: "High Quality", desc: "Designed to stand out, built to last—quality that speaks for itself." },
];

export default function WhyChooseUsSection() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".why-card", {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-[#faf7f2] py-20 md:py-28 border-t border-aaramly-line">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        {/* MOBILE & TABLET VIEW (infinite marquee scroll) */}
        <div className="lg:hidden overflow-hidden w-full relative">
          <div className="flex w-max aaramly-marquee gap-6 pb-2">
            {[...WHY, ...WHY].map((w, i) => (
              <div key={i} className="why-card flex flex-col items-center text-center select-none flex-shrink-0 w-[55vw] md:w-[30vw]">
                {/* Thin outline circle wrapper matching reference image */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-zinc-900 text-zinc-950 mb-3 bg-transparent">
                  <w.icon size={26} strokeWidth={1.2} />
                </div>
                {/* Elegant serif title */}
                <h3 className="text-base font-normal tracking-wide text-zinc-950 font-serif mb-1">{w.title}</h3>
                {/* Small description text */}
                <p className="text-xs font-normal text-zinc-500 max-w-[200px] leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP/LAPTOP GRID VIEW */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-y-12 gap-x-6">
          {WHY.map((w, i) => (
            <div key={i} className="why-card flex flex-col items-center text-center select-none">
              {/* Thin outline circle wrapper matching reference image */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-zinc-900 text-zinc-950 mb-3 bg-transparent">
                <w.icon size={26} strokeWidth={1.2} />
              </div>
              {/* Elegant serif title */}
              <h3 className="text-base md:text-lg font-normal tracking-wide text-zinc-950 font-serif mb-1">{w.title}</h3>
              {/* Small description text */}
              <p className="text-xs md:text-sm font-normal text-zinc-500 max-w-[200px] leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
