import { Link } from "react-router-dom";
import { FaX } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { CartSidebarProps } from "../types/cartTypes";
import BaseButton from "./ui/BaseButton";
import { useCart } from "../context/cart/CartContext";

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { items, totalPrice, clearCart } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity z-40 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <BaseButton
              variant="ghost"
              type="button"
              className="text-xl font-black p-2 rounded-full hover:bg-gray-200"
              onClick={onClose}
            >
              <FaX />
            </BaseButton>
            <BaseButton
              variant="danger"
              type="button"
              className="text-sm font-black p-2 rounded-full hover:bg-gray-200 flex items-center"
              onClick={clearCart}
            >
              <FaTrashAlt className="mr-2" /> Clear all
            </BaseButton>
          </div>

          <h2 className="text-lg font-semibold mb-2">Shopping Cart</h2>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto space-y-3">
            {items.length === 0 ? (
              <p className="w-full border border-gray-400 rounded text-center py-16">Your cart is empty.</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="border rounded-lg p-3 shadow-sm bg-red-300">
                  <span>{item.name}</span>
                  <p className="font-black">!!!! TEMPORARY CARD !!!!</p>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="font-bold text-xl">Total: ${totalPrice.toFixed(2)}</p>
            <Link
              to="/cart"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition"
              onClick={onClose}
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
