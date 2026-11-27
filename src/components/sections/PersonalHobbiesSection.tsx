import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, ExternalLink, ChevronLeft, ChevronRight, Quote, Maximize2, UploadCloud } from "lucide-react";
import { hobbiesDeepDiveData } from "../../data/hobbiesDeepDiveData";

const SPRING = { type: "spring", stiffness: 360, damping: 28, mass: 0.85 } as const;

function DeepDiveModal({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6" onClick={onClose}>
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={SPRING} onClick={e => e.stopPropagation()} className="relative w-full max-w-4xl bg-slate-950/90 border border-white/15 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-3xl max-h-[90vh] flex flex-col" style={{ transform: "translate3d(0,0,0)", willChange: "transform" }}>
          <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-black/50 text-white hover:bg-white/20 transition-colors backdrop-blur-md">
            <X size={20} />
          </button>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function CyclingDeepDive() {
  const [index, setIndex] = useState(0);
  const moments = hobbiesDeepDiveData.cycling.moments;
  const current = moments[index];
  const next = () => setIndex(i => (i + 1) % moments.length);
  const prev = () => setIndex(i => (i - 1 + moments.length) % moments.length);
  const handleDragEnd = (e: any, info: any) => { if (info.offset.x < -50) next(); else if (info.offset.x > 50) prev(); };

  return (
    <div className="flex flex-col md:flex-row h-full overflow-y-auto custom-scrollbar">
      <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto md:h-[600px] bg-black/50 overflow-hidden shrink-0">
        <AnimatePresence mode="wait">
          <motion.img key={current.id} src={current.image} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.4} onDragEnd={handleDragEnd} className="w-full h-full object-cover cursor-grab active:cursor-grabbing" style={{ touchAction: "pan-y" }} />
        </AnimatePresence>
        {moments.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
            <button onClick={prev} className="pointer-events-auto p-3 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/80"><ChevronLeft size={24} /></button>
            <button onClick={next} className="pointer-events-auto p-3 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/80"><ChevronRight size={24} /></button>
          </div>
        )}
      </div>
      <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center bg-gradient-to-b from-slate-900/50 to-slate-950/80">
        <AnimatePresence mode="wait">
          <motion.div key={current.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-cyan-400">
              <Quote size={20} />
              <span className="text-xs font-mono uppercase tracking-widest">{current.type}</span>
            </div>
            <h3 className="text-2xl font-bold text-white font-[Space_Grotesk] mb-6">{current.title}</h3>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500/30 rounded-full" />
              <p className="text-lg text-slate-300 leading-loose whitespace-pre-wrap pl-6 italic">{current.text}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function AutomotiveDeepDive() {
  const { company, branches } = hobbiesDeepDiveData.automotive;
  const [activeBranch, setActiveBranch] = useState(branches[0]);
  return (
    <div className="flex flex-col h-[80vh] md:h-[600px]">
      <div className="p-6 md:p-8 bg-slate-900/50 border-b border-white/10 shrink-0">
        <h2 className="text-2xl font-bold text-white font-[Space_Grotesk] mb-2">{company.name}</h2>
        <p className="text-sm text-slate-400 leading-relaxed max-w-2xl mb-4">{company.description}</p>
        <div className="flex flex-wrap gap-2">
          {company.services.map(s => <span key={s} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-slate-300">{s}</span>)}
        </div>
      </div>
      <div className="flex px-6 pt-6 gap-2 overflow-x-auto shrink-0 custom-scrollbar">
        {branches.map((b) => (
          <button key={b.id} onClick={() => setActiveBranch(b)} className={`px-5 py-3 rounded-xl border text-sm font-semibold whitespace-nowrap transition-all ${activeBranch.id === b.id ? "bg-blue-500/20 border-blue-500/40 text-blue-300" : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"}`}>
            {b.name}
          </button>
        ))}
      </div>
      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 overflow-y-auto custom-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div key={activeBranch.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="w-full md:w-1/2 h-64 md:h-full rounded-2xl overflow-hidden bg-black/50">
            <img src={activeBranch.image} alt={activeBranch.name} className="w-full h-full object-cover" />
          </motion.div>
        </AnimatePresence>
        <div className="w-full md:w-1/2 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-2">{activeBranch.name}</h3>
          <p className="text-sm text-slate-300 leading-relaxed mb-4">{activeBranch.description}</p>
          <div className="mb-6">
            <p className="text-xs font-mono text-slate-500 uppercase mb-2">Specialties</p>
            <div className="flex flex-wrap gap-2">
              {activeBranch.specialties.map(s => <span key={s} className="px-2.5 py-1 bg-white/5 rounded text-xs text-slate-300">{s}</span>)}
            </div>
          </div>
          <div className="mt-auto p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-start gap-3 mb-3">
              <MapPin size={18} className="text-blue-400 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-300">{activeBranch.address}</p>
            </div>
            <a href={activeBranch.mapLink} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-sm font-semibold transition-colors">
              Open in Google Maps <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhotographyDeepDive() {
  const photos = hobbiesDeepDiveData.photography.photos;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);

  const next = () => setActiveIndex(i => (i + 1) % photos.length);
  const prev = () => setActiveIndex(i => (i - 1 + photos.length) % photos.length);
  const current = photos[activeIndex];

  const handleDragEnd = (e: any, info: any) => {
    if (info.offset.x < -50) next();
    else if (info.offset.x > 50) prev();
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedPhoto(url);
      setIsFullScreen(true);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row h-[80vh] md:h-[600px] overflow-hidden">
        <div className="relative w-full md:w-3/5 h-1/2 md:h-full bg-black/50 flex flex-col shrink-0 group">
          <motion.div 
            drag="x" 
            dragConstraints={{ left: 0, right: 0 }} 
            dragElastic={0.2} 
            onDragEnd={handleDragEnd}
            className="w-full h-full cursor-grab active:cursor-grabbing relative"
            style={{ touchAction: "pan-y" }}
          >
            <AnimatePresence mode="wait">
              <motion.img 
                key={current.id} 
                src={current.image} 
                initial={{ opacity: 0, scale: 1.02 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0 }} 
                transition={{ duration: 0.3 }} 
                className="absolute inset-0 w-full h-full object-cover" 
              />
            </AnimatePresence>
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
            <button onClick={prev} className="pointer-events-auto p-3 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/80"><ChevronLeft size={24} /></button>
            <button onClick={next} className="pointer-events-auto p-3 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/80"><ChevronRight size={24} /></button>
          </div>

          <button 
            onClick={() => setIsFullScreen(true)} 
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Maximize2 size={18} />
          </button>

          <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-xl font-bold text-white font-[Space_Grotesk]">{current.title}</h3>
          </div>
        </div>

        <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col bg-slate-900/40 border-l border-white/10 overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-mono text-slate-400 uppercase tracking-widest">Scenery Gallery</h3>
            <span className="text-xs text-slate-500">{activeIndex + 1} / {photos.length}</span>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mb-8">
            {photos.map((p, i) => (
              <button key={p.id} onClick={() => setActiveIndex(i)} className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${i === activeIndex ? "border-amber-400 opacity-100" : "border-transparent opacity-50 hover:opacity-100"}`}>
                <img src={p.image} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-white/10">
            <h4 className="text-sm font-semibold text-white mb-2">Have a photo to test?</h4>
            <p className="text-xs text-slate-400 mb-4">Upload an image to preview it in the gallery instantly.</p>
            
            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleUpload} />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex flex-col items-center justify-center py-6 border-2 border-dashed border-white/20 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
            >
              <UploadCloud size={24} className="text-amber-400 mb-2" />
              <span className="text-sm font-medium text-white">Upload Sample</span>
            </button>

            {uploadedPhoto && (
              <div className="mt-4 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <p className="text-xs text-amber-300 text-center">Sample uploaded! Click to view.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {(isFullScreen || uploadedPhoto) && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[20000] bg-black/95 flex items-center justify-center p-4 backdrop-blur-xl"
            onClick={() => { setIsFullScreen(false); if(uploadedPhoto) { setUploadedPhoto(null); } }}
          >
            <button className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20"><X size={24} /></button>
            <motion.img 
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              src={uploadedPhoto || current.image} 
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl" 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function PersonalHobbiesSection() {
  const [activeModal, setActiveModal] = useState<"cycling" | "automotive" | "photography" | null>(null);
  
  const hobbies = [
    { id: "cycling", title: "Cycling", subtitle: "Pagba-bike", tag: "Night Rides", desc: "There's nothing like the cool night breeze to clear my head after hours of debugging.", img: "/images/portraits/p1.jpg", color: "text-cyan-400", btn: "Explore Ride & Letters" },
    { id: "automotive", title: "Car Accessories", subtitle: "Hands-on Automotive", tag: "Custom Installs", desc: "From wiring custom ambient lighting to installing new audio components.", img: "/images/portraits/p3.jpg", color: "text-blue-400", btn: "View 3 Shop Branches" },
    { id: "photography", title: "Photography", subtitle: "Visual Storytelling", tag: "Scenery & Mood", desc: "Capturing candid moments, moody lighting, and everyday memories.", img: "/images/portraits/p5.webp", color: "text-amber-400", btn: "View Scenery Shots" },
  ];

  return (
    <section id="hobbies" aria-label="Hobbies and Life Outside Code" className="relative py-20 sm:py-32 px-5 md:px-12 max-w-7xl mx-auto z-10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16 flex flex-col items-center text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-[10px] md:text-xs font-mono text-violet-300 uppercase tracking-widest font-semibold">Off The Clock</span>
        </div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-[Space_Grotesk] text-white mb-6">Hobbies & Personal Passions</h2>
        <p className="text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed">When I'm not pushing commits or debugging systems, I love to unwind with hands-on crafts, clear my head on two wheels, and capture everyday moments.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {hobbies.map((hobby, index) => (
          <motion.div key={hobby.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ ...SPRING, delay: index * 0.1 }} className="group relative flex flex-col w-full rounded-3xl overflow-hidden bg-slate-950/75 border border-white/10 backdrop-blur-2xl shadow-xl hover:border-white/20 transition-colors" style={{ transform: "translate3d(0,0,0)", willChange: "transform" }}>
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-black/40">
              <img src={hobby.img} alt={hobby.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-widest ${hobby.color}`}>{hobby.tag}</span>
              </div>
            </div>
            <div className="flex flex-col flex-1 p-5 md:p-6">
              <h3 className={`text-xl font-bold font-[Space_Grotesk] mb-1 ${hobby.color}`}>{hobby.title}</h3>
              <p className="text-xs font-mono text-slate-400 mb-4">{hobby.subtitle}</p>
              <p className="text-sm text-slate-300 leading-relaxed mb-6 flex-1">{hobby.desc}</p>
              <button onClick={() => setActiveModal(hobby.id as any)} className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2 min-h-[44px]">
                {hobby.btn}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <DeepDiveModal isOpen={activeModal === "cycling"} onClose={() => setActiveModal(null)}><CyclingDeepDive /></DeepDiveModal>
      <DeepDiveModal isOpen={activeModal === "automotive"} onClose={() => setActiveModal(null)}><AutomotiveDeepDive /></DeepDiveModal>
      <DeepDiveModal isOpen={activeModal === "photography"} onClose={() => setActiveModal(null)}><PhotographyDeepDive /></DeepDiveModal>
    </section>
  );
}