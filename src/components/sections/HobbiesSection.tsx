import { useState } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { Camera, ChevronLeft, ChevronRight, Heart, Maximize2, X } from "lucide-react";
import { hobbiesData, type Hobby } from "../../data/hobbiesData";

const SPRING = { type: "spring", stiffness: 360, damping: 28, mass: 0.85 } as const;

function HobbyLightbox({ images, initialIndex, onClose }: { images: string[], initialIndex: number, onClose: () => void }) {
  const [index, setIndex] = useState(initialIndex);
  const next = () => setIndex(i => (i + 1) % images.length);
  const prev = () => setIndex(i => (i - 1 + images.length) % images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
        <X size={24} />
      </button>
      <div className="relative w-full max-w-5xl aspect-video flex items-center justify-center" onClick={e => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.img
            key={index} src={images[index]} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl" alt="Hobby zoom"
          />
        </AnimatePresence>
        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-4 p-4 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-md transition-colors"><ChevronLeft size={24} /></button>
            <button onClick={next} className="absolute right-4 p-4 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-md transition-colors"><ChevronRight size={24} /></button>
          </>
        )}
      </div>
    </motion.div>
  );
}

function HobbyCard({ hobby, index }: { hobby: Hobby; index: number }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [likes, setLikes] = useState(0);
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);
  const dragControls = useDragControls();

  const nextPhoto = () => setPhotoIndex(p => (p + 1) % hobby.images.length);
  const prevPhoto = () => setPhotoIndex(p => (p - 1 + hobby.images.length) % hobby.images.length);

  const handleSwipeEnd = (e: any, info: any) => {
    if (info.offset.x < -40) nextPhoto();
    else if (info.offset.x > 40) prevPhoto();
  };

  const handleLike = (e: React.MouseEvent) => {
    setLikes(l => l + 1);
    const newHeart = { id: Date.now(), x: Math.random() * 40 - 20 };
    setHearts(prev => [...prev, newHeart]);
    setTimeout(() => setHearts(prev => prev.filter(h => h.id !== newHeart.id)), 1000);
  };

  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
      transition={{ ...SPRING, delay: index * 0.1 }}
      className={`group relative flex flex-col md:flex-row w-full rounded-3xl overflow-hidden bg-slate-950/70 border border-white/10 backdrop-blur-2xl shadow-xl ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
      style={{ transform: "translate3d(0,0,0)", willChange: "transform" }}
    >
      <div className="relative w-full md:w-3/5 aspect-[4/3] md:aspect-auto md:min-h-[350px] overflow-hidden bg-black/40">
        <motion.div
          drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.3} onDragEnd={handleSwipeEnd}
          className="w-full h-full cursor-grab active:cursor-grabbing" style={{ touchAction: "pan-y" }}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.img
              key={photoIndex} src={hobby.images[photoIndex]} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              className="w-full h-full object-cover" alt={hobby.title}
            />
          </AnimatePresence>
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-between p-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {hobby.images.length > 1 && (
            <>
              <button onClick={prevPhoto} className="pointer-events-auto p-2 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/80"><ChevronLeft size={20} /></button>
              <button onClick={nextPhoto} className="pointer-events-auto p-2 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/80"><ChevronRight size={20} /></button>
            </>
          )}
        </div>

        <button onClick={() => setIsLightboxOpen(true)} className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/80 transition-colors">
          <Maximize2 size={18} />
        </button>

        {hobby.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {hobby.images.map((_, i) => (
              <button key={i} onClick={() => setPhotoIndex(i)} className={`h-1.5 rounded-full transition-all duration-300 ${photoIndex === i ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"}`} />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center p-6 md:p-8 w-full md:w-2/5">
        <div className="flex items-center gap-2 mb-2">
          <Camera size={14} className={hobby.accentColor} />
          <span className={`text-[10px] font-mono uppercase tracking-widest ${hobby.accentColor}`}>{hobby.categoryTag}</span>
        </div>
        <h3 className="text-2xl font-bold text-white font-[Space_Grotesk] mb-3">{hobby.title}</h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-6">{hobby.description}</p>

        <div className="mt-auto flex items-center">
          <motion.button whileTap={{ scale: 0.9 }} onClick={handleLike} className="relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">
            <Heart size={16} className={likes > 0 ? "text-rose-500 fill-rose-500" : "text-slate-400"} />
            <span className="text-sm font-medium">{likes} Vibes</span>
            {hearts.map(h => (
              <motion.div key={h.id} initial={{ opacity: 1, y: 0, x: h.x, scale: 0.5 }} animate={{ opacity: 0, y: -40, scale: 1.2 }} transition={{ duration: 0.8, ease: "easeOut" }} className="absolute top-0 left-1/2 text-rose-500 pointer-events-none">
                <Heart size={14} fill="currentColor" />
              </motion.div>
            ))}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isLightboxOpen && <HobbyLightbox images={hobby.images} initialIndex={photoIndex} onClose={() => setIsLightboxOpen(false)} />}
      </AnimatePresence>
    </motion.div>
  );
}

export default function HobbiesSection() {
  return (
    <section id="hobbies" className="relative py-24 px-5 md:px-12 max-w-7xl mx-auto z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="mb-16 md:mb-24 flex flex-col items-center text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest">Beyond Code</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold font-[Space_Grotesk] text-white mb-4">
          Hobbies & Personal Interests
        </h2>
        <p className="text-slate-400 max-w-2xl text-sm md:text-base">
          When I'm not pushing commits or debugging systems, here is how I spend my time offline.
        </p>
      </motion.div>

      <div className="flex flex-col gap-6 md:gap-10">
        {hobbiesData.map((hobby, index) => (
          <HobbyCard key={hobby.id} hobby={hobby} index={index} />
        ))}
      </div>
    </section>
  );
}