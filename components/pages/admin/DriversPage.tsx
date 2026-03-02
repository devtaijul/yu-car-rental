"use client";

import { PAGES } from "@/config/pages.config";
import {
  Search,
  Plus,
  Pencil,
  Eye,
  Ban,
  Filter,
  Star,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const tabs = [
  "All Drivers (1,420)",
  "Verified (1,280)",
  "Pending Review (45)",
  "Suspended (95)",
];

const mockDrivers = [
  {
    id: 1,
    name: "Marcus Johnson",
    contact: "+1 (555) 019-2834",
    initials: "",
    hasImage: true,
    status: "VERIFIED",
    statusClass: "badge-verified",
    license: "DL-8472910",
    licenseExp: "Exp: Oct 2026",
    rating: 4.9,
    reviews: 128,
    trips: 342,
    docsStatus: "All Valid",
    docsIcon: "check",
    docsClass: "text-success",
  },
  {
    id: 2,
    name: "Sarah Williams",
    contact: "sarah.w@email.com",
    initials: "SW",
    hasImage: false,
    status: "PENDING",
    statusClass: "badge-pending",
    license: "DL-5521902",
    licenseExp: "Exp: Mar 2025",
    rating: 0,
    reviews: 0,
    trips: 0,
    docsStatus: "Review Needed",
    docsSub: "Background Check",
    docsIcon: "alert",
    docsClass: "text-warning",
  },
  {
    id: 3,
    name: "David Chen",
    contact: "+1 (555) 982-1102",
    initials: "",
    hasImage: true,
    status: "VERIFIED",
    statusClass: "badge-verified",
    license: "DL-1102948",
    licenseExp: "Exp: Jun 2028",
    rating: 3.2,
    reviews: 45,
    trips: 89,
    docsStatus: "All Valid",
    docsIcon: "check",
    docsClass: "text-success",
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    contact: "emma.r@email.com",
    initials: "",
    hasImage: true,
    status: "SUSPENDED",
    statusClass: "badge-suspended",
    license: "DL-9938210",
    licenseExp: "Exp: Jan 2024",
    rating: 4.5,
    reviews: 210,
    trips: 512,
    docsStatus: "Expired",
    docsSub: "License & Insurance",
    docsIcon: "error",
    docsClass: "text-destructive",
  },
  {
    id: 5,
    name: "Michael Chang",
    contact: "+1 (555) 342-9911",
    initials: "",
    hasImage: true,
    status: "VERIFIED",
    statusClass: "badge-verified",
    license: "DL-7721839",
    licenseExp: "Exp: Nov 2027",
    rating: 4.7,
    reviews: 84,
    trips: 156,
    docsStatus: "All Valid",
    docsIcon: "check",
    docsClass: "text-success",
  },
];

const DriversPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Approved Drivers
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage verification, licenses, and driver activity.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search drivers..."
              className="pl-10 pr-4 py-2.5 text-sm border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-ring/30 w-56"
            />
          </div>
          <button className="flex items-center gap-2 border rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors">
            <Filter className="h-4 w-4" /> Filters
          </button>
          <button
            onClick={() => router.push(PAGES.ADMIN.DRIVERS.CREATE)}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4" /> Add Driver
          </button>
        </div>
      </div>

      <div className="bg-card rounded-xl border">
        <div className="flex border-b px-6">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`py-4 px-4 text-sm font-medium transition-colors ${activeTab === i ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Driver Info
                </th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  License
                </th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Rating
                </th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Trips
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Documents
                </th>
                <th className="text-right py-3 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {mockDrivers.map((d) => (
                <tr
                  key={d.id}
                  className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-foreground/10 flex items-center justify-center text-xs font-bold text-foreground">
                        {d.hasImage ? "Image" : d.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {d.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {d.contact}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`status-badge-pill ${d.statusClass}`}>
                      <span
                        className={`status-dot ${d.status === "VERIFIED" ? "status-active" : d.status === "PENDING" ? "status-pending" : "status-cancelled"}`}
                      />
                      {d.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-mono font-medium text-foreground">
                      {d.license}
                    </p>
                    <p
                      className={`text-xs ${d.licenseExp.includes("2024") ? "text-destructive" : "text-muted-foreground"}`}
                    >
                      {d.licenseExp}
                    </p>
                  </td>
                  <td className="py-4 px-4 text-center">
                    {d.rating > 0 ? (
                      <div>
                        <span className="flex items-center justify-center gap-1">
                          <Star className="h-3.5 w-3.5 text-warning fill-warning" />
                          <span
                            className={`font-bold ${d.rating >= 4 ? "text-foreground" : "text-destructive"}`}
                          >
                            {d.rating}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({d.reviews})
                          </span>
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground italic">
                        No ratings yet
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center font-bold">{d.trips}</td>
                  <td className="py-4 px-4">
                    <div className={`flex items-center gap-1.5 ${d.docsClass}`}>
                      {d.docsIcon === "check" && (
                        <CheckCircle className="h-4 w-4" />
                      )}
                      {d.docsIcon === "alert" && (
                        <AlertCircle className="h-4 w-4" />
                      )}
                      {d.docsIcon === "error" && (
                        <XCircle className="h-4 w-4" />
                      )}
                      <div>
                        <span className="text-sm font-medium">
                          {d.docsStatus}
                        </span>
                        {d.docsSub && (
                          <p className="text-xs text-destructive">
                            {d.docsSub}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() =>
                          router.push(PAGES.ADMIN.DRIVERS.EDIT(d.id.toString()))
                        }
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <Pencil className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                        <Ban className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">1</span> to{" "}
            <span className="font-semibold text-foreground">5</span> of{" "}
            <span className="font-semibold text-foreground">1,420</span> drivers
          </p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-sm rounded-lg text-muted-foreground hover:bg-muted">
              ←
            </button>
            <button className="px-3 py-1.5 text-sm rounded-lg bg-primary text-primary-foreground font-semibold">
              1
            </button>
            <button className="px-3 py-1.5 text-sm rounded-lg hover:bg-muted">
              2
            </button>
            <button className="px-3 py-1.5 text-sm rounded-lg hover:bg-muted">
              3
            </button>
            <span className="px-2 text-muted-foreground">...</span>
            <button className="px-3 py-1.5 text-sm rounded-lg hover:bg-muted">
              28
            </button>
            <button className="px-3 py-1.5 text-sm rounded-lg text-muted-foreground hover:bg-muted">
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriversPage;
