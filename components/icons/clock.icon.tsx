import React from "react";

export const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      {...props}
    >
      <path
        d="M13.9979 6.9989V13.9978L18.6638 16.3308"
        stroke="#1A1A1A"
        strokeWidth={1.74974}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.9979 25.6628C20.4403 25.6628 25.6628 20.4403 25.6628 13.9979C25.6628 7.55556 20.4403 2.33301 13.9979 2.33301C7.55556 2.33301 2.33301 7.55556 2.33301 13.9979C2.33301 20.4403 7.55556 25.6628 13.9979 25.6628Z"
        stroke="#1A1A1A"
        strokeWidth={1.74974}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
