import { BUSINESS } from "@/config/business.config";

export function calculateTax(subtotal: number, coverageCost: number): number {
  const totalBeforeTax = subtotal + coverageCost;
  const tax = totalBeforeTax * (BUSINESS.TAX / 100);
  return tax;
}
