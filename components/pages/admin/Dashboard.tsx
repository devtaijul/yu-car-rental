import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, CalendarCheck, Users, CreditCard, Star, Tag } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({ cars: 0, bookings: 0, users: 0, payments: 0, reviews: 0, coupons: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [cars, bookings, profiles, payments, reviews, coupons] = await Promise.all([
        supabase.from("cars").select("id", { count: "exact", head: true }),
        supabase.from("bookings").select("id", { count: "exact", head: true }),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("payments").select("id", { count: "exact", head: true }),
        supabase.from("reviews").select("id", { count: "exact", head: true }),
        supabase.from("coupons").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        cars: cars.count || 0,
        bookings: bookings.count || 0,
        users: profiles.count || 0,
        payments: payments.count || 0,
        reviews: reviews.count || 0,
        coupons: coupons.count || 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Total Cars", value: stats.cars, icon: Car, color: "text-blue-500" },
    { label: "Bookings", value: stats.bookings, icon: CalendarCheck, color: "text-green-500" },
    { label: "Users", value: stats.users, icon: Users, color: "text-purple-500" },
    { label: "Payments", value: stats.payments, icon: CreditCard, color: "text-orange-500" },
    { label: "Reviews", value: stats.reviews, icon: Star, color: "text-yellow-500" },
    { label: "Coupons", value: stats.coupons, icon: Tag, color: "text-pink-500" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-bold">Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(c => (
          <Card key={c.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{c.label}</CardTitle>
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
