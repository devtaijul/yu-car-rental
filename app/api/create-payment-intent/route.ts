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
  console.log("settings", settings);
  

  if (!settings) {
    return NextResponse.error();
  }

/*   if (!settings.stripeEnabled) {
    return NextResponse.error();
  }

  if (!settings.stripePublishableKey) {
    return NextResponse.error();
  }

  if (!settings.stripeSecretKey) {
    return NextResponse.error();
  } */

  console.log("I am running ");
  

  const paymentIntent = await generateStripe({
    secretKey: settings.stripeSecretKey!,
  }).paymentIntents.create({
    amount, // cents
    currency: "usd",
    automatic_payment_methods: { enabled: true },
  });

  console.log("payment intent", paymentIntent);
  

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
    publishableKey: settings.stripePublishableKey,
  });
}
