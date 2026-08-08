import toast from "react-hot-toast";
import { useCart } from "../context/CartProvider";
import { useParams } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import useInventorySocket from "../hooks/useInventorySocket";

function ProductDetails() {
  const { id } = useParams();
  const { products, loading, error } = useProducts();
  const { send } = useCart();

  // Real-time inventory
 const {
  inventory,
  connectionStatus,
  decreaseInventory,
} = useInventorySocket();

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-center text-xl">Loading product...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-center text-xl text-red-600">
          Failed to load product.
        </p>
      </section>
    );
  }

  const product = products.find(
    (p) => String(p.id) === String(id)
  );

  if (!product) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-center text-xl">Product not found.</p>
      </section>
    );
  }

  /*
    If the WebSocket has sent inventory for this product,
    use that live value.

    Otherwise use the default stock from the product.
  */
  const liveStock =
    inventory[product.id] !== undefined
      ? inventory[product.id]
      : product.stock ?? 10;

  // Check how many of this product are already in the cart
  const remainingStock = liveStock;

  const isOutOfStock = liveStock <= 0;

  const handleAddToCart = () => {
  if (isOutOfStock) {
    toast.error("This product is out of stock.");
    return;
  }

  send({
    type: "ADD_ITEM",
    product,
  });

  decreaseInventory(product.id);

  toast.success("Product added to cart!");
};

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">

      <div className="grid gap-12 md:grid-cols-2">

        {/* ================= IMAGE ================= */}

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

        {/* ================= DETAILS ================= */}

        <div className="space-y-6">

          {/* Category */}
          <span className="inline-block rounded-full bg-amber-600 px-4 py-2 text-sm text-white">
            {product.category}
          </span>

          {/* Title */}
          <h1 className="text-5xl font-bold">
            {product.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-stone-600 dark:text-stone-300">
            Premium quality product with excellent customer ratings.
          </p>

          {/* Rating */}
          <div className="text-2xl font-semibold">
            ⭐ {product.rating}
          </div>

          {/* Price */}
          <div className="text-4xl font-bold text-amber-600">
            ${product.price}
          </div>

          {/* ================= LIVE INVENTORY ================= */}

          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 dark:border-stone-700 dark:bg-stone-800">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
                  Inventory Status
                </p>

                {isOutOfStock ? (
                  <p className="mt-1 font-bold text-red-600">
                    Out of Stock
                  </p>
                ) : (
                  <p className="mt-1 font-bold text-green-600">
                    {remainingStock} available
                  </p>
                )}
              </div>

              {/* Connection indicator */}
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  connectionStatus === "connected"
                    ? "bg-green-100 text-green-700"
                    : connectionStatus === "reconnecting"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {connectionStatus === "connected"
                  ? "Live"
                  : connectionStatus === "reconnecting"
                  ? "Reconnecting..."
                  : "Connecting..."}
              </span>

            </div>

          </div>

          {/* ================= ADD TO CART ================= */}

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`w-full rounded-xl px-8 py-4 font-semibold text-white transition ${
              isOutOfStock
                ? "cursor-not-allowed bg-stone-400"
                : "bg-amber-600 hover:bg-amber-700"
            }`}
          >
            {isOutOfStock
              ? "Out of Stock"
              : "Add to Cart"}
          </button>

        </div>

      </div>

    </section>
  );
}

export default ProductDetails;