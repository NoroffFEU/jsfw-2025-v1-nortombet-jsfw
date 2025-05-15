import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import BaseButton from "../components/ui/BaseButton";
import { useCart } from "../context/cart/CartContext";
import { useEffect } from "react";

const CartOverview = () => {
  const { items, removeItem, totalPrice, totalSaved } = useCart();
  const navigate = useNavigate();
  const totalCostBeforeReduction = (totalPrice + totalSaved).toFixed(2);

  useEffect(() => {
    document.title = "Online Shop | Cart Overview";
  }, []);

  return (
    <section className="max-w-2xl mx-auto p-4 my-20 bg-white/80 rounded-lg">
      <h1 className="text-4xl font-bold mb-4">Cart overview</h1>

      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="mb-4">Your cart is empty.</p>
          <Link to="/" className="inline-block bg-[#9F8383]/80 text-white hover:bg-[#9F8383]  px-4 py-2 rounded">
            Back to Shopping
          </Link>
        </div>
      ) : (
        <div>
          <div className="space-y-3 mb-4 ">
            {items.map((item) => (
              <article key={item.id} className="flex justify-between gap-2 items-center pb-2 bg-gray-50 p-1 rounded">
                <div className="flex-1">
                  <h2>
                    {item.name} × {item.amount}
                  </h2>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium">
                    ${((item.discountedPrice || item.price) * item.amount).toFixed(2)}
                  </span>
                  <BaseButton
                    variant="danger"
                    onClick={() => removeItem(item.id)}
                    className="p-1"
                    aria-label="Remove item"
                  >
                    <FaTrash size={14} />
                  </BaseButton>
                </div>
              </article>
            ))}
          </div>
          <section className="border-t pt-3">
            <dl className="flex justify-between font-bold text-lg">
              <dt>Items total:</dt>
              <dd className={`text-gray-600 ${totalSaved > 0 && "line-through"} `}>${totalCostBeforeReduction}</dd>
            </dl>
          </section>
          <section className="mb-6">
            <dl className="flex justify-between font-bold text-lg">
              <dt>Items discount:</dt>
              {totalSaved > 0 ? (
                <dd className="text-green-600">-${totalSaved.toFixed(2)}</dd>
              ) : (
                <dd className="text-gray-600">$0</dd>
              )}
            </dl>
          </section>
          <section className="border-t pt-3 mb-6">
            <dl className="flex justify-between font-bold text-2xl">
              <dt>Total:</dt>
              <dd>${totalPrice.toFixed(2)}</dd>
            </dl>
          </section>

          <div className="flex flex-col-reverse sm:flex-row gap-2 justify-between">
            <Link
              to="/"
              className="bg-gray-300 border-1 border-gray-400 text-center text-gray-800 px-4 py-2 rounded hover:bg-gray-400/60"
            >
              Continue Shopping
            </Link>
            <BaseButton
              variant="primary"
              onClick={() => navigate("/checkout/details")}
              className="text-white px-4 py-2 rounded"
              disabled={items.length === 0}
            >
              Proceed to Checkout
            </BaseButton>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartOverview;
