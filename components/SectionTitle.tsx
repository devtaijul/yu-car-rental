import { cn } from "@/lib/utils";
import React from "react";

export const SectionTitle = ({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle: string;
  className?: string;
}) => {
  return (
    <div className={cn("text-center mb-12", className)}>
      <span className="section-badge mb-4">
        <div className="w-3 h-3 bg-primary rounded-full mr-2" />
        {title}
      </span>
      <h2 className="text-3xl text-black md:text-4xl font-roboto font-semibold">
        {subtitle}
      </h2>
    </div>
  );
};
