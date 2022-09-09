import { ShoppingBagIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { forwardRef } from "react";
import { useSelector } from "react-redux";
import { selectCartCount } from "../app/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
const Cart = forwardRef<HTMLSpanElement>((props, ref) => {
  const cartCount = useSelector(selectCartCount);

  if (cartCount === 0) return null;

  return (
    <Link href="/checkout">
      <motion.div
        animate={{ scale: [0.5, 1.2, 1], opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 70,
          duration: 0.45,
        }}
        className="fixed bottom-10 right-10 z-50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-gray-300"
      >
        {cartCount > 0 && (
          <motion.span
            ref={ref}
            className="bg-gradient-primary absolute -right-2 -top-2 z-50 flex h-7 w-7 items-center justify-center rounded-full text-[10px] text-white"
          >
            {cartCount}
          </motion.span>
        )}
        <ShoppingBagIcon className="headerIcon h-8 w-8" />
      </motion.div>
    </Link>
  );
});

export default Cart;
