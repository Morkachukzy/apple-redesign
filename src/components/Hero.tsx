import Image from "next/image";
import { forwardRef } from "react";
import Button from "../common/Button";
import { motion } from "framer-motion";
import { springIn, hover, fadeIn, slideIn } from "../../variant";

const Hero = forwardRef<HTMLElement>(() => {
  return (
    <section className="sticky top-0 mx-auto flex h-screen max-w-[1350px] items-center justify-between px-8">
      <div className="space-y-8">
        <motion.h1
          variants={fadeIn}
          initial="initial"
          animate="animate"
          className="space-y-3 text-5xl font-semibold tracking-wide lg:text-6xl xl:text-7xl"
        >
          <span className="bg-gradient-primary block bg-clip-text text-transparent">
            Powered
          </span>
          <span className="block">By Intellect</span>
          <span className="block">Driven By Values</span>
        </motion.h1>

        <motion.div variants={slideIn("UP")} className="space-x-8">
          <Button title="Buy Now" />
          <a className="link">Learn More</a>
        </motion.div>
      </div>
      <motion.div
        variants={springIn}
        initial="initial"
        animate="animate"
        className="relative hidden h-[450px] w-[450px] transition-all duration-500 md:inline lg:h-[650px] lg:w-[600px]"
      >
        <motion.div
          variants={hover}
          initial="initial"
          animate="animate"
          className="h-full w-full"
        >
          <Image src="/iphone-test.png" layout="fill" objectFit="contain" />
        </motion.div>
      </motion.div>
    </section>
  );
});

export default Hero;
