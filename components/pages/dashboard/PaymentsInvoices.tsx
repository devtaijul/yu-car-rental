import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, Plus, CreditCard } from "lucide-react";

const mockInvoices = [
  { id: "INV-2024-001", date: "Feb 21, 2026", desc: "Rental - Mercedes-Benz S-Class", method: "Visa •••• 4242", amount: "$1,250.00", status: "Paid" },
  { id: "INV-2024-002", date: "Feb 10, 2026", desc: "Rental - Tesla Model S", method: "Visa •••• 4242", amount: "$450.00", status: "Paid" },
  { id: "INV-2024-003", date: "Jan 15, 2026", desc: "Refund - Security Deposit", method: "Original Payment Method", amount: "+$500.00", status: "Refunded" },
  { id: "INV-2024-004", date: "Jan 05, 2026", desc: "Rental - Range Rover Sport", method: "Mastercard •••• 8888", amount: "$1,120.00", status: "Paid" },
];

export default function PaymentsInvoices() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Payments & Invoices</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your billing history and download invoices.</p>
        </div>
        <Button className="gradient-teal text-primary-foreground gap-2">
          <Download className="h-4 w-4" /> Download All
        </Button>
      </div>

      {/* Payment Cards */}
      <div className="flex gap-4">
        <Card className="w-[280px] gradient-teal text-primary-foreground border-0 overflow-hidden relative">
          <CardContent className="p-5 space-y-6">
            <div className="flex items-center justify-between">
              <CreditCard className="h-6 w-6" />
              <Badge className="bg-primary-foreground/20 text-primary-foreground text-[10px] border-0">Primary</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-lg font-mono tracking-widest">•••• •••• •••• 4242</p>
              <div className="flex justify-between text-xs">
                <span>ALEX MORGAN</span>
                <span>12/28</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="w-[200px] border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
          <CardContent className="p-5 text-center">
            <Plus className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Add New Payment Method</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative w-full sm:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search transactions..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Invoices Table */}
      <Card className="border border-border">
        <div className="rounded-lg overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border">
                <TableHead className="text-xs uppercase tracking-wider font-semibold">Invoice ID</TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold">Date</TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold">Description</TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold">Payment Method</TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold">Amount</TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold">Status</TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInvoices.map(inv => (
                <TableRow key={inv.id} className="border-b border-border">
                  <TableCell className="font-mono text-sm font-medium">{inv.id}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{inv.date}</TableCell>
                  <TableCell className="text-sm">{inv.desc}</TableCell>
                  <TableCell className="text-sm flex items-center gap-1"><CreditCard className="h-3 w-3" /> {inv.method}</TableCell>
                  <TableCell className={`text-sm font-semibold ${inv.status === "Refunded" ? "text-success" : ""}`}>{inv.amount}</TableCell>
                  <TableCell>
                    <Badge className={inv.status === "Paid" ? "bg-primary text-primary-foreground text-[10px]" : "bg-success/10 text-success border-success/20 text-[10px]"}>
                      {inv.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <button className="text-muted-foreground hover:text-primary"><Download className="h-4 w-4" /></button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
