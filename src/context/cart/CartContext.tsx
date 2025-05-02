import React, { createContext, useContext, useEffect, useState } from "react";
import { addItemToCart, updateItemAmount, removeItemFromCart, clearCartItems } from "./cartActions";
import { useCartSync } from "./useCartSync";
import { CartContextType, CartItem } from "../../types/cartTypes";

/**
 * React context that holds cart state and actions for managing a shopping cart.
 *
 * Use `useCart()` to consume the context within components that are wrapped by `CartProvider`.
 * The context includes cart items, total item count, total price, and manipulation methods.
 */
export const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * React provider component that encapsulates and shares cart state across the application.
 *
 * This provider:
 * - Initializes cart state from `localStorage` on first render.
 * - Persists state to `localStorage` on changes.
 * - Synchronizes state across multiple browser tabs.
 *
 * @example
 * <CartProvider>
 *   <App />
 * </CartProvider>
 *
 * @param {object} props - React props
 * @param {React.ReactNode} props.children - Child components that can access the cart context
 * @returns {JSX.Element} A React context provider component
 */
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const totalItems = items.reduce((sum, item) => sum + item.amount, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.discountedPrice || item.price) * item.amount, 0);

  const totalSaved = items.reduce((acc, item) => {
    if (item.discountedPrice && item.discountedPrice < item.price) {
      return acc + (item.price - item.discountedPrice) * item.amount;
    }
    return acc;
  }, 0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  /**
   * Adds an item to the cart or updates its quantity if it already exists.
   *
   * @param {CartItem} newItem - The item to be added or updated.
   * @returns {void}
   */
  const addItem = (newItem: CartItem): void => {
    setItems((prev) => addItemToCart(prev, newItem));
  };

  /**
   * Updates the quantity of an item in the cart.
   *
   * @param {string} id - The ID of the item to update.
   * @param {number} amount - The new quantity for the item.
   * @returns {void}
   */
  const updateAmount = (id: string, amount: number): void => {
    setItems((prev) => updateItemAmount(prev, id, amount));
  };

  /**
   * Removes an item from the cart.
   *
   * @param {string} id - The ID of the item to remove.
   * @returns {void}
   */
  const removeItem = (id: string): void => {
    setItems((prev) => removeItemFromCart(prev, id));
  };

  /**
   * Clears all items from the cart and removes data from localStorage.
   *
   * @returns {void}
   */
  const clearCart = (): void => {
    setItems(clearCartItems());
    localStorage.removeItem("cart");
  };

  /**
   * Checks if an item with a given ID exists in the cart.
   *
   * @param {string} id - The ID of the item to check.
   * @returns {boolean} True if the item exists in the cart, false otherwise.
   */
  const hasItem = (id: string): boolean => {
    return items.some((item) => item.id === id);
  };

  useCartSync(setItems);

  return (
    <CartContext.Provider
      value={{ items, addItem, updateAmount, removeItem, clearCart, hasItem, totalItems, totalSaved, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

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
