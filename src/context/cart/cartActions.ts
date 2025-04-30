import { CartItem } from "../../types/cartTypes";

/**
 * Type guard to check if data is an array of valid CartItem objects.
 *
 * @param {*} data - The parsed data from localStorage.
 * @returns {boolean} True if data is a valid CartItem[], false otherwise.
 */
function isCartItemArray(data: any): data is CartItem[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        item &&
        typeof item.id === "string" &&
        typeof item.name === "string" &&
        typeof item.price === "number" &&
        typeof item.amount === "number" &&
        typeof item.image === "string" &&
        typeof item.discountedPrice === "number"
    )
  );
}

/**
 * Safely retrieves and validates the cart from localStorage.
 *
 * @returns {CartItem[]} An array of CartItem objects or an empty array if invalid.
 */
export function getCartFromLocalStorage(): CartItem[] {
  const saved = localStorage.getItem("cart");
  try {
    const parsed = saved ? JSON.parse(saved) : [];
    return isCartItemArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to parse cart from localStorage:", error);
    return [];
  }
}

/**
 * Adds a new item to the cart or increases the amount if already present.
 *
 * @param {CartItem[]} prev - The previous state of cart items.
 * @param {CartItem} newItem - The item to be added or updated in the cart.
 * @returns {CartItem[]} The updated state of the cart items.
 */
export const addItemToCart = (prev: CartItem[], newItem: CartItem): CartItem[] => {
  const existing = prev.find((item) => item.id === newItem.id);
  return existing
    ? prev.map((item) => (item.id === newItem.id ? { ...item, amount: item.amount + newItem.amount } : item))
    : [...prev, newItem];
};

/**
 * Updates the amount of a specific item in the cart.
 *
 * @param {CartItem[]} prev - The previous state of cart items.
 * @param {string} id - The ID of the item to be updated.
 * @param {number} amount - The new amount for the item.
 * @returns {CartItem[]} The updated state of the cart items.
 */
export const updateItemAmount = (prev: CartItem[], id: string, amount: number): CartItem[] => {
  return prev
    .map((item) => (item.id === id ? { ...item, amount: Math.max(0, amount) } : item))
    .filter((item) => item.amount > 0);
};

/**
 * Removes an item from the cart.
 *
 * @param {CartItem[]} prev - The previous state of cart items.
 * @param {string} id - The ID of the item to be removed.
 * @returns {CartItem[]} The updated state of the cart items.
 */
export const removeItemFromCart = (prev: CartItem[], id: string): CartItem[] => {
  return prev.filter((item) => item.id !== id);
};

/**
 * Clears the cart.
 *
 * @returns {CartItem[]} An empty array representing the cleared cart.
 */
export const clearCartItems = (): CartItem[] => {
  return [];
};
