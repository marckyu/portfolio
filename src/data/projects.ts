import type { Project } from "../types";

export const projects: Project[] = [
  {
    slug: "interactive-resume",
    name: "Interactive Web Resume",
    description:
      "A custom-built, responsive web resume highlighting my dual background in IT and automotive electronics. Built from scratch with modern CSS animations and a premium dark-mode aesthetic.",
    image: "/images/projects/resume-preview.webp",
    tech: ["HTML5", "CSS3", "Vanilla JS", "Lucide Icons", "Vercel"],
    features: [
      "Fully responsive layout with custom CSS keyframe animations",
      "Dark mode aesthetic with glassmorphism UI",
      "Optimized for performance and print-ready formatting",
    ],
    demo: "https://projectresume-me.vercel.app/",
    repo: "https://github.com/marckyu/project_resume",
  },
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