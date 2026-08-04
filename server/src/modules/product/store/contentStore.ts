import { HeroSlide, HomepageBanner, ContentPageItem, BlogPost, FaqItem, StoreSettings } from "../../../types/admin.js";

let heroSlides: HeroSlide[] = [
  {
    id: "slide-1",
    title: "Seamless Everyday Comfort",
    subtitle: "Engineered with 4-way micro-stretch for zero wire pinching",
    image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?q=80&w=1400",
    buttonText: "Explore Collection",
    link: "/category/bralettes",
    status: "Active",
    sortOrder: 1
  },
  {
    id: "slide-2",
    title: "Silk & Lace Couture",
    subtitle: "Handcrafted french lace bralettes designed for elegance",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=1400",
    buttonText: "Shop Bralettes",
    link: "/category/silk-lace",
    status: "Active",
    sortOrder: 2
  }
];

let homepageBanners: HomepageBanner[] = [
  {
    id: "banner-1",
    title: "Buy 2 Get 1 Free",
    subtitle: "On all Padded Bralette sets",
    image: "https://images.unsplash.com/photo-1516575334481-f85287c2c82d?q=80&w=800",
    badge: "LIMITED OFFER",
    link: "/category/bralettes",
    gridPosition: "Hero Side Upper",
    status: "Active"
  },
  {
    id: "banner-2",
    title: "Bridal Trousseau Special",
    subtitle: "Flat 25% Off Luxury Gift Boxes",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800",
    badge: "NEW BRIDAL",
    link: "/category/bridal",
    gridPosition: "Hero Side Lower",
    status: "Active"
  }
];

let contentPages: ContentPageItem[] = [
  {
    id: "page-1",
    title: "About AARAMLY Intimates",
    slug: "about-us",
    content: "AARAMLY is India's premier luxury intimates brand crafted for 360-degree all-day comfort.",
    metaTitle: "About Us - AARAMLY",
    metaDescription: "Learn about AARAMLY Intimates' story and comfort engineering.",
    status: "Published",
    updatedAt: "2026-08-01"
  },
  {
    id: "page-2",
    title: "Privacy & Cookie Policy",
    slug: "privacy-policy",
    content: "We protect your personal data with 256-bit SSL encryption.",
    metaTitle: "Privacy Policy - AARAMLY",
    metaDescription: "Read AARAMLY's privacy and data protection terms.",
    status: "Published",
    updatedAt: "2026-08-01"
  }
];

let blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "How to Find Your Perfect Bralette Size",
    slug: "how-to-find-perfect-bralette-size",
    category: "Fitting Guide",
    author: "AARAMLY Fit Specialist",
    excerpt: "Step-by-step measurement guide for choosing wire-free contour bras.",
    content: "Full detailed guide on measuring underbust and full bust in centimeters and inches...",
    featuredImage: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?q=80&w=800",
    readTime: "4 min read",
    status: "Published",
    publishedDate: "2026-07-28"
  }
];

let faqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "What is AARAMLY's return & exchange policy?",
    answer: "We offer hassle-free 7-day exchanges on unused, unwashed bralettes with intact tags.",
    category: "Shipping & Returns",
    sortOrder: 1,
    status: "Active"
  },
  {
    id: "faq-2",
    question: "How long does standard delivery take across India?",
    answer: "Express orders deliver in 2-4 business days across metro cities.",
    category: "Delivery",
    sortOrder: 2,
    status: "Active"
  }
];

let storeSettings: StoreSettings = {
  storeName: "AARAMLY Intimates",
  storeLogo: "/images/home/logo.png",
  email: "care@aaramly.com",
  phone: "+91 98765 43210",
  address: "Plot 42, GIDC Industrial Estate, Ahmedabad, Gujarat 380015",
  currency: "₹ (INR)",
  taxRate: 18,
  shippingFee: 99,
  freeShippingThreshold: 1499,
  facebookUrl: "https://facebook.com/aaramly",
  instagramUrl: "https://instagram.com/aaramly",
  twitterUrl: "https://twitter.com/aaramly",
  metaTitle: "AARAMLY Intimates - Premium Bralettes & Lingerie",
  metaDescription: "Shop luxury wire-free bralettes, contour bras, and seamless intimates online."
};

// Store getters & setters
export const getHeroSlidesStore = () => heroSlides;
export const getHomepageBannersStore = () => homepageBanners;
export const getContentPagesStore = () => contentPages;
export const getBlogPostsStore = () => blogPosts;
export const getFaqItemsStore = () => faqItems;
export const getStoreSettingsStore = () => storeSettings;

export const updateStoreSettingsStore = (settings: Partial<StoreSettings>) => {
  storeSettings = { ...storeSettings, ...settings };
  return storeSettings;
};
