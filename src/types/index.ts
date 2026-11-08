import type { LucideIcon } from "lucide-react";

export interface SocialLink { 
  label: string; 
  href: string; 
}

export interface Project {
  slug: string;
  name: string;
  description: string;
  image: string;
  tech: string[];
  features: string[];
  repo?: string;
  demo?: string;
}

export type TechLevel = "used" | "familiar" | "learning";
export interface Tech { 
  name: string; 
  level: TechLevel; 
}

export interface Portrait { 
  src: string; 
  alt: string; 
}

export interface WorkflowStep { 
  title: string; 
  you: string; 
  ai: string; 
}

export interface LearningEntry {
  title: string;
  status: "learning" | "experimenting" | "planned";
  note: string;
  date?: string;
}

// 👇 HETO ANG DINAGDAG NATIN PARA SA HERO
export interface Specialty {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  status: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  intro: string;
  github: string;
  specialties: Specialty[];
}