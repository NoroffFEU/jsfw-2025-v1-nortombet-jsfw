import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useProduct } from "../hooks/useProduct";
import StarRating from "../components/product/StarRating";
import BaseButton from "../components/ui/BaseButton";
import { useCart } from "../context/cart/CartContext";
import { toast } from "react-toastify";
import SinglePageSkeleton from "../components/skeletons/SinglePageSkeleton";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProduct(id);
  const [quantity, setQuantity] = useState<number>(1);
  const { addItem, hasItem } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  const toggleReviews = () => {
    setIsVisible(!isVisible);
  };

  const onAddToCartClick = () => {
    if (!product) return;
    addItem({
      id: product.id.toString(),
      name: product.title,
      price: product.price,
      discountedPrice: product.discountedPrice,
      amount: quantity,
      image: product.image.url,
    });

    toast.success(`${product.title} x${quantity} added to cart`);
  };

  if (loading) return <SinglePageSkeleton />;
  if (error || !product)
    return (
      <p className=" min-h-svh bg-amber-50 flex justify-center pt-20 text-red-500 text-2xl ">
        Error: {error || "Product not found"}
      </p>
    );

  const discount = product.price - product.discountedPrice;
  const discountPercentage = Math.round((discount / product.price) * 100);

  return (
    <div className="bg-linear-180 from-white/75 to-transparent container mx-auto p-4 min-h-[75vh] max-w-5xl my-30 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img src={product.image.url} alt={product.image.alt} className="w-full" />

        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>

          <div className="my-2">
            <StarRating rating={product.rating} />
          </div>

          <div className="my-3">
            {discount > 0 ? (
              <>
                <span className="font-bold">${product.discountedPrice.toFixed(2)}</span>
                <span className="ml-2 line-through">${product.price.toFixed(2)}</span>
                <span className="ml-2 bg-red-500 text-white px-2 py-1 text-xs">{discountPercentage}% OFF</span>
              </>
            ) : (
              <span className="font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>

          <p className="my-3">{product.description}</p>

          {product.tags && product.tags.length > 0 && (
            <div className="my-3">
              <h2 className="font-semibold">Tags</h2>
              <div className="flex flex-wrap gap-1">
                {product.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-300 rounded-sm px-2 py-1 text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="my-4">
            <div className="flex items-center mb-2">
              <label htmlFor="quantity" className="mr-2">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="bg-white/80 rounded-sm border w-16 px-2 py-1"
              />
            </div>
            <BaseButton className="py-2 px-4 flex items-center" onClick={onAddToCartClick}>
              <FaShoppingCart className="mr-2" />
              Add to Cart
            </BaseButton>
            {hasItem(product.id.toString()) && <div className="mt-2 text-sm text-green-600">Item already in cart.</div>}
          </div>
        </div>
      </div>

      {product.reviews && product.reviews.length > 0 && (
        <div className="mt-8">
          <div className="flex align-baseline gap-4 cursor-pointer mb-4 " onClick={toggleReviews}>
            <h2 className="text-xl font-bold ">Customer Reviews </h2>
            <span className="text-gray-500 font-medium">({product.reviews.length})</span>
            {isVisible ? <IoIosArrowUp size={35} /> : <IoIosArrowDown size={35} />}
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${isVisible ? "grid" : "hidden"}`}>
            {product.reviews.map((review) => (
              <div key={review.id} className="border border-gray-400 rounded-md p-4 bg-white/40">
                <div className="flex justify-between mb-2">
                  <h3 className="font-bold">{review.username}</h3>
                  <StarRating rating={review.rating} />
                </div>
                <p>{review.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
