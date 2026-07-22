import { IMG } from "./aaramly-images";
import { type Product } from "../components/ProductCard";

export const PRODUCTS: Product[] = [
  // BRAS
  { id: "p1", name: "Wirefree | Padded | Sports Bra | Elastane Stretch", price: 499, rating: 4.5, img: IMG.bralette[0], hoverImg: IMG.bralette[1], colors: ["#111", "#c8a48c", "#e8d3c2"], sizes: ["28", "30", "32", "34"], category: "bras", tags: ["Sports Bra", "Elastane Stretch"] },
  { id: "p2", name: "Wireless | Seamless | Everyday | Premium Bralette", price: 899, rating: 4.6, img: IMG.bralette[1], hoverImg: IMG.bralette[2], colors: ["#000", "#8b5e3c", "#f2d7c1"], sizes: ["30", "32", "34"], category: "bras", tags: ["Wireless Bralette", "Soft Microfibre"] },
  { id: "p3", name: "Soft-Touch | Breathable | Contour Bra | Wirefree", price: 599, rating: 4.4, img: IMG.bralette[2], hoverImg: IMG.bralette[0], colors: ["#1a1a1a", "#d9b79a"], sizes: ["28", "30", "32"], category: "bras", tags: ["Breathable Contour", "Comfort Fit"] },
  { id: "p4", name: "Invisible | Ultra-Thin | Reusable | Silicone Covers", price: 349, rating: 4.7, img: IMG.silicone[0], hoverImg: IMG.bralette[0], colors: ["#e8c9a8"], sizes: ["Free"], category: "bras", tags: ["Invisible Coverage", "Reusable Silicone"] },

  // PANTIES
  { id: "p5", name: "Seamless | Mid Rise | Ultra Stretch | Brief Panty", price: 299, rating: 4.5, img: IMG.seamless[4], hoverImg: IMG.seamless[5], colors: ["#111", "#eadfd3", "#c8a48c"], sizes: ["S", "M", "L"], category: "panties", tags: ["Seamless Panty", "Everyday Brief"] },
  { id: "p6", name: "Lace Trim | Low Rise | Soft Microfibre | Hipster", price: 349, rating: 4.6, img: IMG.seamless[5], hoverImg: IMG.seamless[6], colors: ["#e8c9a8", "#000"], sizes: ["M", "L", "XL"], category: "panties", tags: ["Lace Trim", "Comfort Fit Hipster"] },
  { id: "p7", name: "Ultra-Grip | High Waisted | Shaping | Seamless Brief", price: 399, rating: 4.5, img: IMG.seamless[6], hoverImg: IMG.seamless[4], colors: ["#c9b8a5", "#111"], sizes: ["S", "M", "L", "XL"], category: "panties", tags: ["High Waisted Brief", "Shaping Effect"] },

  // SETS
  { id: "p8", name: "Coordinated | Seamless Bra & Hipster | Matching Set", price: 999, rating: 4.7, img: IMG.seamless[0], hoverImg: IMG.seamless[1], colors: ["#000", "#d8c1a8"], sizes: ["32", "34", "36"], category: "sets", tags: ["Coordinated Set", "Premium Comfort"] },
  { id: "p9", name: "Activewear | Ribbed Bralette & Shorts | Lounge Set", price: 1199, rating: 4.6, img: IMG.seamless[1], hoverImg: IMG.seamless[2], colors: ["#c8a48c", "#111"], sizes: ["S", "M", "L"], category: "sets", tags: ["Ribbed Knit", "All-Day Loungewear"] },

  // SEAMLESS BRA
  { id: "p10", name: "Seamless | Full Coverage | Everyday Wear | Soft Bra", price: 699, rating: 4.6, img: IMG.seamless[0], hoverImg: IMG.seamless[2], colors: ["#000", "#eadfd3"], sizes: ["32", "34", "36", "38"], category: "seamless", tags: ["Seamless Support", "All-Day Wear"] },
  { id: "p11", name: "Ultra-Soft | Sleep Bra | Zero Pressure | Microfibre", price: 549, rating: 4.5, img: IMG.seamless[1], hoverImg: IMG.seamless[3], colors: ["#c9b8a5", "#111"], sizes: ["S", "M", "L", "XL"], category: "seamless", tags: ["Sleep Soft", "Zero Pressure"] },
  { id: "p12", name: "Seamless | Stretch | Air Flow | Breathable Bra", price: 749, rating: 4.4, img: IMG.seamless[2], hoverImg: IMG.seamless[0], colors: ["#000", "#d8c1a8"], sizes: ["32", "34", "36"], category: "seamless", tags: ["Air Flow Support", "Flexible Stretch"] },

  // NIGHT WEAR
  { id: "p13", name: "Soft Satin | Strappy Neck | Luxury Slip Dress", price: 1299, rating: 4.8, img: IMG.seamless[3], hoverImg: IMG.seamless[1], colors: ["#111", "#c9b8a5"], sizes: ["S", "M", "L"], category: "nightwear", tags: ["Satin Silk", "Luxury Loungewear"] },
  { id: "p14", name: "Ribbed Modal | Loose Fit | Cozy Pajama Set", price: 1499, rating: 4.7, img: IMG.seamless[1], hoverImg: IMG.seamless[0], colors: ["#d8c1a8", "#111"], sizes: ["M", "L", "XL"], category: "nightwear", tags: ["Ribbed Modal", "Cozy Sleep Set"] },
];

export const CATEGORY_TABS = [
  { key: "bras", label: "Bras" },
  { key: "panties", label: "Panties" },
  { key: "sets", label: "Sets" },
  { key: "seamless", label: "Seamless Bra" },
  { key: "nightwear", label: "Night Wear" },
];
