"use client";

import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PricingTableProps {
  selectedPackage?: "standard" | "premium";
  // onSelectCoverage: (coverage: "standard" | "premium") => void;
}

export const PricingTable = ({ selectedPackage }: PricingTableProps) => {
  const features = [
    {
      name: "Deductible Risk",
      standard: "$750",
      premium: "$0",
      isPremiumHighlight: true,
    },
    {
      name: "Security Deposit",
      standard: "$750",
      premium: "$0",
      isPremiumHighlight: true,
    },
    {
      name: "Additional Driver",
      standard: "$8 / DAY",
      premium: "INCLUDED",
      isPremiumHighlight: false,
    },
    {
      name: "Tank Rack",
      standard: "$5 / DAY",
      premium: "INCLUDED",
      isPremiumHighlight: false,
    },
    {
      name: "Flat Tire Service",
      standard: "$35",
      premium: "INCLUDED",
      isPremiumHighlight: false,
    },
    {
      name: "Cancellation Fee",
      standard: "$75",
      premium: "$0",
      isPremiumHighlight: true,
    },
    {
      name: "After-hours Pickup",
      standard: false,
      premium: true,
      isPremiumHighlight: false,
    },
    {
      name: "Discount Coupons",
      standard: false,
      premium: true,
      isPremiumHighlight: false,
    },
    {
      name: "All Damage Covered",
      standard: false,
      premium: true,
      isPremiumHighlight: false,
    },
    {
      name: "Third Party Damage",
      standard: true,
      premium: true,
      isPremiumHighlight: false,
    },
  ];

  const onSelectPackage = (coverage: "standard" | "premium") => {
    console.log("Selected coverage:", coverage);
  };

  const renderValue = (
    value: string | boolean,
    isStandard: boolean,
    isHighlight: boolean,
  ) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-5 w-5 text-primary mx-auto" />
      ) : (
        <X className="h-5 w-5 text-destructive mx-auto" />
      );
    }
    return (
      <span
        className={`${isStandard && isHighlight ? "text-destructive" : isHighlight ? "text-primary" : "text-foreground"}`}
      >
        {value}
      </span>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-20">
      {/* Header Row */}
      <div className="grid grid-cols-3 ">
        <div></div>
        <div className="text-center">
          <div className="border border-border  py-4 bg-card">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Standard
            </p>
            <h3 className="text-lg font-semibold text-foreground">
              CDW INSURANCE
            </h3>
          </div>
        </div>
        <div className="text-center">
          <div className="bg-primary  py-4 relative">
            <span className="absolute top-2 right-4 text-[10px] text-primary-foreground/80 uppercase tracking-wider">
              Recommended
            </span>
            <p className="text-xs text-primary-foreground/80 uppercase tracking-wider mb-1">
              Premium
            </p>
            <h3 className="text-lg font-semibold text-primary-foreground">
              100% COVERAGE
            </h3>
          </div>
        </div>
      </div>

      {/* Feature Rows */}
      <div className="border border-border  overflow-hidden bg-card">
        {features.map((feature, index) => (
          <div
            key={feature.name}
            className={`grid grid-cols-3 items-center   ${
              index !== features.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <div className="text-sm font-medium text-foreground p-4">
              {feature.name}
            </div>
            <div className="text-center text-sm p-4">
              {renderValue(feature.standard, true, feature.isPremiumHighlight)}
            </div>
            <div className="text-center text-sm font-medium p-4 bg-primary/10">
              {renderValue(feature.premium, false, feature.isPremiumHighlight)}
            </div>
          </div>
        ))}
      </div>

      {/* Add for only pricing */}
      <div className="grid grid-cols-3 mt-4">
        <div></div>
        <div></div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Add for only</p>
          <p className="text-xl font-semibold text-foreground">
            +$15{" "}
            <span className="text-sm font-normal text-muted-foreground">
              /day
            </span>
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 mt-6 gap-4">
        <div></div>
        <div>
          <Button
            variant="outline"
            className={`w-full rounded-none py-6 ${
              selectedPackage === "standard" ? "border-primary border-2" : ""
            }`}
            onClick={() => onSelectPackage("standard")}
          >
            Select Package
          </Button>
        </div>
        <div>
          <Button
            className={`w-full bg-primary text-primary-foreground  rounded-none py-6 hover:opacity-90 ${
              selectedPackage === "premium"
                ? "ring-2 ring-offset-2 ring-primary"
                : ""
            }`}
            onClick={() => onSelectPackage("premium")}
          >
            Select Package
          </Button>
        </div>
      </div>
    </div>
  );
};
