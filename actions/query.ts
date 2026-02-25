"use server";

import { BookingStatus } from "@/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { LocationData } from "@/types/utils";

export async function getFeaturedCar() {
  try {
    const cars = await prisma.car.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
    });

    return {
      success: true,
      cars,
    };
  } catch (error) {
    console.error("Get Featured Car Error:", error);

    return {
      success: false,
      message: "Failed to fetch cars",
    };
  }
}

export const getAvailableCars = async ({
  locationData,
}: {
  locationData: LocationData;
}) => {
  try {
    const { pickupDate, dropoffDate } = locationData;

    if (!pickupDate || !dropoffDate) {
      throw new Error("Pickup and Dropoff date required");
    }

    const start = new Date(pickupDate);
    const end = new Date(dropoffDate);

    const cars = await prisma.car.findMany({
      where: {
        isAvailable: true,

        // ❌ No overlapping bookings
        bookings: {
          none: {
            AND: [
              {
                status: {
                  not: BookingStatus.CANCELLED,
                },
              },
              {
                startDate: {
                  lte: end,
                },
              },
              {
                endDate: {
                  gte: start,
                },
              },
            ],
          },
        },

        // ❌ No availability blocks
        availability: {
          none: {
            startDate: {
              lte: end,
            },
            endDate: {
              gte: start,
            },
          },
        },
      },
      orderBy: {
        pricePerDay: "asc",
      },
    });

    return {
      success: true,
      cars,
    };
  } catch (error) {
    console.error("Available car fetch error:", error);
    throw {
      success: false,
      message: "Failed to fetch available cars",
    };
  }
};

export const getCarBySlug = async (slug: string) => {
  try {
    const car = await prisma.car.findUnique({
      where: {
        slug,
      },
    });

    return {
      success: true,
      car,
    };
  } catch (error) {
    console.error("Get car by slug error:", error);
    throw {
      success: false,
      message: "Failed to fetch car",
    };
  }
};

export const adminDashbaordCount = async () => {
  try {
    const totalCars = await prisma.car.count();
    const totalBookings = await prisma.booking.count();
    const totalUsers = await prisma.user.count();
    const totalPayments = await prisma.payment.count();
    const totalReviews = await prisma.review.count();
    const totalCoupons = await prisma.coupon.count();

    return {
      success: true,
      counts: {
        totalCars,
        totalBookings,
        totalUsers,
        totalPayments,
        totalReviews,
        totalCoupons,
      },
    };
  } catch (error) {
    console.error("Admin dashboard count error:", error);
    throw {
      success: false,
      message: "Failed to fetch dashboard count",
    };
  }
};

export const getCarsForAdmin = async () => {
  try {
    const cars = await prisma.car.findMany();
    return {
      success: true,
      cars,
    };
  } catch (error) {
    console.error("Get cars error:", error);
    throw {
      success: false,
      message: "Failed to fetch cars",
    };
  }
};
