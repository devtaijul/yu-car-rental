"use client";

import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { CoverageType } from "@/generated/prisma/enums";

interface PricingTableProps {
  selectedCoverage?: CoverageType;
  isSelectable?: boolean;
  onSelectCoverage?: (coverage: CoverageType) => void;
}

export const PricingTable = ({
  selectedCoverage,
  isSelectable,
  onSelectCoverage,
}: PricingTableProps) => {
  const features = [
    {
      name: "Deductible Risk",
      standard: "$650",
      premium: "$0",
      isPremiumHighlight: true,
    },
    {
      name: "Security Deposit",
      standard: "$650",
      premium: "$0",
      isPremiumHighlight: true,
    },
    {
      name: "Additional Driver",
      standard: "$10 / DAY",
      premium: "INCLUDED",
      isPremiumHighlight: false,
    },
    {
      name: "Tank Rack",
      standard: "$5",
      premium: "INCLUDED",
      isPremiumHighlight: false,
    },
    {
      name: "Flat Tire Service",
      standard: "$40",
      premium: "INCLUDED",
      isPremiumHighlight: false,
    },
    {
      name: "Cancellation Fee",
      standard: "$80",
      premium: "$0",
      isPremiumHighlight: true,
    },
    {
      name: "After-hours Pickup",
      standard: false,
      premium: true,
      isPremiumHighlight: true,
    },
    {
      name: "Discount Coupons",
      standard: false,
      premium: true,
      isPremiumHighlight: true,
    },
    {
      name: "All Damage Covered",
      standard: false,
      premium: true,
      isPremiumHighlight: true,
    },
    {
      name: "Third Party Damage",
      standard: true,
      premium: true,
      isPremiumHighlight: false,
    },
  ];

  const isStandardSelected = selectedCoverage === "STANDARD";
  const isPremiumSelected = selectedCoverage === "PREMIUM";

  const renderValue = (
    value: string | boolean,
    isStandard: boolean,
    isHighlight: boolean,
  ) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-5 w-5 text-primary mx-auto" />
      ) : (
        <X className="h-5 w-5 text-muted-foreground/40 mx-auto" />
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
    <div className="w-full max-w-4xl mx-auto px-4 py-20 lg:px-0">
      <SectionTitle
        title="Coverage Options"
        subtitle="Travel with complete peace of mind"
      />
      <div className="grid grid-cols-3 ">
        <div></div>
        <div
          className="text-center cursor-pointer transition-all"
          onClick={() => onSelectCoverage?.("STANDARD")}
        >
          <div
            className={`py-4 relative transition-colors ${
              isStandardSelected ? "bg-primary" : "bg-card border border-border"
            }`}
          >
            {isStandardSelected && (
              <span className="absolute top-2 right-4 text-[10px] text-primary-foreground/80 uppercase tracking-wider">
                Selected
              </span>
            )}
            <p
              className={`text-xs uppercase tracking-wider mb-1 ${isStandardSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}
            >
              Standard
            </p>
            <h3
              className={`text-lg font-semibold ${isStandardSelected ? "text-primary-foreground" : "text-foreground"}`}
            >
              CDW INSURANCE
            </h3>
          </div>
          <div className="divide-y divide-border">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="flex items-center justify-between gap-4 px-4 py-3"
              >
                <span className="text-sm text-muted-foreground">
                  {feature.name}
                </span>
                <div className="text-sm font-medium">
                  {renderValue(
                    feature.standard,
                    true,
                    feature.isPremiumHighlight,
                  )}
                </div>
              </div>
            ))}
          </div>
          {isSelectable && (
            <div className="border-t border-border p-4">
              <Button
                variant="outline"
                className={`w-full rounded-none py-6 hover:bg-primary ${
                  selectedCoverage === "STANDARD"
                    ? "border-primary border-2"
                    : ""
                }`}
                onClick={() => {
                  if (onSelectCoverage) {
                    onSelectCoverage("STANDARD");
                  }
                }}
              >
                Select Package
              </Button>
            </div>
          )}
        </div>
        <div
          className="text-center cursor-pointer transition-all"
          onClick={() => onSelectCoverage?.("PREMIUM")}
        >
          <div
            className={`py-4 relative transition-colors ${
              isPremiumSelected ? "bg-primary" : "bg-card border border-border"
            }`}
          >
            <span
              className={`absolute top-2 right-4 text-[10px] uppercase tracking-wider ${isPremiumSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}
            >
              {isPremiumSelected ? "Selected" : "Recommended"}
            </span>
            <p
              className={`text-xs uppercase tracking-wider mb-1 ${isPremiumSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}
            >
              Premium
            </p>
            <h3
              className={`text-lg font-semibold ${isPremiumSelected ? "text-primary-foreground" : "text-foreground"}`}
            >
              100% COVERAGE
            </h3>
          </div>
        </div>
      </div>

      {/* Feature Rows */}
      <div className="border border-border overflow-hidden bg-card">
        {features.map((feature, index) => (
          <div
            key={feature.name}
            className={`grid grid-cols-3 items-center ${
              index !== features.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <div className="text-sm font-medium text-foreground p-4">
              {feature.name}
            </div>
            <div
              className={`text-center text-sm p-4 transition-colors cursor-pointer ${
                isStandardSelected ? "bg-primary/10" : ""
              }`}
              onClick={() => onSelectCoverage?.("STANDARD")}
            >
              {renderValue(feature.standard, true, feature.isPremiumHighlight)}
            </div>
            <div
              className={`text-center text-sm font-medium p-4 transition-colors cursor-pointer ${
                isPremiumSelected ? "bg-primary/10" : "bg-primary/5"
              }`}
              onClick={() => onSelectCoverage?.("PREMIUM")}
            >
              {renderValue(feature.premium, false, feature.isPremiumHighlight)}
            </div>
          </div>
        ))}
      </div>

      {/* Pricing row */}
      <div className="grid grid-cols-3 mt-4">
        <div></div>
        <div
          className="text-center cursor-pointer"
          onClick={() => onSelectCoverage?.("STANDARD")}
        >
          <p className="text-sm text-muted-foreground">Included</p>
          <p className="text-xl font-semibold text-foreground">
            $0{" "}
            <span className="text-sm font-normal text-muted-foreground">
              /day
            </span>
          </p>
        </div>
        <div
          className="text-center cursor-pointer"
          onClick={() => onSelectCoverage?.("PREMIUM")}
        >
          <p className="text-sm text-muted-foreground">Add for only</p>
          <p className="text-xl font-semibold text-foreground">
            +$12{" "}
            <span className="text-sm font-normal text-muted-foreground">
              /day
            </span>
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      {isSelectable && (
        <div className="grid grid-cols-3 mt-6 gap-4">
          <div></div>
          <div>
            <Button
              className={`w-full rounded-none py-6 transition-all ${
                isStandardSelected
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground border border-border hover:bg-primary/5"
              }`}
              onClick={() => onSelectCoverage?.("STANDARD")}
            >
              {isStandardSelected ? "✓ Selected" : "Select Package"}
            </Button>
          </div>
          <div>
            <Button
              className={`w-full rounded-none py-6 transition-all ${
                isPremiumSelected
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground border border-border hover:bg-primary/5"
              }`}
              onClick={() => onSelectCoverage?.("PREMIUM")}
            >
              {isPremiumSelected ? "✓ Selected" : "Select Package"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
