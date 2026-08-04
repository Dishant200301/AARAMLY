import React, { useState, useEffect } from 'react';
import { Plus, FolderTree, Trash2, Edit2, CheckCircle2, XCircle, Search, Upload, Check } from 'lucide-react';
import { MOCK_CATEGORIES } from '../data/mockAdminData';
import { Category } from '../types/admin';

const PRESET_IMAGES = [
  { name: 'Bralette 1', url: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?q=80&w=600' },
  { name: 'Seamless 2', url: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=600' },
  { name: 'Accessories', url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600' },
  { name: 'Lingerie GIF 1', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHpucmtscTFic3dpZG96a3Vrdmx0OHptM2Z2ZXQyeGRoazNwdWV1cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlHFRbmaZtBRhXG/giphy.gif' },
  { name: 'Lingerie GIF 2', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDVqNzRreTByZ2xpaGoxOXAxa3Ftbmdzb3B2eGV3ZnFsY2x5eDZvOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT0xeJpnrWC4XWblEk/giphy.gif' }
];

export const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('aaramly_categories');
    return saved ? JSON.parse(saved) : MOCK_CATEGORIES;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Form states
  const [categoryName, setCategoryName] = useState('');
  const [categorySlug, setCategorySlug] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    localStorage.setItem('aaramly_categories', JSON.stringify(categories));
  }, [categories]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setCategoryName(name);
    if (!editingCategory) {
      setCategorySlug(name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  // Local File Upload Handler (Image or GIF)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const openAddModal = () => {
    setEditingCategory(null);
    setCategoryName('');
    setCategorySlug('');
    setDescription('');
    setImageUrl(PRESET_IMAGES[0].url);
    setIsActive(true);
    setShowAddModal(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setCategoryName(cat.name);
    setCategorySlug(cat.slug);
    setDescription((cat as any).description || '');
    setImageUrl((cat as any).imageUrl || PRESET_IMAGES[0].url);
    setIsActive(cat.isActive ?? true);
    setShowAddModal(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    const slugToSave = categorySlug.trim() || categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (editingCategory) {
      setCategories(categories.map(c => c.id === editingCategory.id ? {
        ...c,
        name: categoryName.trim(),
        slug: slugToSave,
        isActive,
        description,
        imageUrl: imageUrl || PRESET_IMAGES[0].url
      } as any : c));
    } else {
      const newCat: any = {
        id: `cat-${Date.now()}`,
        name: categoryName.trim(),
        slug: slugToSave,
        productCount: 0,
        isActive,
        description,
        imageUrl: imageUrl || PRESET_IMAGES[0].url
      };
      setCategories([newCat, ...categories]);
    }

    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const toggleStatus = (id: string) => {
    setCategories(categories.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
  };

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      {/* HEADER & ACTION BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search categories..."
            className="w-full bg-white text-xs text-slate-800 pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 shadow-xs font-medium"
          />
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-zinc-900 hover:bg-black text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* CATEGORIES GRID */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-rose-500" />
            <span>Category & Taxonomy Management ({filteredCategories.length})</span>
          </h3>
        </div>

        {filteredCategories.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            No categories found. Click "Add New Category" to create one.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCategories.map((cat) => (
              <div 
                key={cat.id} 
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                  cat.isActive ? 'bg-slate-50 border-slate-200' : 'bg-slate-100/60 border-slate-200 opacity-75'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={(cat as any).imageUrl || PRESET_IMAGES[0].url} 
                      alt={cat.name} 
                      className="w-14 h-14 rounded-xl object-cover border border-slate-200 bg-white"
                    />
                    <div>
                      <p className="font-extrabold text-slate-900 text-sm">{cat.name}</p>
                      <p className="text-[10px] text-slate-500 font-mono">/category/{cat.slug}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleStatus(cat.id)}
                    title={cat.isActive ? "Deactivate category" : "Activate category"}
                    className="cursor-pointer"
                  >
                    {cat.isActive ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Active</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-200 text-slate-600 border border-slate-300 flex items-center gap-1">
                        <XCircle className="w-3 h-3" />
                        <span>Inactive</span>
                      </span>
                    )}
                  </button>
                </div>

                {(cat as any).description && (
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {(cat as any).description}
                  </p>
                )}

                <div className="flex items-center justify-between border-t border-slate-200/60 pt-3 text-xs">
                  <span className="text-[10px] font-extrabold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                    {cat.productCount} Products
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(cat)}
                      title="Edit Category"
                      className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      title="Delete Category"
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ADD / EDIT CATEGORY MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base">
                {editingCategory ? 'Edit Category' : 'Create New Category'}
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-xs font-bold text-slate-500 hover:text-black px-2.5 py-1 bg-slate-100 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={categoryName}
                  onChange={handleNameChange}
                  placeholder="e.g. Sports Bras & Bralettes"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-semibold focus:outline-none focus:border-rose-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Category Slug</label>
                <input
                  type="text"
                  value={categorySlug}
                  onChange={(e) => setCategorySlug(e.target.value)}
                  placeholder="e.g. sports-bras-bralettes"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-mono text-xs focus:outline-none focus:border-rose-500 focus:bg-white"
                />
              </div>

              {/* IMAGE / GIF SELECTOR & FILE UPLOAD */}
              <div className="space-y-2">
                <label className="block text-slate-700 font-bold">Category Image *</label>
                
                {/* PREVIEW BOX */}
                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <img 
                    src={imageUrl || PRESET_IMAGES[0].url} 
                    alt="Category Preview" 
                    className="w-16 h-16 rounded-xl object-cover border border-slate-300 bg-white"
                  />
                  <div className="flex-1 space-y-1.5">
                    <p className="text-[11px] font-bold text-slate-800">Upload Image / GIF file or pick a preset below:</p>
                    <label className="inline-flex items-center gap-1.5 bg-zinc-900 hover:bg-black text-white text-[11px] font-bold px-3 py-1.5 rounded-lg cursor-pointer transition-all">
                      <Upload className="w-3.5 h-3.5 text-rose-400" />
                      <span>Upload Local File / GIF</span>
                      <input 
                        type="file" 
                        accept="image/*,.gif" 
                        onChange={handleFileUpload} 
                        className="hidden" 
                      />
                    </label>
                  </div>
                </div>

               
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description of products inside this category..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 font-medium focus:outline-none focus:border-rose-500 focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="cat-active"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 text-rose-500 rounded border-slate-300 focus:ring-rose-500"
                />
                <label htmlFor="cat-active" className="text-slate-800 font-bold cursor-pointer">
                  Active (Visible on website store navigation)
                </label>
              </div>

              <div className="flex justify-end pt-3 border-t border-slate-100 gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-zinc-900 hover:bg-black text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md cursor-pointer"
                >
                  {editingCategory ? 'Update Category' : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
