import toast from "react-hot-toast";
import { useCart } from "../context/CartProvider";
import { Link } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa";

function ProductCard({ product }) {
  const { send } = useCart();
  return (
  <Link
    to={`/product/${product.id}`}
    aria-label={`View details for ${product.title}`}
  >
    <div className="group overflow-hidden rounded-3xl border border-stone-200 bg-[#FFFDF8] shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-[#4B3E35] dark:bg-[#2B2521]">
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

          <button
  onClick={(e) => {
  e.preventDefault();

  send({
    type: "ADD_ITEM",
    product,
  });

  toast.success("Product added to cart!");
}}
  className="rounded-xl bg-amber-600 px-5 py-2 font-medium text-white transition hover:bg-amber-700"
>
  Add to Cart
</button>

        </div>

      </div>

        </div>
  </Link>
  );
}

export default ProductCard;