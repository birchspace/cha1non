"use client";

import { LazyMotion, domAnimation, motion } from "framer-motion";

import { AnimateEnterProps } from "~/types";

const animation = {
  hide: {
    y: 20,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
  },
};

export function AnimateEnter({ children, className }: AnimateEnterProps) {
  return (
    <LazyMotion features={domAnimation}>
      <motion.main
        className={className}
        initial="hide"
        animate="show"
        variants={animation}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
    </LazyMotion>
  );
}
