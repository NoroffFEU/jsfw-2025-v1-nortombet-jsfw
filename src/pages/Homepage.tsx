import React, { useEffect, useState } from 'react';
import { fetchProducts, Product } from "../API/fetchApi";

const Homepage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProducts();
        console.log(data);
        setProducts(data);
      } catch (err: any) {
        setError(err.message || 'Error loading products');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <div className="text-center text-2xl p-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-2xl p-10">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Welcome to the Homepage!</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
            <img src={product.image.url} alt={product.image.alt} className="h-48 w-full object-cover rounded-md mb-4" />
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-green-600 font-bold mt-2">${product.discountedPrice.toFixed(2)}</p>
            <p className="text-gray-500 mt-1">⭐ {product.rating} / 5</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
