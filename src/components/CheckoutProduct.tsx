import Image from "next/image";
import { urlFor } from "../../sanity";
import { ChevronDownIcon } from "@heroicons/react/outline";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../app/cartSlice";
import toast from "react-hot-toast";
type CheckoutProductProps = {
  product: ProductInformation;
  id: string;
};
const CheckoutProduct = ({ product, id }: CheckoutProductProps) => {
  const dispatch = useDispatch();

  const removeItemFromCart = () => {
    dispatch(removeFromCart({ id }));

    toast.success(`${product.details.title} removed from basket`, {
      position: "bottom-center",
    });
  };

  return (
    <div className="flex flex-col gap-x-4 border-b border-gray-300 pb-5 lg:flex-row lg:items-center">
      <div className="relative h-44 w-44">
        <Image
          src={urlFor(product.details.image[0]).url()}
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div className="flex flex-1 items-end lg:items-center">
        <div className="flex-1 space-y-4">
          <div className="flex flex-col gap-x-8 text-xl lg:flex-row lg:text-2xl">
            <h4 className="font-semibold lg:w-96">{product.details.title}</h4>
            <p className="flex items-end gap-x-1 font-semibold">
              {product.quantity}
              <ChevronDownIcon className="h-6 w-6 text-blue-500" />
            </p>
          </div>

          <div className="flex flex-col items-end space-y-4">
            <h4 className="text-xl font-semibold lg:text-2xl">
              <Currency
                quantity={product.details.price * product.quantity}
                currency="USD"
              />
            </h4>
            <button
              onClick={removeItemFromCart}
              className="text-blue-500 hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProduct;
