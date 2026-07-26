import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";

function App() {
  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#111111] transition-colors dark:bg-[#111111] dark:text-white">
      <Navbar />
      <Hero />
      <ProductSection />
      <Footer />
    </div>
  );
}

export default App;