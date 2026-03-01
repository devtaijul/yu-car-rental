import { Search, Star, MessageSquare, CheckCircle, Clock, Check, X, EyeOff, Trash2 } from "lucide-react";
import { useState } from "react";

const stats = [
  { label: "TOTAL REVIEWS", value: "3,248", icon: MessageSquare },
  { label: "AVG RATING", value: "4.8", sub: "/ 5", icon: Star },
  { label: "PUBLISHED", value: "3,102", icon: CheckCircle },
  { label: "PENDING REVIEW", value: "24", icon: Clock },
];

const mockReviews = [
  { id: 1, name: "Michael Brown", email: "mich.brown@email.com", date: "OCT 25, 2023", rating: 3, title: "Good car, slightly delayed pickup", body: "The Mercedes was in perfect condition and drove beautifully. However, I had to wait about 15 minutes at t...", car: "Mercedes C-Class", plate: "YU-99281A", trip: "OCT 20 - OCT 22", status: "PENDING", statusClass: "badge-pending" },
  { id: 2, name: "Sarah Williams", email: "sarah.w@email.com", date: "OCT 24, 2023", rating: 5, title: "Absolutely flawless experience!", body: "This was my third time renting with YU Car Rental and they never disappoint. The BMW X5 was immaculately...", car: "BMW X5", plate: "YU-77124X", trip: "OCT 15 - OCT 23", status: "PUBLISHED", statusClass: "badge-published", verified: true },
  { id: 3, name: "David Lee", email: "david.lee99@email.com", date: "OCT 22, 2023", rating: 5, title: "Great value for money", body: "The Tesla Model 3 was fantastic. Charging network was easy to use. The daily rate was very competitive...", car: "Tesla Model 3", plate: "YU-55419T", trip: "OCT 18 - OCT 21", status: "PUBLISHED", statusClass: "badge-published", verified: true },
  { id: 4, name: "Emily Davis", email: "emily.d.88@email.com", date: "OCT 21, 2023", rating: 2, title: "Car wasn't cleaned properly", body: "When I picked up the Audi Q7, there were still crumbs in the back seat and the windshield was smudged on the...", car: "Audi Q7", plate: "YU-21094Q", trip: "OCT 19 - OCT 20", status: "PENDING", statusClass: "badge-pending" },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star key={i} className={`h-3.5 w-3.5 ${i <= rating ? "text-warning fill-warning" : "text-muted-foreground/30"}`} />
    ))}
  </div>
);

const ReviewsPage = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Customer Reviews</h1>
          <p className="text-muted-foreground mt-1">Monitor, approve, and manage customer feedback for trips.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search reviews, users..." className="pl-10 pr-4 py-2.5 text-sm border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-ring/30 w-56" />
          </div>
          <select className="border rounded-lg px-4 py-2.5 text-sm bg-card focus:outline-none">
            <option>All Ratings</option>
            <option>5 Stars</option>
            <option>4 Stars</option>
            <option>3 Stars</option>
          </select>
          <select className="border rounded-lg px-4 py-2.5 text-sm bg-card focus:outline-none">
            <option>All Status</option>
            <option>Published</option>
            <option>Pending</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card rounded-xl border p-5 flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
              <s.icon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{s.label}</p>
              <p className="text-2xl font-bold text-foreground">
                {s.value}
                {s.sub && <span className="text-sm font-normal text-muted-foreground ml-0.5">{s.sub}</span>}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Reviews Table */}
      <div className="bg-card rounded-xl border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Reviewer</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Rating & Review</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Trip Info</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-right py-3 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockReviews.map((r) => (
                <tr key={r.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors align-top">
                  <td className="py-4 px-6">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-xs font-bold shrink-0">
                        {r.name.split(" ").map(w => w[0]).join("")}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground flex items-center gap-1">
                          {r.name}
                          {r.verified && <CheckCircle className="h-3.5 w-3.5 text-primary" />}
                        </p>
                        <p className="text-xs text-muted-foreground">{r.email}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{r.date}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 max-w-xs">
                    <StarRating rating={r.rating} />
                    <p className="font-semibold mt-1.5">{r.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{r.body}</p>
                    <button className="text-xs font-bold text-foreground mt-1 hover:underline">READ MORE</button>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-medium text-foreground">{r.car}</p>
                    <p className="text-xs text-primary font-mono"># {r.plate}</p>
                    <p className="text-xs text-muted-foreground mt-1">{r.trip}</p>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`status-badge-pill ${r.statusClass}`}>
                      {r.status === "PENDING" && <span className="status-dot status-pending" />}
                      {r.status === "PUBLISHED" && <span className="mr-1">✓</span>}
                      {r.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-1">
                      {r.status === "PENDING" ? (
                        <>
                          <button className="p-2 rounded-lg hover:bg-muted transition-colors"><Check className="h-4 w-4 text-muted-foreground" /></button>
                          <button className="p-2 rounded-lg hover:bg-muted transition-colors"><X className="h-4 w-4 text-muted-foreground" /></button>
                        </>
                      ) : (
                        <>
                          <button className="p-2 rounded-lg hover:bg-muted transition-colors"><EyeOff className="h-4 w-4 text-muted-foreground" /></button>
                          <button className="p-2 rounded-lg hover:bg-muted transition-colors"><Trash2 className="h-4 w-4 text-muted-foreground" /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t">
          <p className="text-sm text-muted-foreground">Showing <span className="font-semibold text-foreground">1</span> to <span className="font-semibold text-foreground">4</span> of <span className="font-semibold text-foreground">3,248</span> entries</p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-sm rounded-lg text-muted-foreground hover:bg-muted">←</button>
            <button className="px-3 py-1.5 text-sm rounded-lg bg-primary text-primary-foreground font-semibold">1</button>
            <button className="px-3 py-1.5 text-sm rounded-lg hover:bg-muted">2</button>
            <button className="px-3 py-1.5 text-sm rounded-lg hover:bg-muted">3</button>
            <span className="px-2 text-muted-foreground">...</span>
            <button className="px-3 py-1.5 text-sm rounded-lg hover:bg-muted">812</button>
            <button className="px-3 py-1.5 text-sm rounded-lg text-muted-foreground hover:bg-muted">→</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
