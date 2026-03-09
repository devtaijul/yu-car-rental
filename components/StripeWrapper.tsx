"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useMemo } from "react";

export const StripeWrapper = ({
  children,
  clientSecret,
  publishableKey,
}: {
  children: React.ReactNode;
  clientSecret: string;
  publishableKey: string;
}) => {
  const stripePromise = useMemo(() => loadStripe(publishableKey), [publishableKey]);

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      {children}
    </Elements>
  );
};
