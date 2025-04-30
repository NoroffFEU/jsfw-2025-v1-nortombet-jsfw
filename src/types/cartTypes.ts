export type CartSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export interface CartItem {
  id: string;
  name: string;
  price: number;
  amount: number;
  image: string;
  discountedPrice?: number;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateAmount: (id: string, amount: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  hasItem: (id: string) => boolean;
  totalItems: number;
  totalPrice: number;
}

export interface CartItemProps {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}
