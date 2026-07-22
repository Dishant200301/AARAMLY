export default function PromoBannerSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-0 flex items-center justify-center overflow-visible select-none w-full">
      {/* Full-bleed container (no max-width, w-full) */}
      <div className="w-full relative overflow-visible aspect-2/1 sm:aspect-2.2/1 md:aspect-2.5/1">

        {/* Balcony background scene spanning 100% full width, no rounded corners */}
        <div className="absolute inset-x-0 bottom-0 top-[12%] sm:top-[15%] overflow-hidden bg-[#f2f2f2]">
          <img
            src="/images/home/Gemini_Generated_Image_4k8pfc4k8pfc4k8p.webp"
            alt=""
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>

        {/* Big Signature Series heading positioned at the top on the section background */}
        <div className="absolute top-[-8%] left-0 right-0 z-10 text-center px-4">
          <h3 className="text-[7.5vw] sm:text-[6.5vw] md:text-5xl lg:text-[110px] font-medium tracking-[0.16em] text-zinc-400/80 uppercase leading-none font-sans whitespace-nowrap">
            SIGNATURE SERIES
          </h3>
        </div>

        {/* Model cutout overlapping and extending above the background image */}
        <img
          src="/images/home/signature_model_transparent.png"
          alt="Signature Series Model"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[118%] sm:h-[126%] md:h-[134%] lg:h-[112%] w-auto object-contain z-20 pointer-events-none"
          loading="lazy"
        />
      </div>
    </section>
  );
}
