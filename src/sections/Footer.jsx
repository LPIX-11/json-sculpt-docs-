import React from 'react';
import { Github, Package } from 'lucide-react';
import { colors, fonts } from '../theme';
import AdinkraPattern from '../components/AdinkraPattern';

const Footer = () => {
  return (
    <footer
      style={{
        position: 'relative',
        backgroundColor: colors.bg,
        borderTop: `1px solid ${colors.border}`,
        overflow: 'hidden',
      }}
    >
      <AdinkraPattern opacity={0.03} />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: 1120,
          margin: '0 auto',
          padding: '60px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 40,
        }}
      >
        {/* Logo & Tagline */}
        <div>
          <h3
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: colors.warmWhite,
              marginBottom: 12,
              fontFamily: fonts.sans,
              letterSpacing: '-0.5px',
            }}
          >
            json-sculpt
          </h3>
          <p
            style={{
              fontSize: 14,
              color: colors.mutedText,
              fontFamily: fonts.sans,
              lineHeight: 1.6,
            }}
          >
            Crafted by Mohamed Johnson (LPIX-11)
          </p>
        </div>

        {/* Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 32,
            flexWrap: 'wrap',
          }}
        >
          <a
            href="#/docs"
            style={{
              fontSize: 14,
              color: colors.gold,
              textDecoration: 'none',
              fontWeight: 500,
              fontFamily: fonts.sans,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.target.style.color = colors.goldBright;
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = colors.gold;
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Documentation
          </a>

          <a
            href="https://www.npmjs.com/package/@sonatel-os/json-sculpt"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 14,
              color: colors.gold,
              textDecoration: 'none',
              fontWeight: 500,
              fontFamily: fonts.sans,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = colors.goldBright;
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = colors.gold;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Package size={16} />
            npm Package
          </a>

          <a
            href="https://github.com/sonatel-os/json-sculpt"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 14,
              color: colors.gold,
              textDecoration: 'none',
              fontWeight: 500,
              fontFamily: fonts.sans,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = colors.goldBright;
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = colors.gold;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Github size={16} />
            Repository
          </a>
        </div>

        {/* Bottom Info */}
        <div
          style={{
            paddingTop: 24,
            borderTop: `1px solid ${colors.border}`,
            fontSize: 13,
            color: colors.mutedText,
            fontFamily: fonts.sans,
          }}
        >
          MIT License · v1.3.0
        </div>
      </div>
    </footer>
  );
};

export default Footer;
