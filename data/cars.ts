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
    image: `car-1_mehwhd`,
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
    image: "car-2_wnwqnm",
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
    image: "car-3_fbfmgw",
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
    image: "car-4_qkxw3g",
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
    image: "car-5_hfqpog",
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
    image: "car-6_n43tyc",
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
