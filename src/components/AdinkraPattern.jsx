import React from 'react';
import { colors } from '../theme';

export const AdinkraPattern = ({ opacity = 0.04 }) => {
  return (
    <svg
      width="100%"
      height="100%"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
      }}
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="adinkra" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
          {/* Diamond shape */}
          <path
            d="M 100 40 L 140 100 L 100 160 L 60 100 Z"
            fill="none"
            stroke={colors.gold}
            strokeWidth="2"
            opacity={opacity}
          />

          {/* Circles */}
          <circle cx="100" cy="100" r="15" fill="none" stroke={colors.gold} strokeWidth="1.5" opacity={opacity} />
          <circle cx="100" cy="100" r="25" fill="none" stroke={colors.gold} strokeWidth="1.5" opacity={opacity} />

          {/* Cross lines */}
          <line x1="100" y1="60" x2="100" y2="140" stroke={colors.gold} strokeWidth="1" opacity={opacity} />
          <line x1="60" y1="100" x2="140" y2="100" stroke={colors.gold} strokeWidth="1" opacity={opacity} />

          {/* Corner dots */}
          <circle cx="20" cy="20" r="2" fill={colors.gold} opacity={opacity} />
          <circle cx="180" cy="20" r="2" fill={colors.gold} opacity={opacity} />
          <circle cx="20" cy="180" r="2" fill={colors.gold} opacity={opacity} />
          <circle cx="180" cy="180" r="2" fill={colors.gold} opacity={opacity} />

          {/* Additional geometric accents */}
          <circle cx="50" cy="50" r="3" fill={colors.gold} opacity={opacity * 0.6} />
          <circle cx="150" cy="50" r="3" fill={colors.gold} opacity={opacity * 0.6} />
          <circle cx="50" cy="150" r="3" fill={colors.gold} opacity={opacity * 0.6} />
          <circle cx="150" cy="150" r="3" fill={colors.gold} opacity={opacity * 0.6} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#adinkra)" />
    </svg>
  );
};

export default AdinkraPattern;
