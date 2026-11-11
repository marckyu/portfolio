import { useState, lazy, Suspense, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowDown, Globe, Gamepad2, Image as ImageIcon, ChevronDown, ChevronUp } from "lucide-react";
import { site } from "../../data/site";
import { portraits } from "../../data/portraits";
import { Button } from "../ui/Button";
import GithubIcon from "../ui/GithubIcon";
import InfinitePortraits from "./InfinitePortraits";
import DevSoundtrackWidget from "../ui/DevSoundtrackWidget";

const Lightbox = lazy(() => import("../ui/Lightbox"));

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

const techStack = ["React", "TypeScript", "Tailwind", "PocketBase"];

function WebDevCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      layout
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group relative rounded-3xl bg-slate-950/70 backdrop-blur-3xl border border-white/10 transition-all duration-300 hover:border-cyan-500/30 overflow-hidden shadow-xl will-change-transform transform-gpu"
    >
      <div className="p-4 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 md:p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
            <Globe size={18} />
          </div>
          <h3 className="text-sm md:text-base font-bold text-white font-[Space_Grotesk]">Web Development</h3>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors shrink-0"
        >
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 md:px-5 md:pb-5">
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                Frontend, backend, and web app architecture with responsive UI.
              </p>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {techStack.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Shipped in real projects
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function GameDevCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      layout
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group relative rounded-3xl bg-slate-950/70 backdrop-blur-3xl border border-white/10 transition-all duration-300 hover:border-purple-500/30 overflow-hidden shadow-xl will-change-transform transform-gpu"
    >
      <div className="p-4 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 md:p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
            <Gamepad2 size={18} />
          </div>
          <h3 className="text-sm md:text-base font-bold text-white font-[Space_Grotesk]">Game Development</h3>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors shrink-0"
        >
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 md:px-5 md:pb-5">
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                Game mechanics, logic, and gameplay systems.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                Currently experimenting
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Hero() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showPortraits, setShowPortraits] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPortraits(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-24 overflow-hidden bg-[#050508]">
      
      <div className="absolute inset-0 z-0 opacity-40 md:opacity-60">
        {showPortraits && (
          <InfinitePortraits 
            onOpenPhoto={setLightboxIndex} 
            isPaused={lightboxIndex !== null} 
          />
        )}
        <div className="absolute inset-0 bg-[#050508]/70 pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-12 pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          <motion.div variants={containerVariants} initial="hidden" animate="show" className="lg:col-span-7 flex flex-col items-start pt-10 md:pt-0 pointer-events-auto">
            <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] md:text-xs font-mono text-gray-300 tracking-wider uppercase">Available for work</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold font-[Space_Grotesk] leading-[1.1] tracking-tight">
              <span className="block text-gray-400 text-base md:text-2xl font-mono mb-2 font-normal">{site.name}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 block">{site.role.split(" ")[0]}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4f8cff] to-[#8b5cf6] block">{site.role.split(" ").slice(1).join(" ")}</span>
            </h1>

            <p className="mt-6 text-gray-300 text-sm md:text-lg max-w-xl leading-relaxed">{site.intro}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3 md:gap-4">
              <Button href="#projects" className="text-sm px-5 py-2.5">Explore Projects <ArrowDown size={14} /></Button>
              <Button variant="secondary" onClick={() => setLightboxIndex(0)} className="text-sm px-5 py-2.5"><ImageIcon size={14} /> Photos</Button>
              <Button href={site.github} variant="secondary" target="_blank" className="text-sm px-5 py-2.5"><GithubIcon size={14} /> GitHub</Button>
            </div>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" animate="show" className="lg:col-span-5 flex flex-col gap-3 pointer-events-auto">
            <motion.div variants={itemVariants}>
              <WebDevCard />
            </motion.div>

            <motion.div variants={itemVariants}>
              <GameDevCard />
            </motion.div>

            <motion.div variants={itemVariants} className="w-full">
              <DevSoundtrackWidget />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Suspense fallback={null}>
          <Lightbox 
            items={portraits} 
            index={lightboxIndex} 
            onClose={() => setLightboxIndex(null)} 
            onChange={setLightboxIndex} 
          />
        </Suspense>
      )}
    </section>
  );
}