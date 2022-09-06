import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { fetchCategories } from "../helpers/fetchCategories";
import { fetchProducts } from "../helpers/fetchProducts";
import Product from "../components/Product";
import Cart from "../components/Cart";
import { getSession } from "next-auth/react";
import type { Session } from "next-auth";
type HomeProps = {
  categories: Category[];
  products: Product[];
  session: Session | null;
};
const Home: NextPage<HomeProps> = ({ categories, products, session }) => {
  console.log(categories);
  console.log(products);

  //TODO: Use CategoryType in the actual Category Type as _type -to be implemented
  const showProducts = (category: CategoryType) => {
    let categoryNumber: number;
    switch (category) {
      case "IPAD":
        categoryNumber = 0;
        break;
      case "APPLE-WATCH":
        categoryNumber = 1;
        break;
      case "MAC":
        categoryNumber = 2;
        break;
      case "IPHONE":
        categoryNumber = 3;
        break;
    }

    return products
      .filter(
        (product) => product.category._ref === categories[categoryNumber]._id
      )
      .map((product) => <Product product={product} key={product._id} />);
  };

  return (
    <div className="">
      <Head>
        <title>Apple Redesign</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Cart />

      <main className="bg- relative h-[200vh] bg-[#EAECED]">
        <Hero />
      </main>

      <section className="relative z-40 -mt-[100vh] min-h-screen bg-[#1B1B1B]">
        <div className="space-y-10 py-16">
          <h1 className="text-center text-4xl font-medium tracking-wide text-white md:text-5xl">
            New Promos
          </h1>
        </div>

        <Tab.Group>
          <Tab.List className="flex justify-center">
            {categories.map((category) => (
              <Tab
                key={category._id}
                id={category._id}
                className={({ selected }) =>
                  `whitespace-nowrap rounded-t-lg py-3 px-5 text-sm font-light outline-none md:py-4 md:px-6 md:text-base ${
                    selected
                      ? "borderGradient bg-[#35383C] text-white"
                      : "border-b-2 border-[#35383C] text-[#747474]"
                  }`
                }
              >
                {category.title}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mx-auto max-w-fit pt-10 pb-24 sm:px-4">
            <Tab.Panel className="tabPanel">{showProducts("IPAD")}</Tab.Panel>
            <Tab.Panel className="tabPanel">
              {showProducts("APPLE-WATCH")}
            </Tab.Panel>
            <Tab.Panel className="tabPanel">{showProducts("MAC")}</Tab.Panel>
            <Tab.Panel className="tabPanel">{showProducts("IPHONE")}</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </section>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const categories = await fetchCategories();
  const products = await fetchProducts();
  const session = await getSession(context);
  return {
    props: {
      categories,
      products,
      session,
    },
  };
};
