import React from 'react';

// Define the sorting options (you can expand this as needed)
type SortOption = "price_asc" | "price_desc" | "title_asc" | "title_desc" | "discountedPrice_asc" | "discountedPrice_desc";

interface SortDropdownProps {
  onSortChange: (option: SortOption) => void;  // A function that gets called when sorting changes
}

const SortDropdown: React.FC<SortDropdownProps> = ({ onSortChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="sort" className="mr-2">Sort By:</label>
      <select
        id="sort"
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="p-2 border rounded"
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
