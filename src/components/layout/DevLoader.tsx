import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SCAN_PHASES = [
  "INITIALIZING_BIOMETRIC_SCAN",
  "ANALYZING_NEURAL_PATTERNS",
  "DECRYPTING_IDENTITY_HASH",
  "ACCESS_GRANTED",
];

export default function DevLoader({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    let cancelled = false;
    const startTime = performance.now();
    const DURATION = 3500;

    const animate = (time: number) => {
      if (cancelled) return;
      const elapsed = time - startTime;
      const p = Math.min(100, (elapsed / DURATION) * 100);
      setProgress(p);

      const phaseIndex = Math.min(
        SCAN_PHASES.length - 1,
        Math.floor((p / 100) * SCAN_PHASES.length)
      );
      setPhase(phaseIndex);

      if (p < 100) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          if (!doneRef.current) {
            doneRef.current = true;
            setIsExiting(true);
            setTimeout(() => {
              document.body.style.overflow = "";
              onFinish();
            }, 1200);
          }
        }, 500);
      }
    };

    requestAnimationFrame(animate);

    return () => {
      cancelled = true;
      document.body.style.overflow = "";
    };
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020204] overflow-hidden px-4 will-change-transform select-none"
      initial={{ opacity: 1 }}
      animate={isExiting ? { opacity: 0, scale: 1.1, filter: "blur(20px)" } : { opacity: 1 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Hexagon Background Grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none flex items-center justify-center">
        <div className="w-[200%] h-[200%] bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')] animate-[spin_120s_linear_infinite]" />
      </div>

      {/* Scanning Laser Line */}
      <motion.div 
        animate={{ y: ["-100vh", "100vh"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-[2px] bg-[#38bdf8] shadow-[0_0_20px_#38bdf8] opacity-30 z-0 will-change-transform"
      />

      <div className="relative z-10 flex flex-col items-center">
        
        {/* Biometric Scanner Core */}
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 mb-10 flex items-center justify-center">
          
          {/* Rotating Radar Rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-[#4f8cff]/20 will-change-transform"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            className="absolute inset-6 rounded-full border border-[#8b5cf6]/40 will-change-transform"
          />

          {/* Progress Ring (SVG) */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
            <motion.circle 
              cx="50" cy="50" r="46" 
              fill="none" 
              stroke="url(#gradient)" 
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="289"
              strokeDashoffset={289 - (289 * progress) / 100}
              transition={{ duration: 0.1 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4f8cff" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Identity */}
          <div className="relative flex flex-col items-center justify-center z-10">
            <span className="text-5xl sm:text-7xl font-black font-[Space_Grotesk] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tabular-nums tracking-tighter">
              {Math.round(progress).toString().padStart(3, "0")}
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-[#38bdf8] uppercase tracking-[0.3em] mt-2">
              {progress < 100 ? "Scanning" : "Verified"}
            </span>
          </div>
        </div>

        {/* Phase Text with Glitch */}
        <div className="h-8 flex items-center justify-center mb-8 relative w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                x: progress >= 100 ? [0, -2, 2, -1, 1, 0] : 0 
              }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ 
                duration: 0.2,
                x: { duration: 0.3, repeat: progress >= 100 ? Infinity : 0, repeatType: "reverse" }
              }}
              className={`text-xs sm:text-sm font-mono tracking-[0.2em] uppercase font-bold text-center ${
                progress >= 100 ? "text-emerald-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]" : "text-[#4f8cff]"
              }`}
            >
              {SCAN_PHASES[phase]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Linear Progress Bar */}
        <div className="w-64 sm:w-80 h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#4f8cff] via-[#8b5cf6] to-[#38bdf8] shadow-[0_0_10px_#8b5cf6]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}