// components/layout/CheckoutLayout.tsx
import { Outlet, useLocation } from "react-router-dom";
import ProgressBar from "../ui/ProgressBar";

const CHECKOUT_STEPS = [
  { name: "Cart", path: "/cart" },
  { name: "Details", path: "/checkout/details" },
  { name: "Success", path: "/checkout/success" },
];

const CheckoutLayout = () => {
  const location = useLocation();

  const currentStep = (() => {
    if (location.pathname.startsWith("/checkout/success")) return 2;
    if (location.pathname.startsWith("/checkout/details")) return 1;
    return 0;
  })();

  return (
    <main className="max-w-2xl mx-auto p-1 sm:p-4 my-20 min-h-[calc(100vh-10rem)]">
      <ProgressBar steps={CHECKOUT_STEPS} currentStep={currentStep} />
      <div className="mt-8">
        <Outlet />
      </div>
    </main>
  );
};

export default CheckoutLayout;
