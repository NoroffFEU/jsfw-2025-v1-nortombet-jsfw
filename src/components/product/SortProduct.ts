import { Product } from "../../API/fetchApi";

// Type for supported sorting options
export type SortOption =
  | "price_asc"
  | "price_desc"
  | "title_asc"
  | "title_desc"
  | "discountedPrice_asc"
  | "discountedPrice_desc";

// Sorting function
export const sortProducts = (products: Product[], option: SortOption): Product[] => {
  const sorted = [...products]; // Avoid mutating the original array

  switch (option) {
    case "title_asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "title_desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case "price_asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price_desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "discountedPrice_asc":
      return sorted.sort((a, b) => a.discountedPrice - b.discountedPrice);
    case "discountedPrice_desc":
      return sorted.sort((a, b) => b.discountedPrice - a.discountedPrice);
    default:
      return products; // Fallback: return original array unmodified
  }
};
