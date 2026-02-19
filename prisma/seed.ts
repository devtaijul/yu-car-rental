import {
  BookingStatus,
  CarType,
  PaymentMethod,
  PaymentStatus,
  PrismaClient,
  UserRole,
} from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Clearing database ...");

  await prisma.coupon.deleteMany();
  await prisma.review.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.driver.deleteMany();
  await prisma.car.deleteMany();
  await prisma.user.deleteMany();

  console.log("🌱 Database cleared.");

  console.log("🌱 Seeding started...");

  //////////////////////////////////////////////////////
  // USERS
  //////////////////////////////////////////////////////

  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@carrental.com",
      phone: "01700000000",
      password: "hashed_password",
      role: UserRole.ADMIN,
      isVerified: true,
    },
  });

  const customer = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      phone: "01800000000",
      password: "hashed_password",
      role: UserRole.USER,
      isVerified: true,
    },
  });

  //////////////////////////////////////////////////////
  // CAR
  //////////////////////////////////////////////////////

  const carsData = [
    {
      name: "Toyota Raize",
      brand: "Toyota",
      model: "Raize",
      year: 2023,
      speed: 90,
      engineCapacity: "1.0L Turbo",
      fuelType: "PETROL",
      transmission: "MANUAL",
      seats: 5,
      carType: CarType.SUV,
      pricePerDay: 50,
      registrationNo: "DHK-RAIZE-001",
      description: "Compact SUV perfect for city driving.",
      imageUrl: "/cars/raize.png",
    },
    {
      name: "Toyota Raize",
      brand: "Toyota",
      model: "Raize",
      year: 2024,
      speed: 95,
      engineCapacity: "1.0L Turbo",
      fuelType: "PETROL",
      transmission: "AUTOMATIC",
      seats: 5,
      carType: CarType.SUV,
      pricePerDay: 55,
      registrationNo: "DHK-RAIZE-002",
      description: "Automatic version for smoother rides.",
      imageUrl: "/cars/raize.png",
    },

    // Toyota Hilux Variants
    {
      name: "Toyota Hilux",
      brand: "Toyota",
      model: "Hilux",
      year: 2022,
      speed: 110,
      engineCapacity: "2.4L",
      fuelType: "DIESEL",
      transmission: "MANUAL",
      seats: 5,
      carType: CarType.PICKUP,
      pricePerDay: 55,
      registrationNo: "DHK-HILUX-003",
      description: "Strong pickup for heavy duty travel.",
      imageUrl: "/cars/hilux.png",
    },
    {
      name: "Toyota Hilux",
      brand: "Toyota",
      model: "Hilux",
      year: 2023,
      speed: 115,
      engineCapacity: "2.8L",
      fuelType: "DIESEL",
      transmission: "AUTOMATIC",
      seats: 5,
      carType: CarType.PICKUP,
      pricePerDay: 65,
      registrationNo: "DHK-HILUX-004",
      description: "Premium pickup with automatic transmission.",
      imageUrl: "/cars/hilux.png",
    },

    // Hyundai Venue
    {
      name: "Hyundai Venue",
      brand: "Hyundai",
      model: "Venue",
      year: 2023,
      speed: 100,
      engineCapacity: "1.2L",
      fuelType: "PETROL",
      transmission: "MANUAL",
      seats: 5,
      carType: CarType.SUV,
      pricePerDay: 55,
      registrationNo: "DHK-VENUE-005",
      description: "Stylish compact SUV.",
      imageUrl: "/cars/venue.png",
    },
    {
      name: "Hyundai Venue",
      brand: "Hyundai",
      model: "Venue",
      year: 2024,
      speed: 105,
      engineCapacity: "1.2L",
      fuelType: "PETROL",
      transmission: "AUTOMATIC",
      seats: 5,
      carType: CarType.SUV,
      pricePerDay: 60,
      registrationNo: "DHK-VENUE-006",
      description: "Automatic variant for comfortable driving.",
      imageUrl: "/cars/venue.png",
    },

    // Hyundai Staria
    {
      name: "Hyundai Staria",
      brand: "Hyundai",
      model: "Staria",
      year: 2023,
      speed: 95,
      engineCapacity: "2.2L",
      fuelType: "DIESEL",
      transmission: "AUTOMATIC",
      seats: 8,
      carType: CarType.MICROBUS,
      pricePerDay: 75,
      registrationNo: "DHK-STARIA-007",
      description: "Spacious family van.",
      imageUrl: "/cars/staria.png",
    },
    {
      name: "Hyundai Staria",
      brand: "Hyundai",
      model: "Staria",
      year: 2024,
      speed: 100,
      engineCapacity: "2.2L",
      fuelType: "DIESEL",
      transmission: "AUTOMATIC",
      seats: 9,
      carType: CarType.MICROBUS,
      pricePerDay: 80,
      registrationNo: "DHK-STARIA-008",
      description: "Premium 9-seater van.",
      imageUrl: "/cars/staria.png",
    },

    // Kia Sonet
    {
      name: "Kia Sonet",
      brand: "Kia",
      model: "Sonet",
      year: 2023,
      speed: 100,
      engineCapacity: "1.5L",
      fuelType: "PETROL",
      transmission: "MANUAL",
      seats: 5,
      carType: CarType.SUV,
      pricePerDay: 55,
      registrationNo: "DHK-SONET-009",
      description: "Compact stylish SUV.",
      imageUrl: "/cars/sonet.png",
    },
    {
      name: "Kia Sonet",
      brand: "Kia",
      model: "Sonet",
      year: 2024,
      speed: 110,
      engineCapacity: "1.5L",
      fuelType: "PETROL",
      transmission: "AUTOMATIC",
      seats: 5,
      carType: CarType.SUV,
      pricePerDay: 60,
      registrationNo: "DHK-SONET-010",
      description: "Automatic premium edition.",
      imageUrl: "/cars/sonet.png",
    },

    // Generate more variants (20 more mixed realistic entries)
  ];

  for (let i = 11; i <= 30; i++) {
    carsData.push({
      name: "Toyota Raize",
      brand: "Toyota",
      model: "Raize",
      year: 2022 + (i % 3),
      speed: 85 + i,
      engineCapacity: "1.0L Turbo",
      fuelType: i % 2 === 0 ? "PETROL" : "HYBRID",
      transmission: i % 2 === 0 ? "MANUAL" : "AUTOMATIC",
      seats: 5,
      carType: CarType.SUV,
      pricePerDay: 45 + (i % 10),
      registrationNo: `DHK-AUTO-${i}`,
      description: "Generated seed vehicle.",
      imageUrl: "/cars/default.png",
    });
  }

  const cars = await prisma.car.createMany({
    data: [...carsData],
  });

  const car = await prisma.car.findMany();

  console.log("car", car);

  //////////////////////////////////////////////////////
  // DRIVER
  //////////////////////////////////////////////////////

  const driver = await prisma.driver.create({
    data: {
      name: "Karim Driver",
      phone: "01900000000",
      licenseNo: "LIC-12345",
      experience: 5,
    },
  });

  //////////////////////////////////////////////////////
  // CAR AVAILABILITY BLOCK (Maintenance)
  //////////////////////////////////////////////////////

  await prisma.carAvailability.create({
    data: {
      carId: car[0].id,
      startDate: new Date("2026-04-01"),
      endDate: new Date("2026-04-05"),
      reason: "Maintenance",
    },
  });

  //////////////////////////////////////////////////////
  // BOOKING
  //////////////////////////////////////////////////////

  const totalDays = 3;
  const pricePerDay = car[0].pricePerDay;
  const totalAmount = totalDays * pricePerDay;

  const booking = await prisma.booking.create({
    data: {
      userId: customer.id,
      carId: car[0].id,
      driverId: driver.id,
      startDate: new Date("2026-03-01"),
      endDate: new Date("2026-03-04"),
      totalDays,
      pricePerDay,
      totalAmount,
      discount: 0,
      status: BookingStatus.CONFIRMED,
    },
  });

  //////////////////////////////////////////////////////
  // PAYMENT
  //////////////////////////////////////////////////////

  await prisma.payment.create({
    data: {
      bookingId: booking.id,
      userId: customer.id,
      amount: totalAmount,
      paymentMethod: PaymentMethod.STRIPE,
      transactionId: "TXN-123456",
      status: PaymentStatus.SUCCESS,
    },
  });

  //////////////////////////////////////////////////////
  // REVIEW
  //////////////////////////////////////////////////////

  await prisma.review.create({
    data: {
      userId: customer.id,
      carId: car[0].id,
      rating: 5,
      comment: "Very smooth ride and clean car!",
    },
  });

  //////////////////////////////////////////////////////
  // COUPON
  //////////////////////////////////////////////////////

  await prisma.coupon.create({
    data: {
      code: "WELCOME10",
      discountType: "PERCENTAGE",
      discountValue: 10,
      expiresAt: new Date("2026-12-31"),
      usageLimit: 100,
    },
  });

  console.log("✅ Seeding finished successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
