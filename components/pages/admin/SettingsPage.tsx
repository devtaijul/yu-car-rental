"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { SettingWithAll } from "@/types/system";
import { CreditCard, Save } from "lucide-react";
import { useState } from "react";

type StripeEnv = "TEST" | "LIVE";

type SettingsProps = {
  settings: {
    generalSettings: {
      id: string;
      key: string;
      value: string;
    }[];
    stripeAccount: {
      id: string;
      publishableKey: string;
      secretKey: string;
      webhookSecret?: string | null;
      environment: StripeEnv;
      isActive: boolean;
    } | null;
  };
};

export function SettingsPage({ settings }: SettingWithAll) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [stripe, setStripe] = useState(
    settings.stripeAccount || {
      publishableKey: "",
      secretKey: "",
      webhookSecret: "",
      environment: "TEST" as StripeEnv,
      isActive: false,
    },
  );

  const handleSaveStripe = async () => {
    try {
      setLoading(true);

      await fetch("/api/admin/stripe", {
        method: "POST",
        body: JSON.stringify(stripe),
      });

      toast({ title: "Stripe settings saved successfully" });
    } catch (err) {
      toast({
        title: "Error saving stripe settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl">
      {/* 🔹 Stripe Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            <CardTitle>Stripe</CardTitle>
          </div>
          <CardDescription>
            Configure Stripe payment gateway credentials
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label className="text-xs">Publishable Key</Label>
            <Input
              type="password"
              value={stripe.publishableKey}
              onChange={(e) =>
                setStripe({ ...stripe, publishableKey: e.target.value })
              }
              placeholder="Enter publishable key"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Secret Key</Label>
            <Input
              type="password"
              value={stripe.secretKey}
              onChange={(e) =>
                setStripe({ ...stripe, secretKey: e.target.value })
              }
              placeholder="Enter secret key"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Webhook Secret</Label>
            <Input
              type="password"
              value={stripe.webhookSecret || ""}
              onChange={(e) =>
                setStripe({ ...stripe, webhookSecret: e.target.value })
              }
              placeholder="Enter webhook secret"
            />
          </div>

          <Button
            onClick={handleSaveStripe}
            disabled={loading}
            className="mt-2"
          >
            <Save className="h-4 w-4 mr-1" />
            Save Stripe Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
