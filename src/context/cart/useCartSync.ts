import { useEffect } from "react";
import { CartItem } from "../../types/cartTypes";

/**
 * Hook to keep cart state synchronized across browser tabs.
 *
 * Listens for changes to localStorage under the key value 'cart' and updates
 * the state if changes are detected in another tab.
 *
 * @param {React.Dispatch<React.SetStateAction<CartItem[]>>} setItems - Setter for updating the cart items state.
 *
 * @example
 * const [items, setItems] = useState<CartItem[]>([]);
 * useCartSync(setItems);
 */
export const useCartSync = (setItems: React.Dispatch<React.SetStateAction<CartItem[]>>) => {
  useEffect(() => {
    const syncCart = (e: StorageEvent) => {
      if (e.key === "cart" && e.newValue) {
        try {
          setItems(JSON.parse(e.newValue));
        } catch (err) {
          console.error("Failed to sync cart items from localStorage", err);
        }
      }
    };

    window.addEventListener("storage", syncCart);
    return () => window.removeEventListener("storage", syncCart);
  }, [setItems]);
};
