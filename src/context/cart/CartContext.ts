import { createContext, useContext } from "react";
import { CartContextType } from "../../types/cartTypes";

export const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Custom React hook to consume the cart context.
 *
 * Must be used within a component wrapped in `CartProvider`.
 * Returns the current state of the cart and functions to interact with it.
 *
 * @example
 * const {
 * items            // The list of items in the cart.
 * addItem          // Function to add an item to the cart.
 * updateAmount     // Function to update the quantity of an item.
 * removeItem       // Function to remove an item from the cart.
 * clearCart        // Function to clear all items from the cart.
 * totalItems       // The total count of items in the cart.
 * totalPrice       // The total price of all items in the cart.
 *  } = useCart();
 *
 * @throws {Error} If used outside of a `CartProvider`
 * @returns {CartContextType} An object containing cart state and manipulation methods
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
