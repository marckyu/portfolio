export interface CyclingMoment {
  id: string;
  image: string;
  images?: string[];
  title: string;
  locationName: string;
  locationQuery: string;
  rideTimeOrVibe: string;
  taglishPieceType: "Poem" | "Letter" | "Banat";
  taglishText: string;
  dedicatedTo: string;
}

export const cyclingMoments: CyclingMoment[] = [
  {
    id: "ride-1",
    image: "/images/hobbies/pililla-wind-farm-ride.jpg",
    images: [
      "/images/hobbies/pililla-wind-farm-ride.jpg",
      "/images/hobbies/pililla-wind-turbine.jpg",
      "/images/hobbies/pililla-road-ride.jpg",
      "/images/hobbies/pililla-morning-view.jpg",
    ],
    title: "Pililla by Day, Home at Dawn",
    locationName: "Rizal Wind Farm, Pililla",
    locationQuery: "Pililla Wind Farm, Pililla, Rizal, Philippines",
    rideTimeOrVibe: "Rizal Wind Farm, Pililla",
    taglishPieceType: "Banat",
    taglishText: "We reached Pililla Wind Farm in the afternoon, watched the day fade by the turbines, and only made it home at dawn. We came for the ride, but the crew kept the stories spinning long after the windmills stopped being the main attraction. Turns out the longest rides come with the best punchlines.",
    dedicatedTo: "To the crew who is always ready for a ride.",
  },
  {
    id: "ride-2",
    image: "/images/hobbies/dampalit-bike-trail-crew.jpg",
    images: [
      "/images/hobbies/dampalit-bike-trail-crew.jpg",
      "/images/hobbies/dampalit-bike-trail-night-2.jpg",
      "/images/hobbies/dampalit-bike-trail-night-3.jpg",
      "/images/hobbies/dampalit-bike-trail-sunset.jpg",
    ],
    title: "Dampalit, Just Like Old Times",
    locationName: "Dampalit Bike Trail",
    locationQuery: "MWXC+XGV, Malabon, Metro Manila",
    rideTimeOrVibe: "Malabon to Dampalit, Crew Ride",
    taglishPieceType: "Banat",
    taglishText: "We rode from Malabon to Dampalit, and having the whole crew together again felt just like the old days with my best friends. The best part was not the miles we covered, but how easily we picked up where we left off. Some things change, but our crew still knows how to make every ride feel like home.",
    dedicatedTo: "For the friends who still make every ride feel like the old days.",
  },
  {
    id: "ride-3",
    image: "/images/portraits/p3.jpg", // Replace with actual Marilaque photo
    title: "Ahon at Budol",
    locationName: "Antipolo Overlook / Marilaque",
    locationQuery: "Marilaque Highway, Antipolo",
    rideTimeOrVibe: "Morning Climb",
    taglishPieceType: "Banat",
    taglishText: "Sabi nila 'ride safe' daw, pero sa tropa kong laging late sa meetup—mas kailangan niyo ng alarm clock kaysa helmet. Pero kahit laging budol sa ahon, solid pa rin kayong kasama.",
    dedicatedTo: "Sa mga laging late pero laging present.",
  },
];
