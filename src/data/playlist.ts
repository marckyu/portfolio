export interface Track {
  id: string;
  title: string;
  artist: string;
  cover: string;
  src: string;
  duration?: number;
  tags?: string[];
  note?: string;
}

export interface Library {
  title: string;
  subtitle: string;
  cover: string;
  codingPrefix?: string;
  mood?: string;
  shuffleLabel?: string;
}

export const playlistData: { library: Library; tracks: Track[] } = {
  library: {
    title: "kyut talaga ni dol",
    subtitle: "Songs I code to",
    cover: "/images/library-cover.jpg",
    codingPrefix: "> now coding to:",
    mood: "opm / chill / synthwave",
    shuffleLabel: "Shuffle Play",
  },
  tracks: [
    {
      id: "ngalan-mo",
      title: "Ngalan Mo",
      artist: "Yden",
      cover: "/videos/video1.mp4",
      src: "/videos/video1.mp4",
      duration: 209,
      tags: ["opm", "late-night"],
      note: "Perfect for late night debugging sessions.",
    },
    {
      id: "mas-gusto-kita",
      title: "Mas Gusto Kita",
      artist: "Yden",
      cover: "/videos/video2.mp4",
      src: "/videos/video2.mp4",
      duration: 180,
      tags: ["opm", "chill"],
      note: "Keeps me focused during heavy refactoring.",
    },
    {
      id: "naiilang",
      title: "Naiilang",
      artist: "Le John",
      cover: "/videos/video3.mp4",
      src: "/videos/video3.mp4",
      duration: 195,
      tags: ["opm", "vibes"],
      note: "Great background noise for writing docs.",
    },
    {
      id: "pag-ibig",
      title: "Pag-Ibig (Meron ba?)",
      artist: "Ace Banzuelo",
      cover: "/videos/video4.mp4",
      src: "/videos/video4.mp4",
      duration: 210,
      tags: ["opm", "hustle"],
      note: "My go-to track when tackling new frameworks.",
    },
  ],
};