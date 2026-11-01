import type { Project } from "../types";

export const projects: Project[] = [
  {
    slug: "sjc-lost-found",
    name: "SJC Lost & Found",
    description:
      "A full-stack progressive web app for reporting and recovering lost items at Saint Jude College Manila. Built with a team as an academic project; I was the developer.",
    image: "/images/projects/sjc-lost-found.webp",
    tech: ["TypeScript", "Vite", "PocketBase", "SQLite", "Python Flask", "IndexedDB", "PWA"],
    features: [
      "AI-assisted matching with text similarity and perceptual image hashing",
      "Real-time notifications through PocketBase subscriptions",
      "Offline-first reports that sync when the connection returns",
      "In-app messaging and admin review of ownership claims",
      "OTP-based password reset",
    ],
    repo: "https://github.com/marckyu/sjc-lost-found",
    demo: "https://sjc-lost-found.vercel.app",
  },
];
