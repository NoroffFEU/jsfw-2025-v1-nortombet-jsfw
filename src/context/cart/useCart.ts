import { useContext } from "react";
import { CartContext } from "./CartContext";

/**
 * Custom React hook to consume the cart context.
 *
 * Must be used within a component wrapped in `CartProvider`.
 * Returns the current state of the cart and functions to interact with it.
 *
 * @example
 * const { items, addItem, removeItem, totalPrice } = useCart();
 *
 * @throws {Error} If used outside of a `CartProvider`
 * @returns {CartContextType} An object containing cart state and manipulation methods
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
