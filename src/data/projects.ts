import type { Project } from "../types";

export const projects: Project[] = [
  {
    slug: "sjc-lost-found",
    name: "SJC Lost & Found",
    description: "A full-stack progressive web app for reporting and recovering lost items at Saint Jude College Manila. Built with Next.js, Node.js, and PocketBase.",
    image: "/images/projects/sjc-lost-found.png", // 👈 png
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
  {
    slug: "biosphere",
    name: "BioSphere",
    description: "An educational website translating research on biodiversity loss into an accessible digital resource. Features interactive case studies, a 20-question quiz, and a dynamic world map.",
    image: "/images/projects/biosphere.png", // 👈 png
    tech: ["HTML5", "CSS3", "Vanilla JS", "Leaflet.js", "Vercel"],
    features: [
      "Interactive map with custom animated markers using Leaflet.js",
      "20-question quiz with dynamic scoring and confetti on perfect score",
      "Dark mode toggle with localStorage persistence",
      "Live search filter and scroll reveal animations",
    ],
    demo: "https://biosphere-navy.vercel.app/",
    repo: "https://github.com/shanetalusan0-web/biosphere",
  },
  {
    slug: "interactive-resume",
    name: "Interactive Web Resume",
    description: "A custom-built, responsive web resume highlighting my dual background in IT and automotive electronics. Built from scratch with modern CSS animations.",
    image: "/images/projects/resume.png", // 👈 png
    tech: ["HTML5", "CSS3", "Vanilla JS", "Lucide Icons", "Vercel"],
    features: [
      "Fully responsive layout with custom CSS keyframe animations",
      "Dark mode aesthetic with glassmorphism UI",
      "Optimized for performance and print-ready formatting",
    ],
    demo: "https://projectresume-me.vercel.app/",
    repo: "https://github.com/marckyu/project_resume",
  },
];