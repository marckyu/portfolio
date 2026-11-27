import { useState, useEffect } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { Compass, Camera, Gamepad2, Wrench, Music, X, ChevronLeft, ChevronRight } from "lucide-react";

const SPRING = { type: "spring", stiffness: 350, damping: 26, mass: 0.8 } as const;

const HOBBIES = [
  {
    id: "photography",
    icon: Camera,
    title: "Street & Aesthetic",
    subtitle: "Photography",
    desc: "Visual storytelling, framing, and capturing candid moments. Check out my gallery!",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
    tags: ["Visuals", "Framing", "Gallery"],
  },
  {
    id: "gaming",
    icon: Gamepad2,
    title: "Gaming &",
    subtitle: "Game Mechanics",
    desc: "Exploring gameplay systems, UI/UX in games, and competitive play.",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/20",
    tags: ["Systems", "Strategy", "UI"],
  },
  {
    id: "cars",
    icon: Wrench,
    title: "Automotive &",
    subtitle: "Car Hardware",
    desc: "Hands-on automotive accessories, wiring, and custom hardware setups.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
    tags: ["Wiring", "12V", "Custom"],
  },
  {
    id: "music",
    icon: Music,
    title: "Music &",
    subtitle: "Soundscapes",
    desc: "Curating chill OPM and indie playlists while coding.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
    tags: ["OPM", "Indie", "Focus"],
  },
];

export default function HobbiesExplorer({ onTriggerPhotos }: { onTriggerPhotos: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dragControls = useDragControls();

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % HOBBIES.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + HOBBIES.length) % HOBBIES.length);

  const handleDragEnd = (e: any, info: any) => {
    const threshold = 50;
    const velocity = 500;

    if (info.offset.x < -threshold || info.velocity.x < -velocity) {
      handleNext();
    } else if (info.offset.x > threshold || info.velocity.x > velocity) {
      handlePrev();
    }
  };

  const ActiveIcon = HOBBIES[currentIndex].icon;

  return (
    <>
      {/* 1. COMPACT TRIGGER PILL */}
      {!isOpen && (
        <motion.div
          layoutId="hobbies-explorer-container"
          onClick={() => setIsOpen(true)}
          whileTap={{ scale: 0.98 }}
          className="relative w-full rounded-3xl overflow-hidden bg-slate-950/70 border border-white/10 backdrop-blur-2xl shadow-lg cursor-pointer flex items-center justify-between px-4 py-3 min-h-[56px]"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-white shadow-sm shrink-0">
              <Compass size={18} className="animate-pulse" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-[15px] font-semibold text-white tracking-tight">Explore Hobbies</h3>
              <p className="text-[13px] text-slate-400 mt-0.5">Tap to tour</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* 2. POP-UP GLASS MODAL */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              layoutId="hobbies-explorer-container"
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={SPRING}
                className="relative w-full max-w-md bg-slate-950/85 border border-white/15 rounded-3xl overflow-hidden backdrop-blur-3xl shadow-2xl pointer-events-auto flex flex-col"
                style={{ transform: "translate3d(0,0,0)", willChange: "transform" }}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                      <Compass size={18} className="text-white" />
                    </div>
                    <h2 className="text-lg font-bold text-white font-[Space_Grotesk]">Hobbies Explorer</h2>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => setIsOpen(false)}
                    className="p-2 bg-white/5 rounded-full text-slate-400 hover:text-white"
                  >
                    <X size={18} />
                  </motion.button>
                </div>

                {/* Card Deck */}
                <div className="relative h-[320px] flex items-center justify-center p-6 overflow-hidden">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={currentIndex}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.7}
                      onDragEnd={handleDragEnd}
                      initial={{ x: 300, opacity: 0, rotate: 10 }}
                      animate={{ x: 0, opacity: 1, rotate: 0 }}
                      exit={{ x: -300, opacity: 0, rotate: -10 }}
                      transition={SPRING}
                      className="absolute w-full max-w-[300px] p-6 rounded-3xl bg-white/5 border border-white/10 shadow-xl cursor-grab active:cursor-grabbing"
                      style={{ touchAction: "pan-y" }}
                    >
                      <div className={`w-12 h-12 rounded-2xl ${HOBBIES[currentIndex].bg} border ${HOBBIES[currentIndex].border} flex items-center justify-center mb-6`}>
                        <ActiveIcon className={`w-6 h-6 ${HOBBIES[currentIndex].color}`} />
                      </div>
                      
                      <h3 className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-1">
                        {HOBBIES[currentIndex].title}
                      </h3>
                      <h2 className="text-2xl font-bold text-white mb-3 font-[Space_Grotesk]">
                        {HOBBIES[currentIndex].subtitle}
                      </h2>
                      <p className="text-sm text-slate-300 leading-relaxed mb-6">
                        {HOBBIES[currentIndex].desc}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {HOBBIES[currentIndex].tags.map(tag => (
                          <span key={tag} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Special action for photography */}
                      {currentIndex === 0 && (
                         <motion.button 
                           whileHover={{ scale: 1.02 }}
                           whileTap={{ scale: 0.98 }}
                           onClick={() => { setIsOpen(false); onTriggerPhotos(); }}
                           className="mt-6 w-full py-2 bg-amber-400/20 text-amber-400 border border-amber-400/30 rounded-xl text-sm font-semibold hover:bg-amber-400/30 transition-colors"
                         >
                           View Photo Gallery
                         </motion.button>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation Controls */}
                <div className="p-4 flex items-center justify-between border-t border-white/10 bg-black/20">
                  <button onClick={handlePrev} className="p-2 rounded-full hover:bg-white/10 text-white transition-colors">
                    <ChevronLeft size={20} />
                  </button>
                  
                  {/* Orbit Dots */}
                  <div className="flex items-center gap-2">
                    {HOBBIES.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`relative h-1.5 rounded-full transition-all duration-300 ${
                          i === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/20 hover:bg-white/40"
                        }`}
                      >
                        {i === currentIndex && (
                          <motion.div layoutId="active-dot" className="absolute inset-0 bg-white rounded-full" />
                        )}
                      </button>
                    ))}
                  </div>

                  <button onClick={handleNext} className="p-2 rounded-full hover:bg-white/10 text-white transition-colors">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}