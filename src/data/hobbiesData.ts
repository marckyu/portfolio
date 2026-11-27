export interface Hobby {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  categoryTag: string;
  locationOrTag: string;
  description: string;
  images: string[];
  accentColor: string;
}

export const hobbiesData: Hobby[] = [
  {
    id: "cycling",
    title: "Cycling",
    subtitle: "Pagba-bike",
    badge: "Night Rides",
    categoryTag: "Night Rides",
    locationOrTag: "Quezon City Routes",
    description: "There's nothing like the cool night breeze to clear my head after hours of debugging. I love exploring new routes on two wheels, finding quiet streets, and just letting the pedals turn.",
    images: [
      "/images/portraits/p1.jpg", 
      "/images/portraits/p2.jpg", 
    ],
    accentColor: "text-cyan-400",
  },
  {
    id: "cars",
    title: "Car Accessories & Hardware",
    subtitle: "Automotive Hardware",
    badge: "Custom Installs",
    categoryTag: "Automotive",
    locationOrTag: "Garage Projects",
    description: "I love getting my hands dirty with 12V electronics. From wiring custom ambient lighting to installing new audio components, I enjoy the precise, hands-on work of upgrading vehicles.",
    images: [
      "/images/portraits/p3.jpg", 
      "/images/portraits/p4.webp",
    ],
    accentColor: "text-blue-400",
  },
  {
    id: "photography",
    title: "Photography",
    subtitle: "Visual Storytelling",
    badge: "Street & Mood",
    categoryTag: "Visual Storytelling",
    locationOrTag: "Street & Candid",
    description: "Capturing candid moments, moody lighting, and everyday memories. Whether it's a busy street in Binondo or a quiet corner, I love freezing time through a lens.",
    images: [
      "/images/portraits/p5.webp", 
      "/images/portraits/p6.png",
    ],
    accentColor: "text-amber-400",
  },
  {
    id: "gaming",
    title: "Gaming",
    subtitle: "Virtual Worlds",
    badge: "Mechanics & Play",
    categoryTag: "Virtual Worlds",
    locationOrTag: "Competitive & Casual",
    description: "Exploring immersive worlds and analyzing game mechanics is a huge part of my life. It's my favorite way to unwind with friends after a long week of coding.",
    images: [
      "/images/portraits/p1.jpg", 
      "/images/portraits/p2.jpg",
    ],
    accentColor: "text-purple-400",
  },
];