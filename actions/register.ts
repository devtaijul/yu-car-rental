"use server";

import prisma from "@/lib/prisma";
import { RegisterSchemaType } from "@/lib/validation/auth";
import bcrypt from "bcryptjs";

export async function registerUser(formData: RegisterSchemaType) {
  const { firstName, lastName, email, phone, phoneCode, password, company } =
    formData;

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    if (existingUser) {
      return {
        success: false,
        message: "Email or phone already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        phoneCode, // <-- required
        password: hashedPassword,
        company: company || null, // optional
      },
    });

    return {
      success: true,
      message: "Account created successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
