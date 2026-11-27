import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, X, Sparkles, SlidersHorizontal, RotateCcw, Check } from "lucide-react";
import { usePortfolioTheme } from "../../context/usePortfolioTheme";
import { THEMES } from "../../config/portfolioWidgets";
import type { ThemeId, DensityMode, DimmingMode } from "../../config/portfolioWidgets";

const SPRING = { type: "spring", stiffness: 420, damping: 26, mass: 0.8 } as const;

export default function ThemeDock() {
  const { themeId, setThemeId, density, setDensity, dimming, setDimming, applyPreset, reset } = usePortfolioTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-[9999] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={SPRING}
            className="mb-4 w-[340px] max-w-[calc(100vw-3rem)] bg-[var(--md-surface-container)] border border-[var(--md-outline)] rounded-[28px] shadow-2xl overflow-hidden"
            style={{ transform: "translate3d(0,0,0)", willChange: "transform" }}
          >
            <div className="flex items-center justify-between p-4 border-b border-[var(--md-outline)] bg-[var(--md-surface-container-high)]">
              <div className="flex items-center gap-2">
                <Palette size={18} className="text-[var(--md-primary)]" />
                <h3 className="text-sm font-bold text-white">Quick Settings</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-white/10 text-gray-400 transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="p-4 flex flex-col gap-5 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-1 flex items-center gap-1">
                  <Sparkles size={14} className="text-[var(--md-tertiary)]" /> Smart Vibes
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "cyber", label: "Cyber" },
                    { id: "gallery", label: "Gallery" },
                    { id: "studio", label: "Studio" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => applyPreset(p.id as any)}
                      className="relative flex flex-col items-center justify-center py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-[var(--md-outline)] transition-colors group"
                    >
                      <span className="text-xs font-semibold text-white relative z-10">{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">Wallpaper Theme</p>
                <div className="flex gap-3 px-1">
                  {(Object.keys(THEMES) as ThemeId[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setThemeId(t)}
                      className={`relative flex-1 aspect-square max-h-[50px] rounded-full border-2 transition-all flex items-center justify-center ${
                        themeId === t ? "border-white" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <div className="w-full h-full rounded-full" style={{ background: THEMES[t].colors.primary }} />
                      {themeId === t && <Check size={20} className="absolute text-white drop-shadow-md" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">Widget Density</p>
                <div className="flex bg-[var(--md-surface)] rounded-full p-1 border border-[var(--md-outline)]">
                  {(["compact", "detailed"] as DensityMode[]).map((d) => (
                    <button
                      key={d}
                      onClick={() => setDensity(d)}
                      className={`flex-1 py-2.5 rounded-full text-xs font-semibold capitalize transition-all ${
                        density === d ? "bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)]" : "text-gray-400"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">Wallpaper Dimming</p>
                <div className="flex bg-[var(--md-surface)] rounded-full p-1 border border-[var(--md-outline)]">
                  {(["clear", "balanced", "contrast"] as DimmingMode[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setDimming(mode)}
                      className={`flex-1 py-2.5 rounded-full text-[11px] font-semibold capitalize transition-all ${
                        dimming === mode ? "bg-white text-black" : "text-gray-400"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={reset}
                className="flex items-center justify-center gap-2 w-full py-2.5 mt-2 text-xs font-medium text-gray-400 hover:text-white transition-colors"
              >
                <RotateCcw size={14} /> Reset
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        layoutId="m3-settings-pill"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.92 }}
        className="relative group flex items-center justify-center w-14 h-14 rounded-[20px] bg-[var(--md-surface-container-high)] border border-[var(--md-outline)] shadow-2xl text-white outline-none"
      >
        <span className="absolute top-1 right-1 w-3 h-3 bg-[var(--md-primary)] rounded-full animate-ping opacity-75" />
        <span className="absolute top-1 right-1 w-3 h-3 bg-[var(--md-primary)] rounded-full" />
        
        <SlidersHorizontal size={22} className={`transition-transform duration-300 ${isOpen ? "rotate-90 text-[var(--md-primary)]" : "text-gray-300 group-hover:text-white"}`} />
        
        <span className="absolute right-full mr-3 px-2.5 py-1.5 rounded-lg bg-[var(--md-surface-container)] border border-[var(--md-outline)] text-xs font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Quick Settings
        </span>
      </motion.button>
    </div>
  );
}
