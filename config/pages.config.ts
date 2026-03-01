export const PAGES = {
  HOME: "/",
  BONAIRE: "/bonaire",
  RESERVE_A_CAR: {
    ROOT: "/reserve-a-car",
    LOCATION: "/reserve-a-car/location",
    SELECT_CAR: "/reserve-a-car/select-car",
    CONFIRMATION: (bookingId: string) => `/confirmation?bookingId=${bookingId}`,
    SELECTED_CAR: (carSlug: string) =>
      `/reserve-a-car/${carSlug}/protection-package`,
    SUMMARY_CHECKOUT: (carSlug: string) =>
      `/reserve-a-car/${carSlug}/summary-checkout`,
  },
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
  },

  DASHBOARD: {
    ROOT: "/dashboard",
    BOOKING_DETAILS: (bookingId: string) => `/dashboard/bookings/${bookingId}`,
    BOOKINGS: "/dashboard/bookings",
    PAYMENTS: "/dashboard/payments",
    PROFILE: "/dashboard/profile",
  },
  ADMIN: {
    ROOT: "/admin",
    BOOKINGS: {
      ROOT: "/admin/bookings",
      CREATE: "/admin/bookings/create",
      EDIT: (bookingId: string) => `/admin/bookings/${bookingId}/edit`,
    },
    CARS: {
      ROOT: "/admin/cars",
      CREATE: "/admin/cars/create",
      EDIT: (carId: string) => `/admin/cars/${carId}/edit`,
    },
    USERS: {
      ROOT: "/admin/users",
      CREATE: "/admin/users/create",
      EDIT: (userId: string) => `/admin/users/${userId}/edit`,
    },
    PAYMENTS: {
      ROOT: "/admin/payments",
      CREATE: "/admin/payments/create",
      EDIT: (paymentId: string) => `/admin/payments/${paymentId}/edit`,
    },
    DRIVERS: {
      ROOT: "/admin/drivers",
      CREATE: "/admin/drivers/create",
      EDIT: (driverId: string) => `/admin/drivers/${driverId}/edit`,
    },
  },
};
