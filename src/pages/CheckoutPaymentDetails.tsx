// components/checkout/CheckoutDetails.tsx
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BaseButton from "../components/ui/BaseButton";
import { useCart } from "../context/cart/CartContext";
import PersonalInformation from "../components/checkout/PersonalInformation";
import CCInformation from "../components/checkout/CCInformation";

interface PersonalInformation {
  fullName: string;
  address: string;
  city: string;
  country: string;
}

const CheckoutDetails = () => {
  const [isCCValid, setIsCCValid] = useState(true);
  const [personalFormData] = useState({
    fullName: "Person Personen",
    address: "Hovedstrøget 15b",
    city: "Oslo",
    country: "Norway",
  });
  const { items, totalPrice, totalSaved } = useCart();
  const totalCostBeforeReduction = (totalPrice + totalSaved).toFixed(2);
  const navigate = useNavigate();
  const ccInfoRef = useRef<any>(null);

  const onClickAddMyDetails = () => {
    ccInfoRef.current?.fillCardInfo({
      cardName: "Person Personen",
      cardNumber: "4242424242424242",
      expiry: "12/33",
      cvv: "123",
    });
  };

  useEffect(() => {
    if (items.length === 0) {
      toast.info("Your cart is empty — returning to cart.");
      navigate("/cart", { replace: true });
    }
  }, [items, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderNumber = Math.floor(100000000000 + Math.random() * 900000000000).toString();
    sessionStorage.setItem("checkoutCompleted", "true");
    navigate(`/checkout/success/${orderNumber}`);
    toast.success(`Purchase completed. Order ${orderNumber}`);
  };

  return (
    <div className="max-w-2xl mx-auto my-20 bg-gray-200 p-2 sm:p-4 rounded-lg">
      <h1 className="text-4xl font-bold ">Checkout Details</h1>

      <PersonalInformation
        fullName={personalFormData.fullName}
        address={personalFormData.address}
        city={personalFormData.city}
        country={personalFormData.country}
      />
      <BaseButton variant="primary" type="button" onClick={onClickAddMyDetails} className="px-4 py-2 my-2">
        Use my stored credit card
      </BaseButton>
      <form onSubmit={handleSubmit} noValidate autoComplete="false">
        <div className="grid grid-cols-1 gap-6 mb-8">
          {/* <PersonalInformation formData={personalFormData} /> */}
          <CCInformation ref={ccInfoRef} onValidationChange={setIsCCValid} />
        </div>

        <section className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4 bg-gray-50 p-2 rounded">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between gap-2">
                <span>
                  {item.name} × {item.amount}
                </span>
                <span>${((item.discountedPrice ?? item.price) * item.amount).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <section className="border-t pt-3">
            <dl className="flex justify-between font-semibold text-lg">
              <dt>Items total:</dt>
              <dd className={` text-gray-700 ${totalSaved > 0 && "line-through"}`}>${totalCostBeforeReduction}</dd>
            </dl>
          </section>

          <section className="mb-6">
            <dl className="flex justify-between font-semibold text-lg">
              <dt>Items discount:</dt>
              {totalSaved > 0 ? (
                <dd className="text-green-500">-${totalSaved.toFixed(2)}</dd>
              ) : (
                <dd className={` text-black`}>$0</dd>
              )}
            </dl>
          </section>

          <section className="border-t pt-3 mb-6">
            <dl className="flex justify-between font-bold text-2xl">
              <dt>Total:</dt>
              <dd>${totalPrice.toFixed(2)}</dd>
            </dl>
          </section>

          <div className="flex flex-col-reverse gap-4 sm:flex-row justify-between mt-6">
            <BaseButton
              variant="secondary"
              type="button"
              onClick={() => navigate("/cart")}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            >
              Back to Cart
            </BaseButton>
            <BaseButton
              variant="primary"
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-800"
              disabled={!isCCValid}
            >
              Complete Purchase
            </BaseButton>
          </div>
        </section>
      </form>
    </div>
  );
};

export default CheckoutDetails;
