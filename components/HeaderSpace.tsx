import { cn } from "@/lib/utils";
import React from "react";

export const HeaderSpace = ({ className }: { className?: string }) => {
  return <div className={cn("pt-24", className)}></div>;
};
