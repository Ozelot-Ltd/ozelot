import React from 'react';

export default function Earth({
  height = 24,
  width = 24,
  fill = '#5F6368',
  strokeWidth = 2,
}: {
  height?: number;
  width?: number;
  fill?: string;
  strokeWidth?: number;
}) {
  return (
    <div>
      <svg
        width={width}
        height={height}
        viewBox="0 0 121 121"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx={60.5}
          cy={60.5}
          r={58.5}
          stroke={fill}
          strokeWidth={strokeWidth}
        />
        <ellipse
          cx={60}
          cy={60.5}
          rx={21}
          ry={58.5}
          stroke={fill}
          strokeWidth={strokeWidth}
        />
        <ellipse
          cx={60}
          cy={60.5}
          rx={43}
          ry={58.5}
          stroke={fill}
          strokeWidth={strokeWidth}
        />
        <line
          x1={61.5}
          y1={2}
          x2={61.5}
          y2={119}
          stroke={fill}
          strokeWidth={strokeWidth}
        />
        <path
          d="M119 60C119 60 90 68 60.5 68C31 68 2 60 2 60"
          stroke={fill}
          strokeWidth={strokeWidth}
        />
      </svg>
    </div>
  );
}
