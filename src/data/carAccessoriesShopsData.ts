export interface Shop {
  id: string;
  name: string;
  address: string;
  mapQuery: string;
  contacts: string[];
  services: string[];
  image: string;
}

export const carAccessoriesShops: Shop[] = [
  {
    id: "6rf",
    name: "6RF Car Accessories",
    address: "45B Agno St. corner Banawe, Brgy. Doña Josefa, Quezon City",
    mapQuery: "45B Agno St corner Banawe, Brgy. Dona Josefa, Quezon City",
    contacts: [],
    services: ["Electrical", "Car Tint", "Audio Setup", "Alarm", "Accessories"],
    image: "/images/shops/6rf.png", // 👈 Pinalitan para tumugma sa shops folder
  },
  {
    id: "ronze",
    name: "Ronze Car Accessories Shop",
    address: "30J Banawe St., Brgy. Sto. Domingo, Quezon City",
    mapQuery: "30J Banawe St, Brgy. Sto. Domingo, Quezon City",
    contacts: ["09516052513", "09074114700", "85315649"],
    services: [
      "Electrical", "Car Tint", "Car Audio Set-up", "Car Stereo Set-up", 
      "Alarm & Central Lock", "Seat Cover", "Aircon Cleaning", 
      "Ceiling & Headrest Monitor", "Bullbars / Rollbars", "Roofrail & Carrier", 
      "Deepdish & Tray", "Foglamps", "All Kinds of Accessories"
    ],
    image: "/images/shops/ronze.png", // 👈 Pinalitan
  },
  {
    id: "adonai",
    name: "Adonai Car Accessories",
    address: "35 C Kaliraya St., corner Banawe, Quezon City",
    mapQuery: "35 C Kaliraya St corner Banawe, Quezon City",
    contacts: ["09219688619", "09208683678", "8671-27-67"],
    services: [
      "Electrical", "Alarm", "Powerlock", "Car Aircon", "H.I.D", 
      "Monitor", "Audio Set Up", "Stereo", "Speaker", "Amplifier", 
      "Bullbar", "Roll Bar", "Roller Lid", "Tint"
    ],
    image: "/images/shops/adonai.png", // 👈 Pinalitan
  },
];