"use client";

import { generateInvoicePDF } from "@/actions/mutation";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/formatDate";
import { formatCurrency } from "@/lib/utils";
import { PaymentWithAll } from "@/types/system";
import { CreditCard, Download } from "lucide-react";

export function PaymentRow({ payment }: { payment: PaymentWithAll }) {
  const handleDownload = async () => {
    const buffer = await generateInvoicePDF(payment);

    let blob: Blob;

    if (Buffer.isBuffer(buffer)) {
      // Node.js Buffer → convert to Uint8Array
      blob = new Blob([new Uint8Array(buffer)], { type: "application/pdf" });
    } else if (typeof buffer === "object") {
      // JSON-like object { "0": 37, "1": 80, ... }
      const uint8Array = new Uint8Array(
        Object.keys(buffer).map(
          (key) => (buffer as Record<string, number>)[key],
        ),
      );
      blob = new Blob([uint8Array], { type: "application/pdf" });
    } else {
      throw new Error("Unsupported PDF format returned");
    }

    // Trigger download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contract-${payment.id}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };
  return (
    <TableRow className="border-b border-border">
      <TableCell className="font-mono text-xs font-medium whitespace-nowrap sm:text-sm">
        <span className="block max-w-[120px] truncate sm:max-w-[190px] lg:max-w-none">
          {payment.stripePaymentIntentId}
        </span>
      </TableCell>

      <TableCell className="hidden whitespace-nowrap text-xs text-muted-foreground sm:table-cell sm:text-sm">
        {formatDate(payment.createdAt)}
      </TableCell>

      <TableCell className="hidden text-sm md:table-cell">
        Booking ID: {payment.bookingId.slice(0, 8)}...
      </TableCell>

      <TableCell className="hidden text-sm lg:table-cell">
        <div className="flex items-center gap-1">
          <CreditCard className="h-3 w-3" />
          Stripe
        </div>
      </TableCell>

      <TableCell className="whitespace-nowrap text-right text-xs font-semibold sm:text-left sm:text-sm">
        {formatCurrency(payment.amount, payment.currency ?? "USD")}
      </TableCell>

      <TableCell className="text-right sm:text-left">
        <Badge
          className={
            payment.status === "SUCCESS"
              ? "whitespace-nowrap bg-primary text-primary-foreground text-[10px] sm:text-xs"
              : "whitespace-nowrap bg-destructive/10 text-destructive border-destructive/20 text-[10px] sm:text-xs"
          }
        >
          {payment.status}
        </Badge>
      </TableCell>

      <TableCell className="text-right sm:text-left">
        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
          onClick={handleDownload}
          aria-label={`Download invoice ${payment.id}`}
        >
          <Download className="h-4 w-4" />
        </button>
      </TableCell>
    </TableRow>
  );
}
