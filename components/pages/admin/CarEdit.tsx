"use client";

import { updateCarMutation } from "@/actions/mutation";
import { PAGES } from "@/config/pages.config";
import { Car } from "@/generated/prisma/client";
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

type Props = {
  car?: Car;
};

const CreateCarPage = ({ car }: Props) => {
  const { toast } = useToast();
  const router = useRouter();

  const isEditMode = !!car;

  const [preview, setPreview] = useState<string | null>(
    car?.imageUrl
      ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${car.imageUrl}`
      : null,
  );

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
      name: car?.name ?? "",
      slug: car?.slug ?? "",
      brand: car?.brand ?? "",
      model: car?.model ?? "",
      year: car?.year?.toString() ?? "2024",
      speed: car?.speed?.toString() ?? "",
      engineCapacity: car?.engineCapacity ?? "",
      fuelType: car?.fuelType ?? "PETROL",
      transmission: car?.transmission ?? "AUTOMATIC",
      seats: car?.seats?.toString() ?? "",
      carType: car?.carType ?? "SUV",
      pricePerDay: car?.pricePerDay?.toString() ?? "",
      registrationNo: car?.registrationNo ?? "",
      plate: car?.plate ?? "",
      description: car?.description ?? "",
      imageUrl: car?.imageUrl ?? "",
    },
  });

  const { isProcessing, runAction } = useAsyncAction(updateCarMutation, {
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: isEditMode ? "Car updated" : "Car created",
          description: isEditMode
            ? "Car updated successfully."
            : "Car created successfully.",
        });

        router.push(PAGES.ADMIN.CARS.ROOT);
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

      if (data.error) {
        setUploading(false);

        return toast({
          title: "Image upload failed",
          description: data.error.message,
          variant: "destructive",
        });
      }

      setValue("imageUrl", data.public_id);
      setPreview(data.secure_url);

      toast({
        title: "Image uploaded",
        description: "Image uploaded successfully.",
      });
    } catch {
      toast({
        title: "Upload failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
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
          {isEditMode ? "EDIT" : "CREATE"}{" "}
          <span className="text-primary">CAR</span>
        </h1>

        <p className="text-muted-foreground mt-1">
          {isEditMode
            ? "Update vehicle information."
            : "Add a new vehicle to your fleet inventory."}
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
                <Image
                  src={preview}
                  alt="Preview"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
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
                  onChange={(e) =>
                    e.target.files && handleImageUpload(e.target.files[0])
                  }
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
          {/* BASIC INFO */}
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-bold mb-4">BASIC INFORMATION</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                placeholder="Car Name"
                {...register("name")}
                className="input"
              />

              <input
                placeholder="Slug"
                {...register("slug")}
                className="input"
              />

              <input
                placeholder="Brand"
                {...register("brand")}
                className="input"
              />

              <input
                placeholder="Model"
                {...register("model")}
                className="input"
              />

              <input type="number" {...register("year")} className="input" />

              <select {...register("carType")} className="input">
                {carTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* SPEC */}
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-bold mb-4">SPECIFICATIONS</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <input
                type="number"
                placeholder="Speed"
                {...register("speed")}
                className="input"
              />

              <input
                placeholder="Engine Capacity"
                {...register("engineCapacity")}
                className="input"
              />

              <select {...register("fuelType")} className="input">
                {fuelTypes.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>

              <select {...register("transmission")} className="input">
                {transmissions.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Seats"
                {...register("seats")}
                className="input"
              />
            </div>
          </div>

          {/* PRICE */}
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-bold mb-4">PRICING & REGISTRATION</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Price Per Day"
                {...register("pricePerDay")}
                className="input"
              />

              <input
                placeholder="Registration No"
                {...register("registrationNo")}
                className="input"
              />

              <input
                placeholder="Plate"
                {...register("plate")}
                className="input"
              />
            </div>

            <textarea
              rows={3}
              placeholder="Description"
              {...register("description")}
              className="input mt-4"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push(PAGES.ADMIN.CARS.ROOT)}
              className="px-6 py-2.5 border rounded-lg"
            >
              CANCEL
            </button>

            <button
              type="submit"
              disabled={isProcessing}
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg"
            >
              {isProcessing
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                  ? "UPDATE CAR"
                  : "CREATE CAR"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCarPage;
