import Cart from "../components/Cart";

function CartPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <h1 className="mb-10 text-4xl font-bold">
        Shopping Cart
      </h1>

      <Cart />
    </section>
  );
}

export default CartPage;