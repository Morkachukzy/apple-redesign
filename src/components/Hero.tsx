import Image from "next/image";
import { forwardRef } from "react";
import Button from "../common/Button";
import { springIn, hover, fadeIn, slideIn, scaleIn } from "../../variant";
import Feature from "./feature";

const Hero = forwardRef<HTMLElement>(() => {
  return (
    <Feature.Container position="sticky" height={`screen`}>
      <Feature.Body>
        <Feature.Title
          animation={{
            variants: fadeIn,
            initial: "initial",
            animate: "animate",
          }}
        >
          <span className="space-y-3  text-5xl font-semibold tracking-wide lg:text-6xl xl:text-7xl">
            <span className="bg-gradient-primary block bg-clip-text text-transparent">
              Powered
            </span>
            <span className="block">By Intellect</span>
            <span className="block">Driven By Values</span>
          </span>
        </Feature.Title>
        <Feature.Cta
          animation={{
            variants: slideIn("UP"),
          }}
        >
          <Button title="Buy Now" />
          <a className="link">Learn More</a>
        </Feature.Cta>
      </Feature.Body>
      <Feature.Image
        src="/iphone.png"
        size="XL"
        animation={{
          entrance: {
            variants: springIn,
            initial: "initial",
            animate: "animate",
          },
          end: {
            variants: hover,
            initial: "initial",
            animate: "animate",
          },
        }}
      />
    </Feature.Container>
  );
});

//  whileInView={{
//           opacity: 0.3,
//           transition: {
//             delay: 0.7,
//             ease: "backInOut",
//           },
//         }}

export default Hero;
