import { Resend } from "resend";
import { ENV } from "../env";

const resend = new Resend(ENV.RESEND_API_KEY);

export async function sendContractEmail({
  email,
  name,
  pdfBuffer,
  bookingId,
  plainPassword,
  adminEmail,
}: {
  email: string;
  name: string;
  pdfBuffer: Buffer;
  bookingId: string;
  plainPassword?: string;
  adminEmail?: string;
}) {
  const loginSection = plainPassword
    ? `
      <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:20px;margin:24px 0;">
        <h3 style="margin:0 0 12px;color:#0369a1;font-size:16px;">Your Account Details</h3>
        <p style="margin:0 0 8px;font-size:14px;color:#374151;">An account has been created for you so you can track and manage your bookings.</p>
        <table style="font-size:14px;color:#374151;">
          <tr><td style="padding:4px 12px 4px 0;font-weight:600;">Email:</td><td>${email}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;font-weight:600;">Password:</td><td style="font-family:monospace;font-size:15px;">${plainPassword}</td></tr>
        </table>
        <p style="margin:12px 0 0;font-size:12px;color:#6b7280;">Please change your password after your first login.</p>
      </div>
    `
    : "";

  const customerHtml = `
    <div style="font-family:Arial,sans-serif;background:#f6f9fc;padding:40px;">
      <div style="max-width:560px;margin:auto;background:white;padding:32px;border-radius:10px;">
        <h2 style="margin-top:0;color:#111827;">Booking Confirmed!</h2>
        <p style="color:#374151;">Hello ${name},</p>
        <p style="color:#374151;">Your car rental booking has been confirmed. Please find your rental contract attached to this email.</p>
        <p style="color:#374151;"><strong>Booking ID:</strong> ${bookingId}</p>
        ${loginSection}
        <p style="font-size:12px;color:#9ca3af;margin-top:24px;">© ${new Date().getFullYear()} YU Car Rental</p>
      </div>
    </div>
  `;

  const attachment = {
    filename: `contract-${bookingId}.pdf`,
    content: pdfBuffer,
  };

  // Send to customer
  await resend.emails.send({
    from: "Booking <onboarding@resend.dev>",
    to: email,
    subject: `Booking Confirmed – ${bookingId}`,
    html: customerHtml,
    attachments: [attachment],
  });

  // Send to admin if provided
  if (adminEmail) {
    const adminHtml = `
      <div style="font-family:Arial,sans-serif;background:#f6f9fc;padding:40px;">
        <div style="max-width:560px;margin:auto;background:white;padding:32px;border-radius:10px;">
          <h2 style="margin-top:0;color:#111827;">New Booking Received</h2>
          <p style="color:#374151;">A new booking has been completed.</p>
          <p style="color:#374151;"><strong>Booking ID:</strong> ${bookingId}</p>
          <p style="color:#374151;"><strong>Customer:</strong> ${name} (${email})</p>
          <p style="color:#374151;">The rental contract is attached for your records.</p>
          <p style="font-size:12px;color:#9ca3af;margin-top:24px;">© ${new Date().getFullYear()} YU Car Rental</p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: "Booking <onboarding@resend.dev>",
      to: adminEmail,
      subject: `New Booking – ${bookingId}`,
      html: adminHtml,
      attachments: [attachment],
    });
  }
}