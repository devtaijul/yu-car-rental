import React from "react";
import { cn } from "@/lib/utils";

interface TextStrokeProps {
  children: React.ReactNode;
  className?: string;
  strokeWidth?: string;
  strokeColor?: string;
  fillColor?: string;
}

export const TextStroke = ({
  children,
  className,
  strokeWidth = "2px",
  strokeColor = "#598999",
  fillColor = "#EAF0F2",
}: TextStrokeProps) => {
  return (
    <span
      className={cn("font-poppins ", className)}
      style={{
        WebkitTextStroke: `${strokeWidth} ${strokeColor}`,
        WebkitTextFillColor: fillColor,
        color: fillColor, // fallback
      }}
    >
      {children}
    </span>
  );
};
