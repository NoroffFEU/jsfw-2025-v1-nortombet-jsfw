// components/product/ProductSkeleton.tsx

const ProductSkeleton = () => {
  return (
    <div className="relative bg-white border rounded-lg shadow-md p-4 animate-pulse">
      <div className="absolute top-2 left-2 bg-gray-300 rounded px-4 py-1 w-16 h-5"></div>

      <div className="w-full h-48 bg-gray-300 rounded-t-lg mb-4"></div>

      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>

      <div className="h-5 bg-gray-300 rounded w-1/2 mb-1"></div>

      <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>

      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
    </div>
  );
};

export default ProductSkeleton;
