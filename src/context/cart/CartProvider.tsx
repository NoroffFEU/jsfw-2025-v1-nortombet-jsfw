import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  addItemToCart,
  updateItemAmount,
  removeItemFromCart,
  clearCartItems,
  getCartFromLocalStorage,
} from "./cartActions";
import { CartItem } from "../../types/cartTypes";
import { CartContext } from "./CartContext";
import { useCartSync } from "./useCartSync";

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
  const [items, setItems] = useState<CartItem[]>(() => getCartFromLocalStorage());
  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.amount, 0), [items]);
  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + (item.discountedPrice || item.price) * item.amount, 0),
    [items]
  );
  const totalSaved = useMemo(
    () =>
      items.reduce((acc, item) => {
        if (item.discountedPrice && item.discountedPrice < item.price) {
          return acc + (item.price - item.discountedPrice) * item.amount;
        }
        return acc;
      }, 0),
    [items]
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  /**
   * Adds an item to the cart or updates its quantity if it already exists.
   *
   * @param {CartItem} newItem - The item to be added or updated.
   * @returns {void}
   */
  const addItem = useCallback((newItem: CartItem): void => {
    setItems((prev) => addItemToCart(prev, newItem));
  }, []);
  /**
   * Updates the quantity of an item in the cart.
   *
   * @param {string} id - The ID of the item to update.
   * @param {number} amount - The new quantity for the item.
   * @returns {void}
   */
  const updateAmount = useCallback((id: string, amount: number): void => {
    setItems((prev) => updateItemAmount(prev, id, amount));
  }, []);
  /**
   * Removes an item from the cart.
   *
   * @param {string} id - The ID of the item to remove.
   * @returns {void}
   */
  const removeItem = useCallback((id: string): void => {
    setItems((prev) => removeItemFromCart(prev, id));
  }, []);

  /**
   * Clears all items from the cart and removes data from localStorage.
   *
   * @returns {void}
   */
  const clearCart = useCallback((): void => {
    setItems(clearCartItems());
    localStorage.removeItem("cart");
  }, []);

  /**
   * Checks if an item with a given ID exists in the cart.
   *
   * @param {string} id - The ID of the item to check.
   * @returns {boolean} True if the item exists in the cart, false otherwise.
   */
  const hasItem = useCallback(
    (id: string): boolean => {
      return items.some((item) => item.id === id);
    },
    [items]
  );

  useCartSync(setItems);

  return (
    <CartContext.Provider
      value={{ items, addItem, updateAmount, removeItem, clearCart, hasItem, totalItems, totalSaved, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};
