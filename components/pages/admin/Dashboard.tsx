import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
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
    { label: "Total Cars", value: stats.cars, icon: Car, accent: "text-primary" },
    { label: "Bookings", value: stats.bookings, icon: CalendarCheck, accent: "text-success" },
    { label: "Users", value: stats.users, icon: Users, accent: "text-primary" },
    { label: "Payments", value: stats.payments, icon: CreditCard, accent: "text-warning" },
    { label: "Reviews", value: stats.reviews, icon: Star, accent: "text-warning" },
    { label: "Coupons", value: stats.coupons, icon: Tag, accent: "text-primary" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-bold">Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(c => (
          <Card key={c.label} className="border border-border hover:shadow-card transition-shadow">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{c.label}</p>
                <p className="text-3xl font-bold mt-1">{c.value}</p>
              </div>
              <div className={`${c.accent} opacity-30`}>
                <c.icon className="h-10 w-10" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
