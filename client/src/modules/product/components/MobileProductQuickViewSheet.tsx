import React, { useState, useEffect, useMemo, useRef } from "react";
import { Drawer } from "vaul";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Heart,
  Share2,
  Star,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Check,
  Ruler,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useQuickView } from "../context/QuickViewContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { getLiveProductById, getLiveProductsList } from "@/modules/core/lib/apiStore";
import { ProductDetails, ProductColorVariation } from "../types/product";
import { toast } from "sonner";

export const MobileProductQuickViewSheet: React.FC = () => {
  const { isOpen, activeProductId, closeQuickView, openQuickView } = useQuickView();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  // Active Product State
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("S");
  const [quantity, setQuantity] = useState(1);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  const contentRef = useRef<HTMLDivElement>(null);

  // Sync state when active product changes
  useEffect(() => {
    if (activeProductId && isOpen) {
      const live = getLiveProductById(String(activeProductId));
      setProduct(live);

      const firstColor =
        live.colors?.[0]?.colorName ||
        live.variations?.[0]?.colorName ||
        "BLACK";
      const firstSize =
        live.colors?.[0]?.sizes?.[0] ||
        live.variations?.[0]?.size ||
        live.availableSizes?.[0] ||
        "S";

      setSelectedColor(firstColor);
      setSelectedSize(firstSize);
      setActiveImageIndex(0);
      setQuantity(1);

      const all = getLiveProductsList();
      const filtered = all.filter((p) => String(p.id) !== String(activeProductId)).slice(0, 5);
      setRelatedProducts(filtered);

      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    }
  }, [activeProductId, isOpen]);

  // Available Colors list with thumbnails & prices (matching reference image!)
  const colorVariantsList = useMemo(() => {
    if (!product) return [];

    if (product.colors && product.colors.length > 0) {
      return product.colors.map((c) => {
        const matchingVar = (product.variations || []).find(
          (v) => (v.colorName || "").toLowerCase() === c.colorName.toLowerCase()
        );
        return {
          colorName: c.colorName,
          colorHex: c.colorHex || "#000000",
          image: c.displayImage || c.mainImage || c.galleryImages?.[0] || (product as any).image || "",
          price: matchingVar?.price || (product as any).price || 499,
          originalPrice: matchingVar?.originalPrice || (product as any).originalPrice || 1500,
          stock: matchingVar?.stock || 24,
        };
      });
    }

    if (product.variations && product.variations.length > 0) {
      const uniqueColors = Array.from(
        new Set(product.variations.map((v) => v.colorName).filter(Boolean))
      );
      return uniqueColors.map((cName) => {
        const v = product.variations!.find((item) => item.colorName === cName)!;
        return {
          colorName: cName,
          colorHex: v.colorHex || "#000000",
          image: v.thumbnail || (product as any).image || "",
          price: v.price || (product as any).price || 499,
          originalPrice: v.originalPrice || (product as any).originalPrice || 1500,
          stock: v.stock || 24,
        };
      });
    }

    return [
      {
        colorName: selectedColor || "DEFAULT",
        colorHex: "#000000",
        image: (product as any)?.image || "",
        price: (product as any)?.price || 499,
        originalPrice: (product as any)?.originalPrice || 1500,
        stock: 24,
      },
    ];
  }, [product, selectedColor]);

  // Active variation details
  const activeVariation: ProductColorVariation = useMemo(() => {
    if (!product) {
      return {
        id: "v-default",
        colorName: "DEFAULT",
        colorHex: "#000000",
        size: "S",
        thumbnail: "",
        price: 499,
        originalPrice: 1500,
        discountPercentage: 67,
        sku: "AAR-SKU-100",
        stock: 24,
        images: [],
      };
    }

    const exactMatch = (product.variations || []).find(
      (v) =>
        (v.colorName || "").toLowerCase() === (selectedColor || "").toLowerCase() &&
        ((v.size || "").toLowerCase() === (selectedSize || "").toLowerCase() ||
          (v.sizeName || "").toLowerCase() === (selectedSize || "").toLowerCase())
    );

    if (exactMatch) return exactMatch;

    const colorMatch = (product.variations || []).find(
      (v) => (v.colorName || "").toLowerCase() === (selectedColor || "").toLowerCase()
    );

    if (colorMatch) return colorMatch;

    const activeColorObj = colorVariantsList.find(
      (c) => c.colorName.toLowerCase() === selectedColor.toLowerCase()
    );

    return {
      id: `v-${selectedColor}-${selectedSize}`,
      colorName: selectedColor,
      colorHex: activeColorObj?.colorHex || "#000000",
      size: selectedSize,
      thumbnail: activeColorObj?.image || (product as any).image,
      price: activeColorObj?.price || (product as any).price || 499,
      originalPrice: activeColorObj?.originalPrice || (product as any).originalPrice || 1500,
      discountPercentage: 67,
      sku: product.defaultSku || `AAR-${selectedColor.toUpperCase()}-${selectedSize}`,
      stock: activeColorObj?.stock || 24,
      images: [],
    };
  }, [product, selectedColor, selectedSize, colorVariantsList]);

  // Gallery Images List
  const galleryImages = useMemo(() => {
    const activeColorObj = (product?.colors || []).find(
      (c) => c.colorName.toLowerCase() === selectedColor.toLowerCase()
    );

    if (activeColorObj && activeColorObj.galleryImages && activeColorObj.galleryImages.length > 0) {
      return activeColorObj.galleryImages.map((gUrl, idx) => ({
        id: `img-color-${idx}`,
        url: gUrl,
        alt: `${product?.name} - ${selectedColor} View ${idx + 1}`,
      }));
    }

    if (activeVariation.images && activeVariation.images.length > 0) {
      return activeVariation.images;
    }

    if (product && Array.isArray((product as any).images) && (product as any).images.length > 0) {
      return (product as any).images.map((url: string, i: number) => ({
        id: `img-fallback-${i}`,
        url,
        alt: product.name,
      }));
    }

    return [
      {
        id: "img-default",
        url:
          activeVariation.thumbnail ||
          (product as any)?.image ||
          "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?q=80&w=800",
        alt: product?.name || "Product Image",
      },
    ];
  }, [product, selectedColor, activeVariation]);

  const currentImage = galleryImages[activeImageIndex] || galleryImages[0];

  const livePrice = activeVariation.price;
  const originalPrice = activeVariation.originalPrice || Math.round(livePrice * 2.5);
  const totalPrice = livePrice * quantity;

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      productId: String(product.id),
      productName: product.name,
      brand: product.brand || "AARAMLY",
      colorName: selectedColor,
      colorHex: activeVariation.colorHex || "#000000",
      size: selectedSize,
      price: livePrice,
      originalPrice: originalPrice,
      image: currentImage.url,
      sku: activeVariation.sku || product.defaultSku || "AAR-SKU",
      quantity: quantity,
    });
    toast.success(`Added ${quantity} x ${product.name} (${selectedColor}, ${selectedSize}) to Bag!`);
    closeQuickView();
  };

  const handleShare = () => {
    if (navigator.share && product) {
      navigator
        .share({
          title: product.name,
          text: `Check out ${product.name} on Aaramly!`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Product link copied!");
    }
  };

  // Auto-close if screen resizes to laptop/desktop view (>= 1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        closeQuickView();
      }
    };
    if (isOpen && typeof window !== "undefined" && window.innerWidth >= 1024) {
      closeQuickView();
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, closeQuickView]);

  if (!product || !isOpen || (typeof window !== "undefined" && window.innerWidth >= 1024)) return null;

  const wishlisted = isWishlisted(String(product.id));

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && closeQuickView()}>
      <Drawer.Portal>
        {/* Dark Backdrop Overlay */}
        <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity duration-300 lg:hidden" />

        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 h-[88vh] max-h-[90vh] flex flex-col outline-none font-sans overflow-hidden max-w-full lg:hidden rounded-t-[24px] bg-zinc-50 shadow-2xl">
          {/* TOP DRAG HANDLE BAR (Matching reference image!) */}
          <div className="pt-3 pb-1 flex justify-center items-center shrink-0 bg-zinc-50">
            <div className="w-10 h-1 rounded-full bg-zinc-300" />
          </div>

          {/* MAIN SCROLLABLE CONTENT BODY */}
          <div
            ref={contentRef}
            className="flex-1 overflow-y-auto overflow-x-hidden p-2 sm:p-3 pb-6 text-zinc-900 scroll-smooth space-y-4 max-w-full box-border"
          >
              {/* 1. HERO PRODUCT IMAGE GALLERY CONTAINER */}
              <div className="bg-white rounded-2xl p-2 border border-zinc-200/60 max-w-full overflow-hidden">
                <div className="relative aspect-[3/4] sm:aspect-[4/3] max-h-[45vh] w-full rounded-xl overflow-hidden bg-zinc-100/80 touch-pan-y select-none flex items-center justify-center">
                  <motion.img
                    key={currentImage.url}
                    initial={{ opacity: 0.5, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.5 }}
                    transition={{ duration: 0.2 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, { offset }) => {
                      const swipe = offset.x;
                      if (swipe < -40 && galleryImages.length > 1) {
                        setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
                      } else if (swipe > 40 && galleryImages.length > 1) {
                        setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
                      }
                    }}
                    src={currentImage.url}
                    alt={currentImage.alt || product.name}
                    className="w-full h-full object-contain cursor-grab active:cursor-grabbing p-1"
                  />

                  {/* Top Right Floating Action Buttons: Wishlist & Share (Over image overlay!) */}
                  <div className="absolute top-2 right-2 flex items-center gap-2 z-20">
                    <button
                      type="button"
                      onClick={() => toggleWishlist(String(product.id))}
                      aria-label="Wishlist"
                      className={`w-8 h-8 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center border border-zinc-200/80 transition-transform active:scale-90 cursor-pointer ${
                        wishlisted ? "text-rose-500" : "text-zinc-700 hover:text-black"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${wishlisted ? "fill-current" : ""}`} />
                    </button>

                    <button
                      type="button"
                      onClick={handleShare}
                      aria-label="Share product"
                      className="w-8 h-8 rounded-full bg-white/95 text-zinc-700 hover:text-black backdrop-blur-md flex items-center justify-center border border-zinc-200/80 transition-transform active:scale-90 cursor-pointer"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Left/Right Navigation Arrows if multiple images */}
                  {galleryImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveImageIndex((prev) =>
                            prev === 0 ? galleryImages.length - 1 : prev - 1
                          )
                        }
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 text-zinc-800 flex items-center justify-center shadow-md cursor-pointer z-20"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveImageIndex((prev) =>
                            prev === galleryImages.length - 1 ? 0 : prev + 1
                          )
                        }
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 text-zinc-800 flex items-center justify-center shadow-md cursor-pointer z-20"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Horizontal Scrollable Thumbnail Gallery below hero image */}
                {galleryImages.length > 1 && (
                  <div className="flex items-center gap-2 pt-2.5 overflow-x-auto no-scrollbar max-w-full">
                    {galleryImages.map((img: any, idx: number) => (
                      <button
                        key={img.id || idx}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                          activeImageIndex === idx
                            ? "border-black"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img src={img.url} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. PRODUCT INFORMATION CARD */}
              <div className="bg-white rounded-2xl p-3 shadow-xs border border-zinc-200/60 space-y-2 max-w-full overflow-hidden">
                <h2 className="text-sm sm:text-base font-semibold text-zinc-900 leading-snug">
                  {product.name}
                </h2>
                <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                  {product.shortDescription ||
                    "Ultra-breathable wireless support bra engineered for all-day comfort with cloud-like soft microfiber padding."}
                </p>
              </div>

              {/* 3. COLOR VARIANTS CARD */}
              <div className="bg-white rounded-2xl p-4 shadow-xs border border-zinc-200/60 space-y-3 max-w-full overflow-hidden">
                {/* Header: Colour: PINK */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-zinc-900">
                    Colour: <span className="text-black">{selectedColor}</span>
                  </span>
                </div>

                {/* Color Cards Horizontal Scroll Row */}
                <div className="flex items-stretch gap-3 overflow-x-auto no-scrollbar pb-1 max-w-full">
                  {colorVariantsList.map((cObj, idx) => {
                    const isSelected = cObj.colorName.toLowerCase() === selectedColor.toLowerCase();
                    return (
                      <button
                        key={cObj.colorName + idx}
                        type="button"
                        onClick={() => {
                          setSelectedColor(cObj.colorName);
                          setActiveImageIndex(0);
                        }}
                        className={`w-28 sm:w-32 rounded-2xl p-1.5 border-2 bg-white flex flex-col justify-between shrink-0 transition-all cursor-pointer ${
                          isSelected
                            ? "border-black shadow-md ring-1 ring-black/10"
                            : "border-zinc-200 hover:border-zinc-300"
                        }`}
                      >
                        {/* Thumbnail Image + Active Checkmark Badge */}
                        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-zinc-100 mb-2">
                          <img
                            src={cObj.image}
                            alt={cObj.colorName}
                            className="w-full h-full object-cover"
                          />
                          {isSelected && (
                            <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shadow-md">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}
                        </div>

                        {/* Color Title & Price */}
                        <div className="text-left space-y-0.5">
                          <span className="text-xs font-semibold text-zinc-900 block truncate">
                            {cObj.colorName}
                          </span>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xs font-semibold text-zinc-900">
                              ₹{cObj.price}
                            </span>
                            <span className="text-[10px] text-zinc-400 line-through font-semibold">
                              ₹{cObj.originalPrice}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. SIZE SELECTION WITH DROPDOWN */}
              <div className="bg-white rounded-2xl p-4 shadow-xs border border-zinc-200/60 space-y-3 max-w-full overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-900">
                    Select Size
                  </span>
                  <span className="text-xs font-mono font-semibold text-zinc-400">
                    SKU: {activeVariation.sku}
                  </span>
                </div>

                {/* Select dropdown */}
                <div className="relative w-full">
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full appearance-none bg-zinc-50 border border-zinc-300 hover:border-zinc-400 rounded-xl px-3.5 py-2.5 text-xs font-bold text-zinc-900 outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all cursor-pointer"
                  >
                    {["XS", "S", "M", "L", "XL", "XXL"].map((sz) => (
                      <option key={sz} value={sz}>
                        Size {sz} — In Stock (₹{livePrice})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                </div>

                {/* Size Chart Trigger */}
                <div className="pt-1 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => setIsSizeChartOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 underline cursor-pointer hover:text-[#80a17d]"
                  >
                    <Ruler className="w-3.5 h-3.5 text-[#80a17d]" />
                    <span>Size Chart</span>
                  </button>
                </div>
              </div>

              {/* 5. RELATED PRODUCTS SECTION (Horizontal Slide) */}
              {relatedProducts.length > 0 && (
                <div className="bg-white rounded-2xl p-4 shadow-xs border border-zinc-200/60 space-y-3 max-w-full overflow-hidden">
                  <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider">
                    Related Products
                  </h3>

                  <div className="flex items-center gap-3 overflow-x-auto pt-2 pb-1 scrollbar-none snap-x">
                    {relatedProducts.map((relP) => {
                      const relImg =
                        relP.images?.[0] ||
                        relP.image ||
                        "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?q=80&w=400";
                      return (
                        <button
                          key={relP.id}
                          type="button"
                          onClick={() => openQuickView(relP.id)}
                          className="w-36 sm:w-40 bg-zinc-50/70 hover:bg-zinc-100/80 rounded-xl border border-zinc-200/80 p-2 flex flex-col gap-2 text-left transition-all cursor-pointer group shrink-0 snap-start"
                        >
                          {/* Top: Product Image */}
                          <div className="w-full aspect-square rounded-lg overflow-hidden bg-zinc-200 shrink-0 relative">
                            <img
                              src={relImg}
                              alt={relP.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>

                          {/* Bottom: Details */}
                          <div className="w-full space-y-0.5 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-[10px] font-semibold text-[#798A7A] truncate">
                                {relP.category || "Lingerie"}
                              </span>
                              <div className="flex items-center gap-0.5 text-[9px] font-bold text-amber-600">
                                <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                                <span>{relP.rating || 4.8}</span>
                              </div>
                            </div>
                            <h4 className="text-xs font-semibold text-zinc-900 line-clamp-1 group-hover:text-[#80a17d]">
                              {relP.name}
                            </h4>
                            <span className="text-xs font-bold text-zinc-900 block">
                              ₹{relP.price || 499}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 6. STICKY BOTTOM ACTION BAR */}
            <div className="shrink-0 bg-white border-t border-zinc-200/80 p-3 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] flex items-center gap-3">
              {/* Quantity Stepper (Left) */}
              <div className="flex items-center justify-between border border-zinc-300 bg-zinc-50 rounded-xl py-2 px-3 min-w-[100px] text-zinc-900 font-semibold shadow-2xs">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-6 h-6 flex items-center justify-center text-zinc-700 hover:bg-zinc-200 rounded-lg active:scale-90 cursor-pointer transition-colors"
                >
                  <Minus className="w-4 h-4 stroke-[2.5]" />
                </button>
                <span className="text-sm font-medium text-zinc-900 px-1">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-6 h-6 flex items-center justify-center text-zinc-700 hover:bg-zinc-200 rounded-lg active:scale-90 cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

              {/* Primary Add Item Button (Right) */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 bg-black hover:bg-zinc-900 text-white text-sm font-medium py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Add Item</span>
                <span className="text-sm font-medium">₹{totalPrice}</span>
              </button>
            </div>
        </Drawer.Content>
      </Drawer.Portal>

      {/* SIZE CHART RESPONSIVE POPUP MODAL */}
      <AnimatePresence>
        {isSizeChartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <div className="flex items-center gap-2">
                  <Ruler className="w-5 h-5 text-[#80a17d]" />
                  <h3 className="text-base font-semibold text-zinc-900">
                    Aaramly Size Guide
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSizeChartOpen(false)}
                  className="p-1 text-zinc-400 hover:text-black rounded-full hover:bg-zinc-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <p className="text-xs text-zinc-500 font-medium">
                  Measure around the fullest part of your bust while keeping the tape comfortably horizontal.
                </p>

                <div className="border border-zinc-200 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-zinc-100 text-zinc-900 font-semibold">
                      <tr>
                        <th className="p-2.5 border-b border-zinc-200">Size</th>
                        <th className="p-2.5 border-b border-zinc-200">Bust (Inches)</th>
                        <th className="p-2.5 border-b border-zinc-200">Underbust</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 font-medium text-zinc-700">
                      <tr>
                        <td className="p-2.5 font-bold text-zinc-900">XS</td>
                        <td className="p-2.5">30" – 32"</td>
                        <td className="p-2.5">26" – 28"</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-zinc-900">S</td>
                        <td className="p-2.5">32" – 34"</td>
                        <td className="p-2.5">28" – 30"</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-zinc-900">M</td>
                        <td className="p-2.5">34" – 36"</td>
                        <td className="p-2.5">30" – 32"</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-zinc-900">L</td>
                        <td className="p-2.5">36" – 38"</td>
                        <td className="p-2.5">32" – 34"</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-zinc-900">XL</td>
                        <td className="p-2.5">38" – 40"</td>
                        <td className="p-2.5">34" – 36"</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-zinc-900">XXL</td>
                        <td className="p-2.5">40" – 42"</td>
                        <td className="p-2.5">36" – 38"</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsSizeChartOpen(false)}
                className="w-full py-2.5 bg-black text-white text-xs font-bold rounded-xl hover:bg-zinc-800 transition-colors"
              >
                Close Size Guide
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Drawer.Root>
  );
};

export default MobileProductQuickViewSheet;
