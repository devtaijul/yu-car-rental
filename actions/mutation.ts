"use server";

import { signIn } from "@/auth";

export async function login(email: string, password: string) {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return {
      ok: true,
      error: null,
    };
  } catch {
    return {
      ok: false,
      error: "User and password missmatch",
    };
  }
}
