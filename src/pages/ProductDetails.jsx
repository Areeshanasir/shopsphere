import toast from "react-hot-toast";
import { useCart } from "../context/CartProvider";
import { useParams } from "react-router-dom";
import useProducts from "../hooks/useProducts";

function ProductDetails() {
  const { id } = useParams();
  const { products, loading, error } = useProducts();
  const { send } = useCart();
  console.log(products);
console.log(id);

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-2xl font-semibold">Loading product...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-2xl font-semibold text-red-600">
          Failed to load product.
        </h2>
      </section>
    );
  }
console.log("Route ID:", id);
console.log("Products:", products);
console.log("Products length:", products.length);
  const product = products.find((p) => String(p.id) === String(id));

  if (!product) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-2xl font-semibold">
          Product not found.
        </h2>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-12 md:grid-cols-2">

        {/* Image */}
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full rounded-3xl border object-cover"
          />

          {/* Gallery */}
          <div className="mt-4 flex gap-4">
            {[1, 2, 3].map((item) => (
              <img
                key={item}
                src={product.image}
                alt={`${product.title} thumbnail ${item}`}
                className="h-24 w-24 cursor-pointer rounded-xl border object-cover transition hover:scale-105"
              />
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">

          <span className="rounded-full bg-amber-600 px-4 py-2 text-sm text-white">
            {product.category}
          </span>

          <h1 className="text-5xl font-bold">
            {product.title}
          </h1>

          <p className="text-xl text-stone-600 dark:text-stone-300">
            Premium quality product with excellent customer ratings.
          </p>

          <div className="text-2xl font-semibold">
            ⭐ {product.rating}
          </div>

          <div className="text-4xl font-bold text-amber-600">
            ${product.price}
          </div>

          <button
  onClick={() => {
  send({
    type: "ADD_ITEM",
    product,
  });

  toast.success("Product added to cart!");
}}
  className="rounded-xl bg-amber-600 px-8 py-4 font-semibold text-white transition hover:bg-amber-700"
>
  Add to Cart
</button>

        </div>

      </div>
    </section>
  );
}

export default ProductDetails;