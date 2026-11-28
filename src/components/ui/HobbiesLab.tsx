import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Compass, Camera, Wrench, Gamepad2, Music, X, 
  ArrowRight, Zap, Radio, ShieldAlert, Sparkles
} from "lucide-react";

const SPRING = { type: "spring", stiffness: 360, damping: 28, mass: 0.85 } as const;

// --- DATA ---
const HOBBIES = [
  { id: "photography", icon: Camera, label: "Photography", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
  { id: "automotive", icon: Wrench, label: "Car Hardware", color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
  { id: "gaming", icon: Gamepad2, label: "Gaming", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
  { id: "music", icon: Music, label: "Music Flow", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
];

// --- MINI-PLAYGROUND 1: PHOTOGRAPHY ---
function PhotographyPlayground({ onTriggerPhotos }: { onTriggerPhotos: () =>  void }) {
  const [filter, setFilter] = useState("cyber");
  
  const filters = {
    cyber: "contrast(1.2) saturate(1.5) hue-rotate(15deg) brightness(0.9)",
    warm: "sepia(0.4) contrast(1.1) saturate(1.2) brightness(1.1)",
    bw: "grayscale(1) contrast(1.4) brightness(0.9)",
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Viewfinder */}
      <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-slate-900 border border-white/10 group">
        <div 
          className="w-full h-full bg-cover bg-center transition-all duration-500 ease-out"
          style={{ 
            backgroundImage: "url('/images/portraits/p1.jpg')", // Make sure this image exists!
            filter: filters[filter as keyof typeof filters]
          }}
        />
        
        {/* HUD Overlays */}
        <div className="absolute inset-0 pointer-events-none border border-white/20 rounded-2xl m-2 opacity-50" />
        <div className="absolute inset-0 pointer-events-none">
          {/* Rule of thirds */}
          <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/20" />
          <div className="absolute right-1/3 top-0 bottom-0 w-px bg-white/20" />
          <div className="absolute top-1/3 left-0 right-0 h-px bg-white/20" />
          <div className="absolute bottom-1/3 left-0 right-0 h-px bg-white/20" />
          {/* Reticle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-white/40 rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
          </div>
        </div>
        
        {/* Camera Specs */}
        <div className="absolute top-4 left-4 flex gap-2 text-[10px] font-mono text-white/80 bg-black/40 px-2 py-1 rounded backdrop-blur-md">
          <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> REC</span>
          <span>f/1.8</span>
          <span>1/250s</span>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex gap-2">
        {Object.keys(filters).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-2 text-xs font-medium rounded-xl border transition-all ${
              filter === f 
                ? "bg-amber-400/20 border-amber-400/40 text-amber-300" 
                : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
            }`}
          >
            {f === "cyber" ? "Cyber Night" : f === "warm" ? "Warm Film" : "B&W Contrast"}
          </button>
        ))}
      </div>

      <button 
        onClick={onTriggerPhotos}
        className="mt-auto w-full py-3 rounded-xl bg-white text-black text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
      >
        View Full Photo Gallery <ArrowRight size={16} />
      </button>
    </div>
  );
}

// --- MINI-PLAYGROUND 2: AUTOMOTIVE ---
function AutomotivePlayground() {
  const [toggles, setToggles] = useState({ ambient: true, telemetry: false, subwoofer: false });
  
  const toggle = (key: keyof typeof toggles) => setToggles(prev => ({ ...prev, [key]: !prev[key] }));

  const activeLoad = Object.values(toggles).filter(Boolean).length * 1.2 + 12.4;

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Schematic Card */}
      <div className="relative w-full h-48 rounded-2xl bg-[#0a0a10] border border-white/10 overflow-hidden flex items-center justify-center p-4">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />
        
        {/* Central Graphic */}
        <div className="relative z-10 w-32 h-24 border-2 border-slate-700 rounded-xl flex items-center justify-center">
           <span className="text-slate-500 font-mono text-xs">12V ECU</span>
           {/* Glowing lines based on toggles */}
           <div className={`absolute -top-8 left-1/2 w-px h-8 transition-colors duration-300 ${toggles.ambient ? "bg-blue-400 shadow-[0_0_10px_#60a5fa]" : "bg-slate-700"}`} />
           <div className={`absolute -bottom-8 left-1/4 w-px h-8 transition-colors duration-300 ${toggles.telemetry ? "bg-purple-400 shadow-[0_0_10px_#c084fc]" : "bg-slate-700"}`} />
           <div className={`absolute -bottom-8 right-1/4 w-px h-8 transition-colors duration-300 ${toggles.subwoofer ? "bg-emerald-400 shadow-[0_0_10px_#34d399]" : "bg-slate-700"}`} />
        </div>

        {/* Live Voltage Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/50 border border-white/10 backdrop-blur-sm">
          <Zap size={12} className="text-yellow-400" />
          <span className="text-[10px] font-mono text-white">{activeLoad.toFixed(1)}V</span>
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-col gap-2">
        {[
          { key: "ambient", label: "Ambient Cabin Glow", icon: Radio },
          { key: "telemetry", label: "Telemetry HUD", icon: ShieldAlert },
          { key: "subwoofer", label: "Subwoofer DSP", icon: Music },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => toggle(item.key as keyof typeof toggles)}
            className={`flex items-center justify-between p-3 rounded-xl border transition-all min-h-[44px] ${
              toggles[item.key as keyof typeof toggles] 
                ? "bg-white/10 border-white/20" 
                : "bg-white/5 border-white/5"
            }`}
          >
            <div className="flex items-center gap-2">
              <item.icon size={14} className={toggles[item.key as keyof typeof toggles] ? "text-white" : "text-slate-500"} />
              <span className={`text-xs font-medium ${toggles[item.key as keyof typeof toggles] ? "text-white" : "text-slate-400"}`}>{item.label}</span>
            </div>
            <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${toggles[item.key as keyof typeof toggles] ? "bg-blue-500" : "bg-slate-700"}`}>
               <motion.div 
                 layout
                 className="w-3 h-3 bg-white rounded-full shadow-sm"
                 animate={{ x: toggles[item.key as keyof typeof toggles] ? 16 : 0 }}
                 transition={SPRING}
               />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// --- MINI-PLAYGROUND 3: GAMING ---
function GamingPlayground() {
  const [combo, setCombo] = useState(0);
  const [particles, setParticles] = useState<{ id: number, x: number, y: number }[]>([]);

  const handleHit = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCombo(c => c + 1);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newParticle = { id: Date.now(), x, y };
    setParticles(prev => [...prev, newParticle]);
    
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 600);
  };

  return (
    <div className="flex flex-col h-full gap-4 items-center justify-center relative overflow-hidden">
      {/* Combo Counter */}
      <div className="text-center z-10">
        <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-1">Current Combo</p>
        <motion.div 
          key={combo}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={SPRING}
          className="text-5xl font-black text-white tabular-nums font-[Space_Grotesk]"
        >
          {combo}x
        </motion.div>
      </div>

      {/* Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleHit}
        className="relative z-10 w-32 h-32 rounded-full bg-purple-500/20 border-2 border-purple-500/40 flex items-center justify-center text-purple-300 font-bold hover:bg-purple-500/30 transition-colors shadow-[0_0_30px_rgba(168,85,247,0.2)]"
      >
        TEST FEEL
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0, x: p.x, y: p.y }}
            animate={{ opacity: 0, scale: 2, y: p.y - 50 }}
            transition={{ duration: 0.6 }}
            className="absolute w-3 h-3 rounded-full bg-purple-400 pointer-events-none"
            style={{ left: 0, top: 0 }}
          />
        ))}
      </motion.button>
      
      <p className="text-[10px] text-slate-500 font-mono text-center max-w-[200px]">
        Tap rapidly to test UI responsiveness and spring physics.
      </p>
    </div>
  );
}

// --- MINI-PLAYGROUND 4: MUSIC ---
function MusicPlayground() {
  const [mood, setMood] = useState("chill");

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Visualizer */}
      <div className="w-full h-32 rounded-2xl bg-[#0a0a10] border border-white/10 flex items-end justify-center gap-1.5 p-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent" />
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              height: mood === "late" ? ["20%", "80%", "30%", "90%", "20%"] : 
                      mood === "chill" ? ["30%", "60%", "40%", "70%", "30%"] : 
                      ["50%", "40%", "90%", "60%", "50%"] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: mood === "late" ? 0.5 : mood === "chill" ? 1.5 : 0.8, 
              ease: "easeInOut",
              delay: i * 0.05
            }}
            className="w-2 rounded-t-sm bg-emerald-400/80"
            style={{ height: "30%" }}
          />
        ))}
      </div>

      {/* Mood Presets */}
      <div className="flex flex-col gap-2">
        {[
          { id: "late", label: "Late Night Debug", color: "bg-indigo-500" },
          { id: "chill", label: "Chill OPM", color: "bg-emerald-500" },
          { id: "focus", label: "Deep Focus", color: "bg-blue-500" },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setMood(m.id)}
            className={`flex items-center justify-between p-3 rounded-xl border transition-all min-h-[44px] ${
              mood === m.id ? "bg-white/10 border-white/20" : "bg-white/5 border-white/5"
            }`}
          >
            <span className={`text-xs font-medium ${mood === m.id ? "text-white" : "text-slate-400"}`}>{m.label}</span>
            <div className={`w-2 h-2 rounded-full ${mood === m.id ? m.color : "bg-slate-700"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}

// --- MAIN COMPONENT ---
export default function HobbiesLab({ onTriggerPhotos }: { onTriggerPhotos: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  const handleDragEnd = (_event: any, info: any) => {
    if (info.offset.x < -50 || info.velocity.x < -500) {
      setActiveTab(prev => (prev + 1) % HOBBIES.length);
    } else if (info.offset.x > 50 || info.velocity.x > 500) {
      setActiveTab(prev => (prev - 1 + HOBBIES.length) % HOBBIES.length);
    }
  };

  return (
    <>
      {/* 1. COMPACT TRIGGER PILL */}
      {!isOpen && (
        <motion.div
          layoutId="hobby-lab-shell"
          onClick={() => setIsOpen(true)}
          whileTap={{ scale: 0.98 }}
          className="relative w-full rounded-3xl overflow-hidden bg-slate-950/70 border border-white/10 backdrop-blur-2xl shadow-lg cursor-pointer flex items-center justify-between px-4 py-3 min-h-[64px] group"
        >
          {/* Animated Glow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
          
          <div className="relative flex items-center gap-3.5 z-10">
            <div className="relative p-2.5 rounded-2xl bg-white/5 border border-white/10 shadow-sm flex items-center justify-center">
              <Compass size={20} className="text-amber-400 animate-spin-slow" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-[15px] font-semibold text-white tracking-tight flex items-center gap-2">
                Beyond Code <span className="text-slate-500">•</span> Hobbies
              </h3>
              <p className="text-[13px] text-slate-400 mt-0.5">Explore my creative side</p>
            </div>
          </div>

          <div className="relative z-10 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-[10px] font-mono text-white flex items-center gap-1.5">
            <Sparkles size={12} className="text-amber-400" />
            Interactive Tour
          </div>
        </motion.div>
      )}

      {/* 2. CINEMATIC MODAL STAGE */}
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
              layoutId="hobby-lab-shell"
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={SPRING}
                className="relative w-[92vw] max-w-lg bg-slate-950/85 border border-white/15 rounded-3xl p-5 sm:p-6 shadow-[0_25px_70px_rgba(0,0,0,0.75)] backdrop-blur-3xl pointer-events-auto flex flex-col overflow-hidden"
                style={{ transform: "translate3d(0,0,0)", willChange: "transform" }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white font-[Space_Grotesk]">Creative Lab</h2>
                    <p className="text-xs text-slate-400">Interactive mini-playgrounds</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => setIsOpen(false)}
                    className="p-2.5 bg-white/5 border border-white/10 rounded-full text-slate-400 hover:text-white"
                  >
                    <X size={18} />
                  </motion.button>
                </div>

                {/* Tab Selector */}
                <div className="flex gap-1 p-1 bg-white/5 rounded-2xl border border-white/10 mb-6 overflow-x-auto custom-scrollbar">
                  {HOBBIES.map((h, i) => (
                    <button
                      key={h.id}
                      onClick={() => setActiveTab(i)}
                      className={`relative flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-medium transition-colors min-w-[100px] ${
                        activeTab === i ? "text-white" : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {activeTab === i && (
                        <motion.div
                          layoutId="active-hobby-tab"
                          className={`absolute inset-0 ${h.bg} ${h.border} border rounded-xl`}
                          transition={SPRING}
                        />
                      )}
                      <h.icon size={14} className="relative z-10" />
                      <span className="relative z-10 hidden sm:block">{h.label}</span>
                    </button>
                  ))}
                </div>

                {/* Swipeable Content Area */}
                <div className="relative h-[320px] touch-none">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.5}
                      onDragEnd={handleDragEnd}
                      initial={{ x: 300, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -300, opacity: 0 }}
                      transition={SPRING}
                      className="absolute inset-0 w-full h-full flex flex-col"
                    >
                      {activeTab === 0 && <PhotographyPlayground onTriggerPhotos={onTriggerPhotos} />}
                      {activeTab === 1 && <AutomotivePlayground />}
                      {activeTab === 2 && <GamingPlayground />}
                      {activeTab === 3 && <MusicPlayground />}
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