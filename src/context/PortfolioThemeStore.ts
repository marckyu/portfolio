import { createContext } from "react";
import type {
  DensityMode,
  DimmingMode,
  ThemeConfig,
  ThemeId,
} from "../config/portfolioWidgets";

export interface ThemeContextType {
  theme: ThemeConfig;
  themeId: ThemeId;
  setThemeId: (id: ThemeId) => void;
  density: DensityMode;
  setDensity: (mode: DensityMode) => void;
  dimming: DimmingMode;
  setDimming: (mode: DimmingMode) => void;
  applyPreset: (preset: "cyber" | "gallery" | "studio") => void;
  reset: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
