import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const generateStripe = ({ secretKey }: { secretKey: string }) =>
  new Stripe(secretKey!, {
    apiVersion: "2026-02-25.clover",
  });

export async function POST(req: Request) {
  const { amount } = await req.json();

  if (!amount) {
    return NextResponse.error();
  }

  const settings = await prisma.platformSettings.findFirst();

  if (!settings) {
    return NextResponse.error();
  }

  if (!settings.stripeEnabled) {
    return NextResponse.error();
  }

  if (!settings.stripePublishableKey) {
    return NextResponse.error();
  }

  if (!settings.stripeSecretKey) {
    return NextResponse.error();
  }

  const paymentIntent = await generateStripe({
    secretKey: settings.stripeSecretKey!,
  }).paymentIntents.create({
    amount, // cents
    currency: "usd",
    automatic_payment_methods: { enabled: true },
  });

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
  });
}
