"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Camera, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

const profileSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().min(1, "Last name is required").max(50),
  email: z.string().email("Invalid email"),
  phoneCode: z.string().default("+1"),
  phone: z.string().trim().min(1, "Phone is required").max(20),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  licenseNumber: z.string().trim().min(1, "License number is required").max(30),
  company: z.string().max(100).optional(),
  street: z.string().trim().min(1, "Street is required").max(200),
  houseNo: z.string().trim().min(1, "House number is required").max(20),
  postCode: z.string().trim().min(1, "Post code is required").max(20),
  city: z.string().trim().min(1, "City is required").max(100),
  country: z.string().trim().min(1, "Country is required").max(100),
  stateRegion: z.string().trim().min(1, "State/Region is required").max(100),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "At least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ProfileForm = z.infer<typeof profileSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;

export default function ProfileDocuments() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const userName = session?.user?.name || "Alex Morgan";

  const profileForm = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: userName.split(" ")[0] || "",
      lastName: userName.split(" ").slice(1).join(" ") || "",
      email: session?.user?.email || "",
      phoneCode: "+1",
      phone: "",
      dateOfBirth: "",
      licenseNumber: "",
      company: "",
      street: "",
      houseNo: "",
      postCode: "",
      city: "",
      country: "",
      stateRegion: "",
    },
  });

  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onProfileSubmit = (data: ProfileForm) => {
    toast({
      title: "Profile updated",
      description: "Your changes have been saved.",
    });
  };

  const onPasswordSubmit = (data: PasswordForm) => {
    toast({
      title: "Password updated",
      description: "Your password has been changed.",
    });
    passwordForm.reset();
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-display font-bold uppercase">
          Profile & Documents
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your personal information and required rental documentation.
        </p>
      </div>

      {/* Avatar Section */}
      <Card className="border border-border">
        <CardContent className="p-6 flex items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full gradient-color flex items-center justify-center text-primary-foreground text-2xl font-bold">
              {userName.charAt(0)}
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full gradient-color flex items-center justify-center border-2 border-card">
              <Camera className="h-3.5 w-3.5 text-primary-foreground" />
            </button>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold">{userName}</h2>
              <Badge className="primary text-white text-[10px] uppercase tracking-wider border-0">
                Premium Tier
              </Badge>
            </div>
            <p className="text-xs text-primary uppercase tracking-wider font-medium mt-1">
              Member Since Oct 2022
            </p>
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span className="uppercase tracking-wider font-medium">
                  Profile Completion
                </span>
                <span className="font-bold">80%</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Details */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-wider">
            Personal Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...profileForm}>
            <form
              onSubmit={profileForm.handleSubmit(onProfileSubmit)}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={profileForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                          <Input className="w-16" value="+1" readOnly />
                          <Input {...field} className="flex-1" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                        Date of Birth
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="MM/DD/YYYY" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="licenseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                        Driver's License Number
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                <FormField
                  control={profileForm.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                        Street Address
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="houseNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                        House No.
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={profileForm.control}
                  name="postCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                        Post Code
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                        City
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                        Country
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="stateRegion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                        State / Region
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-center pt-2">
                <Button
                  type="submit"
                  className="bg-primary text-primary-foreground uppercase text-xs tracking-wider font-bold px-8"
                >
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
          <CardTitle className="text-sm font-bold uppercase tracking-wider">
            Security
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
              className="space-y-4"
            >
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
                  className="uppercase text-xs tracking-wider font-bold px-8"
                >
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
