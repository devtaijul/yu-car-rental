"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { User } from "@/generated/prisma/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Eye, Trash2 } from "lucide-react";
import { useState } from "react";

export default function UsersManagement({ users }: { users: User[] }) {
  const [viewUser, setViewUser] = useState<User | null>(null);
  const { toast } = useToast();

  const handleDelete = async (userId: string) => {
    if (!confirm("Delete this user's profile?")) return;
    /* const { error } = await supabase
      .from("profiles")
      .delete()
      .eq("user_id", userId);
    if (error)
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    else {
      toast({ title: "User removed" });
     
    } */
  };

  const toggleRole = async (userId: string, currentRole: string) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    /* const { error } = await supabase
      .from("user_roles")
      .update({ role: newRole })
      .eq("user_id", userId);
    if (error)
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    else {
      toast({ title: `Role changed to ${newRole}` });
      fetchUsers();
    } */
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-display font-bold">Users ({users.length})</h2>
      <div className="rounded-lg border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">
                  {u.firstName} {u.lastName || "—"}
                </TableCell>
                <TableCell>{u.phone || "—"}</TableCell>
                <TableCell>
                  <Badge
                    variant={u.role === "ADMIN" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleRole(u.id, u.role || "USER")}
                  >
                    {u.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={u.isVerified ? "default" : "secondary"}>
                    {u.isVerified ? "Yes" : "No"}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs">
                  {format(new Date(u.createdAt), "MMM dd, yyyy")}
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setViewUser(u)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDelete(u.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground py-8"
                >
                  No users
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!viewUser} onOpenChange={() => setViewUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {viewUser && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Name:</span>{" "}
                {viewUser.firstName}
              </div>
              <div>
                <span className="text-muted-foreground">Phone:</span>{" "}
                {viewUser.phone || "—"}
              </div>
              <div>
                <span className="text-muted-foreground">Role:</span>{" "}
                <Badge
                  variant={viewUser.role === "ADMIN" ? "default" : "outline"}
                >
                  {viewUser.role}
                </Badge>
              </div>
              <div>
                <span className="text-muted-foreground">Verified:</span>{" "}
                {viewUser.isVerified ? "Yes" : "No"}
              </div>
              <div className="col-span-2">
                <span className="text-muted-foreground">User ID:</span>{" "}
                {viewUser.id}
              </div>
              <div className="col-span-2">
                <span className="text-muted-foreground">Joined:</span>{" "}
                {format(new Date(viewUser.createdAt), "PPP")}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
