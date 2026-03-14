import React from 'react';
import { useInView } from '../hooks/useInView';
import SyntaxCode from './SyntaxCode';
import { colors, fonts } from '../theme';

export const CodeBlock = ({ title, code, icon: Icon, delay = 0, fontSize = 13 }) => {
  const [ref, inView] = useInView({ threshold: 0.1 });

  const containerStyle = {
    maxWidth: '100%',
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    transition: `all 0.6s ease-out ${delay}ms`,
    transitionDelay: inView ? `${delay}ms` : '0ms',
  };

  return (
    <div style={containerStyle} ref={ref}>
      <div
        style={{
          backgroundColor: colors.bgPanel,
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
          overflow: 'hidden',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* macOS Title Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 16px',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          {/* Traffic Light Dots */}
          <div style={{ display: 'flex', gap: 8 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#ff5f56',
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#ffbd2e',
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#27c93f',
              }}
            />
          </div>

          {/* Icon and Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 8 }}>
            {Icon && <Icon size={16} color={colors.gold} />}
            <span style={{ fontSize: 13, color: colors.mutedText, fontFamily: fonts.mono }}>
              {title}
            </span>
          </div>
        </div>

        {/* Code Content */}
        <div
          style={{
            padding: '20px 16px',
            overflow: 'auto',
            maxHeight: 500,
          }}
        >
          <SyntaxCode code={code} fontSize={fontSize} />
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;
