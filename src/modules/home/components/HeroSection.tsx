import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const HERO_SLIDES = [
  {
    img: "/images/home/hero/Gemini_Generated_Image_7wkeg47wkeg47wke.webp",
    eyebrow: "BONDED BRAS",
    title: "DESIGNED TO\nDISAPPEAR",
    subtitle: "Experience zero-feel comfort. A lightweight, wireless fit that goes unnoticed under any outfit.",
    align: "left",
    textColor: "text-[#2d221b]"
  },
  {
    img: "/images/home/hero/Gemini_Generated_Image_nz0j0jnz0j0jnz0j.webp",
    eyebrow: "NEWLY LAUNCHED",
    title: "SUPPORT WITHOUT\nTHE POKE",
    subtitle: "PERFECT COVERAGE BRA  |  SOFT COVERAGE T-SHIRT BRA",
    align: "center",
    textColor: "text-[#3b2a1c]"
  },
  {
    img: "/images/home/hero/Gemini_Generated_Image_sp6vp3sp6vp3sp6v.webp",
    eyebrow: "AARAMLY COMFORT",
    title: "COMFORT IS NON NEGOTIABLE.",
    subtitle: "Invisible support and perfect coverage for backless, strapless, or everyday looks.",
    align: "right",
    textColor: "text-[#302117]"
  }
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((p) => (p + 1) % HERO_SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(timer);
  }, [next, current]);

  // Animation variants for the slides
  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
    }),
    center: {
      opacity: 1,
    },
    exit: (dir: number) => ({
      opacity: 0,
    }),
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
        duration: 0.7,
        ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number] // premium cubic-bezier for smooth entrance
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number] } }
  };

  const s = HERO_SLIDES[current];

  return (
    <section id="home" className="relative h-[100svh] mt-0 pt-[64px] lg:pt-0 lg:h-[calc(100svh-72px)] lg:mt-[72px] w-full overflow-hidden bg-white">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 1.0, ease: "easeInOut" }, // elegant slow cross-fade
          }}
          className="absolute inset-0 h-full w-full"
        >
          <div className="relative h-full w-full">
            <motion.img
              src={s.img} alt={s.title.replace("\n", " ")}
              initial={{ scale: 1.06 }} animate={{ scale: 1 }} transition={{ duration: 6, ease: "easeOut" }}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
 
            <div className="relative z-10 flex h-full items-center">
              {/* Padding matches Navbar px-5 md:px-8 exactly to align along the header grid */}
              <div className="mx-auto max-w-[1400px] w-full px-5 md:px-8">
                <div className={`flex w-full ${s.align === "left" ? "justify-start text-left" :
                  s.align === "right" ? "justify-end text-left" :
                    "justify-center text-center"
                  }`}>
                  <motion.div
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    key={`content-${current}`}
                    className="max-w-xl"
                  >
                    <motion.div variants={itemVariants}>
                      <p className="text-xs md:text-sm font-600 tracking-[0.35em] uppercase text-black/70">
                        {s.eyebrow}
                      </p>
                    </motion.div>

                    <motion.h1
                      variants={itemVariants}
                      className={`mt-4 text-3xl md:text-5xl lg:text-6.5xl font-800 leading-[1.08] tracking-tight uppercase whitespace-pre-line ${s.textColor}`}
                    >
                      {s.title}
                    </motion.h1>

                    <motion.p
                      variants={itemVariants}
                      className="mt-4 text-sm md:text-base font-500 text-[#4b4b4b]/90 max-w-[340px]"
                      style={{
                        marginLeft: s.align === "center" ? "auto" : undefined,
                        marginRight: s.align === "center" ? "auto" : undefined,
                      }}
                    >
                      {s.subtitle}
                    </motion.p>

                    <motion.div
                      variants={itemVariants}
                      className="mt-8 flex gap-4"
                      style={{
                        justifyContent: s.align === "center" ? "center" : "flex-start"
                      }}
                    >
                      <a href="#featured" className="inline-flex items-center gap-2 px-8 py-3.5 text-[10px] md:text-xs font-600 tracking-[0.2em] uppercase transition-all duration-300 shadow-sm bg-black text-white hover:bg-zinc-800 border border-black">
                        EXPLORE NOW
                      </a>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Side Chevron Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-20 grid h-12 w-12 place-items-center text-black/35 hover:text-black hover:scale-110 transition-all duration-300 cursor-pointer"
        aria-label="Previous Slide"
      >
        <FiChevronLeft className="w-9 h-9 md:w-12 md:h-12" strokeWidth={1} />
      </button>
      <button
        onClick={next}
        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-20 grid h-12 w-12 place-items-center text-black/35 hover:text-black hover:scale-110 transition-all duration-300 cursor-pointer"
        aria-label="Next Slide"
      >
        <FiChevronRight className="w-9 h-9 md:w-12 md:h-12" strokeWidth={1} />
      </button>

      {/* Center Pagination with Animated Circular Progress */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className="group relative w-6 h-6 flex items-center justify-center cursor-pointer"
            aria-label={`Go to slide ${i + 1}`}
          >
            {/* Circular Progress Path - absolute centered */}
            <svg className="absolute inset-0 m-auto w-[18px] h-[18px] -rotate-90">
              <circle
                cx="9"
                cy="9"
                r="7.5"
                stroke="black"
                strokeWidth="0.8"
                fill="transparent"
                className="opacity-15"
              />
              {i === current && (
                <motion.circle
                  cx="9"
                  cy="9"
                  r="7.5"
                  stroke="black"
                  strokeWidth="0.8"
                  fill="transparent"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 5, ease: "linear" }}
                  key={`progress-${current}`}
                />
              )}
            </svg>
            {/* Inner Dot - absolute centered */}
            <div className={`absolute inset-0 m-auto w-[6px] h-[6px] rounded-full transition-all duration-300 bg-black ${i === current ? "opacity-100 scale-100" : "opacity-35 scale-75 group-hover:opacity-60"}`} />
          </button>
        ))}
      </div>
    </section>
  );
}
