import { Link } from "react-router-dom";
import { FaX } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { CartSidebarProps } from "../types/cartTypes";
import BaseButton from "./ui/BaseButton";
import CartItemCard from "./product/CartItemCard";
import { toast } from "react-toastify";
import { useState } from "react";
import { useCart } from "../context/cart/CartContext";

/**
 * Sidebar component for displaying shopping cart items.
 * Allows users to increase, decrease, remove items, clear cart, and proceed to checkout.
 *
 * @param {CartSidebarProps} props - Props including open state and close handler
 * @returns {JSX.Element} The cart sidebar component
 */
const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { items, totalPrice, clearCart, updateAmount, removeItem } = useCart();
  const [isConfirmClear, setIsConfirmClear] = useState(false);

  const handleIncrease = (itemId: string) => {
    const item = items.find((item) => item.id === itemId);
    if (item) {
      updateAmount(itemId, item.amount + 1);
    }
  };

  const handleDecrease = (itemId: string) => {
    const item = items.find((item) => item.id === itemId);
    if (item) {
      const newAmount = item.amount - 1;
      if (newAmount <= 0) {
        if (confirm("Remove this item from the cart?")) {
          updateAmount(itemId, 0);
        }
      } else {
        updateAmount(itemId, newAmount);
      }
    }
  };

  const onClearAllClick = () => {
    if (items.length === 0) return;
    setIsConfirmClear(true);
  };

  const confirmClearCart = () => {
    clearCart();
    toast.warning("Cart has been cleared");
    setIsConfirmClear(false);
  };

  const cancelClearCart = () => {
    setIsConfirmClear(false);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 text-black transition-opacity z-40 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-lg 2xl:max-w-3xl bg-white shadow-2xl z-50 transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex justify-between items-center mb-4">
            <BaseButton
              variant="ghost"
              type="button"
              className="text-xl text-gray-500 font-black p-2 rounded-full hover:bg-gray-200"
              onClick={onClose}
              aria-label="Close cart window"
            >
              <FaX />
            </BaseButton>
            <BaseButton
              variant="danger"
              type="button"
              className="text-sm font-black p-2 rounded-full hover:bg-gray-200 flex items-center"
              onClick={onClearAllClick}
              aria-label="Remove all cart items"
            >
              <FaTrashAlt className="mr-2" /> Clear all
            </BaseButton>
          </div>

          <h2 className="text-lg text-black font-semibold mb-2">
            Shopping Cart
          </h2>

          {isConfirmClear && (
            <div className="absolute top-0 left-0 w-full bg-black/70 text-white p-4 text-center">
              <p>Are you sure you want to clear your cart?</p>
              <div className="flex justify-center gap-4 mt-2">
                <BaseButton
                  variant="danger"
                  className="px-4 py-2 rounded-full"
                  onClick={confirmClearCart}
                  aria-label="Confirm clear cart"
                >
                  Yes, clear cart
                </BaseButton>
                <BaseButton
                  variant="ghost"
                  className="px-4 py-2 rounded-full"
                  onClick={cancelClearCart}
                  aria-label="Cancel clear cart"
                >
                  Cancel
                </BaseButton>
              </div>
            </div>
          )}

          <section className="flex-1 overflow-y-auto space-y-3">
            {items.length === 0 ? (
              <p className="w-full text-black border border-gray-400 rounded text-center py-16">
                Your cart is empty.
              </p>
            ) : (
              items.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onIncrease={() => handleIncrease(item.id)}
                  onDecrease={() => handleDecrease(item.id)}
                  onRemove={() => removeItem(item.id)}
                />
              ))
            )}
          </section>

          <section className="mt-4 pt-4 border-t flex flex-col sm:flex-row justify-between items-center gap-2 pb-8 border-t-gray-400">
            <h2 className="font-bold text-xl text-black">
              Total: ${totalPrice.toFixed(2)}
            </h2>
            <Link
              to="/cart"
              className="bg-[#9F8383]/80 00 text-2xl text-white hover:bg-[#9F8383] font-semibold py-2 px-4 rounded-full transition"
              onClick={onClose}
              aria-label="Go to checkout process"
            >
              Checkout
            </Link>
          </section>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
