/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { PAGES } from "@/config/pages.config";
import { ArrowLeft, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const carTypes = [
  "SEDAN",
  "SUV",
  "HATCHBACK",
  "COUPE",
  "CONVERTIBLE",
  "MINIVAN",
  "PICKUP",
  "LUXURY",
];
const fuelTypes = ["PETROL", "DIESEL", "ELECTRIC", "HYBRID"];
const transmissions = ["AUTOMATIC", "MANUAL"];

const CreateCarPage = () => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    brand: "",
    model: "",
    slug: "",
    year: 2024,
    speed: "",
    engineCapacity: "",
    fuelType: "PETROL",
    transmission: "AUTOMATIC",
    seats: 5,
    carType: "SUV",
    pricePerDay: "",
    registrationNo: "",
    plate: "",
    description: "",
    imageUrl: "",
  });

  const update = (key: string, value: any) =>
    setForm({ ...form, [key]: value });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);

    // Cloudinary upload
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "yu_car_rental"); // Configure in Cloudinary
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await res.json();
      update("imageUrl", data.public_id || data.secure_url);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Create car:", form);
    // API call here
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
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Left: Image Upload */}
        <div className="bg-card rounded-xl border p-6">
          <h3 className="text-sm font-bold text-foreground mb-4">CAR IMAGE</h3>
          <div className="relative border-2 border-dashed rounded-xl aspect-[4/3] flex items-center justify-center overflow-hidden bg-muted/30">
            {imagePreview ? (
              <>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    update("imageUrl", "");
                  }}
                  className="absolute top-2 right-2 p-1 bg-card rounded-full shadow hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                </button>
              </>
            ) : (
              <label className="flex flex-col items-center gap-2 cursor-pointer text-muted-foreground">
                <Upload className="h-8 w-8" />
                <span className="text-sm font-medium">
                  Click to upload image
                </span>
                <span className="text-xs">PNG, JPG up to 5MB</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
            {uploading && (
              <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  Uploading...
                </span>
              </div>
            )}
          </div>
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
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  required
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                  placeholder="e.g. Toyota Hilux"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Slug *
                </label>
                <input
                  value={form.slug}
                  onChange={(e) => update("slug", e.target.value)}
                  required
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                  placeholder="toyota-hilux"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Brand *
                </label>
                <input
                  value={form.brand}
                  onChange={(e) => update("brand", e.target.value)}
                  required
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                  placeholder="Toyota"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Model *
                </label>
                <input
                  value={form.model}
                  onChange={(e) => update("model", e.target.value)}
                  required
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                  placeholder="Hilux"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Year *
                </label>
                <input
                  type="number"
                  value={form.year}
                  onChange={(e) => update("year", parseInt(e.target.value))}
                  required
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Car Type *
                </label>
                <select
                  value={form.carType}
                  onChange={(e) => update("carType", e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
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
                  value={form.speed}
                  onChange={(e) => update("speed", e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                  placeholder="95"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Engine Capacity
                </label>
                <input
                  value={form.engineCapacity}
                  onChange={(e) => update("engineCapacity", e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                  placeholder="1.0L Turbo"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Fuel Type *
                </label>
                <select
                  value={form.fuelType}
                  onChange={(e) => update("fuelType", e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
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
                  value={form.transmission}
                  onChange={(e) => update("transmission", e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
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
                  value={form.seats}
                  onChange={(e) => update("seats", parseInt(e.target.value))}
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
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
                  value={form.pricePerDay}
                  onChange={(e) => update("pricePerDay", e.target.value)}
                  required
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                  placeholder="55"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Registration No *
                </label>
                <input
                  value={form.registrationNo}
                  onChange={(e) => update("registrationNo", e.target.value)}
                  required
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                  placeholder="DHK-RAIZE-002"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Plate Number
                </label>
                <input
                  value={form.plate}
                  onChange={(e) => update("plate", e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                  placeholder="BNR-482"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                rows={3}
                className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30 resize-none"
                placeholder="Brief description of the vehicle..."
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push(PAGES.ADMIN.CARS.ROOT)}
              className="px-6 py-2.5 text-sm font-semibold border rounded-lg hover:bg-muted transition-colors"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              CREATE CAR
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCarPage;
