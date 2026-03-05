"use client";

import { createCarMutation } from "@/actions/mutation";
import { PAGES } from "@/config/pages.config";
import { useAsyncAction } from "@/hooks/use-async-action";
import { useToast } from "@/hooks/use-toast";
import { CarFormValues, carSchema } from "@/lib/validation/car.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const carTypes = ["SEDAN", "SUV", "MICROBUS", "HATCHBACK", "PICKUP", "LUXURY"];
const fuelTypes = ["PETROL", "DIESEL", "ELECTRIC", "HYBRID"];
const transmissions = ["AUTOMATIC", "MANUAL"];

const CreateCarPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);

  const [uploading, setUploading] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CarFormValues>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      fuelType: "PETROL",
      transmission: "AUTOMATIC",
      carType: "SUV",
      year: "2024",
    },
  });
  console.log("errors", errors);

  const { isProcessing, runAction } = useAsyncAction(createCarMutation, {
    onSuccess: (data) => {
      console.log(data);
      if (data.success) {
        toast({
          title: "Car created",
          description: "Your car has been created successfully.",
        });
        reset();
      }
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: "Error creating car",
        description: "Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);
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
      console.log("data", data);
      if (data.error) {
        setUploading(false);
        return toast({
          title: "Error uploading image",
          description: data.error.message,
          variant: "destructive",
        });
      } else {
        setValue("imageUrl", data.secure_url);
        setUploading(false);
        setPreview(data.secure_url);
        toast({
          title: "Image uploaded",
          description: "Your image has been uploaded successfully.",
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error uploading image",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const onSubmit = (data: CarFormValues) => {
    const formattedData = {
      ...data,
      speed: data.speed ? Number(data.speed) : null,
      seats: data.seats ? Number(data.seats) : null,
      pricePerDay: Number(data.pricePerDay),
      year: Number(data.year),
    };

    runAction(formattedData);

    // axios.post("/api/admin/cars", formattedData)
  };
  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={() => router.push(PAGES.ADMIN.CARS.ROOT)}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
        >
          <ArrowLeft className="h-4 w-4" /> BACK TO CARS
        </button>
        <h1 className="text-2xl font-bold text-foreground">
          CREATE <span className="text-primary">NEW CAR</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Add a new vehicle to your fleet inventory.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Left: Image Upload */}
        <div className="bg-card rounded-xl border p-6">
          <h3 className="text-sm font-bold text-foreground mb-4">CAR IMAGE</h3>
          <div className="relative border-2 border-dashed rounded-xl aspect-4/3 flex items-center justify-center overflow-hidden bg-muted/30">
            {preview ? (
              <>
                <Image
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  width={500}
                  height={500}
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null);
                    setValue("imageUrl", "");
                  }}
                  className="absolute top-2 right-2 bg-card p-1 rounded-full"
                >
                  <X className="h-4 w-4" />
                </button>
              </>
            ) : (
              <label className="flex flex-col items-center gap-2 cursor-pointer text-muted-foreground">
                <Upload className="h-8 w-8" />
                <span>Click to upload</span>
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    return (
                      e.target.files && handleImageUpload(e.target.files[0])
                    );
                  }}
                />
              </label>
            )}

            {uploading && (
              <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
                <Loader2 className="animate-spin" />
              </div>
            )}
          </div>

          {errors.imageUrl && (
            <p className="text-xs text-red-500 mt-2">
              {errors.imageUrl.message}
            </p>
          )}
        </div>

        {/* Right: Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-bold text-foreground mb-4">
              BASIC INFORMATION
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Car Name *
                </label>
                <input
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                  placeholder="e.g. Toyota Hilux"
                  {...register("name")}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Slug *
                </label>
                <input
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                  placeholder="toyota-hilux"
                  {...register("slug")}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Brand *
                </label>
                <input
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                  placeholder="Toyota"
                  {...register("brand")}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Model *
                </label>
                <input
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                  placeholder="Hilux"
                  {...register("model")}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Year *
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                  {...register("year")}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Car Type *
                </label>
                <select
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                  {...register("carType")}
                >
                  {carTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Specs */}
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-bold text-foreground mb-4">
              SPECIFICATIONS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Speed (km/h)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                  placeholder="95"
                  {...register("speed")}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Engine Capacity
                </label>
                <input
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                  placeholder="1.0L Turbo"
                  {...register("engineCapacity")}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Fuel Type *
                </label>
                <select
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                  {...register("fuelType")}
                >
                  {fuelTypes.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Transmission *
                </label>
                <select
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                  {...register("transmission")}
                >
                  {transmissions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Seats
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                  {...register("seats")}
                />
              </div>
            </div>
          </div>

          {/* Pricing & Registration */}
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-bold text-foreground mb-4">
              PRICING & REGISTRATION
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Price Per Day ($) *
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                  placeholder="55"
                  {...register("pricePerDay")}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Registration No *
                </label>
                <input
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                  placeholder="DHK-RAIZE-002"
                  {...register("registrationNo")}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Plate Number
                </label>
                <input
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                  placeholder="BNR-482"
                  {...register("plate")}
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                Description
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30 resize-none"
                placeholder="Brief description of the vehicle..."
                {...register("description")}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push(PAGES.ADMIN.CARS.ROOT)}
              className="px-6 py-2.5 text-sm font-semibold border rounded-lg hover:bg-muted transition-colors"
              disabled={isProcessing}
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "CREATE CAR"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCarPage;
