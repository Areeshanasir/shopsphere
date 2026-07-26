import { FaHeart, FaStar } from "react-icons/fa";

function ProductCard({ product }) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-[#E8E2D8] bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-[#3A3A3A] dark:bg-[#1B1B1B]">

      {/* Image */}
      <div className="relative overflow-hidden">

        <img
          src={product.image}
          alt={product.title}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
        />

        {/* Category */}
        <span className="absolute left-4 top-4 rounded-full bg-[#C8A97E] px-3 py-1 text-xs font-semibold text-white">
          {product.category}
        </span>

        {/* Wishlist */}
        <button
          className="absolute right-4 top-4 rounded-full bg-white p-3 text-[#111111] shadow-md transition hover:bg-[#C8A97E] hover:text-white dark:bg-[#111111] dark:text-white"
        >
          <FaHeart />
        </button>

      </div>

      {/* Content */}
      <div className="space-y-4 p-6">

        <h3 className="line-clamp-2 text-xl font-bold text-[#111111] dark:text-white">
          {product.title}
        </h3>

        <div className="flex items-center gap-2">
          <FaStar className="text-[#C8A97E]" />
          <span className="font-medium text-[#555555] dark:text-[#D1D1D1]">
            {product.rating}
          </span>
        </div>

        <div className="flex items-center justify-between">

          <span className="text-3xl font-bold text-[#C8A97E]">
            ${product.price}
          </span>

          <button className="rounded-xl bg-[#111111] px-5 py-2 font-medium text-white transition hover:bg-[#C8A97E] dark:bg-[#C8A97E] dark:text-[#111111] dark:hover:bg-[#B79265]">
            Buy Now
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;