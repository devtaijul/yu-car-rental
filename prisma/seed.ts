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
  // CAR AVAILABILITY BLOCK (Maintenance)
  //////////////////////////////////////////////////////

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
      baseCurrency: "BDT",
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
