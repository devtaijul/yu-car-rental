"use server";

import { auth } from "@/auth";
import { TabValue } from "@/data/utils";
import { BookingStatus } from "@/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { actionError, actionResponse } from "@/types/server";
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

export const getBookingsForAdmin = async () => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: true,
        car: true,
        driver: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return {
      success: true,
      bookings,
    };
  } catch (error) {
    console.error("Get bookings error:", error);
    throw {
      success: false,
      message: "Failed to fetch bookings",
    };
  }
};

export const getUsersForAdmin = async () => {
  try {
    const users = await prisma.user.findMany();
    return {
      success: true,
      users,
    };
  } catch (error) {
    console.error("Get users error:", error);
    throw {
      success: false,
      message: "Failed to fetch users",
    };
  }
};

export const getPaymentsForAdmin = async () => {
  try {
    const payments = await prisma.payment.findMany();
    return {
      success: true,
      payments,
    };
  } catch (error) {
    console.error("Get payments error:", error);
    throw {
      success: false,
      message: "Failed to fetch payments",
    };
  }
};

export const getReviewsForAdmin = async () => {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        car: true,
      },
    });
    return {
      success: true,
      reviews,
    };
  } catch (error) {
    console.error("Get reviews error:", error);
    throw {
      success: false,
      message: "Failed to fetch reviews",
    };
  }
};

export const getCouponsForAdmin = async () => {
  try {
    const coupons = await prisma.coupon.findMany();
    return {
      success: true,
      coupons,
    };
  } catch (error) {
    console.error("Get coupons error:", error);
    throw {
      success: false,
      message: "Failed to fetch coupons",
    };
  }
};

export const getDriversForAdmin = async () => {
  try {
    const drivers = await prisma.driver.findMany();
    return {
      success: true,
      drivers,
    };
  } catch (error) {
    console.error("Get drivers error:", error);
    throw {
      success: false,
      message: "Failed to fetch drivers",
    };
  }
};

export const getSettingsForAdmin = async () => {
  try {
    const settings = await prisma.setting.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        stripeAccount: true,
      },
    });
    return {
      success: true,
      settings,
    };
  } catch (error) {
    console.error("Get settings error:", error);
    throw {
      success: false,
      message: "Failed to fetch settings",
    };
  }
};

// Booking
export const getBookingByBookingId = async (bookingId: string) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: {
        id: bookingId,
      },
      include: {
        user: true,
        car: true,
        driver: true,
      },
    });
    return actionResponse(booking);
  } catch (error) {
    console.error("Get booking error:", error);
    throw actionError("Failed to fetch booking");
  }
};

export const getMyBookings = async (
  limit: string,
  status: TabValue | undefined,
) => {
  try {
    const session = await auth();
    console.log(session);
    if (!session || !session.user.email) {
      return actionError("User not logged in");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user.email,
      },
    });

    if (!user) {
      return actionError("User not found");
    }

    const bookings = await prisma.booking.findMany({
      where: {
        userId: user.id,
      },
      include: {
        user: true,
        car: true,
        driver: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: parseInt(limit),
    });

    return actionResponse(bookings);
  } catch (error) {
    console.error("Get my bookings error:", error);
    throw actionError("Failed to fetch my bookings");
  }
};
