import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_MESSAGES = [
  "> SYSTEM_BOOT...",
  "> LOADING_MODULES [REACT, TS, VITE]",
  "> CONNECTING_TO_AI_CORE...",
  "> DECRYPTING_PORTFOLIO_DATA...",
  "> ACCESS_GRANTED.",
];

export default function DevLoader({ onFinish }: { onFinish: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    let lineIndex = 0;
    let cancelled = false;

    const runBootSequence = async () => {
      while (lineIndex < BOOT_MESSAGES.length && !cancelled) {
        setLines((prev) => [...prev, BOOT_MESSAGES[lineIndex]]);
        
        const targetProgress = ((lineIndex + 1) / BOOT_MESSAGES.length) * 100;
        const startProgress = (lineIndex / BOOT_MESSAGES.length) * 100;
        const duration = 250;
        const startTime = performance.now();

        const animateProgress = (time: number) => {
          if (cancelled) return;
          const elapsed = time - startTime;
          const easeOut = 1 - Math.pow(1 - Math.min(elapsed / duration, 1), 3);
          const current = startProgress + (targetProgress - startProgress) * easeOut;
          
          // Glitch effect para mukhang totoong nagko-compute
          const glitch = Math.random() > 0.8 ? Math.random() * 2 - 1 : 0;
          setProgress(Math.min(100, current + glitch));

          if (elapsed < duration) {
            requestAnimationFrame(animateProgress);
          } else {
            setProgress(targetProgress);
          }
        };
        requestAnimationFrame(animateProgress);

        lineIndex++;
        await new Promise((r) => setTimeout(r, 300));
      }

      if (cancelled) return;

      await new Promise((r) => setTimeout(r, 600));
      
      if (!doneRef.current) {
        doneRef.current = true;
        setIsExiting(true);
        setTimeout(() => {
          document.body.style.overflow = "";
          onFinish();
        }, 800);
      }
    };

    runBootSequence();

    return () => {
      cancelled = true;
      document.body.style.overflow = "";
    };
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020204] overflow-hidden font-mono"
      exit={{ opacity: 0, filter: "brightness(2) blur(10px)", transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#4f8cff]/15 blur-[150px] rounded-full mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#8b5cf6]/15 blur-[150px] rounded-full mix-blend-screen" />
      
      {/* Cyber Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
        <div className="w-full h-[2px] bg-[#4f8cff]/50 shadow-[0_0_20px_#4f8cff] animate-[scanline_3s_linear_infinite]" />
      </div>

      <div className="relative z-10 flex flex-col w-full max-w-xl px-8">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-gray-500 tracking-widest">JM@AI_CORE:~/PORTFOLIO</span>
        </div>

        {/* High-Tech Percentage Counter */}
        <div className="flex items-end justify-between mb-2">
          <div className="text-7xl md:text-9xl font-black text-white tracking-tighter tabular-nums leading-none">
            {Math.round(progress).toString().padStart(3, '0')}
          </div>
          <div className="text-2xl md:text-4xl font-bold text-[#4f8cff] pb-2">%</div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-8">
          <motion.div
            className="h-full bg-[#4f8cff] shadow-[0_0_15px_#4f8cff]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>

        {/* Typing Logs */}
        <div className="h-32 flex flex-col justify-end text-sm md:text-base text-gray-400">
          <AnimatePresence mode="popLayout">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-1 flex items-center gap-2"
              >
                <span className="text-[#4f8cff]">{line}</span>
                {i === lines.length - 1 && !isExiting && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block w-2 h-4 bg-[#4f8cff]"
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Floating Status Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex items-center gap-2 px-3 py-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs w-fit"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          SYSTEM_SECURE
        </motion.div>

      </div>
    </motion.div>
  );
}