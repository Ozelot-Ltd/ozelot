import React from 'react';

export default function BandcampLogo({
  width,
  height,
  fill,
}: {
  width?: number;
  height?: number;
  fill?: string;
}) {
  const smallerWidth = width && width / 1.8;
  const smallerHeight = height && height / 2.6;
  return (
    <div>
      <svg
        width={`${width}` || '26'}
        height={`${height}` || '26'}
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_469_928)">
          <mask
            id="mask0_469_928"
            style={{ maskType: 'luminance' }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width={`${width}` || '26'}
            height={`${height}` || '26'}
          >
            <path d="M26 0H0V26H26V0Z" fill="transparent" />
          </mask>
          <g mask="url(#mask0_469_928)">
            <mask
              id="mask1_469_928"
              style={{ maskType: 'luminance' }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width={`${width}` || '26'}
              height={`${height}` || '26'}
            >
              <path
                d="M13 26C20.1797 26 26 20.1797 26 13C26 5.82029 20.1797 0 13 0C5.8203 0 0 5.82029 0 13C0 20.1797 5.8203 26 13 26Z"
                fill="transparent"
              />
            </mask>
            <g mask="url(#mask1_469_928)">
              <mask
                id="mask2_469_928"
                style={{ maskType: 'luminance' }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width={`${width}` || '26'}
                height={`${height}` || '26'}
              >
                <path d="M0 26H26V0H0V26Z" fill="transparent" />
              </mask>
              <g mask="url(#mask2_469_928)">
                <path
                  d="M13 26C20.1797 26 26 20.1797 26 13C26 5.82029 20.1797 0 13 0C5.8203 0 0 5.82029 0 13C0 20.1797 5.8203 26 13 26Z"
                  stroke={fill || '#494C4F'}
                  strokeWidth="4"
                  strokeMiterlimit="10"
                />
              </g>
            </g>
            <mask
              id="mask3_469_928"
              style={{ maskType: 'luminance' }}
              maskUnits="userSpaceOnUse"
              x="6"
              y="8"
              width={`${smallerWidth}` || '14'}
              height={`${smallerHeight}` || '10'}
            >
              <path
                d="M15.528 17.0882H6.04297L10.4723 8.91193H19.9573L15.528 17.0882Z"
                fill="transparent"
              />
            </mask>
            <g mask="url(#mask3_469_928)">
              <mask
                id="mask4_469_928"
                style={{ maskType: 'luminance' }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width={`${width}` || '26'}
                height={`${height}` || '26'}
              >
                <path d="M0 26H26V0H0V26Z" fill="transparent" />
              </mask>
              <g mask="url(#mask4_469_928)">
                <path
                  d="M5.78906 17.3421H20.2112V8.65802H5.78906V17.3421Z"
                  fill={fill || '#494C4F'}
                />
              </g>
            </g>
          </g>
        </g>
        <defs>
          <clipPath id="clip0_469_928">
            <rect
              width={`${width}` || '26'}
              height={`${height}` || '26'}
              fill="transparent"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
