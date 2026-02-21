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
