import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ThemeId = "cyan" | "emerald" | "rose";
export type DensityMode = "compact" | "detailed";
export type DimmingMode = "clear" | "balanced" | "contrast";

export interface M3Theme {
  id: ThemeId;
  name: string;
  primary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  tertiary: string;
}

export const M3_THEMES: Record<ThemeId, M3Theme> = {
  cyan: {
    id: "cyan",
    name: "Cyan Violet",
    primary: "#4f8cff",
    primaryContainer: "rgba(79, 140, 255, 0.15)",
    onPrimaryContainer: "#b9d4ff",
    tertiary: "#8b5cf6",
  },
  emerald: {
    id: "emerald",
    name: "Neon Emerald",
    primary: "#10b981",
    primaryContainer: "rgba(16, 185, 129, 0.15)",
    onPrimaryContainer: "#a7f3d0",
    tertiary: "#34d399",
  },
  rose: {
    id: "rose",
    name: "Sunset Rose",
    primary: "#f43f5e",
    primaryContainer: "rgba(244, 63, 94, 0.15)",
    onPrimaryContainer: "#fecdd3",
    tertiary: "#fb923c",
  },
};

export const M3_DIMMING: Record<DimmingMode, string> = {
  clear: "rgba(13, 15, 20, 0.2)",
  balanced: "rgba(13, 15, 20, 0.6)",
  contrast: "rgba(13, 15, 20, 0.9)",
};

interface ThemeContextType {
  theme: M3Theme;
  themeId: ThemeId;
  setThemeId: (id: ThemeId) => void;
  density: DensityMode;
  setDensity: (mode: DensityMode) => void;
  dimming: DimmingMode;
  setDimming: (mode: DimmingMode) => void;
  applyPreset: (preset: "cyber" | "gallery" | "studio") => void;
  reset: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function PortfolioThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeIdState] = useState<ThemeId>("cyan");
  const [density, setDensityState] = useState<DensityMode>("compact");
  const [dimming, setDimmingState] = useState<DimmingMode>("balanced");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("m3-customizer");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.themeId && M3_THEMES[parsed.themeId as ThemeId]) setThemeIdState(parsed.themeId);
        if (parsed.density) setDensityState(parsed.density);
        if (parsed.dimming) setDimmingState(parsed.dimming);
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("m3-customizer", JSON.stringify({ themeId, density, dimming }));
    } catch (e) {}
  }, [themeId, density, dimming]);

  const theme = M3_THEMES[themeId];

  const applyPreset = (preset: "cyber" | "gallery" | "studio") => {
    if (preset === "cyber") {
      setThemeIdState("cyan");
      setDensityState("compact");
      setDimmingState("balanced");
    } else if (preset === "gallery") {
      setThemeIdState("emerald");
      setDensityState("compact");
      setDimmingState("clear");
    } else if (preset === "studio") {
      setThemeIdState("rose");
      setDensityState("detailed");
      setDimmingState("contrast");
    }
  };

  const reset = () => {
    setThemeIdState("cyan");
    setDensityState("compact");
    setDimmingState("balanced");
  };

  return (
    <ThemeContext.Provider value={{ theme, themeId, setThemeId: setThemeIdState, density, setDensity: setDensityState, dimming, setDimming: setDimmingState, applyPreset, reset }}>
      <div 
        style={{
          "--md-primary": theme.primary,
          "--md-primary-container": theme.primaryContainer,
          "--md-on-primary-container": theme.onPrimaryContainer,
          "--md-tertiary": theme.tertiary,
          "--md-surface": "#0D0F14",
          "--md-surface-container": "#161920",
          "--md-surface-container-high": "#1F242E",
          "--md-outline": "rgba(255, 255, 255, 0.1)",
          "--bg-dim": M3_DIMMING[dimming],
        } as React.CSSProperties}
        className="min-h-screen bg-[var(--md-surface)] transition-colors duration-300"
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