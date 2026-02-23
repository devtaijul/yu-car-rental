import React from "react";

export const CardIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={119}
      height={119}
      viewBox="0 0 119 119"
      fill="none"
      {...props}
    >
      <g opacity={0.1} clipPath="url(#clip0_3340_1209)">
        <path
          d="M76.1433 23.2308L21.3306 47.635C17.5466 49.3198 15.8448 53.7531 17.5295 57.5371L32.7822 91.7951C34.4669 95.5791 38.9002 97.2809 42.6843 95.5962L97.497 71.192C101.281 69.5072 102.983 65.0739 101.298 61.2898L86.0454 27.0319C84.3607 23.2479 79.9274 21.5461 76.1433 23.2308Z"
          stroke="#2F6B7F"
          strokeWidth={7.91626}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22.1057 67.8154L90.6216 37.3102"
          stroke="#2F6B7F"
          strokeWidth={7.91626}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3340_1209">
          <rect
            width={90}
            height={90}
            fill="white"
            transform="translate(0 36.6064) rotate(-24)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
