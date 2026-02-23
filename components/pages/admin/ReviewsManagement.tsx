import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Review } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Eye, Trash2, Star } from "lucide-react";
import { format } from "date-fns";

export default function ReviewsManagement() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [viewReview, setViewReview] = useState<Review | null>(null);
  const { toast } = useToast();

  const fetchData = async () => {
    const { data } = await supabase.from("reviews").select("*, cars(name), profiles!reviews_user_id_fkey(name)").order("created_at", { ascending: false });
    setReviews((data as any[])?.map(r => ({ ...r, car: r.cars, profile: r.profiles })) || []);
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Deleted" }); fetchData(); }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-display font-bold">Reviews ({reviews.length})</h2>
      <div className="rounded-lg border border-border overflow-x-auto bg-card">
        <Table>
          <TableHeader><TableRow className="border-b border-border">
            <TableHead className="text-xs uppercase tracking-wider font-semibold">Car</TableHead>
            <TableHead className="text-xs uppercase tracking-wider font-semibold">User</TableHead>
            <TableHead className="text-xs uppercase tracking-wider font-semibold">Rating</TableHead>
            <TableHead className="text-xs uppercase tracking-wider font-semibold">Comment</TableHead>
            <TableHead className="text-xs uppercase tracking-wider font-semibold">Date</TableHead>
            <TableHead className="text-xs uppercase tracking-wider font-semibold text-right">Actions</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {reviews.map(r => (
              <TableRow key={r.id} className="border-b border-border">
                <TableCell className="font-medium">{r.car?.name || r.car_id.slice(0, 8)}</TableCell>
                <TableCell className="text-muted-foreground">{r.profile?.name || r.user_id.slice(0, 8)}</TableCell>
                <TableCell><div className="flex">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-3 w-3 fill-warning text-warning" />)}</div></TableCell>
                <TableCell className="max-w-[200px] truncate text-muted-foreground">{r.comment || "—"}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{format(new Date(r.created_at), 'MMM dd, yyyy')}</TableCell>
                <TableCell className="text-right space-x-1">
                  <Button size="icon" variant="ghost" onClick={() => setViewReview(r)}><Eye className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(r.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
            {reviews.length === 0 && <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No reviews</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!viewReview} onOpenChange={() => setViewReview(null)}>
        <DialogContent><DialogHeader><DialogTitle className="font-display">Review Details</DialogTitle></DialogHeader>
          {viewReview && (
            <div className="space-y-3 text-sm">
              {[["Car", viewReview.car?.name], ["User", viewReview.profile?.name], ["Comment", viewReview.comment || "No comment"], ["Date", format(new Date(viewReview.created_at), 'PPP')]].map(([l, v]) => (
                <div key={String(l)}><span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{l}</span><p className="font-medium">{String(v)}</p></div>
              ))}
              <div><span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Rating</span>
                <div className="flex items-center gap-1 mt-1">{Array.from({ length: viewReview.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-warning text-warning" />)}</div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
