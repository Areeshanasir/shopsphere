import { Link } from "react-router-dom";
import { useCart } from "../context/CartProvider";
import { FiSearch, FiShoppingCart, FiUser, FiMoon, FiSun } from "react-icons/fi";
import { useState, useEffect } from "react";

function Navbar() {
  const { cart } = useCart();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E8E2D8] bg-[#F8F5F0]/90 backdrop-blur-md transition-colors dark:border-[#3A3A3A] dark:bg-[#111111]/90">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <h1 className="text-3xl font-bold tracking-tight text-[#111111] dark:text-white">
          Shop<span className="text-[#C8A97E]">Sphere</span>
        </h1>

        {/* Links */}
        <ul className="hidden gap-8 text-[#444444] md:flex dark:text-[#D1D1D1]">
          <li><a href="#" className="transition hover:text-[#C8A97E]">Home</a></li>
          <li><a href="#" className="transition hover:text-[#C8A97E]">Products</a></li>
          <li><a href="#" className="transition hover:text-[#C8A97E]">Categories</a></li>
          <li><a href="#" className="transition hover:text-[#C8A97E]">Deals</a></li>
          <li><a href="#" className="transition hover:text-[#C8A97E]">Contact</a></li>
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-4 text-xl">

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-full border border-[#E8E2D8] bg-white p-2 text-[#111111] shadow-sm transition hover:bg-[#C8A97E] hover:text-white dark:border-[#3A3A3A] dark:bg-[#1B1B1B] dark:text-white"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>

          <button className="rounded-full border border-[#E8E2D8] bg-white p-2 text-[#111111] shadow-sm transition hover:bg-[#C8A97E] hover:text-white dark:border-[#3A3A3A] dark:bg-[#1B1B1B] dark:text-white">
            <FiSearch />
          </button>

          <Link
  to="/cart"
  className="relative rounded-full p-2 hover:bg-stone-100 dark:hover:bg-stone-700"
>
  <FiShoppingCart />

  {cart.length > 0 && (
    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-xs text-white">
      {cart.length}
    </span>
  )}
</Link>

          <button className="rounded-full border border-[#E8E2D8] bg-white p-2 text-[#111111] shadow-sm transition hover:bg-[#C8A97E] hover:text-white dark:border-[#3A3A3A] dark:bg-[#1B1B1B] dark:text-white">
            <FiUser />
          </button>

        </div>
      </nav>
    </header>
  );
}

export default Navbar;