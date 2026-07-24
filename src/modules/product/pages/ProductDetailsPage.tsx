import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/modules/core/components/Navbar";
import Footer from "@/modules/core/components/Footer";
import { ProductBreadcrumb } from "../components/ProductBreadcrumb";
import { VerticalGallery } from "../components/VerticalGallery";
import { ProductInfo } from "../components/ProductInfo";
import { SizeChartModal } from "../components/SizeChartModal";
import { FloatingStickyCart } from "../components/FloatingStickyCart";
import { MobileStickyBottomBar } from "../components/MobileStickyBottomBar";
import { BenefitsSection } from "../components/BenefitsSection";
import { ProductDescriptionSection } from "../components/ProductDescriptionSection";
import { WashingInstructionsSection } from "../components/WashingInstructionsSection";
import { ManufacturingDetailsSection } from "../components/ManufacturingDetailsSection";
import { CustomerReviewsSection } from "../components/CustomerReviewsSection";
import { RelatedProductsSection } from "../components/RelatedProductsSection";
import { SAMPLE_PRODUCT } from "../data/productData";
import { ProductColorVariation } from "../types/product";

export const ProductDetailsPage: React.FC = () => {
  const product = SAMPLE_PRODUCT;
  const [activeVariation, setActiveVariation] = useState<ProductColorVariation>(
    product.variations[0]
  );
  const [hoverVariation, setHoverVariation] = useState<ProductColorVariation | null>(
    null
  );
  const [selectedSize, setSelectedSize] = useState<string>("36D");
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    lenis.on("scroll", ScrollTrigger.update);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  // Display images from hovered variation if active, otherwise active variation
  const displayedVariation = hoverVariation || activeVariation;

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-black selection:text-white pb-16 md:pb-0 overflow-x-hidden">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Container with top padding for navbar */}
      <div className="pt-20 md:pt-24">
        {/* Breadcrumb */}
        <ProductBreadcrumb productName={product.name} />

        {/* TOP PRODUCT HERO SECTION (2 Columns on Desktop) */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-4 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Image Gallery (7 cols on lg - 45% to 50%) */}
            <div className="lg:col-span-7 w-full">
              <VerticalGallery
                images={displayedVariation.images}
                sku={displayedVariation.sku}
              />
            </div>

            {/* Right Column: Product Information (5 cols on lg) */}
            <div className="lg:col-span-5 w-full">
              <ProductInfo
                product={product}
                activeVariation={activeVariation}
                onSelectVariation={setActiveVariation}
                onHoverVariation={setHoverVariation}
                selectedSize={selectedSize}
                onSelectSize={setSelectedSize}
                onOpenSizeChart={() => setIsSizeChartOpen(true)}
              />
            </div>
          </div>
        </div>

        {/* BENEFITS SECTION */}
        <BenefitsSection />

        {/* PRODUCT DESCRIPTION & FEATURE CARDS */}
        <ProductDescriptionSection
          cards={product.descriptionCards}
          idealForPills={product.idealForPills}
        />

        {/* WASHING INSTRUCTIONS */}
        <WashingInstructionsSection instructions={product.washingInstructions} />

        {/* MANUFACTURING DETAILS */}
        <ManufacturingDetailsSection info={product.manufacturingInfo} />

        {/* CUSTOMER REVIEWS & RATINGS */}
        <div id="customer-reviews">
          <CustomerReviewsSection />
        </div>

        {/* RELATED PRODUCTS ("LOVED TOGETHER") */}
        <RelatedProductsSection />
      </div>

      {/* FLOATING STICKY CART (Desktop & Tablet right pill + drawer) */}
      <FloatingStickyCart />

      {/* MOBILE STICKY BOTTOM ACTION BAR */}
      <MobileStickyBottomBar
        productId={product.id}
        productName={product.name}
        brand={product.brand}
        activeVariation={activeVariation}
        selectedSize={selectedSize}
      />

      {/* SIZE CHART MODAL */}
      <SizeChartModal
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
        sizeChart={product.sizeChart}
        selectedSize={selectedSize}
        onSelectSize={setSelectedSize}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
