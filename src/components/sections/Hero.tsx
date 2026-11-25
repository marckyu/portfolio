import { useState, lazy, Suspense, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowDown, Globe, Gamepad2, Image as ImageIcon, Settings2 } from "lucide-react";
import { site } from "../../data/site";
import { portraits } from "../../data/portraits";
import { Button } from "../ui/Button";
import GithubIcon from "../ui/GithubIcon";
import InfinitePortraits from "./InfinitePortraits";
import BentoAccordionCard from "../ui/BentoAccordionCard";
import FloatingMusicPill from "../ui/FloatingMusicPill";
import MobileCustomizerSheet from "../ui/MobileCustomizerSheet";
import { usePortfolioTheme } from "../../context/PortfolioThemeContext";

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

export default function Hero() {
  const { density } = usePortfolioTheme();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showPortraits, setShowPortraits] = useState(false);
  const [customizerOpen, setCustomizerOpen] = useState(false);

  const isCompact = density === "compact";

  useEffect(() => {
    const timer = setTimeout(() => setShowPortraits(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-24 overflow-hidden bg-[#050508]">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 opacity-40 md:opacity-60">
        {showPortraits && (
          <InfinitePortraits />
        )}
        <div className="absolute inset-0 bg-[var(--bg-dim)] pointer-events-none transition-colors duration-500" />
      </div>

      {/* CUSTOMIZER BUTTON */}
      <div className="absolute top-6 right-6 z-50">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => setCustomizerOpen(true)}
          className="p-3.5 rounded-full bg-slate-950/65 border border-white/10 text-white backdrop-blur-md shadow-lg pointer-events-auto"
        >
          <Settings2 size={20} />
        </motion.button>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-12 pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* LEFT SIDE: TEXT CONTENT */}
          <motion.div variants={containerVariants} initial="hidden" animate="show" className="lg:col-span-7 flex flex-col items-start pt-10 md:pt-0 pointer-events-auto">
            <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] md:text-xs font-mono text-gray-300 tracking-wider uppercase">Available for work</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold font-[Space_Grotesk] leading-[1.1] tracking-tight">
              <span className="block text-gray-400 text-base md:text-2xl font-mono mb-2 font-normal">{site.name}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 block">{site.role.split(" ")[0]}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] block">
                {site.role.split(" ").slice(1).join(" ")}
              </span>
            </h1>

            <p className="mt-6 text-gray-300 text-sm md:text-lg max-w-xl leading-relaxed">{site.intro}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3 md:gap-4">
              <Button href="#projects" className="text-sm px-5 py-2.5">Explore Projects <ArrowDown size={14} /></Button>
              <Button variant="secondary" onClick={() => setLightboxIndex(0)} className="text-sm px-5 py-2.5"><ImageIcon size={14} /> Photos</Button>
              <Button href={site.github} variant="secondary" target="_blank" className="text-sm px-5 py-2.5"><GithubIcon size={14} /> GitHub</Button>
            </div>
          </motion.div>

          {/* RIGHT SIDE: INTERACTIVE WIDGETS */}
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            animate="show" 
            className="lg:col-span-5 flex flex-col gap-3 pointer-events-auto"
            style={{ touchAction: "pan-y" }}
          >
            <motion.div variants={itemVariants}>
              <BentoAccordionCard 
                isCompact={isCompact}
                icon={<Globe size={18} />} 
                title="Web Development" 
                summary="React & Tailwind"
                details={
                  <div className="flex flex-col gap-4">
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Frontend, backend, and web app architecture with responsive UI.
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      {techStack.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 text-[var(--accent-primary)] text-[10px] font-mono w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse" />
                      Shipped in real projects
                    </div>
                  </div>
                }
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <BentoAccordionCard 
                isCompact={isCompact}
                icon={<Gamepad2 size={18} />} 
                title="Game Development" 
                summary="Unity & C#"
                details={
                  <div className="flex flex-col gap-4">
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Game mechanics, logic, and gameplay systems.
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-secondary)]/10 border border-[var(--accent-secondary)]/20 text-[var(--accent-secondary)] text-[10px] font-mono w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)] animate-pulse" />
                      Currently experimenting
                    </div>
                  </div>
                }
              />
            </motion.div>

            <motion.div variants={itemVariants} className="w-full">
              <FloatingMusicPill isCompact={isCompact} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <MobileCustomizerSheet isOpen={customizerOpen} onClose={() => setCustomizerOpen(false)} />

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