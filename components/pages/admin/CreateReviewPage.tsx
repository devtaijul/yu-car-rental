import { ArrowLeft, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateReviewPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    carId: "",
    bookingRef: "",
    rating: 5,
    title: "",
    body: "",
    status: "PENDING",
  });

  const update = (key: string, value: any) =>
    setForm({ ...form, [key]: value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Create review:", form);
  };

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={() => router.push("/reviews")}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
        >
          <ArrowLeft className="h-4 w-4" /> BACK TO REVIEWS
        </button>
        <h1 className="text-2xl font-bold text-foreground">
          ADD <span className="text-primary">REVIEW</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Manually add a customer review.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div className="space-y-4">
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-bold text-foreground mb-4">RATING</h3>
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => update("rating", i)}
                  className="p-1"
                >
                  <Star
                    className={`h-6 w-6 ${i <= form.rating ? "text-warning fill-warning" : "text-muted-foreground/30"}`}
                  />
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              {form.rating} out of 5 stars
            </p>
          </div>
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-bold text-foreground mb-4">STATUS</h3>
            <select
              value={form.status}
              onChange={(e) => update("status", e.target.value)}
              className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
            >
              <option value="PENDING">PENDING</option>
              <option value="PUBLISHED">PUBLISHED</option>
            </select>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-bold text-foreground mb-4">
              REVIEWER & TRIP
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Customer Name *
                </label>
                <input
                  value={form.customerName}
                  onChange={(e) => update("customerName", e.target.value)}
                  required
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Customer Email *
                </label>
                <input
                  type="email"
                  value={form.customerEmail}
                  onChange={(e) => update("customerEmail", e.target.value)}
                  required
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Car / Vehicle *
                </label>
                <input
                  value={form.carId}
                  onChange={(e) => update("carId", e.target.value)}
                  required
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                  placeholder="Mercedes C-Class"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Booking Reference
                </label>
                <input
                  value={form.bookingRef}
                  onChange={(e) => update("bookingRef", e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                  placeholder="YU-99281A"
                />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-bold text-foreground mb-4">
              REVIEW CONTENT
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Review Title *
                </label>
                <input
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  required
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                  placeholder="Great experience!"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Review Body *
                </label>
                <textarea
                  value={form.body}
                  onChange={(e) => update("body", e.target.value)}
                  required
                  rows={5}
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30 resize-none"
                  placeholder="Write the review content..."
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push("/reviews")}
              className="px-6 py-2.5 text-sm font-semibold border rounded-lg hover:bg-muted transition-colors"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              ADD REVIEW
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateReviewPage;
