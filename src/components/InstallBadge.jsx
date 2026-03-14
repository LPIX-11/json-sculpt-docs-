import React, { useState } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';
import { colors, fonts } from '../theme';

export const InstallBadge = ({ large = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('npm install @sonatel-os/json-sculpt');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fontSize = large ? 16 : 13;
  const padding = large ? '16px 20px' : '12px 16px';
  const iconSize = large ? 20 : 16;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        padding,
        borderRadius: 8,
        border: `1.5px solid ${colors.gold}`,
        backgroundColor: 'rgba(212, 168, 67, 0.05)',
        fontFamily: fonts.mono,
        fontSize,
        color: colors.warmWhite,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        userSelect: 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = colors.goldBright;
        e.currentTarget.style.backgroundColor = 'rgba(245, 197, 66, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = colors.gold;
        e.currentTarget.style.backgroundColor = 'rgba(212, 168, 67, 0.05)';
      }}
    >
      {/* Terminal Icon */}
      <Terminal size={iconSize} color={colors.gold} style={{ flexShrink: 0 }} />

      {/* Command Text */}
      <span style={{ fontWeight: 500, letterSpacing: '0.5px' }}>
        $ npm install @sonatel-os/json-sculpt
      </span>

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          marginLeft: 8,
          padding: '4px 8px',
          borderRadius: 4,
          border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          color: colors.gold,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(212, 168, 67, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        {copied ? (
          <>
            <Check size={iconSize - 2} />
            <span style={{ fontSize: fontSize - 2 }}>Copied</span>
          </>
        ) : (
          <>
            <Copy size={iconSize - 2} />
            <span style={{ fontSize: fontSize - 2 }}>Copy</span>
          </>
        )}
      </button>
    </div>
  );
};

export default InstallBadge;
