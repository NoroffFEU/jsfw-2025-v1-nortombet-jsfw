import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import BaseButton from "../components/ui/BaseButton";
import { useCart } from "../context/cart/CartContext";

const CartOverview = () => {
  const { items, removeItem, totalPrice, totalSaved } = useCart();
  const navigate = useNavigate();

  const totalCostBeforeReduction = (totalPrice + totalSaved).toFixed(2);

  return (
    <section className="max-w-2xl mx-auto p-4 my-20 bg-gray-200 rounded-lg">
      <h1 className="text-4xl font-bold mb-4">Cart overview</h1>

      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="mb-4">Your cart is empty.</p>
          <Link to="/" className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
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
            <Link to="/" className="bg-gray-200 text-center text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
              Continue Shopping
            </Link>
            <BaseButton
              variant="primary"
              onClick={() => navigate("/checkout/details")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
