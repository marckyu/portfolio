import {
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  DIMMING_PRESETS,
  THEMES,
  type DensityMode,
  type DimmingMode,
  type ThemeId,
} from "../config/portfolioWidgets";
import { ThemeContext } from "./PortfolioThemeStore";

const isThemeId = (value: unknown): value is ThemeId =>
  typeof value === "string" && value in THEMES;

const isDensityMode = (value: unknown): value is DensityMode =>
  value === "compact" || value === "detailed";

const isDimmingMode = (value: unknown): value is DimmingMode =>
  value === "clear" || value === "balanced" || value === "contrast";

interface ThemeSettings {
  themeId: ThemeId;
  density: DensityMode;
  dimming: DimmingMode;
}

function readThemeSettings(): ThemeSettings {
  const defaults: ThemeSettings = {
    themeId: "cyan-violet",
    density: "compact",
    dimming: "balanced",
  };

  try {
    const saved = localStorage.getItem("m3-customizer");
    if (!saved) return defaults;

    const parsed: unknown = JSON.parse(saved);
    if (typeof parsed !== "object" || parsed === null) return defaults;

    const settings = parsed as Record<string, unknown>;
    return {
      themeId: isThemeId(settings.themeId) ? settings.themeId : defaults.themeId,
      density: isDensityMode(settings.density) ? settings.density : defaults.density,
      dimming: isDimmingMode(settings.dimming) ? settings.dimming : defaults.dimming,
    };
  } catch {
    return defaults;
  }
}

export function PortfolioThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [settings, setSettings] = useState<ThemeSettings>(readThemeSettings);
  const { themeId, density, dimming } = settings;
  const setThemeId = (value: ThemeId) =>
    setSettings((current) => ({ ...current, themeId: value }));
  const setDensity = (value: DensityMode) =>
    setSettings((current) => ({ ...current, density: value }));
  const setDimming = (value: DimmingMode) =>
    setSettings((current) => ({ ...current, dimming: value }));

  useEffect(() => {
    try {
      localStorage.setItem(
        "m3-customizer",
        JSON.stringify(settings),
      );
    } catch {
      // Ignore unavailable local storage.
    }
  }, [settings]);

  const theme = THEMES[themeId];

  const applyPreset = (preset: "cyber" | "gallery" | "studio") => {
    if (preset === "cyber") {
      setThemeId("cyan-violet");
      setDensity("compact");
      setDimming("balanced");
    } else if (preset === "gallery") {
      setThemeId("neon-emerald");
      setDensity("compact");
      setDimming("clear");
    } else {
      setThemeId("sunset-rose");
      setDensity("detailed");
      setDimming("contrast");
    }
  };

  const reset = () => {
    setThemeId("cyan-violet");
    setDensity("compact");
    setDimming("balanced");
  };

  const style = {
    "--accent-primary": theme.colors.primary,
    "--accent-secondary": theme.colors.secondary,
    "--bg-main": theme.colors.bg,
    "--glass-bg": theme.colors.glassBg,
    "--glass-border": theme.colors.glassBorder,
    "--text-main": theme.colors.text,
    "--text-muted": theme.colors.textMuted,
    "--bg-dim": DIMMING_PRESETS[dimming],

    "--md-primary": theme.colors.primary,
    "--md-primary-container": theme.colors.glassBg,
    "--md-on-primary-container": theme.colors.text,
    "--md-tertiary": theme.colors.secondary,
    "--md-surface": theme.colors.bg,
    "--md-surface-container": theme.colors.glassBg,
    "--md-surface-container-high": theme.colors.glassBg,
    "--md-outline": theme.colors.glassBorder,
  } as CSSProperties;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeId,
        setThemeId,
        density,
        setDensity,
        dimming,
        setDimming,
        applyPreset,
        reset,
      }}
    >
      <div
        style={style}
        className="min-h-screen bg-[var(--md-surface)] transition-colors duration-300"
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
