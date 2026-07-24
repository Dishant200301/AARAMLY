import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Feather, Cloud, Heart, Leaf, Layers } from "lucide-react";

interface SlideFeature {
  icon: "feather" | "cloud" | "heart" | "leaf";
  text: string;
}

interface BulletPoint {
  icon: "leaf" | "layers" | "cloud";
  text: string;
}

interface Slide {
  img: string;
  mobileImg?: string;
  eyebrow: string;
  mobileEyebrow?: string;
  title: string;
  mobileTitle?: string;
  titleHighlight?: string;
  titleFontClass?: string;
  titleHighlightClass?: string;
  descColorClass?: string;
  showDividerUnderTitle?: boolean;
  subtitle: string;
  mobileSubtitle?: string;
  align: "left" | "center" | "right";
  textColor: string;
  objectPosition: string;
  bgColor?: string;
  showUnderline?: boolean;
  btnText?: string;
  btnClass?: string;
  showArrow?: boolean;
  showLeafDivider?: boolean;
  features?: SlideFeature[];
  bulletPoints?: BulletPoint[];
}

const HERO_SLIDES: Slide[] = [
  {
    img: "/images/home/hero/Gemini_Generated_Image_7wkeg47wkeg47wke.webp",
    mobileImg: "/images/home/hero/hero-moble-1.png",
    eyebrow: "AARAMLY CLASSIC",
    mobileEyebrow: "EVERYDAY ESSENTIALS",
    title: "DESIGNED TO\nDISAPPEAR",
    mobileTitle: "Comfort\nFor You",
    subtitle: "Experience zero-feel comfort. A lightweight, wireless fit that goes unnoticed under any outfit.",
    mobileSubtitle: "Experience seamless support with an ultra-soft fit.",
    align: "left",
    textColor: "text-[#2d221b]",
    objectPosition: "object-[80%_top] lg:object-top",
    features: [
      { icon: "leaf", text: "ULTRA SOFT" },
      { icon: "cloud", text: "WIRELESS" },
      { icon: "feather", text: "LIGHTWEIGHT" }
    ]
  },
  {
    img: "/images/home/hero/Gemini_Generated_Image_nz0j0jnz0j0jnz0j.webp",
    mobileImg: "/images/home/hero/hero-moble-2.png",
    eyebrow: "NEWLY LAUNCHED",
    mobileEyebrow: "SIGNATURE COLLECTION",
    title: "SUPPORT WITHOUT\nTHE POKE",
    mobileTitle: "Comfort\nFor You",
    subtitle: "PERFECT COVERAGE BRA  |  SOFT COVERAGE T-SHIRT BRA",
    mobileSubtitle: "Experience seamless support with an ultra-soft fit.",
    align: "center",
    textColor: "text-[#3b2a1c]",
    objectPosition: "object-[0%_top] lg:object-top",
    features: [
      { icon: "feather", text: "Wire-free feel" },
      { icon: "cloud", text: "Soft coverage" },
      { icon: "heart", text: "Everyday comfort" }
    ]
  },
  {
    img: "/images/home/hero/Gemini_Generated_Image_sp6vp3sp6vp3sp6v.webp",
    mobileImg: "/images/home/hero/hero-moble-3.png",
    eyebrow: "AARAMLY COMFORT",
    mobileEyebrow: "PREMIUM COLLECTION",
    title: "COMFORT IS NON\nNEGOTIABLE.",
    mobileTitle: "Comfort\nFor You",
    subtitle: "Invisible support and perfect coverage for backless, strapless, or everyday looks.",
    mobileSubtitle: "Experience seamless support with an ultra-soft fit.",
    align: "right",
    textColor: "text-[#302117]",
    objectPosition: "object-[30%_top] lg:object-top",
    features: [
      { icon: "leaf", text: "Wire-free" },
      { icon: "cloud", text: "Seamless fit" },
      { icon: "feather", text: "All-day comfort" }
    ],
    bulletPoints: [
      { icon: "leaf", text: "Wire-free" },
      { icon: "layers", text: "Seamless fit" },
      { icon: "cloud", text: "All-day comfort" }
    ]
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
    <section id="home" className="relative h-svh mt-0 w-full overflow-hidden bg-white">
      {/* MOBILE ONLY LAYOUT (lg:hidden) */}
      <div className="lg:hidden relative w-full h-full flex flex-col justify-between px-8 pt-28 pb-8 overflow-hidden z-10">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              opacity: { duration: 0.8, ease: "easeInOut" },
            }}
            className="absolute inset-0 h-full w-full flex flex-col justify-between px-2 pt-28 pb-8"
          >
            {/* Background Warm Beige Gradient & Soft Glowing Effects */}
            <div className={`absolute inset-0 transition-all duration-1000 bg-gradient-to-b ${current === 0
                ? "from-[#FCFAF7] via-[#F3EFE9] to-[#E4DDD3]"
                : current === 1
                  ? "from-[#FCFAF7] via-[#F4E2D3] to-[#EAD5C3]"
                  : "from-[#FBFBFA] via-[#EFEFEA] to-[#E2E2DC]"
              }`} />

            {/* Glowing Accent */}
            <div className="absolute top-[20%] right-[-15%] w-[340px] h-[340px] rounded-full bg-white/35 blur-[95px]" />
            <div className="absolute bottom-[15%] left-[-15%] w-[270px] h-[270px] rounded-full bg-white/20 blur-[75px]" />


            {/* Model Image on Right - dominant size & right-aligned */}
            {s.mobileImg && (
              <div className="absolute bottom-0 right-[-10%] md:right-[4%] w-[80vw] md:w-[80vw] h-[88vh] md:h-[82vh] z-10 select-none pointer-events-none flex items-end justify-end overflow-visible translate-x-[7%] md:translate-x-[2%]">
                <motion.img
                  key={`img-${current}`}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  src={s.mobileImg}
                  alt={s.title.replace("\n", " ")}
                  className="w-[115%] h-[118%] object-contain object-bottom object-right scale-[1.08] md:scale-[1.18] translate-y-[2%] origin-bottom"
                />
              </div>
            )}

            {/* Content Container (Left Side) with spacious padding */}
            <div className="relative z-20 flex flex-col justify-center h-full max-w-[50%] select-none pl-4">
              <motion.div
                key={`content-mob-${current}`}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-start text-left"
              >
                {/* Eyebrow Label & Divider */}
                <motion.div variants={itemVariants} className="mb-7">
                  <span className="text-[10px] min-[375px]:text-[11px] font-montserrat font-600 tracking-[0.25em] text-[#798A7A] uppercase whitespace-nowrap">
                    {s.mobileEyebrow || "SIGNATURE COLLECTION"}
                  </span>
                  <div className="h-[1px] bg-[#798A7A]/40 w-10 mt-2" />
                </motion.div>

                {/* Main Heading (Serif Font) */}
                <motion.h1
                  variants={itemVariants}
                  className="text-[30px] min-[375px]:text-[34px] min-[410px]:text-[38px] leading-[1.15] font-garamond font-600 text-[#352923] tracking-wide uppercase whitespace-pre-line mb-7"
                >
                  {s.mobileTitle || "Comfort\nFor You"}
                </motion.h1>

                {/* Description */}
                <motion.p
                  variants={itemVariants}
                  className="text-[11.5px] min-[400px]:text-[12.5px] font-montserrat font-400 leading-relaxed text-[#5C4D44] max-w-[170px] min-[375px]:max-w-[205px] whitespace-pre-line mb-8"
                >
                  {s.mobileSubtitle || s.subtitle}
                </motion.p>

                {/* CTA Button */}
                <motion.div variants={itemVariants}>
                  <a
                    href="#featured"
                    className="inline-flex items-center justify-center h-12 px-8.5 text-[10px] min-[375px]:text-[11px] font-montserrat font-600 tracking-[0.22em] uppercase text-white bg-[#798A7A] hover:bg-[#687769] active:scale-95 transition-all duration-300 rounded-full shadow-[0_4px_16px_rgba(121,138,122,0.35)] cursor-pointer"
                  >
                    {s.btnText || "SHOP NOW"}
                  </a>
                </motion.div>
              </motion.div>
            </div>

            {/* Bottom Section: Slider Navigation & Floating Feature Card */}
            <div className="relative z-30 flex flex-col w-full items-center gap-6 mt-auto">
              {/* Slider Navigation Dots */}
              <div className="flex items-center justify-center gap-3 py-1">
                {HERO_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > current ? 1 : -1);
                      setCurrent(i);
                    }}
                    className={`rounded-full transition-all duration-300 ${i === current
                        ? "w-2.5 h-2.5 bg-[#798A7A] scale-110"
                        : "w-2 h-2 bg-[#798A7A]/30"
                      }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* Floating Feature Card (Glassmorphic) */}
              {s.features && (
                <div className="w-full md:max-w-md md:mx-auto bg-white/55 backdrop-blur-md border border-white/50 rounded-2xl py-4.5 px-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.03)] flex justify-between items-center">
                  {s.features.map((f, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center text-center gap-1.5 relative px-1">
                      <div className="text-[#798A7A]">
                        {f.icon === "leaf" && <Leaf className="w-5 h-5 stroke-[1.25]" />}
                        {f.icon === "feather" && <Feather className="w-5 h-5 stroke-[1.25]" />}
                        {f.icon === "cloud" && <Cloud className="w-5 h-5 stroke-[1.25]" />}
                        {f.icon === "heart" && <Heart className="w-5 h-5 stroke-[1.25]" />}
                      </div>
                      <span className="text-[9px] min-[375px]:text-[10px] min-[410px]:text-[10.5px] font-montserrat font-500 text-[#352923] tracking-wide leading-tight">
                        {f.text}
                      </span>
                      {idx < s.features.length - 1 && (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-7 w-[1px] bg-[#352923]/12" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* DESKTOP ONLY LAYOUT (hidden lg:block) */}
      <div className="hidden lg:block relative w-full h-full">
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
              <picture className="absolute inset-0 h-full w-full">
                {s.mobileImg && (
                  <source media="(max-width: 767px)" srcSet={s.mobileImg} />
                )}
                <img
                  src={s.img}
                  alt={s.title.replace("\n", " ")}
                  className={`absolute inset-0 h-full w-full object-cover scale-[1.12] lg:scale-100 origin-[60%_top] lg:origin-center ${s.objectPosition || "object-top"}`}
                />
              </picture>

              <div className="relative z-10 flex h-full items-end pb-16 md:items-end md:pb-10 lg:items-center lg:pb-0">
                {/* Padding matches Navbar px-5 md:px-8 exactly to align along the header grid */}
                <div className="mx-auto max-w-[1400px] w-full px-5 md:px-8">
                  <div className={`flex w-full ${s.align === "left" ? "justify-start text-left lg:justify-start lg:text-left" :
                      s.align === "right" ? "justify-end text-left md:justify-start md:text-left lg:justify-end lg:text-left" :
                        "justify-center text-center md:justify-start md:text-left lg:justify-center lg:text-center"
                    }`}>
                    <motion.div
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      key={`content-${current}`}
                      className={`max-w-xl ${s.align === "left" ? "text-left" :
                          s.align === "right" ? "text-left" :
                            "text-center md:text-left lg:text-center"
                        }`}
                    >
                      <motion.div variants={itemVariants} className="hidden lg:block">
                        {s.eyebrow && (
                          <>
                            <p className="text-xs md:text-sm font-montserrat font-500 tracking-[0.35em] uppercase text-black">
                              {s.eyebrow}
                            </p>
                            {s.showUnderline && (
                              <div className="h-[2px] bg-[#798A7A] w-12 mt-2" />
                            )}
                          </>
                        )}
                      </motion.div>

                      <motion.h1
                        variants={itemVariants}
                        className={`mt-4 text-2xl min-[360px]:text-3xl md:text-5xl lg:text-6.5xl leading-[1.08] tracking-tight uppercase whitespace-pre-line ${s.titleFontClass || "font-sans font-800"} ${s.textColor}`}
                      >
                        {s.title}
                        {s.titleHighlight && (
                          <span className={`block mt-1 ${s.titleHighlightClass || "text-[#798A7A]"}`}>
                            {s.titleHighlight}
                          </span>
                        )}
                      </motion.h1>

                      {s.showDividerUnderTitle && (
                        <div className="hidden lg:block h-[2.5px] bg-[#798A7A] w-14 mt-4 mb-2" />
                      )}

                      {s.showLeafDivider && (
                        <div className={`hidden lg:flex items-center gap-4 my-5 ${s.align === "left" ? "justify-start" :
                            s.align === "right" ? "justify-start" :
                              "justify-center md:justify-start lg:justify-center"
                          }`}>
                          <div className="h-[1px] bg-neutral-300 w-16" />
                          <Leaf className="w-4 h-4 text-[#798A7A]" />
                          <div className="h-[1px] bg-neutral-300 w-16" />
                        </div>
                      )}

                      <motion.p
                        variants={itemVariants}
                        className={`mt-4 text-sm md:text-base font-500 max-w-[400px] ${s.descColorClass || "text-black"} ${s.align === "left" ? "ml-0 mr-auto" :
                            s.align === "right" ? "ml-0 mr-auto" :
                              "mx-auto md:ml-0 md:mr-auto lg:mx-auto"
                          }`}
                      >
                        {s.subtitle}
                      </motion.p>


                      <motion.div
                        variants={itemVariants}
                        className={`mt-8 flex gap-4 ${s.align === "left" ? "justify-start" :
                            s.align === "right" ? "justify-start" :
                              "justify-center md:justify-start lg:justify-center"
                          }`}
                      >
                        <a
                          href="#featured"
                          className={s.btnClass || "inline-flex items-center gap-2 px-8 py-3.5 text-[10px] md:text-xs font-600 tracking-[0.2em] uppercase transition-all duration-300 shadow-sm bg-black text-white hover:bg-zinc-800 border border-black cursor-pointer"}
                        >
                          {s.btnText || "EXPLORE NOW"}
                          {s.showArrow && <span className="ml-1.5">→</span>}
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
          className="hidden lg:grid absolute left-8 top-1/2 -translate-y-1/2 z-20 h-12 w-12 place-items-center text-black/35 hover:text-black hover:scale-110 transition-all duration-300 cursor-pointer"
          aria-label="Previous Slide"
        >
          <FiChevronLeft className="w-12 h-12" strokeWidth={1} />
        </button>
        <button
          onClick={next}
          className="hidden lg:grid absolute right-8 top-1/2 -translate-y-1/2 z-20 h-12 w-12 place-items-center text-black/35 hover:text-black hover:scale-110 transition-all duration-300 cursor-pointer"
          aria-label="Next Slide"
        >
          <FiChevronRight className="w-12 h-12" strokeWidth={1} />
        </button>

        {/* Center Pagination with Animated Circular Progress */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-10 md:left-auto md:right-8 md:translate-x-0 lg:left-1/2 lg:-translate-x-1/2 lg:right-auto flex items-center gap-6 z-20">
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
      </div>
    </section>
  );
}
