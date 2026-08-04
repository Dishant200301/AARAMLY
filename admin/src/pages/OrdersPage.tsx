import React, { useState } from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { MOCK_ORDERS } from '../data/mockAdminData';
import { Order } from '../types/admin';

export const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const updateOrderStatus = (orderId: string, newStatus: any) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-rose-500" />
          <span>Customer Order Pipeline</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="pb-3">Order #</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Gateway</th>
                <th className="pb-3">Total Amount</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 font-mono font-bold text-slate-900">{ord.orderNumber}</td>
                  <td className="py-3.5">
                    <p className="font-bold text-slate-800">{ord.customerName}</p>
                    <p className="text-[10px] text-slate-500">{ord.customerEmail}</p>
                  </td>
                  <td className="py-3.5 text-slate-500">{ord.date}</td>
                  <td className="py-3.5 font-semibold text-slate-700">{ord.paymentGateway}</td>
                  <td className="py-3.5 font-extrabold text-emerald-600">₹{ord.totalAmount}</td>
                  <td className="py-3.5">
                    <select
                      value={ord.status}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                      className="bg-slate-50 border border-slate-200 text-slate-800 text-[10px] font-extrabold rounded-xl px-2.5 py-1 focus:outline-none focus:border-rose-500 cursor-pointer"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="PAID">PAID</option>
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Order Details: {selectedOrder.orderNumber}</h3>
                <p className="text-xs text-slate-500">{selectedOrder.customerName} ({selectedOrder.customerEmail})</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="text-xs font-bold text-slate-500 hover:text-black px-2 py-1 bg-slate-100 rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1 text-xs">
              <h4 className="font-bold text-slate-800">Purchased Items</h4>
              {selectedOrder.items.map((item) => (
                <div key={item.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.productName} className="w-10 h-10 rounded-xl object-cover bg-slate-200" />
                    <div>
                      <p className="font-bold text-slate-900">{item.productName}</p>
                      <p className="text-[10px] text-slate-500 font-mono">SKU: {item.variantSku} × Qty {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-emerald-600">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-3 flex justify-between text-xs">
              <span className="font-semibold text-slate-500">Payment Gateway: {selectedOrder.paymentGateway}</span>
              <span className="font-extrabold text-emerald-600 text-sm">Total Paid: ₹{selectedOrder.totalAmount}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
