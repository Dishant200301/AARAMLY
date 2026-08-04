import React from 'react';
import { Users, Mail, Phone } from 'lucide-react';
import { MOCK_CUSTOMERS } from '../data/mockAdminData';

export const CustomersPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-amber-500" />
          <span>Customer Relationship Management (CRM)</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase">
                <th className="pb-3">Customer Name</th>
                <th className="pb-3">Contact</th>
                <th className="pb-3">Total Orders</th>
                <th className="pb-3">Lifetime Value</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_CUSTOMERS.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 font-extrabold text-slate-900">{c.name}</td>
                  <td className="py-3.5">
                    <p className="text-slate-800 font-medium flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400"/> {c.email}</p>
                    <p className="text-[10px] text-slate-500 flex items-center gap-1"><Phone className="w-3 h-3 text-slate-400"/> {c.phone}</p>
                  </td>
                  <td className="py-3.5 font-bold text-slate-800">{c.ordersCount} orders</td>
                  <td className="py-3.5 font-extrabold text-emerald-600">₹{c.totalSpent}</td>
                  <td className="py-3.5">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-slate-500 font-medium">{c.joinedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
