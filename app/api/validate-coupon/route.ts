import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { code, subtotal } = await req.json();

  if (!code) {
    return NextResponse.json({ error: "Promo code required" }, { status: 400 });
  }

  const coupon = await prisma.coupon.findUnique({ where: { code } });

  if (!coupon) {
    return NextResponse.json({ error: "Invalid promo code" }, { status: 404 });
  }

  if (!coupon.isActive) {
    return NextResponse.json({ error: "This promo code is no longer active" }, { status: 400 });
  }

  if (new Date() > coupon.expiresAt) {
    return NextResponse.json({ error: "This promo code has expired" }, { status: 400 });
  }

  if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit) {
    return NextResponse.json({ error: "This promo code has reached its usage limit" }, { status: 400 });
  }

  const discountAmount =
    coupon.discountType === "PERCENTAGE"
      ? (subtotal * coupon.discountValue) / 100
      : coupon.discountValue;

  return NextResponse.json({
    valid: true,
    discountType: coupon.discountType,
    discountValue: coupon.discountValue,
    discountAmount: parseFloat(discountAmount.toFixed(2)),
  });
}
