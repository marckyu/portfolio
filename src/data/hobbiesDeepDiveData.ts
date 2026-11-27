export interface CyclingMoment {
  id: string;
  image: string;
  title: string;
  text: string; 
  type: "poem" | "letter" | "banat";
}

export interface ShopBranch {
  id: string;
  name: string;
  address: string;
  mapLink: string;
  description: string;
  specialties: string[];
  image: string;
}

export interface SceneryPhoto {
  id: string;
  image: string;
  title: string;
}

export const hobbiesDeepDiveData = {
  cycling: {
    title: "Pagba-bike",
    subtitle: "Ride & Letters",
    moments: [
      {
        id: "ride-1",
        image: "/images/portraits/p1.jpg",
        title: "The Night Breeze",
        text: "Sa bawat padyak, gumagaan ang isip. \nSa hangin ng gabi, problema'y nililisan. \nPara sa tropa, salamat sa laging pagsama, \nKahit saan man mapadpad, tayo'y magkasama.",
        type: "poem",
      },
      {
        id: "ride-2",
        image: "/images/portraits/p2.jpg",
        title: "Tagaytay Run",
        text: "Mahirap ang ahon, pero sulit ang tanawin. \nParang buhay lang 'yan, kailangan mong magtiis \nBago mo makita ang magandang hangarin.",
        type: "banat",
      },
    ] as CyclingMoment[],
  },
  automotive: {
    title: "Car Accessories",
    subtitle: "Company Showcase",
    company: {
      name: "12V AutoWorks",
      description: "Specializing in 12V electrical systems, custom audio setups, and ambient lighting installations.",
      services: ["Custom LED Lighting", "Audio System Upgrades", "Dashcam & Telemetry", "Central Locking"],
    },
    branches: [
      {
        id: "branch-1",
        name: "Main Branch - QC",
        address: "123 Main Ave, Quezon City, Metro Manila",
        mapLink: "https://maps.google.com/?q=Quezon+City",
        description: "Our flagship store. Handles the most complex audio builds and full rewiring jobs.",
        specialties: ["Audio Tuning", "Full System Rewire"],
        image: "/images/portraits/p3.jpg",
      },
      {
        id: "branch-2",
        name: "Marikina Branch",
        address: "45 Shoe Ave, Marikina City",
        mapLink: "https://maps.google.com/?q=Marikina+City",
        description: "Focused primarily on aesthetic upgrades and quick-turnaround lighting installs.",
        specialties: ["Ambient Lighting", "HID Projectors"],
        image: "/images/portraits/p4.webp",
      },
      {
        id: "branch-3",
        name: "Pasig Branch",
        address: "88 C5 Road, Pasig City",
        mapLink: "https://maps.google.com/?q=Pasig+City",
        description: "Our newest hub, equipped for larger vehicles like vans and SUVs.",
        specialties: ["SUV Upgrades", "Telemetry HUDs"],
        image: "/images/portraits/p5.webp",
      },
    ] as ShopBranch[],
  },
  photography: {
    title: "Scenery Shots",
    subtitle: "Nature & Clouds",
    photos: [
      {
        id: "photo-1",
        image: "/images/portraits/p1.jpg",
        title: "Sunset by the Bay",
      },
      {
        id: "photo-2",
        image: "/images/portraits/p6.png",
        title: "Moody Clouds",
      },
      {
        id: "photo-3",
        image: "/images/portraits/p2.jpg",
        title: "Night City Lights",
      },
    ] as SceneryPhoto[],
  },
};