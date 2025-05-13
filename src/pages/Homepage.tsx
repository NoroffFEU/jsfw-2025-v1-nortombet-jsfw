import { useEffect, useState } from "react";
import { fetchProducts, Product } from "../API/fetchApi";
import SearchInput from "../components/product/SearchInput";
import SortDropdown from "../components/product/SortDropdown";
import { sortProducts, SortOption } from "../components/product/SortProduct";
import ItemCard from "../components/product/ItemCard";
import ProductSkeleton from "../components/skeletons/ProductSkeleton";

const Homepage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("title_asc");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err: any) {
        setError(err.message || "Error loading products");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    let filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    filtered = sortProducts(filtered, sortOption);
    setFilteredProducts(filtered);
  }, [searchTerm, sortOption, products]);

  if (error)
    return (
      <div className="text-center text-red-500 text-2xl p-10">
        Error: {error}
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Welcome to the Homepage!
      </h1>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 max-w-4xl mx-auto">
        <SearchInput value={searchTerm} onChange={setSearchTerm} />
        <SortDropdown onSortChange={setSortOption} />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {Array.from({ length: 6 }).map((_, idx) => (
            <ProductSkeleton key={idx} />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-700 mb-2">
            Sorry, no products found matching "{searchTerm}"
          </p>
          <p className="text-gray-500">Please try a different search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {filteredProducts.map((product) => (
            <ItemCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Homepage;
