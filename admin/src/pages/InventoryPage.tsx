import React, { useState } from 'react';
import { PackageCheck } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockAdminData';

export const InventoryPage: React.FC = () => {
  const [products, setProducts] = useState(MOCK_PRODUCTS);

  const handleStockChange = (productId: string, newStock: number) => {
    setProducts(products.map(p => p.id === productId ? { ...p, stock: newStock } : p));
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <PackageCheck className="w-5 h-5 text-emerald-600" />
          <span>Warehouse & Live Inventory Control</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase">
                <th className="pb-3">Product Name</th>
                <th className="pb-3">SKU</th>
                <th className="pb-3">Warehouse Location</th>
                <th className="pb-3">Current Stock</th>
                <th className="pb-3">Stock Status</th>
                <th className="pb-3 text-right">Quick Stock Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 font-bold text-slate-900">{p.name}</td>
                  <td className="py-3.5 font-mono text-slate-500">{p.sku}</td>
                  <td className="py-3.5 text-slate-700 font-medium">MAIN-WH-01</td>
                  <td className="py-3.5 font-bold text-slate-900">{p.stock} units</td>
                  <td className="py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                      p.stock < 20 ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {p.stock < 20 ? 'Low Stock' : 'In Stock'}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <input
                      type="number"
                      value={p.stock}
                      onChange={(e) => handleStockChange(p.id, Number(e.target.value))}
                      className="w-20 bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold rounded-xl px-2 py-1 focus:outline-none focus:border-rose-500 text-center"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
