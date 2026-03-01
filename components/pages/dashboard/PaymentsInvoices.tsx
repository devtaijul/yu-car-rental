"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaymentWithAll } from "@/types/system";
import { Download, Search } from "lucide-react";
import { useState } from "react";
import { PaymentRow } from "./PaymentRow";

export default function PaymentsInvoices({
  payments,
}: {
  payments: PaymentWithAll;
}) {
  const [search, setSearch] = useState("");

  const filteredPayments = payments.filter((payment: PaymentWithAll) =>
    payment.bookingId.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6 ">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">
            Payments & Invoices
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your billing history and download invoices.
          </p>
        </div>
        <Button className="gradient-teal text-primary-foreground gap-2">
          <Download className="h-4 w-4" /> Download All
        </Button>
      </div>

      {/* Payment Cards */}
      {/* <div className="flex gap-4">
        <Card className="w-70 gradient-teal text-primary-foreground border-0 overflow-hidden relative">
          <CardContent className="p-5 space-y-6">
            <div className="flex items-center justify-between">
              <CreditCard className="h-6 w-6" />
              <Badge className="bg-primary-foreground/20 text-primary-foreground text-[10px] border-0">
                Primary
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-lg font-mono tracking-widest">
                •••• •••• •••• 4242
              </p>
              <div className="flex justify-between text-xs">
                <span>ALEX MORGAN</span>
                <span>12/28</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="w-50 border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
          <CardContent className="p-5 text-center">
            <Plus className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Add New Payment Method
            </p>
          </CardContent>
        </Card>
      </div> */}

      {/* Search */}
      <div className="relative w-full sm:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search transactions..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Invoices Table */}
      <Card className="border border-border">
        <div className="rounded-lg overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border">
                <TableHead className="text-xs uppercase tracking-wider font-semibold">
                  Invoice ID
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold">
                  Date
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold">
                  Description
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold">
                  Payment Method
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold">
                  Amount
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold">
                  Status
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No payments found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredPayments.map((payment: PaymentWithAll) => (
                  <PaymentRow key={payment.id} payment={payment} />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
