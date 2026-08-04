import React, { useState } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  PlusCircle,
  Eye,
  Tag,
  Award,
  Sliders,
  Layers,
  Warehouse,
  ShoppingCart,
  SlidersHorizontal,
  Image as ImageIcon,
  FileText,
  BookOpen,
  HelpCircle,
  Settings,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onNavigate?: (tab: string, productId?: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onNavigate }) => {
  // State for collapsible parent menus
  const [isProductsExpanded, setIsProductsExpanded] = useState(true);
  const [isContentExpanded, setIsContentExpanded] = useState(false);

  const isProductsChildActive = [
    'all-products',
    'add-product',
    'product-details',
    'categories',
    'brands',
    'attributes',
    'filters',
    'variants',
    'inventory',
    'products',
    'product-management'
  ].includes(activeTab);

  const isContentChildActive = [
    'hero-slider',
    'homepage-banners',
    'content-pages',
    'content-blog',
    'content-faq'
  ].includes(activeTab);

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen sticky top-0 flex flex-col justify-between z-30 font-sans selection:bg-black selection:text-white shrink-0">
      <div>
        {/* LOGO HEADER */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src={`${import.meta.env.BASE_URL}images/home/logo.png`.replace(/\/+/g, '/')} alt="Aaramly Logo" className="h-7 w-auto object-contain" />
            <img src={`${import.meta.env.BASE_URL}images/home/aaramly_text_logo.png`.replace(/\/+/g, '/')} alt="AARAMLY" className="h-5 w-auto object-contain" />
            <span className="text-[10px] font-extrabold tracking-wider uppercase text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200 ml-1">
              Admin
            </span>
          </div>
        </div>

        {/* NAVIGATION TREE */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-170px)] text-xs font-semibold">
          {/* 1. DASHBOARD */}
          <button
            type="button"
            onClick={() => {
              if (onNavigate) onNavigate('dashboard');
              else setActiveTab('dashboard');
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-zinc-900 text-white font-extrabold shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <LayoutDashboard className={`w-4 h-4 ${activeTab === 'dashboard' ? 'text-rose-400' : 'text-slate-400'}`} />
            <span>Dashboard</span>
          </button>

          {/* 2. PRODUCTS PARENT MENU (EXPANDABLE) */}
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => setIsProductsExpanded(!isProductsExpanded)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                isProductsChildActive && !isProductsExpanded
                  ? 'bg-slate-100 text-slate-900 font-extrabold'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 font-bold'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 text-indigo-600" />
                <span>Products</span>
              </div>
              {isProductsExpanded ? (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            {/* PRODUCTS SUBMENU ITEMS */}
            {isProductsExpanded && (
              <div className="pl-4 space-y-0.5 border-l-2 border-slate-100 ml-4 py-1">
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) onNavigate('all-products');
                    else setActiveTab('all-products');
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    activeTab === 'all-products' || activeTab === 'products'
                      ? 'bg-indigo-50 text-indigo-700 font-extrabold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-indigo-500" />
                  <span>All Products</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) onNavigate('add-product', undefined);
                    else setActiveTab('add-product');
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    activeTab === 'add-product'
                      ? 'bg-indigo-50 text-indigo-700 font-extrabold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <PlusCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Add Product</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('product-details')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    activeTab === 'product-details'
                      ? 'bg-indigo-50 text-indigo-700 font-extrabold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5 text-amber-500" />
                  <span>Product Details</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('categories')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    activeTab === 'categories'
                      ? 'bg-indigo-50 text-indigo-700 font-extrabold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Tag className="w-3.5 h-3.5 text-rose-500" />
                  <span>Categories</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('brands')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    activeTab === 'brands'
                      ? 'bg-indigo-50 text-indigo-700 font-extrabold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Award className="w-3.5 h-3.5 text-purple-600" />
                  <span>Brands</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('attributes')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    activeTab === 'attributes'
                      ? 'bg-indigo-50 text-indigo-700 font-extrabold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5 text-sky-500" />
                  <span>Attributes</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('filters')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    activeTab === 'filters'
                      ? 'bg-indigo-50 text-indigo-700 font-extrabold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#bf5c30]" />
                  <span>Dynamic Filters</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('variants')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    activeTab === 'variants'
                      ? 'bg-indigo-50 text-indigo-700 font-extrabold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Variants</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('inventory')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    activeTab === 'inventory'
                      ? 'bg-indigo-50 text-indigo-700 font-extrabold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Warehouse className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Inventory</span>
                </button>

                {/* EXPANDABLE SIZE GUIDES MENU */}
                <div className="pt-1">
                  <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50/60 rounded-md mb-1 flex items-center justify-between">
                    <span>Size Guides</span>
                    <span className="text-[9px] bg-indigo-200 text-indigo-900 px-1 rounded">Dynamic</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveTab('all-size-guides')}
                    className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      activeTab === 'all-size-guides' || activeTab === 'size-guides'
                        ? 'bg-indigo-50 text-indigo-700 font-extrabold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <span>• All Size Guides</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('add-size-guide')}
                    className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      activeTab === 'add-size-guide'
                        ? 'bg-indigo-50 text-indigo-700 font-extrabold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <span>• Add Size Guide</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('size-guide-templates')}
                    className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      activeTab === 'size-guide-templates'
                        ? 'bg-indigo-50 text-indigo-700 font-extrabold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <span>• Templates &amp; Matrix</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 3. ORDERS */}
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-zinc-900 text-white font-extrabold shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <ShoppingCart className={`w-4 h-4 ${activeTab === 'orders' ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>Orders</span>
            </div>
            <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
              New
            </span>
          </button>

          {/* 4. CONTENT PARENT MENU (EXPANDABLE) */}
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => setIsContentExpanded(!isContentExpanded)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                isContentChildActive && !isContentExpanded
                  ? 'bg-slate-100 text-slate-900 font-extrabold'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 font-bold'
              }`}
            >
              <div className="flex items-center gap-3">
                <ImageIcon className="w-4 h-4 text-purple-600" />
                <span>Content</span>
              </div>
              {isContentExpanded ? (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            {/* CONTENT SUBMENU ITEMS */}
            {isContentExpanded && (
              <div className="pl-4 space-y-0.5 border-l-2 border-slate-100 ml-4 py-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('hero-slider')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    activeTab === 'hero-slider'
                      ? 'bg-purple-50 text-purple-700 font-extrabold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-purple-500" />
                  <span>Hero Slider</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('homepage-banners')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    activeTab === 'homepage-banners'
                      ? 'bg-purple-50 text-purple-700 font-extrabold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5 text-rose-500" />
                  <span>Homepage Banners</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('content-pages')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    activeTab === 'content-pages'
                      ? 'bg-purple-50 text-purple-700 font-extrabold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Pages</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('content-blog')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    activeTab === 'content-blog'
                      ? 'bg-purple-50 text-purple-700 font-extrabold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                  <span>Blog</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('content-faq')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    activeTab === 'content-faq'
                      ? 'bg-purple-50 text-purple-700 font-extrabold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>FAQ</span>
                </button>
              </div>
            )}
          </div>

          {/* 5. SETTINGS */}
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-zinc-900 text-white font-extrabold shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Settings className={`w-4 h-4 ${activeTab === 'settings' ? 'text-amber-400' : 'text-slate-400'}`} />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      {/* FOOTER STATUS */}
      <div className="p-3 border-t border-slate-200 bg-slate-50/50">
        <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <div>
              <p className="text-[11px] font-extrabold text-slate-900">Database API Sync</p>
              <p className="text-[10px] text-slate-500 font-semibold">Express MySQL Active</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
