import { useState, lazy, Suspense, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowDown, Globe, Gamepad2, Image as ImageIcon, Wifi, Battery, Signal } from "lucide-react";
import { site } from "../../data/site";
import { portraits } from "../../data/portraits";
import { Button } from "../ui/Button";
import GithubIcon from "../ui/GithubIcon";
import InfinitePortraits from "./InfinitePortraits";
import M3BentoCard from "../ui/M3BentoCard";
import FloatingMusicPill from "../ui/FloatingMusicPill";
import { usePortfolioTheme } from "../../context/usePortfolioTheme";

const Lightbox = lazy(() => import("../ui/Lightbox"));

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

const techStack = ["React", "TypeScript", "Tailwind", "PocketBase"];

export default function Hero() {
  const { density } = usePortfolioTheme();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showPortraits, setShowPortraits] = useState(false);
  const [time, setTime] = useState("");

  const isCompact = density === "compact";

  useEffect(() => {
    const timer = setTimeout(() => setShowPortraits(true), 300);
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Manila", hour: "2-digit", minute: "2-digit" }));
    }, 1000);
    return () => { clearTimeout(timer); clearInterval(interval); };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-32 overflow-hidden">
      {/* Android 16 Status Bar */}
      <div className="absolute top-0 inset-x-0 h-10 flex items-center justify-between px-6 text-xs font-medium text-white/80 z-50 pointer-events-none">
        <span>{time} • Manila</span>
        <div className="flex items-center gap-1.5">
          <Signal size={14} />
          <Wifi size={14} />
          <Battery size={16} />
        </div>
      </div>

      <div className="absolute inset-0 z-0 opacity-40 md:opacity-60">
        {showPortraits && <InfinitePortraits />}
        <div className="absolute inset-0 bg-[var(--bg-dim)] pointer-events-none transition-colors duration-500" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-12 pointer-events-none mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }} className="lg:col-span-7 flex flex-col items-start pt-10 md:pt-0 pointer-events-auto">
            
            {/* Android 16 Live Updates Pill */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full bg-[var(--md-primary-container)] border border-[var(--md-primary)]/30 mb-6 shadow-[0_0_20px_var(--md-primary-container)]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--md-primary)] text-black">
                <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
              </span>
              <span className="text-xs font-bold text-[var(--md-on-primary-container)] tracking-wide uppercase">Available for work • Open to roles</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-white">
              <span className="block text-gray-400 text-lg md:text-2xl font-mono mb-2">{site.name}</span>
              <span className="block">{site.role.split(" ")[0]}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--md-primary)] to-[var(--md-tertiary)] block">
                {site.role.split(" ").slice(1).join(" ")}
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="mt-6 text-gray-300 text-sm md:text-lg max-w-xl leading-relaxed">{site.intro}</motion.p>

            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-3 md:gap-4">
              <Button href="#projects" className="text-sm px-6 py-3 rounded-full bg-[var(--md-primary)] text-black font-bold">Explore Projects <ArrowDown size={14} /></Button>
              <Button variant="secondary" onClick={() => setLightboxIndex(0)} className="text-sm px-6 py-3 rounded-full bg-[var(--md-surface-container-high)] border border-[var(--md-outline)] text-white"><ImageIcon size={14} /> Photos</Button>
              <Button href={site.github} variant="secondary" target="_blank" className="text-sm px-6 py-3 rounded-full bg-[var(--md-surface-container-high)] border border-[var(--md-outline)] text-white"><GithubIcon size={14} /> GitHub</Button>
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }} className="lg:col-span-5 flex flex-col gap-4 pointer-events-auto pb-16 lg:pb-0" style={{ touchAction: "pan-y" }}>
            <motion.div variants={itemVariants}>
              <M3BentoCard 
                isCompact={isCompact}
                icon={<Globe size={20} />} 
                title="Web Development" 
                summary="React & Tailwind"
                details={
                  <div className="flex flex-col gap-4">
                    <p className="text-sm text-gray-300 leading-relaxed">Frontend, backend, and web app architecture with responsive UI.</p>
                    <div className="flex flex-wrap items-center gap-2">
                      {techStack.map((tech) => (
                        <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-[var(--md-outline)] text-[11px] font-mono text-gray-300">{tech}</span>
                      ))}
                    </div>
                  </div>
                }
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <M3BentoCard 
                isCompact={isCompact}
                icon={<Gamepad2 size={20} />} 
                title="Game Development" 
                summary="Unity & C#"
                details={
                  <div className="flex flex-col gap-4">
                    <p className="text-sm text-gray-300 leading-relaxed">Game mechanics, logic, and gameplay systems.</p>
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

      {lightboxIndex !== null && (
        <Suspense fallback={null}>
          <Lightbox items={portraits} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onChange={setLightboxIndex} />
        </Suspense>
      )}
    </section>
  );
}
