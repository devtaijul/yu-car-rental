import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

export async function clientSecretGenerator({ amount }: { amount: number }) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount, // in cents
    currency: "usd",
    automatic_payment_methods: { enabled: true },
  });

  return {
    clientSecret: paymentIntent.client_secret,
  };
}
