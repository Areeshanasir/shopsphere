import { describe, it, expect } from "vitest";
import { createActor } from "xstate";
import { cartMachine } from "../machines/cartMachine";

describe("Cart Machine", () => {
  it("adds an item", () => {
    const actor = createActor(cartMachine);
    actor.start();

    actor.send({
      type: "ADD_ITEM",
      product: {
        id: 1,
        title: "Headphones",
        price: 99,
      },
    });

    expect(actor.getSnapshot().context.items.length).toBe(1);
  });

  it("increases quantity", () => {
    const actor = createActor(cartMachine);
    actor.start();

    actor.send({
      type: "ADD_ITEM",
      product: {
        id: 1,
        title: "Headphones",
        price: 99,
      },
    });

    actor.send({
      type: "INCREASE",
      id: 1,
    });

    expect(actor.getSnapshot().context.items[0].quantity).toBe(2);
  });

  it("removes an item", () => {
    const actor = createActor(cartMachine);
    actor.start();

    actor.send({
      type: "ADD_ITEM",
      product: {
        id: 1,
        title: "Headphones",
        price: 99,
      },
    });

    actor.send({
      type: "REMOVE_ITEM",
      id: 1,
    });

    expect(actor.getSnapshot().context.items.length).toBe(0);
  });

  it("clears the cart", () => {
    const actor = createActor(cartMachine);
    actor.start();

    actor.send({
      type: "ADD_ITEM",
      product: {
        id: 1,
        title: "Headphones",
        price: 99,
      },
    });

    actor.send({
      type: "CLEAR_CART",
    });

    expect(actor.getSnapshot().context.items.length).toBe(0);
  });

  it("updates quantity", () => {
    const actor = createActor(cartMachine);
    actor.start();

    actor.send({
      type: "ADD_ITEM",
      product: {
        id: 1,
        title: "Headphones",
        price: 99,
      },
    });

    actor.send({
      type: "UPDATE_QUANTITY",
      id: 1,
      quantity: 5,
    });

    expect(actor.getSnapshot().context.items[0].quantity).toBe(5);
  });
});