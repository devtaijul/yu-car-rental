"use server";

import prisma from "@/lib/prisma";
import { registerSchema } from "@/lib/validation/auth";
import bcrypt from "bcryptjs";

export async function registerUser(formData: unknown) {
  const validated = registerSchema.safeParse(formData);

  if (!validated.success) {
    return {
      success: false,
      message: "Invalid fields",
    };
  }

  const { name, email, phone, password } = validated.data;

  try {
    // check existing user
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
        name,
        email,
        phone,
        password: hashedPassword,
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
      message: "Something went wrong",
    };
  }
}
