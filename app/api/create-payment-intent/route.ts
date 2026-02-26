import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

export async function POST(req: Request) {
  const { amount } = await req.json();

  const paymentIntent = await stripe.paymentIntents.create({
    amount, // cents
    currency: "usd",
    automatic_payment_methods: { enabled: true },
  });

  console.log("CLIENT SECRET:", paymentIntent.client_secret); // 👈 এখানে দেখবে

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
  });
}
