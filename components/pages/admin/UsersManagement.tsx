import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Profile, UserRole } from "@/types/database";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Eye, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface UserWithRole extends Profile {
  role?: string;
  email?: string;
}

export default function UsersManagement() {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [viewUser, setViewUser] = useState<UserWithRole | null>(null);
  const { toast } = useToast();

  const fetchUsers = async () => {
    const { data: profiles } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    const { data: roles } = await supabase.from("user_roles").select("*");
    const roleMap = new Map((roles as UserRole[])?.map(r => [r.user_id, r.role]) || []);
    setUsers((profiles as Profile[])?.map(p => ({ ...p, role: roleMap.get(p.user_id) || 'user' })) || []);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (userId: string) => {
    if (!confirm("Delete this user's profile?")) return;
    const { error } = await supabase.from("profiles").delete().eq("user_id", userId);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "User removed" }); fetchUsers(); }
  };

  const toggleRole = async (userId: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    const { error } = await supabase.from("user_roles").update({ role: newRole }).eq("user_id", userId);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: `Role changed to ${newRole}` }); fetchUsers(); }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-display font-bold">Users ({users.length})</h2>
      <div className="rounded-lg border border-border overflow-x-auto bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border">
              <TableHead className="text-xs uppercase tracking-wider font-semibold">Name</TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-semibold">Phone</TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-semibold">Role</TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-semibold">Verified</TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-semibold">Joined</TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(u => (
              <TableRow key={u.id} className="border-b border-border">
                <TableCell className="font-medium">{u.name || "—"}</TableCell>
                <TableCell className="text-muted-foreground">{u.phone || "—"}</TableCell>
                <TableCell>
                  <Badge className={`cursor-pointer text-[10px] ${u.role === 'admin' ? 'gradient-teal text-primary-foreground border-0' : 'bg-muted text-muted-foreground'}`} onClick={() => toggleRole(u.user_id, u.role || 'user')}>
                    {u.role}
                  </Badge>
                </TableCell>
                <TableCell><Badge className={u.is_verified ? "bg-success/10 text-success border-success/20 text-[10px]" : "bg-muted text-muted-foreground text-[10px]"}>{u.is_verified ? "Yes" : "No"}</Badge></TableCell>
                <TableCell className="text-xs text-muted-foreground">{format(new Date(u.created_at), 'MMM dd, yyyy')}</TableCell>
                <TableCell className="text-right space-x-1">
                  <Button size="icon" variant="ghost" onClick={() => setViewUser(u)}><Eye className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(u.user_id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No users</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!viewUser} onOpenChange={() => setViewUser(null)}>
        <DialogContent><DialogHeader><DialogTitle className="font-display">User Details</DialogTitle></DialogHeader>
          {viewUser && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[["Name", viewUser.name], ["Phone", viewUser.phone || "—"], ["Verified", viewUser.is_verified ? "Yes" : "No"], ["Joined", format(new Date(viewUser.created_at), 'PPP')]].map(([l, v]) => (
                <div key={String(l)}><span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{l}</span><p className="font-medium">{String(v)}</p></div>
              ))}
              <div><span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Role</span><p><Badge className={`text-[10px] ${viewUser.role === 'admin' ? 'gradient-teal text-primary-foreground border-0' : ''}`}>{viewUser.role}</Badge></p></div>
              <div className="col-span-2"><span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">User ID</span><p className="font-mono text-xs">{viewUser.user_id}</p></div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
