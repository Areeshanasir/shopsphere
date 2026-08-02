import { createMachine, assign } from "xstate";

export const cartMachine = createMachine({
  id: "cart",

  context: {
    items: [],
    previousItems: [],
    error: null,
  },

  initial: "ready",

  states: {
    ready: {
      on: {
        // =========================
        // NORMAL CART ACTIONS
        // =========================

        ADD_ITEM: {
          actions: assign({
            previousItems: ({ context }) => context.items,

            items: ({ context, event }) => {
              const existing = context.items.find(
                (item) => item.id === event.product.id
              );

              if (existing) {
                return context.items.map((item) =>
                  item.id === event.product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                );
              }

              return [
                ...context.items,
                {
                  ...event.product,
                  quantity: 1,
                },
              ];
            },

            error: () => null,
          }),
        },

        REMOVE_ITEM: {
          actions: assign({
            previousItems: ({ context }) => context.items,

            items: ({ context, event }) =>
              context.items.filter((item) => item.id !== event.id),

            error: () => null,
          }),
        },

        INCREASE: {
          actions: assign({
            previousItems: ({ context }) => context.items,

            items: ({ context, event }) =>
              context.items.map((item) =>
                item.id === event.id
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                    }
                  : item
              ),

            error: () => null,
          }),
        },

        DECREASE: {
          actions: assign({
            previousItems: ({ context }) => context.items,

            items: ({ context, event }) =>
              context.items
                .map((item) =>
                  item.id === event.id
                    ? {
                        ...item,
                        quantity: item.quantity - 1,
                      }
                    : item
                )
                .filter((item) => item.quantity > 0),

            error: () => null,
          }),
        },

        UPDATE_QUANTITY: {
          actions: assign({
            previousItems: ({ context }) => context.items,

            items: ({ context, event }) =>
              context.items.map((item) =>
                item.id === event.id
                  ? {
                      ...item,
                      quantity: Math.max(1, Number(event.quantity)),
                    }
                  : item
              ),

            error: () => null,
          }),
        },

        CLEAR_CART: {
          actions: assign({
            previousItems: ({ context }) => context.items,
            items: () => [],
            error: () => null,
          }),
        },

        // =========================
        // OPTIMISTIC ACTIONS
        // =========================

        OPTIMISTIC_ADD: {
          actions: assign({
            previousItems: ({ context }) => context.items,

            items: ({ context, event }) => {
              const existing = context.items.find(
                (item) => item.id === event.product.id
              );

              if (existing) {
                return context.items.map((item) =>
                  item.id === event.product.id
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                      }
                    : item
                );
              }

              return [
                ...context.items,
                {
                  ...event.product,
                  quantity: 1,
                },
              ];
            },

            error: () => null,
          }),
        },

        OPTIMISTIC_REMOVE: {
          actions: assign({
            previousItems: ({ context }) => context.items,

            items: ({ context, event }) =>
              context.items.filter((item) => item.id !== event.id),

            error: () => null,
          }),
        },

        OPTIMISTIC_UPDATE_QUANTITY: {
          actions: assign({
            previousItems: ({ context }) => context.items,

            items: ({ context, event }) =>
              context.items.map((item) =>
                item.id === event.id
                  ? {
                      ...item,
                      quantity: Math.max(1, Number(event.quantity)),
                    }
                  : item
              ),

            error: () => null,
          }),
        },

        // =========================
        // SERVER RESULT
        // =========================

        COMMIT: {
          actions: assign({
            previousItems: ({ context }) => context.items,
            error: () => null,
          }),
        },

        ROLLBACK: {
          actions: assign({
            items: ({ context }) => context.previousItems,

            error: () => "Cart update failed. Changes were rolled back.",
          }),
        },
      },
    },
  },
});