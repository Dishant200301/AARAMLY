import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiPackage,
  FiHeart,
  FiMapPin,
  FiLogOut,
  FiCheck,
  FiSettings,
  FiLock,
  FiMessageSquare,
  FiCornerDownRight,
} from "react-icons/fi";
import Navbar from "@/modules/core/components/Navbar";
import Footer from "@/modules/core/components/Footer";
import { useWishlist } from "@/modules/product/context/WishlistContext";
import { useCart } from "@/modules/product/context/CartContext";
import { useAuth } from "@/modules/core/context/AuthContext";
import { MOCK_CONTACT_MESSAGES } from "../../../../../admin/src/data/mockAdminData";

export const AccountPage: React.FC = () => {
  const { wishlistCount } = useWishlist();
  const { totalItemsCount } = useCart();
  const { isLoggedIn, loading, user, orders, addresses, logout, updateProfile, openAuthModal } = useAuth();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  // Redirect and open Auth Modal popup if trying to view /account while logged out
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      openAuthModal();
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, loading, navigate, openAuthModal]);

  // Tab handling via search params
  const tabParam = searchParams.get("tab") as "orders" | "messages" | "addresses" | "profile" | "settings" | null;
  const [activeTab, setActiveTab] = useState<"orders" | "messages" | "addresses" | "profile" | "settings">(
    tabParam || "orders"
  );

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  // Edit Profile Form
  const [editName, setEditName] = useState(user?.name || "");
  const [editPhone, setEditPhone] = useState(user?.phone || "");
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setEditName(user.name);
      setEditPhone(user.phone);
    }
  }, [user]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name: editName, phone: editPhone });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-zinc-900 font-sans flex flex-col justify-between">
        <Navbar />
        <main className="flex-1 pt-32 pb-16 px-4 text-center max-w-md mx-auto space-y-4">
          <div className="w-8 h-8 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Verifying Session…</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white text-zinc-900 font-sans flex flex-col justify-between">
        <Navbar />
        <main className="flex-1 pt-32 pb-16 px-4 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-zinc-100 text-zinc-800 flex items-center justify-center mx-auto">
            <FiLock size={28} />
          </div>
          <h1 className="text-2xl font-extrabold text-zinc-900">Sign In Required</h1>
          <p className="text-xs text-zinc-500">
            Please sign in to access your orders, profile, saved addresses and settings.
          </p>
          <button
            onClick={openAuthModal}
            className="px-8 py-3.5 bg-zinc-900 hover:bg-black text-white text-xs font-extrabold rounded-full uppercase tracking-wider transition-all shadow-md cursor-pointer"
          >
            Sign In / Register
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-black selection:text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4 md:px-8 max-w-[1400px] mx-auto w-full">
        {/* LOGGED IN ACCOUNT DASHBOARD */}
        <div className="space-y-8">
          {/* Header profile card */}
          <div className="p-6 md:p-8 rounded-3xl bg-[#f5f2ee] border border-zinc-200 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xl font-extrabold shadow-md shrink-0">
                {user?.avatarInitials || "PS"}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-extrabold text-zinc-900">{user?.name || "Priya Sharma"}</h1>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Verified VIP
                  </span>
                </div>
                <p className="text-xs text-zinc-500 font-medium mt-0.5">
                  {user?.email || "priya.sharma@example.com"} • Member since {user?.memberSince || "Jan 2026"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/wishlist"
                className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full border border-zinc-200 text-xs font-bold text-zinc-900 hover:bg-zinc-100 transition-colors shadow-2xs"
              >
                <FiHeart className="text-[#bf5c30]" size={15} />
                <span>Wishlist ({wishlistCount})</span>
              </Link>

              <Link
                to="/cart"
                className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full border border-zinc-200 text-xs font-bold text-zinc-900 hover:bg-zinc-100 transition-colors shadow-2xs"
              >
                <FiPackage size={15} />
                <span>Bag ({totalItemsCount})</span>
              </Link>

              <button
                onClick={logout}
                className="flex items-center gap-1.5 bg-rose-50 text-rose-700 px-4 py-2.5 rounded-full border border-rose-200 text-xs font-bold hover:bg-rose-100 transition-colors cursor-pointer"
              >
                <FiLogOut size={14} />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto border-b border-zinc-200 gap-8 no-scrollbar">
            <button
              onClick={() => {
                setActiveTab("orders");
                setSearchParams({ tab: "orders" });
              }}
              className={`pb-3 text-sm font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                activeTab === "orders" ? "border-zinc-900 text-zinc-900" : "border-transparent text-zinc-400 hover:text-zinc-700"
              }`}
            >
              <FiPackage size={16} />
              <span>My Orders ({orders.length})</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("messages");
                setSearchParams({ tab: "messages" });
              }}
              className={`pb-3 text-sm font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                activeTab === "messages" ? "border-zinc-900 text-zinc-900" : "border-transparent text-zinc-400 hover:text-zinc-700"
              }`}
            >
              <FiMessageSquare size={16} />
              <span>Support Inquiries ({MOCK_CONTACT_MESSAGES.length})</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("profile");
                setSearchParams({ tab: "profile" });
              }}
              className={`pb-3 text-sm font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                activeTab === "profile" ? "border-zinc-900 text-zinc-900" : "border-transparent text-zinc-400 hover:text-zinc-700"
              }`}
            >
              <FiUser size={16} />
              <span>My Profile</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("addresses");
                setSearchParams({ tab: "addresses" });
              }}
              className={`pb-3 text-sm font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                activeTab === "addresses" ? "border-zinc-900 text-zinc-900" : "border-transparent text-zinc-400 hover:text-zinc-700"
              }`}
            >
              <FiMapPin size={16} />
              <span>Saved Addresses</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("settings");
                setSearchParams({ tab: "settings" });
              }}
              className={`pb-3 text-sm font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                activeTab === "settings" ? "border-zinc-900 text-zinc-900" : "border-transparent text-zinc-400 hover:text-zinc-700"
              }`}
            >
              <FiSettings size={16} />
              <span>Settings</span>
            </button>
          </div>

          {/* TAB: MY ORDERS */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              {orders.map((ord) => (
                <div key={ord.id} className="p-6 rounded-2xl bg-white border border-zinc-200 space-y-4 shadow-2xs hover:border-zinc-300 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3">
                    <div>
                      <span className="font-extrabold text-sm text-zinc-900">{ord.id}</span>
                      <span className="text-xs text-zinc-400 ml-3">Placed on {ord.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200 flex items-center gap-1">
                        <FiCheck size={12} />
                        <span>{ord.status}</span>
                      </span>
                      <span className="font-extrabold text-sm text-zinc-900">₹{ord.total.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    {ord.items.map((item, idx) => (
                      <p key={idx} className="text-xs text-zinc-700 font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#bf5c30]" />
                        <span>{item}</span>
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB: SUPPORT INQUIRIES & ADMIN REPLIES */}
          {activeTab === "messages" && (
            <div className="space-y-4">
              {MOCK_CONTACT_MESSAGES.length === 0 ? (
                <div className="p-8 text-center bg-zinc-50 rounded-2xl border border-zinc-200 text-xs text-zinc-500">
                  No support inquiries submitted yet.
                </div>
              ) : (
                MOCK_CONTACT_MESSAGES.map((msg) => (
                  <div key={msg.id} className="p-6 rounded-2xl bg-white border border-zinc-200 space-y-4 shadow-2xs">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3">
                      <div>
                        <h4 className="font-extrabold text-sm text-zinc-900">{msg.subject}</h4>
                        <p className="text-xs text-zinc-500 font-medium mt-0.5">
                          Submitted by {msg.name} ({msg.email}) • {msg.date}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        msg.status === "Replied"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : msg.status === "Read"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "bg-amber-50 text-amber-800 border border-amber-200"
                      }`}>
                        {msg.status === "Replied" ? "Replied by Admin" : msg.status}
                      </span>
                    </div>

                    <div className="bg-zinc-50 p-4 rounded-xl text-xs text-zinc-800 space-y-1">
                      <p className="font-bold text-zinc-500 uppercase text-[10px] tracking-wider">Your Message:</p>
                      <p className="font-medium leading-relaxed">{msg.message}</p>
                    </div>

                    {msg.replyText && (
                      <div className="bg-emerald-50/70 border border-emerald-200/80 p-4 rounded-xl text-xs text-emerald-950 space-y-1.5 ml-4">
                        <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                          <FiCornerDownRight className="w-4 h-4 text-emerald-600" />
                          <span>Admin Response:</span>
                        </div>
                        <p className="font-medium text-emerald-900 leading-relaxed pl-5">
                          {msg.replyText}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB: MY PROFILE */}
          {activeTab === "profile" && (
            <div className="max-w-xl bg-white p-6 rounded-3xl border border-zinc-200 space-y-6 font-montserrat shadow-2xs">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                <h3 className="font-extrabold text-sm text-zinc-900 uppercase tracking-wider">
                  Personal Details
                </h3>
                {saveSuccess && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <FiCheck size={14} /> Profile Saved!
                  </span>
                )}
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs font-bold">
                <div>
                  <label className="text-zinc-500 uppercase text-[10px] tracking-wider block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-zinc-50 text-zinc-900 p-3 rounded-2xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
                  />
                </div>

                <div>
                  <label className="text-zinc-500 uppercase text-[10px] tracking-wider block mb-1">
                    Email Address (Read-only)
                  </label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full bg-zinc-100 text-zinc-500 p-3 rounded-2xl border border-zinc-200 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="text-zinc-500 uppercase text-[10px] tracking-wider block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full bg-zinc-50 text-zinc-900 p-3 rounded-2xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
                  />
                </div>

                <button
                  type="submit"
                  className="py-3 px-6 bg-zinc-900 hover:bg-black text-white font-extrabold rounded-full tracking-wider uppercase transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {/* TAB: SAVED ADDRESSES */}
          {activeTab === "addresses" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map((addr) => (
                <div key={addr.id} className="p-6 rounded-3xl bg-white border border-zinc-200 space-y-3 relative shadow-2xs">
                  {addr.isDefault && (
                    <span className="px-3 py-1 rounded-full bg-zinc-900 text-white text-[10px] font-extrabold uppercase tracking-wider inline-block">
                      Default Shipping Address
                    </span>
                  )}
                  <h3 className="font-extrabold text-sm text-zinc-900">{addr.name}</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                  <p className="text-xs font-mono font-bold text-zinc-800">Phone: {addr.phone}</p>
                </div>
              ))}
            </div>
          )}

          {/* TAB: SETTINGS */}
          {activeTab === "settings" && (
            <div className="max-w-xl bg-white p-6 rounded-3xl border border-zinc-200 space-y-6 font-montserrat shadow-2xs">
              <h3 className="font-extrabold text-sm text-zinc-900 uppercase tracking-wider border-b border-zinc-100 pb-3">
                Account Settings & Preferences
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-2xl">
                  <div>
                    <p className="font-extrabold text-zinc-900">Email Notifications</p>
                    <p className="text-[11px] text-zinc-500">Receive order tracking and exclusive discounts</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-zinc-900" />
                </div>

                <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-2xl">
                  <div>
                    <p className="font-extrabold text-zinc-900">Two-Factor Security</p>
                    <p className="text-[11px] text-zinc-500">Add SMS verification layer for account safety</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-zinc-900" />
                </div>

                <div className="pt-2">
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 text-rose-600 font-extrabold hover:text-rose-700 cursor-pointer"
                  >
                    <FiLogOut />
                    <span>Sign out from all active sessions</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccountPage;
