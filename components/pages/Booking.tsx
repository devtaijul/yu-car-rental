"use client";

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
  Shield,
  Car,
} from "lucide-react";
import { cars } from "@/data/cars";
import { useRouter, useSearchParams } from "next/navigation";
import { HeaderSpace } from "../HeaderSpace";
import Image from "next/image";
import { PricingTable } from "../PricingTable";
import { Icons } from "../icons";
import { IconName } from "@/config/icons.config";
import { times } from "@/data/utils";

const extras = [
  {
    id: "baby-seat-small",
    icon: "face_icon",
    name: "BABY SEAT",
    description: "Baby <18 months",
    price: 5,
  },
  {
    id: "baby-seat-large",
    icon: "face_icon",
    name: "BABY SEAT",
    description: ">18 months. (9-18 kg)",
    price: 5,
  },
  {
    id: "coolbox",
    icon: "face_icon",
    name: "COOLBOX",
    description:
      "Ideal for your groceries or a day at the beach. Capacity 24 liters. Space for 6x 1.5 liter bottles.",
    price: 4,
  },
  {
    id: "key-secure-box",
    icon: "face_icon",
    name: "KEY SECURE BOX",
    description:
      "Perfect for divers or snorkelers to safely store their car key.",
    price: 2.5,
  },
];

