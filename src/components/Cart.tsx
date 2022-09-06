import { ShoppingBagIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectCartCount } from "../app/cartSlice";

const Cart = () => {
  const cartCount = useSelector(selectCartCount);

  if (cartCount === 0) return null;

  return (
    <Link href="/checkout">
      <div className="fixed bottom-10 right-10 z-50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-gray-300">
        {cartCount > 0 && (
          <span className="bg-gradient-primary absolute -right-2 -top-2 z-50 flex h-7 w-7 items-center justify-center rounded-full text-[10px] text-white">
            {cartCount}
          </span>
        )}
        <ShoppingBagIcon className="headerIcon h-8 w-8" />
      </div>
    </Link>
  );
};

export default Cart;
