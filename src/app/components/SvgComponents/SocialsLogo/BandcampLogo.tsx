import React from 'react';

export default function BandcampLogo({
  width = 26,
  height = 26,
  fill = '#494C4F',
}: {
  width?: number;
  height?: number;
  fill?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="13" cy="13" r="11" stroke={fill} strokeWidth="2" />

      <path
        d="M6.043 17.088L10.472 8.912h9.485l-4.429 8.176H6.043z"
        fill={fill}
      />
    </svg>
  );
}
