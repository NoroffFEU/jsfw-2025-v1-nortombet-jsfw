import React from "react";

type SortOption =
  | "price_asc"
  | "price_desc"
  | "title_asc"
  | "title_desc"
  | "discountedPrice_asc"
  | "discountedPrice_desc";

interface SortDropdownProps {
  onSortChange: (option: SortOption) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ onSortChange }) => {
  return (
    <div className="w-full flex items-center">
      <label htmlFor="sort" className="mr-2 w-full max-w-fit text-lg">
        Sort By:
      </label>
      <select
        id="sort"
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="p-3 border bg-white/60 border-gray-300 rounded w-full shadow-sm"
      >
        <option value="title_asc">Title A-Z</option>
        <option value="title_desc">Title Z-A</option>
        <option value="price_asc">Price Low to High</option>
        <option value="price_desc">Price High to Low</option>
        <option value="discountedPrice_asc">Discounted Price Low to High</option>
        <option value="discountedPrice_desc">Discounted Price High to Low</option>
      </select>
    </div>
  );
};

export default SortDropdown;
