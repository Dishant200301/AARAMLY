import React from 'react';
import { Settings } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Settings className="w-5 h-5 text-slate-700" />
            <span>Store Configuration & Security</span>
          </h3>
          <p className="text-xs text-slate-500">Payment gateways, tax rules, currency, and RBAC permissions.</p>
        </div>

        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <p className="font-extrabold text-slate-900">Razorpay Payment Gateway Integration</p>
              <p className="text-[10px] text-slate-500 font-medium">Live API Key configured in MySQL server environment</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Active
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <p className="font-extrabold text-slate-900">Role-Based Access Control (RBAC)</p>
              <p className="text-[10px] text-slate-500 font-medium">Super Admin, Catalog Manager, Order Fulfillment Manager</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Enforced
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
