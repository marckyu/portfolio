import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_SEQUENCE = [
  "> initializing_kernel...",
  "> loading_ui_components...",
  "> establishing_connection...",
  "> ready.",
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

    const typeLine = async () => {
      while (lineIndex < BOOT_SEQUENCE.length && !cancelled) {
        setLines((prev) => [...prev, BOOT_SEQUENCE[lineIndex]]);
        setProgress(((lineIndex + 1) / BOOT_SEQUENCE.length) * 100);
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

    typeLine();

    const cap = setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true;
        setIsExiting(true);
        setTimeout(() => {
          document.body.style.overflow = "";
          onFinish();
        }, 800);
      }
    }, 3500);

    return () => {
      cancelled = true;
      clearTimeout(cap);
      document.body.style.overflow = "";
    };
  }, [onFinish]);

  // 👇 INayos natin ang typing ng variants gamit ang 'as const' at tamang properties
  const containerVariants = {
    initial: { opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: { 
      opacity: 0, 
      scale: 1.05, 
      filter: "blur(20px)", 
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const } 
    }
  };

  const terminalVariants = {
    initial: { y: 0, opacity: 1 },
    exit: { 
      y: -40, 
      opacity: 0, 
      transition: { duration: 0.6, ease: "easeIn" as const } 
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050508]"
      variants={containerVariants}
      initial="initial"
      animate={isExiting ? "exit" : "initial"}
    >
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-[0.05]" 
        style={{ 
          backgroundImage: "linear-gradient(#4f8cff 1px, transparent 1px), linear-gradient(90deg, #4f8cff 1px, transparent 1px)", 
          backgroundSize: "40px 40px" 
        }} 
      />
      
      {/* Glow behind terminal (Ginawang w-100 base sa linter) */}
      <div className="absolute w-100 h-100 max-w-[400px] max-h-[400px] bg-[#4f8cff]/10 blur-[100px] rounded-full" />

      <motion.div 
        variants={terminalVariants}
        className="relative z-10 w-full max-w-lg rounded-xl border border-white/10 bg-[#0a0a10]/90 shadow-2xl backdrop-blur-xl overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-4 py-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="font-mono text-xs text-gray-400">boot_sequence.sh</span>
        </div>

        {/* Terminal Body */}
        <div className="p-6 md:p-8 font-mono text-sm md:text-base h-[240px] flex flex-col justify-end">
          <AnimatePresence>
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-2 text-[#8a8a9c]"
              >
                <span className="text-[#4f8cff]">➜</span>{" "}
                <span className="text-[#f0f0f5]">{line}</span>
                {i === lines.length - 1 && !isExiting && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, ease: "linear" as const }}
                    className="ml-1 inline-block h-4 w-2 bg-[#4f8cff] align-middle"
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pb-6">
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#4f8cff] to-[#8b5cf6]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" as const }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}