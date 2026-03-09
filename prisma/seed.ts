import {
  BookingStatus,
  CarType,
  Currency,
  PaymentMethod,
  PaymentStatus,
  PrismaClient,
  UserRole,
} from "@/generated/prisma/client";
import { CarCreateInput } from "@/generated/prisma/models";
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
  // CAR AVAILABILITY BLOCK (Maintenance)
  //////////////////////////////////////////////////////

  const carsData: CarCreateInput[] = [
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

  //////////////////////////////////////////////////////
  // BOOKING
  //////////////////////////////////////////////////////

  //////////////////////////////////////////////////////
  // PAYMENT
  //////////////////////////////////////////////////////

  //////////////////////////////////////////////////////
  // REVIEW
  //////////////////////////////////////////////////////

  //////////////////////////////////////////////////////
  // COUPON
  //////////////////////////////////////////////////////

  const settings = await prisma.platformSettings.create({
    data: {
      // General Settings
      platformName: "YuCar Rental",
      supportEmail: "support@yucarrental.com",
      supportPhone: "+8801700000000",
      baseCurrency: Currency.USD,
      brandLogoUrl: null,

      // Payment Gateway
      stripePublishableKey: null,
      stripeSecretKey: null,
      stripeEnabled: false,
      paypalEnabled: false,

      // Notification Preferences
      notifyNewBooking: true,
      notifyCancellation: true,
      notifyDailyRevenue: false,
      notifySystemErrors: true,

      // Security Settings
      twoFactorAuthRequired: false,
      adminSessionTimeout: "30 Minutes",
      passwordExpiry: "90 Days",

      // User Roles (JSON)
      roles: [
        {
          name: "Super Admin",
          description: "Full system access",
          users: 1,
        },
        {
          name: "Admin",
          description: "Manage bookings, cars and users",
          users: 0,
        },
        {
          name: "Manager",
          description: "Manage bookings and revenue",
          users: 0,
        },
      ],

      // System Preferences
      debugLoggingEnabled: false,
      maintenanceMode: false,
      clearCacheRequested: false,
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
