import type { SocialLink } from "../types";

export const site = {
  name: "John Marc F. Asuncion",
  shortName: "John Marc",
  role: "Learning AI-Augmented Developer",
  specialties: ["Web Development", "Game Development"],
  intro:
    "An IT student currently learning the full development flow—from planning and system architecture to implementation and AI-assisted debugging. I'm building projects to master how everything connects.",
  github: "https://github.com/marckyu",
  links: [
    { label: "GitHub", href: "https://github.com/marckyu" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/john-marc-asuncion-704625386/" },
  ] as SocialLink[],
  email: "johnmarc.asuncion@gmail.com",
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