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

  const renderValue = (
    value: string | boolean,
    isStandard: boolean,
    isHighlight: boolean,
  ) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-5 w-5 text-primary mx-auto" />
      ) : (
        <X className={`${isStandard && isHighlight && 'text-destructive!'} h-5 w-5 text-primary mx-auto`} />
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

      {/* Desktop comparison table */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-3">
          <div></div>
          <div className="text-center">
            <div className="border border-border py-4 bg-card">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Standard
              </p>
              <h3 className="text-lg font-semibold text-foreground">
                CDW INSURANCE
              </h3>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-primary py-4 relative">
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

        <div className="border border-border overflow-hidden bg-card">
          {features.map((feature, index) => (
            <div
              key={feature.name}
              className={`grid grid-cols-3 items-center ${index !== features.length - 1 ? "border-b border-border" : ""
                }`}
            >
              <div className="text-sm font-medium text-foreground p-4">
                {feature.name}
              </div>
              <div className="text-center text-sm p-4 font-medium">
                {renderValue(feature.standard, true, feature.isPremiumHighlight)}
              </div>
              <div className="text-center text-sm font-medium p-4 bg-primary/10">
                {renderValue(feature.premium, false, feature.isPremiumHighlight)}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 mt-4">
          <div></div>
          <div></div>
          <div className="text-center flex items-center justify-around">
            <p className="text-sm text-muted-foreground">Add for only</p>
            <p className="text-xl font-semibold text-muted-foreground">
              +$12{" "}
              <span className="text-sm font-normal text-muted-foreground">
                /day
              </span>
            </p>
          </div>
        </div>

        {isSelectable && (
          <div className="grid grid-cols-3 mt-6 gap-4">
            <div></div>
            <div>
              <Button
                variant="outline"
                className={`w-full rounded-none py-6 hover:bg-primary ${selectedCoverage === "STANDARD"
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
            <div>
              <Button
                className={`w-full bg-primary text-primary-foreground rounded-none py-6 hover:opacity-90 ${selectedCoverage === "PREMIUM"
                    ? "ring-2 ring-offset-2 ring-primary"
                    : ""
                  }`}
                onClick={() => {
                  if (onSelectCoverage) {
                    onSelectCoverage("PREMIUM");
                  }
                }}
              >
                Select Package
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile package cards */}
      <div className="space-y-6 lg:hidden">
        <div className="border border-border overflow-hidden bg-card">
          <div className="border-b border-border bg-card px-4 py-4 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Standard
            </p>
            <h3 className="text-lg font-semibold text-foreground">
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
                className={`w-full rounded-none py-6 hover:bg-primary ${selectedCoverage === "STANDARD"
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

        <div className="border border-primary overflow-hidden bg-card">
          <div className="bg-primary px-4 py-4 text-center relative">
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
                    feature.premium,
                    false,
                    feature.isPremiumHighlight,
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-3 border-t border-border px-4 py-4 text-center">
            <p className="text-sm text-muted-foreground">Add for only</p>
            <p className="text-xl font-semibold text-muted-foreground">
              +$12{" "}
              <span className="text-sm font-normal text-muted-foreground">
                /day
              </span>
            </p>
            {isSelectable && (
              <Button
                className={`w-full bg-primary text-primary-foreground rounded-none py-6 hover:opacity-90 ${selectedCoverage === "PREMIUM"
                    ? "ring-2 ring-offset-2 ring-primary"
                    : ""
                  }`}
                onClick={() => {
                  if (onSelectCoverage) {
                    onSelectCoverage("PREMIUM");
                  }
                }}
              >
                Select Package
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
