import { Car } from "@/generated/prisma/client";
import CarCard from "../CarCard";
import { Button } from "../ui/button";

export const SelectCar = ({ cars }: { cars: Car[] }) => {
  return (
    <div>
      <h1 className="text-2xl font-display font-semibold mb-8">
        Choose Your Best Car
      </h1>

      {/* Filters */}
      {/*  <div className="flex flex-wrap gap-4 mb-8">
        <Select>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Vehicle Type" />
          </SelectTrigger>
          <SelectContent className="bg-card">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="suv">SUV</SelectItem>
            <SelectItem value="sedan">Sedan</SelectItem>
            <SelectItem value="hatchback">Hatchback</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Car Body Type" />
          </SelectTrigger>
          <SelectContent className="bg-card">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="compact">Compact</SelectItem>
            <SelectItem value="full">Full Size</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Car Seats" />
          </SelectTrigger>
          <SelectContent className="bg-card">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="4">4 Seats</SelectItem>
            <SelectItem value="5">5 Seats</SelectItem>
            <SelectItem value="7">7 Seats</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Car Engine (Cc)" />
          </SelectTrigger>
          <SelectContent className="bg-card">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="1.6">1.6L</SelectItem>
            <SelectItem value="2.0">2.0L</SelectItem>
            <SelectItem value="3.0">3.0L+</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-35">
            <SelectValue placeholder="Price ($)" />
          </SelectTrigger>
          <SelectContent className="bg-card">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="low">$0 - $500</SelectItem>
            <SelectItem value="mid">$500 - $700</SelectItem>
            <SelectItem value="high">$700+</SelectItem>
          </SelectContent>
        </Select>
      </div> */}

      {/* Car Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} isBookPage />
        ))}
      </div>

      <div className="flex justify-end gap-4">
        <Button>Go To Step 3</Button>
        <Button className="gradient-teal text-primary-foreground">
          Continue
        </Button>
      </div>
    </div>
  );
};
