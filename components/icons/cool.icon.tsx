import React from "react";

export const CoolIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={36}
      height={36}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15 30L13.125 26.25L9 27M15 6L13.125 9.75L9 9M21 30L22.875 26.25L27 27M21 6L22.875 9.75L27 9"
        stroke="#2F6B7F"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.5 31.5L21 22.5H15M25.5 4.5L21 13.5L23.25 18M3 18H12.75L15 13.5M30 15L27.75 18L30 21"
        stroke="#2F6B7F"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33 18H23.25L21 22.5M6 15L8.25 18L6 21M10.5 31.5L15 22.5L12.75 18M10.5 4.5L15 13.5H21"
        stroke="#2F6B7F"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
