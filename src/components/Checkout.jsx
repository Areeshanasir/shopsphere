import { useState } from "react";
import { useMachine } from "@xstate/react";
import { checkoutMachine } from "../machines/checkoutMachine";
import toast from "react-hot-toast";

function Checkout() {
  const [state, send] = useMachine(checkoutMachine);

  const [shippingErrors, setShippingErrors] = useState({});
  const [paymentErrors, setPaymentErrors] = useState({});

  const shipping = state.context.shipping;
  const payment = state.context.payment;

  // =========================
  // SHIPPING VALIDATION
  // =========================

  function validateShipping() {
    const errors = {};

    if (!shipping.name.trim()) {
      errors.name = "Name is required";
    }

    if (!shipping.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(shipping.email)) {
      errors.email = "Enter a valid email";
    }

    if (!shipping.address.trim()) {
      errors.address = "Address is required";
    }

    if (!shipping.city.trim()) {
      errors.city = "City is required";
    }

    if (!shipping.postalCode.trim()) {
      errors.postalCode = "Postal code is required";
    }

    setShippingErrors(errors);

    return Object.keys(errors).length === 0;
  }

  // =========================
  // PAYMENT VALIDATION
  // =========================

  function validatePayment() {
    const errors = {};

    if (!payment.cardNumber.trim()) {
      errors.cardNumber = "Card number is required";
    } else if (!/^\d{16}$/.test(payment.cardNumber)) {
      errors.cardNumber = "Card number must contain 16 digits";
    }

    if (!payment.expiry.trim()) {
      errors.expiry = "Expiry date is required";
    }

    if (!payment.cvv.trim()) {
      errors.cvv = "CVV is required";
    } else if (!/^\d{3,4}$/.test(payment.cvv)) {
      errors.cvv = "CVV must contain 3 or 4 digits";
    }

    setPaymentErrors(errors);

    return Object.keys(errors).length === 0;
  }

  // =========================
  // SHIPPING UPDATE
  // =========================

  function updateShipping(field, value) {
    send({
      type: "UPDATE_SHIPPING",
      data: {
        [field]: value,
      },
    });
  }

  // =========================
  // PAYMENT UPDATE
  // =========================

  function updatePayment(field, value) {
    send({
      type: "UPDATE_PAYMENT",
      data: {
        [field]: value,
      },
    });
  }

  // =========================
  // CART STEP
  // =========================

  if (state.matches("cart")) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 rounded-3xl border border-stone-200 bg-[#FFFDF8] p-8 shadow-sm dark:border-[#4B3E35] dark:bg-[#2B2521]">
        <h1 className="text-3xl font-bold">Checkout</h1>

        <div className="rounded-2xl border border-stone-200 p-6 dark:border-stone-700">
          <h2 className="text-xl font-semibold">Cart</h2>

          <p className="mt-2 text-stone-600 dark:text-stone-300">
            Review your cart before continuing to shipping.
          </p>
        </div>

        <button
          onClick={() => send({ type: "NEXT" })}
          className="w-full rounded-xl bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-700"
        >
          Continue to Shipping
        </button>
      </div>
    );
  }

  // =========================
  // SHIPPING STEP
  // =========================

  if (state.matches("shipping")) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 rounded-3xl border border-stone-200 bg-[#FFFDF8] p-8 shadow-sm dark:border-[#4B3E35] dark:bg-[#2B2521]">
        <div>
          <h1 className="text-3xl font-bold">Shipping Information</h1>

          <p className="mt-2 text-stone-600 dark:text-stone-300">
            Enter your delivery information.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="font-medium">Full Name</label>

            <input
              value={shipping.name}
              onChange={(e) => updateShipping("name", e.target.value)}
              className="mt-2 w-full rounded-xl border p-3 dark:border-stone-600 dark:bg-stone-800"
            />

            {shippingErrors.name && (
              <p className="mt-1 text-sm text-red-600">
                {shippingErrors.name}
              </p>
            )}
          </div>

          <div>
            <label className="font-medium">Email</label>

            <input
              type="email"
              value={shipping.email}
              onChange={(e) => updateShipping("email", e.target.value)}
              className="mt-2 w-full rounded-xl border p-3 dark:border-stone-600 dark:bg-stone-800"
            />

            {shippingErrors.email && (
              <p className="mt-1 text-sm text-red-600">
                {shippingErrors.email}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="font-medium">Address</label>

            <input
              value={shipping.address}
              onChange={(e) => updateShipping("address", e.target.value)}
              className="mt-2 w-full rounded-xl border p-3 dark:border-stone-600 dark:bg-stone-800"
            />

            {shippingErrors.address && (
              <p className="mt-1 text-sm text-red-600">
                {shippingErrors.address}
              </p>
            )}
          </div>

          <div>
            <label className="font-medium">City</label>

            <input
              value={shipping.city}
              onChange={(e) => updateShipping("city", e.target.value)}
              className="mt-2 w-full rounded-xl border p-3 dark:border-stone-600 dark:bg-stone-800"
            />

            {shippingErrors.city && (
              <p className="mt-1 text-sm text-red-600">
                {shippingErrors.city}
              </p>
            )}
          </div>

          <div>
            <label className="font-medium">Postal Code</label>

            <input
              value={shipping.postalCode}
              onChange={(e) =>
                updateShipping("postalCode", e.target.value)
              }
              className="mt-2 w-full rounded-xl border p-3 dark:border-stone-600 dark:bg-stone-800"
            />

            {shippingErrors.postalCode && (
              <p className="mt-1 text-sm text-red-600">
                {shippingErrors.postalCode}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => send({ type: "BACK" })}
            className="rounded-xl border px-6 py-3 font-semibold dark:border-stone-600"
          >
            Back
          </button>

          <button
            onClick={() => {
              if (validateShipping()) {
                send({ type: "NEXT" });
                toast.success("Shipping information saved");
              }
            }}
            className="flex-1 rounded-xl bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-700"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // PAYMENT STEP
  // =========================

  if (state.matches("payment")) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 rounded-3xl border border-stone-200 bg-[#FFFDF8] p-8 shadow-sm dark:border-[#4B3E35] dark:bg-[#2B2521]">
        <div>
          <h1 className="text-3xl font-bold">Payment</h1>

          <p className="mt-2 text-stone-600 dark:text-stone-300">
            Enter your payment information.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="font-medium">Card Number</label>

            <input
              inputMode="numeric"
              maxLength="16"
              value={payment.cardNumber}
              onChange={(e) =>
                updatePayment(
                  "cardNumber",
                  e.target.value.replace(/\D/g, "")
                )
              }
              className="mt-2 w-full rounded-xl border p-3 dark:border-stone-600 dark:bg-stone-800"
              placeholder="1234567812345678"
            />

            {paymentErrors.cardNumber && (
              <p className="mt-1 text-sm text-red-600">
                {paymentErrors.cardNumber}
              </p>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="font-medium">Expiry Date</label>

              <input
                placeholder="MM/YY"
                maxLength="5"
                value={payment.expiry}
                onChange={(e) =>
                  updatePayment("expiry", e.target.value)
                }
                className="mt-2 w-full rounded-xl border p-3 dark:border-stone-600 dark:bg-stone-800"
              />

              {paymentErrors.expiry && (
                <p className="mt-1 text-sm text-red-600">
                  {paymentErrors.expiry}
                </p>
              )}
            </div>

            <div>
              <label className="font-medium">CVV</label>

              <input
                inputMode="numeric"
                maxLength="4"
                value={payment.cvv}
                onChange={(e) =>
                  updatePayment(
                    "cvv",
                    e.target.value.replace(/\D/g, "")
                  )
                }
                className="mt-2 w-full rounded-xl border p-3 dark:border-stone-600 dark:bg-stone-800"
              />

              {paymentErrors.cvv && (
                <p className="mt-1 text-sm text-red-600">
                  {paymentErrors.cvv}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => send({ type: "BACK" })}
            className="rounded-xl border px-6 py-3 font-semibold dark:border-stone-600"
          >
            Back
          </button>

          <button
            onClick={() => {
              if (validatePayment()) {
                send({ type: "NEXT" });
                toast.success("Payment information validated");
              }
            }}
            className="flex-1 rounded-xl bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-700"
          >
            Place Order
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // CONFIRMATION
  // =========================

  if (state.matches("confirmation")) {
    return (
      <div className="mx-auto max-w-3xl rounded-3xl border border-stone-200 bg-[#FFFDF8] p-10 text-center shadow-sm dark:border-[#4B3E35] dark:bg-[#2B2521]">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl dark:bg-green-900">
          ✓
        </div>

        <h1 className="text-3xl font-bold">Order Confirmed!</h1>

        <p className="mt-3 text-stone-600 dark:text-stone-300">
          Thank you for your purchase. Your order has been successfully
          placed.
        </p>

        <div className="mt-6 rounded-2xl border p-5 text-left dark:border-stone-700">
          <p>
            <strong>Name:</strong> {shipping.name}
          </p>

          <p className="mt-2">
            <strong>Email:</strong> {shipping.email}
          </p>

          <p className="mt-2">
            <strong>Address:</strong> {shipping.address},{" "}
            {shipping.city}
          </p>
        </div>

        <button
          onClick={() => toast.success("Thank you for shopping with ShopSphere!")}
          className="mt-6 rounded-xl bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-700"
        >
          Done
        </button>
      </div>
    );
  }

  return null;
}

export default Checkout;