const Booking = () => {
  const [extraQuantities, setExtraQuantities] = useState<
    Record<string, number>
  >(Object.fromEntries(extras.map((e) => [e.id, 0])));
  const [selectedExtras, setSelectedExtras] = useState<Record<string, boolean>>(
    Object.fromEntries(extras.map((e) => [e.id, false])),
  );

  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedCar = searchParams.get("car");

  const [step, setStep] = useState(preselectedCar ? 2 : 1);
  const [selectedCar, setSelectedCar] = useState<string | null>("5");
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

  const handleExtraQuantity = (id: string, delta: number) => {
    setExtraQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta),
    }));
  };

  const handleToggleExtra = (id: string) => {
    setSelectedExtras((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const selectedCarData = cars.find((c) => c.id === selectedCar);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeaderSpace />

      <div className="container mx-auto px-4 py-8">
        <BookingSteps currentStep={step} />

        {/* Step 1: Location & Dates */}
        {step === 1 && (
          <div className=" mx-auto">
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

            <div className="grid md:grid-cols-4 gap-6 mb-8">
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
                    {times.map((time) => (
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
              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">
                  Time
                </Label>
                <Select defaultValue="22:30">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    {times.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <SelectTrigger className="w-40">
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
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Car Body Type" />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="compact">Compact</SelectItem>
                  <SelectItem value="full">Full Size</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-40">
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
                <SelectTrigger className="w-48">
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
                <SelectTrigger className="w-35">
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
              {/* {cars.map((car) => (
                <CarCard
                  id={car.id}
                  key={car.id}
                  name={car.name}
                  image={car.image}
                  price={car.price}
                  specs={car.specs}
                  variant="dark"
                  onRent={() => handleSelectCar(car.id)}
                />
              ))} */}
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

            {/*  <PricingTable /> */}

            {/* Extras Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-display font-semibold mb-6">
                Choose your extra&apos;s
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {extras.map((extra) => {
                  const qty = extraQuantities[extra.id] || 0;
                  const added = selectedExtras[extra.id];
                  return (
                    <div
                      key={extra.id}
                      className={`border p-5 flex flex-col justify-between gap-3 transition-all ${added ? "border-primary" : "border-border"}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="w-15 h-15 rounded-3xl bg-primary/20 flex items-center justify-center">
                          <span className="text-2xl">
                            <Icons name={extra.icon as IconName} />
                          </span>
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
                      <div>
                        <h4 className="font-black  text-2xl tracking-wide text-black">
                          {extra.name}
                        </h4>
                        <p className="text-xs text- mt-1">
                          {extra.description}
                        </p>
                      </div>
                      <div className="flex bg-primary/20 items-center gap-2 mt-1 py-2 px-3">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider flex-1">
                          Quantity
                        </span>
                        <button
                          onClick={() => handleExtraQuantity(extra.id, -1)}
                          className="w-7 h-7  bg-primary/90 text-white text-lg font-bold flex items-center justify-center hover:bg-muted/80 transition-colors"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-medium">
                          {qty}
                        </span>
                        <button
                          onClick={() => handleExtraQuantity(extra.id, 1)}
                          className="w-7 h-7  bg-primary/90 text-white text-lg font-bold flex items-center justify-center hover:bg-muted/80 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <Button
                        className={`w-full  text-xs font-bold tracking-widest py-5 transition-all ${
                          added
                            ? "bg-primary/20 text-primary border border-primary hover:bg-primary/30"
                            : "bg-primary text-primary-foreground hover:opacity-90"
                        }`}
                        onClick={() => handleToggleExtra(extra.id)}
                      >
                        {added ? "✓ ADDED" : "ADD TO SELECTION"}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <Button variant="ghost" onClick={() => setStep(4)}>
                Go To Step 4
              </Button>
              <Button
                onClick={() => setStep(4)}
                className="bg-primary text-primary-foreground"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div className=" mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Booking Summary - Left Column */}
              <div>
                <h2 className="text-xl font-display font-semibold mb-6">
                  Booking Summary
                </h2>
                <div className="bg-card border border-border  overflow-hidden">
                  {selectedCarData && (
                    <>
                      <div className="h-48 gradient-teal flex items-center justify-center">
                        <Image
                          src={selectedCarData.image}
                          alt={selectedCarData.name}
                          className="max-h-full object-contain"
                          width={500}
                          height={500}
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
                          <span className="text-xs px-2 py-1 bg-primary/10 text-primary">
                            Automatic
                          </span>
                          <span className="text-xs px-2 py-1 bg-primary/10 text-primary">
                            {selectedCarData.specs.seats} Seats
                          </span>
                          <span className="text-xs px-2 py-1 bg-primary/10 text-primary">
                            Eco-Friendly
                          </span>
                        </div>

                        <div className="space-y-3 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            <div>
                              <span className="font-medium">
                                Pick-Up Location
                              </span>
                              <p className="text-muted-foreground">Airport</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-primary" />
                            <div>
                              <span className="font-medium">Pick-Up Date</span>
                              <p className="text-muted-foreground">
                                Thu, Jan 15, 2026 at 10:00
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            <div>
                              <span className="font-medium">
                                Drop-Off Location
                              </span>
                              <p className="text-muted-foreground">Airport</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-primary" />
                            <div>
                              <span className="font-medium">Drop-Off Date</span>
                              <p className="text-muted-foreground">
                                Sun, Jan 18, 2026 at 10:00
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <div>
                              <span className="font-medium">Duration</span>
                              <p className="text-muted-foreground">3 days</p>
                            </div>
                          </div>
                        </div>

                        {/* Price Breakdown */}
                        <div className="border-t border-border mt-6 pt-6">
                          <h4 className="font-semibold mb-4">
                            Price Breakdown
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Base rental ($55/day × 3 days)</span>
                              <span>$165.00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>100% Coverage Package ($12/day)</span>
                              <span>$45.00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Child seat ($5/day × 3 days)</span>
                              <span>$15.00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Additional driver</span>
                              <span className="text-primary font-medium">
                                FREE
                              </span>
                            </div>
                            <div className="border-t border-border pt-2 mt-2">
                              <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>$225.00</span>
                              </div>
                              <div className="flex justify-between text-muted-foreground">
                                <span>VAT (6%)</span>
                                <span>$20.00</span>
                              </div>
                            </div>
                            <div className="flex justify-between font-semibold text-lg pt-2">
                              <span>Total</span>
                              <span className="text-primary">$245.00</span>
                            </div>
                          </div>
                        </div>

                        {/* No Hidden Fees */}
                        <div className="bg-[#2F6B7F]/10 border border-[#2F6B7F] rounded-xl p-4 mt-6 text-[#2F6B7F]">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="h-4 w-4 text-[#2F6B7F]" />
                            <span className="font-semibold text-sm">
                              No Hidden Fees
                            </span>
                          </div>
                          <ul className="space-y-1 pl-4">
                            {[
                              "Unlimited kilometers",
                              "Full tank return policy",
                              "100% Coverage included",
                              "Free cancellation up to 48h",
                            ].map((item) => (
                              <li
                                key={item}
                                className="flex items-center gap-2 text-sm "
                              >
                                <Check className="h-3.5 w-3.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Why Choose YU */}
                <div className="mt-6 bg-card border border-border  p-6">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary rounded-sm" />
                    Why Choose YU Car Rental?
                  </h4>
                  <div className="space-y-4">
                    {[
                      {
                        icon: Shield,
                        title: "100% Coverage Included",
                        desc: "No deposit worries with our premium package",
                      },
                      {
                        icon: Car,
                        title: "New Fleet Vehicles",
                        desc: "Vehicles are available.",
                      },
                      {
                        icon: Clock,
                        title: "24/7 Support",
                        desc: "Customer Service in multiple languages",
                      },
                      {
                        icon: MapPin,
                        title: "Convenient Locations",
                        desc: "Bonaire Flamingo Airport pick-up",
                      },
                    ].map((item) => (
                      <div key={item.title} className="flex items-start gap-3">
                        <item.icon className="h-4 w-4 text-primary mt-0.5" />
                        <div>
                          <span className="font-medium text-sm">
                            {item.title}
                          </span>
                          <p className="text-xs text-muted-foreground">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Customer Info & Payment */}
              <div>
                <h2 className="text-xl font-display font-semibold mb-6">
                  Customer Information
                </h2>
                <div className="bg-card border border-border  p-6">
                  {/* Personal Details */}
                  <h3 className="font-semibold mb-4">Personal Details</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label className="text-sm font-medium mb-1 block">
                        First Name
                      </Label>
                      <Input placeholder="John" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-1 block">
                        Last Name
                      </Label>
                      <Input placeholder="Doe" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-1 block">
                        Email Address
                      </Label>
                      <Input placeholder="john.doe@email.com" type="email" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-1 block">
                        Phone Number
                      </Label>
                      <Input placeholder="+31 6 12345678" type="tel" />
                    </div>
                  </div>

                  {/* Driver's License */}
                  <h3 className="font-semibold mb-4">
                    Driver&apos;s License Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label className="text-sm font-medium mb-1 block">
                        Date Of Birth
                      </Label>
                      <Input type="date" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-1 block">
                        Driver&apos;s License Number
                      </Label>
                      <Input placeholder="1234567890" />
                    </div>
                  </div>

                  {/* Additional Information */}
                  <h3 className="font-semibold mb-4">Additional Information</h3>
                  <div className="mb-4">
                    <Label className="text-sm font-medium mb-1 block">
                      Promo Code
                    </Label>
                    <div className="flex gap-2">
                      <Input placeholder="Enter code" className="flex-1" />
                      <Button className="gradient-teal text-primary-foreground px-6">
                        Apply
                      </Button>
                    </div>
                  </div>
                  <div className="mb-6">
                    <Label className="text-sm font-medium mb-1 block">
                      Special Requests
                    </Label>
                    <textarea
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-20 resize-none"
                      placeholder="e.g., Early pick-up, vehicle preference, special equipment..."
                    />
                  </div>

                  {/* Payment Information */}
                  <h3 className="font-semibold mb-4">Payment Information</h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium mb-1 block">
                        Card Number
                      </Label>
                      <div className="relative">
                        <Input
                          placeholder="1234 5678 9012 3456"
                          className="pr-20"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                          <span className="text-[10px] font-bold bg-primary text-primary-foreground px-1 rounded">
                            VISA
                          </span>
                          <span className="text-[10px] font-bold bg-destructive text-destructive-foreground px-1 rounded">
                            MC
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-1 block">
                        Cardholder Name
                      </Label>
                      <Input placeholder="John Doe" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium mb-1 block">
                          Expiry Date
                        </Label>
                        <Input placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-1 block">
                          CVV
                        </Label>
                        <Input placeholder="123" />
                      </div>
                    </div>
                  </div>

                  {/* Security Badges */}
                  <div className="flex items-center justify-center gap-4 mt-6 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Shield className="h-3.5 w-3.5" /> SSL Secure
                    </span>
                    <span className="flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" /> 100% Coverage
                    </span>
                    <span>★★★★★ Trustpilot Verified</span>
                  </div>

                  {/* Total */}
                  <div className="text-center mt-4">
                    <div className="text-lg font-semibold">Total: $245.00</div>
                    <div className="text-xs text-muted-foreground">
                      (including 6% VAT)
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="mt-4 space-y-2">
                    <label className="flex items-start gap-2 text-sm">
                      <input
                        type="checkbox"
                        className="mt-1 rounded border-input"
                      />
                      <span className="text-muted-foreground">
                        I agree to the Terms & Conditions, Cancellation Policy
                        (free up to 48h before), Fuel Policy
                      </span>
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Minimum rental 3 days. Prices include 100% coverage
                      option.
                    </p>
                  </div>

                  {/* Pay Button */}
                  <Button
                    className="w-full mt-6 gradient-teal text-primary-foreground py-6 text-base"
                    onClick={() => router.push("/confirmation")}
                  >
                    Confirm & Pay Securely - €245.00
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    Pay €245.00 now · Full payment secured
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="flex justify-end gap-4 mt-8">
              <Button variant="ghost" onClick={() => setStep(3)}>
                Go To Step 3
              </Button>
              <Button
                className="gradient-teal text-primary-foreground px-8"
                onClick={() => {
                  router.push("/confirmation");
                }}
              >
                CONTINUE
              </Button>
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
