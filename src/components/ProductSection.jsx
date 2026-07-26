import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";
import SkeletonCard from "./SkeletonCard";
import { FiGrid, FiList, FiSearch } from "react-icons/fi";
import { useState } from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "./ProductCard";

function ProductSection() {
  const { products, loading, error } = useProducts();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("default");

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Beauty",
    "Home",
    "Watches",
  ];

  const filtered = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filtered];

  switch (sort) {
    case "low":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;

    case "high":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;

    case "rating":
      sortedProducts.sort((a, b) => b.rating - a.rating);
      break;

    default:
      break;
  }

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-20">
        <ErrorState />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">

      <div className="mb-10">
        <h2 className="text-4xl font-bold text-[#111111] dark:text-white">
          Our Products
        </h2>
      </div>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:justify-between">

        {/* Search */}
        <div className="relative w-full md:w-96">
          <FiSearch className="absolute left-4 top-4 text-[#8B8B8B] dark:text-[#CFCFCF]" />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#E8E2D8] bg-white py-3 pl-12 pr-4 text-[#111111] placeholder:text-[#888888] shadow-sm dark:border-[#3A3A3A] dark:bg-[#1B1B1B] dark:text-white dark:placeholder:text-[#AAAAAA]"
          />
        </div>

        <div className="flex items-center gap-3">

          {/* Sort */}
          <div className="rounded-xl border border-[#E8E2D8] bg-white p-1 shadow-md dark:border-[#3A3A3A] dark:bg-[#1B1B1B]">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent px-3 py-2 text-[#111111] outline-none dark:text-white"
            >
              <option value="default">Default</option>
              <option value="low">Price: Low → High</option>
              <option value="high">Price: High → Low</option>
              <option value="rating">Highest Rating</option>
            </select>
          </div>

          <p className="mb-6 text-[#666666] dark:text-[#D1D1D1]">
            Showing {sortedProducts.length} Products
          </p>

          {/* Grid */}
          <button
            onClick={() => setView("grid")}
            className="rounded-lg border border-[#E8E2D8] bg-white p-3 text-[#111111] shadow-sm transition hover:bg-[#F2E7D8] dark:border-[#3A3A3A] dark:bg-[#1B1B1B] dark:text-white dark:hover:bg-[#2A2A2A]"
          >
            <FiGrid />
          </button>

          {/* List */}
          <button
            onClick={() => setView("list")}
            className="rounded-lg border border-[#E8E2D8] bg-white p-3 text-[#111111] shadow-sm transition hover:bg-[#F2E7D8] dark:border-[#3A3A3A] dark:bg-[#1B1B1B] dark:text-white dark:hover:bg-[#2A2A2A]"
          >
            <FiList />
          </button>

        </div>

      </div>

      {/* Categories */}
      <div className="mb-8 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`rounded-full px-5 py-2 font-medium transition ${
              category === cat
                ? "bg-[#C8A97E] text-white"
                : "border border-[#E8E2D8] bg-white text-[#111111] hover:bg-[#F2E7D8] dark:border-[#3A3A3A] dark:bg-[#1B1B1B] dark:text-white dark:hover:bg-[#2A2A2A]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No Products Found"
          message="Try another search keyword or choose a different category."
        />
      ) : (
        <div
          className={
            view === "grid"
              ? "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
              : "flex flex-col gap-8"
          }
        >
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductSection;