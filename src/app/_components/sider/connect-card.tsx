"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export function ConnectCard({ children }: { children: React.ReactNode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  return (
    <div
      className="group relative pb-4 pl-4 pr-2 pt-4"
      onMouseMove={(e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }}
    >
      <motion.div>{children}</motion.div>
      <div className="via-primary/30 absolute bottom-0 right-0 hidden h-px w-full bg-gradient-to-l from-transparent via-10% to-transparent duration-700 ease-linear group-hover:block" />
      <motion.div
        className="pointer-events-none  absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
        radial-gradient(
          650px circle at ${mouseX}px ${mouseY}px,
          rgba(25,40,50,0.4),
          transparent 80%
        )
      `,
        }}
      />
    </div>
  );
}
