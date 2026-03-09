import { MapPin, Car, Shield, FileCheck } from "lucide-react";

interface BookingStepsProps {
  currentStep: number;
  carName?: string;
  coverage?: string;
}

const steps = [
  { id: 1, name: "Location & Dates", icon: MapPin },
  { id: 2, name: "Choose Your Best Car", icon: Car },
  { id: 3, name: "Coverage Options", icon: Shield },
  { id: 4, name: "Confirmation", icon: FileCheck },
];

const BookingSteps = ({ currentStep, carName, coverage }: BookingStepsProps) => {
  const getStepLabel = (step: (typeof steps)[number]) => {
    if (step.id === 2 && carName) return carName;
    if (step.id === 3 && coverage) {
      return coverage === "PREMIUM" ? "Premium" : "Standard";
    }

    return step.name;
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-6">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;

        return (
          <div key={step.id} className="flex items-center gap-2">
            <div
              className={`booking-step ${
                isActive
                  ? "booking-step-active"
                  : isCompleted
                    ? "text-primary"
                    : "booking-step-inactive"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{getStepLabel(step)}</span>
            </div>
            {index < steps.length - 1 && (
              <span className="text-muted-foreground mx-2">&gt;</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BookingSteps;
