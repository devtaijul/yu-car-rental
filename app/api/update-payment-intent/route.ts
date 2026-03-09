import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const { paymentIntentId, amount } = await req.json();

  if (!paymentIntentId || !amount) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const settings = await prisma.platformSettings.findFirst();
  if (!settings?.stripeSecretKey) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const stripe = new Stripe(settings.stripeSecretKey, {
    apiVersion: "2026-02-25.clover",
  });

  const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
    amount,
  });

  return NextResponse.json({ success: true, amount: paymentIntent.amount });
}
