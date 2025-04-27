import { Link } from "react-router-dom";
import { FaX } from "react-icons/fa6";
import { CartSidebarProps } from "../types/cartTypes";
import BaseButton from "./ui/BaseButton";
import { FaTrashAlt } from "react-icons/fa";

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-x-0 sm:top-[60px] h-full bg-black/50 transition-opacity z-40 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      ></div>

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 sm:top-[60px] border-t-2 right-0 w-full ml-5 sm:w-xl bg-white shadow-lg z-50 p-4 overflow-y-auto h-screen transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* NOTE!  add onClick event: Cart action button clear cart*/}
        <div className="flex justify-between">
          <BaseButton
            variant="ghost"
            type="button"
            className="text-xl font-black p-2 rounded-full hover:bg-gray-200"
            onClick={onClose}
          >
            <FaX />
          </BaseButton>
          <BaseButton variant="danger" type="button" className="text-sm font-black p-2 rounded-full hover:bg-gray-200">
            <FaTrashAlt className="mr-2" /> Clear all
          </BaseButton>
        </div>

        <h2 className="text-sm my-2">Shopping Cart</h2>

        {/* Insert Cart Items here */}
        <div></div>

        {/* Insert total amount here */}
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
          <p className="font-bold text-xl">Total: ${}</p>
          <Link
            to={"/cart"}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition"
            onClick={onClose}
          >
            Checkout
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
