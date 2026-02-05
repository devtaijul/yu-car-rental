export interface Car {
  id: string;
  name: string;
  image: string;
  price: number;
  specs: {
    seats: number;
    engine: string;
    fuel: string;
    transmission: string;
  };
  category: string;
}

export const cars: Car[] = [
  {
    id: "1",
    name: "Lunova Hatch",
    image: `/assets/car-hatchback.png`,
    price: 599,
    specs: {
      seats: 5,
      engine: "2.0L",
      fuel: "Diesel",
      transmission: "Manual",
    },
    category: "Hatchback",
  },
  {
    id: "2",
    name: "Altura X5",
    image: "/assets/car-suv-white.png",
    price: 599,
    specs: {
      seats: 7,
      engine: "3.0L",
      fuel: "Diesel",
      transmission: "Auto",
    },
    category: "SUV",
  },
  {
    id: "3",
    name: "Veyra Trail",
    image: "/assets/car-crossover.png",
    price: 599,
    specs: {
      seats: 5,
      engine: "2.5L",
      fuel: "Petrol",
      transmission: "Auto",
    },
    category: "Crossover",
  },
  {
    id: "4",
    name: "Aventa Solis",
    image: "/assets/car-sedan-blue.png",
    price: 799,
    specs: {
      seats: 4,
      engine: "4.0L",
      fuel: "Petrol",
      transmission: "Auto",
    },
    category: "Luxury",
  },
  {
    id: "5",
    name: "Orion Terra",
    image: "/assets/car-electric.png",
    price: 699,
    specs: {
      seats: 5,
      engine: "Electric",
      fuel: "Electric",
      transmission: "Auto",
    },
    category: "Electric",
  },
  {
    id: "6",
    name: "Nova Compact",
    image: "/assets/car-hatchback.png",
    price: 449,
    specs: {
      seats: 5,
      engine: "1.6L",
      fuel: "Petrol",
      transmission: "Manual",
    },
    category: "Compact",
  },
];
