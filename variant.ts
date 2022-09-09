import { Variants, Variant } from "framer-motion";
type UpDirection = "UP" | "up";
type DownDirection = "DOWN" | "down";
type Direction = UpDirection | DownDirection;
type FadeDirection = Direction | Lowercase<Direction>;
export const slideIn = (direction: FadeDirection = "UP"): Variants => {
  return {
    initial: {
      y: direction === "UP" || direction === "up" ? 40 : "-100%",
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };
};

export const fadeIn: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.4,
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

export const scaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.5,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      delayChildren: 0.7,
      staggerChildren: 0.5,
    },
  },
};

export const springIn: Variants = {
  initial: {
    y: 800,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.6,
      duration: 0.4,
      type: "spring",
    },
  },
};

export const hover: Variants = {
  initial: {
    y: 0,
  },
  animate: {
    y: [30, 0, 30],
    transition: {
      duration: 1.6,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

export const scrollTrigger = ({
  animate,
  ...otherVariants
}: Variants): Variants => ({
  ...otherVariants,
  whileInView: animate,
});
