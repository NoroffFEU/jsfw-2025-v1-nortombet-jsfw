import { CartItem } from "../../types/cartTypes";
import { addItemToCart, removeItemFromCart, updateItemAmount, clearCartItems } from "./cartActions";
import { describe, it, expect } from "vitest";

describe("Cart Actions", () => {
  const sampleItem: CartItem = {
    id: "abc123",
    name: "Test Item",
    price: 100,
    amount: 1,
    image: "test.jpg",
    discountedPrice: 80,
  };

  it("adds a new item to the cart", () => {
    const updatedCart = addItemToCart([], sampleItem);
    expect(updatedCart).toHaveLength(1);
    expect(updatedCart[0].id).toBe("abc123");
  });

  it("increases the amount of an existing item", () => {
    const updatedCart = addItemToCart([sampleItem], { ...sampleItem, amount: 2 });
    expect(updatedCart[0].amount).toBe(3);
  });

  it("removes an item from the cart", () => {
    const updatedCart = removeItemFromCart([sampleItem], "abc123");
    expect(updatedCart).toHaveLength(0);
  });

  it("updates item amount correctly", () => {
    const updatedCart = updateItemAmount([sampleItem], "abc123", 5);
    expect(updatedCart[0].amount).toBe(5);
  });

  it("removes item if updated amount is zero", () => {
    const updatedCart = updateItemAmount([sampleItem], "abc123", 0);
    expect(updatedCart).toHaveLength(0);
  });

  it("clears the cart", () => {
    const cleared = clearCartItems();
    expect(cleared).toEqual([]);
  });
});
