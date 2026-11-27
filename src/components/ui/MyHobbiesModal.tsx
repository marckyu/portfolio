import { useState, useEffect } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { Heart, X, ChevronLeft, ChevronRight, Maximize2, Minimize2, Compass } from "lucide-react";
import { hobbiesData } from "../../data/hobbiesData";

const SPRING = { type: "spring", stiffness: 360, damping: 28, mass: 0.85 } as const;

export default function MyHobbiesModal({ onTriggerPhotos }: { onTriggerPhotos: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isInspectMode, setIsInspectMode] = useState(false);
  
  // Reactions state (stores count per hobby ID)
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [hearts, setHearts] = useState<{ id: number, x: number }[]>([]);

  const activeHobby = hobbiesData[activeTab];
  const dragControls = useDragControls();

  // Reset photo index when switching tabs
  useEffect(() => {
    setPhotoIndex(0);
    setIsInspectMode(false);
  }, [activeTab]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isInspectMode) setIsInspectMode(false);
        else setIsOpen(false);
      }
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, isInspectMode]);

  const nextPhoto = () => setPhotoIndex((prev) => (prev + 1) % activeHobby.images.length);
  const prevPhoto = () => setPhotoIndex((prev) => (prev - 1 + activeHobby.images.length) % activeHobby.images.length);

  const handleSwipeEnd = (e: any, info: any) => {
    if (info.offset.x < -50 || info.velocity.x < -500) {
      setActiveTab((prev) => (prev + 1) % hobbiesData.length);
    } else if (info.offset.x > 50 || info.velocity.x > 500) {
      setActiveTab((prev) => (prev - 1 + hobbiesData.length) % hobbiesData.length);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    // Increment like count
    setLikes(prev => ({ ...prev, [activeHobby.id]: (prev[activeHobby.id] || 0) + 1 }));
    
    // Spawn a floating heart
    const newHeart = { id: Date.now(), x: Math.random() * 40 - 20 };
    setHearts(prev => [...prev, newHeart]);
    
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 1000);
  };

  return (
    <>
      {/* 1. COMPACT TRIGGER PILL */}
      {!isOpen && (
        <motion.div
          layoutId="my-hobbies-modal"
          onClick={() => setIsOpen(true)}
          whileTap={{ scale: 0.98 }}
          className="relative w-full rounded-3xl overflow-hidden bg-slate-950/70 border border-white/10 backdrop-blur-2xl shadow-lg cursor-pointer flex items-center justify-between p-3 min-h-[72px] group"
        >
          <div className="flex items-center gap-3.5">
            {/* Stacked Photo Preview */}
            <div className="relative w-12 h-12 shrink-0">
              <div className="absolute top-0 right-0 w-9 h-9 rounded-xl overflow-hidden border border-white/20 rotate-6 group-hover:rotate-12 transition-transform duration-300">
                <img src={hobbiesData[1].images[0]} className="w-full h-full object-cover opacity-60" alt="" />
              </div>
              <div className="absolute top-0 left-0 w-9 h-9 rounded-xl overflow-hidden border border-white/20 -rotate-6 group-hover:-rotate-12 transition-transform duration-300">
                <img src={hobbiesData[0].images[0]} className="w-full h-full object-cover" alt="" />
              </div>
            </div>
            
            <div className="flex flex-col">
              <h3 className="text-[15px] font-semibold text-white tracking-tight">My Hobbies</h3>
              <p className="text-[13px] text-slate-400 mt-0.5">Cycling, Cars, Photos & Gaming</p>
            </div>
          </div>

          <div className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-[10px] font-mono text-white flex items-center gap-1.5 shrink-0 mr-1">
            <Compass size={12} />
            View
          </div>
        </motion.div>
      )}

      {/* 2. INTERACTIVE MODAL STAGE */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[9998] bg-black/65 backdrop-blur-md"
            />

            <motion.div
              layoutId="my-hobbies-modal"
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={SPRING}
                className="relative w-[92vw] max-w-xl bg-slate-950/85 border border-white/15 rounded-3xl shadow-2xl backdrop-blur-3xl pointer-events-auto overflow-hidden flex flex-col"
                style={{ transform: "translate3d(0,0,0)", willChange: "transform" }}
              >
                
                {/* Top Bar / Tabs */}
                <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/20">
                  <div className="flex gap-1 overflow-x-auto custom-scrollbar p-1">
                    {hobbiesData.map((hobby, i) => (
                      <button
                        key={hobby.id}
                        onClick={() => setActiveTab(i)}
                        className={`relative px-4 py-2 rounded-xl text-xs font-semibold transition-colors shrink-0 ${
                          activeTab === i ? "text-white" : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {activeTab === i && (
                          <motion.div
                            layoutId="active-hobby-pill"
                            className="absolute inset-0 bg-white/10 border border-white/10 rounded-xl"
                            transition={SPRING}
                          />
                        )}
                        <span className="relative z-10">{hobby.title}</span>
                      </button>
                    ))}
                  </div>
                  
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => setIsOpen(false)}
                    className="p-2 ml-2 bg-white/5 rounded-full text-slate-400 hover:text-white shrink-0"
                  >
                    <X size={18} />
                  </motion.button>
                </div>

                {/* Main Content Area */}
                <div className="relative flex flex-col">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.4}
                      onDragEnd={handleSwipeEnd}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={SPRING}
                      className="flex flex-col w-full"
                      style={{ touchAction: "pan-y" }}
                    >
                      {/* PHOTO CAROUSEL */}
                      <div className="relative w-full aspect-[4/3] bg-black/50 overflow-hidden group">
                        <AnimatePresence initial={false} mode="wait">
                          <motion.img
                            key={photoIndex}
                            src={activeHobby.images[photoIndex]}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            alt={activeHobby.title}
                            className={`w-full h-full object-cover cursor-pointer transition-all duration-300 ${isInspectMode ? "object-contain bg-black p-4" : ""}`}
                            onClick={() => setIsInspectMode(!isInspectMode)}
                          />
                        </AnimatePresence>

                        {/* Photo Controls Overlay */}
                        <div className="absolute inset-0 flex items-center justify-between p-3 pointer-events-none">
                          {!isInspectMode && activeHobby.images.length > 1 && (
                            <>
                              <button onClick={prevPhoto} className="pointer-events-auto p-2 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/80 transition-colors">
                                <ChevronLeft size={20} />
                              </button>
                              <button onClick={nextPhoto} className="pointer-events-auto p-2 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/80 transition-colors">
                                <ChevronRight size={20} />
                              </button>
                            </>
                          )}
                        </div>

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 flex gap-2">
                          <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white">
                            {activeHobby.badge}
                          </span>
                          <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white">
                            {activeHobby.locationOrTag}
                          </span>
                        </div>

                        {/* Inspect Toggle Button */}
                        <button 
                          onClick={() => setIsInspectMode(!isInspectMode)}
                          className="absolute top-3 right-3 p-2 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-black/80 transition-colors"
                        >
                          {isInspectMode ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                        </button>

                        {/* Dot Indicators */}
                        {!isInspectMode && activeHobby.images.length > 1 && (
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                            {activeHobby.images.map((_, i) => (
                              <button
                                key={i}
                                onClick={() => setPhotoIndex(i)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                  photoIndex === i ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      {/* STORY & REACTION AREA */}
                      {!isInspectMode && (
                        <div className="p-5 sm:p-6 flex flex-col gap-4">
                          <div>
                            <h3 className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-1">{activeHobby.subtitle}</h3>
                            <h2 className={`text-2xl font-bold font-[Space_Grotesk] ${activeHobby.accentColor}`}>{activeHobby.title}</h2>
                          </div>
                          
                          <p className="text-sm text-slate-300 leading-relaxed min-h-[60px]">
                            {activeHobby.description}
                          </p>

                          {/* Reaction Button */}
                          <div className="flex justify-end mt-2">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={handleLike}
                              className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors min-h-[44px]"
                            >
                              <Heart size={18} className={likes[activeHobby.id] ? "text-rose-500 fill-rose-500" : "text-slate-400"} />
                              <span className="text-sm font-medium">{likes[activeHobby.id] || 0} Vibes</span>
                              
                              {/* Floating Hearts */}
                              {hearts.map(h => (
                                <motion.div
                                  key={h.id}
                                  initial={{ opacity: 1, y: 0, x: h.x, scale: 0.5 }}
                                  animate={{ opacity: 0, y: -60, scale: 1.5 }}
                                  transition={{ duration: 0.8, ease: "easeOut" }}
                                  className="absolute top-0 left-1/2 text-rose-500 pointer-events-none"
                                >
                                  <Heart size={16} fill="currentColor" />
                                </motion.div>
                              ))}
                            </motion.button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
                
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}