export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  audioSrc: string;
  coverImage: string;
}

export interface Album {
  id: string;
  name: string;
  artist: string;
  accentColor: string; // Hex color for the ambient glow
  cover: string;
  tracks: Track[];
}

export const musicLibrary: Album[] = [
  {
    id: "album-1",
    name: "Ngalan Mo",
    artist: "Yden",
    accentColor: "#4f8cff",
    cover: "/videos/video1.mp4",
    tracks: [
      {
        id: "t1",
        title: "Ngalan Mo",
        artist: "Yden",
        duration: "3:45",
        audioSrc: "/videos/video1.mp4",
        coverImage: "/videos/video1.mp4",
      },
      {
        id: "t2",
        title: "Mas Gusto Kita",
        artist: "Yden",
        duration: "4:20",
        audioSrc: "/videos/video2.mp4",
        coverImage: "/videos/video2.mp4",
      },
      {
        id: "t3",
        title: "Naiilang",
        artist: "Le John",
        duration: "3:15",
        audioSrc: "/videos/video3.mp4",
        coverImage: "/videos/video3.mp4",
      },
    ],
  },
];