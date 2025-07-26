// lib/animations.ts
import { easeOut } from "framer-motion";

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
};

// animations.ts
export const cardHover = {
  scale: 1.03,
  transition: {
    type: "spring" as const,
    stiffness: 300,
    damping: 20,
  },
};
