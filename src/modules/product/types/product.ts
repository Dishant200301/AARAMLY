export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  label?: string;
}

export interface ProductColorVariation {
  id: string;
  colorName: string;
  colorHex: string;
  thumbnail: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  sku: string;
  stock: number;
  images: ProductImage[];
}

export interface SizeChartEntry {
  brandSize: string;
  inSize: string;
  usSize: string;
  euSize: string;
  ukSize: string;
  cnSize: string;
  bustCm: string;
  underbustCm: string;
}

export interface FeatureHighlight {
  label: string;
  value: string;
}

export interface DescriptionCard {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface WashingInstruction {
  id: string;
  label: string;
  iconName: string;
}

export interface ManufacturingInfo {
  manufacturer: string;
  address: string;
  countryOfOrigin: string;
  material: string;
  mrp: string;
  netQuantity: string;
  packedBy: string;
  importedBy: string;
  customerCare: {
    email: string;
    phone: string;
    address: string;
  };
}

export interface RelatedProduct {
  id: string;
  code: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  image: string;
  hoverImage?: string;
  rating: number;
  isWishlisted?: boolean;
}

export interface ProductDetails {
  id: string;
  brand: string;
  name: string;
  subtitle: string;
  rating: number;
  reviewCount: number;
  defaultSku: string;
  variations: ProductColorVariation[];
  availableSizes: string[];
  sizeChart: SizeChartEntry[];
  highlights: FeatureHighlight[];
  extendedDetails: {
    description: string;
    specifications: Record<string, string>;
    careInstructions: string[];
    materialDetails: string;
  };
  descriptionCards: DescriptionCard[];
  idealForPills: string[];
  washingInstructions: WashingInstruction[];
  manufacturingInfo: ManufacturingInfo;
  relatedProducts: RelatedProduct[];
}

export interface CartItem {
  id: string; // unique item key: productId-colorId-size
  productId: string;
  productName: string;
  brand: string;
  colorName: string;
  colorHex: string;
  size: string;
  price: number;
  originalPrice: number;
  image: string;
  sku: string;
  quantity: number;
}
