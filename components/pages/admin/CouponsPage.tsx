import { Search, Plus, Tag, Eye, Pencil, Trash2, RefreshCw } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const statusTabs = ["ALL", "ACTIVE", "EXPIRED"];

const mockCoupons = [
  { id: 1, code: "SUMMER24", discount: "20%", discountType: "OFF", icon: "🎫", startDate: "Jun 01, 2024", endDate: "Aug 31, 2024", used: 145, max: 500, status: "ACTIVE", statusClass: "badge-active" },
  { id: 2, code: "WELCOME10", discount: "$10", discountType: "OFF", icon: "🎫", startDate: "Jan 01, 2024", endDate: "Dec 31, 2024", used: 890, max: Infinity, status: "ACTIVE", statusClass: "badge-active" },
  { id: 3, code: "WEEKEND50", discount: "$50", discountType: "OFF", icon: "🎫", startDate: "May 15, 2024", endDate: "May 17, 2024", used: 50, max: 50, status: "EXPIRED", statusClass: "badge-expired" },
  { id: 4, code: "VIPUPGRADE", discount: "FREE UPGRADE", discountType: "", icon: "⭐", startDate: "Mar 01, 2024", endDate: "Dec 31, 2024", used: 12, max: 100, status: "ACTIVE", statusClass: "badge-active" },
  { id: 5, code: "WINTER15", discount: "15%", discountType: "OFF", icon: "🎫", startDate: "Dec 01, 2023", endDate: "Feb 28, 2024", used: 340, max: 1000, status: "EXPIRED", statusClass: "badge-expired" },
  { id: 6, code: "FLASH24", discount: "25%", discountType: "OFF", icon: "⚡", startDate: "Oct 24, 2024", endDate: "Oct 25, 2024", used: 0, max: 100, status: "ACTIVE", statusClass: "badge-active" },
  { id: 7, code: "BLACKFRIDAY", discount: "30%", discountType: "OFF", icon: "🎫", startDate: "Nov 24, 2023", endDate: "Nov 27, 2023", used: 500, max: 500, status: "EXPIRED", statusClass: "badge-expired" },
  { id: 8, code: "RETURNCUST", discount: "$20", discountType: "OFF", icon: "🎫", startDate: "Jan 01, 2024", endDate: "Dec 31, 2024", used: 45, max: 200, status: "ACTIVE", statusClass: "badge-active" },
];

const CouponsPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredCoupons = mockCoupons.filter((c) => {
    const matchesSearch = c.code.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === 0 || (activeTab === 1 && c.status === "ACTIVE") || (activeTab === 2 && c.status === "EXPIRED");
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Discount Coupons</h1>
          <p className="text-muted-foreground mt-1">Manage promotional codes, discounts, and tracking.</p>
        </div>
        <button onClick={() => navigate("/coupons/create")} className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
          <Plus className="h-4 w-4" /> CREATE NEW COUPON
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search coupon code..." className="pl-10 pr-4 py-2.5 text-sm border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-ring/30 w-full" />
        </div>
        <div className="flex border rounded-lg overflow-hidden">
          {statusTabs.map((tab, i) => (
            <button key={tab} onClick={() => setActiveTab(i)} className={`px-5 py-2 text-xs font-semibold tracking-wider transition-colors ${activeTab === i ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>{tab}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Coupon Code</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Discount</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Validity Dates</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Usage Count</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-right py-3 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoupons.map((c) => {
                const usagePct = c.max === Infinity ? 10 : (c.used / c.max) * 100;
                const isFull = c.used >= c.max && c.max !== Infinity;
                return (
                  <tr key={c.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{c.icon}</span>
                        <span className="font-bold font-mono text-foreground">{c.code}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-bold text-foreground">{c.discount}</span>
                      {c.discountType && <span className="text-xs text-muted-foreground ml-1">{c.discountType}</span>}
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-foreground">{c.startDate}</p>
                      <p className="text-xs text-muted-foreground">→ {c.endDate}</p>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex flex-col items-center gap-1.5">
                        <span>
                          <span className={`font-bold ${isFull ? "text-destructive" : "text-foreground"}`}>{c.used}</span>
                          <span className="text-xs text-muted-foreground ml-1">/ {c.max === Infinity ? "∞" : c.max}</span>
                        </span>
                        <div className="h-1.5 w-20 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${isFull ? "bg-destructive" : "bg-primary/50"}`}
                            style={{ width: `${Math.min(usagePct, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`status-badge-pill ${c.statusClass}`}>
                        <span className={`status-dot ${c.status === "ACTIVE" ? "status-active" : ""}`} style={c.status === "EXPIRED" ? { backgroundColor: "hsl(210, 10%, 55%)" } : {}} />
                        {c.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 rounded-lg hover:bg-muted transition-colors"><Eye className="h-4 w-4 text-muted-foreground" /></button>
                        <button onClick={() => navigate(`/coupons/edit/${c.id}`)} className="p-2 rounded-lg hover:bg-muted transition-colors"><Pencil className="h-4 w-4 text-muted-foreground" /></button>
                        <button className="p-2 rounded-lg hover:bg-muted transition-colors"><Trash2 className="h-4 w-4 text-muted-foreground" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center py-5 border-t">
          <button className="flex items-center gap-2 border rounded-lg px-6 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-muted transition-colors">
            <RefreshCw className="h-4 w-4" /> LOAD MORE COUPONS
          </button>
        </div>
      </div>
    </div>
  );
};

export default CouponsPage;
