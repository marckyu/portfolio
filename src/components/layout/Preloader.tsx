import { useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { markIntroSeen } from "../../lib/intro";

const MIN_MS = 1600; // shortest the intro is shown
const MAX_MS = 3500; // never wait longer than this for fonts

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export default function Preloader({ onFinish }: { onFinish: () => void }) {
  const done = useRef(false);

  const finish = useCallback(() => {
    if (done.current) return;
    done.current = true;
    markIntroSeen();
    onFinish();
  }, [onFinish]);

  // Keep the page from scrolling while the intro is up
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, []);

  // Finish after the minimum time AND once fonts are ready; any click or key skips
  useEffect(() => {
    let active = true;
    const fonts = document.fonts?.ready
      ? Promise.race([document.fonts.ready, wait(MAX_MS)])
      : Promise.resolve();
    Promise.all([wait(MIN_MS), fonts]).then(() => active && finish());

    const skip = () => finish();
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);
    return () => {
      active = false;
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
    };
  }, [finish]);

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[200] grid place-items-center overflow-hidden bg-ink"
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="pointer-events-none absolute h-80 w-80 rounded-full bg-accent-violet/20 blur-[100px]" />

      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <p className="font-display text-6xl font-bold tracking-tight text-white">
            JM<span className="text-accent-blue">.</span>
          </p>
          <p className="mt-3 text-sm text-muted">AI-Augmented Developer</p>
        </motion.div>

        <div className="mt-8 h-px w-56 overflow-hidden bg-white/10">
          <motion.div
            className="h-full origin-left bg-accent-gradient"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: MIN_MS / 1000, ease: "easeInOut" }}
          />
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute bottom-8 text-xs text-muted"
      >
        Click or press any key to skip
      </motion.p>
    </motion.div>
  );
}