"use client";

import { Car } from "@/generated/prisma/client";
import { useToast } from "@/hooks/use-toast";
import { CarFormValues, carSchema } from "@/lib/validation/car.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Upload, X, Save, Loader2 } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PAGES } from "@/config/pages.config";
import { useAsyncAction } from "@/hooks/use-async-action";
import { updateCarMutation } from "@/actions/mutation";

const carTypes = ["SEDAN", "SUV", "MICROBUS", "HATCHBACK", "PICKUP", "LUXURY"];
const fuelTypes = ["PETROL", "DIESEL", "ELECTRIC", "HYBRID"];
const transmissions = ["AUTOMATIC", "MANUAL"];

const EditCarPage = ({ car }: { car: Car }) => {
  const router = useRouter();
  const { toast } = useToast();

  const [preview, setPreview] = useState<string | null>(car.imageUrl || null);
  const [uploading, setUploading] = useState(false);
  const { runAction, isProcessing } = useAsyncAction(updateCarMutation, {
    onSuccess: (data) => {
      console.log(data);
      if (data.success) {
        toast({
          title: "Car updated",
          description: "Your car has been updated successfully.",
        });
      }
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again.",
        variant: "destructive",
      });
    },
  });

  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm<CarFormValues>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      year: String(car.year),
      pricePerDay: String(car.pricePerDay),
      speed: car.speed ? String(car.speed) : "",
      seats: car.seats ? String(car.seats) : "",
      engineCapacity: car.engineCapacity ? String(car.engineCapacity) : "",
      imageUrl: car.imageUrl || "",
      carType: car.carType,
      fuelType: car.fuelType,
      transmission: car.transmission,
      plate: car.plate || "",
      name: car.name,
      brand: car.brand,
      model: car.model,
      description: car.description || "",
      registrationNo: car.registrationNo,

      slug: car.slug,
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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

      if (data.error) {
        throw new Error(data.error.message);
      }

      setValue("imageUrl", data.secure_url);
      setPreview(data.secure_url);

      toast({
        title: "Image uploaded",
        description: "Your image has been uploaded successfully.",
      });
    } catch {
      toast({
        title: "Error uploading image",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = (data: CarFormValues) => {
    const formatted = {
      ...data,
      speed: data.speed ? Number(data.speed) : null,
      seats: data.seats ? Number(data.seats) : null,
      pricePerDay: Number(data.pricePerDay),
      year: Number(data.year),
    };

    console.log(formatted);
    runAction(car.id, formatted);
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
          EDIT <span className="text-primary">CAR</span>
        </h1>

        <p className="text-muted-foreground mt-1">
          Update vehicle details and specifications.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* IMAGE */}
        <div className="bg-card rounded-xl border p-6">
          <h3 className="text-sm font-bold text-foreground mb-4">CAR IMAGE</h3>

          <div className="relative border-2 border-dashed rounded-xl aspect-4/3 flex items-center justify-center overflow-hidden bg-muted/30">
            {preview ? (
              <>
                <CldImage
                  src={preview}
                  alt="Car"
                  fill
                  className="object-cover"
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
                  onChange={handleImageUpload}
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

        {/* FORM */}
        <div className="lg:col-span-2 space-y-6">
          {/* BASIC */}
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
                  {...register("name")}
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Slug *
                </label>

                <input
                  {...register("slug")}
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Brand *
                </label>

                <input
                  {...register("brand")}
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Model *
                </label>

                <input
                  {...register("model")}
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Year *
                </label>

                <input
                  type="number"
                  {...register("year")}
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Car Type *
                </label>

                <select
                  {...register("carType")}
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                >
                  {carTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* SPEC */}
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-bold text-foreground mb-4">
              SPECIFICATIONS
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <input
                type="number"
                {...register("speed")}
                placeholder="Speed"
                className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background"
              />

              <input
                {...register("engineCapacity")}
                placeholder="Engine Capacity"
                className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background"
              />

              <select
                {...register("fuelType")}
                className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background"
              >
                {fuelTypes.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>

              <select
                {...register("transmission")}
                className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background"
              >
                {transmissions.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>

              <input
                type="number"
                {...register("seats")}
                placeholder="Seats"
                className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background"
              />
            </div>
          </div>

          {/* ACTION */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push(PAGES.ADMIN.CARS.ROOT)}
              className="px-6 py-2.5 text-sm font-semibold border rounded-lg hover:bg-muted"
            >
              CANCEL
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90"
              disabled={isProcessing}
            >
              <Save className="h-4 w-4" />{" "}
              {isProcessing ? "UPDATING..." : "UPDATE CAR"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCarPage;
