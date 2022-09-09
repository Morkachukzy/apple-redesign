import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";
import { fadeIn, slideIn } from "../../../variant";

type FeatureBodyProps = {
  children: ReactNode;
};

const FeatureBody = ({ children }: FeatureBodyProps) => {
  return <div className="flex-initial space-y-8   md:w-1/2">{children}</div>;
};

export default FeatureBody;
