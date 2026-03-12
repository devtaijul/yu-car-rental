export const times = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "22:30",
];

export const locations = [
  "Kralendijk Downtown",
  "Flamingo International Airport",
  "Te Amo Beach",
  "Bachelor’s Beach",
  "Sorobon Beach",
  "Rincon Village",
];

export const extras = [
  {
    id: "baby-seat-small",
    icon: "face_icon",
    name: "BABY SEAT",
    description: "Baby <18 months",
    price: 5,
  },
  {
    id: "baby-seat-large",
    icon: "face_icon",
    name: "CHILD SEAT",
    description: ">18 months. (9-18 kg)",
    price: 5,
  },
  {
    id: "coolbox",
    icon: "cool_icon",
    name: "COOLBOX",
    description:
      "Ideal for your groceries or a day at the beach. Capacity 24 liters. Space for 6x 1.5 liter bottles.",
    price: 4,
  },
  {
    id: "key-secure-box",
    icon: "lock_icon",
    name: "KEY SECURE BOX",
    description:
      "Perfect for divers or snorkelers to safely store their car key.",
    price: 2.5,
  },
];

export const locationCoords: Record<string, [number, number]> = {
  "Kralendijk-Downtown": [12.1443, -68.2655],
  "Flamingo-International-Airport": [12.131, -68.2685],
  "Te-Amo-Beach": [12.1365, -68.2777],
  "Bachelor's-Beach": [12.0906, -68.2486],
  "Sorobon-Beach": [12.0893, -68.2279],
  "Rincon-Village": [12.1848, -68.2592],
};

export const TABS = [
  {
    name: "All",
    value: "ALL_TRIPS",
  },
  {
    name: "Active",
    value: "ACTIVE",
  },
  {
    name: "Upcoming",
    value: "UPCOMING",
  },
  {
    name: "Past",
    value: "PAST",
  },
];

export const carTypes = [
  "SEDAN",
  "SUV",
  "MICROBUS",
  "HATCHBACK",
  "PICKUP",
  "LUXURY",
] as const;

export const onlyTabsValue = TABS.map((tab) => tab.value);
export type TabValue = (typeof onlyTabsValue)[number];
