import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";
import Button from "../../common/Button";

type FeatureCtaProps = {
  children: ReactNode;
  animation: {
    variants: Variants;
    initial?: string;
    animate?: string;
    whileInView?: string;
    viewport?: Record<string, any>;
  };
};
const FeatureCta = ({ animation, children }: FeatureCtaProps) => {
  return (
    <motion.div {...animation} className=" space-x-8">
      {children}
    </motion.div>
  );
};

export default FeatureCta;
