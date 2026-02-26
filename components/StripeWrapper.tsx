"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ENV } from "@/lib/env";

const stripePromise = loadStripe(ENV.STRIPE_PUBLIC_KEY!);

export const StripeWrapper = ({
  children,
  clientSecret,
}: {
  children: React.ReactNode;
  clientSecret: string;
}) => {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      {children}
    </Elements>
  );
};
