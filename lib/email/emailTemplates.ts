export const verificationEmailTemplate = (name: string, verificationLink: string) => {
  return `
  <div style="font-family: Arial, sans-serif; background:#f6f9fc; padding:40px;">
    
    <div style="max-width:520px; margin:auto; background:white; padding:30px; border-radius:10px;">
      
      <h2 style="margin-top:0;">Verify your email</h2>

      <p>Hello ${name},</p>

      <p>
        Thanks for creating an account. Please verify your email address by clicking the button below.
      </p>

      <div style="text-align:center; margin:30px 0;">
        <a 
          href="${verificationLink}"
          style="
            background:#4f46e5;
            color:white;
            padding:12px 22px;
            text-decoration:none;
            border-radius:6px;
            display:inline-block;
            font-weight:600;
          "
        >
          Verify Email
        </a>
      </div>

      <p style="font-size:14px;color:#555;">
        If the button doesn't work, copy and paste this link into your browser:
      </p>

      <p style="font-size:14px;">
        ${verificationLink}
      </p>

      <hr style="margin:25px 0;" />

      <p style="font-size:12px;color:#777;">
        If you did not create this account, you can safely ignore this email.
      </p>

      <p style="font-size:12px;color:#777;">
        © ${new Date().getFullYear()} Your Company
      </p>

    </div>

  </div>
  `;
};