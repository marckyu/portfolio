import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Palette, Layout, SunDim } from "lucide-react";
import { usePortfolioTheme } from "../../context/usePortfolioTheme";
import { THEMES, type ThemeId, type DensityMode, type DimmingMode } from "../../config/portfolioWidgets";

export default function MobileCustomizerSheet({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { theme, setThemeId, density, setDensity, dimming, setDimming } = usePortfolioTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000]"
          />
          <motion.div
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 inset-x-0 z-[2001] bg-[#0a0a10] border-t border-[var(--glass-border)] rounded-t-3xl p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[var(--text-main)] font-[Space_Grotesk]">Customize Experience</h2>
              <button onClick={onClose} className="p-2 bg-white/5 rounded-full text-[var(--text-muted)] hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3 text-sm font-mono text-[var(--text-muted)] uppercase tracking-wider">
                <Palette size={16} /> Accent Theme
              </div>
              <div className="flex gap-3">
                {(Object.keys(THEMES) as ThemeId[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setThemeId(t)}
                    className={`relative flex-1 p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                      theme.id === t ? "border-[var(--accent-primary)] bg-[var(--accent-primary)]/10" : "border-white/10 bg-white/5"
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full" style={{ background: THEMES[t].colors.primary }} />
                    <span className="text-xs text-[var(--text-main)]">{THEMES[t].name}</span>
                    {theme.id === t && <Check size={14} className="text-[var(--accent-primary)] absolute top-2 right-2" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3 text-sm font-mono text-[var(--text-muted)] uppercase tracking-wider">
                <Layout size={16} /> Card Density
              </div>
              <div className="grid grid-cols-2 gap-3">
                {(["compact", "detailed"] as DensityMode[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDensity(d)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      density === d ? "border-[var(--accent-primary)] bg-[var(--accent-primary)]/10" : "border-white/10 bg-white/5"
                    }`}
                  >
                    <span className="text-sm font-medium text-[var(--text-main)] capitalize">{d}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3 text-sm font-mono text-[var(--text-muted)] uppercase tracking-wider">
                <SunDim size={16} /> Background Dimming
              </div>
              <div className="flex bg-white/5 p-1 rounded-xl">
                {(["clear", "balanced", "contrast"] as DimmingMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setDimming(mode)}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium capitalize transition-all ${
                      dimming === mode ? "bg-[var(--accent-primary)] text-black" : "text-[var(--text-muted)]"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
