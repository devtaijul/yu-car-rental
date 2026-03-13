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
        deletedAt: null,

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

export const getCarBlockedDates = async (slug: string) => {
  try {
    const car = await prisma.car.findUnique({
      where: { slug },
      select: {
        id: true,
        bookings: {
          where: {
            status: { not: BookingStatus.CANCELLED },
            endDate: { gte: new Date() },
          },
          select: { startDate: true, endDate: true },
        },
        availability: {
          where: { endDate: { gte: new Date() } },
          select: { startDate: true, endDate: true },
        },
      },
    });

    if (!car) return { success: false, blockedRanges: [] };

    const blockedRanges = [
      ...car.bookings.map((b) => ({
        start: b.startDate.toISOString(),
        end: b.endDate.toISOString(),
      })),
      ...car.availability.map((a) => ({
        start: a.startDate.toISOString(),
        end: a.endDate.toISOString(),
      })),
    ];

    return { success: true, blockedRanges };
  } catch (error) {
    console.error("Get car blocked dates error:", error);
    return { success: false, blockedRanges: [] };
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

export const getCarsForAdmin = async ({
  limit = "10",
  page = "1",
  search = "",
}: {
  limit?: string;
  page?: string;
  search?: string;
}) => {
  try {
    const skip = (Number(page) - 1) * Number(limit);
    const now = new Date();

    const cars = await prisma.car.findMany({
      where: {
        OR: [
          {
            id: {
              contains: search,
            },
          },
          {
            name: {
              contains: search,
            },
          },
        ],
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: Number(limit),
      skip,
      include: {
        availability: {
          where: {
            endDate: {
              gte: now,
            },
          },
          orderBy: {
            startDate: "asc",
          },
        },
      },
    });
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
        payment: true,
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
    console.log("users", users);

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
    const settings = await prisma.platformSettings.findFirst();
    return actionResponse(settings);
  } catch (error) {
    return actionError("Failed to fetch settings", error);
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
        payment: true,
      },
    });
    return actionResponse(booking);
  } catch (error) {
    console.error("Get booking error:", error);
    throw actionError("Failed to fetch booking");
  }
};
export const getBookingByBookingAsAdmin = async (bookingId: string) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: {
        id: bookingId,
      },
      include: {
        user: true,
        car: true,
        driver: true,
        payment: true,
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
        status: status === "ACTIVE" ? "ACTIVE" : undefined,
        startDate: status === "UPCOMING" ? { gt: new Date() } : undefined,
        endDate: status === "PAST" ? { lt: new Date() } : undefined,
      },
      include: {
        user: true,
        car: true,
        driver: true,
        payment: true,
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

export const getMyPayments = async (
  page: string = "1",
  limit: string = "10",
  search: string = "",
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

    const payments = await prisma.payment.findMany({
      where: {
        userId: user.id,
        OR: [
          {
            id: {
              contains: search,
            },
          },
          {
            stripeChargeId: {
              contains: search,
            },
          },
        ],
      },
      include: {
        user: true,
        booking: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit),
    });

    return actionResponse(payments);
  } catch (error) {
    console.error("Get my payments error:", error);
    throw actionError("Failed to fetch my payments");
  }
};

export const getMyProfile = async () => {
  try {
    const session = await auth();
    if (!session?.user?.email) return actionError("Not logged in");

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneCode: true,
        phone: true,
        dateOfBirth: true,
        licenseNumber: true,
        company: true,
        street: true,
        houseNo: true,
        postCode: true,
        city: true,
        country: true,
        stateRegion: true,
        avatarUrl: true,
        createdAt: true,
      },
    });

    if (!user) return actionError("User not found");
    return actionResponse(user);
  } catch (error) {
    console.error("Get profile error:", error);
    throw actionError("Failed to fetch profile");
  }
};

export const getDashboardOverview = async () => {
  try {
    const session = await auth();
    if (!session?.user?.email) return actionError("Not logged in");

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, firstName: true, lastName: true },
    });
    if (!user) return actionError("User not found");

    const [activeBooking, upcomingBookings, pastBookings, payments] =
      await Promise.all([
        prisma.booking.findFirst({
          where: {
            userId: user.id,
            status: { notIn: ["CANCELLED", "COMPLETED"] },
            startDate: { lte: new Date() },
            endDate: { gte: new Date() },
            deletedAt: null,
          },
          include: { car: true },
          orderBy: { createdAt: "desc" },
        }),
        prisma.booking.findMany({
          where: {
            userId: user.id,
            status: { notIn: ["CANCELLED", "COMPLETED"] },
            startDate: { gt: new Date() },
            deletedAt: null,
          },
          include: { car: true },
          orderBy: { startDate: "asc" },
          take: 3,
        }),
        prisma.booking.findMany({
          where: {
            userId: user.id,
            status: "COMPLETED",
            deletedAt: null,
          },
          include: { car: true },
          orderBy: { endDate: "desc" },
          take: 3,
        }),
        prisma.payment.findMany({
          where: { userId: user.id, status: "SUCCESS" },
          select: { amount: true },
        }),
      ]);

    const totalTrips = await prisma.booking.count({
      where: { userId: user.id, status: { not: "CANCELLED" }, deletedAt: null },
    });

    const totalSpent = payments.reduce((sum, p) => sum + p.amount, 0);

    return actionResponse({
      user: { firstName: user.firstName, lastName: user.lastName },
      activeBooking,
      upcomingBookings,
      pastBookings,
      totalTrips,
      totalSpent,
    });
  } catch (error) {
    console.error("Get dashboard overview error:", error);
    throw actionError("Failed to fetch dashboard overview");
  }
};

export const getCarByIdAdmin = async (carId: string) => {
  try {
    const car = await prisma.car.findUnique({
      where: {
        id: carId,
      },
    });
    return actionResponse(car);
  } catch (error) {
    console.error("Get car error:", error);
    throw actionError("Failed to fetch car", error);
  }
};

export const getUsersByAdmin = async (page: string, limit: string) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit),
    });
    return actionResponse(users);
  } catch (error) {
    console.error("Get users error:", error);
    throw actionError("Failed to fetch users");
  }
};
