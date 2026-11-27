import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { lifestyleShowcaseData, type ShowcaseItem } from "../../data/lifestyleShowcaseData";

const SPRING = { type: "spring", stiffness: 360, damping: 28, mass: 0.85 } as const;

function ShowcaseLightbox({ item, initialIndex, onClose }: { item: ShowcaseItem, initialIndex: number, onClose: () => void }) {
  const [index, setIndex] = useState(initialIndex);
  const next = () => setIndex(i => (i + 1) % item.images.length);
  const prev = () => setIndex(i => (i - 1 + item.images.length) % item.images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50">
        <X size={24} />
      </button>
      <div className="relative w-full max-w-5xl flex flex-col items-center" onClick={e => e.stopPropagation()}>
        <div className="relative w-full aspect-video md:aspect-auto md:h-[70vh] flex items-center justify-center bg-black/50 rounded-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={index} src={item.images[index]} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              className="max-w-full max-h-full object-contain" alt={item.title}
            />
          </AnimatePresence>
          {item.images.length > 1 && (
            <>
              <button onClick={prev} className="absolute left-4 p-3 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-md transition-colors"><ChevronLeft size={24} /></button>
              <button onClick={next} className="absolute right-4 p-3 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-md transition-colors"><ChevronRight size={24} /></button>
            </>
          )}
        </div>
        <div className="w-full mt-4 bg-slate-900/80 p-5 rounded-2xl border border-white/10 backdrop-blur-md">
          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
          <p className="text-slate-300 text-sm leading-relaxed">{item.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

function ShowcaseCard({ item, index }: { item: ShowcaseItem; index: number }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [likes, setLikes] = useState(0);
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);

  const nextPhoto = () => setPhotoIndex(p => (p + 1) % item.images.length);
  const prevPhoto = () => setPhotoIndex(p => (p - 1 + item.images.length) % item.images.length);

  const handleSwipeEnd = (_event: any, info: any) => {
    if (info.offset.x < -40 || info.velocity.x < -500) nextPhoto();
    else if (info.offset.x > 40 || info.velocity.x > 500) prevPhoto();
  };

  const handleLike = () => {
    setLikes(l => l + 1);
    const newHeart = { id: Date.now(), x: Math.random() * 40 - 20 };
    setHearts(prev => [...prev, newHeart]);
    setTimeout(() => setHearts(prev => prev.filter(h => h.id !== newHeart.id)), 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }}
      transition={{ ...SPRING, delay: index * 0.1 }}
      className="group relative flex flex-col w-full rounded-3xl overflow-hidden bg-slate-950/75 border border-white/10 backdrop-blur-2xl shadow-xl"
      style={{ transform: "translate3d(0,0,0)", willChange: "transform" }}
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-black/40">
        <motion.div
          drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.3} onDragEnd={handleSwipeEnd}
          className="w-full h-full cursor-grab active:cursor-grabbing" style={{ touchAction: "pan-y" }}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.img
              key={photoIndex} src={item.images[photoIndex]} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              className="w-full h-full object-cover" alt={item.title}
            />
          </AnimatePresence>
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-between p-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {item.images.length > 1 && (
            <>
              <button onClick={prevPhoto} className="pointer-events-auto p-2 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/80"><ChevronLeft size={20} /></button>
              <button onClick={nextPhoto} className="pointer-events-auto p-2 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/80"><ChevronRight size={20} /></button>
            </>
          )}
        </div>

        <button onClick={() => setIsLightboxOpen(true)} className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/80 transition-colors">
          <Maximize2 size={18} />
        </button>

        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-widest ${item.accentColor}`}>
            {item.dateOrTag}
          </span>
        </div>

        {item.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {item.images.map((_, i) => (
              <button key={i} onClick={() => setPhotoIndex(i)} className={`h-1.5 rounded-full transition-all duration-300 ${photoIndex === i ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"}`} />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5 md:p-6">
        <h3 className={`text-xl font-bold font-[Space_Grotesk] mb-1 ${item.accentColor}`}>{item.title}</h3>
        <p className="text-xs font-mono text-slate-400 mb-3">{item.subtitle}</p>
        <p className="text-sm text-slate-300 leading-relaxed mb-6 flex-1">{item.description}</p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors min-h-[44px]"
          >
            <Heart size={16} className={likes > 0 ? "text-rose-500 fill-rose-500" : "text-slate-400"} />
            <span className="text-sm font-medium">{likes} Vibes</span>
            {hearts.map(h => (
              <motion.div
                key={h.id}
                initial={{ opacity: 1, y: 0, x: h.x, scale: 0.5 }}
                animate={{ opacity: 0, y: -40, scale: 1.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute top-0 left-1/2 text-rose-500 pointer-events-none"
              >
                <Heart size={14} fill="currentColor" />
              </motion.div>
            ))}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isLightboxOpen && <ShowcaseLightbox item={item} initialIndex={photoIndex} onClose={() => setIsLightboxOpen(false)} />}
      </AnimatePresence>
    </motion.div>
  );
}

export default function LifestyleShowcaseSection() {
  return (
    <section id="lifestyle" className="relative py-24 px-5 md:px-12 max-w-7xl mx-auto z-10">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="mb-12 md:mb-16 flex flex-col items-center text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-[10px] font-mono text-violet-300 uppercase tracking-widest">Beyond The Screen</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold font-[Space_Grotesk] text-white mb-6">
          Personal Hobbies
        </h2>
        <p className="text-slate-400 max-w-2xl text-sm md:text-base">
          When I'm not pushing commits or debugging systems, here is how I spend my time offline.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lifestyleShowcaseData.map((item, index) => (
          <ShowcaseCard key={item.id} item={item} index={index} />
        ))}
      </div>
      
    </section>
  );
}
