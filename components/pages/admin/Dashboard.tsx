import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, Car, CreditCard, Star, Tag, Users } from "lucide-react";

export default function Dashboard({
  counts,
}: {
  counts: {
    totalCars: number;
    totalBookings: number;
    totalUsers: number;
    totalPayments: number;
    totalReviews: number;
    totalCoupons: number;
  };
}) {
  const cards = [
    {
      label: "Total Cars",
      value: counts.totalCars,
      icon: Car,
      color: "text-blue-500",
    },
    {
      label: "Bookings",
      value: counts.totalBookings,
      icon: CalendarCheck,
      color: "text-green-500",
    },
    {
      label: "Users",
      value: counts.totalUsers,
      icon: Users,
      color: "text-purple-500",
    },
    {
      label: "Payments",
      value: counts.totalPayments,
      icon: CreditCard,
      color: "text-orange-500",
    },
    {
      label: "Reviews",
      value: counts.totalReviews,
      icon: Star,
      color: "text-yellow-500",
    },
    {
      label: "Coupons",
      value: counts.totalCoupons,
      icon: Tag,
      color: "text-pink-500",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-bold">Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {c.label}
              </CardTitle>
              <c.icon className={`h-5 w-5 ${c.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{c.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
