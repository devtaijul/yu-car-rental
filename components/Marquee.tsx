"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  speed?: number; // seconds (default 20)
  direction?: "left" | "right";
  pauseOnHover?: boolean;
}

export const Marquee = ({
  items,
  className,
  speed = 20,
  direction = "left",
  pauseOnHover = false,
}: MarqueeProps) => {
  const animationName = direction === "left" ? "marquee-left" : "marquee-right";

  return (
    <div className={cn("overflow-hidden w-full", className)}>
      <div
        className={cn(
          "flex whitespace-nowrap w-max",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
        style={{
          animation: `${animationName} ${speed}s linear infinite`,
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="mx-6 text-4xl md:text-6xl font-bold tracking-widest flex items-center gap-3"
          >
            <span className="opacity-50">✦</span>
            {item}
          </span>
        ))}
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </div>
  );
};
