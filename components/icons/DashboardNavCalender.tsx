import React from 'react'

export const DashboardNavCalender = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
    width={15}
    height={17}
    viewBox="0 0 15 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.5 0.75V3.75M10.5 0.75V3.75"
      stroke="#64748B"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.75 2.25H2.25C1.42157 2.25 0.75 2.92157 0.75 3.75V14.25C0.75 15.0784 1.42157 15.75 2.25 15.75H12.75C13.5784 15.75 14.25 15.0784 14.25 14.25V3.75C14.25 2.92157 13.5784 2.25 12.75 2.25Z"
      stroke="#64748B"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M0.75 6.75H14.25M5.25 11.25L6.75 12.75L9.75 9.75"
      stroke="#64748B"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
  )
}
