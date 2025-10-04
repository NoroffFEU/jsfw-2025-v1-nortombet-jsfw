import { Product } from "../types/productTypes";

/**
 * Fetches all products from the Noroff Online Shop API.
 *
 * @async
 * @function fetchProducts
 * @returns {Promise<Product[]>} A promise that resolves to an array of product objects.
 * @throws {Error} Throws an error if the network request fails or the response is not OK.
 *
 * @example
 * ```ts
 * try {
 *   const products = await fetchProducts();
 *   console.log(products);
 * } catch (error) {
 *   console.error("Error fetching products:", error);
 * }
 * ```
 */
export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("https://v2.api.noroff.dev/online-shop", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.statusText}`);
  }

  const data = await res.json();

  return data.data;
}
