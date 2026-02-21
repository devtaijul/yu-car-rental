import { BookingProvider } from "@/context/BookingContext";

export default function ReserveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BookingProvider>{children}</BookingProvider>;
}
