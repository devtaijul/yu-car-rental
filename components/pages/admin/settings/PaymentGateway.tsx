"use client";

import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PaymentFormValues,
  paymentSchema,
} from "@/lib/validation/settings.schema";
import { useAsyncAction } from "@/hooks/use-async-action";
import { paymentSettingsMutation } from "@/actions/mutation";
import { useToast } from "@/hooks/use-toast";
import { PlatformSettings } from "@/generated/prisma/client";
import { Paypal } from "@/components/icons/Paypal";

export const PaymentGateway = ({
  settings,
}: {
  settings: PlatformSettings;
}) => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    control,
    setValue,

    formState: { errors, isSubmitting },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      stripeEnabled: settings.stripeEnabled || false,
      paypalEnabled: settings.paypalEnabled || false,
      publishableKey: settings.stripePublishableKey || "",
      secretKey: settings.stripeSecretKey || "",
    },
  });

  const { isProcessing, runAction } = useAsyncAction(paymentSettingsMutation, {
    onSuccess: () => {
      toast({
        title: "Payment settings updated",
        description: "Your payment settings have been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  // ✅ React Compiler safe
  const stripeEnabled = useWatch({
    control,
    name: "stripeEnabled",
  });

  const paypalEnabled = useWatch({
    control,
    name: "paypalEnabled",
  });

  const onSubmit = async (data: PaymentFormValues) => {
    console.log(data);

    // এখানে API call দিবে
    // await updatePaymentSettings(data)

    runAction(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-card rounded-xl border p-6"
    >
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-lg font-bold text-foreground">Payment Gateway</h2>
          <p className="text-sm text-muted-foreground">
            Manage API keys and payment processing options.
          </p>
        </div>
        <span className="text-xs font-bold text-success tracking-wider">
          LIVE MODE
        </span>
      </div>

      <div className="mt-5 space-y-5">
        {/* Stripe Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold italic">stripe</span>
            <span className="text-sm text-muted-foreground">
              Stripe Integration
            </span>
          </div>

          <div
            onClick={() => setValue("stripeEnabled", !stripeEnabled)}
            className={`h-6 w-11 rounded-full relative cursor-pointer transition ${stripeEnabled ? "bg-primary" : "bg-muted"
              }`}
          >
            <div
              className={`absolute top-0.5 h-5 w-5 rounded-full transition ${stripeEnabled
                  ? "right-0.5 bg-primary-foreground"
                  : "left-0.5 bg-card shadow"
                }`}
            />
          </div>
        </div>

        {/* Publishable Key */}
        <div>
          <label className="text-[11px] font-semibold uppercase tracking-wider mb-1.5 block">
            Publishable Key
          </label>
          <input
            {...register("publishableKey")}
            type="text"
            className="w-full border rounded-lg px-4 py-2.5 text-sm bg-card font-mono focus:outline-none"
          />
          {errors.publishableKey && (
            <p className="text-xs text-red-500 mt-1">
              {errors.publishableKey.message}
            </p>
          )}
        </div>

        {/* Secret Key */}
        <div>
          <label className="text-[11px] font-semibold uppercase tracking-wider mb-1.5 block">
            Secret Key
          </label>
          <input
            {...register("secretKey")}
            type="password"
            className="w-full border rounded-lg px-4 py-2.5 text-sm bg-card font-mono focus:outline-none"
          />
          {errors.secretKey && (
            <p className="text-xs text-red-500 mt-1">
              {errors.secretKey.message}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            Keep this key secret. Do not expose it in client-side code.
          </p>
        </div>

        {/* Paypal Toggle */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-3">
            <span className="text-lg">
              <Paypal />
            </span>
            <span className="text-sm font-medium">PayPal Integration</span>
          </div>

          <div
            onClick={() => setValue("paypalEnabled", !paypalEnabled)}
            className={`h-6 w-11 rounded-full relative cursor-pointer transition ${paypalEnabled ? "bg-primary" : "bg-gray-300"
              }`}
          >
            <div
              className={`absolute top-0.5 h-5 w-5 rounded-full transition ${paypalEnabled
                  ? "right-0.5 bg-primary-foreground"
                  : "left-0.5 bg-card shadow"
                }`}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-5">
        <button
          type="submit"
          disabled={isProcessing || isSubmitting}
          className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isSubmitting || isProcessing ? "Saving..." : "SAVE PAYMENT SETTINGS"}
        </button>
      </div>
    </form>
  );
};
