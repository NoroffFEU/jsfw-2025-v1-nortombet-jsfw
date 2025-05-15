import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import { CartItemProps } from "../../types/cartTypes";
import BaseButton from "../ui/BaseButton";

const CartItemCard = ({ item, onIncrease, onDecrease, onRemove }: CartItemProps) => {
  const [showConfirmRemove, setShowConfirmRemove] = useState(false);

  const handleDecrease = () => {
    if (item.amount === 1) {
      setShowConfirmRemove(true);
    } else {
      onDecrease();
    }
  };

  const onRemoveItemClick = () => {
    if (item.amount >= 1) {
      setShowConfirmRemove(true);
    }
  };

  const confirmRemove = () => {
    onRemove();
    toast.warning(`${item.name} removed from cart`);
    setShowConfirmRemove(false);
  };

  const cancelRemove = () => {
    setShowConfirmRemove(false);
  };

  return (
    <article className="relative flex flex-col gap-4 items-center justify-between border-b py-4 text-black">
      <div className="flex justify-start w-full gap-2">
        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
        <div className="flex flex-col w-3/5">
          <h3 className="text-lg text-wrap font-medium">{item.name}</h3>
          <p className="font-semibold">
            {item.price <= item.discountedPrice ? (
              <span className="text-black">${item.price.toFixed(2)}</span>
            ) : (
              <>
                <span className="line-through mr-2">${item.price}</span>
                <span className="text-red-500">${item.discountedPrice}</span>
              </>
            )}
          </p>
        </div>
      </div>

      <div className="flex w-full flex-row-reverse justify-between">
        <div className="flex items-center space-x-2">
          <BaseButton
            variant="ghost"
            onClick={handleDecrease}
            className="px-2 py-1 rounded-full hover:bg-gray-300 transition"
            aria-label="Decrease quantity"
          >
            <FiMinusCircle />
          </BaseButton>
          <span className="w-6 text-center">{item.amount}</span>
          <BaseButton
            variant="ghost"
            onClick={onIncrease}
            className="px-2 py-1 rounded-full hover:bg-gray-300 transition"
            aria-label="Increase quantity"
          >
            <FiPlusCircle />
          </BaseButton>
        </div>
        <BaseButton
          variant="danger"
          onClick={onRemoveItemClick}
          className="text-white transition rounded-full w-8"
          aria-label="Remove item"
        >
          <FaTrashAlt />
        </BaseButton>
      </div>

      {showConfirmRemove && (
        <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center text-sm font-medium z-10 rounded-lg shadow-md border">
          <p className="mb-2">
            Remove <strong>{item.name}</strong> from cart?
          </p>
          <div className="flex gap-4">
            <BaseButton variant="danger" onClick={confirmRemove} className="px-3 py-1 text-white rounded">
              Yes
            </BaseButton>
            <BaseButton variant="secondary" onClick={cancelRemove} className="px-3 py-1">
              No
            </BaseButton>
          </div>
        </div>
      )}
    </article>
  );
};

export default CartItemCard;
