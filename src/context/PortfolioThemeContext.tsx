import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { THEMES, DIMMING_PRESETS, type ThemeId, type DensityMode, type DimmingMode, type ThemeConfig } from "../config/portfolioWidgets";

interface ThemeContextType {
  theme: ThemeConfig;
  setThemeId: (id: ThemeId) => void;
  density: DensityMode;
  setDensity: (mode: DensityMode) => void;
  dimming: DimmingMode;
  setDimming: (mode: DimmingMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function PortfolioThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeIdState] = useState<ThemeId>("cyan-violet");
  const [density, setDensityState] = useState<DensityMode>("detailed");
  const [dimming, setDimmingState] = useState<DimmingMode>("balanced");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio-customizer");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.themeId && THEMES[parsed.themeId as ThemeId]) setThemeIdState(parsed.themeId);
        if (parsed.density) setDensityState(parsed.density);
        if (parsed.dimming) setDimmingState(parsed.dimming);
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("portfolio-customizer", JSON.stringify({ themeId, density, dimming }));
    } catch (e) {}
  }, [themeId, density, dimming]);

  const theme = THEMES[themeId];

  return (
    <ThemeContext.Provider value={{ theme, setThemeId: setThemeIdState, density, setDensity: setDensityState, dimming, setDimming: setDimmingState }}>
      <div 
        style={{
          "--accent-primary": theme.colors.primary,
          "--accent-secondary": theme.colors.secondary,
          "--glass-bg": theme.colors.glassBg,
          "--glass-border": theme.colors.glassBorder,
          "--text-main": theme.colors.text,
          "--text-muted": theme.colors.textMuted,
          "--bg-dim": DIMMING_PRESETS[dimming],
        } as React.CSSProperties}
        className="min-h-screen"
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const usePortfolioTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("usePortfolioTheme must be used within PortfolioThemeProvider");
  return context;
};