import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/modules/home/pages/HomePage";
import NotFound from "@/modules/core/components/NotFound";
import ScrollToTop from "@/modules/core/components/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
