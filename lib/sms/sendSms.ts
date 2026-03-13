import { ENV } from "@/lib/env";

export async function sendSms(phone: string, message: string) {
  if (!ENV.BULKSMS_BASIC_AUTH) {
    console.warn("[sendSms] BULKSMS_BASIC_AUTH not configured");
    return;
  }

  const response = await fetch("https://api.bulksms.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${ENV.BULKSMS_BASIC_AUTH}`,
    },
    body: JSON.stringify({
      to: [phone],
      body: message,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("[sendSms] BulkSMS error:", error);
  }
}
