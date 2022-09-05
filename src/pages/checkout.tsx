import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../app/cartSlice";
import Button from "../common/Button";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { api } from "../utils/api-utils";
import Stripe from "stripe";
import getStripe from "../helpers/getStripe";
type CartItemsInformation = Record<string, ProductInformation>;

type CheckoutProps = {};

const Checkout: NextPage<CheckoutProps> = () => {
  const items = useSelector(selectCartItems);
  const router = useRouter();
  const cartTotal = useSelector(selectCartTotal);
  const [groupedCartItems, setGroupedCartItems] =
    useState<CartItemsInformation>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createCheckoutSession = async () => {
    setIsLoading(true);

    const checkoutSession = await api.post<
      { items: Product[] },
      Stripe.Checkout.Session
    >("checkout_sessions", { items: items });

    // Internal Server Error
    if ((checkoutSession as any).statusCode === 500) {
      console.error((checkoutSession as any).message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      sessionId: checkoutSession.id,
    });

    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);

    setIsLoading(false);
  };

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      return results[item._id]
        ? {
            ...results,
            [item._id]: {
              details: item,
              quantity: results[item._id].quantity + 1,
            },
          }
        : {
            ...results,
            [item._id]: {
              details: item,
              quantity: 1,
            },
          };
    }, {} as CartItemsInformation);

    console.log(groupedItems);

    setGroupedCartItems(groupedItems);
  }, [items]);

  return (
    <div className="min-h-screen overflow-hidden bg-[#E7ECEE]">
      <Head>
        <title>Bag - Apple</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="mx-auto max-w-5xl pb-24">
        <div className="px-5">
          <h1 className="my-4 text-3xl font-semibold lg:text-4xl">
            {items.length > 0 ? "Review your bag." : "Your bag is empty."}
          </h1>
          <p className="my-4">Free delivery and free returns.</p>

          {items.length === 0 && (
            <Button
              title="Continue Shopping"
              onClick={() => router.push("/")}
            />
          )}
        </div>

        {items.length > 0 && (
          <div className="mx-5 md:mx-8">
            {Object.entries(groupedCartItems).map(([key, product]) => (
              <CheckoutProduct key={key} product={product} id={key} />
            ))}
            <div className="my-12 mt-6 ml-auto max-w-3xl">
              <div className="divide-y divide-gray-300">
                <div className="pb-4">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>
                      <Currency quantity={cartTotal} currency="USD" />
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <p>Shipping</p>
                    <p>FREE</p>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-x-1 lg:flex-row">
                      Estimated tax for:{" "}
                      <p className="flex cursor-pointer items-end text-blue-500 hover:underline">
                        Enter zip code
                        <ChevronDownIcon className="h-6 w-6" />
                      </p>
                    </div>
                    <p>$ -</p>
                  </div>
                </div>

                <div className="flex justify-between pt-4 text-xl font-semibold">
                  <h4>Total</h4>
                  <h4>
                    <Currency quantity={cartTotal} currency="USD" />
                  </h4>
                </div>
              </div>

              <div className="my-14 space-y-4">
                <h4 className="text-xl font-semibold">
                  How would you like to check out?
                </h4>
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="order-2 flex flex-1 flex-col items-center rounded-xl bg-gray-200 p-8 py-12 text-center">
                    <h4 className="mb-4 flex flex-col text-xl font-semibold">
                      <span>Pay Monthly</span>
                      <span>with Apple Card</span>
                      <span>
                        $283.16/mo. at 0% APR<sup className="-top-1">◊</sup>
                      </span>
                    </h4>
                    <Button title="Check Out with Apple Card Monthly Installments" />
                    <p className="mt-2 max-w-[240px] text-[13px]">
                      $0.00 due today, which includes applicable full-price
                      items, down payments, shipping, and taxes.
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col items-center space-y-8 rounded-xl bg-gray-200 p-8 py-12 md:order-2">
                    <h4 className="mb-4 flex flex-col text-xl font-semibold">
                      Pay in full
                      <span>
                        <Currency quantity={cartTotal} currency="USD" />
                      </span>
                    </h4>

                    <Button
                      noIcon
                      loading={isLoading}
                      title="Check Out"
                      width="w-full"
                      onClick={createCheckoutSession}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Checkout;
