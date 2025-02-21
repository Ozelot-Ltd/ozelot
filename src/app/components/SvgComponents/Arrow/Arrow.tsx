import React from 'react';

export default function Arrow({
  height,
  width,
  fill,
}: {
  height?: string;
  width?: string;
  fill?: string;
}) {
  return (
    <svg
      width={height || '22'}
      height={width || '23'}
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.00013 11.4999L20.2017 11.4999"
        stroke={fill || '#494C4F'}
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M11.3992 1.89922L21 11.5L11.3992 21.1008"
        stroke={fill || '#494C4F'}
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
}
