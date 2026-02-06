"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const reviews = [
  {
    id: 1,
    name: "Sofia L.",
    car: "VEYRA TRAIL",
    rating: 5,
    avatar: "SL",
    text: "The YU Car Rental Team Was Incredibly Responsive And Professional. Pick-Up And Drop-Off Were Smooth. And Online Booking Saved Me So Much Time. Highly Recommend Their Service.",
  },
  {
    id: 2,
    name: "Elena R.",
    car: "LUXURY SUV",
    rating: 5,
    avatar: "ER",
    text: "Amazing experience! The car was in perfect condition and the process was seamless from start to finish. Will definitely use again for my next trip.",
  },
  {
    id: 3,
    name: "Marcus T.",
    car: "PREMIUM SEDAN",
    rating: 5,
    avatar: "MT",
    text: "Best car rental experience I've ever had. No hidden fees, great customer service, and the digital check-in was incredibly convenient.",
  },
  {
    id: 4,
    name: "Anna K.",
    car: "COMPACT ELECTRIC",
    rating: 4,
    avatar: "AK",
    text: "Very satisfied with the service. The car was clean and well-maintained. The 100% coverage option gave me complete peace of mind.",
  },
];

const ReviewsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const currentReview = reviews[currentIndex];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header with navigation */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8 gap-4">
          <div>
            <span className="section-badge mb-4">
              <Star className="h-3 w-3" />
              Reviews
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold">
              Real Experiences, Real Freedom
            </h2>
          </div>

          {/* Navigation arrows - desktop */}
          <div className="hidden md:flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-lg border-border"
              onClick={prevReview}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-lg border-border"
              onClick={nextReview}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          {/* Rating Card */}
          <div className="gradient-teal text-primary-foreground rounded-2xl p-8 flex flex-col justify-center items-center lg:min-w-[280px]">
            <div className="text-5xl md:text-6xl font-bold mb-3">4.6/5</div>
            <div className="flex justify-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= 4
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-yellow-400/50 text-yellow-400/50"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-primary-foreground/80 text-center">
              Average Rating Reviews
            </p>
          </div>

          {/* Review Card */}
          <div className="flex-1 bg-card border border-border rounded-2xl p-6 md:p-8 transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary/30 to-primary/10 flex items-center justify-center shrink-0">
                  <span className="font-semibold text-primary">
                    {currentReview.avatar}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {currentReview.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {currentReview.car}
                  </p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= currentReview.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              "{currentReview.text}"
            </p>
          </div>
        </div>

        {/* Navigation arrows - mobile */}
        <div className="flex md:hidden justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="icon"
            className="rounded-lg border-border"
            onClick={prevReview}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-lg border-border"
            onClick={nextReview}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-primary w-6"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsCarousel;
