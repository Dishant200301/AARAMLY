import React from 'react';
import { BarChart3 } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-rose-500" />
            <span>Sales & Conversion Analytics</span>
          </h3>
          <p className="text-xs text-slate-500">Real-time store performance metrics & conversion funnel.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <p className="text-xs text-slate-500 font-semibold">Average Order Value (AOV)</p>
            <h4 className="text-2xl font-extrabold text-slate-900 mt-1">₹1,193</h4>
            <p className="text-[10px] text-emerald-600 mt-1 font-bold">+4.2% this week</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <p className="text-xs text-slate-500 font-semibold">Store Conversion Rate</p>
            <h4 className="text-2xl font-extrabold text-slate-900 mt-1">3.42%</h4>
            <p className="text-[10px] text-emerald-600 mt-1 font-bold">+0.8% higher than average</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <p className="text-xs text-slate-500 font-semibold">Cart Abandonment Rate</p>
            <h4 className="text-2xl font-extrabold text-amber-600 mt-1">28.4%</h4>
            <p className="text-[10px] text-slate-500 mt-1 font-medium">Recovery emails active</p>
          </div>
        </div>
      </div>
    </div>
  );
};
