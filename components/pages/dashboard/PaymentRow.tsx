import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/formatDate";
import { formatCurrency } from "@/lib/utils";
import { PaymentWithAll } from "@/types/system";
import { CreditCard, Download } from "lucide-react";

export function PaymentRow({ payment }: { payment: PaymentWithAll }) {
  return (
    <TableRow className="border-b border-border">
      <TableCell className="font-mono text-sm font-medium">
        {payment.stripePaymentIntentId}
      </TableCell>

      <TableCell className="text-sm text-muted-foreground">
        {formatDate(payment.createdAt)}
      </TableCell>

      <TableCell className="text-sm">
        Booking ID: {payment.bookingId.slice(0, 8)}...
      </TableCell>

      <TableCell className="text-sm flex items-center gap-1">
        <CreditCard className="h-3 w-3" />
        Stripe
      </TableCell>

      <TableCell className="text-sm font-semibold">
        {formatCurrency(payment.amount, payment.currency)}
      </TableCell>

      <TableCell>
        <Badge
          className={
            payment.status === "SUCCESS"
              ? "bg-primary text-primary-foreground text-[10px]"
              : "bg-destructive/10 text-destructive border-destructive/20 text-[10px]"
          }
        >
          {payment.status}
        </Badge>
      </TableCell>

      <TableCell>
        <button className="text-muted-foreground hover:text-primary">
          <Download className="h-4 w-4" />
        </button>
      </TableCell>
    </TableRow>
  );
}
