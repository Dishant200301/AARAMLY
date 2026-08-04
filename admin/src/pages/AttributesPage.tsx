import React, { useState } from 'react';
import { Layers, Plus, Trash2, Edit2, Palette, Sparkles, X, Check } from 'lucide-react';
import { MOCK_ATTRIBUTES } from '../data/mockAdminData';
import { Attribute, AttributeValue } from '../types/admin';

export const AttributesPage: React.FC = () => {
  const [attributes, setAttributes] = useState<Attribute[]>(MOCK_ATTRIBUTES);
  const [showAddModal, setShowAddModal] = useState(false);

  // New attribute form state
  const [newAttrName, setNewAttrName] = useState('');
  const [newDisplayType, setNewDisplayType] = useState<'swatch' | 'button' | 'select'>('button');
  const [newValueInput, setNewValueInput] = useState('');
  const [newHexInput, setNewHexInput] = useState('#000000');
  const [tempValues, setTempValues] = useState<AttributeValue[]>([]);

  // Add temp value
  const handleAddTempValue = () => {
    if (!newValueInput.trim()) return;
    const valObj: AttributeValue = {
      id: `val-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      value: newValueInput.trim(),
      hexCode: newDisplayType === 'swatch' ? newHexInput : undefined
    };
    setTempValues((prev) => [...prev, valObj]);
    setNewValueInput('');
  };

  // Remove temp value
  const handleRemoveTempValue = (id: string) => {
    setTempValues((prev) => prev.filter((v) => v.id !== id));
  };

  // Save attribute
  const handleCreateAttribute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAttrName.trim() || tempValues.length === 0) return;

    const newAttr: Attribute = {
      id: `attr-${Date.now()}`,
      name: newAttrName.trim(),
      displayType: newDisplayType,
      values: tempValues
    };

    MOCK_ATTRIBUTES.push(newAttr);
    setAttributes([...MOCK_ATTRIBUTES]);
    setShowAddModal(false);
    setNewAttrName('');
    setNewDisplayType('button');
    setTempValues([]);
  };

  // Delete attribute
  const handleDeleteAttribute = (id: string) => {
    if (window.confirm('Are you sure you want to delete this attribute? Products using it will retain historical variations.')) {
      const idx = MOCK_ATTRIBUTES.findIndex((a) => a.id === id);
      if (idx !== -1) {
        MOCK_ATTRIBUTES.splice(idx, 1);
      }
      setAttributes([...MOCK_ATTRIBUTES]);
    }
  };

  return (
    <div className="space-y-6 font-sans selection:bg-rose-500 selection:text-white">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Layers className="w-7 h-7 text-indigo-600" />
            <span>Attributes & Swatches System</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Define global product attributes (Colors, Sizes, Materials, Fabrics) to power the automatic matrix variant generator.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-zinc-900 hover:bg-black text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-rose-400" />
          <span>Create New Attribute</span>
        </button>
      </div>

      {/* ATTRIBUTES LIST */}
      <div className="grid grid-cols-1 gap-6">
        {attributes.map((attr) => (
          <div key={attr.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                  <span>{attr.name}</span>
                  <span className="text-[10px] font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200 uppercase tracking-wider">
                    {attr.displayType} display
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {attr.values.length} predefined options available
                </p>
              </div>

              <button
                onClick={() => handleDeleteAttribute(attr.id)}
                title="Delete Attribute"
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Values Pill Matrix */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {attr.values.map((v) => (
                <div
                  key={v.id}
                  className="px-3.5 py-2 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-2.5 text-xs shadow-2xs font-bold text-slate-800"
                >
                  {v.hexCode && (
                    <span
                      className="w-4 h-4 rounded-full border border-slate-300 shadow-xs flex-shrink-0"
                      style={{ backgroundColor: v.hexCode }}
                    ></span>
                  )}
                  <span>{v.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ADD ATTRIBUTE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-rose-400" />
                <h3 className="text-base font-extrabold">Create Global Attribute</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAttribute} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-1">
                  Attribute Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Color, Size, Material, Pattern"
                  value={newAttrName}
                  onChange={(e) => setNewAttrName(e.target.value)}
                  className="w-full bg-slate-50 text-xs font-medium text-slate-900 p-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-rose-500 focus:bg-white transition-all"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-1">
                  Display Type
                </label>
                <select
                  value={newDisplayType}
                  onChange={(e) => setNewDisplayType(e.target.value as any)}
                  className="w-full bg-slate-50 text-xs font-bold text-slate-800 p-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-rose-500 cursor-pointer"
                >
                  <option value="swatch">Color Swatch (Visual Circles with Hex Code)</option>
                  <option value="button">Pill Button (Standard Size & Option Buttons)</option>
                  <option value="select">Dropdown Select List</option>
                </select>
              </div>

              {/* Add Values Box */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block">
                  Add Attribute Values
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Black, White, Lace, 36C..."
                    value={newValueInput}
                    onChange={(e) => setNewValueInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTempValue();
                      }
                    }}
                    className="flex-1 bg-white text-xs text-slate-900 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500"
                  />

                  {newDisplayType === 'swatch' && (
                    <input
                      type="color"
                      value={newHexInput}
                      onChange={(e) => setNewHexInput(e.target.value)}
                      className="w-10 h-10 rounded-xl border border-slate-200 p-1 cursor-pointer bg-white"
                      title="Pick Hex Color"
                    />
                  )}

                  <button
                    type="button"
                    onClick={handleAddTempValue}
                    className="bg-slate-900 hover:bg-black text-white px-3.5 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Add
                  </button>
                </div>

                {/* Added pills preview */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {tempValues.map((tv) => (
                    <span
                      key={tv.id}
                      className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-2"
                    >
                      {tv.hexCode && (
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-slate-300"
                          style={{ backgroundColor: tv.hexCode }}
                        ></span>
                      )}
                      <span>{tv.value}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTempValue(tv.id)}
                        className="text-slate-400 hover:text-rose-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newAttrName.trim() || tempValues.length === 0}
                  className="bg-rose-500 hover:bg-rose-600 disabled:bg-slate-300 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Attribute</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
