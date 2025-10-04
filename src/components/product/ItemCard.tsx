import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../API/fetchApi";
import { RiStarLine } from "react-icons/ri";

interface ItemCardProps {
  product: Product;
}

/**
 * A card component that displays a product with image, title, price, discount, and rating.
 * Links to the product detail page.
 *
 * @param {ItemCardProps} props - Props containing the product data
 * @returns {JSX.Element} The product item card
 */
const ItemCard: React.FC<ItemCardProps> = ({ product }) => {
  const discountPercent = Math.round(
    ((product.price - product.discountedPrice) / product.price) * 100
  );

  return (
    <div className="relative bg-white/80 border border-gray-300 hover:border-gray-500 rounded-lg shadow-md p-4">
      <Link to={`/product/${product.id}`} className="block">
        {discountPercent > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {discountPercent}% OFF
          </span>
        )}

        <img
          src={product.image.url}
          alt={product.image.alt}
          className="w-full h-48 object-cover rounded-t-lg"
        />

        <h2 className="text-xl font-semibold mt-4">{product.title}</h2>

        <div className="mt-2">
          {product.discountedPrice < product.price ? (
            <>
              <p className="text-green-600 text-lg font-bold">
                ${product.discountedPrice.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </p>
            </>
          ) : (
            <p className="text-green-600 text-lg font-bold">
              ${product.price.toFixed(2)}
            </p>
          )}
        </div>

        <p className="text-yellow-500 flex items-center mt-1">
          <RiStarLine /> {product.rating} / 5
        </p>
      </Link>
    </div>
  );
};

export default ItemCard;
