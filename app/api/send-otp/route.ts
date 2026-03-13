import { sendSms } from "@/lib/sms/sendSms";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { phone, otp } = await req.json();

  if (!phone || !otp) {
    return NextResponse.json({ error: "Missing phone or otp" }, { status: 400 });
  }

  try {
    await sendSms(phone, `Your YU Car Rental verification code is: ${otp}`);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send SMS" }, { status: 500 });
  }
}
