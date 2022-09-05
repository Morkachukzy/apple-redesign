import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Hero from "../components/Hero";
const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Apple Redesign</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="bg- relative h-[200vh] bg-[#E7ECEE]">
        <Hero />
      </main>
    </div>
  );
};

export default Home;
