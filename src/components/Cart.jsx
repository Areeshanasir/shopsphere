import toast from "react-hot-toast";
import { useCart } from "../context/CartProvider";

function Cart() {
  const { cart, send } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-stone-300 p-10 text-center dark:border-stone-700">
        <h2 className="text-3xl font-bold">Your Cart is Empty</h2>
        <p className="mt-3 text-stone-600 dark:text-stone-300">
          Add some products to start shopping.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between rounded-2xl border p-5 dark:border-stone-700"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.image}
              alt={item.title}
              className="h-20 w-20 rounded-xl object-cover"
            />

            <div>
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-amber-600 font-semibold">
                £{item.price}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">

            <button
              onClick={() =>
                send({
                  type: "DECREASE",
                  id: item.id,
                })
              }
              className="rounded-lg border px-3 py-1"
            >
              -
            </button>

            <input
  type="number"
  min="1"
  value={item.quantity}
  onChange={(e) =>
    send({
      type: "UPDATE_QUANTITY",
      id: item.id,
      quantity: e.target.value,
    })
  }
  className="w-16 rounded-lg border px-2 py-1 text-center dark:border-stone-600 dark:bg-stone-800"
/>

            <button
              onClick={() =>
                send({
                  type: "INCREASE",
                  id: item.id,
                })
              }
              className="rounded-lg border px-3 py-1"
            >
              +
            </button>

            <button
              onClick={() => {
  send({
    type: "REMOVE_ITEM",
    id: item.id,
  });

  toast.success("Item removed");
}}
              className="ml-4 rounded-lg bg-red-600 px-4 py-2 text-white"
            >
              Remove
            </button>

          </div>
        </div>
      ))}

      <div className="rounded-2xl bg-amber-600 p-6 text-white">
  <h2 className="text-2xl font-bold">
    Total: £{total.toFixed(2)}
  </h2>

  <div className="mt-4 flex flex-wrap gap-3">
    <button
      onClick={() => {
        send({ type: "CLEAR_CART" });
        toast.success("Cart cleared");
      }}
      className="rounded-xl bg-white px-6 py-3 font-semibold text-amber-600"
    >
      Clear Cart
    </button>

    <button
      onClick={() => {
        window.location.href = "/checkout";
      }}
      className="rounded-xl bg-black px-6 py-3 font-semibold text-white hover:bg-stone-800"
    >
      Proceed to Checkout
    </button>
  </div>
</div>
    </div>
  );
}

export default Cart;