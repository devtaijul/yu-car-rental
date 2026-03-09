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
  payments: PaymentWithAll[];
}) {
  const [search, setSearch] = useState("");

  const filteredPayments = payments.filter((payment) =>
    payment.bookingId.toLowerCase().includes(search.toLowerCase()),
  );

  return (
      <div className="w-full min-w-0 max-w-full space-y-5 overflow-x-hidden sm:space-y-6">
          <div className="flex w-full min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                  <h1 className="text-2xl font-display font-bold sm:text-3xl">
                      Payments & Invoices
                  </h1>
                  <p className="mt-1 text-sm text-[#598999]">
                      Manage your billing history and download invoices.
                  </p>
              </div>
              <Button className="gradient-teal w-full gap-2 text-primary-foreground sm:w-auto sm:shrink-0">
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
          <div className="relative w-full max-w-full sm:max-w-sm md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                  placeholder="Search transactions..."
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
              />
          </div>

          {/* Invoices Table */}
          <Card className="w-full max-w-full border border-border">
              <div className="w-full max-w-full overflow-x-auto rounded-lg">
                  <Table className="w-full min-w-[500px] sm:min-w-[620px] lg:min-w-full [&_td]:px-2.5 [&_th]:px-2.5 sm:[&_td]:px-4 sm:[&_th]:px-4">
                      <TableHeader>
                          <TableRow className="border-b border-border">
                              <TableHead className="whitespace-nowrap text-xs font-semibold uppercase tracking-wider">
                                  Invoice ID
                              </TableHead>
                              <TableHead className="hidden whitespace-nowrap text-xs font-semibold uppercase tracking-wider sm:table-cell">
                                  Date
                              </TableHead>
                              <TableHead className="hidden text-xs font-semibold uppercase tracking-wider md:table-cell">
                                  Description
                              </TableHead>
                              <TableHead className="hidden text-xs font-semibold uppercase tracking-wider lg:table-cell">
                                  Payment Method
                              </TableHead>
                              <TableHead className="text-right text-xs font-semibold uppercase tracking-wider sm:text-left">
                                  Amount
                              </TableHead>
                              <TableHead className="text-right text-xs font-semibold uppercase tracking-wider sm:text-left">
                                  Status
                              </TableHead>
                              <TableHead className="text-right text-xs font-semibold uppercase tracking-wider sm:text-left">
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
                              filteredPayments.map(
                                  (payment: PaymentWithAll) => (
                                      <PaymentRow
                                          key={payment.id}
                                          payment={payment}
                                      />
                                  ),
                              )
                          )}
                      </TableBody>
                  </Table>
              </div>
          </Card>
      </div>
  );
}
