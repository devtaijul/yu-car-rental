import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Setting } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Save, CreditCard, Smartphone } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const PAYMENT_SETTINGS = [
  { group: "Stripe", icon: CreditCard, keys: [
    { key: "stripe_publishable_key", label: "Publishable Key" },
    { key: "stripe_secret_key", label: "Secret Key" },
  ]},
  { group: "SSLCommerz", icon: CreditCard, keys: [
    { key: "sslcommerz_store_id", label: "Store ID" },
    { key: "sslcommerz_store_password", label: "Store Password" },
    { key: "sslcommerz_is_sandbox", label: "Sandbox Mode (true/false)" },
  ]},
  { group: "bKash", icon: Smartphone, keys: [
    { key: "bkash_app_key", label: "App Key" },
    { key: "bkash_app_secret", label: "App Secret" },
    { key: "bkash_username", label: "Username" },
    { key: "bkash_password", label: "Password" },
    { key: "bkash_is_sandbox", label: "Sandbox Mode (true/false)" },
  ]},
  { group: "Nagad", icon: Smartphone, keys: [
    { key: "nagad_merchant_id", label: "Merchant ID" },
    { key: "nagad_merchant_key", label: "Merchant Key" },
    { key: "nagad_is_sandbox", label: "Sandbox Mode (true/false)" },
  ]},
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchSettings = async () => {
    const { data } = await supabase.from("settings").select("*");
    const map: Record<string, string> = {};
    (data as Setting[])?.forEach(s => { map[s.key] = s.value || ''; });
    setSettings(map);
  };

  useEffect(() => { fetchSettings(); }, []);

  const handleSaveGroup = async (keys: { key: string; label: string }[]) => {
    setLoading(true);
    for (const k of keys) {
      const value = settings[k.key] || '';
      const existing = await supabase.from("settings").select("id").eq("key", k.key).maybeSingle();
      if (existing.data) {
        await supabase.from("settings").update({ value }).eq("key", k.key);
      } else {
        await supabase.from("settings").insert({ key: k.key, value });
      }
    }
    setLoading(false);
    toast({ title: "Settings saved" });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-xl font-display font-bold">Payment Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">Configure your payment gateway credentials. These are stored securely and only accessible by admins.</p>
      </div>

      {PAYMENT_SETTINGS.map(group => (
        <Card key={group.group} className="border border-border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <group.icon className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg font-display">{group.group}</CardTitle>
            </div>
            <CardDescription>Configure {group.group} payment gateway</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {group.keys.map(k => (
              <div key={k.key} className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">{k.label}</label>
                <Input
                  type={k.key.includes('secret') || k.key.includes('password') || k.key.includes('key') ? 'password' : 'text'}
                  value={settings[k.key] || ''}
                  onChange={e => setSettings({ ...settings, [k.key]: e.target.value })}
                  placeholder={`Enter ${k.label}`}
                />
              </div>
            ))}
            <Button onClick={() => handleSaveGroup(group.keys)} disabled={loading} className="mt-2 gradient-teal text-primary-foreground gap-1">
              <Save className="h-4 w-4" /> Save {group.group} Settings
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
