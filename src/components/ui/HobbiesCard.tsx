import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Camera, Gamepad2, Wrench, Music, ChevronDown, ArrowUpRight } from "lucide-react";

const SPRING = { type: "spring", stiffness: 360, damping: 28, mass: 0.85 } as const;

const HOBBIES = [
  { 
    id: "photography", 
    icon: Camera, 
    title: "Photography", 
    desc: "Street & night photography", 
    action: "photos" 
  },
  { 
    id: "gaming", 
    icon: Gamepad2, 
    title: "Gaming", 
    desc: "FPS & RPG exploration" 
  },
  { 
    id: "cars", 
    icon: Wrench, 
    title: "Car Hardware", 
    desc: "12V auto electronics" 
  },
  { 
    id: "music", 
    icon: Music, 
    title: "Music", 
    desc: "OPM & late-night lo-fi" 
  },
];

interface HobbiesCardProps {
  isCompact?: boolean;
  onTriggerPhotos: () => void;
}

export default function HobbiesCard({ isCompact = false, onTriggerPhotos }: HobbiesCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const active = !isCompact && isOpen;

  const handleHobbyClick = (action?: string) => {
    if (action === "photos") {
      onTriggerPhotos();
    }
  };

  return (
    <motion.div
      layout
      transition={SPRING}
      style={{ transform: "translate3d(0,0,0)", willChange: "transform", touchAction: "pan-y" }}
      className="relative w-full rounded-3xl overflow-hidden bg-slate-950/70 border border-white/10 backdrop-blur-2xl shadow-lg"
    >
      {/* Header / Collapsed State */}
      <motion.div
        onClick={() => !isCompact && setIsOpen(!isOpen)}
        className={`flex items-center justify-between px-4 py-3 min-h-[56px] ${
          !isCompact ? "cursor-pointer active:bg-white/5 transition-colors" : "cursor-default"
        }`}
        whileTap={!isCompact ? { scale: 0.98 } : undefined}
      >
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-amber-400 shadow-sm shrink-0">
            <Sparkles size={18} />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[15px] font-semibold text-white tracking-tight">Hobbies & Interests</h3>
            <p className="text-[13px] text-slate-400 mt-0.5">Photography, Gaming & Car Mods</p>
          </div>
        </div>
        
        {!isCompact && (
          <motion.div 
            animate={{ rotate: active ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="p-2 text-slate-400 shrink-0"
          >
            <ChevronDown size={18} />
          </motion.div>
        )}
      </motion.div>

      {/* Expanded Content */}
      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ ...SPRING, opacity: { duration: 0.2 } }}
            className="overflow-hidden"
          >
            <motion.div 
              initial="hidden" animate="show" exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
              }}
              className="px-4 pb-4 pt-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5"
            >
              {HOBBIES.map((hobby) => {
                const Icon = hobby.icon;
                const isClickable = hobby.action === "photos";

                return (
                  <motion.div
                    key={hobby.id}
                    variants={{
                      hidden: { y: 10, opacity: 0 },
                      show: { y: 0, opacity: 1 }
                    }}
                    whileTap={isClickable ? { scale: 0.96 } : undefined}
                    onClick={() => handleHobbyClick(hobby.action)}
                    className={`group flex flex-col gap-2 p-3 rounded-2xl border transition-all duration-300 ${
                      isClickable 
                        ? "bg-white/5 border-white/10 hover:border-[var(--accent-primary)]/50 hover:bg-[var(--accent-primary)]/5 cursor-pointer" 
                        : "bg-white/5 border-white/5 cursor-default"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className={`p-1.5 rounded-lg bg-slate-900/50 border border-white/5 ${isClickable ? "text-[var(--accent-primary)] group-hover:bg-[var(--accent-primary)]/10" : "text-slate-300"} transition-colors`}>
                        <Icon size={16} />
                      </div>
                      {isClickable && (
                        <ArrowUpRight size={14} className="text-[var(--accent-primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-[13px] font-semibold text-white">{hobby.title}</h4>
                      <p className="text-[11px] text-slate-400 leading-tight mt-0.5">{hobby.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}