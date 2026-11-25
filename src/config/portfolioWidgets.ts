export type ThemeId = "cyan-violet" | "neon-emerald" | "sunset-rose";
export type DensityMode = "compact" | "detailed";
export type DimmingMode = "clear" | "balanced" | "contrast";

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    bg: string;
    glassBg: string;
    glassBorder: string;
    text: string;
    textMuted: string;
  };
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  "cyan-violet": {
    id: "cyan-violet",
    name: "Cyan Violet",
    colors: {
      primary: "#38bdf8",
      secondary: "#8b5cf6",
      bg: "#050508",
      glassBg: "rgba(10, 10, 16, 0.7)",
      glassBorder: "rgba(255, 255, 255, 0.1)",
      text: "#ffffff",
      textMuted: "#9ca3af",
    },
  },
  "neon-emerald": {
    id: "neon-emerald",
    name: "Neon Emerald",
    colors: {
      primary: "#10b981",
      secondary: "#34d399",
      bg: "#020806",
      glassBg: "rgba(4, 20, 15, 0.7)",
      glassBorder: "rgba(16, 185, 129, 0.2)",
      text: "#ecfdf5",
      textMuted: "#6ee7b7",
    },
  },
  "sunset-rose": {
    id: "sunset-rose",
    name: "Sunset Rose",
    colors: {
      primary: "#f43f5e",
      secondary: "#fb923c",
      bg: "#0f0507",
      glassBg: "rgba(25, 10, 15, 0.7)",
      glassBorder: "rgba(244, 63, 94, 0.2)",
      text: "#fff1f2",
      textMuted: "#fda4af",
    },
  },
};

export const DIMMING_PRESETS: Record<DimmingMode, string> = {
  clear: "rgba(0,0,0,0.1)",
  balanced: "rgba(0,0,0,0.5)",
  contrast: "rgba(0,0,0,0.85)",
};