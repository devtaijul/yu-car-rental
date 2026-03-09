"use client";

import { PlatformSettings } from "@/generated/prisma/client";
import { Upload } from "lucide-react";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  GeneralSettingsFormValues,
  generalSettingsSchema,
} from "@/lib/validation/settings.schema";
import Image from "next/image";
import { useAsyncAction } from "@/hooks/use-async-action";
import { generalSettingsMutation } from "@/actions/mutation";
import { useToast } from "@/hooks/use-toast";

export const GeneralSettings = ({
  settings,
}: {
  settings: PlatformSettings;
}) => {
  const { toast } = useToast();
  const [uploading, setUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState<string | null>(null);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<GeneralSettingsFormValues>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      platformName: settings.platformName,
      supportEmail: settings.supportEmail,
      supportPhone: settings.supportPhone,
      baseCurrency: settings.baseCurrency,
      brandLogoUrl: settings.brandLogoUrl || "",
    },
  });

  const { runAction, isProcessing } = useAsyncAction(generalSettingsMutation, {
    onSuccess: () => {
      toast({
        title: "General settings updated",
        description: "Your general settings have been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: GeneralSettingsFormValues) => {
    console.log(data);

    // এখানে API call দিবে
    runAction(data);
  };

  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);
      setUploadError(null);

      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!,
      );

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error?.message || "Upload failed");
      }

      setValue("brandLogoUrl", data.secure_url, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } catch (error: any) {
      console.error(error);
      setUploadError(error.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  };
  const logo = useWatch({
    control,
    name: "brandLogoUrl",
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-card rounded-xl border p-6"
    >
      <h2 className="text-lg font-bold text-foreground">General Settings</h2>
      <p className="text-sm text-muted-foreground mb-5">
        Basic configuration details for your rental platform.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
            Platform Name
          </label>

          <input
            {...register("platformName")}
            className="w-full border rounded-lg px-4 py-2.5 text-sm bg-card focus:outline-none focus:ring-2 focus:ring-ring/30"
          />

          {errors.platformName && (
            <p className="text-xs text-red-500 mt-1">
              {errors.platformName.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
            Support Email
          </label>

          <input
            type="email"
            {...register("supportEmail")}
            className="w-full border rounded-lg px-4 py-2.5 text-sm bg-card focus:outline-none focus:ring-2 focus:ring-ring/30"
          />

          {errors.supportEmail && (
            <p className="text-xs text-red-500 mt-1">
              {errors.supportEmail.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
            Support Phone
          </label>

          <input
            {...register("supportPhone")}
            className="w-full border rounded-lg px-4 py-2.5 text-sm bg-card focus:outline-none focus:ring-2 focus:ring-ring/30"
          />

          {errors.supportPhone && (
            <p className="text-xs text-red-500 mt-1">
              {errors.supportPhone.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
            Base Currency
          </label>

          <select
            {...register("baseCurrency")}
            className="w-full border rounded-lg px-4 py-2.5 text-sm bg-card focus:outline-none"
          >
            <option value="USD">USD - US Dollar ($)</option>
            <option value="EUR">EUR - Euro (€)</option>
          </select>

          {errors.baseCurrency && (
            <p className="text-xs text-red-500 mt-1">
              {errors.baseCurrency.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
          Brand Logo
        </label>

        <label className="border-2 border-dashed rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer block">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file);
            }}
          />

          {uploading ? (
            <p className="text-sm text-muted-foreground animate-pulse">
              Uploading image...
            </p>
          ) : logo ? (
            <Image
              alt="Uploaded Image"
              width={100}
              height={100}
              src={logo}
              className="mx-auto h-20 object-contain"
            />
          ) : (
            <>
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />

              <p className="text-sm text-muted-foreground">
                Click to upload or drag and drop
              </p>

              <p className="text-xs text-muted-foreground mt-1">
                SVG, PNG, JPG or GIF (max. 2MB)
              </p>
            </>
          )}
        </label>

        {uploadError && (
          <p className="text-xs text-red-500 mt-2">{uploadError}</p>
        )}
      </div>

      <div className="flex gap-3 mt-5 justify-end">
        <button
          type="button"
          className="px-5 py-2.5 rounded-lg text-sm font-medium border hover:bg-muted transition-colors"
        >
          CANCEL
        </button>

        <button
          type="submit"
          disabled={isProcessing}
          className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          {isProcessing ? "Saving..." : "SAVE CHANGES"}
        </button>
      </div>
    </form>
  );
};
