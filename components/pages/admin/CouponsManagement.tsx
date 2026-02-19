import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Coupon } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { format } from "date-fns";

const emptyCoupon = { code: '', discount_type: 'PERCENTAGE', discount_value: 0, expires_at: '', usage_limit: null as number | null, is_active: true };

export default function CouponsManagement() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewCoupon, setViewCoupon] = useState<Coupon | null>(null);
  const [editing, setEditing] = useState<Coupon | null>(null);
  const [form, setForm] = useState(emptyCoupon);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchData = async () => {
    const { data } = await supabase.from("coupons").select("*").order("created_at", { ascending: false });
    setCoupons((data as Coupon[]) || []);
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyCoupon); setDialogOpen(true); };
  const openEdit = (c: Coupon) => { setEditing(c); setForm({ code: c.code, discount_type: c.discount_type, discount_value: c.discount_value, expires_at: c.expires_at.slice(0, 16), usage_limit: c.usage_limit, is_active: c.is_active }); setDialogOpen(true); };

  const handleSave = async () => {
    setLoading(true);
    const payload = { ...form, expires_at: new Date(form.expires_at).toISOString() };
    if (editing) {
      const { error } = await supabase.from("coupons").update(payload).eq("id", editing.id);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Coupon updated" });
    } else {
      const { error } = await supabase.from("coupons").insert(payload);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Coupon created" });
    }
    setLoading(false); setDialogOpen(false); fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this coupon?")) return;
    const { error } = await supabase.from("coupons").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Deleted" }); fetchData(); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold">Coupons ({coupons.length})</h2>
        <Button onClick={openCreate}><Plus className="h-4 w-4 mr-1" /> Add Coupon</Button>
      </div>
      <div className="rounded-lg border overflow-x-auto">
        <Table>
          <TableHeader><TableRow>
            <TableHead>Code</TableHead><TableHead>Type</TableHead><TableHead>Value</TableHead><TableHead>Expires</TableHead><TableHead>Usage</TableHead><TableHead>Active</TableHead><TableHead className="text-right">Actions</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {coupons.map(c => (
              <TableRow key={c.id}>
                <TableCell className="font-mono font-bold">{c.code}</TableCell>
                <TableCell><Badge variant="outline">{c.discount_type}</Badge></TableCell>
                <TableCell>{c.discount_type === 'PERCENTAGE' ? `${c.discount_value}%` : `$${c.discount_value}`}</TableCell>
                <TableCell className="text-xs">{format(new Date(c.expires_at), 'MMM dd, yyyy')}</TableCell>
                <TableCell>{c.used_count}/{c.usage_limit || '∞'}</TableCell>
                <TableCell><Badge variant={c.is_active ? "default" : "destructive"}>{c.is_active ? "Yes" : "No"}</Badge></TableCell>
                <TableCell className="text-right space-x-1">
                  <Button size="icon" variant="ghost" onClick={() => setViewCoupon(c)}><Eye className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => openEdit(c)}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(c.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
            {coupons.length === 0 && <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">No coupons</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!viewCoupon} onOpenChange={() => setViewCoupon(null)}>
        <DialogContent><DialogHeader><DialogTitle>Coupon: {viewCoupon?.code}</DialogTitle></DialogHeader>
          {viewCoupon && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-muted-foreground">Code:</span> {viewCoupon.code}</div>
              <div><span className="text-muted-foreground">Type:</span> {viewCoupon.discount_type}</div>
              <div><span className="text-muted-foreground">Value:</span> {viewCoupon.discount_type === 'PERCENTAGE' ? `${viewCoupon.discount_value}%` : `$${viewCoupon.discount_value}`}</div>
              <div><span className="text-muted-foreground">Expires:</span> {format(new Date(viewCoupon.expires_at), 'PPP')}</div>
              <div><span className="text-muted-foreground">Used:</span> {viewCoupon.used_count}/{viewCoupon.usage_limit || '∞'}</div>
              <div><span className="text-muted-foreground">Active:</span> {viewCoupon.is_active ? "Yes" : "No"}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent><DialogHeader><DialogTitle>{editing ? "Edit Coupon" : "Add Coupon"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1"><Label>Code</Label><Input value={form.code} onChange={e => setForm({...form, code: e.target.value.toUpperCase()})} placeholder="SUMMER2024" /></div>
            <div className="space-y-1">
              <Label>Discount Type</Label>
              <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" value={form.discount_type} onChange={e => setForm({...form, discount_type: e.target.value})}>
                <option value="PERCENTAGE">Percentage</option>
                <option value="FIXED">Fixed Amount</option>
              </select>
            </div>
            <div className="space-y-1"><Label>Value</Label><Input type="number" value={form.discount_value} onChange={e => setForm({...form, discount_value: +e.target.value})} /></div>
            <div className="space-y-1"><Label>Expires At</Label><Input type="datetime-local" value={form.expires_at} onChange={e => setForm({...form, expires_at: e.target.value})} /></div>
            <div className="space-y-1"><Label>Usage Limit (empty = unlimited)</Label><Input type="number" value={form.usage_limit || ''} onChange={e => setForm({...form, usage_limit: e.target.value ? +e.target.value : null})} /></div>
            <div className="flex items-center gap-2"><input type="checkbox" checked={form.is_active} onChange={e => setForm({...form, is_active: e.target.checked})} /><Label>Active</Label></div>
            <Button className="w-full" onClick={handleSave} disabled={loading}>{loading ? "Saving..." : editing ? "Update" : "Create"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
