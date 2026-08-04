import { Category, Subcategory, Brand, Attribute } from "../../../types/admin.js";

// Initial Taxonomy Seed Data
let categories: Category[] = [
  { id: 'cat-1', name: 'Bralettes', slug: 'bralettes', productCount: 12, isActive: true },
  { id: 'cat-2', name: 'Everyday Bras', slug: 'everyday-bras', productCount: 24, isActive: true },
  { id: 'cat-3', name: 'Seamless Panties', slug: 'panties', productCount: 18, isActive: true },
  { id: 'cat-4', name: 'Shapewear', slug: 'shapewear', productCount: 8, isActive: true },
  { id: 'cat-5', name: 'Accessories', slug: 'accessories', productCount: 15, isActive: true }
];

let subcategories: Subcategory[] = [
  { id: 'sub-1', categoryId: 'cat-1', categoryName: 'Bralettes', name: 'Seamless Padded Bralettes', slug: 'seamless-padded-bralettes' },
  { id: 'sub-2', categoryId: 'cat-1', categoryName: 'Bralettes', name: 'Lace Triangle Bralettes', slug: 'lace-triangle-bralettes' },
  { id: 'sub-3', categoryId: 'cat-2', categoryName: 'Everyday Bras', name: 'Contour Wire-Free Bras', slug: 'contour-wirefree-bras' },
  { id: 'sub-4', categoryId: 'cat-2', categoryName: 'Everyday Bras', name: 'T-Shirt Plunge Bras', slug: 't-shirt-plunge-bras' },
  { id: 'sub-5', categoryId: 'cat-5', categoryName: 'Accessories', name: 'Silicone Nipple Covers', slug: 'silicone-nipple-covers' },
  { id: 'sub-6', categoryId: 'cat-5', categoryName: 'Accessories', name: 'Bra Extenders & Straps', slug: 'bra-extenders-straps' }
];

let brands: Brand[] = [
  { id: 'b-1', name: 'AARAMLY', slug: 'aaramly', logo: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?q=80&w=100' },
  { id: 'b-2', name: 'AARAMLY Care', slug: 'aaramly-care', logo: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=100' },
  { id: 'b-3', name: 'AARAMLY Luxe', slug: 'aaramly-luxe', logo: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=100' }
];

let collections: string[] = [
  'Summer Essentials 2026',
  'Bridal Silk & Lace',
  'Everyday Comfort Wire-Free',
  'Seamless Nude Essentials'
];

let attributes: Attribute[] = [
  { id: 'attr-1', name: 'Color', type: 'Color', values: ['Black', 'White', 'Pink', 'Beige', 'Nude', 'Rose Gold'], isVariant: true },
  { id: 'attr-2', name: 'Size', type: 'Select', values: ['S', 'M', 'L', 'XL', '2XL', '32B', '34B', '36C'], isVariant: true },
  { id: 'attr-3', name: 'Fabric', type: 'Select', values: ['Micro-Modal Elastane', 'Super Combed Cotton', 'Lace Silk Blend', 'Silicone'], isVariant: false }
];

export const getCategoriesStore = (): Category[] => categories;
export const getSubcategoriesStore = (): Subcategory[] => subcategories;
export const getBrandsStore = (): Brand[] => brands;
export const getCollectionsStore = (): string[] => collections;
export const getAttributesStore = (): Attribute[] => attributes;

export const createCategoryStore = (data: Partial<Category>): Category => {
  const newCat: Category = {
    id: `cat-${Date.now()}`,
    name: data.name || 'New Category',
    slug: data.slug || (data.name ? data.name.toLowerCase().replace(/\s+/g, '-') : 'new-category'),
    productCount: 0,
    isActive: data.isActive !== undefined ? data.isActive : true
  };
  categories.push(newCat);
  return newCat;
};

export const updateCategoryStore = (id: string, data: Partial<Category>): Category | null => {
  const idx = categories.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  categories[idx] = { ...categories[idx], ...data };
  return categories[idx];
};

export const deleteCategoryStore = (id: string): boolean => {
  const initialLen = categories.length;
  categories = categories.filter((c) => c.id !== id);
  subcategories = subcategories.filter((s) => s.categoryId !== id);
  return categories.length < initialLen;
};

export const createSubcategoryStore = (data: Partial<Subcategory>): Subcategory => {
  const parentCat = categories.find((c) => c.id === data.categoryId) || categories[0];
  const newSub: Subcategory = {
    id: `sub-${Date.now()}`,
    categoryId: parentCat.id,
    categoryName: parentCat.name,
    name: data.name || 'New Subcategory',
    slug: data.slug || (data.name ? data.name.toLowerCase().replace(/\s+/g, '-') : 'new-subcategory')
  };
  subcategories.push(newSub);
  return newSub;
};

export const createBrandStore = (data: Partial<Brand>): Brand => {
  const newBrand: Brand = {
    id: `b-${Date.now()}`,
    name: data.name || 'New Brand',
    slug: data.slug || (data.name ? data.name.toLowerCase().replace(/\s+/g, '-') : 'new-brand'),
    logo: data.logo || 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?q=80&w=100'
  };
  brands.push(newBrand);
  return newBrand;
};

export const createAttributeStore = (data: Partial<Attribute>): Attribute => {
  const newAttr: Attribute = {
    id: `attr-${Date.now()}`,
    name: data.name || 'New Attribute',
    type: data.type || 'Select',
    values: data.values || [],
    isVariant: data.isVariant !== undefined ? data.isVariant : true
  };
  attributes.push(newAttr);
  return newAttr;
};

export const addAttributeValueStore = (attrId: string, val: any): Attribute | null => {
  const attr = attributes.find((a) => a.id === attrId);
  if (!attr) return null;
  attr.values.push(val);
  return attr;
};
