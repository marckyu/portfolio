import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface Props { children: ReactNode; delay?: number; className?: string; }

/** Fades content in once when it scrolls into view. Skipped for reduced motion. */
export default function Reveal({ children, delay = 0, className }: Props) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
