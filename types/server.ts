import { z } from "zod";

export function generateRandomOTP(): string {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return otp;
}

export class ActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ActionError";
  }
}

export type ActionMeta = {
  total: number;
  page: number;
  limit: number;
  hasMore?: boolean;
};

export type ActionErrorOrSuccess<T> = {
  success: boolean;
  message: string;
  data: T | null;
  meta?: ActionMeta | null;
  addition?: T | null;
};

export type ActionResponse<T> = Promise<ActionErrorOrSuccess<T | null>>;

export function actionResponse<T>(
  data: T,
  meta?: ActionMeta,
  addition?: T | null,
): ActionErrorOrSuccess<T> {
  return {
    success: true,
    message: "Success",
    data,
    meta,
    addition: addition ?? null,
  };
}

export function actionError(
  message: string,
  error?: unknown,
): ActionErrorOrSuccess<null> {
  let errorMessage = message;
  if (error && error instanceof z.ZodError) {
    errorMessage = Object.entries(error.flatten().fieldErrors)
      .map(([key, value]) => `${key}: ${value?.join(", ")}`)
      .join("\n");
  }
  return {
    success: false,
    message: errorMessage,
    data: null,
    meta: null,
  };
}
