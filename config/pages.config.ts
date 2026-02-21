export const PAGES = {
  HOME: "/",
  BONAIRE: "/bonaire",
  RESERVE_A_CAR: {
    ROOT: "/reserve-a-car",
    LOCATION: "/reserve-a-car/location",
    SELECT_CAR: "/reserve-a-car/select-car",
    CONFIRMATION: "/reserve-a-car/confirmation",
    SELECTED_CAR: (carSlug: string) =>
      `/reserve-a-car/${carSlug}/protection-package`,
  },
};
