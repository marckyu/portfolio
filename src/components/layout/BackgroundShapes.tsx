import { useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

const shapes = [
  { className: "left-[-10%] top-[10%] h-[400px] w-[400px] bg-[#4f8cff]/15", depth: 0.8 },
  { className: "bottom-[15%] right-[-5%] h-[300px] w-[300px] bg-[#8b5cf6]/15", depth: 1.6 },
  { className: "left-[30%] top-[50%] h-[250px] w-[250px] bg-[#4f8cff]/10", depth: 2.4 },
  { className: "right-[20%] top-[-5%] h-[200px] w-[200px] bg-[#8b5cf6]/10", depth: 3.2 },
];

interface ShapeProps { 
  className: string; 
  depth: number; 
  x: MotionValue<number>; 
  y: MotionValue<number>; 
}

function Shape({ className, depth, x, y }: ShapeProps) {
  const tx = useTransform(x, (v) => v * depth);
  const ty = useTransform(y, (v) => v * depth);
  return (
    <motion.div
      aria-hidden
      style={{ x: tx, y: ty }}
      className={`pointer-events-none fixed -z-10 rounded-full blur-[80px] ${className}`}
    />
  );
}

export default function BackgroundShapes({ isLoading = false }: { isLoading?: boolean }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 40, damping: 20 });
  const y = useSpring(my, { stiffness: 40, damping: 20 });

  useEffect(() => {
    if (reduce || window.matchMedia("(hover: none)").matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX - window.innerWidth / 2) * 0.05);
      my.set((e.clientY - window.innerHeight / 2) * 0.05);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  return (
    <motion.div
      initial={false}
      animate={{
        filter: isLoading ? "blur(20px) brightness(0.5)" : "blur(0px) brightness(1)",
        scale: isLoading ? 1.1 : 1,
      }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="fixed inset-0 -z-10 pointer-events-none"
    >
      {shapes.map((s) => (
        <Shape key={s.className} className={s.className} depth={s.depth} x={x} y={y} />
      ))}
    </motion.div>
  );
}