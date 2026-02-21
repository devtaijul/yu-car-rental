"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useBooking } from "@/context/BookingContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { extras } from "@/data/utils";
import { PricingTable } from "../PricingTable";
import { IconName } from "@/config/icons.config";
import { Icons } from "../icons";
import { PAGES } from "@/config/pages.config";

type CoverageType = "standard" | "premium";

export default function StepCoverageExtras() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setBooking } = useBooking();

  const [selectedCoverage, setSelectedCoverage] =
    useState<CoverageType>("standard");

  const [extraQuantities, setExtraQuantities] = useState<
    Record<string, number>
  >({});

  // Handle quantity increase/decrease
  const handleExtraQuantity = (id: string, delta: number) => {
    setExtraQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta),
    }));
  };

  const handleContinue = () => {
    // Remove zero quantity extras
    const filteredExtras = Object.fromEntries(
      Object.entries(extraQuantities).filter(([_, qty]) => qty > 0),
    );

    // Update context
    setBooking({
      coverage: selectedCoverage,
      extras: filteredExtras,
    });

    // Preserve existing query params
    const existingParams = Object.fromEntries(searchParams.entries());

    const query = new URLSearchParams({
      ...existingParams,
      coverage: selectedCoverage,
      extras: JSON.stringify(filteredExtras),
    });

    router.push(
      `${PAGES.RESERVE_A_CAR.SUMMARY_CHECKOUT("879d8c9f-ab91-4688-9fc8-e83e7d800182")}?${query.toString()}`,
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <PricingTable
        selectedCoverage={selectedCoverage}
        onSelectCoverage={setSelectedCoverage}
        isSelectable
      />

      {/* Extras Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-display font-semibold mb-6">
          Choose your extras
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {extras.map((extra) => {
            const qty = extraQuantities[extra.id] || 0;
            const added = qty > 0;

            return (
              <div
                key={extra.id}
                className={`border p-5 flex flex-col justify-between gap-3 transition-all ${
                  added ? "border-primary" : "border-border"
                }`}
              >
                {/* Top */}
                <div className="flex items-start justify-between">
                  <div className="w-15 h-15 rounded-3xl bg-primary/20 flex items-center justify-center">
                    <Icons name={extra.icon as IconName} />
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      Daily
                    </p>
                    <p className="text-3xl font-extrabold text-primary">
                      ${extra.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h4 className="font-black text-2xl tracking-wide text-black">
                    {extra.name}
                  </h4>
                  <p className="text-xs mt-1 text-muted-foreground">
                    {extra.description}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex bg-primary/20 items-center gap-2 mt-1 py-2 px-3">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider flex-1">
                    Quantity
                  </span>

                  <button
                    onClick={() => handleExtraQuantity(extra.id, -1)}
                    className="w-7 h-7 bg-primary/90 text-white text-lg font-bold flex items-center justify-center hover:opacity-80 transition-colors"
                  >
                    −
                  </button>

                  <span className="w-6 text-center text-sm font-medium">
                    {qty}
                  </span>

                  <button
                    onClick={() => handleExtraQuantity(extra.id, 1)}
                    className="w-7 h-7 bg-primary/90 text-white text-lg font-bold flex items-center justify-center hover:opacity-80 transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Status Button */}
                <Button
                  disabled
                  className={`w-full text-xs font-bold tracking-widest py-5 transition-all ${
                    added
                      ? "bg-primary/20 text-primary border border-primary"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {added ? "✓ ADDED" : "NOT SELECTED"}
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 mt-8">
        <Button variant="ghost" onClick={() => router.back()}>
          Go Back
        </Button>
        <Button
          onClick={handleContinue}
          className="bg-primary text-primary-foreground"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
