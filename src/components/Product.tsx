import { useDispatch } from "react-redux";
import Image from "next/image";
import { urlFor } from "../../sanity";
import { ShoppingCartIcon } from "@heroicons/react/outline";
import { addToCart } from "../app/cartSlice";
import toast from "react-hot-toast";

type ProductProps = {
  product: Product;
};

const Product = ({ product }: ProductProps) => {
  const dispatch = useDispatch();

  const addItemToCart = () => {
    dispatch(addToCart(product));

    toast.success(`${product.title} added to basket`, {
      position: "bottom-center",
    });
  };
  return (
    <div className=" bg-primary-dark-200 hover:bg-primary-dark group flex h-fit w-[320px] select-none flex-col space-y-3 rounded-xl p-8 transition duration-300 md:h-[500px] md:w-[400px] md:p-10">
      <div className="relative h-64 w-full  md:h-96">
        <Image
          src={urlFor(product.image[0]).url()}
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div className="flex flex-1 items-center justify-between space-x-3">
        <div className="space-y-2 text-xl text-white md:text-2xl">
          <p>{product.title}</p>
          <p>{product.price}</p>
        </div>

        <div
          className="bg-gradient-primary flex h-16 w-16 flex-shrink-0 cursor-pointer items-center justify-center rounded-full transition duration-300 hover:scale-105 md:h-[70px] md:w-[70px]"
          onClick={addItemToCart}
        >
          <ShoppingCartIcon className="h h-8 w-8 text-white" />
        </div>
      </div>
    </div>
  );
};

export default Product;
