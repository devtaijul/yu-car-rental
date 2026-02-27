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
import { Check, Shield } from "lucide-react";
import { useAsyncAction } from "@/hooks/use-async-action";
import { bookCar } from "@/actions/mutation";
import { BookingState } from "@/context/BookingContext";
import { Car } from "@/generated/prisma/client";

export const SummaryForm = ({
  total,
  clientSecret,
  booking,
  car,
}: {
  total: number;
  booking: BookingState;
  clientSecret: string;
  car: Car;
}) => {
  const { runAction, isProcessing } = useAsyncAction(bookCar);
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    if (!stripe || !elements) return;

    setLoading(true);

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
      setLoading(false);
      return;
    }

    console.log("paymentIntet", paymentIntent);

    runAction({
      customer: data,
      booking,
      payment: paymentIntent,
      carId: car.id,
      pricePerDay: car.pricePerDay,
    });

    router.push("/confirmation");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-display font-semibold mb-6">
        Customer Information
      </h2>

      <div className="bg-card border border-border p-6">
        {/* Personal Details */}
        <h3 className="font-semibold mb-4">Personal Details</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <Label className="mb-1 block">First Name</Label>
            <Input {...register("firstName")} placeholder="John" />
            <p className="text-xs text-red-500">{errors.firstName?.message}</p>
          </div>

          <div>
            <Label className="mb-1 block">Last Name</Label>
            <Input {...register("lastName")} placeholder="Doe" />
            <p className="text-xs text-red-500">{errors.lastName?.message}</p>
          </div>

          <div>
            <Label className="mb-1 block">Email Address</Label>
            <Input type="email" {...register("email")} />
            <p className="text-xs text-red-500">{errors.email?.message}</p>
          </div>

          <div>
            <Label className="mb-1 block">Phone Number</Label>
            <Input {...register("phone")} />
            <p className="text-xs text-red-500">{errors.phone?.message}</p>
          </div>
        </div>

        {/* License */}
        <h3 className="font-semibold mb-4">Driver&apos;s License Details</h3>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <Label className="mb-1 block">Date Of Birth</Label>
            <Input type="date" {...register("dateOfBirth")} />
            <p className="text-xs text-red-500">
              {errors.dateOfBirth?.message}
            </p>
          </div>

          <div>
            <Label className="mb-1 block">Driver&apos;s License Number</Label>
            <Input {...register("licenseNumber")} />
            <p className="text-xs text-red-500">
              {errors.licenseNumber?.message}
            </p>
          </div>
        </div>

        {/* Promo */}
        {/* <h3 className="font-semibold mb-4">Additional Information</h3>
        <div className="mb-4">
          <Label className="mb-1 block">Promo Code</Label>
          <Input {...register("promoCode")} />
        </div>

        <div className="mb-6">
          <Label className="mb-1 block">Special Requests</Label>
          <textarea
            {...register("specialRequests")}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-20 resize-none"
          />
        </div> */}

        {/* Payment */}
        {/* Payment Information */}
        <h3 className="font-semibold mb-4">Payment Information</h3>

        <div className="space-y-4">
          {/* Card Number */}
          <div>
            <Label className="mb-1 block">Card Number</Label>
            <div className="border rounded-md px-3 py-2">
              <CardNumberElement
                options={{
                  style: {
                    base: {
                      fontSize: "14px",
                    },
                  },
                }}
                onChange={(e) => setCardError(e.error?.message || null)}
              />
            </div>
          </div>

          {/* Cardholder Name */}
          <div>
            <Label className="mb-1 block">Cardholder Name</Label>
            <Input {...register("cardholderName")} />
            <p className="text-xs text-red-500">
              {errors.cardholderName?.message}
            </p>
          </div>

          {/* Expiry + CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-1 block">Expiry Date</Label>
              <div className="border rounded-md px-3 py-2">
                <CardExpiryElement
                  options={{
                    style: { base: { fontSize: "14px" } },
                  }}
                />
              </div>
            </div>

            <div>
              <Label className="mb-1 block">CVV</Label>
              <div className="border rounded-md px-3 py-2">
                <CardCvcElement
                  options={{
                    style: { base: { fontSize: "14px" } },
                  }}
                />
              </div>
            </div>
          </div>

          {cardError && <p className="text-xs text-red-500">{cardError}</p>}
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
          <div className="text-lg font-semibold">
            Total: €{total.toFixed(2)}
          </div>
          <div className="text-xs text-muted-foreground">
            (including 6% VAT)
          </div>
        </div>

        {/* Terms */}
        <div className="mt-4 space-y-2">
          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              {...register("termsAccepted")}
              className="mt-1 rounded border-input"
            />
            <span className="text-muted-foreground">
              I agree to the Terms & Conditions, Cancellation Policy (free up to
              48h before), Fuel Policy
            </span>
          </label>
          <p className="text-xs text-muted-foreground">
            Minimum rental 3 days. Prices include 100% coverage option.
          </p>
          <p className="text-xs text-red-500">
            {errors.termsAccepted?.message}
          </p>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={!stripe || loading}
          className="w-full mt-6 bg-primary text-primary-foreground py-6 text-base"
        >
          {loading
            ? "Processing..."
            : `Confirm & Pay Securely - €${total.toFixed(2)}`}
        </Button>
      </div>
    </form>
  );
};
