import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetailsPage from "@/modules/product/pages/ProductDetailsPage";
import HomePage from "@/modules/home/pages/HomePage";
import NotFound from "@/modules/core/components/NotFound";
import ScrollToTop from "@/modules/core/components/ScrollToTop";
import { CartProvider } from "@/modules/product/context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/product" element={<ProductDetailsPage />} />
          <Route path="/product-details" element={<ProductDetailsPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
