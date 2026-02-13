import React from "react";
import { cn } from "@/lib/utils";

interface DividerTextProps {
  text: string;
  dividerWidth?: string; // e.g. "80px", "4rem"
  side?: "left" | "right" | "both";
  className?: string;
  borderClassName?: string;
}

export const DividerText = ({
  text,
  dividerWidth = "40px",
  side = "both",
  className,
  borderClassName = "",
}: DividerTextProps) => {
  return (
    <div className={cn("flex items-center w-full", className)}>
      {(side === "left" || side === "both") && (
        <span
          className={cn("border-t", borderClassName)}
          style={{ width: dividerWidth }}
        />
      )}

      <span className="px-4 whitespace-nowrap">{text}</span>

      {(side === "right" || side === "both") && (
        <span
          className={cn("border-t", borderClassName)}
          style={{ width: dividerWidth }}
        />
      )}
    </div>
  );
};
