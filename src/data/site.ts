import type { SocialLink } from "../types";

export const site = {
  name: "John Marc F. Asuncion",
  shortName: "John Marc",
  role: "AI-Augmented Developer",
  specialties: ["Web Development", "Game Development"],
  intro:
    "IT student building full-stack web apps and learning game development, using AI to move faster while understanding every line I ship.",
  github: "https://github.com/marckyu",
  links: [
    { label: "GitHub", href: "https://github.com/marckyu" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/john-marc-asuncion-704625386/" },
  ] as SocialLink[],
  email: "", // TODO: add your email before publishing
  nav: [
    { id: "about", label: "About" },
    { id: "expertise", label: "Expertise" },
    { id: "stack", label: "Stack" },
    { id: "projects", label: "Projects" },
    { id: "workflow", label: "Workflow" },
    { id: "learning", label: "Learning" },
    { id: "contact", label: "Contact" },
  ],
};
