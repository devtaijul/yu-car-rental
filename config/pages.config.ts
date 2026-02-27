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
};
