import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import ProductDetailsPage from "@/modules/product/pages/ProductDetailsPage";
import ShopPage from "@/modules/product/pages/ShopPage";
import HomePage from "@/modules/home/pages/HomePage";
import WishlistPage from "@/modules/product/pages/WishlistPage";
import CartPage from "@/modules/product/pages/CartPage";
import AccountPage from "@/modules/user/pages/AccountPage";
import ContactPage from "@/modules/contact/pages/ContactPage";
import NotFound from "@/modules/core/components/NotFound";
import ScrollToTop from "@/modules/core/components/ScrollToTop";
import CartDrawer from "@/modules/core/components/CartDrawer";
import AuthModal from "@/modules/core/components/AuthModal";
import { CartProvider } from "@/modules/product/context/CartContext";
import { WishlistProvider } from "@/modules/product/context/WishlistContext";
import { AuthProvider } from "@/modules/core/context/AuthContext";
import { QuickViewProvider } from "@/modules/product/context/QuickViewContext";
import MobileProductQuickViewSheet from "@/modules/product/components/MobileProductQuickViewSheet";
import FloatingStickyCart from "@/modules/product/components/FloatingStickyCart";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <QuickViewProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Toaster position="top-center" richColors />
              <CartDrawer />
              <AuthModal />
              <MobileProductQuickViewSheet />
              <FloatingStickyCart />
              <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/categories" element={<ShopPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/login" element={<AccountPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/contact-us" element={<ContactPage />} />
              <Route path="/product" element={<ProductDetailsPage />} />
              <Route path="/product-details" element={<ProductDetailsPage />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </QuickViewProvider>
      </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
