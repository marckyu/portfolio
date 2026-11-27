import { useContext } from "react";
import { ThemeContext } from "./PortfolioThemeStore";

export function usePortfolioTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "usePortfolioTheme must be used within PortfolioThemeProvider",
    );
  }

  return context;
}
