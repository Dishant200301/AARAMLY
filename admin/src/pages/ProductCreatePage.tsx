import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Upload, 
  Plus, 
  Trash2, 
  Layers, 
  Check, 
  Eye, 
  Tag, 
  DollarSign, 
  Package, 
  Globe, 
  RefreshCw,
  X,
  Image as ImageIcon,
  UploadCloud,
  ChevronUp,
  ChevronDown,
  Palette,
  Ruler
} from 'lucide-react';
import { MOCK_CATEGORIES, MOCK_SUBCATEGORIES, MOCK_BRANDS, MOCK_COLLECTIONS, MOCK_PRODUCTS, broadcastAdminProductChange, getAdminProducts, fetchProductsFromBackend } from '../data/mockAdminData';
import { Product, Variant, ProductColor, ProductDescriptionCard, ProductHighlight, ProductWashingInstruction, ProductManufacturingInfo, SizeGuide } from '../types/admin';
import { AdminApiService } from '../services/adminApi';
import LucideIconPicker from '../components/LucideIconPicker';

interface ProductCreatePageProps {
  onNavigate: (tab: string) => void;
  editingProductId?: string;
}

export const ProductCreatePage: React.FC<ProductCreatePageProps> = ({ onNavigate, editingProductId }) => {
  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  // Product Type & Categories
  const [productType, setProductType] = useState<'Simple' | 'Variable'>('Variable');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Bralettes']);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('Seamless Padded Bralettes');
  const [brand, setBrand] = useState('AARAMLY');
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Labels
  const [labels, setLabels] = useState({
    featured: true,
    trending: false,
    newArrival: true,
    bestSeller: false,
    sale: true
  });

  // Pricing
  const [regularPrice, setRegularPrice] = useState<number>(1299);
  const [salePrice, setSalePrice] = useState<number>(799);
  const [costPrice, setCostPrice] = useState<number>(350);

  // Inventory
  const [sku, setSku] = useState('AAR-' + Math.floor(100000 + Math.random() * 900000));
  const [barcode, setBarcode] = useState('890123' + Math.floor(100000 + Math.random() * 900000));
  const [stockQuantity, setStockQuantity] = useState<number>(100);
  const [lowStockAlert, setLowStockAlert] = useState<number>(20);
  const [allowBackorders, setAllowBackorders] = useState(false);
  const [trackInventory, setTrackInventory] = useState(true);

  // Shipping
  const [weight, setWeight] = useState<number>(0.15);
  const [length, setLength] = useState<number>(20);
  const [width, setWidth] = useState<number>(15);
  const [height, setHeight] = useState<number>(4);

  // SEO
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');

  // Product Status & Publish Checkbox Rule
  const [status, setStatus] = useState<'Draft' | 'Published' | 'Hidden'>('Published');
  const [isPublished, setIsPublished] = useState<boolean>(true);

  // ==========================================
  // DYNAMIC COLOR MANAGEMENT STATE
  // ==========================================
  const [colors, setColors] = useState<ProductColor[]>([
    {
      id: "col-1",
      colorName: "Black",
      colorHex: "#000000",
      displayImage: "",
      mainImage: "",
      galleryImages: [],
      sizes: ["S", "M", "L", "XL"]
    }
  ]);

  const [activeColorEditId, setActiveColorEditId] = useState<string | null>("col-1");
  const [customColorName, setCustomColorName] = useState('');
  const [customColorHex, setCustomColorHex] = useState('#000000');
  const [customSizeAdd, setCustomSizeAdd] = useState('');

  // Bulk Variant Controls
  const [bulkPriceInput, setBulkPriceInput] = useState<number | ''>('');
  const [bulkMrpInput, setBulkMrpInput] = useState<number | ''>('');
  const [bulkStockInput, setBulkStockInput] = useState<number | ''>('');

  // Size Guides & Inline Creation Modal State
  const [sizeGuidesList, setSizeGuidesList] = useState<SizeGuide[]>([]);
  const [selectedSizeGuideId, setSelectedSizeGuideId] = useState<string>('');
  const [showCreateSizeGuideModal, setShowCreateSizeGuideModal] = useState(false);

  // New Size Guide Form State
  const [newGuideTitle, setNewGuideTitle] = useState('');
  const [newGuideDesc, setNewGuideDesc] = useState('');
  const [newGuideCategories, setNewGuideCategories] = useState<string[]>(['Bralettes']);
  const [newGuideUnit, setNewGuideUnit] = useState<'cm' | 'in'>('cm');

  // Description Cards, Highlights, Care, Manufacturing, Ideal For
  const [descriptionCards, setDescriptionCards] = useState<ProductDescriptionCard[]>([
    {
      id: "card-1",
      title: "Seamless Product Feature",
      description: "Ultra-soft stretch wire-free contour design.",
      image: "",
      sortOrder: 1
    }
  ]);

  const [highlights, setHighlights] = useState<ProductHighlight[]>([
    { id: "hl-1", title: "Material", value: "85% Polyamide, 15% Elastane", iconName: "Sparkles", sortOrder: 1 },
    { id: "hl-2", title: "Style", value: "Wire Free Contour", iconName: "Feather", sortOrder: 2 },
    { id: "hl-3", title: "Padding", value: "Removable Breathable Cups", iconName: "ShieldCheck", sortOrder: 3 }
  ]);

  const [washingInstructions, setWashingInstructions] = useState<ProductWashingInstruction[]>([
    { id: "wi-1", title: "Hand Wash Cold", description: "Use mild detergent in cold water", iconName: "Droplets", sortOrder: 1 },
    { id: "wi-2", title: "Do Not Bleach", description: "Avoid chlorine bleach to protect elasticity", iconName: "Flame", sortOrder: 2 },
    { id: "wi-3", title: "Line Dry in Shade", description: "Do not tumble dry or iron", iconName: "Sun", sortOrder: 3 }
  ]);

  const [manufacturingInfo, setManufacturingInfo] = useState<ProductManufacturingInfo>({
    manufacturer: "AARAMLY Intimates Pvt Ltd",
    address: "Plot 42, GIDC Industrial Estate, Ahmedabad, Gujarat 380015",
    packedBy: "AARAMLY Logistics & Fulfillment Center",
    importedBy: "N/A (Made in India)",
    countryOfOrigin: "India",
    material: "85% Micro-polyamide, 15% Elastane 4-way stretch",
    careEmail: "care@aaramly.com",
    carePhone: "+91 98765 43210"
  });

  const [idealForPills, setIdealForPills] = useState<string[]>(['Daily Comfort', 'Lounge Wear', 'Under T-shirts', 'Sleepwear']);
  const [idealForInput, setIdealForInput] = useState('');

  const [generatedVariants, setGeneratedVariants] = useState<Variant[]>([]);

  // Previews Modals
  const [showCardPreview, setShowCardPreview] = useState(false);
  const [showDetailPreview, setShowDetailPreview] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // File Reader Helper with Canvas Compression (<50KB optimized images)
  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const rawUrl = e.target?.result as string;
        if (!rawUrl) return resolve('');
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDim = 1000;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', 0.82));
          } else {
            resolve(rawUrl);
          }
        };
        img.onerror = () => resolve(rawUrl);
        img.src = rawUrl;
      };
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    });
  };

  // Fetch Size Guides on Mount
  useEffect(() => {
    const loadGuides = async () => {
      const list = await AdminApiService.getSizeGuides();
      if (list && list.length > 0) {
        setSizeGuidesList(list);
        if (!selectedSizeGuideId) {
          setSelectedSizeGuideId(list[0].id);
        }
      }
    };
    loadGuides();
  }, []);

  // Auto-generate slug from name
  useEffect(() => {
    if (name) {
      const generated = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generated);
      if (!metaTitle) setMetaTitle(`${name} - AARAMLY`);
      if (!metaDescription) setMetaDescription(shortDescription || `Buy ${name} at best price on AARAMLY.`);
      if (!canonicalUrl) setCanonicalUrl(`https://aaramly.com/product/${generated}`);
    }
  }, [name]);

  // Load product if editing OR reset form if creating a new product
  useEffect(() => {
    let isMounted = true;

    async function hydrateForm() {
      if (editingProductId) {
        let found = getAdminProducts().find((p: Product) => p.id === editingProductId);

        if (!found) {
          try {
            const remote = await AdminApiService.getProductById(editingProductId);
            if (remote) found = remote;
          } catch (e) {}
        }

        if (!found) {
          try {
            const allBackend = await fetchProductsFromBackend();
            found = allBackend.find((p: Product) => p.id === editingProductId);
          } catch (e) {}
        }

        if (found && isMounted) {
          const primaryImg = (found as any).image || found.images?.[0] || '';
          const galImgs = found.images && found.images.length > 0 
            ? found.images.filter((img) => img !== primaryImg)
            : [];

          setName(found.name || '');
          setSlug(found.slug || '');
          setShortDescription(found.shortDescription || '');
          setFullDescription(found.fullDescription || '');
          setMainImage(primaryImg);
          setGalleryImages(galImgs);
          setProductType(found.type || 'Variable');
          setSelectedCategories(found.categories || [found.category].filter(Boolean));
          setSelectedSubcategory(found.subcategory || 'Seamless Padded Bralettes');
          setBrand(found.brand || 'AARAMLY');
          setSelectedCollections(found.collections || []);
          setSelectedTags(found.tags || []);
          setRegularPrice(found.originalPrice !== undefined ? found.originalPrice : (found.price || 1299));
          setSalePrice(found.price !== undefined ? found.price : 799);
          setCostPrice(found.costPrice !== undefined ? found.costPrice : 350);
          setSku(found.sku || (found as any).defaultSku || 'AAR-SKU');
          setBarcode(found.inventory?.barcode || (found as any).barcode || '890123000000');
          setStockQuantity(found.stock !== undefined ? found.stock : 100);
          setLowStockAlert(found.inventory?.lowStockAlert || 20);
          setIsPublished(found.isPublished !== undefined ? found.isPublished : true);
          setStatus(found.status === 'Draft' ? 'Draft' : 'Published');

          let hydratedColors: ProductColor[] = [];
          if (found.colors && found.colors.length > 0) {
            hydratedColors = found.colors.map((c) => {
              const matchingV = (found.variants || []).find(
                (v) => (v.color || v.colorName || '').toLowerCase() === c.colorName.toLowerCase()
              );
              const cMainImg = c.mainImage || matchingV?.image || matchingV?.thumbnail || primaryImg || '';
              const cDispImg = c.displayImage || matchingV?.thumbnail || cMainImg || matchingV?.image || '';
              const cGalImgs = (c.galleryImages && c.galleryImages.length > 0)
                ? c.galleryImages
                : (matchingV?.galleryImages && matchingV.galleryImages.length > 0)
                ? matchingV.galleryImages
                : galImgs;

              return {
                ...c,
                mainImage: cMainImg,
                displayImage: cDispImg,
                galleryImages: cGalImgs
              };
            });
          } else if (found.variants && found.variants.length > 0) {
            const colorMap = new Map<string, ProductColor>();
            found.variants.forEach((v) => {
              const cName = v.color || v.colorName || 'Black';
              const cKey = cName.toLowerCase();
              if (!colorMap.has(cKey)) {
                colorMap.set(cKey, {
                  id: `col-${cKey.replace(/\s+/g, '-')}`,
                  colorName: cName,
                  colorHex: v.colorHex || '#000000',
                  displayImage: v.thumbnail || v.image || primaryImg || '',
                  mainImage: v.image || v.thumbnail || primaryImg || '',
                  galleryImages: (v.galleryImages && v.galleryImages.length > 0) ? v.galleryImages : galImgs,
                  sizes: [v.size || v.sizeName || 'M']
                });
              } else {
                const existingColor = colorMap.get(cKey)!;
                const currentSizes = existingColor.sizes || [];
                const sz = v.size || v.sizeName;
                if (sz && !currentSizes.includes(sz)) {
                  existingColor.sizes = [...currentSizes, sz];
                }
              }
            });
            hydratedColors = Array.from(colorMap.values());
          }

          if (hydratedColors.length === 0) {
            hydratedColors = [
              {
                id: 'col-1',
                colorName: 'Black',
                colorHex: '#000000',
                displayImage: primaryImg,
                mainImage: primaryImg,
                galleryImages: galImgs,
                sizes: ['S', 'M', 'L', 'XL']
              }
            ];
          }

          setColors(hydratedColors);
          setActiveColorEditId(hydratedColors[0]?.id || null);

          if (found.variants && found.variants.length > 0) {
            setGeneratedVariants(found.variants);
          }
          if (found.sizeGuideId) {
            setSelectedSizeGuideId(found.sizeGuideId);
          }
          if (found.descriptionCards && found.descriptionCards.length > 0) {
            setDescriptionCards(found.descriptionCards);
          }
          if (found.highlights && found.highlights.length > 0) {
            setHighlights(found.highlights);
          }
          if (found.washingInstructions && found.washingInstructions.length > 0) {
            setWashingInstructions(found.washingInstructions);
          }
          if (found.manufacturingInfo) {
            setManufacturingInfo(found.manufacturingInfo);
          }
        }
      } else if (isMounted) {
        // RESET FORM FOR NEW PRODUCT CREATION
        setName('');
        setSlug('');
        setShortDescription('');
        setFullDescription('');
        setMainImage('');
        setGalleryImages([]);
        setProductType('Variable');
        setSelectedCategories(['Bralettes']);
        setSelectedSubcategory('Seamless Padded Bralettes');
        setBrand('AARAMLY');
        setSelectedCollections([]);
        setSelectedTags([]);
        setRegularPrice(1299);
        setSalePrice(799);
        setCostPrice(350);
        setSku('AAR-' + Math.floor(100000 + Math.random() * 900000));
        setBarcode('890123' + Math.floor(100000 + Math.random() * 900000));
        setStockQuantity(100);
        setLowStockAlert(20);
        setIsPublished(true);
        setStatus('Published');
        setColors([
          {
            id: "col-1",
            colorName: "Black",
            colorHex: "#000000",
            displayImage: "",
            mainImage: "",
            galleryImages: [],
            sizes: ["S", "M", "L", "XL"]
          }
        ]);
        setActiveColorEditId("col-1");
        setGeneratedVariants([]);
      }
    }

    hydrateForm();

    return () => {
      isMounted = false;
    };
  }, [editingProductId]);

  // AUTO-GENERATE VARIANT MATRIX BASED ON COLORS AND SIZES
  useEffect(() => {
    if (productType !== 'Variable') return;

    const newVariantsList: Variant[] = [];
    colors.forEach((col) => {
      const colSizes = col.sizes && col.sizes.length > 0 ? col.sizes : ['S', 'M', 'L'];
      colSizes.forEach((sz) => {
        const existing = generatedVariants.find(
          (v) =>
            ((v.color || v.colorName || '').toLowerCase() === col.colorName.toLowerCase()) &&
            ((v.size || v.sizeName || '').toLowerCase() === sz.toLowerCase())
        );

        const generatedSku = existing?.sku || `AAR-${col.colorName.substring(0,3).toUpperCase()}-${sz}-${Math.floor(100 + Math.random() * 900)}`;
        const regP = existing?.originalPrice !== undefined ? existing.originalPrice : regularPrice;
        const saleP = existing?.price !== undefined ? existing.price : salePrice;

        newVariantsList.push({
          id: existing?.id || `v-${col.colorName}-${sz}-${Date.now()}`,
          sku: generatedSku,
          color: col.colorName,
          colorName: col.colorName,
          colorHex: col.colorHex,
          size: sz,
          sizeName: sz,
          price: saleP,
          originalPrice: regP,
          costPrice: existing?.costPrice !== undefined ? existing.costPrice : costPrice,
          discountPercentage: regP > 0 ? Math.round(((regP - saleP) / regP) * 100) : 0,
          stock: existing?.stock !== undefined ? existing.stock : stockQuantity,
          image: col.mainImage || col.displayImage || col.galleryImages?.[0] || existing?.image || '',
          thumbnail: col.displayImage || col.mainImage || col.galleryImages?.[0] || existing?.thumbnail || '',
          galleryImages: (col.galleryImages && col.galleryImages.length > 0) ? col.galleryImages : (existing?.galleryImages || []),
          barcode: existing?.barcode || barcode,
          status: existing?.status || (existing?.stock === 0 ? 'Out of Stock' : 'Active')
        });
      });
    });

    setGeneratedVariants(newVariantsList);
  }, [colors, salePrice, regularPrice, costPrice, stockQuantity, productType]);

  // Color Management Helpers
  const handleAddNewColor = () => {
    if (!customColorName.trim()) return;
    const nameVal = customColorName.trim();
    if (colors.some((c) => c.colorName.toLowerCase() === nameVal.toLowerCase())) {
      alert('Color already exists!');
      return;
    }
    const newCol: ProductColor = {
      id: `col-${Date.now()}`,
      colorName: nameVal,
      colorHex: customColorHex || '#000000',
      displayImage: '',
      mainImage: '',
      galleryImages: [],
      sizes: ['S', 'M', 'L', 'XL']
    };
    setColors([...colors, newCol]);
    setActiveColorEditId(newCol.id);
    setCustomColorName('');
  };

  const handleDeleteColor = (id: string) => {
    if (colors.length <= 1) {
      alert('Product must have at least one color option.');
      return;
    }
    setColors(colors.filter((c) => c.id !== id));
    if (activeColorEditId === id) {
      setActiveColorEditId(colors.find((c) => c.id !== id)?.id || null);
    }
  };

  const handleMoveColor = (idx: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= colors.length) return;
    const updated = [...colors];
    const [moved] = updated.splice(idx, 1);
    updated.splice(targetIdx, 0, moved);
    setColors(updated);
  };

  const handleUpdateColorField = (id: string, field: keyof ProductColor, value: any) => {
    setColors(colors.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const handleToggleColorSize = (colorId: string, sizeName: string) => {
    setColors(
      colors.map((c) => {
        if (c.id === colorId) {
          const currentSizes = c.sizes || [];
          const exists = currentSizes.includes(sizeName);
          const updated = exists ? currentSizes.filter((s) => s !== sizeName) : [...currentSizes, sizeName];
          return { ...c, sizes: updated };
        }
        return c;
      })
    );
  };

  const handleAddCustomSizeToColor = (colorId: string) => {
    if (!customSizeAdd.trim()) return;
    const sz = customSizeAdd.trim().toUpperCase();
    setColors(
      colors.map((c) => {
        if (c.id === colorId) {
          const currentSizes = c.sizes || [];
          if (!currentSizes.includes(sz)) {
            return { ...c, sizes: [...currentSizes, sz] };
          }
        }
        return c;
      })
    );
    setCustomSizeAdd('');
  };

  // Upload Handlers for Color Images
  const handleUploadColorDisplayImage = async (colorId: string, file: File) => {
    if (!file) return;
    const dataUrl = await readFileAsDataURL(file);
    handleUpdateColorField(colorId, 'displayImage', dataUrl);
  };

  const handleUploadColorMainImage = async (colorId: string, file: File) => {
    if (!file) return;
    const dataUrl = await readFileAsDataURL(file);
    handleUpdateColorField(colorId, 'mainImage', dataUrl);
  };

  const handleUploadColorGalleryImages = async (colorId: string, files: FileList) => {
    if (!files || files.length === 0) return;
    const newPhotos: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const dataUrl = await readFileAsDataURL(files[i]);
      newPhotos.push(dataUrl);
    }
    const color = colors.find((c) => c.id === colorId);
    if (color) {
      handleUpdateColorField(colorId, 'galleryImages', [...(color.galleryImages || []), ...newPhotos]);
    }
  };

  // Variant Matrix Helpers
  const handleUpdateVariantField = (id: string, field: keyof Variant, value: any) => {
    setGeneratedVariants((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
  };

  const handleApplyBulkVariantValues = () => {
    setGeneratedVariants((prev) =>
      prev.map((v) => ({
        ...v,
        price: typeof bulkPriceInput === 'number' && bulkPriceInput > 0 ? bulkPriceInput : v.price,
        originalPrice: typeof bulkMrpInput === 'number' && bulkMrpInput > 0 ? bulkMrpInput : v.originalPrice,
        stock: typeof bulkStockInput === 'number' && bulkStockInput >= 0 ? bulkStockInput : v.stock
      }))
    );
    setBulkPriceInput('');
    setBulkMrpInput('');
    setBulkStockInput('');
  };

  // Inline Create Size Guide Handler
  const handleSaveInlineSizeGuide = async () => {
    if (!newGuideTitle.trim()) {
      alert('Please enter Size Guide title.');
      return;
    }

    const createdGuide: SizeGuide = {
      id: `sg-${Date.now()}`,
      title: newGuideTitle.trim(),
      description: newGuideDesc.trim() || 'Custom Size Guide',
      categoryIds: newGuideCategories,
      subcategoryIds: [],
      countries: [
        { id: 'c1', name: 'India', code: 'IN', displayOrder: 1 },
        { id: 'c2', name: 'United States', code: 'US', displayOrder: 2 },
        { id: 'c3', name: 'Europe', code: 'EU', displayOrder: 3 },
        { id: 'c4', name: 'United Kingdom', code: 'UK', displayOrder: 4 }
      ],
      columns: [
        { id: 'col1', key: 'brandSize', name: 'Brand Size', displayOrder: 1 },
        { id: 'col2', key: 'bust', name: 'Bust / Chest', displayOrder: 2 },
        { id: 'col3', key: 'waist', name: 'Waist', displayOrder: 3 },
        { id: 'col4', key: 'underbust', name: 'Underbust', displayOrder: 4 }
      ],
      rows: [
        {
          id: 'r1',
          brandSize: 'S',
          displayOrder: 1,
          values: {
            bust: { cm: '81-86', inch: '32-34' },
            waist: { cm: '66-71', inch: '26-28' },
            underbust: { cm: '70-75', inch: '28-30' }
          }
        },
        {
          id: 'r2',
          brandSize: 'M',
          displayOrder: 2,
          values: {
            bust: { cm: '86-91', inch: '34-36' },
            waist: { cm: '71-76', inch: '28-30' },
            underbust: { cm: '75-80', inch: '30-32' }
          }
        },
        {
          id: 'r3',
          brandSize: 'L',
          displayOrder: 3,
          values: {
            bust: { cm: '91-96', inch: '36-38' },
            waist: { cm: '76-81', inch: '30-32' },
            underbust: { cm: '80-85', inch: '32-34' }
          }
        }
      ]
    };

    const saved = await AdminApiService.createSizeGuide(createdGuide);
    if (saved) {
      setSizeGuidesList([...sizeGuidesList, saved]);
      setSelectedSizeGuideId(saved.id);
    } else {
      setSizeGuidesList([...sizeGuidesList, createdGuide]);
      setSelectedSizeGuideId(createdGuide.id);
    }

    setShowCreateSizeGuideModal(false);
    setNewGuideTitle('');
    setNewGuideDesc('');
  };

  // Form Submit Handler
  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Please enter product name.');
      return;
    }

    let finalVariants = generatedVariants;
    if ((!finalVariants || finalVariants.length === 0) && colors.length > 0) {
      finalVariants = [];
      colors.forEach((col) => {
        const colSizes = col.sizes && col.sizes.length > 0 ? col.sizes : ['S', 'M', 'L', 'XL'];
        colSizes.forEach((sz) => {
          finalVariants.push({
            id: `v-${col.colorName}-${sz}-${Date.now()}`,
            sku: `AAR-${col.colorName.substring(0, 3).toUpperCase()}-${sz}-${Math.floor(100 + Math.random() * 900)}`,
            color: col.colorName,
            colorName: col.colorName,
            colorHex: col.colorHex || '#000000',
            size: sz,
            sizeName: sz,
            price: salePrice || 799,
            originalPrice: regularPrice || 1299,
            costPrice: costPrice || 350,
            discountPercentage: regularPrice > 0 ? Math.round(((regularPrice - salePrice) / regularPrice) * 100) : 0,
            stock: stockQuantity || 100,
            image: col.mainImage || col.displayImage || col.galleryImages?.[0] || '',
            thumbnail: col.displayImage || col.mainImage || col.galleryImages?.[0] || '',
            galleryImages: col.galleryImages || [],
            barcode: barcode || '890123000000',
            status: 'Active'
          });
        });
      });
    }

    const primaryImage = mainImage || colors[0]?.mainImage || colors[0]?.displayImage || colors[0]?.galleryImages?.[0] || galleryImages[0] || '';
    const allColorGalleryImages = colors.flatMap((c) => c.galleryImages || []);
    const combinedGallery = Array.from(new Set([...galleryImages, ...allColorGalleryImages])).filter(Boolean);

    const newProductObj: Product = {
      id: editingProductId || `prod-${Date.now()}`,
      name: name.trim(),
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      sku: sku || 'AAR-SKU-NEW',
      category: selectedCategories[0] || 'Bralettes',
      categories: selectedCategories,
      brand: brand || 'AARAMLY',
      collections: selectedCollections,
      tags: selectedTags,
      price: salePrice,
      originalPrice: regularPrice,
      costPrice: costPrice,
      stock: stockQuantity,
      rating: 4.8,
      salesCount: 0,
      status: isPublished ? (status === 'Draft' ? 'Published' : status) : 'Draft',
      isPublished: isPublished,
      type: productType,
      shortDescription: shortDescription,
      fullDescription: fullDescription,
      image: primaryImage,
      images: [primaryImage, ...combinedGallery].filter(Boolean),
      colors: colors,
      sizeGuideId: selectedSizeGuideId,
      labels: labels,
      inventory: {
        sku: sku,
        barcode: barcode,
        stock: stockQuantity,
        lowStockAlert: lowStockAlert,
        allowBackorders: allowBackorders,
        trackInventory: trackInventory
      },
      shipping: { weight, length, width, height },
      seo: { metaTitle, metaDescription, keywords, canonicalUrl },
      attributes: [
        { name: 'Color', values: colors.map((c) => c.colorName) },
        { name: 'Size', values: Array.from(new Set(colors.flatMap((c) => c.sizes || []))) }
      ],
      variants: finalVariants,
      descriptionCards,
      highlights,
      washingInstructions,
      manufacturingInfo,
      idealForPills,
      createdAt: new Date().toISOString().split('T')[0]
    };

    broadcastAdminProductChange(newProductObj);
    setSubmitSuccess(true);

    setTimeout(() => {
      onNavigate('all-products');
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmitProduct} className="p-6 md:p-10 space-y-8 max-w-[1400px] mx-auto pb-24">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('products')}
            className="p-2.5 rounded-2xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 transition-all cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              {editingProductId ? 'Edit Product & Variant Master' : 'Create New Dynamic Product'}
            </h1>
            <p className="text-xs font-semibold text-slate-500">
              Configure product details, colors, thumbnails, variant matrix, and category size guides.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowCardPreview(true)}
            className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer border border-slate-200 shadow-xs"
          >
            <Eye className="w-4 h-4 text-rose-500" />
            <span>Card Preview</span>
          </button>

          <button
            type="button"
            onClick={() => setShowDetailPreview(true)}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer border border-slate-200"
          >
            <Eye className="w-4 h-4 text-indigo-500" />
            <span>Page Preview</span>
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 bg-zinc-900 hover:bg-black text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{editingProductId ? 'Update Product' : 'Save Product'}</span>
          </button>
        </div>
      </div>

      {submitSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl flex items-center justify-between animate-in fade-in">
          <span>✓ Product &amp; Variant Matrix saved successfully! Syncing with backend API...</span>
        </div>
      )}

      {/* MAIN TWO-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: BASIC INFO, PRICING, COLORS & VARIANT MATRIX */}
        <div className="lg:col-span-2 space-y-6">
          {/* ========================================================================= */}
          {/* STEP 1: BASIC PRODUCT INFORMATION */}
          {/* ========================================================================= */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2 border-b border-slate-100 pb-3">
              <Package className="w-5 h-5 text-rose-500" />
              <span>Step 1: Basic Product Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Women's Seamless Padded Bralette"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 text-xs font-bold text-slate-900 p-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-rose-500 focus:bg-white transition-all placeholder:text-slate-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-1">
                  Category *
                </label>
                <select
                  value={selectedCategories[0] || 'Bralettes'}
                  onChange={(e) => setSelectedCategories([e.target.value])}
                  className="w-full bg-slate-50 text-xs font-bold text-slate-900 p-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-rose-500 cursor-pointer"
                >
                  {MOCK_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-1">
                  Brand *
                </label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full bg-slate-50 text-xs font-bold text-slate-900 p-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-1">
                  Base SKU *
                </label>
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="w-full bg-slate-50 text-xs font-mono font-bold text-slate-900 p-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-1">
                  Product Status *
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full bg-slate-50 text-xs font-bold text-slate-900 p-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-rose-500 cursor-pointer"
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                  <option value="Hidden">Hidden</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-1">
                URL Slug (Auto Generated)
              </label>
              <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-200 text-xs">
                <Globe className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400 font-mono text-[11px]">aaramly.com/product/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="flex-1 bg-transparent text-slate-900 font-mono font-bold focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-1">
                Description &amp; Fitting Notes
              </label>
              <textarea
                rows={3}
                placeholder="Product description, material specs, fitting instructions..."
                value={fullDescription}
                onChange={(e) => setFullDescription(e.target.value)}
                className="w-full bg-slate-50 text-xs font-medium text-slate-900 p-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-rose-500 focus:bg-white transition-all placeholder:text-slate-400"
              ></textarea>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* STEP 2: COLOR MANAGEMENT */}
          {/* ========================================================================= */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                  <Palette className="w-5 h-5 text-indigo-600" />
                  <span>Step 2: Color Management</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select predefined colors or add custom colors. Each selected color creates a separate color variant.
                </p>
              </div>
            </div>

            {/* PRESET COLOR CHECKBOXES */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block">
                Select Available Colors:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {[
                  { name: 'Black', hex: '#000000' },
                  { name: 'White', hex: '#FFFFFF' },
                  { name: 'Beige', hex: '#F5F5DC' },
                  { name: 'Pink', hex: '#FFB6C1' },
                  { name: 'Red', hex: '#FF0000' },
                  { name: 'Blue', hex: '#0000FF' }
                ].map((preset) => {
                  const isSelected = colors.some(
                    (c) => c.colorName.toLowerCase() === preset.name.toLowerCase()
                  );

                  return (
                    <label
                      key={preset.name}
                      onClick={(e) => {
                        e.preventDefault();
                        if (isSelected) {
                          if (colors.length <= 1) {
                            alert('Product must have at least one color variant.');
                            return;
                          }
                          setColors(colors.filter((c) => c.colorName.toLowerCase() !== preset.name.toLowerCase()));
                        } else {
                          const newCol: ProductColor = {
                            id: `col-${Date.now()}-${preset.name}`,
                            colorName: preset.name,
                            colorHex: preset.hex,
                            displayImage: '',
                            mainImage: '',
                            galleryImages: [],
                            sizes: ['S', 'M', 'L', 'XL']
                          };
                          setColors([...colors, newCol]);
                        }
                      }}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border transition-all cursor-pointer select-none ${
                        isSelected
                          ? 'bg-white border-indigo-600 ring-2 ring-indigo-500/20 shadow-xs'
                          : 'bg-white/60 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-slate-300 shrink-0"
                        style={{ backgroundColor: preset.hex }}
                      />
                      <span className="text-xs font-bold text-slate-800">{preset.name}</span>
                    </label>
                  );
                })}
              </div>

              {/* CUSTOM COLOR CREATOR */}
              <div className="flex items-center gap-2 pt-3 border-t border-slate-200">
                <input
                  type="text"
                  placeholder="Custom Color Name (e.g. Lavender)"
                  value={customColorName}
                  onChange={(e) => setCustomColorName(e.target.value)}
                  className="flex-1 sm:w-48 bg-white p-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none"
                />
                <input
                  type="color"
                  value={customColorHex}
                  onChange={(e) => setCustomColorHex(e.target.value)}
                  className="w-9 h-9 rounded-xl cursor-pointer border-0 p-0 shrink-0"
                  title="Choose HEX Color"
                />
                <button
                  type="button"
                  onClick={handleAddNewColor}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1 shadow-xs whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Custom Color</span>
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* STEP 3 & STEP 4: IMAGES & SIZES FOR EACH COLOR */}
          {/* ========================================================================= */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-600" />
                <span>Step 3 &amp; 4: Images &amp; Sizes for Each Color</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Configure Main Image, Gallery Images, and Sizes independently for each selected color variant.
              </p>
            </div>

            {/* LIST OF COLOR CARDS */}
            <div className="space-y-6">
              {colors.map((col, colIdx) => {
                const isEditing = activeColorEditId === col.id;
                const colSizes = col.sizes || ['S', 'M', 'L'];
                const colGallery = col.galleryImages || [];

                return (
                  <div
                    key={col.id}
                    className={`rounded-2xl border transition-all ${
                      isEditing ? 'bg-slate-50/80 border-indigo-500 ring-2 ring-indigo-500/10' : 'bg-white border-slate-200'
                    }`}
                  >
                    {/* Color Card Header */}
                    <div className="p-4 flex items-center justify-between border-b border-slate-200/80">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-6 h-6 rounded-full border border-slate-300 shadow-xs shrink-0"
                          style={{ backgroundColor: col.colorHex || '#000' }}
                        />
                        <span className="font-extrabold text-sm text-slate-900">{col.colorName}</span>
                        <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                          {col.colorHex}
                        </span>
                        <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                          {colSizes.length} Sizes ({colSizes.join(', ')})
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveColorEditId(isEditing ? null : col.id)}
                          className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-lg transition cursor-pointer"
                        >
                          {isEditing ? 'Collapse' : 'Configure Photos & Sizes'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteColor(col.id)}
                          className="p-1.5 text-rose-400 hover:text-rose-600 transition"
                          title="Delete Color"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Color Details & Photos Editor */}
                    {isEditing && (
                      <div className="p-5 space-y-5">
                        {/* STEP 3: IMAGES FOR EACH COLOR */}
                        <div className="space-y-3">
                          <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block">
                            Step 3: Images for {col.colorName}
                          </span>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Color Main Product Image */}
                            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
                              <span className="text-[11px] font-extrabold text-emerald-700 uppercase tracking-wider block">
                                Main Hero Image ({col.colorName}-main.jpg) *
                              </span>
                              <div className="flex items-center gap-3">
                                <div className="w-16 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 relative shrink-0">
                                  <img src={col.mainImage} alt={col.colorName} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 space-y-2">
                                  <label className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition">
                                    <UploadCloud className="w-3.5 h-3.5" />
                                    <span>Upload Main Photo</span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => {
                                        if (e.target.files?.[0]) handleUploadColorMainImage(col.id, e.target.files[0]);
                                      }}
                                    />
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Or paste image URL..."
                                    value={col.mainImage}
                                    onChange={(e) => handleUpdateColorField(col.id, 'mainImage', e.target.value)}
                                    className="w-full bg-slate-50 p-1.5 text-[11px] font-medium border border-slate-200 rounded-lg outline-none"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Color Swatch Display Image */}
                            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
                              <span className="text-[11px] font-extrabold text-indigo-700 uppercase tracking-wider block">
                                Swatch Thumbnail
                              </span>
                              <div className="flex items-center gap-3">
                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 relative shrink-0">
                                  <img src={col.displayImage} alt={col.colorName} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 space-y-2">
                                  <label className="inline-flex items-center gap-1.5 bg-zinc-900 hover:bg-black text-white px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition">
                                    <UploadCloud className="w-3.5 h-3.5" />
                                    <span>Upload Swatch Image</span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => {
                                        if (e.target.files?.[0]) handleUploadColorDisplayImage(col.id, e.target.files[0]);
                                      }}
                                    />
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Or paste image URL..."
                                    value={col.displayImage}
                                    onChange={(e) => handleUpdateColorField(col.id, 'displayImage', e.target.value)}
                                    className="w-full bg-slate-50 p-1.5 text-[11px] font-medium border border-slate-200 rounded-lg outline-none"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Gallery Images */}
                          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider block">
                                Gallery Images for {col.colorName} ({colGallery.length} Images)
                              </span>
                              <label className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-bold text-xs cursor-pointer">
                                <Plus className="w-3.5 h-3.5" />
                                <span>Upload Gallery Photos</span>
                                <input
                                  type="file"
                                  multiple
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    if (e.target.files) handleUploadColorGalleryImages(col.id, e.target.files);
                                  }}
                                />
                              </label>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {colGallery.length === 0 ? (
                                <div className="w-full py-3 text-center text-slate-400 text-xs font-medium border border-dashed border-slate-200 rounded-xl">
                                  No gallery images added yet. Upload or paste image URLs below.
                                </div>
                              ) : (
                                colGallery.map((img, imgIdx) => (
                                  <div key={imgIdx} className="relative w-16 h-20 rounded-xl overflow-hidden border border-slate-200 group bg-slate-100 shrink-0">
                                    <img src={img} alt={`Gallery ${imgIdx}`} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/75 text-white flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition cursor-pointer p-1">
                                      {imgIdx > 0 && (
                                        <button
                                          type="button"
                                          title="Move Left"
                                          onClick={() => {
                                            const updated = [...colGallery];
                                            const temp = updated[imgIdx - 1];
                                            updated[imgIdx - 1] = updated[imgIdx];
                                            updated[imgIdx] = temp;
                                            handleUpdateColorField(col.id, 'galleryImages', updated);
                                          }}
                                          className="p-1 hover:bg-white/20 rounded"
                                        >
                                          ←
                                        </button>
                                      )}
                                      <button
                                        type="button"
                                        title="Delete Image"
                                        onClick={() => {
                                          const updated = colGallery.filter((_, i) => i !== imgIdx);
                                          handleUpdateColorField(col.id, 'galleryImages', updated);
                                        }}
                                        className="p-1 text-rose-400 hover:text-rose-200"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                      {imgIdx < colGallery.length - 1 && (
                                        <button
                                          type="button"
                                          title="Move Right"
                                          onClick={() => {
                                            const updated = [...colGallery];
                                            const temp = updated[imgIdx + 1];
                                            updated[imgIdx + 1] = updated[imgIdx];
                                            updated[imgIdx] = temp;
                                            handleUpdateColorField(col.id, 'galleryImages', updated);
                                          }}
                                          className="p-1 hover:bg-white/20 rounded"
                                        >
                                          →
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>

                            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                              <input
                                type="text"
                                placeholder={`Paste Image URL for ${col.colorName} gallery...`}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    const val = (e.target as HTMLInputElement).value.trim();
                                    if (val) {
                                      handleUpdateColorField(col.id, 'galleryImages', [...colGallery, val]);
                                      (e.target as HTMLInputElement).value = '';
                                    }
                                  }
                                }}
                                className="flex-1 bg-slate-50 p-1.5 rounded-lg border border-slate-200 text-[11px] font-medium outline-none"
                              />
                              <span className="text-[10px] text-slate-400 font-medium">Press Enter to add</span>
                            </div>
                          </div>
                        </div>

                        {/* STEP 4: SIZE MANAGEMENT */}
                        <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
                          <span className="text-xs font-extrabold text-purple-700 uppercase tracking-wider block">
                            Step 4: Select Required Sizes for {col.colorName}
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {['S', 'M', 'L', 'XL', '2XL', '32', '34', '36', '38', 'Free Size'].map((sz) => {
                              const isChecked = colSizes.includes(sz);
                              return (
                                <button
                                  type="button"
                                  key={sz}
                                  onClick={() => handleToggleColorSize(col.id, sz)}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                                    isChecked ? 'bg-purple-900 text-white border-purple-900 shadow-xs' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                                  }`}
                                >
                                  {isChecked ? `✓ ${sz}` : `+ ${sz}`}
                                </button>
                              );
                            })}
                          </div>

                          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                            <input
                              type="text"
                              placeholder="Add custom size (e.g. 40D)..."
                              value={customSizeAdd}
                              onChange={(e) => setCustomSizeAdd(e.target.value)}
                              className="w-48 bg-slate-50 p-1.5 rounded-lg border border-slate-200 text-xs font-bold outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => handleAddCustomSizeToColor(col.id)}
                              className="px-3 py-1.5 bg-purple-600 text-white text-xs font-bold rounded-lg hover:bg-purple-700 transition"
                            >
                              + Add Size
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* STEP 7: VARIANT TABLE IN ADMIN */}
          {/* ========================================================================= */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-600" />
                  <span>Step 7: Variant Table ({generatedVariants.length} Combinations)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Displays all variants with Color, Size, Price (Step 5), Stock (Step 6), Main Image checkmark, and Gallery image count.
                </p>
              </div>

              {/* Bulk Apply Bar */}
              <div className="flex items-center gap-2 flex-wrap bg-slate-100 p-2 rounded-2xl border border-slate-200">
                <input
                  type="number"
                  placeholder="Bulk Sale ₹"
                  value={bulkPriceInput}
                  onChange={(e) => setBulkPriceInput(e.target.value ? Number(e.target.value) : '')}
                  className="w-24 bg-white p-1.5 text-xs font-bold border border-slate-300 rounded-xl outline-none"
                />
                <input
                  type="number"
                  placeholder="Bulk Stock"
                  value={bulkStockInput}
                  onChange={(e) => setBulkStockInput(e.target.value ? Number(e.target.value) : '')}
                  className="w-24 bg-white p-1.5 text-xs font-bold border border-slate-300 rounded-xl outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyBulkVariantValues}
                  className="px-3 py-1.5 bg-zinc-900 hover:bg-black text-white text-xs font-bold rounded-xl transition cursor-pointer whitespace-nowrap"
                >
                  Apply All
                </button>
              </div>
            </div>

            {/* VARIANT MATRIX TABLE (EXACT ADMIN MATRIX SPEC) */}
            <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-600">
                    <th className="p-3">Color</th>
                    <th className="p-3">Size</th>
                    <th className="p-3">Sale Price ₹</th>
                    <th className="p-3">Regular Price ₹</th>
                    <th className="p-3">Cost Price ₹</th>
                    <th className="p-3">Stock</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Main Image</th>
                    <th className="p-3">Gallery</th>
                    <th className="p-3">SKU</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs">
                  {generatedVariants.map((v) => {
                    const parentColorObj = colors.find(
                      (c) => c.colorName.toLowerCase() === (v.color || '').toLowerCase()
                    );
                    const galleryCount = parentColorObj?.galleryImages?.length || v.galleryImages?.length || 0;

                    return (
                      <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                        {/* Color */}
                        <td className="p-3 font-extrabold text-slate-900 flex items-center gap-2 whitespace-nowrap">
                          <span
                            className="w-4 h-4 rounded-full border border-slate-300 inline-block shrink-0"
                            style={{ backgroundColor: parentColorObj?.colorHex || '#000' }}
                          />
                          <span>{v.color}</span>
                        </td>

                        {/* Size */}
                        <td className="p-3 whitespace-nowrap">
                          <span className="px-2.5 py-1 bg-purple-50 text-purple-900 font-extrabold rounded-lg border border-purple-200">
                            {v.size}
                          </span>
                        </td>

                        {/* Sale Price */}
                        <td className="p-3 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <span className="text-slate-400 font-bold">₹</span>
                            <input
                              type="number"
                              value={v.price}
                              onChange={(e) => handleUpdateVariantField(v.id, 'price', Number(e.target.value))}
                              className="w-20 bg-emerald-50 text-emerald-900 p-1.5 border border-emerald-200 rounded-lg text-xs font-extrabold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                          </div>
                        </td>

                        {/* Regular Price */}
                        <td className="p-3 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <span className="text-slate-400 font-bold">₹</span>
                            <input
                              type="number"
                              value={v.originalPrice}
                              onChange={(e) => handleUpdateVariantField(v.id, 'originalPrice', Number(e.target.value))}
                              className="w-20 bg-slate-50 text-slate-900 p-1.5 border border-slate-200 rounded-lg text-xs font-bold focus:outline-none"
                            />
                          </div>
                        </td>

                        {/* Cost Price */}
                        <td className="p-3 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <span className="text-slate-400 font-bold">₹</span>
                            <input
                              type="number"
                              value={v.costPrice || 0}
                              onChange={(e) => handleUpdateVariantField(v.id, 'costPrice', Number(e.target.value))}
                              className="w-20 bg-slate-50 text-slate-600 p-1.5 border border-slate-200 rounded-lg text-xs font-bold focus:outline-none"
                            />
                          </div>
                        </td>

                        {/* Stock Management */}
                        <td className="p-3 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={v.stock}
                              onChange={(e) => {
                                const newStock = Number(e.target.value);
                                handleUpdateVariantField(v.id, 'stock', newStock);
                                if (newStock === 0) {
                                  handleUpdateVariantField(v.id, 'status', 'Out of Stock');
                                }
                              }}
                              className={`w-16 p-1.5 border rounded-lg text-xs font-extrabold focus:outline-none ${
                                v.stock === 0
                                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                                  : 'bg-slate-50 text-slate-900 border-slate-200'
                              }`}
                            />
                          </div>
                        </td>

                        {/* Status Toggle */}
                        <td className="p-3 whitespace-nowrap">
                          <select
                            value={v.status || (v.stock === 0 ? 'Out of Stock' : 'Active')}
                            onChange={(e) => handleUpdateVariantField(v.id, 'status', e.target.value)}
                            className="bg-slate-50 text-[11px] font-bold text-slate-800 p-1.5 rounded-lg border border-slate-200 cursor-pointer"
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Out of Stock">Out of Stock</option>
                          </select>
                        </td>

                        {/* Main Image Indicator */}
                        <td className="p-3 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <img
                              src={v.image || parentColorObj?.mainImage || parentColorObj?.displayImage || parentColorObj?.galleryImages?.[0] || ''}
                              alt={v.color}
                              className="w-8 h-10 object-cover rounded-md border border-slate-200 shrink-0"
                            />
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold" title="Main Image Uploaded">
                              ✓
                            </span>
                          </div>
                        </td>

                        {/* Gallery Count */}
                        <td className="p-3 whitespace-nowrap">
                          <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-bold rounded-lg border border-slate-200">
                            {galleryCount} {galleryCount === 1 ? 'Image' : 'Images'}
                          </span>
                        </td>

                        {/* SKU */}
                        <td className="p-3 font-mono font-bold text-slate-700 whitespace-nowrap">
                          <input
                            type="text"
                            value={v.sku}
                            onChange={(e) => handleUpdateVariantField(v.id, 'sku', e.target.value)}
                            className="w-32 bg-slate-50 p-1.5 border border-slate-200 rounded-lg text-xs font-mono font-bold"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION 5: DYNAMIC DESCRIPTION CARDS */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-indigo-600" />
                <span>5. Dynamic Description Cards</span>
              </h3>
              <button
                type="button"
                onClick={() => {
                  const newCard: ProductDescriptionCard = {
                    id: `card-${Date.now()}`,
                    title: "New Feature Card",
                    description: "Card description text details...",
                    image: "",
                    sortOrder: descriptionCards.length + 1
                  };
                  setDescriptionCards([...descriptionCards, newCard]);
                }}
                className="px-3 py-1.5 bg-black text-white text-xs font-bold rounded-xl hover:bg-neutral-800 transition cursor-pointer"
              >
                + Add Card
              </button>
            </div>

            <div className="space-y-4">
              {descriptionCards.map((card, idx) => (
                <div key={card.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Card #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => setDescriptionCards(descriptionCards.filter((c) => c.id !== card.id))}
                      className="text-rose-500 hover:text-rose-700 text-xs font-bold"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Title</label>
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          setDescriptionCards(descriptionCards.map((c) => (c.id === card.id ? { ...c, title: val } : c)));
                        }}
                        className="w-full bg-white p-2 text-xs border border-slate-200 rounded-lg outline-none font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Image URL</label>
                      <input
                        type="text"
                        value={card.image}
                        onChange={(e) => {
                          const val = e.target.value;
                          setDescriptionCards(descriptionCards.map((c) => (c.id === card.id ? { ...c, image: val } : c)));
                        }}
                        className="w-full bg-white p-2 text-xs border border-slate-200 rounded-lg outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={card.description}
                      onChange={(e) => {
                        const val = e.target.value;
                        setDescriptionCards(descriptionCards.map((c) => (c.id === card.id ? { ...c, description: val } : c)));
                      }}
                      className="w-full bg-white p-2 text-xs border border-slate-200 rounded-lg outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SIZE GUIDES, TAXONOMIES, BADGES & PUBLISH CONTROL */}
        <div className="space-y-6">
          {/* CATEGORY SIZE GUIDE SELECTOR & INLINE CREATION */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <Ruler className="w-5 h-5 text-indigo-600" />
                <span>Category Size Guide</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowCreateSizeGuideModal(true)}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Create Size Guide</span>
              </button>
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-1">
                Assigned Product Size Guide
              </label>
              <select
                value={selectedSizeGuideId}
                onChange={(e) => setSelectedSizeGuideId(e.target.value)}
                className="w-full bg-slate-50 text-xs font-bold text-slate-800 p-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="">-- No Size Guide Assigned --</option>
                {sizeGuidesList.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.title} ({(g.categoryIds || []).join(', ')})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* PUBLISH CONTROL */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2 border-b border-slate-100 pb-3">
              <Globe className="w-5 h-5 text-rose-500" />
              <span>Publishing Status</span>
            </h3>

            <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-2">
              <label className="inline-flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 text-rose-600 focus:ring-rose-500 cursor-pointer"
                />
                <span className="text-md font-black text-slate-900">
                  Publish to Storefront
                </span>
              </label>
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-1">
                Admin Visibility Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-slate-50 text-xs font-bold text-slate-800 p-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-rose-500 cursor-pointer"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Hidden">Hidden</option>
              </select>
            </div>
          </div>

          {/* CATEGORIES & BRAND */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2 border-b border-slate-100 pb-3">
              <Tag className="w-5 h-5 text-indigo-600" />
              <span>Taxonomy &amp; Brand</span>
            </h3>

            <div>
              <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-1">
                Categories (Select Multiple)
              </label>
              <div className="space-y-1.5 max-h-40 overflow-y-auto p-3 bg-slate-50 rounded-2xl border border-slate-200">
                {MOCK_CATEGORIES.map((c) => {
                  const isChecked = selectedCategories.includes(c.name);
                  return (
                    <label key={c.id} className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCategories([...selectedCategories, c.name]);
                          } else {
                            setSelectedCategories(selectedCategories.filter((x) => x !== c.name));
                          }
                        }}
                        className="rounded border-slate-300 text-rose-600"
                      />
                      <span>{c.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-1">
                Subcategory
              </label>
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="w-full bg-slate-50 text-xs font-bold text-slate-800 p-3 rounded-2xl border border-slate-200 cursor-pointer"
              >
                {MOCK_SUBCATEGORIES.filter((s) => selectedCategories.length === 0 || selectedCategories.includes(s.categoryName)).map((sub) => (
                  <option key={sub.id} value={sub.name}>
                    {sub.name} ({sub.categoryName})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-1">
                Brand
              </label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full bg-slate-50 text-xs font-bold text-slate-800 p-3 rounded-2xl border border-slate-200 cursor-pointer"
              >
                {MOCK_BRANDS.map((b) => (
                  <option key={b.id} value={b.name}>{b.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* INLINE CREATE SIZE GUIDE MODAL */}
      {/* ========================================== */}
      {showCreateSizeGuideModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Ruler className="w-5 h-5 text-indigo-600" />
                <span>Create New Category Size Guide</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowCreateSizeGuideModal(false)}
                className="text-slate-400 hover:text-slate-900 font-bold text-xs"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-extrabold text-slate-700 block mb-1">Size Guide Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Women's Bralette Fit &amp; Cup Guide"
                  value={newGuideTitle}
                  onChange={(e) => setNewGuideTitle(e.target.value)}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-bold outline-none"
                />
              </div>

              <div>
                <label className="font-extrabold text-slate-700 block mb-1">Description / Fitting Note</label>
                <input
                  type="text"
                  placeholder="e.g. Measure around full bust and underbust for ideal cup size..."
                  value={newGuideDesc}
                  onChange={(e) => setNewGuideDesc(e.target.value)}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="font-extrabold text-slate-700 block mb-1">Default Measurement Unit</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer font-bold">
                    <input
                      type="radio"
                      name="unit"
                      checked={newGuideUnit === 'cm'}
                      onChange={() => setNewGuideUnit('cm')}
                      className="text-indigo-600"
                    />
                    <span>Centimeters (cm)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-bold">
                    <input
                      type="radio"
                      name="unit"
                      checked={newGuideUnit === 'in'}
                      onChange={() => setNewGuideUnit('in')}
                      className="text-indigo-600"
                    />
                    <span>Inches (in)</span>
                  </label>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateSizeGuideModal(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveInlineSizeGuide}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Save &amp; Assign to Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CARD PREVIEW MODAL */}
      {showCardPreview && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                Live Storefront Card Preview
              </span>
              <button
                type="button"
                onClick={() => setShowCardPreview(false)}
                className="text-slate-400 hover:text-slate-900 font-bold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-md space-y-3 p-3">
              <div className="aspect-square rounded-xl overflow-hidden bg-slate-100 relative">
                <img
                  src={mainImage || colors[0]?.displayImage || colors[0]?.mainImage || colors[0]?.galleryImages?.[0] || galleryImages[0] || ''}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">{name || 'Product Title Preview'}</h4>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{shortDescription || 'Short description preview text...'}</p>
                <div className="flex items-center justify-between mt-3">
                  <div>
                    <span className="text-base font-black text-rose-600">₹{salePrice}</span>
                    {regularPrice > salePrice && (
                      <span className="text-xs text-slate-400 line-through ml-2 font-semibold">
                        ₹{regularPrice}
                      </span>
                    )}
                  </div>
                  <button type="button" className="bg-zinc-900 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-xs">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DETAIL PAGE PREVIEW MODAL */}
      {showDetailPreview && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                Live Product Details Page Preview
              </span>
              <button
                type="button"
                onClick={() => setShowDetailPreview(false)}
                className="text-slate-400 hover:text-slate-900 font-bold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <img
                src={mainImage || colors[0]?.mainImage || colors[0]?.displayImage || colors[0]?.galleryImages?.[0] || galleryImages[0] || ''}
                alt={name}
                className="w-full aspect-square object-cover rounded-2xl border border-slate-200"
              />

              <div className="space-y-3 text-xs">
                <span className="text-[10px] font-extrabold text-rose-600 uppercase tracking-wider">{brand} • {selectedCategories[0]}</span>
                <h3 className="text-lg font-black text-slate-900 leading-tight">{name || 'Product Title'}</h3>
                <div>
                  <span className="text-xl font-extrabold text-rose-600">₹{salePrice}</span>
                  {regularPrice > salePrice && (
                    <span className="text-xs text-slate-400 line-through ml-2">₹{regularPrice}</span>
                  )}
                </div>
                <p className="text-slate-600 leading-relaxed">{fullDescription || shortDescription || 'Full description text preview...'}</p>
                <div className="pt-2">
                  <button type="button" className="w-full bg-zinc-900 text-white font-bold py-3 rounded-2xl text-xs shadow-md">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};
