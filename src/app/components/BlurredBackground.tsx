'use client';

import React from 'react';

const BlurredBackground = ({
  opacity = 1,
  color = 'red',
  blurAmount = 100,
}) => {
  return (
    <svg
      className="blur-svg-background"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
        opacity: opacity,
        pointerEvents: 'none', // Makes sure it doesn't interfere with clicks
      }}
    >
      <defs>
        <filter id="blur-filter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation={blurAmount} />
        </filter>
      </defs>

      {/* Full-size rectangle to cover the entire area */}
      <g filter="url(#blur-filter)">
        <rect x="0" y="0" width="1000" height="1000" fill={color} />
      </g>
    </svg>
  );
};

export default BlurredBackground;
