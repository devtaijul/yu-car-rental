"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import {
  CheckoutFormValues,
  checkoutSchema,
} from "@/lib/validation/checkout.schema";
import { Check, Lock, Shield } from "lucide-react";
import { useAsyncAction } from "@/hooks/use-async-action";
import { bookCar } from "@/actions/mutation";
import { BookingState } from "@/context/BookingContext";
import { Car } from "@/generated/prisma/client";
import { PAGES } from "@/config/pages.config";
import { cn } from "@/lib/utils";

const stripeElementStyle = {
  style: {
    base: {
      fontSize: "14px",
      color: "#0f172a",
      "::placeholder": { color: "#94a3b8" },
    },
  },
};

function SectionHeading({ title }: { title: string }) {
  return (
    <h3 className="text-sm font-bold text-foreground mb-4 pb-2 border-b border-border">
      {title}
    </h3>
  );
}

export const SummaryForm = ({
  total,
  clientSecret,
  booking,
  car,
  verifiedPhone,
}: {
  total: number;
  booking: BookingState;
  clientSecret: string;
  car: Car;
  verifiedPhone?: string;
}) => {
  const router = useRouter();
  const { runAction, isProcessing } = useAsyncAction(bookCar, {
    onSuccess: (data) => {
      if (data.success && data?.data?.id) {
        router.push(PAGES.RESERVE_A_CAR.CONFIRMATION(data.data.id));
      }
    },
  });
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoLoading, setPromoLoading] = useState(false);

  const discountedTotal = Math.max(0, total - discount);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      phone: verifiedPhone || "",
    },
  });

  const handleApplyPromo = async () => {
    const code = getValues("promoCode");
    if (!code) return;
    setPromoLoading(true);
    setPromoError(null);
    try {
      const res = await fetch("/api/validate-coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, subtotal: total }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPromoError(data.error || "Invalid promo code");
        return;
      }
      setDiscount(data.discountAmount);
      setPromoApplied(true);
      // Update the Stripe payment intent with the new amount
      await fetch("/api/update-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentIntentId: clientSecret.split("_secret_")[0],
          amount: Math.round((total - data.discountAmount) * 100),
        }),
      });
    } catch {
      setPromoError("Failed to validate promo code");
    } finally {
      setPromoLoading(false);
    }
  };

  const onSubmit = async (data: CheckoutFormValues) => {
    if (!stripe || !elements) return;

    const cardNumber = elements.getElement(CardNumberElement);
    if (!cardNumber) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardNumber,
          billing_details: {
            name: data.cardholderName,
            email: data.email,
            phone: data.phone,
          },
        },
      },
    );

    if (error) {
      setCardError(error.message || "Payment failed");
      return;
    }

    runAction({
      customer: data,
      booking,
      payment: paymentIntent,
      carId: car.id,
      pricePerDay: car.pricePerDay,
      discount,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-0">
      <h2 className="text-xl font-display font-semibold mb-6">
        Customer Information
      </h2>

      {/* Personal Details */}
      <div className="bg-card border border-border p-6 mb-px">
        <SectionHeading title="Personal Details" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="mb-1.5 block text-xs text-muted-foreground">
              First Name
            </Label>
            <Input {...register("firstName")} placeholder="John" />
            {errors.firstName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <Label className="mb-1.5 block text-xs text-muted-foreground">
              Last Name
            </Label>
            <Input {...register("lastName")} placeholder="Doe" />
            {errors.lastName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div>
            <Label className="mb-1.5 block text-xs text-muted-foreground">
              Email Address
            </Label>
            <Input
              type="email"
              {...register("email")}
              placeholder="john.doe@email.com"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Label className="mb-1.5 block text-xs text-muted-foreground">
              Phone Number
            </Label>
            <div className="relative">
              <Input
                {...register("phone")}
                readOnly
                className="bg-muted pr-20"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-green-600 font-bold flex items-center gap-1">
                <Check className="h-3 w-3" /> Verified
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Driver's License Details */}
      <div className="bg-card border border-border border-t-0 p-6 mb-px">
        <SectionHeading title="Driver's License Details" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="mb-1.5 block text-xs text-muted-foreground">
              Date of Birth
            </Label>
            <Input type="date" {...register("dateOfBirth")} />
            {errors.dateOfBirth && (
              <p className="text-xs text-red-500 mt-1">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>
          <div>
            <Label className="mb-1.5 block text-xs text-muted-foreground">
              Driver&apos;s License Number
            </Label>
            <Input {...register("licenseNumber")} placeholder="1234567890" />
            {errors.licenseNumber && (
              <p className="text-xs text-red-500 mt-1">
                {errors.licenseNumber.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-card border border-border border-t-0 p-6 mb-px">
        <SectionHeading title="Additional Information" />
        <div className="space-y-4">
          <div>
            <Label className="mb-1.5 block text-xs text-muted-foreground">
              Promo Code
            </Label>
            <div className="flex gap-2">
              <Input
                {...register("promoCode")}
                placeholder="Enter code"
                className="flex-1"
                disabled={promoApplied}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleApplyPromo}
                disabled={promoApplied || promoLoading}
                className={cn(
                  "shrink-0 text-primary border-primary",
                  promoApplied &&
                    "bg-primary text-primary-foreground border-primary",
                )}
              >
                {promoLoading ? "..." : promoApplied ? "Applied ✓" : "Apply"}
              </Button>
            </div>
            {promoError && (
              <p className="text-xs text-red-500 mt-1">{promoError}</p>
            )}
            {promoApplied && (
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <Check className="h-3 w-3" /> Discount of ${discount.toFixed(2)}{" "}
                applied!
              </p>
            )}
          </div>
          <div>
            <Label className="mb-1.5 block text-xs text-muted-foreground">
              Special Requests
            </Label>
            <textarea
              {...register("specialRequests")}
              placeholder="e.g. early pick-up, vehicle preference, special equipment..."
              className="flex w-full border border-input bg-background px-3 py-2 text-sm min-h-[80px] resize-none rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
        </div>
      </div>

      {/* Billing Information */}
      <div className="bg-card border border-border border-t-0 p-6 mb-px">
        <SectionHeading title="Billing Information" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="mb-1.5 block text-xs text-muted-foreground">
              Street Address
            </Label>
            <Input {...register("streetAddress")} placeholder="Awboy 1" />
          </div>
          <div>
            <Label className="mb-1.5 block text-xs text-muted-foreground">
              House Number
            </Label>
            <Input {...register("houseNumber")} placeholder="405" />
          </div>
          <div>
            <Label className="mb-1.5 block text-xs text-muted-foreground">
              Post Code
            </Label>
            <Input {...register("postCode")} placeholder="1160 SZ" />
          </div>
          <div>
            <Label className="mb-1.5 block text-xs text-muted-foreground">
              City
            </Label>
            <Input {...register("city")} placeholder="Amsterdaam" />
          </div>
          <div>
            <Label className="mb-1.5 block text-xs text-muted-foreground">
              Country
            </Label>
            <Input {...register("country")} placeholder="Netherlands" />
          </div>
          <div>
            <Label className="mb-1.5 block text-xs text-muted-foreground">
              Company (Optional)
            </Label>
            <Input {...register("company")} placeholder="Digitore" />
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="bg-card border border-border border-t-0 p-6">
        <SectionHeading title="Payment Information" />
        <div className="space-y-4">
          <div>
            <Label className="mb-1.5 block text-xs text-muted-foreground">
              Card Number
            </Label>
            <div className="flex items-center border border-input rounded-md px-3 py-2.5 bg-background">
              <div className="flex-1">
                <CardNumberElement
                  options={stripeElementStyle}
                  onChange={(e) => setCardError(e.error?.message || null)}
                />
              </div>
              <div className="flex gap-1.5 ml-2 shrink-0">
                <span className="text-xs font-bold text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded">
                  VISA
                </span>
                <span className="text-xs font-bold text-red-600 border border-red-200 px-1.5 py-0.5 rounded">
                  MC
                </span>
              </div>
            </div>
          </div>
          <div>
            <Label className="mb-1.5 block text-xs text-muted-foreground">
              Cardholder Name
            </Label>
            <Input {...register("cardholderName")} placeholder="John Doe" />
            {errors.cardholderName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.cardholderName.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-1.5 block text-xs text-muted-foreground">
                Expiry Date
              </Label>
              <div className="border border-input rounded-md px-3 py-2.5 bg-background">
                <CardExpiryElement options={stripeElementStyle} />
              </div>
            </div>
            <div>
              <Label className="mb-1.5 block text-xs text-muted-foreground">
                CVV
              </Label>
              <div className="border border-input rounded-md px-3 py-2.5 bg-background">
                <CardCvcElement options={stripeElementStyle} />
              </div>
            </div>
          </div>
          {cardError && <p className="text-xs text-red-500">{cardError}</p>}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6 pt-4 border-t border-border text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Lock className="h-3 w-3" /> SSL Secure
          </span>
          <span className="flex items-center gap-1">
            <Shield className="h-3 w-3" /> 100% Coverage
          </span>
          <span className="flex items-center gap-1 text-yellow-500">
            ★★★★★{" "}
            <span className="text-muted-foreground">Trustpilot Verified</span>
          </span>
        </div>

        {/* Total */}
        <div className="text-center mt-4">
          {discount > 0 && (
            <p className="text-sm text-muted-foreground line-through">
              ${total.toFixed(2)}
            </p>
          )}
          <p className="text-lg font-bold text-primary">
            Total: ${discountedTotal.toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground">(including 6% ABB)</p>
        </div>

        {/* Terms */}
        <div className="mt-4">
          <label className="flex items-start gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              {...register("termsAccepted")}
              className="mt-1 rounded border-input accent-primary"
            />
            <span className="text-muted-foreground leading-relaxed">
              I agree to the Terms &amp; Conditions, Cancellation Policy (free
              up to 48h before), Fuel Policy. Minimum rental 2 days. Prices
              include 100% coverage option.
            </span>
          </label>
          {errors.termsAccepted && (
            <p className="text-xs text-red-500 mt-1">
              {errors.termsAccepted.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={!stripe || isProcessing}
          className="w-full mt-6 bg-primary text-primary-foreground py-6 text-base font-bold"
        >
          <Lock className="h-4 w-4 mr-2" />
          {isProcessing
            ? "Processing..."
            : `Confirm & Pay Securely - $${discountedTotal.toFixed(2)}`}
        </Button>
        <p className="text-center text-xs text-muted-foreground mt-2">
          Pay ${discountedTotal.toFixed(2)} now — Full payment secured
        </p>
      </div>
    </form>
  );
};
