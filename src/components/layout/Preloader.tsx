import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { markIntroSeen } from "../../lib/intro";

const MIN_MS = 1600;
const MAX_MS = 3500;

export default function Preloader({ onFinish }: { onFinish: () => void }) {
  const done = useRef(false);
  const [progress, setProgress] = useState(0);

  const finish = useCallback(() => {
    if (done.current) return;
    done.current = true;
    markIntroSeen();
    onFinish();
  }, [onFinish]);

  // Lock scroll while preloader is up
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Fake progress bar + minimum wait
  useEffect(() => {
    const start = performance.now();
    let raf: number;

    const tick = () => {
      const elapsed = performance.now() - start;
      // Asymptotic progress towards 100%
      const p = Math.min(100, (elapsed / MIN_MS) * 100);
      setProgress(p);

      if (elapsed < MIN_MS) {
        raf = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        // Small delay after reaching 100% before exiting
        setTimeout(finish, 300);
      }
    };

    raf = requestAnimationFrame(tick);
    
    // Fail-safe max wait
    const maxTimer = setTimeout(finish, MAX_MS);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(maxTimer);
    };
  }, [finish]);

  // Framer Motion variants
  const containerVariants = {
    exit: { y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const } },
  };

  const textVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] as const } },
  };

  return (
    <motion.div
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-[#07070b] text-white"
      variants={containerVariants}
      exit="exit"
    >
      {/* Background subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,140,255,0.08)_0%,transparent_50%)]" />

      {/* Monogram / Text */}
      <div className="relative overflow-hidden mb-8 flex gap-2">
        <motion.span
          variants={textVariants}
          initial="initial"
          animate="animate"
          className="font-[Space_Grotesk,sans-serif] text-6xl font-bold tracking-tighter sm:text-8xl"
        >
          J
        </motion.span>
        <motion.span
          variants={textVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.1 }}
          className="font-[Space_Grotesk,sans-serif] text-6xl font-bold tracking-tighter text-accent-blue sm:text-8xl"
        >
          M
        </motion.span>
      </div>

      {/* Progress Bar */}
      <div className="relative h-0.5 w-48 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="absolute inset-y-0 left-0 bg-linear-to-r from-accent-blue to-accent-violet"
          style={{ width: `${progress}%` }}
          layout
        />
      </div>
      
      {/* Percentage text */}
      <div className="mt-4 font-mono text-xs tracking-widest text-white/40">
        {Math.round(progress)}%
      </div>
    </motion.div>
  );
}