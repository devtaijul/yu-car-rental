/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ArrowLeft, Upload, X, Save } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
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

// Mock: would be fetched by ID
const mockCar = {
  name: "Toyota Hilux",
  brand: "Toyota",
  model: "Hilux",
  slug: "toyota-hilux",
  year: 2024,
  speed: "95",
  engineCapacity: "1.0L Turbo",
  fuelType: "PETROL",
  transmission: "AUTOMATIC",
  seats: 5,
  carType: "SUV",
  pricePerDay: "55",
  registrationNo: "DHK-RAIZE-002",
  plate: "dfsdfkfkf",
  description: "Automatic version for smoother rides.",
  imageUrl: "car-2_wnwqnm",
  isAvailable: true,
};

const EditCarPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState(mockCar);

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Updates the form state by setting the value of the given key.
   * @param {string} key The key to update in the form state.
   * @param {any} value The value to set for the given key.
   */
  /*******  ecaf00cc-2656-45a3-a7b8-2373ecce2214  *******/ const update = (
    key: string,
    value: any,
  ) => setForm({ ...form, [key]: value });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "yu_car_rental");
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
    console.log("Update car:", id, form);
  };

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={() => router.push("/cars")}
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
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Image */}
        <div className="space-y-4">
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-bold text-foreground mb-4">
              CAR IMAGE
            </h3>
            <div
              className="relative border-2 border-dashed rounded-xl aspect-4/3 
             *:[-] flex items-center justify-center overflow-hidden bg-muted/30"
            >
              {imagePreview || form.imageUrl ? (
                <>
                  <Image
                    src={
                      imagePreview ||
                      `https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/${form.imageUrl}`
                    }
                    alt="Car"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                    width={500}
                    height={500}
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
                  <span className="text-sm font-medium">Click to upload</span>
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

          {/* Availability Toggle */}
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-bold text-foreground mb-4">
              AVAILABILITY
            </h3>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm font-medium text-foreground">
                Car is available for rent
              </span>
              <div
                className={`relative w-11 h-6 rounded-full transition-colors ${form.isAvailable ? "bg-primary" : "bg-muted"}`}
                onClick={() => update("isAvailable", !form.isAvailable)}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-card rounded-full shadow transition-transform ${form.isAvailable ? "translate-x-5" : ""}`}
                />
              </div>
            </label>
          </div>
        </div>

        {/* Form Fields */}
        <div className="lg:col-span-2 space-y-6">
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
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push("/cars")}
              className="px-6 py-2.5 text-sm font-semibold border rounded-lg hover:bg-muted transition-colors"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              <Save className="h-4 w-4" /> UPDATE CAR
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCarPage;
