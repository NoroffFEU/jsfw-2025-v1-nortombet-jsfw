import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useOneTimeAccess } from "../hooks/useOneTimeAccess";
import { useCart } from "../context/cart/CartContext";

const CheckoutSuccess = () => {
  const { clearCart } = useCart();
  const { orderNumber } = useParams();

  useEffect(() => {
    document.title = "Online Shop | Cart Successful";
  }, []);

  useOneTimeAccess("/");

  useEffect(() => {
    clearCart();
  }, [orderNumber]);

  return (
    <>
      <div className="my-20 bg-gray-200 p-4 rounded-lg ">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <h1 className="text-4xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-lg">Thank you for your purchase</p>
        </div>

        <div className="mb-6  ">
          <p className="text-xl mb-2">Your order number is:</p>
          <p className="text-2xl font-bold">{orderNumber}</p>
        </div>

        <p className="mb-6">A confirmation email has been sent to your registered email address.</p>

        <Link to="/" className=" text-white px-4 py-2 rounded  place-self-center">
          Continue Shopping
        </Link>
      </div>
      <p className="mt-4">
        Need help?{" "}
        <Link to="/contact" className="text-blue-600 underline">
          Contact support
        </Link>
        .
      </p>
    </>
  );
};

export default CheckoutSuccess;
