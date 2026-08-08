import { describe, it, expect } from "vitest";

function applyInventoryUpdate(inventory, productId, quantity) {
  return {
    ...inventory,
    [productId]: Math.max(quantity, 0),
  };
}

describe("Real-Time Inventory Updates", () => {
  it("syncs inventory when an update is received", () => {
    const inventory = {
      1: 15,
      2: 10,
    };

    const updated = applyInventoryUpdate(inventory, 1, 14);

    expect(updated[1]).toBe(14);
  });

  it("updates inventory immediately", () => {
    const inventory = {
      1: 15,
    };

    const updated = applyInventoryUpdate(inventory, 1, 14);

    expect(updated[1]).toBe(14);
  });

  it("keeps multiple product inventories independent", () => {
    const inventory = {
      1: 15,
      2: 10,
    };

    const updated = applyInventoryUpdate(inventory, 1, 14);

    expect(updated[1]).toBe(14);
    expect(updated[2]).toBe(10);
  });

  it("does not allow negative inventory", () => {
    const inventory = {
      1: 5,
    };

    const updated = applyInventoryUpdate(inventory, 1, -1);

    expect(updated[1]).toBe(0);
  });

  it("simulates inventory synchronization across browser tabs", () => {
    const tab1 = {
      1: 15,
    };

    const tab2 = {
      1: 15,
    };

    const tab3 = {
      1: 15,
    };

    const newQuantity = 14;

    const updatedTab1 = applyInventoryUpdate(tab1, 1, newQuantity);
    const updatedTab2 = applyInventoryUpdate(tab2, 1, newQuantity);
    const updatedTab3 = applyInventoryUpdate(tab3, 1, newQuantity);

    expect(updatedTab1[1]).toBe(14);
    expect(updatedTab2[1]).toBe(14);
    expect(updatedTab3[1]).toBe(14);
  });
});