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
import Products from "../components/Products";
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

      <Products categories={categories} showProducts={showProducts} />
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
