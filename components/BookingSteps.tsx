"use client";

import { useEffect, useRef } from "react";
import { MapPin, Car, Shield, FileCheck } from "lucide-react";

interface BookingStepsProps {
  currentStep: number;
}

const steps = [
  { id: 1, name: "Location & Dates", icon: MapPin },
  { id: 2, name: "Choose Your Best Car", icon: Car },
  { id: 3, name: "Coverage Options", icon: Shield },
  { id: 4, name: "Confirmation", icon: FileCheck },
];

const BookingSteps = ({ currentStep }: BookingStepsProps) => {
  const stepRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    if (!window.matchMedia("(max-width: 767px)").matches) return;

    const activeStep = stepRefs.current[currentStep];

    if (!activeStep) return;

    const frame = window.requestAnimationFrame(() => {
      activeStep.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [currentStep]);

  return (
    <div className="overflow-x-auto py-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:overflow-visible">
      <div className="flex min-w-max items-center gap-4 px-1 md:min-w-0 md:flex-wrap md:justify-center">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <div
              key={step.id}
              ref={(element) => {
                stepRefs.current[step.id] = element;
              }}
              className="flex shrink-0 items-center gap-2"
            >
              <div
                className={`booking-step whitespace-nowrap ${
                  isActive
                    ? "booking-step-active"
                    : isCompleted
                      ? "text-primary"
                      : "booking-step-inactive"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{step.name}</span>
              </div>
              {index < steps.length - 1 && (
                <span className="mx-2 shrink-0 text-muted-foreground">
                  &gt;
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingSteps;
