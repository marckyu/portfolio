import { Gamepad2, Globe, Monitor, Server, Network, Smartphone, Cog, Puzzle, Layers, FlaskConical } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ExpertiseItem { icon: LucideIcon; title: string; text: string; }
export interface ExpertiseArea {
  icon: LucideIcon;
  title: string;
  intro: string;
  status: string;
  items: ExpertiseItem[];
}

export const expertise: ExpertiseArea[] = [
  {
    icon: Globe,
    title: "Web Development",
    intro: "Building complete web apps, from the interface to the data behind it.",
    status: "Used in a real project: SJC Lost & Found",
    items: [
      { icon: Monitor, title: "Frontend development", text: "Interfaces in TypeScript, HTML/CSS and Vite." },
      { icon: Server, title: "Backend development", text: "PocketBase APIs, SQLite data, authentication and realtime updates." },
      { icon: Network, title: "Web application architecture", text: "Separate frontend, backend and a Python image-matching service working together." },
      { icon: Smartphone, title: "Responsive UI/UX", text: "Layouts that work on phones, plus installable, offline-capable PWAs." },
    ],
  },
  {
    icon: Gamepad2,
    title: "Game Development",
    intro: "Learning how games work by studying and experimenting with the fundamentals.",
    status: "Learning stage: experiments, no shipped games yet",
    items: [
      { icon: Cog, title: "Game mechanics", text: "Studying how rules, input and feedback fit together." },
      { icon: Puzzle, title: "Game logic", text: "Practicing loops, state and conditions in C# and other languages." },
      { icon: Layers, title: "Gameplay systems", text: "Learning how scoring, progression and other systems connect." },
      { icon: FlaskConical, title: "Learning and experimenting", text: "Small experiments that turn concepts into playable ideas." },
    ],
  },
];