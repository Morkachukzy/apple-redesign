import Image from "next/image";
import { ForwardedRef, forwardRef, ReactNode } from "react";
import Button from "../../common/Button";
import { motion } from "framer-motion";
import { fadeIn, slideIn } from "../../../variant";

type StringHeight = "screen" | "full" | "px" | "auto" | "min" | "max" | "fit";
type Height =
  | number
  | "screen"
  | "full"
  | "px"
  | "auto"
  | "min"
  | "max"
  | "fit"; //`h-[${number}px]`

type Position = "relative" | "sticky" | "absolute" | "fixed";

type FeatureProps = {
  children: ReactNode;
  position?: Position;
  height?: Height;
};

const useHeightStyle = (height: Height) => {
  return typeof height === "number" ? `h-[${height}vh]` : `h-${height}`;
};

const FeatureContainer = forwardRef<HTMLElement, FeatureProps>(
  (
    { children, position, height = `min` }: FeatureProps,
    ref: ForwardedRef<HTMLElement>
  ) => {
    const heightStyle = useHeightStyle(height);
    console.log(heightStyle);
    return (
      <section
        ref={ref}
        className={`${
          position == undefined ? "" : position
        } top-0 mx-auto flex  md:flex-row ${
          heightStyle || "h-screen"
        } max-w-[1500px] items-center justify-between overflow-hidden px-12 md:px-20`}
      >
        {children}
      </section>
    );
  }
);

export default FeatureContainer;
