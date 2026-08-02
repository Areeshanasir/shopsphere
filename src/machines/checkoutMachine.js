import { createMachine, assign } from "xstate";

export const checkoutMachine = createMachine({
  id: "checkout",

  context: {
    shipping: {
      name: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
    },

    payment: {
      cardNumber: "",
      expiry: "",
      cvv: "",
    },

    error: null,
  },

  initial: "cart",

  states: {
    // =========================
    // CART
    // =========================

    cart: {
      on: {
        NEXT: "shipping",
      },
    },

    // =========================
    // SHIPPING
    // =========================

    shipping: {
      on: {
        UPDATE_SHIPPING: {
          actions: assign({
            shipping: ({ context, event }) => ({
              ...context.shipping,
              ...event.data,
            }),
            error: () => null,
          }),
        },

        NEXT: {
          target: "payment",
        },

        BACK: "cart",
      },
    },

    // =========================
    // PAYMENT
    // =========================

    payment: {
      on: {
        UPDATE_PAYMENT: {
          actions: assign({
            payment: ({ context, event }) => ({
              ...context.payment,
              ...event.data,
            }),
            error: () => null,
          }),
        },

        NEXT: {
          target: "confirmation",
        },

        BACK: "shipping",
      },
    },

    // =========================
    // CONFIRMATION
    // =========================

    confirmation: {
      type: "final",
    },
  },
});