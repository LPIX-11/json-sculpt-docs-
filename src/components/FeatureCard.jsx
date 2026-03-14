import React, { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { colors, fonts } from '../theme';

export const FeatureCard = ({ icon: Icon, title, desc, delay = 0 }) => {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 0.6s ease-out ${delay}ms`,
        cursor: 'default',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          padding: 32,
          borderRadius: 12,
          backgroundColor: colors.bgPanel,
          border: `1px solid ${isHovered ? colors.borderHover : colors.border}`,
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
          boxShadow: isHovered
            ? `0 20px 40px rgba(245, 197, 66, 0.15)`
            : `0 10px 30px rgba(0, 0, 0, 0.3)`,
        }}
      >
        {/* Icon Container */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 56,
            height: 56,
            borderRadius: 12,
            background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldBright})`,
            marginBottom: 20,
            transition: 'all 0.3s ease',
            transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0)',
          }}
        >
          {Icon && <Icon size={28} color={colors.bg} strokeWidth={2} />}
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: colors.warmWhite,
            marginBottom: 12,
            fontFamily: fonts.sans,
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.6,
            color: colors.mutedText,
            fontFamily: fonts.sans,
          }}
        >
          {desc}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
