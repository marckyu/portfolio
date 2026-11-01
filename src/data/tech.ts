import type { Tech, TechLevel } from "../types";

const make = (level: TechLevel, names: string[]): Tech[] => names.map((name) => ({ name, level }));

export const tech: Tech[] = [
  // Used in projects (evidence: sjc-lost-found)
  ...make("used", ["TypeScript", "Vite", "HTML/CSS", "PocketBase", "SQLite", "Python", "Flask", "IndexedDB", "PWA", "Vercel"]),
  // Familiar (listed on GitHub README, no public repo yet)
  ...make("familiar", ["JavaScript", "Node.js", "Next.js", "Firebase", "MongoDB", "JWT"]),
  // Currently learning (stated on GitHub README)
  ...make("learning", ["Java", "C++", "C#"]),
];

export const techGroups: { level: TechLevel; title: string; blurb: string }[] = [
  { level: "used", title: "Used in projects", blurb: "Shipped in SJC Lost & Found." },
  { level: "familiar", title: "Familiar", blurb: "Worked with, not yet in a public project." },
  { level: "learning", title: "Currently learning", blurb: "Building fundamentals, with game development in mind." },
];
