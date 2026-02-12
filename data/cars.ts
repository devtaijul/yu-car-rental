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
    name: "Toyota Raize",
    image: `/car/car-1.png`,
    price: 50,
    specs: {
      seats: 90,
      engine: "5.2L",
      fuel: "Diesel",
      transmission: "Manual",
    },
    category: "Hatchback",
  },
  {
    id: "2",
    name: "Toyota Hilux",
    image: "/car/car-2.png",
    price: 55,
    specs: {
      seats: 90,
      engine: "5.2L",
      fuel: "Diesel",
      transmission: "Manual ",
    },
    category: "SUV",
  },
  {
    id: "3",
    name: "Hyundai Venue",
    image: "/car/car-3.png",
    price: 55,
    specs: {
      seats: 90,
      engine: "5.2L",
      fuel: "Diesel",
      transmission: "Manual",
    },
    category: "Crossover",
  },
  {
    id: "4",
    name: "Hyundai Staria",
    image: "/car/car-4.png",
    price: 75,
    specs: {
      seats: 90,
      engine: "5.2L",
      fuel: "Diesel",
      transmission: "Manual ",
    },
    category: "Luxury",
  },
  {
    id: "5",
    name: "Kia Sonet SUV",
    image: "/car/car-5.png",
    price: 55,
    specs: {
      seats: 90,
      engine: "5.2L",
      fuel: "Diesel",
      transmission: "Manual",
    },
    category: "Electric",
  },
  {
    id: "6",
    name: "Toyota Hilux",
    image: "/car/car-6.png",
    price: 55,
    specs: {
      seats: 90,
      engine: "5.2L",
      fuel: "Diesel",
      transmission: "Manual",
    },
    category: "Compact",
  },
];
