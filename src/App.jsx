import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <div className="min-h-screen bg-[#F7F2E9] text-stone-900 transition-colors dark:bg-[#1F1B18] dark:text-[#F5E6C8]">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;