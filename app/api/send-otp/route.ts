import { ENV } from "@/lib/env";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { phone, otp } = await req.json();

  if (!phone || !otp) {
    return NextResponse.json({ error: "Missing phone or otp" }, { status: 400 });
  }

  if (!ENV.BULKSMS_BASIC_AUTH) {
    return NextResponse.json({ error: "BulkSMS credentials not configured" }, { status: 500 });
  }

  const response = await fetch("https://api.bulksms.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${ENV.BULKSMS_BASIC_AUTH}`,
    },
    body: JSON.stringify({
      to: [phone],
      body: `Your YU Car Rental verification code is: ${otp}`,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("[send-otp] BulkSMS error:", error);
    return NextResponse.json({ error: "Failed to send SMS" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
