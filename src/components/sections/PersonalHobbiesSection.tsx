import { useState, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { X, MapPin, ExternalLink, ChevronLeft, ChevronRight, Quote, Maximize2, UploadCloud, Phone, Copy } from "lucide-react";
import { hobbiesDeepDiveData } from "../../data/hobbiesDeepDiveData";
import { carAccessoriesShops } from "../../data/carAccessoriesShopsData";

const SPRING = { type: "spring", stiffness: 450, damping: 32, mass: 0.75 } as const;

function DeepDiveModal({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-6" onClick={onClose}>
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={SPRING} onClick={e => e.stopPropagation()} className="adaptive-glass relative w-full max-w-5xl rounded-[32px] border border-white/10 bg-slate-950/75 backdrop-blur-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col" style={{ transform: "translate3d(0,0,0)", willChange: "transform" }}>
          <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-[var(--md-surface-container-high)] text-white hover:bg-white/10 transition-colors">
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
  const handleDragEnd = (_event: any, info: any) => { if (info.offset.x < -50) next(); else if (info.offset.x > 50) prev(); };

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
      <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center bg-[var(--md-surface-container)]">
        <AnimatePresence mode="wait">
          <motion.div key={current.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-[var(--md-primary)]">
              <Quote size={20} />
              <span className="text-xs font-mono uppercase tracking-widest">{current.type}</span>
            </div>
            <h3 className="text-2xl font-bold text-white font-[Space_Grotesk] mb-6">{current.title}</h3>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--md-primary)]/30 rounded-full" />
              <p className="text-lg text-slate-300 leading-loose whitespace-pre-wrap pl-6 italic">{current.text}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function AutomotiveDeepDive() {
  const [activeShop, setActiveShop] = useState(carAccessoriesShops[0]);
  const [isMapLoading, setIsMapLoading] = useState(true);

  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(activeShop.mapQuery)}&t=&z=18&ie=UTF8&iwloc=&output=embed`;
  const exactPinUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${activeShop.name}, ${activeShop.mapQuery}`)}`;

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
  };

  return (
    <div className="flex flex-col h-[85vh] md:h-[600px]">
      
      {/* HEADER WITH LOGO */}
      <div className="p-5 md:p-7 bg-[var(--md-surface-container-high)] border-b border-[var(--md-outline)] shrink-0 flex items-center gap-4">
        <div className="w-24 h-16 md:w-28 md:h-20 rounded-xl bg-white border border-white/10 overflow-hidden shrink-0 flex items-center justify-center p-1">
          <img src={activeShop.image} alt={`${activeShop.name} logo`} className="w-full h-full object-contain" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-xl md:text-2xl font-bold text-white font-[Space_Grotesk]">{activeShop.name}</h2>
          <p className="text-sm text-slate-400">Car Accessories & Hardware</p>
          <p className="mt-2 flex items-start gap-1.5 text-xs md:text-sm text-slate-300 leading-relaxed">
            <MapPin size={15} className="text-[var(--md-primary)] shrink-0 mt-0.5" />
            <span><span className="font-semibold text-white/80">Location:</span> {activeShop.address}</span>
          </p>
        </div>
      </div>

      {/* SHOP TABS WITH LOGOS */}
      <LayoutGroup id="shop-pin-tabs">
        <div className="flex px-6 pt-6 gap-3 overflow-x-auto shrink-0 custom-scrollbar" role="tablist" aria-label="Choose car accessories shop">
          {carAccessoriesShops.map((shop) => {
            const isActive = activeShop.id === shop.id;
            return (
              <motion.button
                key={shop.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  if (isActive) return;
                  setIsMapLoading(true);
                  setActiveShop(shop);
                }}
                className={`relative isolate flex items-center gap-3 px-4 py-2.5 rounded-2xl border text-sm font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? "border-[var(--md-primary)]/30 text-[var(--md-on-primary-container)]"
                    : "border-transparent text-gray-400 hover:bg-white/10"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="shop-pin-tab"
                    transition={SPRING}
                    className="absolute inset-0 -z-10 rounded-2xl bg-[var(--md-primary-container)]"
                  />
                )}
                <span className="w-14 h-10 rounded-lg overflow-hidden bg-white shrink-0 border border-white/10 p-0.5">
                  <img src={shop.image} alt="" className="w-full h-full object-contain" />
                </span>
                <span>{shop.name}</span>
              </motion.button>
            );
          })}
        </div>
      </LayoutGroup>

      {/* MAIN CONTENT SPLIT VIEW */}
      <div className="flex-1 min-h-0 p-5 md:p-8 flex flex-col md:flex-row gap-6 overflow-y-auto custom-scrollbar" style={{ touchAction: 'pan-y' }}>
        
        {/* LEFT: Map / Image */}
        <div className="w-full md:w-1/2 flex flex-col gap-3">
          <div className="relative w-full aspect-[16/10] md:aspect-[4/3] rounded-[24px] overflow-hidden bg-slate-900 border border-[var(--md-outline)] shadow-lg">
            {isMapLoading && (
              <div role="status" aria-live="polite" className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-slate-950/70 p-6 text-center backdrop-blur-md">
                <div aria-hidden="true" className="w-full max-w-56 space-y-2">
                  <span className="block h-3 w-3/4 rounded-full bg-white/15 animate-pulse" />
                  <span className="block h-3 w-full rounded-full bg-white/10 animate-pulse [animation-delay:120ms]" />
                  <span className="block h-3 w-2/3 rounded-full bg-white/10 animate-pulse [animation-delay:240ms]" />
                </div>
                <span className="text-sm text-white/80">Loading the {activeShop.name} map…</span>
              </div>
            )}
            <iframe
              key={activeShop.id}
              title={`Zoom 18 map pin for ${activeShop.name} at ${activeShop.address}`}
              className="absolute inset-0 h-full w-full border-0"
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              onLoad={() => setIsMapLoading(false)}
            />
            <motion.div
              initial={{ opacity: 0.9, scale: 0.98 }}
              animate={{ opacity: [0.92, 1, 0.92], scale: [1, 1.015, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="adaptive-glass absolute left-3 top-3 z-20 flex max-w-[calc(100%-1.5rem)] items-start gap-2.5 rounded-2xl border border-white/15 bg-slate-950/75 px-3 py-2.5 text-white shadow-[0_0_24px_rgba(56,189,248,0.25)] backdrop-blur-2xl"
            >
              <MapPin size={19} className="mt-0.5 shrink-0 text-rose-400 drop-shadow-[0_0_8px_rgba(251,113,133,0.9)]" />
              <span className="min-w-0">
                <span className="block truncate text-xs font-bold">{activeShop.name}</span>
                <span className="mt-0.5 block text-[11px] leading-snug text-white/75">{activeShop.address}</span>
              </span>
            </motion.div>
          </div>
        </div>

        {/* RIGHT: Details */}
        <div className="w-full md:w-1/2 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-2">{activeShop.name}</h3>
          
          {activeShop.contacts.length > 0 && (
            <div className="mb-6">
              <p className="text-xs font-bold text-gray-500 uppercase mb-3">Contact Numbers</p>
              <div className="flex flex-wrap gap-2">
                {activeShop.contacts.map(c => (
                  <button 
                    key={c} 
                    onClick={() => handleCopyPhone(c)}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 border border-[var(--md-outline)] text-sm text-gray-300 hover:bg-white/10 transition-colors"
                  >
                    <Phone size={14} /> {c} <Copy size={14} className="opacity-50 ml-1" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8 flex-1">
            <p className="text-xs font-bold text-gray-500 uppercase mb-3">Services & Installs</p>
            <div className="flex flex-wrap gap-2">
              {activeShop.services.map(s => (
                <span key={s} className="px-3 py-1.5 bg-white/5 border border-[var(--md-outline)] rounded-lg text-xs text-gray-300">{s}</span>
              ))}
            </div>
          </div>

          <a 
            href={exactPinUrl}
            target="_blank" 
            rel="noreferrer" 
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)] hover:bg-[var(--md-primary)]/20 rounded-xl text-sm font-bold transition-colors mt-auto"
          >
            Open Exact Pin in Google Maps <ExternalLink size={16} />
          </a>
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

  const handleDragEnd = (_event: any, info: any) => {
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

        <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col bg-[var(--md-surface-container)] border-l border-[var(--md-outline)] overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-mono text-slate-400 uppercase tracking-widest">Scenery Gallery</h3>
            <span className="text-xs text-slate-500">{activeIndex + 1} / {photos.length}</span>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mb-8">
            {photos.map((p, i) => (
              <button key={p.id} onClick={() => setActiveIndex(i)} className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${i === activeIndex ? "border-[var(--md-primary)] opacity-100" : "border-transparent opacity-50 hover:opacity-100"}`}>
                <img src={p.image} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-[var(--md-outline)]">
            <h4 className="text-sm font-semibold text-white mb-2">Have a photo to test?</h4>
            <p className="text-xs text-slate-400 mb-4">Upload an image to preview it in the gallery instantly.</p>
            
            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleUpload} />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex flex-col items-center justify-center py-6 border-2 border-dashed border-[var(--md-outline)] rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
            >
              <UploadCloud size={24} className="text-[var(--md-primary)] mb-2" />
              <span className="text-sm font-medium text-white">Upload Sample</span>
            </button>

            {uploadedPhoto && (
              <div className="mt-4 p-2 rounded-lg bg-[var(--md-primary-container)] border border-[var(--md-primary)]/30">
                <p className="text-xs text-[var(--md-on-primary-container)] text-center font-semibold">Sample uploaded! Click to view.</p>
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
    { id: "cycling", title: "Cycling", subtitle: "Pagba-bike", tag: "Night Rides", desc: "There's nothing like the cool night breeze to clear my head after hours of debugging.", img: "/images/portraits/p1.jpg", color: "text-[var(--md-primary)]", btn: "Explore Ride & Letters" },
    { id: "automotive", title: "Car Accessories", subtitle: "Hands-on Automotive", tag: "Custom Installs", desc: "From wiring custom ambient lighting to installing new audio components.", img: "/images/shops/6rf.png", color: "text-[var(--md-tertiary)]", btn: "View 3 Shop Branches" },
    { id: "photography", title: "Photography", subtitle: "Visual Storytelling", tag: "Scenery & Mood", desc: "Capturing candid moments, moody lighting, and everyday memories.", img: "/images/portraits/p5.webp", color: "text-[var(--md-secondary)]", btn: "View Scenery Shots" },
  ];

  return (
    <section id="hobbies" aria-label="Hobbies and Life Outside Code" className="relative py-20 sm:py-32 px-5 md:px-12 max-w-7xl mx-auto z-10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--md-primary-container)] rounded-full blur-[120px] pointer-events-none opacity-50" />

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16 flex flex-col items-center text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--md-primary-container)] border border-[var(--md-primary)]/30 mb-6">
          <span className="w-2 h-2 rounded-full bg-[var(--md-primary)] animate-pulse" />
          <span className="text-[10px] md:text-xs font-mono text-[var(--md-on-primary-container)] uppercase tracking-widest font-semibold">Off The Clock</span>
        </div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-[Space_Grotesk] text-white mb-6">Hobbies & Personal Passions</h2>
        <p className="text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed">When I'm not pushing commits or debugging systems, I love to unwind with hands-on crafts, clear my head on two wheels, and capture everyday moments.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {hobbies.map((hobby, index) => (
          <motion.div key={hobby.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ ...SPRING, delay: index * 0.1 }} className="group relative flex flex-col w-full rounded-[28px] overflow-hidden bg-[var(--md-surface-container)] border border-[var(--md-outline)] shadow-xl hover:border-[var(--md-primary)]/50 transition-colors" style={{ transform: "translate3d(0,0,0)", willChange: "transform" }}>
            <div className={`relative w-full aspect-[4/3] overflow-hidden ${hobby.id === "automotive" ? "bg-white" : "bg-black/40"}`}>
              <img
                src={hobby.img}
                alt={hobby.id === "automotive" ? "6RF Car Accessories logo and shop address" : hobby.title}
                className={`w-full h-full ${hobby.id === "automotive" ? "object-contain p-5 md:p-8" : "object-cover transition-transform duration-500 group-hover:scale-105"}`}
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[var(--md-outline)] text-[10px] font-mono uppercase tracking-widest text-white">{hobby.tag}</span>
              </div>
            </div>
            <div className="flex flex-col flex-1 p-6">
              <h3 className={`text-xl font-bold mb-1 ${hobby.color}`}>{hobby.title}</h3>
              <p className="text-xs font-mono text-slate-400 mb-4">{hobby.subtitle}</p>
              <p className="text-sm text-slate-300 leading-relaxed mb-6 flex-1">{hobby.desc}</p>
              <button onClick={() => setActiveModal(hobby.id as any)} className="w-full py-3 rounded-full bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)] font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 min-h-[44px]">
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
