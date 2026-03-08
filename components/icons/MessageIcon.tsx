import React from "react";

export const MessageIcon = ({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M2.33301 3.66667C2.33301 2.93029 2.92996 2.33334 3.66634 2.33334H12.333C13.0694 2.33334 13.6663 2.93029 13.6663 3.66667V9.66667C13.6663 10.4031 13.0694 11 12.333 11H6.81996L3.99967 13.3497V11H3.66634C2.92996 11 2.33301 10.4031 2.33301 9.66667V3.66667Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
