import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
type Size = "SMALL" | "MEDIUM" | "LARGE" | "XL";

type FeatureImageProps = {
  src: string;
  size?: Size;
  animation?: {
    entrance: {
      variants: Variants;
      initial?: string;
      animate?: string;
      whileInView?: string;
      viewport?: Record<string, any>;
    };
    end: {
      variants: Variants;
      initial?: string;
      animate?: string;
    };
  };
};

const useSizeStyle = (size: Size): [string] => {
  type SizeStyleDictionary = Record<Size, string[]>;

  const [sizeStyle, setSizeStyle] = useState<string>("");

  const sizeStyleDictionary: SizeStyleDictionary = {
    SMALL: ["h-[300px]", "w-[250px]", "lg:w-[450px]", "lg:w-[400px]"],
    MEDIUM: ["h-[400px]", "w-[350px]", "lg:w-[550px]", "lg:w-[500px]"],
    LARGE: ["h-[500px]", "w-[350px]", "lg:w-[450px]"],
    XL: ["h-[600px]", "w-[300px]", "lg:w-[450px]", "xl:w-[550px]"],
  };

  useEffect(() => {
    const getSizeStyle = (
      (sizeStyleDictionary: SizeStyleDictionary) => (size: Size) =>
        sizeStyleDictionary[size].reduce(
          (allSizeStyles, sizeStyle) => allSizeStyles.concat(` ${sizeStyle}`),
          ""
        )
    )(sizeStyleDictionary);

    setSizeStyle(getSizeStyle(size));
  }, [size]);

  return [sizeStyle];
};
const FeatureImage = ({
  src = "/iphone-test.png",
  size = "MEDIUM",
  animation,
}: FeatureImageProps) => {
  const [sizeStyle] = useSizeStyle(size);

  return (
    <motion.div
      {...(animation ? animation.entrance : {})}
      className={`relative hidden transition-all duration-500 md:inline ${sizeStyle} `}
    >
      <motion.div
        {...(animation ? animation.end : {})}
        className="h-full w-full"
      >
        <Image src={src} layout="fill" objectFit="contain" />
      </motion.div>
    </motion.div>
  );
};

export default FeatureImage;
