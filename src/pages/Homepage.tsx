import React, {useEffect, useState } from 'react';
import { fetchProducts, Product } from "../API/fetchApi";
fetchProducts

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
  return <div className="bg-red-400">Hello I am homepage</div>;
};

export default Homepage;
