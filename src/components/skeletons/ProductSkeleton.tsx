/**
 * A skeleton placeholder component for a product card.
 * Used to display loading state while product data is being fetched.
 *
 * @returns {JSX.Element} The product skeleton placeholder
 */
const ProductSkeleton = () => {
  return (
    <div className="relative bg-white border rounded-lg shadow-md p-4 animate-pulse">
      <div className="w-full h-48 bg-gray-300 rounded-t-lg mb-4" />

      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />

      <div className="h-5 bg-gray-300 rounded w-1/2 mb-1" />

      <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />

      <div className="h-4 bg-gray-300 rounded w-1/4" />
    </div>
  );
};

export default ProductSkeleton;
