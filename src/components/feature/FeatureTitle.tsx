import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

type FeatureTitleProps = {
  children: ReactNode;
  animation: {
    variants: Variants;
    initial?: string;
    animate?: string;
    whileInView?: string;
    viewport?: Record<string, any>;
  };
};
const FeatureTitle = ({ animation, children }: FeatureTitleProps) => {
  return <motion.h1 {...animation}>{children}</motion.h1>;
};

export default FeatureTitle;
