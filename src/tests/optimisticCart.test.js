import { describe, it, expect } from "vitest";
import { createActor } from "xstate";
import { cartMachine } from "../machines/cartMachine";

const product = {
  id: 1,
  title: "Wireless Headphones",
  price: 99,
};

describe("Optimistic Cart Updates", () => {
  it("updates the cart immediately", () => {
    const actor = createActor(cartMachine);
    actor.start();

    actor.send({
      type: "OPTIMISTIC_ADD",
      product,
    });

    const items = actor.getSnapshot().context.items;

    expect(items).toHaveLength(1);
    expect(items[0].title).toBe("Wireless Headphones");
    expect(items[0].quantity).toBe(1);
  });

  it("stores the previous cart before updating", () => {
    const actor = createActor(cartMachine);
    actor.start();

    actor.send({
      type: "ADD_ITEM",
      product,
    });

    actor.send({
      type: "OPTIMISTIC_UPDATE_QUANTITY",
      id: 1,
      quantity: 3,
    });

    const snapshot = actor.getSnapshot();

    expect(snapshot.context.previousItems).toHaveLength(1);
    expect(snapshot.context.previousItems[0].quantity).toBe(1);
    expect(snapshot.context.items[0].quantity).toBe(3);
  });

  it("rolls back an optimistic update", () => {
    const actor = createActor(cartMachine);
    actor.start();

    actor.send({
      type: "ADD_ITEM",
      product,
    });

    actor.send({
      type: "OPTIMISTIC_UPDATE_QUANTITY",
      id: 1,
      quantity: 5,
    });

    expect(actor.getSnapshot().context.items[0].quantity).toBe(5);

    actor.send({
      type: "ROLLBACK",
    });

    const snapshot = actor.getSnapshot();

    expect(snapshot.context.items[0].quantity).toBe(1);
    expect(snapshot.context.error).toBe(
      "Cart update failed. Changes were rolled back."
    );
  });

  it("keeps the optimistic update after commit", () => {
    const actor = createActor(cartMachine);
    actor.start();

    actor.send({
      type: "OPTIMISTIC_ADD",
      product,
    });

    actor.send({
      type: "COMMIT",
    });

    const snapshot = actor.getSnapshot();

    expect(snapshot.context.items).toHaveLength(1);
    expect(snapshot.context.items[0].quantity).toBe(1);
    expect(snapshot.context.error).toBeNull();
  });
});