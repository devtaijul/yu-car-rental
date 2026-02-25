"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { ReviewWithAll } from "@/types/system";
import { format } from "date-fns";
import { Eye, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ReviewsManagement({ reviews }: { reviews: ReviewWithAll[] }) {
  const [viewReview, setViewReview] = useState<ReviewWithAll | null>(null);
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    /* const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error)
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    else {
      toast({ title: "Deleted" });
      fetchData();
    } */
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-display font-bold">
        Reviews ({reviews.length})
      </h2>
      <div className="rounded-lg border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Car</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium">
                  {r.car?.name || r.carId.slice(0, 8)}
                </TableCell>
                <TableCell>{r.user?.name || r.userId.slice(0, 8)}</TableCell>
                <TableCell>
                  <div className="flex">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell className="max-w-50 truncate">
                  {r.comment || "—"}
                </TableCell>
                <TableCell className="text-xs">
                  {format(new Date(r.createdAt), "MMM dd, yyyy")}
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setViewReview(r)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDelete(r.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {reviews.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground py-8"
                >
                  No reviews
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!viewReview} onOpenChange={() => setViewReview(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Details</DialogTitle>
          </DialogHeader>
          {viewReview && (
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-muted-foreground">Car:</span>{" "}
                {viewReview.car?.name}
              </div>
              <div>
                <span className="text-muted-foreground">User:</span>{" "}
                {viewReview.user?.firstname || viewReview.userId.slice(0, 8)}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Rating:</span>{" "}
                {Array.from({ length: viewReview.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <div>
                <span className="text-muted-foreground">Comment:</span>{" "}
                {viewReview.comment || "No comment"}
              </div>
              <div>
                <span className="text-muted-foreground">Date:</span>{" "}
                {format(new Date(viewReview.createdAt), "PPP")}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
