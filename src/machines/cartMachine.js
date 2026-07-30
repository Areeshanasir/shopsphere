import { createMachine, assign } from "xstate";

export const cartMachine = createMachine({
  id: "cart",

  context: {
    items: [],
  },

  initial: "ready",

  states: {
    ready: {
      on: {
        ADD_ITEM: {
          actions: assign({
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
          }),
        },

        REMOVE_ITEM: {
          actions: assign({
            items: ({ context, event }) =>
              context.items.filter((item) => item.id !== event.id),
          }),
        },

        INCREASE: {
          actions: assign({
            items: ({ context, event }) =>
              context.items.map((item) =>
                item.id === event.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
          }),
        },
        UPDATE_QUANTITY: {
  actions: assign({
    items: ({ context, event }) =>
      context.items.map((item) =>
        item.id === event.id
          ? {
              ...item,
              quantity: Math.max(1, Number(event.quantity)),
            }
          : item
      ),
  }),
},

        DECREASE: {
          actions: assign({
            items: ({ context, event }) =>
              context.items
                .map((item) =>
                  item.id === event.id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
                )
                .filter((item) => item.quantity > 0),
          }),
        },

        CLEAR_CART: {
          actions: assign({
            items: () => [],
          }),
        },
      },
    },
  },
});