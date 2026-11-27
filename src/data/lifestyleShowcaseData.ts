export interface ShowcaseItem {
  id: string;
  category: 'hobbies' | 'company';
  title: string;
  subtitle: string;
  dateOrTag: string;
  description: string;
  images: string[];
  accentColor: string;
}

export const lifestyleShowcaseData: ShowcaseItem[] = [
  {
    id: "cycling",
    category: "hobbies",
    title: "Cycling",
    subtitle: "Pagba-bike",
    dateOrTag: "Night Rides",
    description: "There's nothing like the cool night breeze to clear my head after hours of debugging. I love exploring new routes on two wheels, finding quiet streets, and just letting the pedals turn.",
    images: [
      "/images/portraits/p1.jpg", 
      "/images/portraits/p2.jpg",
    ],
    accentColor: "text-cyan-400",
  },
  {
    id: "cars",
    category: "hobbies",
    title: "Car Accessories & Hardware",
    subtitle: "Hands-on Automotive",
    dateOrTag: "Custom Installs",
    description: "I love getting my hands dirty with 12V electronics. From wiring custom ambient lighting to installing new audio components, I enjoy the precise, hands-on work of upgrading vehicles.",
    images: [
      "/images/portraits/p3.jpg",
      "/images/portraits/p4.webp",
    ],
    accentColor: "text-blue-400",
  },
  {
    id: "photography",
    category: "hobbies",
    title: "Photography",
    subtitle: "Visual Storytelling",
    dateOrTag: "Street & Mood",
    description: "Capturing candid moments, moody lighting, and everyday memories. Whether it's a busy street in Binondo or a quiet corner, I love freezing time through a lens.",
    images: [
      "/images/portraits/p5.webp",
      "/images/portraits/p6.png",
    ],
    accentColor: "text-amber-400",
  },
];