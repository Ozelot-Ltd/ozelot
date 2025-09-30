import React from 'react';

export default function Earth({
  height,
  width,
  fill = 'var(--black)',
  strokeWidth = 3,
}: {
  height?: string;
  width?: string;
  fill?: string;
  strokeWidth?: number;
}) {
  return (
    <div>
      <svg
        width={width || '20'}
        height={height || '21'}
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
