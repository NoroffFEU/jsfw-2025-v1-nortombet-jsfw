import React, { useEffect, useState } from 'react';
import { fetchProducts, Product } from "../API/fetchApi";
import SearchInput from "../components/product/SearchInput";
import SortDropdown from "../components/product/SortDropdown";
import { sortProducts, SortOption } from "../components/product/SortProduct"; // Ensure correct path
import ItemCard from '../components/product/ItemCard';


const Homepage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");  // State for the search term
  const [sortOption, setSortOption] = useState<SortOption>("title_asc");

  // Fetch products from API
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);  // Initially show all products
      } catch (err: any) {
        setError(err.message || 'Error loading products');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Filter and sort products based on search term and sorting option
  useEffect(() => {
    let filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) // Filter based on search term
    );
    filtered = sortProducts(filtered, sortOption);  // Apply sorting
    setFilteredProducts(filtered);
  }, [searchTerm, sortOption, products]);  // Reapply filtering and sorting when these change

  if (loading) return <div className="text-center text-2xl p-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 text-2xl p-10">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Welcome to the Homepage!</h1>

      {/* Search & Sort Controls */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-6 max-w-4xl mx-auto">
        <SearchInput value={searchTerm} onChange={setSearchTerm} /> {/* Passing value and setSearchTerm */}
        <SortDropdown onSortChange={setSortOption} />
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ItemCard key={product.id} product={product}/>
         
        ))}
      </div>
    </div>
  );
};

export default Homepage;
