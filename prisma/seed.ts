import {
  BookingStatus,
  CarType,
  PaymentMethod,
  PaymentStatus,
  PrismaClient,
  UserRole,
} from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
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

  // Hash passwords
  const adminPassword = await bcrypt.hash("admin123", 10);
  const customerPassword = await bcrypt.hash("customer123", 10);

  //////////////////////////////////////////////////////
  // USERS
  //////////////////////////////////////////////////////

  const admin = await prisma.user.create({
    data: {
      firstName: "Admin",
      lastName: "User",
      email: "admin@carrental.com",
      phoneCode: "+880",
      phone: "1700000000",
      password: adminPassword,
      role: UserRole.ADMIN,
      isVerified: true,
    },
  });

  const customer = await prisma.user.create({
    data: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phoneCode: "+880",
      phone: "1800000000",
      password: customerPassword,
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
      slug: "toyota-raize",
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
      imageUrl: "car-1_mehwhd",
    },
    {
      name: "Toyota Hilux",
      slug: "toyota-hilux",
      brand: "Toyota",
      model: "Hilux",
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
      imageUrl: "car-2_wnwqnm",
    },

    // Hyundai Venue
    {
      name: "Hyundai Venue",
      slug: "hyundai-venue",
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
      imageUrl: "car-3_fbfmgw",
    },

    // Hyundai Staria
    {
      name: "Hyundai Staria",
      slug: "hyundai-staria",
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
      imageUrl: "car-4_qkxw3g",
    },

    // Kia Sonet
    {
      name: "Kia Sonet",
      slug: "kia-sonet",
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
      imageUrl: "car-5_hfqpog",
    },
    {
      name: "Kia Sonet",
      slug: "kia-sonet-1",
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
      imageUrl: "car-6_n43tyc",
    },

    // Generate more variants (20 more mixed realistic entries)
  ];

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
