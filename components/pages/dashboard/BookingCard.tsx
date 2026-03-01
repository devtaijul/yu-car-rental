import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PAGES } from "@/config/pages.config";
import { formatDate } from "@/lib/formatDate";
import { cn, getTimeLeftFromNow } from "@/lib/utils";
import { BookingWithAll } from "@/types/system";
import { Clock, MapPin, Shield } from "lucide-react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

const statusStyles: Record<string, string> = {
  ACTIVE: "bg-primary text-white border-primary -right-3 -top-3",
  CONFIRMED: "bg-[#EAF0F2]/80 text-primary border-[#EAF0F2]/90 left-2",
  PENDING: "bg-[#FFFBEB] text-[#D97706] border-[#FEF3C7] left-2",
};

export const BookingCard = ({ booking }: { booking: BookingWithAll }) => {
  return (
    <Card key={booking.id} className="border border-border overflow-hidden">
      <CardContent className={cn("p-0", booking.status === "ACTIVE" && "")}>
        <div
          className={cn(
            "flex flex-col lg:flex-row gap-4",
            booking.status === "ACTIVE" ? "p-6" : "p-4",
          )}
        >
          {/* Car Image */}
          <div className="p-6 bg-[#F8FAFC]">
            <div
              className={cn(
                "relative   bg-muted flex items-center justify-center shrink-0",
                booking.status === "ACTIVE"
                  ? "w-full lg:w-[320px] h-50"
                  : "w-50 h-20",
              )}
            >
              <div className="gradient-color w-full h-full flex items-center justify-center">
                <div
                  className={cn(
                    "max-w-56",
                    booking.status !== "ACTIVE" && "max-w-24",
                  )}
                >
                  {booking.status === "ACTIVE" ? (
                    <CldImage
                      src={booking.car.imageUrl}
                      width={1000}
                      height={500}
                      alt="Car"
                      className="max-w-52"
                    />
                  ) : (
                    <CldImage
                      src={booking.car.imageUrl}
                      width={1000}
                      height={500}
                      alt="Car"
                      className="max-w-24"
                    />
                  )}
                </div>
              </div>
              <Badge
                className={cn(
                  "absolute top-2  text-[10px] uppercase font-bold",
                  statusStyles[booking.status],
                )}
              >
                {booking.status === "ACTIVE" && "● "}
                {booking.status}
              </Badge>
              {booking.id && (
                <div className="absolute -bottom-3 -left-3 bg-white font-bold text-black text-xs px-5 border py-0.5 rounded font-mono">
                  PLATE: {/* {booking.plate} */}fasdfsadf
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                {booking.status !== "ACTIVE" && (
                  <p className="text-[10px] text-muted-foreground">
                    ID: {booking.id}
                  </p>
                )}
                <h3
                  className={cn(
                    "font-display font-bold",
                    booking.status === "ACTIVE" ? "text-2xl" : "text-lg",
                  )}
                >
                  {booking.car.name}
                </h3>
                {booking.status !== "ACTIVE" && (
                  <p className="text-sm text-muted-foreground">
                    Booking ID: {booking.id}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p
                  className={cn(
                    "font-bold",
                    booking.status === "ACTIVE" ? "text-2xl" : "text-lg",
                  )}
                >
                  ${booking.totalAmount}
                  <span className="text-xs text-muted-foreground">.00</span>
                </p>
                {booking.coverage === "PREMIUM" && (
                  <p className="text-[10px] text-primary flex items-center gap-1 justify-end">
                    <Shield className="h-3 w-3" /> Full Coverage
                  </p>
                )}
              </div>
            </div>

            {booking.status === "ACTIVE" ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-primary font-bold">
                      Pickup
                    </p>
                    <p className="font-semibold">
                      {formatDate(booking.startDate)}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {booking.pickupLocation}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-primary font-bold">
                      Return
                    </p>
                    <p className="font-semibold">
                      {formatDate(booking.endDate)}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {booking.dropoffLocation}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                      Time Remaining
                    </span>
                    <span className="text-xl font-bold text-primary ml-2">
                      {getTimeLeftFromNow(booking.startDate).days}
                    </span>
                    <span className="text-xs text-muted-foreground">Days</span>
                    <span className="text-xl font-bold text-primary">
                      {getTimeLeftFromNow(booking.startDate).hours}
                    </span>
                    <span className="text-xs text-muted-foreground">Hrs</span>
                  </div>
                  <Link
                    href={PAGES.DASHBOARD.BOOKING_DETAILS(booking.id)}
                    className="bg-primary text-primary-foreground uppercase text-xs py-2 px-5 tracking-wider font-bold"
                  >
                    View Details
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-6 text-xs text-muted-foreground">
                <div>
                  <span className="uppercase tracking-wider font-medium text-[10px]">
                    Dates
                  </span>
                  <p className="text-foreground font-medium">
                    {formatDate(booking.startDate)} -{" "}
                    {formatDate(booking.endDate)}
                  </p>
                </div>
                <div>
                  <span className="uppercase tracking-wider font-medium text-[10px]">
                    Location
                  </span>
                  <p className="text-foreground font-medium">
                    {booking.pickupLocation}
                  </p>
                </div>
                <div>
                  <span className="uppercase tracking-wider font-medium text-[10px]">
                    Coverage
                  </span>
                  <p className="text-foreground font-medium flex items-center gap-1">
                    <Shield className="h-3 w-3" /> {booking.coverage}
                  </p>
                </div>
                <div className="ml-auto flex flex-col gap-1">
                  {/* {booking.status === "PENDING PAYMENT" && (
                    <Button
                      size="sm"
                      className="bg-warning text-warning-foreground uppercase text-[10px] tracking-wider font-bold"
                    >
                      Complete Payment
                    </Button>
                  )} */}
                  <Link
                    href={PAGES.DASHBOARD.BOOKING_DETAILS(booking.id)}
                    className="uppercase text-[10px] tracking-wider font-bold"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
