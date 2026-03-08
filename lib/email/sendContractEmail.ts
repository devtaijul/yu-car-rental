import { Resend } from "resend";
import { ENV } from "../env";

const resend = new Resend(ENV.RESEND_API_KEY);

export async function sendContractEmail({
  email,
  name,
  pdfBuffer,
  bookingId,
}: {
  email: string;
  name: string;
  pdfBuffer: Buffer;
  bookingId: string;
}) {
  await resend.emails.send({
    from: "Booking <onboarding@resend.dev>",
    to: email,
    subject: "Your Car Rental Contract",
    html: `
      <p>Hello ${name},</p>
      <p>Your booking has been confirmed.</p>
      <p>Please find your contract attached.</p>
    `,
    attachments: [
      {
        filename: `contract-${bookingId}.pdf`,
        content: pdfBuffer,
      },
    ],
  });
}