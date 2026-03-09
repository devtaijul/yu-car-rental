"use client";

import { updateAvatar, updatePassword, updateProfile } from "@/actions/mutation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const profileSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().min(1, "Last name is required").max(50),
  email: z.string().email("Invalid email"),
  phoneCode: z.string().min(1, "Phone code is required"),
  phone: z.string().trim().min(1, "Phone is required").max(20),
  dateOfBirth: z.string().optional(),
  licenseNumber: z.string().trim().optional(),
  company: z.string().max(100).optional(),
  street: z.string().trim().optional(),
  houseNo: z.string().trim().optional(),
  postCode: z.string().trim().optional(),
  city: z.string().trim().optional(),
  country: z.string().trim().optional(),
  stateRegion: z.string().trim().optional(),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "At least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ProfileForm = z.infer<typeof profileSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;

type UserProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneCode: string;
  phone: string;
  dateOfBirth?: Date | null;
  licenseNumber?: string | null;
  company?: string | null;
  street?: string | null;
  houseNo?: string | null;
  postCode?: string | null;
  city?: string | null;
  country?: string | null;
  stateRegion?: string | null;
  avatarUrl?: string | null;
  createdAt: Date;
};

function formatDateForInput(date?: Date | null): string {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
}

function profileCompletion(user: UserProfile | null): number {
  if (!user) return 0;
  const fields = [
    user.firstName, user.lastName, user.email, user.phone,
    user.dateOfBirth, user.licenseNumber, user.street,
    user.houseNo, user.postCode, user.city, user.country, user.avatarUrl,
  ];
  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
}

export default function ProfileDocuments({ user }: { user: UserProfile | null }) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "");
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const fullName = user ? `${user.firstName} ${user.lastName}` : "User";
  const initials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
    : "U";
  const completion = profileCompletion(user);

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : "";

  const profileForm = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phoneCode: user?.phoneCode || "+1",
      phone: user?.phone || "",
      dateOfBirth: formatDateForInput(user?.dateOfBirth),
      licenseNumber: user?.licenseNumber || "",
      company: user?.company || "",
      street: user?.street || "",
      houseNo: user?.houseNo || "",
      postCode: user?.postCode || "",
      city: user?.city || "",
      country: user?.country || "",
      stateRegion: user?.stateRegion || "",
    },
  });

  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData },
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);

      const result = await updateAvatar(data.secure_url);
      if (!result?.success) throw new Error("Failed to save avatar");

      setAvatarUrl(data.secure_url);
      toast({ title: "Profile picture updated" });
    } catch (err: unknown) {
      toast({
        title: "Upload failed",
        description: err instanceof Error ? err.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const onProfileSubmit = async (data: ProfileForm) => {
    setSavingProfile(true);
    try {
      const result = await updateProfile({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneCode: data.phoneCode,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth || "",
        licenseNumber: data.licenseNumber || "",
        company: data.company,
        street: data.street || "",
        houseNo: data.houseNo || "",
        postCode: data.postCode || "",
        city: data.city || "",
        country: data.country || "",
        stateRegion: data.stateRegion || "",
      });
      if (!result?.success) throw new Error("Update failed");
      toast({ title: "Profile updated", description: "Your changes have been saved." });
    } catch {
      toast({ title: "Error", description: "Failed to update profile.", variant: "destructive" });
    } finally {
      setSavingProfile(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordForm) => {
    setSavingPassword(true);
    try {
      const result = await updatePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      if (!result?.success) {
        const msg = (result as { error?: string })?.error || "Failed to update password";
        throw new Error(msg);
      }
      toast({ title: "Password updated", description: "Your password has been changed." });
      passwordForm.reset();
    } catch (err: unknown) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to update password",
        variant: "destructive",
      });
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-display font-bold uppercase">Profile &amp; Documents</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your personal information and required rental documentation.
        </p>
      </div>

      {/* Avatar Card */}
      <Card className="border border-border">
        <CardContent className="p-6 flex items-center gap-6">
          <div className="relative shrink-0">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={fullName}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full gradient-color flex items-center justify-center text-primary-foreground text-2xl font-bold">
                {initials}
              </div>
            )}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingAvatar}
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full gradient-color flex items-center justify-center border-2 border-card disabled:opacity-60"
            >
              {uploadingAvatar ? (
                <Loader2 className="h-3.5 w-3.5 text-primary-foreground animate-spin" />
              ) : (
                <Camera className="h-3.5 w-3.5 text-primary-foreground" />
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-xl font-bold">{fullName}</h2>
              <Badge className="text-white text-[10px] uppercase tracking-wider border-0">
                Premium Tier
              </Badge>
            </div>
            {memberSince && (
              <p className="text-xs text-primary uppercase tracking-wider font-medium mt-1">
                Member Since {memberSince}
              </p>
            )}
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span className="uppercase tracking-wider font-medium">Profile Completion</span>
                <span className="font-bold">{completion}%</span>
              </div>
              <Progress value={completion} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Details */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-wider">Personal Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "firstName" as const, label: "First Name" },
                  { name: "lastName" as const, label: "Last Name" },
                  { name: "email" as const, label: "Email Address", type: "email" },
                  { name: "dateOfBirth" as const, label: "Date of Birth", type: "date" },
                  { name: "licenseNumber" as const, label: "Driver's License Number" },
                ].map(({ name, label, type }) => (
                  <FormField
                    key={name}
                    control={profileForm.control}
                    name={name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                          {label}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} type={type || "text"} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <FormField
                  control={profileForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <div className="flex gap-2">
                          <Input
                            className="w-20"
                            {...profileForm.register("phoneCode")}
                            placeholder="+1"
                          />
                          <Input {...field} className="flex-1" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={profileForm.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                      Company (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Company Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-[3fr_1fr] gap-4">
                {[
                  { name: "street" as const, label: "Street Address" },
                  { name: "houseNo" as const, label: "House No." },
                ].map(({ name, label }) => (
                  <FormField key={name} control={profileForm.control} name={name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">{label}</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "postCode" as const, label: "Post Code" },
                  { name: "city" as const, label: "City" },
                  { name: "country" as const, label: "Country" },
                  { name: "stateRegion" as const, label: "State / Region" },
                ].map(({ name, label }) => (
                  <FormField key={name} control={profileForm.control} name={name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">{label}</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              <div className="flex justify-center pt-2">
                <Button
                  type="submit"
                  disabled={savingProfile}
                  className="bg-primary text-primary-foreground uppercase text-xs tracking-wider font-bold px-8"
                >
                  {savingProfile && <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />}
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-wider">Security</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                      Current Password
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                        New Password
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                        Confirm New Password
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-center pt-2">
                <Button
                  type="submit"
                  variant="outline"
                  disabled={savingPassword}
                  className="uppercase text-xs tracking-wider font-bold px-8"
                >
                  {savingPassword && <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />}
                  Update Password
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
