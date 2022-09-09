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

import { motion } from "framer-motion";
import {
  slideIn,
  staggerContainer,
  scaleIn,
  hover,
  scrollTrigger,
  fadeIn,
} from "../../variant";
import Feature from "../components/feature";
import Button from "../common/Button";

const MotionHeader = motion(Header);
const MotionHero = motion(Hero);
const MotionCart = motion(Cart);
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
    <div className="bg-[#E7ECEE]">
      <Head>
        <title>Apple Redesign</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MotionHeader
        variants={slideIn("DOWN")}
        initial="initial"
        animate="animate"
      />
      <MotionCart variants={scaleIn} initial="initial" animate="animate" />
      <main className="relative h-[200vh] bg-[#E7ECEE]">
        <MotionHero
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        />
      </main>
      <Products categories={categories} showProducts={showProducts} />
      {/* <div className="sticky -mt-[20vh] outline-dotted outline-black"> */}

      <div className="flex flex-col space-y-60 py-24 md:py-60">
        <Feature.Container>
          <Feature.Image
            src="/a.png"
            size="XL"
            animation={{
              entrance: {
                variants: scrollTrigger(scaleIn),
                initial: "initial",
                whileInView: "whileInView",
                viewport: { once: true },
              },
              end: {
                variants: hover,
                initial: "initial",
                animate: "animate",
              },
            }}
          />
          <Feature.Body>
            <Feature.Title
              animation={{
                variants: scrollTrigger(fadeIn),
                initial: "initial",
                whileInView: "whileInView",
                viewport: { once: true },
              }}
            >
              <div className="space-y-8 md:w-4/5">
                <p className="space-y-3 text-center text-3xl font-semibold tracking-wide md:text-left lg:text-4xl xl:text-5xl">
                  <span className="md:block"> Awesome In Any </span>
                  <span className="md:block">
                    Space. <br className="md:hidden" /> Perfect{" "}
                  </span>
                  <span className="md:block">Blend In your Life</span>
                </p>
                <p className="text space-y-3 text-center text-xl text-[#35383c95] md:text-left lg:text-2xl xl:text-xl ">
                  Designed to take full advantage of next-level performance and
                  special technologies such as the advanced image-signal
                  processor and integrated memory architecture.
                </p>
              </div>

              {/* <span className="block">Driven By Values</span> */}
            </Feature.Title>
            <Feature.Cta
              animation={{
                variants: scrollTrigger(slideIn("UP")),
                initial: "initial",
                whileInView: "whileInView",
                viewport: { once: true },
              }}
            >
              <div className="flex flex-col items-center justify-center space-y-8 text-center md:block md:space-x-8  md:text-left">
                <Button title="Buy Now" />
                <a className="link">Learn More</a>
              </div>
            </Feature.Cta>
          </Feature.Body>
        </Feature.Container>
        <Feature.Container>
          <Feature.Body>
            <Feature.Title
              animation={{
                variants: scrollTrigger(fadeIn),
                initial: "initial",
                whileInView: "whileInView",
                viewport: { once: true },
              }}
            >
              <div className="space-y-8 outline-4 outline-black md:w-4/5">
                <p className="space-y-3 text-center text-3xl font-semibold tracking-wide md:text-left lg:text-4xl xl:text-5xl">
                  <span className="md:block"> Awesome In Any </span>
                  <span className="md:block">
                    Space. <br className="md:hidden" /> Perfect{" "}
                  </span>
                  <span className="md:block">Blend In your Life</span>
                </p>
                <p className="w-full space-y-3 text-center text-xl  text-[#35383c95]  md:text-left lg:text-2xl xl:text-xl ">
                  This extraordinary design was made possible thanks to the
                  developer, the first system on a chip. Makes your device so
                  thin and compact, it fits anywhere
                </p>
              </div>

              {/* <span className="block">Driven By Values</span> */}
            </Feature.Title>
            <Feature.Cta
              animation={{
                variants: scrollTrigger(slideIn("UP")),
                initial: "initial",
                whileInView: "whileInView",
                viewport: { once: true },
              }}
            >
              <div className="flex flex-col items-center justify-center  space-y-8 text-center md:block md:space-x-8  md:text-left">
                <Button title="Buy Now" />
                <a className="link">Learn More</a>
              </div>
            </Feature.Cta>
          </Feature.Body>
          <Feature.Image
            src="/b.png"
            size="LARGE"
            animation={{
              entrance: {
                variants: scrollTrigger(scaleIn),
                initial: "initial",
                whileInView: "whileInView",
                viewport: { once: true },
              },
              end: {
                variants: hover,
                initial: "initial",
                animate: "animate",
              },
            }}
          />
        </Feature.Container>
      </div>

      {/* </div> */}
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
