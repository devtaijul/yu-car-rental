"use client";

import { useState, useCallback, useTransition, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useBooking } from "@/context/BookingContext";
import { Car } from "@/generated/prisma/client";
import { CoverageType } from "@/generated/prisma/enums";
import { getAvailableCars, getCarBySlug, getCarBlockedDates } from "@/actions/query";
import { LocationStepValues } from "@/lib/validation/system.schema";
import BookingSteps from "../BookingSteps";
import Header from "../Header";
import { HeaderSpace } from "../HeaderSpace";
import { StepLocation } from "../booking/StepLocation";
import { SelectCarInline } from "../booking/SelectCarInline";
import StepCoverageExtras from "../booking/StepCoverageExtras";
import BookingSummaryPage from "./BookingSummaryPage";

function buildQuery(params: Record<string, string | undefined>) {
  const filtered = Object.entries(params).filter(
    (entry): entry is [string, string] => entry[1] !== undefined && entry[1] !== "",
  );
  return new URLSearchParams(filtered).toString();
}

export default function ReserveFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [selectedCarName, setSelectedCarName] = useState<string | undefined>();
  const [selectedCoverage, setSelectedCoverage] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const [isRestoring, setIsRestoring] = useState(false);
  const [blockedRanges, setBlockedRanges] = useState<{ start: string; end: string }[]>([]);
  const { booking, setBooking } = useBooking();
  const restoredRef = useRef(false);
  const preselectedCarSlugRef = useRef<string | null>(null);

  // Update URL query params without navigation
  const updateQuery = useCallback(
    (params: Record<string, string | undefined>) => {
      const currentParams = Object.fromEntries(searchParams.entries());
      const merged = { ...currentParams, ...params };
      const query = buildQuery(merged);
      router.replace(`?${query}`, { scroll: false });
    },
    [router, searchParams],
  );

  // Restore state from query params on mount/reload
  useEffect(() => {
    if (restoredRef.current) return;
    restoredRef.current = true;

    const stepParam = searchParams.get("step");
    const pickupDate = searchParams.get("pickupDate");
    const dropoffDate = searchParams.get("dropoffDate");
    const pickupTime = searchParams.get("pickupTime");
    const dropoffTime = searchParams.get("dropoffTime");
    const pickupLocation = searchParams.get("pickupLocation");
    const dropoffLocation = searchParams.get("dropoffLocation");
    const carSlug = searchParams.get("carSlug");
    const coverage = searchParams.get("coverage") as CoverageType | null;
    const extrasParam = searchParams.get("extras");

    const savedStep = stepParam ? parseInt(stepParam, 10) : 1;

    // Pre-populate from homepage links (no step param, just carSlug/coverage)
    if (savedStep <= 1) {
      const presets: Partial<{ carSlug: string; coverage: CoverageType }> = {};
      if (carSlug) {
        presets.carSlug = carSlug;
        preselectedCarSlugRef.current = carSlug;
        // Fetch blocked dates and car name for preselected car
        getCarBlockedDates(carSlug).then((result) => {
          if (result.success) {
            setBlockedRanges(result.blockedRanges);
          }
        });
        getCarBySlug(carSlug).then((result) => {
          if (result.success && result.car) {
            setSelectedCarName(result.car.name);
          }
        });
      }
      if (coverage) presets.coverage = coverage;
      if (Object.keys(presets).length > 0) setBooking(presets);
      if (coverage) setSelectedCoverage(coverage);
      return;
    }

    if (!pickupDate || !dropoffDate) return;

    // Restore booking context
    setBooking({
      pickupDate: new Date(pickupDate),
      dropoffDate: new Date(dropoffDate),
      pickupTime: pickupTime || "10:00",
      dropoffTime: dropoffTime || "10:00",
      pickupLocation: pickupLocation || "",
      dropoffLocation: dropoffLocation || "",
      ...(carSlug ? { carSlug } : {}),
      ...(coverage ? { coverage } : {}),
      ...(extrasParam ? { extras: JSON.parse(extrasParam) } : {}),
    });

    // Re-fetch data and restore step
    setIsRestoring(true);
    const locationData = {
      pickupDate,
      dropoffDate,
      pickupTime: pickupTime || "10:00",
      dropoffTime: dropoffTime || "10:00",
      pickupLocation: pickupLocation || "",
      dropoffLocation: dropoffLocation || "",
    };

    (async () => {
      try {
        // Always fetch cars for step >= 2
        const carsResult = await getAvailableCars({ locationData });
        if (carsResult.success) {
          setCars(carsResult.cars);
        }

        // Fetch selected car for step >= 3
        if (carSlug && savedStep >= 3) {
          const carResult = await getCarBySlug(carSlug);
          if (carResult.success && carResult.car) {
            setSelectedCar(carResult.car);
            setSelectedCarName(carResult.car.name);
          }
        }

        if (coverage) {
          setSelectedCoverage(coverage);
        }

        setStep(savedStep);
      } catch {
        setStep(1);
      } finally {
        setIsRestoring(false);
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLocationSubmit = useCallback(
    (data: LocationStepValues) => {
      setBooking(data);
      startTransition(async () => {
        const locationData = {
          pickupDate: data.pickupDate.toISOString(),
          dropoffDate: data.dropoffDate.toISOString(),
          pickupTime: data.pickupTime,
          dropoffTime: data.dropoffTime,
          pickupLocation: data.pickupLocation,
          dropoffLocation: data.dropoffLocation,
        };
        const result = await getAvailableCars({ locationData });
        if (result.success) {
          setCars(result.cars);

          // Auto-select car if preselected from homepage
          const preSlug = preselectedCarSlugRef.current;
          if (preSlug) {
            const preselected = result.cars.find((c) => c.slug === preSlug);
            if (preselected) {
              preselectedCarSlugRef.current = null;
              setSelectedCar(preselected);
              setSelectedCarName(preselected.name);
              setBooking({ carSlug: preselected.slug });
              setStep(3);
              updateQuery({
                step: "3",
                pickupDate: locationData.pickupDate,
                dropoffDate: locationData.dropoffDate,
                pickupTime: locationData.pickupTime,
                dropoffTime: locationData.dropoffTime,
                pickupLocation: locationData.pickupLocation,
                dropoffLocation: locationData.dropoffLocation,
                carSlug: preselected.slug,
              });
              return;
            }
          }

          setStep(2);
          updateQuery({
            step: "2",
            pickupDate: locationData.pickupDate,
            dropoffDate: locationData.dropoffDate,
            pickupTime: locationData.pickupTime,
            dropoffTime: locationData.dropoffTime,
            pickupLocation: locationData.pickupLocation,
            dropoffLocation: locationData.dropoffLocation,
          });
        }
      });
    },
    [setBooking, updateQuery],
  );

  const handleCarSelect = useCallback(
    (car: Car) => {
      setSelectedCar(car);
      setSelectedCarName(car.name);
      setBooking({ carSlug: car.slug });
      setStep(3);
      updateQuery({ step: "3", carSlug: car.slug });
    },
    [setBooking, updateQuery],
  );

  const handleCoverageSubmit = useCallback(
    (coverage: CoverageType, extras: Record<string, number>) => {
      setBooking({ coverage, extras });
      setSelectedCoverage(coverage);
      setStep(4);
      updateQuery({
        step: "4",
        coverage,
        extras: JSON.stringify(extras),
      });
    },
    [setBooking, updateQuery],
  );

  const handleBack = useCallback(() => {
    setStep((prev) => {
      const newStep = Math.max(1, prev - 1);
      updateQuery({ step: String(newStep) });
      return newStep;
    });
  }, [updateQuery]);

  if (isRestoring) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <HeaderSpace />
        <div className="container mx-auto px-4 py-8">
          <BookingSteps currentStep={step} carName={selectedCarName} coverage={selectedCoverage} />
          <div className="flex items-center justify-center py-20">
            <p className="text-muted-foreground">Restoring your booking...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeaderSpace />
      <div className="container mx-auto px-4 py-8">
        <BookingSteps currentStep={step} carName={selectedCarName} coverage={selectedCoverage} />

        {step === 1 && (
          <StepLocation
            onSubmit={handleLocationSubmit}
            loading={isPending}
            blockedRanges={blockedRanges}
          />
        )}

        {step === 2 && (
          <SelectCarInline
            cars={cars}
            onSelect={handleCarSelect}
            onBack={handleBack}
            pickupDate={booking.pickupDate ? new Date(booking.pickupDate) : undefined}
            dropoffDate={booking.dropoffDate ? new Date(booking.dropoffDate) : undefined}
            pickupTime={booking.pickupTime}
            dropoffTime={booking.dropoffTime}
            onSearchAgain={(data) => {
              setBooking(data);
              startTransition(async () => {
                const locationData = {
                  pickupDate: data.pickupDate.toISOString(),
                  dropoffDate: data.dropoffDate.toISOString(),
                  pickupTime: data.pickupTime,
                  dropoffTime: data.dropoffTime,
                  pickupLocation: booking.pickupLocation as string,
                  dropoffLocation: booking.dropoffLocation as string,
                };
                const result = await getAvailableCars({ locationData });
                if (result.success) {
                  setCars(result.cars);
                  updateQuery({
                    pickupDate: locationData.pickupDate,
                    dropoffDate: locationData.dropoffDate,
                    pickupTime: locationData.pickupTime,
                    dropoffTime: locationData.dropoffTime,
                  });
                }
              });
            }}
          />
        )}

        {step === 3 && selectedCar && (
          <StepCoverageExtras
            car_slug={selectedCar.slug}
            carSeats={selectedCar.seats}
            onContinue={handleCoverageSubmit}
            onBack={handleBack}
          />
        )}

        {step === 4 && selectedCar && (
          <BookingSummaryPage car={selectedCar} onBack={handleBack} />
        )}
      </div>
    </div>
  );
}
