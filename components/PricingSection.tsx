import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const PricingSection = () => {
  const features = [
    { name: "Deductible Risk", standard: "$650", premium: "$0", isPremiumHighlight: true },
    { name: "Security Deposit", standard: "$650", premium: "$0", isPremiumHighlight: true },
    { name: "Additional Driver", standard: "$10 / DAY", premium: "INCLUDED", isPremiumHighlight: false },
    { name: "Tank Rack", standard: "$5", premium: "INCLUDED", isPremiumHighlight: false },
    { name: "Flat Tire Service", standard: "$40", premium: "INCLUDED", isPremiumHighlight: false },
    { name: "Cancellation Fee", standard: "$80", premium: "$0", isPremiumHighlight: true },
    { name: "After-hours Pickup", standard: false, premium: true, isPremiumHighlight: false },
    { name: "Discount Coupons", standard: false, premium: true, isPremiumHighlight: false },
    { name: "All Damage Covered", standard: false, premium: true, isPremiumHighlight: false },
    { name: "Third Party Damage", standard: true, premium: true, isPremiumHighlight: false },
  ];

  const renderValue = (value: string | boolean, isStandard: boolean, isHighlight: boolean) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-5 w-5 text-primary mx-auto" />
      ) : (
        <X className="h-5 w-5 text-destructive mx-auto" />
      );
    }
    return (
      <span className={`${isStandard && isHighlight ? "text-destructive font-medium" : isHighlight ? "text-primary font-medium" : "text-foreground"}`}>
        {value}
      </span>
    );
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-badge mb-4">
            <Shield className="h-3 w-3" />
            Coverage Options
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-semibold">
            Travel with complete peace of mind
          </h2>
        </div>

        {/* Pricing Table */}
        <div className="w-full max-w-4xl mx-auto">
          {/* Desktop View */}
          <div className="hidden md:block">
            {/* Header Row */}
            <div className="grid grid-cols-3 mb-0">
              <div></div>
              <div className="text-center">
                <div className="border border-border rounded-t-xl py-4 bg-card">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Standard</p>
                  <h3 className="text-lg font-semibold text-foreground">CDW INSURANCE</h3>
                </div>
              </div>
              <div className="text-center">
                <div className="gradient-teal rounded-t-xl py-4 relative">
                  <span className="absolute top-2 right-4 text-[10px] text-primary-foreground/80 uppercase tracking-wider">
                    Recommended
                  </span>
                  <p className="text-xs text-primary-foreground/80 uppercase tracking-wider mb-1">Premium</p>
                  <h3 className="text-lg font-semibold text-primary-foreground">100% COVERAGE</h3>
                </div>
              </div>
            </div>

            {/* Feature Rows */}
            <div className="border border-border rounded-b-xl overflow-hidden bg-card">
              {features.map((feature, index) => (
                <div
                  key={feature.name}
                  className={`grid grid-cols-3 items-center py-4 px-6 ${
                    index !== features.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="text-sm font-medium text-foreground">{feature.name}</div>
                  <div className="text-center text-sm">
                    {renderValue(feature.standard, true, feature.isPremiumHighlight)}
                  </div>
                  <div className="text-center text-sm font-medium">
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
                <p className="text-xl font-semibold text-foreground">+$12 <span className="text-sm font-normal text-muted-foreground">/day</span></p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 mt-6 gap-4">
              <div></div>
              <div>
                <Button
                  variant="outline"
                  className="w-full rounded-full py-6"
                >
                  Select Package
                </Button>
              </div>
              <div>
                <Button
                  className="w-full gradient-teal text-primary-foreground rounded-full py-6 hover:opacity-90"
                >
                  Select Package
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-6">
            {/* Standard Package */}
            <div className="border border-border rounded-xl overflow-hidden bg-card">
              <div className="py-4 px-4 bg-card border-b border-border">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 text-center">Standard</p>
                <h3 className="text-lg font-semibold text-foreground text-center">CDW INSURANCE</h3>
              </div>
              <div className="divide-y divide-border">
                {features.map((feature) => (
                  <div key={feature.name} className="flex justify-between items-center py-3 px-4">
                    <span className="text-sm text-muted-foreground">{feature.name}</span>
                    <span className="text-sm">
                      {renderValue(feature.standard, true, feature.isPremiumHighlight)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="p-4">
                <Button variant="outline" className="w-full rounded-full py-5">
                  Select Package
                </Button>
              </div>
            </div>

            {/* Premium Package */}
            <div className="border-2 border-primary rounded-xl overflow-hidden bg-card relative">
              <div className="absolute top-2 right-2">
                <span className="text-[10px] bg-primary text-primary-foreground px-2 py-1 rounded-full uppercase tracking-wider">
                  Recommended
                </span>
              </div>
              <div className="gradient-teal py-4 px-4">
                <p className="text-xs text-primary-foreground/80 uppercase tracking-wider mb-1 text-center">Premium</p>
                <h3 className="text-lg font-semibold text-primary-foreground text-center">100% COVERAGE</h3>
              </div>
              <div className="divide-y divide-border">
                {features.map((feature) => (
                  <div key={feature.name} className="flex justify-between items-center py-3 px-4">
                    <span className="text-sm text-muted-foreground">{feature.name}</span>
                    <span className="text-sm font-medium">
                      {renderValue(feature.premium, false, feature.isPremiumHighlight)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">Add for only</p>
                <p className="text-xl font-semibold text-foreground mb-4">+$12 <span className="text-sm font-normal text-muted-foreground">/day</span></p>
                <Button className="w-full gradient-teal text-primary-foreground rounded-full py-5 hover:opacity-90">
                  Select Package
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
