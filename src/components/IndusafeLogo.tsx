import React from 'react';

interface IndusafeLogoProps {
  className?: string;
  shieldColor?: string;
  factoryColor?: string;
}

export const IndusafeLogo: React.FC<IndusafeLogoProps> = ({
  className = 'w-9 h-9',
  shieldColor = '#2563eb', // Vibrant blue
  factoryColor = '#ffffff',
}) => {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="indusafeShieldGrad" x1="6" y1="4" x2="38" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="shieldRim" x1="22" y1="2" x2="22" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#1e40af" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Outer Safety Shield */}
      <path
        d="M22 3.5L7 9.5V21C7 29.8 13.5 37.8 22 40.5C30.5 37.8 37 29.8 37 21V9.5L22 3.5Z"
        fill="url(#indusafeShieldGrad)"
        stroke="url(#shieldRim)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Inner Accent Contour */}
      <path
        d="M22 6.5L9.5 11.5V21C9.5 28.2 15 35 22 37.3C29 35 34.5 28.2 34.5 21V11.5L22 6.5Z"
        fill="none"
        stroke="#bfdbfe"
        strokeWidth="0.8"
        strokeOpacity="0.5"
      />

      {/* Minimalist Factory Silhouette Outline combining industrial sawtooth roof & stacks */}
      {/* Factory Base & Sawtooth Roof */}
      <path
        d="M13 29V20L17.5 23V20L22 23V16.5L26.5 20V14.5H29.5V29H13Z"
        fill={factoryColor}
      />

      {/* Factory Doorway */}
      <path
        d="M20 29V24.5H23.5V29H20Z"
        fill="#1e3a8a"
      />

      {/* Clean Factory Windows */}
      <rect x="14.8" y="23" width="2" height="2" rx="0.3" fill="#60a5fa" />
      <rect x="26.8" y="22" width="2" height="2" rx="0.3" fill="#60a5fa" />

      {/* Minimalist Energy / Safety Spark at Chimney */}
      <circle cx="28" cy="12" r="1.4" fill="#93c5fd" />
      <circle cx="28" cy="8.5" r="0.8" fill="#dbeafe" />
    </svg>
  );
};
