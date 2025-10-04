import { useState, useEffect } from "react";
import { Product } from "../types/productTypes";

/**
 * Custom hook to fetch a single product by its ID.
 *
 * @param {string | undefined} id - The ID of the product to fetch.
 * @returns {{
 *   product: Product | null;
 *   loading: boolean;
 *   error: string | null;
 * }} An object containing the product data, loading state, and error message (if any).
 */
export const useProduct = (id: string | undefined) => {
  /** The fetched product */
  const [product, setProduct] = useState<Product | null>(null);

  /** Loading state while fetching product */
  const [loading, setLoading] = useState<boolean>(true);

  /** Error message if fetch fails */
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    /**
     * Fetches the product from the API by ID
     */
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://v2.api.noroff.dev/online-shop/${id}`
        );

        if (!response.ok) throw new Error("Product not found");

        const { data } = await response.json();
        setProduct(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch product"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};
