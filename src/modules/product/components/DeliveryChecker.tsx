import React, { useState } from "react";
import { FiMapPin, FiTruck, FiRotateCcw, FiCheck, FiShield } from "react-icons/fi";

export const DeliveryChecker: React.FC = () => {
  const [pincode, setPincode] = useState("");
  const [deliveryResult, setDeliveryResult] = useState<{
    success: boolean;
    date?: string;
    cost?: string;
    message?: string;
  } | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length < 6) {
      setDeliveryResult({
        success: false,
        message: "Please enter a valid 6-digit Pincode.",
      });
      return;
    }

    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      // Calculate estimated date (3 days from now)
      const date = new Date();
      date.setDate(date.getDate() + 3);
      const formattedDate = date.toLocaleDateString("en-IN", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });

      setDeliveryResult({
        success: true,
        date: formattedDate,
        cost: "FREE",
      });
    }, 600);
  };

  return (
    <div className="border border-neutral-200 rounded-2xl p-4 bg-white shadow-2xs space-y-3 font-sans">
      <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 tracking-wider">
        <FiMapPin className="text-rose-600" size={16} />
        <span>Delivery & Availability Check</span>
      </div>

      {/* Pincode Input Form */}
      <form onSubmit={handleCheck} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            maxLength={6}
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value.replace(/\D/g, ""));
              setDeliveryResult(null);
            }}
            placeholder="Enter 6-digit Pincode (e.g. 560103)"
            className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs font-semibold text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-black focus:bg-white transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={isChecking}
          className="px-4 py-2.5 bg-black text-white text-xs font-bold rounded-xl hover:bg-neutral-800 active:scale-95 transition-all shadow-xs disabled:opacity-50 cursor-pointer shrink-0"
        >
          {isChecking ? "Checking..." : "Check"}
        </button>
      </form>

      {/* Result Display */}
      {deliveryResult && (
        <div
          className={`p-3 rounded-xl text-xs transition-all ${
            deliveryResult.success
              ? "bg-emerald-50 border border-emerald-200/80 text-emerald-900 space-y-1.5"
              : "bg-rose-50 border border-rose-200/80 text-rose-800"
          }`}
        >
          {deliveryResult.success ? (
            <>
              <div className="flex items-center gap-2 font-bold text-emerald-900">
                <FiCheck size={14} className="text-emerald-600" />
                <span>Express Delivery Available for {pincode}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] border-t border-emerald-200/60">
                <div className="flex items-center gap-1.5 text-neutral-700">
                  <FiTruck size={13} className="text-emerald-700" />
                  <span>
                    Get it by <strong>{deliveryResult.date}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-700">
                  <FiRotateCcw size={13} className="text-emerald-700" />
                  <span>10 Days Free Return</span>
                </div>
              </div>
            </>
          ) : (
            <p className="font-semibold">{deliveryResult.message}</p>
          )}
        </div>
      )}

      {/* Default Service Guarantees */}
      {!deliveryResult && (
        <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1 border-t border-neutral-100">
          <span className="flex items-center gap-1">
            <FiTruck size={13} className="text-neutral-700" /> Free Express Shipping
          </span>
          <span className="flex items-center gap-1">
            <FiRotateCcw size={13} className="text-neutral-700" /> 10 Days Easy Exchange
          </span>
          <span className="flex items-center gap-1">
            <FiShield size={13} className="text-neutral-700" /> Cash on Delivery
          </span>
        </div>
      )}
    </div>
  );
};
