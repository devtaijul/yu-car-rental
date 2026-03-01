import { ArrowLeft, Star, Save } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const mockReview = {
  customerName: "Michael Brown", customerEmail: "mich.brown@email.com",
  carId: "Mercedes C-Class", bookingRef: "YU-99281A",
  rating: 3, title: "Good car, slightly delayed pickup",
  body: "The Mercedes was in perfect condition and drove beautifully. However, I had to wait about 15 minutes at the pickup location.",
  status: "PENDING", date: "OCT 25, 2023",
};

const EditReviewPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState(mockReview);

  const update = (key: string, value: any) => setForm({ ...form, [key]: value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Update review:", id, form);
  };

  return (
    <div className="space-y-6">
      <div>
        <button onClick={() => navigate("/reviews")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2">
          <ArrowLeft className="h-4 w-4" /> BACK TO REVIEWS
        </button>
        <h1 className="text-2xl font-bold text-foreground">EDIT <span className="text-primary">REVIEW</span></h1>
        <p className="text-muted-foreground mt-1">Moderate and update review content.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-bold text-foreground mb-4">RATING</h3>
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <button key={i} type="button" onClick={() => update("rating", i)} className="p-1">
                  <Star className={`h-6 w-6 ${i <= form.rating ? "text-warning fill-warning" : "text-muted-foreground/30"}`} />
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{form.rating} out of 5 stars</p>
          </div>
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-bold text-foreground mb-4">STATUS</h3>
            <select value={form.status} onChange={(e) => update("status", e.target.value)} className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30">
              <option value="PENDING">PENDING</option>
              <option value="PUBLISHED">PUBLISHED</option>
            </select>
            <p className="text-xs text-muted-foreground mt-2">Submitted: {form.date}</p>
          </div>
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-bold text-foreground mb-4">REVIEWER</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="font-semibold">{form.customerName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span className="text-xs">{form.customerEmail}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Car</span><span className="font-semibold">{form.carId}</span></div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-bold text-foreground mb-4">REVIEW CONTENT</h3>
            <div className="space-y-4">
              <div><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Review Title</label><input value={form.title} onChange={(e) => update("title", e.target.value)} className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
              <div><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Review Body</label><textarea value={form.body} onChange={(e) => update("body", e.target.value)} rows={6} className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30 resize-none" /></div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button type="button" onClick={() => navigate("/reviews")} className="px-6 py-2.5 text-sm font-semibold border rounded-lg hover:bg-muted transition-colors">CANCEL</button>
            <button type="submit" className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"><Save className="h-4 w-4" /> UPDATE REVIEW</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditReviewPage;
