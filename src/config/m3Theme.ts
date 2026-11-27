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