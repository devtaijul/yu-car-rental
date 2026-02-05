import { useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BookingSteps from "@/components/BookingSteps";
import CarCard from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import {
  MapPin,
  Calendar as CalendarIcon,
  Clock,
  Search,
  Check,
  X,
} from "lucide-react";
import { cars } from "@/data/cars";
import { useRouter, useSearchParams } from "next/navigation";

const Booking = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedCar = searchParams.get("car");

  const [step, setStep] = useState(preselectedCar ? 2 : 1);
  const [selectedCar, setSelectedCar] = useState<string | null>(preselectedCar);
  const [selectedCoverage, setSelectedCoverage] = useState<
    "standard" | "premium"
  >("standard");
  const [pickupDate, setPickupDate] = useState<Date>();
  const [dropoffDate, setDropoffDate] = useState<Date>();

  const coverageOptions = {
    standard: {
      name: "CDW INSURANCE",
      deductible: "$750",
      deposit: "$750",
      additionalDriver: "$8 / DAY",
      tankRack: "$5 / DAY",
      flatTire: "$35",
      cancellation: "$75",
      afterHours: false,
      discounts: false,
      allDamage: false,
      thirdParty: true,
    },
    premium: {
      name: "100% COVERAGE",
      deductible: "$0",
      deposit: "$0",
      additionalDriver: "INCLUDED",
      tankRack: "INCLUDED",
      flatTire: "INCLUDED",
      cancellation: "$0",
      afterHours: true,
      discounts: true,
      allDamage: true,
      thirdParty: true,
    },
  };

  const handleSelectCar = (carId: string) => {
    setSelectedCar(carId);
    setStep(3);
  };

  const handleSelectCoverage = (coverage: "standard" | "premium") => {
    setSelectedCoverage(coverage);
  };

  const handleContinue = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      router.push("/confirmation");
    }
  };

  const selectedCarData = cars.find((c) => c.id === selectedCar);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <BookingSteps currentStep={step} />

        {/* Step 1: Location & Dates */}
        {step === 1 && (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-display font-semibold mb-8">
              Location & Dates
            </h1>

            {/* Map Placeholder */}
            <div className="w-full h-64 bg-muted rounded-xl mb-8 flex items-center justify-center">
              <span className="text-muted-foreground">Map View</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">
                  Pickup Location
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Select Location" className="pl-10" />
                </div>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">
                  Return Location
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Select Location" className="pl-10" />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">
                  Pickup Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {pickupDate ? format(pickupDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-card">
                    <Calendar
                      mode="single"
                      selected={pickupDate}
                      onSelect={setPickupDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">
                  Time
                </Label>
                <Select defaultValue="22:30">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    {[
                      "08:00",
                      "09:00",
                      "10:00",
                      "11:00",
                      "12:00",
                      "13:00",
                      "14:00",
                      "15:00",
                      "16:00",
                      "17:00",
                      "18:00",
                      "19:00",
                      "20:00",
                      "21:00",
                      "22:00",
                      "22:30",
                    ].map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">
                  Return Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {dropoffDate ? format(dropoffDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-card">
                    <Calendar
                      mode="single"
                      selected={dropoffDate}
                      onSelect={setDropoffDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="ghost" onClick={() => setStep(2)}>
                Go To Step 2
              </Button>
              <Button
                onClick={() => setStep(2)}
                className="gradient-teal text-primary-foreground"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Choose Car */}
        {step === 2 && (
          <div>
            <h1 className="text-2xl font-display font-semibold mb-8">
              Choose Your Best Car
            </h1>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Select>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Vehicle Type" />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="hatchback">Hatchback</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Car Body Type" />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="compact">Compact</SelectItem>
                  <SelectItem value="full">Full Size</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Car Seats" />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="4">4 Seats</SelectItem>
                  <SelectItem value="5">5 Seats</SelectItem>
                  <SelectItem value="7">7 Seats</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Car Engine (Cc)" />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="1.6">1.6L</SelectItem>
                  <SelectItem value="2.0">2.0L</SelectItem>
                  <SelectItem value="3.0">3.0L+</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Price ($)" />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="low">$0 - $500</SelectItem>
                  <SelectItem value="mid">$500 - $700</SelectItem>
                  <SelectItem value="high">$700+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Car Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {cars.map((car) => (
                <CarCard
                  key={car.id}
                  name={car.name}
                  image={car.image}
                  price={car.price}
                  specs={car.specs}
                  variant="dark"
                  onRent={() => handleSelectCar(car.id)}
                />
              ))}
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="ghost" onClick={() => setStep(3)}>
                Go To Step 3
              </Button>
              <Button
                onClick={() => setStep(3)}
                className="gradient-teal text-primary-foreground"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Coverage Options */}
        {step === 3 && (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-display font-semibold mb-8">
              Coverage Options
            </h1>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left py-4"></th>
                    <th className="text-center py-4 px-4">
                      <div
                        className={`rounded-xl p-4 ${selectedCoverage === "standard" ? "bg-muted" : ""}`}
                      >
                        <div className="text-sm text-muted-foreground">
                          Standard
                        </div>
                        <div className="font-semibold">CDW INSURANCE</div>
                      </div>
                    </th>
                    <th className="text-center py-4 px-4">
                      <div
                        className={`rounded-xl p-4 gradient-teal text-primary-foreground`}
                      >
                        <div className="text-xs bg-primary-foreground/20 rounded px-2 py-0.5 inline-block mb-1">
                          RECOMMENDED
                        </div>
                        <div className="text-sm opacity-80">Premium</div>
                        <div className="font-semibold">100% COVERAGE</div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    {
                      label: "Deductible Risk",
                      standard: "$750",
                      premium: "$0",
                    },
                    {
                      label: "Security Deposit",
                      standard: "$750",
                      premium: "$0",
                    },
                    {
                      label: "Additional Driver",
                      standard: "$8 / DAY",
                      premium: "INCLUDED",
                    },
                    {
                      label: "Tank Rack",
                      standard: "$5 / DAY",
                      premium: "INCLUDED",
                    },
                    {
                      label: "Flat Tire Service",
                      standard: "$35",
                      premium: "INCLUDED",
                    },
                    {
                      label: "Cancellation Fee",
                      standard: "$75",
                      premium: "$0",
                    },
                    {
                      label: "After-hours Pickup",
                      standard: false,
                      premium: true,
                    },
                    {
                      label: "Discount Coupons",
                      standard: false,
                      premium: true,
                    },
                    {
                      label: "All Damage Covered",
                      standard: false,
                      premium: true,
                    },
                    {
                      label: "Third Party Damage",
                      standard: true,
                      premium: true,
                    },
                  ].map((row, index) => (
                    <tr key={index}>
                      <td className="py-4 font-medium">{row.label}</td>
                      <td className="py-4 text-center">
                        {typeof row.standard === "boolean" ? (
                          row.standard ? (
                            <Check className="h-5 w-5 text-primary mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-destructive mx-auto" />
                          )
                        ) : (
                          <span className="text-destructive">
                            {row.standard}
                          </span>
                        )}
                      </td>
                      <td className="py-4 text-center">
                        {typeof row.premium === "boolean" ? (
                          row.premium ? (
                            <Check className="h-5 w-5 text-primary mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-destructive mx-auto" />
                          )
                        ) : (
                          <span className="text-primary">{row.premium}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">
                  Add for only
                </div>
                <div className="text-primary font-semibold">
                  +$15 <span className="text-sm font-normal">/day</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                className="min-w-[180px]"
                onClick={() => handleSelectCoverage("standard")}
              >
                Select Package
              </Button>
              <Button
                className="min-w-[180px] gradient-teal text-primary-foreground"
                onClick={() => handleSelectCoverage("premium")}
              >
                Select Package
              </Button>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <Button variant="ghost" onClick={() => setStep(4)}>
                Go To Step 4
              </Button>
              <Button
                onClick={() => setStep(4)}
                className="gradient-teal text-primary-foreground"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Booking Summary */}
              <div>
                <h2 className="text-xl font-display font-semibold mb-6">
                  Booking Summary
                </h2>
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                  {selectedCarData && (
                    <>
                      <div className="h-48 gradient-teal flex items-center justify-center">
                        <img
                          src={selectedCarData.image}
                          alt={selectedCarData.name}
                          className="max-h-full object-contain"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-1">
                          {selectedCarData.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          e.g. Volkswagen Tiguan or similar
                        </p>
                        <div className="flex gap-2 mb-6">
                          <span className="text-xs px-2 py-1 bg-muted rounded">
                            Automatic
                          </span>
                          <span className="text-xs px-2 py-1 bg-muted rounded">
                            {selectedCarData.specs.seats} Seats
                          </span>
                          <span className="text-xs px-2 py-1 bg-muted rounded">
                            Eco-Friendly
                          </span>
                        </div>

                        <div className="space-y-3 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              Pick-Up Location:
                            </span>
                            <span>Airport</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              Pick-Up Date:
                            </span>
                            <span>Thu, Jan 15, 2025 at 10:00</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              Drop-Off Location:
                            </span>
                            <span>Airport</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              Drop-Off Date:
                            </span>
                            <span>Sun, Jan 18, 2025 at 10:00</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              Duration:
                            </span>
                            <span>3 days</span>
                          </div>
                        </div>

                        <div className="border-t border-border mt-6 pt-6">
                          <h4 className="font-semibold mb-4">
                            Price Breakdown
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Base rental (€50/day × 3 days)</span>
                              <span>€165.00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>100% Coverage Package (€15/day)</span>
                              <span>€45.00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Child seat (€5/day × 3 days)</span>
                              <span>€15.00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Additional driver</span>
                              <span className="text-primary">FREE</span>
                            </div>
                            <div className="border-t border-border pt-2 mt-2">
                              <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>€225.00</span>
                              </div>
                              <div className="flex justify-between text-muted-foreground">
                                <span>VAT (21%)</span>
                                <span>€20.00</span>
                              </div>
                            </div>
                            <div className="flex justify-between font-semibold text-lg pt-2">
                              <span>Total</span>
                              <span className="text-primary">€245.00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Customer Information */}
              <div>
                <h2 className="text-xl font-display font-semibold mb-6">
                  Customer Information
                </h2>
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="font-semibold mb-4">Personal Details</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label className="text-sm text-muted-foreground">
                        First Name
                      </Label>
                      <Input placeholder="John" />
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">
                        Last Name
                      </Label>
                      <Input placeholder="Doe" />
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">
                        Email Address
                      </Label>
                      <Input placeholder="john.doe@email.com" type="email" />
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">
                        Phone Number
                      </Label>
                      <Input placeholder="+31 6 12345678" type="tel" />
                    </div>
                  </div>

                  <h3 className="font-semibold mb-4">
                    Driver's License Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label className="text-sm text-muted-foreground">
                        Date Of Birth
                      </Label>
                      <Input type="date" />
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">
                        Driver's License Number
                      </Label>
                      <Input placeholder="1234567890" />
                    </div>
                  </div>

                  <h3 className="font-semibold mb-4">Payment Information</h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">
                        Card Number
                      </Label>
                      <Input placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm text-muted-foreground">
                          Expiry Date
                        </Label>
                        <Input placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">
                          CVV
                        </Label>
                        <Input placeholder="123" />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">
                        Cardholder Name
                      </Label>
                      <Input placeholder="John Doe" />
                    </div>
                  </div>

                  <Button
                    className="w-full mt-8 gradient-teal text-primary-foreground py-6"
                    onClick={() => router.push("/confirmation")}
                  >
                    Confirm & Pay Securely - €245.00
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Booking;
